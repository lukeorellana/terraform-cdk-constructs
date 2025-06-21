import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup/lib";
import {
  WindowsImageReferences,
  LinuxImageReferences,
} from "../../azure-virtualmachine";
import { Network } from "../../azure-virtualnetwork/lib/network";
import { AzureResource } from "../../core-azure/lib";

export interface LinuxClusterProps {
  /**
   * The Azure location where the virtual machine scale set should be created.
   * @default "eastus"
   */
  readonly location?: string;

  /**
   * The name of the virtual machine scale set.
   * @default - Uses the name derived from the construct path.
   */
  readonly name?: string;

  /**
   * The admin username for the virtual machine.
   */
  readonly adminUsername?: string;

  /**
   * The admin password for the virtual machine.
   */
  readonly adminPassword?: string;

  /**
   * An optional reference to the resource group in which to deploy the Virtual Machine.
   * If not provided, a new resource group will be created.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The size of the virtual machines in the scale set.
   * @default "Standard_B2s"
   */
  readonly sku?: string;

  /**
   * Custom data to pass to the virtual machines upon creation.
   */
  readonly userData?: string;

  /**
   * SSH public key for the admin user.
   */
  readonly sshPublicKey?: string;

  /**
   * The availability zone(s) in which the VMs should be placed.
   */
  readonly zones?: string[];

  /**
   * The source image reference for the virtual machines.
   * @default - Uses a default Ubuntu image.
   */
  readonly sourceImageReference?: {
    publisher: string;
    offer: string;
    sku: string;
    version: string;
  };

  /**
   * The ID of the source image for the virtual machines.
   */
  readonly sourceImageId?: string;

  /**
   * Tags to apply to the virtual machine scale set.
   */
  readonly tags?: { [key: string]: string };

  /**
   * The OS disk configuration for the virtual machines.
   * @default - Uses a disk with caching set to "ReadWrite" and storage account type "Standard_LRS".
   */
  readonly osDisk?: {
    caching?: string;
    storageAccountType?: string;
    diskSizeGB?: number;
    createOption?: string;
    deleteOption?: string;
    writeAcceleratorEnabled?: boolean;
  };

  /**
   * The subnet resource where the virtual machines will be placed.
   */
  readonly subnet?: resource.Resource;

  /**
   * The number of VM instances in the scale set.
   * @default 2
   */
  readonly instances?: number;

  /**
   * Specifies the scale set's upgrade policy settings.
   */
  readonly upgradePolicyMode?: string;

  /**
   * Specifies if the VMSS should be overprovisioned.
   * @default true
   */
  readonly overprovision?: boolean;

  /**
   * Enable managed identity for the VMSS.
   * @default false
   */
  readonly enableManagedIdentity?: boolean;

  /**
   * Lifecycle rules to ignore changes.
   */
  readonly ignoreChanges?: string[];

  /**
   * Enable SSH Azure AD Login, required managed identity to be set.
   * @default false
   */
  readonly enableSshAzureADLogin?: boolean;

  /**
   * The priority for the virtual machines in the scale set.
   * Possible values: Regular, Low, Spot
   * @default "Regular"
   */
  readonly priority?: string;

  /**
   * The eviction policy for Azure Spot virtual machines.
   * Possible values: Deallocate, Delete
   * @default "Deallocate"
   */
  readonly evictionPolicy?: string;

  /**
   * Specifies the billing related details of a Azure Spot VMSS.
   */
  readonly maxPrice?: number;

  /**
   * Fault Domain count for each placement group.
   */
  readonly platformFaultDomainCount?: number;

  /**
   * When true this limits the scale set to a single placement group.
   * @default true
   */
  readonly singlePlacementGroup?: boolean;

  /**
   * Whether to force strictly even Virtual Machine distribution cross x-zones.
   */
  readonly zoneBalance?: boolean;

  /**
   * Specifies whether extension operations should be allowed on the VMSS.
   * @default true
   */
  readonly allowExtensionOperations?: boolean;

  /**
   * Indicates whether virtual machine agent should be provisioned on the VM.
   * @default true
   */
  readonly provisionVMAgent?: boolean;

  /**
   * Specifies whether password authentication should be disabled.
   * @default - Determined by presence of adminPassword
   */
  readonly disablePasswordAuthentication?: boolean;

