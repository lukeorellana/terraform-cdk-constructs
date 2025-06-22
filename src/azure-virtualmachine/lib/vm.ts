import * as cdktf from "cdktf";
import { Construct } from "constructs";
import {
  WindowsImageReferences,
  LinuxImageReferences,
  ImageReference,
} from "./image-references";
import * as resource from "../../../.gen/providers/azapi/resource";

import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";
import { Network } from "../../azure-virtualnetwork/lib/network";
import { AzureResource } from "../../core-azure/lib";

export interface OsDisk {
  caching?: string;
  createOption: string;
  deleteOption?: string;
  diskSizeGB?: number;
  name?: string;
  osType?: string;
  writeAcceleratorEnabled?: boolean;
  managedDisk?: {
    id?: string;
    storageAccountType?: string;
  };
}

export interface DataDisk {
  lun: number;
  createOption: string;
  caching?: string;
  deleteOption?: string;
  diskSizeGB?: number;
  name?: string;
  writeAcceleratorEnabled?: boolean;
  managedDisk?: {
    id?: string;
    storageAccountType?: string;
  };
}

export interface AdminSshKey {
  publicKey: string;
  username?: string;
}

export interface NetworkInterfaceConfiguration {
  name: string;
  primary?: boolean;
  ipConfigurations?: Array<{
    name: string;
    primary?: boolean;
    subnet?: {
      id: string;
    };
    publicIpAddress?: {
      id: string;
    };
  }>;
}

export interface WindowsVMProps {
  /**
   * The Azure location where the virtual machine should be created.
   * @default "eastus"
   */
  readonly location?: string;

  /**
   * The name of the virtual machine.
   * @default - Uses the name derived from the construct path.
   */
  readonly name?: string;

  /**
   * An optional reference to the resource group in which to deploy the Virtual Machine.
   * If not provided, the Virtual Machine will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The size of the virtual machine.
   * @default "Standard_B2s"
   */
  readonly size?: string;

  /**
   * The admin username for the virtual machine.
   */
  readonly adminUsername: string;

  /**
   * The admin password for the virtual machine.
   */
  readonly adminPassword: string;

  /**
   * The source image reference for the virtual machine.
   * @default - Uses WindowsServer2022DatacenterCore.
   */
  readonly sourceImageReference?: ImageReference;

  /**
   * The ID of the source image for the virtual machine.
   */
  readonly sourceImageId?: string;

  /**
   * Tags to apply to the virtual machine.
   */
  readonly tags?: { [key: string]: string };

  /**
   * The OS disk configuration for the virtual machine.
   * @default - Uses a disk with caching set to "ReadWrite" and storage account type "Standard_LRS".
   */
  readonly osDisk?: OsDisk;

  /**
   * Data disks to attach to the virtual machine.
   */
  readonly dataDisks?: DataDisk[];

  /**
   * The subnet resource where the virtual machine will be placed.
   * @default - Uses the default subnet from a new virtual network.
   */
  readonly subnet?: resource.Resource;

  /**
   * Enable automatic public IP allocation.
   */
  readonly enablePublicIp?: boolean;

  /**
   * Custom data to pass to the virtual machine upon creation.
   */
  readonly customData?: string;

  /**
   * Custom data to bootstrap the virtual machine. Automatically triggers Azure Custom Script extension to deploy code in custom data.
   */
  readonly boostrapCustomData?: string;

  /**
   * Bootdiagnostics settings for the VM.
   */
  readonly bootDiagnosticsStorageURI?: string;

  /**
   * Virtual machine zones.
   */
  readonly zones?: string[];

  /**
   * Lifecycle settings for the Terraform resource.
   */
  readonly lifecycle?: cdktf.TerraformMetaArguments["lifecycle"];
}

export class WindowsVM extends AzureResource {
  public readonly props: WindowsVMProps;
  public resourceGroup: ResourceGroup;
  public id: string;
  public readonly name: string;
  public readonly vm: resource.Resource;
  public readonly publicIp?: resource.Resource;
  public readonly networkInterface: resource.Resource;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;

  /**
   * Represents a Windows-based Virtual Machine (VM) within Microsoft Azure using AzAPI.
   */
  constructor(scope: Construct, id: string, props: WindowsVMProps) {
    super(scope, id);

    this.props = props;
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location || "eastus",
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Default configurations for the virtual machine.
    const defaults = {
      name: props.name || this.node.path.split("/")[0],
      location: props.location || "eastus",
      size: props.size || "Standard_B2s",
      osDisk: props.osDisk || {
        caching: "ReadWrite",
        createOption: "FromImage",
        managedDisk: {
          storageAccountType: "Standard_LRS",
        },
      },
      sourceImageReference:
        props.sourceImageReference ||
        WindowsImageReferences.windowsServer2022DatacenterCore,
      subnet:
        props.subnet ||
        new Network(this, "vnet", {
          resourceGroup: this.resourceGroup,
        }).subnets.default,
    };

    // Create Public IP if specified.
    if (props.enablePublicIp) {
      this.publicIp = new resource.Resource(this, "public-ip", {
        name: `pip-${defaults.name}`,
        location: defaults.location,
        parentId: this.resourceGroup.resourceGroup.id,
        type: "Microsoft.Network/publicIPAddresses@2023-09-01",
        body: {
          properties: {
            publicIPAllocationMethod: "Dynamic",
          },
        },
        tags: props.tags,
      });
    }

    // Create the Network Interface.
    this.networkInterface = new resource.Resource(this, "nic", {
      name: `nic-${defaults.name}`,
      location: defaults.location,
      parentId: this.resourceGroup.resourceGroup.id,
      type: "Microsoft.Network/networkInterfaces@2023-09-01",
      body: {
        properties: {
          ipConfigurations: [
            {
              name: "internal",
              properties: {
                subnet: {
                  id: defaults.subnet.id,
                },
                privateIPAllocationMethod: "Dynamic",
                ...(this.publicIp && {
                  publicIPAddress: {
                    id: this.publicIp.id,
                  },
                }),
              },
            },
          ],
        },
      },
      tags: props.tags,
    });

    // Base64 encode custom data if provided.
    const customData = props.customData || props.boostrapCustomData;
    const base64CustomData = customData
      ? Buffer.from(customData).toString("base64")
      : undefined;

    // Create the Windows Virtual Machine using AzAPI
    this.vm = new resource.Resource(this, "vm", {
      name: defaults.name,
      location: defaults.location,
      parentId: this.resourceGroup.resourceGroup.id,
      type: "Microsoft.Compute/virtualMachines@2023-09-01",
      body: {
        properties: {
          hardwareProfile: {
            vmSize: defaults.size,
          },
          storageProfile: {
            imageReference: props.sourceImageId
              ? {
                  id: props.sourceImageId,
                }
              : defaults.sourceImageReference,
            osDisk: {
              caching: defaults.osDisk.caching,
              createOption: defaults.osDisk.createOption,
              managedDisk: defaults.osDisk.managedDisk,
              ...(defaults.osDisk.diskSizeGB && {
                diskSizeGB: defaults.osDisk.diskSizeGB,
              }),
              ...(defaults.osDisk.name && { name: defaults.osDisk.name }),
              ...(defaults.osDisk.writeAcceleratorEnabled !== undefined && {
                writeAcceleratorEnabled:
                  defaults.osDisk.writeAcceleratorEnabled,
              }),
            },
            ...(props.dataDisks && { dataDisks: props.dataDisks }),
          },
          osProfile: {
            computerName: defaults.name,
            adminUsername: props.adminUsername,
            adminPassword: props.adminPassword,
            ...(base64CustomData && { customData: base64CustomData }),
          },
          networkProfile: {
            networkInterfaces: [
              {
                id: this.networkInterface.id,
                properties: {
                  primary: true,
                },
              },
            ],
          },
          ...(props.bootDiagnosticsStorageURI && {
            diagnosticsProfile: {
              bootDiagnostics: {
                enabled: true,
                storageUri: props.bootDiagnosticsStorageURI,
              },
            },
          }),
        },
        ...(props.zones && { zones: props.zones }),
      },
      tags: props.tags,
    });

    this.id = this.vm.id;
    this.name = this.vm.name;

    // Bootstrap VM with custom script extension if bootstrap custom data is provided.
    if (props.boostrapCustomData) {
      new resource.Resource(this, "script-ext", {
        name: `${this.name}-script-ext`,
        parentId: this.vm.id,
        type: "Microsoft.Compute/virtualMachines/extensions@2023-09-01",
        body: {
          properties: {
            publisher: "Microsoft.Compute",
            type: "CustomScriptExtension",
            typeHandlerVersion: "1.10",
            protectedSettings: {
              commandToExecute:
                "rename  C:\\\\AzureData\\\\CustomData.bin  postdeploy.ps1 & powershell -ExecutionPolicy Unrestricted -File C:\\\\AzureData\\\\postdeploy.ps1",
            },
          },
        },
      });
    }

    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.vm.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.vm.name,
    });

    this.idOutput.overrideLogicalId("id");
    this.nameOutput.overrideLogicalId("name");
  }
}