  /**
   * Specifies VM Guest patch assessment mode.
   * Possible values: ImageDefault, AutomaticByPlatform
   * @default "ImageDefault"
   */
  readonly patchAssessmentMode?: string;

  /**
   * Specifies VM Guest patching mode.
   * Possible values: ImageDefault, AutomaticByPlatform
   * @default "ImageDefault"
   */
  readonly patchMode?: string;

  /**
   * Indicates whether VMAgent Platform Updates is enabled.
   * @default false
   */
  readonly enableVMAgentPlatformUpdates?: boolean;

  /**
   * Lifecycle settings for the Terraform resource.
   *
   * @remarks
   * This property specifies the lifecycle customizations for the Terraform resource,
   * allowing you to define specific actions to be taken during the lifecycle of the
   * resource. It can include settings such as create before destroy, prevent destroy,
   * ignore changes, etc.
   */
  readonly lifecycle?: cdktf.TerraformMetaArguments["lifecycle"];
}

export class LinuxCluster extends AzureResource {
  public readonly props: LinuxClusterProps;
  public readonly resourceGroup: ResourceGroup;
  public id: string;
  public readonly name: string;
  public readonly fqn: string;
  public readonly vmss: resource.Resource;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;

  /**
   * Represents a Linux Virtual Machine Scale Set (VMSS) within Microsoft Azure.
   *
   * This class is designed to provision and manage a scale set of Linux virtual machines, providing capabilities such as
   * auto-scaling, high availability, and simplified management. It supports detailed configurations like VM size, operating
   * system image, network settings, and administrative credentials. Additional functionalities include custom data scripts,
   * SSH configurations, and optional features like managed identity and boot diagnostics.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) application.
   * @param id - The unique identifier for this instance of the Linux cluster, used within the scope for reference.
   * @param props - Configuration properties for the Linux VM Scale Set, derived from the LinuxClusterProps interface. These include:
   *                - `location`: The geographic location where the scale set will be hosted (e.g., "eastus").
   *                - `name`: The name of the scale set, which must be unique within the resource group.
   *                - `resourceGroup`: Optional. Reference to the resource group for deployment.
   *                - `sku`: The size specification of the VMs (e.g., "Standard_B2s").
   *                - `adminUsername`: The administrator username for the VMs.
   *                - `adminPassword`: The administrator password for the VMs.
   *                - `adminSshKey`: SSH keys for secure access to the VMs.
   *                - `zones`: The availability zones for deploying the VMs.
   *                - `identity`: Managed identity settings for accessing other Azure services.
   *                - `sourceImageReference`: A reference to the specific Linux image to be used for the VMs.
   *                - `sourceImageId`: The identifier for a custom image to use for the VMs.
   *                - `tags`: Key-value pairs for resource tagging.
   *                - `osDisk`: Configuration for the VMs' operating system disks.
   *                - `subnet`: Specifies the subnet within which the VMs will be placed.
   *                - `publicIPAddress`: Method used to allocate public IP addresses to the VMs.
   *                - `customData`: Scripts or commands passed to the VMs at startup.
   *                - `instances`: The number of VM instances in the scale set.
   *                - `upgradePolicyMode`: The upgrade policy mode for the VMSS.
   *                - `overprovision`: Specifies if the VMSS should be overprovisioned to maintain capacity during updates.
   *                - `scaleInPolicy`: The scale-in policy for the VMSS.
   *                - `bootDiagnosticsStorageURI`: URI for storage where VMSS boot diagnostics are collected.
   *                - `enableSshAzureADLogin`: Option to enable Azure AD login for SSH on the VMs.
   *
   * Example usage:
   * ```typescript
   * const linuxCluster = new LinuxCluster(this, 'MyLinuxCluster', {
   *   resourceGroup: myResourceGroup,
   *   name: 'myCluster',
   *   sku: 'Standard_DS1_v2',
   *   adminUsername: 'adminuser',
   *   adminSshKey: [{ publicKey: 'ssh-rsa AAAAB...' }],
   *   sourceImageReference: { publisher: 'Canonical', offer: 'UbuntuServer', sku: '18.04-LTS', version: 'latest' },
   *   osDisk: { caching: 'ReadWrite', storageAccountType: 'Standard_LRS' },
   *   subnet: mySubnet,
   *   instances: 3,
   *   tags: { environment: 'production' }
   * });
   * ```
   * This class initializes a Linux VM Scale Set with the specified configurations, handling details like VM creation,
   * scaling policies, network setup, OS installation, and security settings, providing a robust and scalable infrastructure
   * for hosting cloud-based Linux applications.
   */
  constructor(scope: Construct, id: string, props: LinuxClusterProps = {}) {
    super(scope, id);

    this.props = props;

    // Create or use existing resource group
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "rg", {
        location: props.location || "eastus",
      });