export interface LinuxVMProps {
  /**
   * The Azure location where the virtual machine should be created.
   * @default "eastus"
   */
  readonly location?: string;

  /**
   * The name of the virtual machine.
   * @default - Uses the name derived from the construct path.
   */
  readonly name?: string;

  /**
   * An optional reference to the resource group in which to deploy the Virtual Machine.
   * If not provided, the Virtual Machine will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The size of the virtual machine.
   * @default "Standard_B2s"
   */
  readonly size?: string;

  /**
   * The ID of the availability set in which the VM should be placed.
   */
  readonly availabilitySetId?: string;

  /**
   * Custom data to pass to the virtual machine upon creation.
   */
  readonly userData?: string;

  /**
   * An array of SSH keys for the admin user.
   */
  readonly adminSshKey?: AdminSshKey[];

  /**
   * The availability zone in which the VM should be placed.
   */
  readonly zone?: string;

  /**
   * Managed identity settings for the VM.
   */
  readonly identity?: {
    type?: string;
    userAssignedIdentities?: { [key: string]: any };
  };

  /**
   * Additional capabilities like Ultra Disk compatibility.
   */
  readonly additionalCapabilities?: {
    ultraSSDEnabled?: boolean;
    hibernationEnabled?: boolean;
  };

  /**
   * The admin username for the virtual machine.
   */
  readonly adminUsername?: string;

  /**
   * The admin password for the virtual machine.
   */
  readonly adminPassword?: string;

  /**
   * The source image reference for the virtual machine.
   * @default - Uses Ubuntu 22.04 LTS.
   */
  readonly sourceImageReference?: ImageReference;

  /**
   * The ID of the source image for the virtual machine.
   */
  readonly sourceImageId?: string;

  /**
   * Tags to apply to the virtual machine.
   */
  readonly tags?: { [key: string]: string };

  /**
   * The OS disk configuration for the virtual machine.
   * @default - Uses a disk with caching set to "ReadWrite" and storage account type "Standard_LRS".
   */
  readonly osDisk?: OsDisk;

  /**
   * Data disks to attach to the virtual machine.
   */
  readonly dataDisks?: DataDisk[];

  /**
   * The subnet resource where the virtual machine will be placed.
   * @default - Uses the default subnet from a new virtual network.
   */
  readonly subnet?: resource.Resource;

  /**
   * Enable automatic public IP allocation.
   */
  readonly enablePublicIp?: boolean;

  /**
   * Custom data to pass to the virtual machine upon creation.
   */
  readonly customData?: string;

  /**
   * Enable SSH Azure AD Login, required managed identity to be set.
   */
  readonly enableSshAzureADLogin?: boolean;

  /**
   * Bootdiagnostics settings for the VM.
   */
  readonly bootDiagnosticsStorageURI?: string;

  /**
   * Virtual machine zones.
   */
  readonly zones?: string[];

  /**
   * Lifecycle settings for the Terraform resource.
   */
  readonly lifecycle?: cdktf.TerraformMetaArguments["lifecycle"];
}

export class LinuxVM extends AzureResource {
  // Properties of the AzureLinuxVirtualMachine class
  readonly props: LinuxVMProps;
  public resourceGroup: ResourceGroup;
  public id: string;
  public readonly name: string;
  public readonly vm: resource.Resource;
  public readonly publicIp?: resource.Resource;
  public readonly networkInterface: resource.Resource;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;