    const pathName = this.node.path.split("/")[0];

    const defaults = {
      name: props.name || pathName,
      adminUsername: props.adminUsername || `admin${pathName}`,
      location: props.location || "eastus",
      sku: props.sku || "Standard_B2s",
      instances: props.instances || 1,
      osDisk: {
        caching: props.osDisk?.caching || "ReadWrite",
        storageAccountType: props.osDisk?.storageAccountType || "Standard_LRS",
        createOption: props.osDisk?.createOption || "FromImage",
        diskSizeGB: props.osDisk?.diskSizeGB,
        deleteOption: props.osDisk?.deleteOption,
        writeAcceleratorEnabled: props.osDisk?.writeAcceleratorEnabled,
      },
      sourceImageReference:
        props.sourceImageReference || LinuxImageReferences.ubuntuServer2204LTS,
      subnet: props.subnet || new Network(this, "vnet", {}).subnets.default,
    };

    // Create the Linux Virtual Machine Scale Set using AzAPI
    this.vmss = new resource.Resource(this, "vmss", {
      name: defaults.name,
      location: defaults.location,
      type: "Microsoft.Compute/virtualMachineScaleSets@2023-09-01",
      parentId: this.resourceGroup.resourceGroup.id,
      body: {
        sku: {
          name: defaults.sku,
          tier: "Standard",
          capacity: defaults.instances,
        },
        properties: {
          overprovision: props.overprovision ?? true,
          upgradePolicy: {
            mode: props.upgradePolicyMode || "Manual",
          },
          virtualMachineProfile: {
            storageProfile: {
              osDisk: {
                caching: defaults.osDisk.caching,
                createOption: "FromImage",
                managedDisk: {
                  storageAccountType: defaults.osDisk.storageAccountType,
                },
              },
              imageReference: props.sourceImageId
                ? {
                    id: props.sourceImageId,
                  }
                : defaults.sourceImageReference,
            },
            osProfile: {
              computerNamePrefix: defaults.name,
              adminUsername: defaults.adminUsername,
              adminPassword: props.adminPassword,
              customData: props.userData
                ? Buffer.from(props.userData).toString("base64")
                : undefined,
              linuxConfiguration: {
                disablePasswordAuthentication:
                  props.disablePasswordAuthentication ??
                  (props.adminPassword ? false : true),
                provisionVMAgent: props.provisionVMAgent ?? true,
                enableVMAgentPlatformUpdates:
                  props.enableVMAgentPlatformUpdates ?? false,
                patchSettings: {
                  assessmentMode: props.patchAssessmentMode || "ImageDefault",
                  patchMode: props.patchMode || "ImageDefault",
                },
                ssh: props.sshPublicKey
                  ? {
                      publicKeys: [
                        {
                          path: `/home/${defaults.adminUsername}/.ssh/authorized_keys`,
                          keyData: props.sshPublicKey,
                        },
                      ],
                    }
                  : undefined,
              },
            },
            networkProfile: {
              networkInterfaceConfigurations: [
                {
                  name: `nic-${defaults.name}`,
                  properties: {
                    primary: true,
                    ipConfigurations: [
                      {
                        name: "internal",
                        properties: {
                          primary: true,
                          subnet: {
                            id: defaults.subnet.id,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        zones: props.zones,
        identity: props.enableManagedIdentity
          ? {
              type: "SystemAssigned",
            }
          : undefined,
      },
      tags: props.tags,
    });

    // Add lifecycle ignore changes if specified
    if (props.ignoreChanges && props.ignoreChanges.length > 0) {
      this.vmss.addOverride("lifecycle", [
        {
          ignore_changes: props.ignoreChanges,
        },
      ]);
    }

    this.id = this.vmss.id;
    this.name = defaults.name;
    this.fqn = this.vmss.fqn;

    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.vmss.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.vmss.name,
    });

    // Override logical IDs to match original naming
    this.nameOutput.overrideLogicalId("name");
    this.idOutput.overrideLogicalId("id");
  }
}

export interface WindowsClusterProps {
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
   * If not provided, a new resource group will be created.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The size of the virtual machine.
   * @default "Standard_B2s"
   */
  readonly sku?: string;

  /**
   * The admin username for the virtual machine.
   */
  readonly adminUsername: string;

  /**
   * The admin password for the virtual machine.
   */
  readonly adminPassword: string;

  /**
   * The availability zone(s) in which the VMs should be placed.
   */
  readonly zones?: string[];

  /**
   * The number of VM instances in the scale set.
   * @default 2
   */
  readonly instances?: number;

  /**
   * The source image reference for the virtual machine.
   * @default - Uses WindowsServer2022DatacenterCore.
   */
  readonly sourceImageReference?: {
    publisher: string;
    offer: string;
    sku: string;
    version: string;
  };

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
  readonly osDisk?: {
    caching?: string;
    storageAccountType?: string;
  };

  /**
   * The subnet resource where the virtual machine will be placed.
   * @default - Uses the default subnet from a new virtual network.
   */
  readonly subnet?: resource.Resource;

  /**
   * Specifies the scale set's upgrade policy settings.
   */
  readonly upgradePolicyMode?: string;

  /**
   * Custom data to pass to the virtual machine upon creation.
   */
  readonly customData?: string;

  /**
   * Specifies if the VMSS should be overprovisioned.
   * @default true
   */
  readonly overprovision?: boolean;

  /**
   * Enable managed identity for the VMSS.
   * @default false
   */
  readonly enableManagedIdentity?: boolean;

  /**
   * Lifecycle rules to ignore changes.
   */
  readonly ignoreChanges?: string[];
}

export class WindowsCluster extends AzureResource {
  readonly props: WindowsClusterProps;
  public readonly resourceGroup: ResourceGroup;
  public id: string;
  public readonly name: string;
  public readonly vmss: resource.Resource;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;

  /**
   * Represents a Windows Virtual Machine Scale Set (VMSS) within Microsoft Azure.
   *
   * This class provides a way to deploy and manage a scale set of Windows virtual machines, allowing for configurations such as
   * auto-scaling, high availability, and simplified patch management. It supports detailed specifications including
   * VM size, the operating system image, network settings, and administrative credentials. Additional capabilities include
   * custom data scripts, automatic OS updates, and optional features like managed identity and boot diagnostics.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) application.
   * @param id - The unique identifier for this instance of the Windows cluster, used within the scope for reference.
   * @param props - Configuration properties for the Windows VM Scale Set, derived from the WindowsClusterProps interface. These include:
   *                - `location`: The geographic location where the scale set will be hosted (e.g., "eastus").
   *                - `name`: The name of the scale set, which must be unique within the resource group.
   *                - `resourceGroup`: Optional. Reference to the resource group for deployment.
   *                - `sku`: The size specification of the VMs (e.g., "Standard_B2s").
   *                - `adminUsername`: The administrator username for the VMs.
   *                - `adminPassword`: The administrator password for the VMs.
   *                - `zones`: The availability zones for deploying the VMs.
   *                - `instances`: The number of VM instances in the scale set.
   *                - `sourceImageReference`: A reference to the specific Windows image to be used for the VMs.
   *                - `sourceImageId`: The identifier for a custom image to use for the VMs.
   *                - `tags`: Key-value pairs for resource tagging.
   *                - `osDisk`: Configuration for the VMs' operating system disks.
   *                - `subnet`: Specifies the subnet within which the VMs will be placed.
   *                - `publicIPAddress`: Method used to allocate public IP addresses to the VMs.
   *                - `customData`: Scripts or commands passed to the VMs at startup.
   *                - `upgradePolicyMode`: The upgrade policy mode for the VMSS.
   *                - `overprovision`: Specifies if the VMSS should be overprovisioned to maintain capacity during updates.
   *                - `scaleInPolicy`: The scale-in policy for the VMSS.
   *                - `bootDiagnosticsStorageURI`: URI for storage where VMSS boot diagnostics are collected.
   *                - `enableSshAzureADLogin`: Option to enable Azure AD login for SSH on the VMs.
   *
   * Example usage:
   * ```typescript
   * const windowsCluster = new WindowsCluster(this, 'MyWindowsCluster', {
   *   resourceGroup: myResourceGroup,
   *   name: 'myCluster',
   *   sku: 'Standard_DS1_v2',
   *   adminUsername: 'adminuser',
   *   adminPassword: 'securepassword123',
   *   sourceImageReference: { publisher: 'MicrosoftWindowsServer', offer: 'WindowsServer', sku: '2019-Datacenter', version: 'latest' },
   *   osDisk: { caching: 'ReadWrite', storageAccountType: 'Standard_LRS' },
   *   subnet: mySubnet,
   *   instances: 3,
   *   tags: { environment: 'production' }
   * });
   * ```
   * This class initializes a Windows VM Scale Set with the specified configurations, handling details like VM creation,
   * scaling policies, network setup, OS installation, and security settings, providing a robust and scalable infrastructure
   * for hosting cloud-based Windows applications.
   */
  constructor(scope: Construct, id: string, props: WindowsClusterProps) {
    super(scope, id);

    this.props = props;

    // Create or use existing resource group
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "rg", {
        location: props.location || "eastus",
      });

    const pathName = this.node.path.split("/")[0];

    // Default configurations for the virtual machine.
    const defaults = {
      name: props.name || this.node.path.split("/")[0],
      adminUsername: props.adminUsername || `admin${pathName}`,
      location: props.location || "eastus",
      sku: props.sku || "Standard_B2s",
      instances: props.instances || 1,
      osDisk: props.osDisk || {
        caching: "ReadWrite",
        storageAccountType: "Standard_LRS",
      },
      sourceImageReference:
        props.sourceImageReference ||
        WindowsImageReferences.windowsServer2022DatacenterCore,
      subnet: props.subnet || new Network(this, "vnet", {}).subnets.default,
    };

    // Create the Windows Virtual Machine Scale Set using AzAPI
    this.vmss = new resource.Resource(this, "vmss", {
      name: defaults.name,
      location: defaults.location,
      type: "Microsoft.Compute/virtualMachineScaleSets@2023-09-01",
      parentId: this.resourceGroup.resourceGroup.id,
      body: {
        sku: {
          name: defaults.sku,
          tier: "Standard",
          capacity: defaults.instances,
        },
        properties: {
          overprovision: props.overprovision ?? true,
          upgradePolicy: {
            mode: props.upgradePolicyMode || "Manual",
          },
          virtualMachineProfile: {
            storageProfile: {
              osDisk: {
                caching: defaults.osDisk.caching,
                createOption: "FromImage",
                managedDisk: {
                  storageAccountType: defaults.osDisk.storageAccountType,
                },
              },
              imageReference: props.sourceImageId
                ? {
                    id: props.sourceImageId,
                  }
                : defaults.sourceImageReference,
            },
            osProfile: {
              computerNamePrefix: defaults.name,
              adminUsername: props.adminUsername,
              adminPassword: props.adminPassword,
              customData: props.customData
                ? Buffer.from(props.customData).toString("base64")
                : undefined,
            },
            networkProfile: {
              networkInterfaceConfigurations: [
                {
                  name: `nic-${defaults.name}`,
                  properties: {
                    primary: true,
                    ipConfigurations: [
                      {
                        name: "internal",
                        properties: {
                          primary: true,
                          subnet: {
                            id: defaults.subnet.id,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        zones: props.zones,
        identity: props.enableManagedIdentity
          ? {
              type: "SystemAssigned",
            }
          : undefined,
      },
      tags: props.tags,
    });

    // Add lifecycle ignore changes if specified
    if (props.ignoreChanges && props.ignoreChanges.length > 0) {
      this.vmss.addOverride("lifecycle", [
        {
          ignore_changes: props.ignoreChanges,
        },
      ]);
    }

    this.id = this.vmss.id;
    this.name = defaults.name;

    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.vmss.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.vmss.name,
    });

    // Override logical IDs to match original naming
    this.nameOutput.overrideLogicalId("name");
    this.idOutput.overrideLogicalId("id");
  }
}