  /**
   * Represents a Linux-based Virtual Machine (VM) within Microsoft Azure using AzAPI.
   */
  constructor(scope: Construct, id: string, props: LinuxVMProps = {}) {
    super(scope, id);

    // Assigning the properties
    this.props = props;
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location || "eastus",
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Extracting the name from the node path
    const pathName = this.node.path.split("/")[0];

    // Setting default configurations for the virtual machine
    const defaults = {
      name: props.name || pathName,
      adminUsername: props.adminUsername || `admin${pathName}`,
      location: props.location || "eastus",
      size: props.size || "Standard_B2s",
      osDisk: props.osDisk || {
        caching: "ReadWrite",
        createOption: "FromImage",
        managedDisk: {
          storageAccountType: "Standard_LRS",
        },
      },
      sourceImageReference:
        props.sourceImageReference || LinuxImageReferences.ubuntuServer2204LTS,
      subnet:
        props.subnet ||
        new Network(this, "vnet", {
          resourceGroup: this.resourceGroup,
        }).subnets.default,
    };

    // Create Public IP if specified
    if (props.enablePublicIp) {
      this.publicIp = new resource.Resource(this, "public-ip", {
        name: `pip-${defaults.name}`,
        location: defaults.location,
        parentId: this.resourceGroup.resourceGroup.id,
        type: "Microsoft.Network/publicIPAddresses@2023-09-01",
        body: {
          properties: {
            publicIPAllocationMethod: "Dynamic",
          },
        },
        tags: props.tags,
      });
    }

    // Create the Network Interface
    this.networkInterface = new resource.Resource(this, "nic", {
      name: `nic-${defaults.name}`,
      location: defaults.location,
      parentId: this.resourceGroup.resourceGroup.id,
      type: "Microsoft.Network/networkInterfaces@2023-09-01",
      body: {
        properties: {
          ipConfigurations: [
            {
              name: "internal",
              properties: {
                subnet: {
                  id: defaults.subnet.id,
                },
                privateIPAllocationMethod: "Dynamic",
                ...(this.publicIp && {
                  publicIPAddress: {
                    id: this.publicIp.id,
                  },
                }),
              },
            },
          ],
        },
      },
      tags: props.tags,
    });

    // Create the Linux Virtual Machine using AzAPI
    this.vm = new resource.Resource(this, "vm", {
      name: defaults.name,
      location: defaults.location,
      parentId: this.resourceGroup.resourceGroup.id,
      type: "Microsoft.Compute/virtualMachines@2023-09-01",
      body: {
        properties: {
          hardwareProfile: {
            vmSize: defaults.size,
          },
          storageProfile: {
            imageReference: props.sourceImageId
              ? {
                  id: props.sourceImageId,
                }
              : defaults.sourceImageReference,
            osDisk: {
              caching: defaults.osDisk.caching,
              createOption: defaults.osDisk.createOption,
              managedDisk: defaults.osDisk.managedDisk,
              ...(defaults.osDisk.diskSizeGB && {
                diskSizeGB: defaults.osDisk.diskSizeGB,
              }),
              ...(defaults.osDisk.name && { name: defaults.osDisk.name }),
              ...(defaults.osDisk.writeAcceleratorEnabled !== undefined && {
                writeAcceleratorEnabled:
                  defaults.osDisk.writeAcceleratorEnabled,
              }),
            },
            ...(props.dataDisks && { dataDisks: props.dataDisks }),
          },
          osProfile: {
            computerName: defaults.name,
            adminUsername: defaults.adminUsername,
            ...(props.adminPassword && { adminPassword: props.adminPassword }),
            ...(props.customData && {
              customData: Buffer.from(props.customData).toString("base64"),
            }),
            ...(props.userData && {
              customData: Buffer.from(props.userData).toString("base64"),
            }),
            linuxConfiguration: {
              disablePasswordAuthentication: props.adminPassword ? false : true,
              ...(props.adminSshKey && {
                ssh: {
                  publicKeys: props.adminSshKey.map((key) => ({
                    path: `/home/${defaults.adminUsername}/.ssh/authorized_keys`,
                    keyData: key.publicKey,
                  })),
                },
              }),
            },
          },
          networkProfile: {
            networkInterfaces: [
              {
                id: this.networkInterface.id,
                properties: {
                  primary: true,
                },
              },
            ],
          },
          ...(props.availabilitySetId && {
            availabilitySet: {
              id: props.availabilitySetId,
            },
          }),
          ...(props.identity && { identity: props.identity }),
          ...(props.additionalCapabilities && {
            additionalCapabilities: props.additionalCapabilities,
          }),
          ...(props.bootDiagnosticsStorageURI && {
            diagnosticsProfile: {
              bootDiagnostics: {
                enabled: true,
                storageUri: props.bootDiagnosticsStorageURI,
              },
            },
          }),
        },
        ...(props.zones && { zones: props.zones }),
      },
      tags: props.tags,
    });

    // Assigning the VM's ID and name to the class properties
    this.id = this.vm.id;
    this.name = this.vm.name;

    // Enable SSH Azure AD Login if specified
    if (props.enableSshAzureADLogin) {
      new resource.Resource(this, "AADSSHlogin", {
        name: "AADSSHLoginForLinux",
        parentId: this.vm.id,
        type: "Microsoft.Compute/virtualMachines/extensions@2023-09-01",
        body: {
          properties: {
            publisher: "Microsoft.Azure.ActiveDirectory",
            type: "AADSSHLoginForLinux",
            typeHandlerVersion: "1.0",
          },
        },
        tags: props.tags,
      });
    }

    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.vm.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.vm.name,
    });

    this.idOutput.overrideLogicalId("id");
    this.nameOutput.overrideLogicalId("name");
  }
}
