import { Construct } from "constructs";
import {
  VirtualMachinesExtensions,
  VirtualMachinesExtensionsProps,
} from "./virtualmachinesextensions";
import {
  VirtualMachinesRunCommands,
  VirtualMachinesRunCommandsProps,
} from "./virtualmachinesruncommands";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface VirtualMachinesProps extends IAzAPIBaseProps {
  /**
   * The extended location of the Virtual Machine.
   */
  extendedLocation?: ExtendedLocation;
  /**
   * Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**.
   */
  plan?: Plan;
  /**
   * Describes the properties of a Virtual Machine.
   */
  properties?: VirtualMachineProperties;
  /**
   * The virtual machine zones.
   */
  zones?: string[];
}

export interface VirtualMachineProperties {
  /**
   * Specifies additional capabilities enabled or disabled on the virtual machine.
   */
  additionalCapabilities?: AdditionalCapabilities;
  /**
   * Specifies the gallery applications that should be made available to the VM/VMSS.
   */
  applicationProfile?: ApplicationProfile;
  /**
   * Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates). Currently, a VM can only be added to availability set at creation time. The availability set to which the VM is being added should be under the same resource group as the availability set resource. An existing VM cannot be added to an availability set. This property cannot exist along with a non-null properties.virtualMachineScaleSet reference.
   */
  availabilitySet?: SubResource;
  /**
   * Specifies the billing related details of a Azure Spot virtual machine. Minimum api-version: 2019-03-01.
   */
  billingProfile?: BillingProfile;
  /**
   * Specifies information about the capacity reservation that is used to allocate virtual machine. Minimum api-version: 2021-04-01.
   */
  capacityReservation?: CapacityReservationProfile;
  /**
   * Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15.
   */
  diagnosticsProfile?: DiagnosticsProfile;
  /**
   * Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview.
   */
  evictionPolicy?: string;
  /**
   * Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum api-version: 2020-06-01.
   */
  extensionsTimeBudget?: string;
  /**
   * Specifies the hardware settings for the virtual machine.
   */
  hardwareProfile?: HardwareProfile;
  /**
   * Specifies information about the dedicated host that the virtual machine resides in. Minimum api-version: 2018-10-01.
   */
  host?: SubResource;
  /**
   * Specifies information about the dedicated host group that the virtual machine resides in. **Note:** User cannot specify both host and hostGroup properties. Minimum api-version: 2020-06-01.
   */
  hostGroup?: SubResource;
  /**
   * Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15
   */
  licenseType?: string;
  /**
   * Specifies the network interfaces of the virtual machine.
   */
  networkProfile?: NetworkProfile;
  /**
   * Specifies the operating system settings used while creating the virtual machine. Some of the settings cannot be changed once VM is provisioned.
   */
  osProfile?: OsProfile;
  /**
   * Specifies the scale set logical fault domain into which the Virtual Machine will be created. By default, the Virtual Machine will by automatically assigned to a fault domain that best maintains balance across available fault domains. This is applicable only if the 'virtualMachineScaleSet' property of this Virtual Machine is set. The Virtual Machine Scale Set that is referenced, must have 'platformFaultDomainCount' greater than 1. This property cannot be updated once the Virtual Machine is created. Fault domain assignment can be viewed in the Virtual Machine Instance View. Minimum api‐version: 2020‐12‐01.
   */
  platformFaultDomain?: number;
  /**
   * Specifies the priority for the virtual machine. Minimum api-version: 2019-03-01
   */
  priority?: string;
  /**
   * Specifies information about the proximity placement group that the virtual machine should be assigned to. Minimum api-version: 2018-04-01.
   */
  proximityPlacementGroup?: SubResource;
  /**
   * Specifies Redeploy, Reboot and ScheduledEventsAdditionalPublishingTargets Scheduled Event related configurations for the virtual machine.
   */
  scheduledEventsPolicy?: ScheduledEventsPolicy;
  /**
   * Specifies Scheduled Event related configurations.
   */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /**
   * Specifies the Security related profile settings for the virtual machine.
   */
  securityProfile?: SecurityProfile;
  /**
   * Specifies the storage settings for the virtual machine disks.
   */
  storageProfile?: StorageProfile;
  /**
   * UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum api-version: 2021-03-01.
   */
  userData?: string;
  /**
   * Specifies information about the virtual machine scale set that the virtual machine should be assigned to. Virtual machines specified in the same virtual machine scale set are allocated to different nodes to maximize availability. Currently, a VM can only be added to virtual machine scale set at creation time. An existing VM cannot be added to a virtual machine scale set. This property cannot exist along with a non-null properties.availabilitySet reference. Minimum api‐version: 2019‐03‐01.
   */
  virtualMachineScaleSet?: SubResource;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface StorageProfile {
  /**
   * Specifies the parameters that are used to add a data disk to a virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview).
   */
  dataDisks?: DataDisk[];
  /**
   * Specifies the disk controller type configured for the VM. **Note:** This property will be set to the default disk controller type if not specified provided virtual machine is being created with 'hyperVGeneration' set to V2 based on the capabilities of the operating system disk and VM size from the the specified minimum api version. You need to deallocate the VM before updating its disk controller type unless you are updating the VM size in the VM configuration which implicitly deallocates and reallocates the VM. Minimum api-version: 2022-08-01.
   */
  diskControllerType?: string;
  /**
   * Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations.
   */
  imageReference?: ImageReference;
  /**
   * Specifies information about the operating system disk used by the virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview).
   */
  osDisk?: OsDisk;
}

export interface OsDisk {
  /**
   * Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The defaulting behavior is: **None for Standard storage. ReadOnly for Premium storage.**
   */
  caching?: string;
  /**
   * Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described.
   */
  createOption: string;
  /**
   * Specifies whether OS Disk should be deleted or detached upon VM deletion. Possible values are: **Delete.** If this value is used, the OS disk is deleted when VM is deleted. **Detach.** If this value is used, the os disk is retained after VM is deleted. The default value is set to **Detach**. For an ephemeral OS Disk, the default value is set to **Delete**. The user cannot change the delete option for an ephemeral OS Disk.
   */
  deleteOption?: string;
  /**
   * Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine.
   */
  diffDiskSettings?: DiffDiskSettings;
  /**
   * Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023.
   */
  diskSizeGB?: number;
  /**
   * Specifies the encryption settings for the OS Disk. Minimum api-version: 2015-06-15.
   */
  encryptionSettings?: DiskEncryptionSettings;
  /**
   * The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist.
   */
  image?: VirtualHardDisk;
  /**
   * The managed disk parameters.
   */
  managedDisk?: ManagedDiskParameters;
  /**
   * The disk name.
   */
  name?: string;
  /**
   * This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.**
   */
  osType?: string;
  /**
   * The virtual hard disk.
   */
  vhd?: VirtualHardDisk;
  /**
   * Specifies whether writeAccelerator should be enabled or disabled on the disk.
   */
  writeAcceleratorEnabled?: boolean;
}

export interface VirtualHardDisk {
  /**
   * Specifies the virtual hard disk's uri.
   */
  uri?: string;
}

export interface ManagedDiskParameters {
  /**
   * Specifies the customer managed disk encryption set resource id for the managed disk.
   */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /**
   * Resource Id
   */
  id?: string;
  /**
   * Specifies the security profile for the managed disk.
   */
  securityProfile?: VmDiskSecurityProfile;
  /**
   * Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk.
   */
  storageAccountType?: string;
}

export interface VmDiskSecurityProfile {
  /**
   * Specifies the customer managed disk encryption set resource id for the managed disk that is used for Customer Managed Key encrypted ConfidentialVM OS Disk and VMGuest blob.
   */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /**
   * Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs.
   */
  securityEncryptionType?: string;
}

export interface DiskEncryptionSetParameters {
  /**
   * Resource Id
   */
  id?: string;
}

export interface DiskEncryptionSetParameters {
  /**
   * Resource Id
   */
  id?: string;
}

export interface VirtualHardDisk {
  /**
   * Specifies the virtual hard disk's uri.
   */
  uri?: string;
}

export interface DiskEncryptionSettings {
  /**
   * Specifies the location of the disk encryption key, which is a Key Vault Secret.
   */
  diskEncryptionKey?: KeyVaultSecretReference;
  /**
   * Specifies whether disk encryption should be enabled on the virtual machine.
   */
  enabled?: boolean;
  /**
   * Specifies the location of the key encryption key in Key Vault.
   */
  keyEncryptionKey?: KeyVaultKeyReference;
}

export interface KeyVaultKeyReference {
  /**
   * The URL referencing a key encryption key in Key Vault.
   */
  keyUrl: string;
  /**
   * The relative URL of the Key Vault containing the key.
   */
  sourceVault?: SubResource;
}

export interface KeyVaultSecretReference {
  /**
   * The URL referencing a secret in a Key Vault.
   */
  secretUrl: string;
  /**
   * The relative URL of the Key Vault containing the secret.
   */
  sourceVault?: SubResource;
}

export interface DiffDiskSettings {
  /**
   * Specifies the ephemeral disk settings for operating system disk.
   */
  option?: string;
  /**
   * Specifies the ephemeral disk placement for operating system disk. Possible values are: **CacheDisk,** **ResourceDisk,** **NvmeDisk.** The defaulting behavior is: **CacheDisk** if one is configured for the VM size otherwise **ResourceDisk** or **NvmeDisk** is used. Refer to the VM size documentation for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/sizes and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/sizes to check which VM sizes exposes a cache disk. Minimum api-version for NvmeDisk: 2024-03-01.
   */
  placement?: string;
}

export interface ImageReference {
  /**
   * Specified the community gallery image unique id for vm deployment. This can be fetched from community gallery image GET call.
   */
  communityGalleryImageId?: string;
  /**
   * Resource Id
   */
  id?: string;
  /**
   * Specifies the offer of the platform image or marketplace image used to create the virtual machine.
   */
  offer?: string;
  /**
   * The image publisher.
   */
  publisher?: string;
  /**
   * Specified the shared gallery image unique id for vm deployment. This can be fetched from shared gallery image GET call.
   */
  sharedGalleryImageId?: string;
  /**
   * The image SKU.
   */
  sku?: string;
  /**
   * Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. Please do not use field 'version' for gallery image deployment, gallery image should always use 'id' field for deployment, to use 'latest' version of gallery image, just set '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}' in the 'id' field without version input.
   */
  version?: string;
}

export interface DataDisk {
  /**
   * Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The defaulting behavior is: **None for Standard storage. ReadOnly for Premium storage.**
   */
  caching?: string;
  /**
   * Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine data disk. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point.
   */
  createOption: string;
  /**
   * Specifies whether data disk should be deleted or detached upon VM deletion. Possible values are: **Delete.** If this value is used, the data disk is deleted when VM is deleted. **Detach.** If this value is used, the data disk is retained after VM is deleted. The default value is set to **Detach**.
   */
  deleteOption?: string;
  /**
   * Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview** mode and is not supported for VirtualMachineScaleSet. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'.
   */
  detachOption?: string;
  /**
   * Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023.
   */
  diskSizeGB?: number;
  /**
   * The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist.
   */
  image?: VirtualHardDisk;
  /**
   * Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM.
   */
  lun: number;
  /**
   * The managed disk parameters.
   */
  managedDisk?: ManagedDiskParameters;
  /**
   * The disk name.
   */
  name?: string;
  /**
   * The source resource identifier. It can be a snapshot, or disk restore point from which to create a disk.
   */
  sourceResource?: ApiEntityReference;
  /**
   * Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset
   */
  toBeDetached?: boolean;
  /**
   * The virtual hard disk.
   */
  vhd?: VirtualHardDisk;
  /**
   * Specifies whether writeAccelerator should be enabled or disabled on the disk.
   */
  writeAcceleratorEnabled?: boolean;
}

export interface ApiEntityReference {
  /**
   * The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/...
   */
  id?: string;
}

export interface SecurityProfile {
  /**
   * This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. The default behavior is: The Encryption at host will be disabled unless this property is set to true for the resource.
   */
  encryptionAtHost?: boolean;
  /**
   * Specifies the Managed Identity used by ADE to get access token for keyvault operations.
   */
  encryptionIdentity?: EncryptionIdentity;
  /**
   * Specifies ProxyAgent settings while creating the virtual machine. Minimum api-version: 2024-03-01.
   */
  proxyAgentSettings?: ProxyAgentSettings;
  /**
   * Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set.
   */
  securityType?: string;
  /**
   * Specifies the security settings like secure boot and vTPM used while creating the virtual machine. Minimum api-version: 2020-12-01.
   */
  uefiSettings?: UefiSettings;
}

export interface UefiSettings {
  /**
   * Specifies whether secure boot should be enabled on the virtual machine. Minimum api-version: 2020-12-01.
   */
  secureBootEnabled?: boolean;
  /**
   * Specifies whether vTPM should be enabled on the virtual machine. Minimum api-version: 2020-12-01.
   */
  vTpmEnabled?: boolean;
}

export interface ProxyAgentSettings {
  /**
   * Specifies whether ProxyAgent feature should be enabled on the virtual machine or virtual machine scale set.
   */
  enabled?: boolean;
  /**
   * Increase the value of this property allows user to reset the key used for securing communication channel between guest and host.
   */
  keyIncarnationId?: number;
  /**
   * Specifies the mode that ProxyAgent will execute on if the feature is enabled. ProxyAgent will start to audit or monitor but not enforce access control over requests to host endpoints in Audit mode, while in Enforce mode it will enforce access control. The default value is Enforce mode.
   */
  mode?: string;
}

export interface EncryptionIdentity {
  /**
   * Specifies ARM Resource ID of one of the user identities associated with the VM.
   */
  userAssignedIdentityResourceId?: string;
}

export interface ScheduledEventsProfile {
  /**
   * Specifies OS Image Scheduled Event related configurations.
   */
  osImageNotificationProfile?: OsImageNotificationProfile;
  /**
   * Specifies Terminate Scheduled Event related configurations.
   */
  terminateNotificationProfile?: TerminateNotificationProfile;
}

export interface TerminateNotificationProfile {
  /**
   * Specifies whether the Terminate Scheduled event is enabled or disabled.
   */
  enable?: boolean;
  /**
   * Configurable length of time a Virtual Machine being deleted will have to potentially approve the Terminate Scheduled Event before the event is auto approved (timed out). The configuration must be specified in ISO 8601 format, the default value is 5 minutes (PT5M)
   */
  notBeforeTimeout?: string;
}

export interface OsImageNotificationProfile {
  /**
   * Specifies whether the OS Image Scheduled event is enabled or disabled.
   */
  enable?: boolean;
  /**
   * Length of time a Virtual Machine being reimaged or having its OS upgraded will have to potentially approve the OS Image Scheduled Event before the event is auto approved (timed out). The configuration is specified in ISO 8601 format, and the value must be 15 minutes (PT15M)
   */
  notBeforeTimeout?: string;
}

export interface ScheduledEventsPolicy {
  /**
   * The configuration parameters used while publishing scheduledEventsAdditionalPublishingTargets.
   */
  scheduledEventsAdditionalPublishingTargets?: ScheduledEventsAdditionalPublishingTargets;
  /**
   * The configuration parameters used while creating userInitiatedReboot scheduled event setting creation.
   */
  userInitiatedReboot?: UserInitiatedReboot;
  /**
   * The configuration parameters used while creating userInitiatedRedeploy scheduled event setting creation.
   */
  userInitiatedRedeploy?: UserInitiatedRedeploy;
}

export interface UserInitiatedRedeploy {
  /**
   * Specifies Redeploy Scheduled Event related configurations.
   */
  automaticallyApprove?: boolean;
}

export interface UserInitiatedReboot {
  /**
   * Specifies Reboot Scheduled Event related configurations.
   */
  automaticallyApprove?: boolean;
}

export interface ScheduledEventsAdditionalPublishingTargets {
  /**
   * The configuration parameters used while creating eventGridAndResourceGraph Scheduled Event setting.
   */
  eventGridAndResourceGraph?: EventGridAndResourceGraph;
}

export interface EventGridAndResourceGraph {
  /**
   * Specifies if event grid and resource graph is enabled for Scheduled event related configurations.
   */
  enable?: boolean;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface OsProfile {
  /**
   * Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection)
   */
  adminPassword?: string;
  /**
   * Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters.
   */
  adminUsername?: string;
  /**
   * Specifies whether extension operations should be allowed on the virtual machine. This may only be set to False when no extensions are present on the virtual machine.
   */
  allowExtensionOperations?: boolean;
  /**
   * Specifies the host OS name of the virtual machine. This name cannot be updated after the VM is created. **Max-length (Windows):** 15 characters. **Max-length (Linux):** 64 characters. For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/azure-resource-manager/management/resource-name-rules).
   */
  computerName?: string;
  /**
   * Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. **Note: Do not pass any secrets or passwords in customData property.** This property cannot be updated after the VM is created. The property 'customData' is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/). For using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init).
   */
  customData?: string;
  /**
   * Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros).
   */
  linuxConfiguration?: LinuxConfiguration;
  /**
   * Optional property which must either be set to True or omitted.
   */
  requireGuestProvisionSignal?: boolean;
  /**
   * Specifies set of certificates that should be installed onto the virtual machine. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
   */
  secrets?: VaultSecretGroup[];
  /**
   * Specifies Windows operating system settings on the virtual machine.
   */
  windowsConfiguration?: WindowsConfiguration;
}

export interface WindowsConfiguration {
  /**
   * Specifies additional base-64 encoded XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup.
   */
  additionalUnattendContent?: AdditionalUnattendContent[];
  /**
   * Indicates whether Automatic Updates is enabled for the Windows virtual machine. Default value is true. For virtual machine scale sets, this property can be updated and updates will take effect on OS reprovisioning.
   */
  enableAutomaticUpdates?: boolean;
  /**
   * Indicates whether VMAgent Platform Updates is enabled for the Windows virtual machine. Default value is false.
   */
  enableVMAgentPlatformUpdates?: boolean;
  /**
   * [Preview Feature] Specifies settings related to VM Guest Patching on Windows.
   */
  patchSettings?: PatchSettings;
  /**
   * Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, it is set to true by default. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later.
   */
  provisionVMAgent?: boolean;
  /**
   * Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time". Possible values can be [TimeZoneInfo.Id](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) value from time zones returned by [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones).
   */
  timeZone?: string;
  /**
   * Specifies the Windows Remote Management listeners. This enables remote Windows PowerShell.
   */
  winRM?: WinRmConfiguration;
}

export interface WinRmConfiguration {
  /**
   * The list of Windows Remote Management listeners
   */
  listeners?: WinRmListener[];
}

export interface WinRmListener {
  /**
   * This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
   */
  certificateUrl?: string;
  /**
   * Specifies the protocol of WinRM listener. Possible values are: **http,** **https.**
   */
  protocol?: string;
}

export interface PatchSettings {
  /**
   * Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true.
   */
  assessmentMode?: string;
  /**
   * Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Windows.
   */
  automaticByPlatformSettings?: WindowsVmGuestPatchAutomaticByPlatformSettings;
  /**
   * Enables customers to patch their Azure VMs without requiring a reboot. For enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode' must be set to 'AutomaticByPlatform'.
   */
  enableHotpatching?: boolean;
  /**
   * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true
   */
  patchMode?: string;
}

export interface WindowsVmGuestPatchAutomaticByPlatformSettings {
  /**
   * Enables customer to schedule patching without accidental upgrades
   */
  bypassPlatformSafetyChecksOnUserSchedule?: boolean;
  /**
   * Specifies the reboot setting for all AutomaticByPlatform patch installation operations.
   */
  rebootSetting?: string;
}

export interface AdditionalUnattendContent {
  /**
   * The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup.
   */
  componentName?: string;
  /**
   * Specifies the XML formatted content that is added to the unattend.xml file for the specified path and component. The XML must be less than 4KB and must include the root element for the setting or feature that is being inserted.
   */
  content?: string;
  /**
   * The pass name. Currently, the only allowable value is OobeSystem.
   */
  passName?: string;
  /**
   * Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon.
   */
  settingName?: string;
}

export interface VaultSecretGroup {
  /**
   * The relative URL of the Key Vault containing all of the certificates in VaultCertificates.
   */
  sourceVault?: SubResource;
  /**
   * The list of key vault references in SourceVault which contain certificates.
   */
  vaultCertificates?: VaultCertificate[];
}

export interface VaultCertificate {
  /**
   * For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name &lt;UppercaseThumbprint&gt;.crt for the X509 certificate file and &lt;UppercaseThumbprint&gt;.prv for private key. Both of these files are .pem formatted.
   */
  certificateStore?: string;
  /**
   * This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
   */
  certificateUrl?: string;
}

export interface LinuxConfiguration {
  /**
   * Specifies whether password authentication should be disabled.
   */
  disablePasswordAuthentication?: boolean;
  /**
   * Indicates whether VMAgent Platform Updates is enabled for the Linux virtual machine. Default value is false.
   */
  enableVMAgentPlatformUpdates?: boolean;
  /**
   * [Preview Feature] Specifies settings related to VM Guest Patching on Linux.
   */
  patchSettings?: LinuxPatchSettings;
  /**
   * Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, default behavior is to set it to true. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later.
   */
  provisionVMAgent?: boolean;
  /**
   * Specifies the ssh key configuration for a Linux OS.
   */
  ssh?: SshConfiguration;
}

export interface SshConfiguration {
  /**
   * The list of SSH public keys used to authenticate with linux based VMs.
   */
  publicKeys?: SshPublicKey[];
}

export interface SshPublicKey {
  /**
   * SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure]https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed).
   */
  keyData?: string;
  /**
   * Specifies the full path on the created VM where ssh public key is stored. If the file already exists, the specified key is appended to the file. Example: /home/user/.ssh/authorized_keys
   */
  path?: string;
}

export interface LinuxPatchSettings {
  /**
   * Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true.
   */
  assessmentMode?: string;
  /**
   * Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Linux.
   */
  automaticByPlatformSettings?: LinuxVmGuestPatchAutomaticByPlatformSettings;
  /**
   * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true
   */
  patchMode?: string;
}

export interface LinuxVmGuestPatchAutomaticByPlatformSettings {
  /**
   * Enables customer to schedule patching without accidental upgrades
   */
  bypassPlatformSafetyChecksOnUserSchedule?: boolean;
  /**
   * Specifies the reboot setting for all AutomaticByPlatform patch installation operations.
   */
  rebootSetting?: string;
}

export interface NetworkProfile {
  /**
   * specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations
   */
  networkApiVersion?: string;
  /**
   * Specifies the networking configurations that will be used to create the virtual machine networking resources.
   */
  networkInterfaceConfigurations?: VirtualMachineNetworkInterfaceConfiguration[];
  /**
   * Specifies the list of resource Ids for the network interfaces associated with the virtual machine.
   */
  networkInterfaces?: NetworkInterfaceReference[];
}

export interface NetworkInterfaceReference {
  /**
   * Resource Id
   */
  id?: string;
  /**
   * Describes a network interface reference properties.
   */
  properties?: NetworkInterfaceReferenceProperties;
}

export interface NetworkInterfaceReferenceProperties {
  /**
   * Specify what happens to the network interface when the VM is deleted
   */
  deleteOption?: string;
  /**
   * Specifies the primary network interface in case the virtual machine has more than 1 network interface.
   */
  primary?: boolean;
}

export interface VirtualMachineNetworkInterfaceConfiguration {
  /**
   * The network interface configuration name.
   */
  name: string;
  /**
   * Describes a virtual machine network profile's IP configuration.
   */
  properties?: VirtualMachineNetworkInterfaceConfigurationProperties;
}

export interface VirtualMachineNetworkInterfaceConfigurationProperties {
  /**
   * Specifies whether the Auxiliary mode is enabled for the Network Interface resource.
   */
  auxiliaryMode?: string;
  /**
   * Specifies whether the Auxiliary sku is enabled for the Network Interface resource.
   */
  auxiliarySku?: string;
  /**
   * Specify what happens to the network interface when the VM is deleted
   */
  deleteOption?: string;
  /**
   * Specifies whether the network interface is disabled for tcp state tracking.
   */
  disableTcpStateTracking?: boolean;
  /**
   * The dns settings to be applied on the network interfaces.
   */
  dnsSettings?: VirtualMachineNetworkInterfaceDnsSettingsConfiguration;
  /**
   *
   */
  dscpConfiguration?: SubResource;
  /**
   * Specifies whether the network interface is accelerated networking-enabled.
   */
  enableAcceleratedNetworking?: boolean;
  /**
   * Specifies whether the network interface is FPGA networking-enabled.
   */
  enableFpga?: boolean;
  /**
   * Whether IP forwarding enabled on this NIC.
   */
  enableIPForwarding?: boolean;
  /**
   * Specifies the IP configurations of the network interface.
   */
  ipConfigurations: VirtualMachineNetworkInterfaceIpConfiguration[];
  /**
   * The network security group.
   */
  networkSecurityGroup?: SubResource;
  /**
   * Specifies the primary network interface in case the virtual machine has more than 1 network interface.
   */
  primary?: boolean;
}

export interface VirtualMachineNetworkInterfaceIpConfiguration {
  /**
   * The IP configuration name.
   */
  name: string;
  /**
   * Describes a virtual machine network interface IP configuration properties.
   */
  properties?: VirtualMachineNetworkInterfaceIpConfigurationProperties;
}

export interface VirtualMachineNetworkInterfaceIpConfigurationProperties {
  /**
   * Specifies an array of references to backend address pools of application gateways. A virtual machine can reference backend address pools of multiple application gateways. Multiple virtual machines cannot use the same application gateway.
   */
  applicationGatewayBackendAddressPools?: SubResource[];
  /**
   * Specifies an array of references to application security group.
   */
  applicationSecurityGroups?: SubResource[];
  /**
   * Specifies an array of references to backend address pools of load balancers. A virtual machine can reference backend address pools of one public and one internal load balancer. [Multiple virtual machines cannot use the same basic sku load balancer].
   */
  loadBalancerBackendAddressPools?: SubResource[];
  /**
   * Specifies the primary network interface in case the virtual machine has more than 1 network interface.
   */
  primary?: boolean;
  /**
   * Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'.
   */
  privateIPAddressVersion?: string;
  /**
   * The publicIPAddressConfiguration.
   */
  publicIPAddressConfiguration?: VirtualMachinePublicIpAddressConfiguration;
  /**
   * Specifies the identifier of the subnet.
   */
  subnet?: SubResource;
}

export interface VirtualMachinePublicIpAddressConfiguration {
  /**
   * The publicIP address configuration name.
   */
  name: string;
  /**
   * Describes a virtual machines IP Configuration's PublicIPAddress configuration
   */
  properties?: VirtualMachinePublicIpAddressConfigurationProperties;
  /**
   * Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible.
   */
  sku?: PublicIpAddressSku;
}

export interface PublicIpAddressSku {
  /**
   * Specify public IP sku name
   */
  name?: string;
  /**
   * Specify public IP sku tier
   */
  tier?: string;
}

export interface VirtualMachinePublicIpAddressConfigurationProperties {
  /**
   * Specify what happens to the public IP address when the VM is deleted
   */
  deleteOption?: string;
  /**
   * The dns settings to be applied on the publicIP addresses .
   */
  dnsSettings?: VirtualMachinePublicIpAddressDnsSettingsConfiguration;
  /**
   * The idle timeout of the public IP address.
   */
  idleTimeoutInMinutes?: number;
  /**
   * The list of IP tags associated with the public IP address.
   */
  ipTags?: VirtualMachineIpTag[];
  /**
   * Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'.
   */
  publicIPAddressVersion?: string;
  /**
   * Specify the public IP allocation type
   */
  publicIPAllocationMethod?: string;
  /**
   * The PublicIPPrefix from which to allocate publicIP addresses.
   */
  publicIPPrefix?: SubResource;
}

export interface VirtualMachineIpTag {
  /**
   * IP tag type. Example: FirstPartyUsage.
   */
  ipTagType?: string;
  /**
   * IP tag associated with the public IP. Example: SQL, Storage etc.
   */
  tag?: string;
}

export interface VirtualMachinePublicIpAddressDnsSettingsConfiguration {
  /**
   * The Domain name label prefix of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the domain name label and vm network profile unique ID.
   */
  domainNameLabel: string;
  /**
   * The Domain name label scope of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the hashed domain name label with policy according to the domain name label scope and vm network profile unique ID.
   */
  domainNameLabelScope?: string;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface VirtualMachineNetworkInterfaceDnsSettingsConfiguration {
  /**
   * List of DNS servers IP addresses
   */
  dnsServers?: string[];
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface HardwareProfile {
  /**
   * Specifies the size of the virtual machine. The enum data type is currently deprecated and will be removed by December 23rd 2023. The recommended way to get the list of available sizes is using these APIs: [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes), [List all available virtual machine sizes in a region]( https://docs.microsoft.com/rest/api/compute/resourceskus/list), [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/azure/virtual-machines/sizes). The available VM sizes depend on region and availability set.
   */
  vmSize?: string;
  /**
   * Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-07-01. This feature is still in preview mode and is not supported for VirtualMachineScaleSet. Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details.
   */
  vmSizeProperties?: VmSizeProperties;
}

export interface VmSizeProperties {
  /**
   * Specifies the number of vCPUs available for the VM. When this property is not specified in the request body the default behavior is to set it to the value of vCPUs available for that VM size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list).
   */
  vCPUsAvailable?: number;
  /**
   * Specifies the vCPU to physical core ratio. When this property is not specified in the request body the default behavior is set to the value of vCPUsPerCore for the VM Size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). **Setting this property to 1 also means that hyper-threading is disabled.**
   */
  vCPUsPerCore?: number;
}

export interface DiagnosticsProfile {
  /**
   * Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. **NOTE**: If storageUri is being specified then ensure that the storage account is in the same region and subscription as the VM. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor.
   */
  bootDiagnostics?: BootDiagnostics;
}

export interface BootDiagnostics {
  /**
   * Whether boot diagnostics should be enabled on the Virtual Machine.
   */
  enabled?: boolean;
  /**
   * Uri of the storage account to use for placing the console output and screenshot. If storageUri is not specified while enabling boot diagnostics, managed storage will be used.
   */
  storageUri?: string;
}

export interface CapacityReservationProfile {
  /**
   * Specifies the capacity reservation group resource id that should be used for allocating the virtual machine or scaleset vm instances provided enough capacity has been reserved. Please refer to https://aka.ms/CapacityReservation for more details.
   */
  capacityReservationGroup?: SubResource;
}

export interface BillingProfile {
  /**
   * Specifies the maximum price you are willing to pay for a Azure Spot VM/VMSS. This price is in US Dollars. <br><br> This price will be compared with the current Azure Spot price for the VM size. Also, the prices are compared at the time of create/update of Azure Spot VM/VMSS and the operation will only succeed if  the maxPrice is greater than the current Azure Spot price. <br><br> The maxPrice will also be used for evicting a Azure Spot VM/VMSS if the current Azure Spot price goes beyond the maxPrice after creation of VM/VMSS. <br><br> Possible values are: <br><br> - Any decimal value greater than zero. Example: 0.01538 <br><br> -1 – indicates default price to be up-to on-demand. <br><br> You can set the maxPrice to -1 to indicate that the Azure Spot VM/VMSS should not be evicted for price reasons. Also, the default max price is -1 if it is not provided by you. <br><br>Minimum api-version: 2019-03-01.
   */
  maxPrice?: number;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface ApplicationProfile {
  /**
   * Specifies the gallery applications that should be made available to the VM/VMSS
   */
  galleryApplications?: VmGalleryApplication[];
}

export interface VmGalleryApplication {
  /**
   * Optional, Specifies the uri to an azure blob that will replace the default configuration for the package if provided
   */
  configurationReference?: string;
  /**
   * If set to true, when a new Gallery Application version is available in PIR/SIG, it will be automatically updated for the VM/VMSS
   */
  enableAutomaticUpgrade?: boolean;
  /**
   * Optional, Specifies the order in which the packages have to be installed
   */
  order?: number;
  /**
   * Specifies the GalleryApplicationVersion resource id on the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{application}/versions/{version}
   */
  packageReferenceId: string;
  /**
   * Optional, Specifies a passthrough value for more generic context.
   */
  tags?: string;
  /**
   * Optional, If true, any failure for any operation in the VmApplication will fail the deployment
   */
  treatFailureAsDeploymentFailure?: boolean;
}

export interface AdditionalCapabilities {
  /**
   * The flag that enables or disables hibernation capability on the VM.
   */
  hibernationEnabled?: boolean;
  /**
   * The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS. Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled.
   */
  ultraSSDEnabled?: boolean;
}

export interface Plan {
  /**
   * The plan ID.
   */
  name?: string;
  /**
   * Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element.
   */
  product?: string;
  /**
   * The promotion code.
   */
  promotionCode?: string;
  /**
   * The publisher ID.
   */
  publisher?: string;
}

export interface ExtendedLocation {
  /**
   * The name of the extended location.
   */
  name?: string;
  /**
   * The type of the extended location.
   */
  type?: string;
}

export class VirtualMachines extends AzAPIBase {
  /**
       * Constructs a new VirtualMachines.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Compute/virtualMachines@2024-03-01. The properties include:
     * `extendedLocation` - (Optional) The extended location of the Virtual Machine. Defaults to `ExtendedLocation`.
     * `plan` - (Optional) Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. Defaults to `Plan`.
     * `properties` - (Required) Describes the properties of a Virtual Machine. Defaults to `VirtualMachineProperties`.
     * `zones` - (Optional) The virtual machine zones. Defaults to `string[]`.
     *
     * ---
     *
     * The `VirtualMachineProperties` block supports the following:

     * `additionalCapabilities` - (Optional) Specifies additional capabilities enabled or disabled on the virtual machine. Defaults to `AdditionalCapabilities`.
     * `applicationProfile` - (Optional) Specifies the gallery applications that should be made available to the VM/VMSS. Defaults to `ApplicationProfile`.
     * `availabilitySet` - (Optional) Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates). Currently, a VM can only be added to availability set at creation time. The availability set to which the VM is being added should be under the same resource group as the availability set resource. An existing VM cannot be added to an availability set. This property cannot exist along with a non-null properties.virtualMachineScaleSet reference. Defaults to `SubResource`.
     * `billingProfile` - (Optional) Specifies the billing related details of a Azure Spot virtual machine. Minimum api-version: 2019-03-01. Defaults to `BillingProfile`.
     * `capacityReservation` - (Optional) Specifies information about the capacity reservation that is used to allocate virtual machine. Minimum api-version: 2021-04-01. Defaults to `CapacityReservationProfile`.
     * `diagnosticsProfile` - (Optional) Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15. Defaults to `DiagnosticsProfile`.
     * `evictionPolicy` - (Optional) Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. Defaults to `string`.
     * `extensionsTimeBudget` - (Optional) Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum api-version: 2020-06-01. Defaults to `string`.
     * `hardwareProfile` - (Optional) Specifies the hardware settings for the virtual machine. Defaults to `HardwareProfile`.
     * `host` - (Optional) Specifies information about the dedicated host that the virtual machine resides in. Minimum api-version: 2018-10-01. Defaults to `SubResource`.
     * `hostGroup` - (Optional) Specifies information about the dedicated host group that the virtual machine resides in. **Note:** User cannot specify both host and hostGroup properties. Minimum api-version: 2020-06-01. Defaults to `SubResource`.
     * `licenseType` - (Optional) Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 Defaults to `string`.
     * `networkProfile` - (Optional) Specifies the network interfaces of the virtual machine. Defaults to `NetworkProfile`.
     * `osProfile` - (Optional) Specifies the operating system settings used while creating the virtual machine. Some of the settings cannot be changed once VM is provisioned. Defaults to `OsProfile`.
     * `platformFaultDomain` - (Optional) Specifies the scale set logical fault domain into which the Virtual Machine will be created. By default, the Virtual Machine will by automatically assigned to a fault domain that best maintains balance across available fault domains. This is applicable only if the 'virtualMachineScaleSet' property of this Virtual Machine is set. The Virtual Machine Scale Set that is referenced, must have 'platformFaultDomainCount' greater than 1. This property cannot be updated once the Virtual Machine is created. Fault domain assignment can be viewed in the Virtual Machine Instance View. Minimum api‐version: 2020‐12‐01. Defaults to `integer`.
     * `priority` - (Optional) Specifies the priority for the virtual machine. Minimum api-version: 2019-03-01 Defaults to `string`.
     * `proximityPlacementGroup` - (Optional) Specifies information about the proximity placement group that the virtual machine should be assigned to. Minimum api-version: 2018-04-01. Defaults to `SubResource`.
     * `scheduledEventsPolicy` - (Optional) Specifies Redeploy, Reboot and ScheduledEventsAdditionalPublishingTargets Scheduled Event related configurations for the virtual machine. Defaults to `ScheduledEventsPolicy`.
     * `scheduledEventsProfile` - (Optional) Specifies Scheduled Event related configurations. Defaults to `ScheduledEventsProfile`.
     * `securityProfile` - (Optional) Specifies the Security related profile settings for the virtual machine. Defaults to `SecurityProfile`.
     * `storageProfile` - (Optional) Specifies the storage settings for the virtual machine disks. Defaults to `StorageProfile`.
     * `userData` - (Optional) UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum api-version: 2021-03-01. Defaults to `string`.
     * `virtualMachineScaleSet` - (Optional) Specifies information about the virtual machine scale set that the virtual machine should be assigned to. Virtual machines specified in the same virtual machine scale set are allocated to different nodes to maximize availability. Currently, a VM can only be added to virtual machine scale set at creation time. An existing VM cannot be added to a virtual machine scale set. This property cannot exist along with a non-null properties.availabilitySet reference. Minimum api‐version: 2019‐03‐01. Defaults to `SubResource`.
     *
     * ---
     *
     * The `SubResource` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `StorageProfile` block supports the following:

     * `dataDisks` - (Optional) Specifies the parameters that are used to add a data disk to a virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). Defaults to `DataDisk[]`.
     * `diskControllerType` - (Optional) Specifies the disk controller type configured for the VM. **Note:** This property will be set to the default disk controller type if not specified provided virtual machine is being created with 'hyperVGeneration' set to V2 based on the capabilities of the operating system disk and VM size from the the specified minimum api version. You need to deallocate the VM before updating its disk controller type unless you are updating the VM size in the VM configuration which implicitly deallocates and reallocates the VM. Minimum api-version: 2022-08-01. Defaults to `string`.
     * `imageReference` - (Optional) Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. Defaults to `ImageReference`.
     * `osDisk` - (Optional) Specifies information about the operating system disk used by the virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). Defaults to `OsDisk`.
     *
     * ---
     *
     * The `OSDisk` block supports the following:

     * `caching` - (Optional) Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The defaulting behavior is: **None for Standard storage. ReadOnly for Premium storage.** Defaults to `string`.
     * `createOption` - (Required) Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. Defaults to `string`.
     * `deleteOption` - (Optional) Specifies whether OS Disk should be deleted or detached upon VM deletion. Possible values are: **Delete.** If this value is used, the OS disk is deleted when VM is deleted. **Detach.** If this value is used, the os disk is retained after VM is deleted. The default value is set to **Detach**. For an ephemeral OS Disk, the default value is set to **Delete**. The user cannot change the delete option for an ephemeral OS Disk. Defaults to `string`.
     * `diffDiskSettings` - (Optional) Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. Defaults to `DiffDiskSettings`.
     * `diskSizeGB` - (Optional) Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. Defaults to `integer`.
     * `encryptionSettings` - (Optional) Specifies the encryption settings for the OS Disk. Minimum api-version: 2015-06-15. Defaults to `DiskEncryptionSettings`.
     * `image` - (Optional) The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. Defaults to `VirtualHardDisk`.
     * `managedDisk` - (Optional) The managed disk parameters. Defaults to `ManagedDiskParameters`.
     * `name` - (Optional) The disk name. Defaults to `string`.
     * `osType` - (Optional) This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.** Defaults to `string`.
     * `vhd` - (Optional) The virtual hard disk. Defaults to `VirtualHardDisk`.
     * `writeAcceleratorEnabled` - (Optional) Specifies whether writeAccelerator should be enabled or disabled on the disk. Defaults to `boolean`.
     *
     * ---
     *
     * The `VirtualHardDisk` block supports the following:

     * `uri` - (Optional) Specifies the virtual hard disk's uri. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedDiskParameters` block supports the following:

     * `diskEncryptionSet` - (Optional) Specifies the customer managed disk encryption set resource id for the managed disk. Defaults to `DiskEncryptionSetParameters`.
     * `id` - (Optional) Resource Id Defaults to `string`.
     * `securityProfile` - (Optional) Specifies the security profile for the managed disk. Defaults to `VmDiskSecurityProfile`.
     * `storageAccountType` - (Optional) Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. Defaults to `string`.
     *
     * ---
     *
     * The `VMDiskSecurityProfile` block supports the following:

     * `diskEncryptionSet` - (Optional) Specifies the customer managed disk encryption set resource id for the managed disk that is used for Customer Managed Key encrypted ConfidentialVM OS Disk and VMGuest blob. Defaults to `DiskEncryptionSetParameters`.
     * `securityEncryptionType` - (Optional) Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs. Defaults to `string`.
     *
     * ---
     *
     * The `DiskEncryptionSetParameters` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `DiskEncryptionSetParameters` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `VirtualHardDisk` block supports the following:

     * `uri` - (Optional) Specifies the virtual hard disk's uri. Defaults to `string`.
     *
     * ---
     *
     * The `DiskEncryptionSettings` block supports the following:

     * `diskEncryptionKey` - (Optional) Specifies the location of the disk encryption key, which is a Key Vault Secret. Defaults to `KeyVaultSecretReference`.
     * `enabled` - (Optional) Specifies whether disk encryption should be enabled on the virtual machine. Defaults to `boolean`.
     * `keyEncryptionKey` - (Optional) Specifies the location of the key encryption key in Key Vault. Defaults to `KeyVaultKeyReference`.
     *
     * ---
     *
     * The `KeyVaultKeyReference` block supports the following:

     * `keyUrl` - (Required) The URL referencing a key encryption key in Key Vault. Defaults to `string`.
     * `sourceVault` - (Required) The relative URL of the Key Vault containing the key. Defaults to `SubResource`.
     *
     * ---
     *
     * The `KeyVaultSecretReference` block supports the following:

     * `secretUrl` - (Required) The URL referencing a secret in a Key Vault. Defaults to `string`.
     * `sourceVault` - (Required) The relative URL of the Key Vault containing the secret. Defaults to `SubResource`.
     *
     * ---
     *
     * The `DiffDiskSettings` block supports the following:

     * `option` - (Optional) Specifies the ephemeral disk settings for operating system disk. Defaults to `string`.
     * `placement` - (Optional) Specifies the ephemeral disk placement for operating system disk. Possible values are: **CacheDisk,** **ResourceDisk,** **NvmeDisk.** The defaulting behavior is: **CacheDisk** if one is configured for the VM size otherwise **ResourceDisk** or **NvmeDisk** is used. Refer to the VM size documentation for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/sizes and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/sizes to check which VM sizes exposes a cache disk. Minimum api-version for NvmeDisk: 2024-03-01. Defaults to `string`.
     *
     * ---
     *
     * The `ImageReference` block supports the following:

     * `communityGalleryImageId` - (Optional) Specified the community gallery image unique id for vm deployment. This can be fetched from community gallery image GET call. Defaults to `string`.
     * `id` - (Optional) Resource Id Defaults to `string`.
     * `offer` - (Optional) Specifies the offer of the platform image or marketplace image used to create the virtual machine. Defaults to `string`.
     * `publisher` - (Optional) The image publisher. Defaults to `string`.
     * `sharedGalleryImageId` - (Optional) Specified the shared gallery image unique id for vm deployment. This can be fetched from shared gallery image GET call. Defaults to `string`.
     * `sku` - (Optional) The image SKU. Defaults to `string`.
     * `version` - (Optional) Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. Please do not use field 'version' for gallery image deployment, gallery image should always use 'id' field for deployment, to use 'latest' version of gallery image, just set '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}' in the 'id' field without version input. Defaults to `string`.
     *
     * ---
     *
     * The `DataDisk[]` block supports the following:

     * `caching` - (Optional) Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The defaulting behavior is: **None for Standard storage. ReadOnly for Premium storage.** Defaults to `string`.
     * `createOption` - (Required) Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine data disk. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point. Defaults to `string`.
     * `deleteOption` - (Optional) Specifies whether data disk should be deleted or detached upon VM deletion. Possible values are: **Delete.** If this value is used, the data disk is deleted when VM is deleted. **Detach.** If this value is used, the data disk is retained after VM is deleted. The default value is set to **Detach**. Defaults to `string`.
     * `detachOption` - (Optional) Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview** mode and is not supported for VirtualMachineScaleSet. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. Defaults to `string`.
     * `diskSizeGB` - (Optional) Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. Defaults to `integer`.
     * `image` - (Optional) The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. Defaults to `VirtualHardDisk`.
     * `lun` - (Required) Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. Defaults to `integer`.
     * `managedDisk` - (Optional) The managed disk parameters. Defaults to `ManagedDiskParameters`.
     * `name` - (Optional) The disk name. Defaults to `string`.
     * `sourceResource` - (Optional) The source resource identifier. It can be a snapshot, or disk restore point from which to create a disk. Defaults to `ApiEntityReference`.
     * `toBeDetached` - (Optional) Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset Defaults to `boolean`.
     * `vhd` - (Optional) The virtual hard disk. Defaults to `VirtualHardDisk`.
     * `writeAcceleratorEnabled` - (Optional) Specifies whether writeAccelerator should be enabled or disabled on the disk. Defaults to `boolean`.
     *
     * ---
     *
     * The `ApiEntityReference` block supports the following:

     * `id` - (Optional) The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... Defaults to `string`.
     *
     * ---
     *
     * The `SecurityProfile` block supports the following:

     * `encryptionAtHost` - (Optional) This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. The default behavior is: The Encryption at host will be disabled unless this property is set to true for the resource. Defaults to `boolean`.
     * `encryptionIdentity` - (Optional) Specifies the Managed Identity used by ADE to get access token for keyvault operations. Defaults to `EncryptionIdentity`.
     * `proxyAgentSettings` - (Optional) Specifies ProxyAgent settings while creating the virtual machine. Minimum api-version: 2024-03-01. Defaults to `ProxyAgentSettings`.
     * `securityType` - (Optional) Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. Defaults to `string`.
     * `uefiSettings` - (Optional) Specifies the security settings like secure boot and vTPM used while creating the virtual machine. Minimum api-version: 2020-12-01. Defaults to `UefiSettings`.
     *
     * ---
     *
     * The `UefiSettings` block supports the following:

     * `secureBootEnabled` - (Optional) Specifies whether secure boot should be enabled on the virtual machine. Minimum api-version: 2020-12-01. Defaults to `boolean`.
     * `vTpmEnabled` - (Optional) Specifies whether vTPM should be enabled on the virtual machine. Minimum api-version: 2020-12-01. Defaults to `boolean`.
     *
     * ---
     *
     * The `ProxyAgentSettings` block supports the following:

     * `enabled` - (Optional) Specifies whether ProxyAgent feature should be enabled on the virtual machine or virtual machine scale set. Defaults to `boolean`.
     * `keyIncarnationId` - (Optional) Increase the value of this property allows user to reset the key used for securing communication channel between guest and host. Defaults to `integer`.
     * `mode` - (Optional) Specifies the mode that ProxyAgent will execute on if the feature is enabled. ProxyAgent will start to audit or monitor but not enforce access control over requests to host endpoints in Audit mode, while in Enforce mode it will enforce access control. The default value is Enforce mode. Defaults to `string`.
     *
     * ---
     *
     * The `EncryptionIdentity` block supports the following:

     * `userAssignedIdentityResourceId` - (Optional) Specifies ARM Resource ID of one of the user identities associated with the VM. Defaults to `string`.
     *
     * ---
     *
     * The `ScheduledEventsProfile` block supports the following:

     * `osImageNotificationProfile` - (Optional) Specifies OS Image Scheduled Event related configurations. Defaults to `OsImageNotificationProfile`.
     * `terminateNotificationProfile` - (Optional) Specifies Terminate Scheduled Event related configurations. Defaults to `TerminateNotificationProfile`.
     *
     * ---
     *
     * The `TerminateNotificationProfile` block supports the following:

     * `enable` - (Optional) Specifies whether the Terminate Scheduled event is enabled or disabled. Defaults to `boolean`.
     * `notBeforeTimeout` - (Optional) Configurable length of time a Virtual Machine being deleted will have to potentially approve the Terminate Scheduled Event before the event is auto approved (timed out). The configuration must be specified in ISO 8601 format, the default value is 5 minutes (PT5M) Defaults to `string`.
     *
     * ---
     *
     * The `OSImageNotificationProfile` block supports the following:

     * `enable` - (Optional) Specifies whether the OS Image Scheduled event is enabled or disabled. Defaults to `boolean`.
     * `notBeforeTimeout` - (Optional) Length of time a Virtual Machine being reimaged or having its OS upgraded will have to potentially approve the OS Image Scheduled Event before the event is auto approved (timed out). The configuration is specified in ISO 8601 format, and the value must be 15 minutes (PT15M) Defaults to `string`.
     *
     * ---
     *
     * The `ScheduledEventsPolicy` block supports the following:

     * `scheduledEventsAdditionalPublishingTargets` - (Optional) The configuration parameters used while publishing scheduledEventsAdditionalPublishingTargets. Defaults to `ScheduledEventsAdditionalPublishingTargets`.
     * `userInitiatedReboot` - (Optional) The configuration parameters used while creating userInitiatedReboot scheduled event setting creation. Defaults to `UserInitiatedReboot`.
     * `userInitiatedRedeploy` - (Optional) The configuration parameters used while creating userInitiatedRedeploy scheduled event setting creation. Defaults to `UserInitiatedRedeploy`.
     *
     * ---
     *
     * The `UserInitiatedRedeploy` block supports the following:

     * `automaticallyApprove` - (Optional) Specifies Redeploy Scheduled Event related configurations. Defaults to `boolean`.
     *
     * ---
     *
     * The `UserInitiatedReboot` block supports the following:

     * `automaticallyApprove` - (Optional) Specifies Reboot Scheduled Event related configurations. Defaults to `boolean`.
     *
     * ---
     *
     * The `ScheduledEventsAdditionalPublishingTargets` block supports the following:

     * `eventGridAndResourceGraph` - (Optional) The configuration parameters used while creating eventGridAndResourceGraph Scheduled Event setting. Defaults to `EventGridAndResourceGraph`.
     *
     * ---
     *
     * The `EventGridAndResourceGraph` block supports the following:

     * `enable` - (Optional) Specifies if event grid and resource graph is enabled for Scheduled event related configurations. Defaults to `boolean`.
     *
     * ---
     *
     * The `SubResource` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `OSProfile` block supports the following:

     * `adminPassword` - (Optional) Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) Defaults to `string`.
     * `adminUsername` - (Optional) Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters. Defaults to `string`.
     * `allowExtensionOperations` - (Optional) Specifies whether extension operations should be allowed on the virtual machine. This may only be set to False when no extensions are present on the virtual machine. Defaults to `boolean`.
     * `computerName` - (Optional) Specifies the host OS name of the virtual machine. This name cannot be updated after the VM is created. **Max-length (Windows):** 15 characters. **Max-length (Linux):** 64 characters. For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/azure-resource-manager/management/resource-name-rules). Defaults to `string`.
     * `customData` - (Optional) Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. **Note: Do not pass any secrets or passwords in customData property.** This property cannot be updated after the VM is created. The property 'customData' is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/). For using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init). Defaults to `string`.
     * `linuxConfiguration` - (Optional) Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). Defaults to `LinuxConfiguration`.
     * `requireGuestProvisionSignal` - (Optional) Optional property which must either be set to True or omitted. Defaults to `boolean`.
     * `secrets` - (Optional) Specifies set of certificates that should be installed onto the virtual machine. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). Defaults to `VaultSecretGroup[]`.
     * `windowsConfiguration` - (Optional) Specifies Windows operating system settings on the virtual machine. Defaults to `WindowsConfiguration`.
     *
     * ---
     *
     * The `WindowsConfiguration` block supports the following:

     * `additionalUnattendContent` - (Optional) Specifies additional base-64 encoded XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. Defaults to `AdditionalUnattendContent[]`.
     * `enableAutomaticUpdates` - (Optional) Indicates whether Automatic Updates is enabled for the Windows virtual machine. Default value is true. For virtual machine scale sets, this property can be updated and updates will take effect on OS reprovisioning. Defaults to `boolean`.
     * `enableVMAgentPlatformUpdates` - (Optional) Indicates whether VMAgent Platform Updates is enabled for the Windows virtual machine. Default value is false. Defaults to `boolean`.
     * `patchSettings` - (Optional) [Preview Feature] Specifies settings related to VM Guest Patching on Windows. Defaults to `PatchSettings`.
     * `provisionVMAgent` - (Optional) Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, it is set to true by default. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. Defaults to `boolean`.
     * `timeZone` - (Optional) Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time". Possible values can be [TimeZoneInfo.Id](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) value from time zones returned by [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones). Defaults to `string`.
     * `winRM` - (Optional) Specifies the Windows Remote Management listeners. This enables remote Windows PowerShell. Defaults to `WinRmConfiguration`.
     *
     * ---
     *
     * The `WinRMConfiguration` block supports the following:

     * `listeners` - (Optional) The list of Windows Remote Management listeners Defaults to `WinRmListener[]`.
     *
     * ---
     *
     * The `WinRMListener[]` block supports the following:

     * `certificateUrl` - (Optional) This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). Defaults to `string`.
     * `protocol` - (Optional) Specifies the protocol of WinRM listener. Possible values are: **http,** **https.** Defaults to `string`.
     *
     * ---
     *
     * The `PatchSettings` block supports the following:

     * `assessmentMode` - (Optional) Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true.  Defaults to `string`.
     * `automaticByPlatformSettings` - (Optional) Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Windows. Defaults to `WindowsVmGuestPatchAutomaticByPlatformSettings`.
     * `enableHotpatching` - (Optional) Enables customers to patch their Azure VMs without requiring a reboot. For enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode' must be set to 'AutomaticByPlatform'. Defaults to `boolean`.
     * `patchMode` - (Optional) Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true  Defaults to `string`.
     *
     * ---
     *
     * The `WindowsVMGuestPatchAutomaticByPlatformSettings` block supports the following:

     * `bypassPlatformSafetyChecksOnUserSchedule` - (Optional) Enables customer to schedule patching without accidental upgrades Defaults to `boolean`.
     * `rebootSetting` - (Optional) Specifies the reboot setting for all AutomaticByPlatform patch installation operations. Defaults to `string`.
     *
     * ---
     *
     * The `AdditionalUnattendContent[]` block supports the following:

     * `componentName` - (Optional) The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup. Defaults to `string`.
     * `content` - (Optional) Specifies the XML formatted content that is added to the unattend.xml file for the specified path and component. The XML must be less than 4KB and must include the root element for the setting or feature that is being inserted. Defaults to `string`.
     * `passName` - (Optional) The pass name. Currently, the only allowable value is OobeSystem. Defaults to `string`.
     * `settingName` - (Optional) Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. Defaults to `string`.
     *
     * ---
     *
     * The `VaultSecretGroup[]` block supports the following:

     * `sourceVault` - (Optional) The relative URL of the Key Vault containing all of the certificates in VaultCertificates. Defaults to `SubResource`.
     * `vaultCertificates` - (Optional) The list of key vault references in SourceVault which contain certificates. Defaults to `VaultCertificate[]`.
     *
     * ---
     *
     * The `VaultCertificate[]` block supports the following:

     * `certificateStore` - (Optional) For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name &lt;UppercaseThumbprint&gt;.crt for the X509 certificate file and &lt;UppercaseThumbprint&gt;.prv for private key. Both of these files are .pem formatted. Defaults to `string`.
     * `certificateUrl` - (Optional) This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). Defaults to `string`.
     *
     * ---
     *
     * The `LinuxConfiguration` block supports the following:

     * `disablePasswordAuthentication` - (Optional) Specifies whether password authentication should be disabled. Defaults to `boolean`.
     * `enableVMAgentPlatformUpdates` - (Optional) Indicates whether VMAgent Platform Updates is enabled for the Linux virtual machine. Default value is false. Defaults to `boolean`.
     * `patchSettings` - (Optional) [Preview Feature] Specifies settings related to VM Guest Patching on Linux. Defaults to `LinuxPatchSettings`.
     * `provisionVMAgent` - (Optional) Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, default behavior is to set it to true. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. Defaults to `boolean`.
     * `ssh` - (Optional) Specifies the ssh key configuration for a Linux OS. Defaults to `SshConfiguration`.
     *
     * ---
     *
     * The `SshConfiguration` block supports the following:

     * `publicKeys` - (Optional) The list of SSH public keys used to authenticate with linux based VMs. Defaults to `SshPublicKey[]`.
     *
     * ---
     *
     * The `SshPublicKey[]` block supports the following:

     * `keyData` - (Optional) SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure]https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). Defaults to `string`.
     * `path` - (Optional) Specifies the full path on the created VM where ssh public key is stored. If the file already exists, the specified key is appended to the file. Example: /home/user/.ssh/authorized_keys Defaults to `string`.
     *
     * ---
     *
     * The `LinuxPatchSettings` block supports the following:

     * `assessmentMode` - (Optional) Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. Defaults to `string`.
     * `automaticByPlatformSettings` - (Optional) Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Linux. Defaults to `LinuxVmGuestPatchAutomaticByPlatformSettings`.
     * `patchMode` - (Optional) Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true Defaults to `string`.
     *
     * ---
     *
     * The `LinuxVMGuestPatchAutomaticByPlatformSettings` block supports the following:

     * `bypassPlatformSafetyChecksOnUserSchedule` - (Optional) Enables customer to schedule patching without accidental upgrades Defaults to `boolean`.
     * `rebootSetting` - (Optional) Specifies the reboot setting for all AutomaticByPlatform patch installation operations. Defaults to `string`.
     *
     * ---
     *
     * The `NetworkProfile` block supports the following:

     * `networkApiVersion` - (Optional) specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations Defaults to `string`.
     * `networkInterfaceConfigurations` - (Optional) Specifies the networking configurations that will be used to create the virtual machine networking resources. Defaults to `VirtualMachineNetworkInterfaceConfiguration[]`.
     * `networkInterfaces` - (Optional) Specifies the list of resource Ids for the network interfaces associated with the virtual machine. Defaults to `NetworkInterfaceReference[]`.
     *
     * ---
     *
     * The `NetworkInterfaceReference[]` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     * `properties` - (Optional) Describes a network interface reference properties. Defaults to `NetworkInterfaceReferenceProperties`.
     *
     * ---
     *
     * The `NetworkInterfaceReferenceProperties` block supports the following:

     * `deleteOption` - (Optional) Specify what happens to the network interface when the VM is deleted Defaults to `string`.
     * `primary` - (Optional) Specifies the primary network interface in case the virtual machine has more than 1 network interface. Defaults to `boolean`.
     *
     * ---
     *
     * The `VirtualMachineNetworkInterfaceConfiguration[]` block supports the following:

     * `name` - (Required) The network interface configuration name. Defaults to `string`.
     * `properties` - (Optional) Describes a virtual machine network profile's IP configuration. Defaults to `VirtualMachineNetworkInterfaceConfigurationProperties`.
     *
     * ---
     *
     * The `VirtualMachineNetworkInterfaceConfigurationProperties` block supports the following:

     * `auxiliaryMode` - (Optional) Specifies whether the Auxiliary mode is enabled for the Network Interface resource. Defaults to `string`.
     * `auxiliarySku` - (Optional) Specifies whether the Auxiliary sku is enabled for the Network Interface resource. Defaults to `string`.
     * `deleteOption` - (Optional) Specify what happens to the network interface when the VM is deleted Defaults to `string`.
     * `disableTcpStateTracking` - (Optional) Specifies whether the network interface is disabled for tcp state tracking. Defaults to `boolean`.
     * `dnsSettings` - (Optional) The dns settings to be applied on the network interfaces. Defaults to `VirtualMachineNetworkInterfaceDnsSettingsConfiguration`.
     * `dscpConfiguration` - (Optional)  Defaults to `SubResource`.
     * `enableAcceleratedNetworking` - (Optional) Specifies whether the network interface is accelerated networking-enabled. Defaults to `boolean`.
     * `enableFpga` - (Optional) Specifies whether the network interface is FPGA networking-enabled. Defaults to `boolean`.
     * `enableIPForwarding` - (Optional) Whether IP forwarding enabled on this NIC. Defaults to `boolean`.
     * `ipConfigurations` - (Required) Specifies the IP configurations of the network interface. Defaults to `VirtualMachineNetworkInterfaceIpConfiguration[]`.
     * `networkSecurityGroup` - (Optional) The network security group. Defaults to `SubResource`.
     * `primary` - (Optional) Specifies the primary network interface in case the virtual machine has more than 1 network interface. Defaults to `boolean`.
     *
     * ---
     *
     * The `VirtualMachineNetworkInterfaceIPConfiguration[]` block supports the following:

     * `name` - (Required) The IP configuration name. Defaults to `string`.
     * `properties` - (Optional) Describes a virtual machine network interface IP configuration properties. Defaults to `VirtualMachineNetworkInterfaceIpConfigurationProperties`.
     *
     * ---
     *
     * The `VirtualMachineNetworkInterfaceIPConfigurationProperties` block supports the following:

     * `applicationGatewayBackendAddressPools` - (Optional) Specifies an array of references to backend address pools of application gateways. A virtual machine can reference backend address pools of multiple application gateways. Multiple virtual machines cannot use the same application gateway. Defaults to `SubResource[]`.
     * `applicationSecurityGroups` - (Optional) Specifies an array of references to application security group. Defaults to `SubResource[]`.
     * `loadBalancerBackendAddressPools` - (Optional) Specifies an array of references to backend address pools of load balancers. A virtual machine can reference backend address pools of one public and one internal load balancer. [Multiple virtual machines cannot use the same basic sku load balancer]. Defaults to `SubResource[]`.
     * `primary` - (Optional) Specifies the primary network interface in case the virtual machine has more than 1 network interface. Defaults to `boolean`.
     * `privateIPAddressVersion` - (Optional) Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. Defaults to `string`.
     * `publicIPAddressConfiguration` - (Optional) The publicIPAddressConfiguration. Defaults to `VirtualMachinePublicIpAddressConfiguration`.
     * `subnet` - (Optional) Specifies the identifier of the subnet. Defaults to `SubResource`.
     *
     * ---
     *
     * The `VirtualMachinePublicIPAddressConfiguration` block supports the following:

     * `name` - (Required) The publicIP address configuration name. Defaults to `string`.
     * `properties` - (Optional) Describes a virtual machines IP Configuration's PublicIPAddress configuration Defaults to `VirtualMachinePublicIpAddressConfigurationProperties`.
     * `sku` - (Optional) Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. Defaults to `PublicIpAddressSku`.
     *
     * ---
     *
     * The `PublicIPAddressSku` block supports the following:

     * `name` - (Optional) Specify public IP sku name Defaults to `string`.
     * `tier` - (Optional) Specify public IP sku tier Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachinePublicIPAddressConfigurationProperties` block supports the following:

     * `deleteOption` - (Optional) Specify what happens to the public IP address when the VM is deleted Defaults to `string`.
     * `dnsSettings` - (Optional) The dns settings to be applied on the publicIP addresses . Defaults to `VirtualMachinePublicIpAddressDnsSettingsConfiguration`.
     * `idleTimeoutInMinutes` - (Optional) The idle timeout of the public IP address. Defaults to `integer`.
     * `ipTags` - (Optional) The list of IP tags associated with the public IP address. Defaults to `VirtualMachineIpTag[]`.
     * `publicIPAddressVersion` - (Optional) Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. Defaults to `string`.
     * `publicIPAllocationMethod` - (Optional) Specify the public IP allocation type Defaults to `string`.
     * `publicIPPrefix` - (Optional) The PublicIPPrefix from which to allocate publicIP addresses. Defaults to `SubResource`.
     *
     * ---
     *
     * The `VirtualMachineIpTag[]` block supports the following:

     * `ipTagType` - (Optional) IP tag type. Example: FirstPartyUsage. Defaults to `string`.
     * `tag` - (Optional) IP tag associated with the public IP. Example: SQL, Storage etc. Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachinePublicIPAddressDnsSettingsConfiguration` block supports the following:

     * `domainNameLabel` - (Required) The Domain name label prefix of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the domain name label and vm network profile unique ID. Defaults to `string`.
     * `domainNameLabelScope` - (Optional) The Domain name label scope of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the hashed domain name label with policy according to the domain name label scope and vm network profile unique ID. Defaults to `string`.
     *
     * ---
     *
     * The `SubResource[]` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `SubResource[]` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `SubResource[]` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineNetworkInterfaceDnsSettingsConfiguration` block supports the following:

     * `dnsServers` - (Optional) List of DNS servers IP addresses Defaults to `string[]`.
     *
     * ---
     *
     * The `SubResource` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `SubResource` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `HardwareProfile` block supports the following:

     * `vmSize` - (Optional) Specifies the size of the virtual machine. The enum data type is currently deprecated and will be removed by December 23rd 2023. The recommended way to get the list of available sizes is using these APIs: [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes), [List all available virtual machine sizes in a region]( https://docs.microsoft.com/rest/api/compute/resourceskus/list), [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/azure/virtual-machines/sizes). The available VM sizes depend on region and availability set. Defaults to `string`.
     * `vmSizeProperties` - (Optional) Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-07-01. This feature is still in preview mode and is not supported for VirtualMachineScaleSet. Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details. Defaults to `VmSizeProperties`.
     *
     * ---
     *
     * The `VMSizeProperties` block supports the following:

     * `vCPUsAvailable` - (Optional) Specifies the number of vCPUs available for the VM. When this property is not specified in the request body the default behavior is to set it to the value of vCPUs available for that VM size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). Defaults to `integer`.
     * `vCPUsPerCore` - (Optional) Specifies the vCPU to physical core ratio. When this property is not specified in the request body the default behavior is set to the value of vCPUsPerCore for the VM Size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). **Setting this property to 1 also means that hyper-threading is disabled.** Defaults to `integer`.
     *
     * ---
     *
     * The `DiagnosticsProfile` block supports the following:

     * `bootDiagnostics` - (Optional) Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. **NOTE**: If storageUri is being specified then ensure that the storage account is in the same region and subscription as the VM. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor. Defaults to `BootDiagnostics`.
     *
     * ---
     *
     * The `BootDiagnostics` block supports the following:

     * `enabled` - (Optional) Whether boot diagnostics should be enabled on the Virtual Machine. Defaults to `boolean`.
     * `storageUri` - (Optional) Uri of the storage account to use for placing the console output and screenshot. If storageUri is not specified while enabling boot diagnostics, managed storage will be used. Defaults to `string`.
     *
     * ---
     *
     * The `CapacityReservationProfile` block supports the following:

     * `capacityReservationGroup` - (Optional) Specifies the capacity reservation group resource id that should be used for allocating the virtual machine or scaleset vm instances provided enough capacity has been reserved. Please refer to https://aka.ms/CapacityReservation for more details. Defaults to `SubResource`.
     *
     * ---
     *
     * The `BillingProfile` block supports the following:

     * `maxPrice` - (Optional) Specifies the maximum price you are willing to pay for a Azure Spot VM/VMSS. This price is in US Dollars. <br><br> This price will be compared with the current Azure Spot price for the VM size. Also, the prices are compared at the time of create/update of Azure Spot VM/VMSS and the operation will only succeed if  the maxPrice is greater than the current Azure Spot price. <br><br> The maxPrice will also be used for evicting a Azure Spot VM/VMSS if the current Azure Spot price goes beyond the maxPrice after creation of VM/VMSS. <br><br> Possible values are: <br><br> - Any decimal value greater than zero. Example: 0.01538 <br><br> -1 – indicates default price to be up-to on-demand. <br><br> You can set the maxPrice to -1 to indicate that the Azure Spot VM/VMSS should not be evicted for price reasons. Also, the default max price is -1 if it is not provided by you. <br><br>Minimum api-version: 2019-03-01. Defaults to `number`.
     *
     * ---
     *
     * The `SubResource` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `ApplicationProfile` block supports the following:

     * `galleryApplications` - (Optional) Specifies the gallery applications that should be made available to the VM/VMSS Defaults to `VmGalleryApplication[]`.
     *
     * ---
     *
     * The `VMGalleryApplication[]` block supports the following:

     * `configurationReference` - (Optional) Optional, Specifies the uri to an azure blob that will replace the default configuration for the package if provided Defaults to `string`.
     * `enableAutomaticUpgrade` - (Optional) If set to true, when a new Gallery Application version is available in PIR/SIG, it will be automatically updated for the VM/VMSS Defaults to `boolean`.
     * `order` - (Optional) Optional, Specifies the order in which the packages have to be installed Defaults to `integer`.
     * `packageReferenceId` - (Required) Specifies the GalleryApplicationVersion resource id on the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{application}/versions/{version} Defaults to `string`.
     * `tags` - (Optional) Optional, Specifies a passthrough value for more generic context. Defaults to `string`.
     * `treatFailureAsDeploymentFailure` - (Optional) Optional, If true, any failure for any operation in the VmApplication will fail the deployment Defaults to `boolean`.
     *
     * ---
     *
     * The `AdditionalCapabilities` block supports the following:

     * `hibernationEnabled` - (Optional) The flag that enables or disables hibernation capability on the VM. Defaults to `boolean`.
     * `ultraSSDEnabled` - (Optional) The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS. Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled. Defaults to `boolean`.
     *
     * ---
     *
     * The `Plan` block supports the following:

     * `name` - (Optional) The plan ID. Defaults to `string`.
     * `product` - (Optional) Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element. Defaults to `string`.
     * `promotionCode` - (Optional) The promotion code. Defaults to `string`.
     * `publisher` - (Optional) The publisher ID. Defaults to `string`.
     *
     * ---
     *
     * The `ExtendedLocation` block supports the following:

     * `name` - (Optional) The name of the extended location. Defaults to `string`.
     * `type` - (Optional) The type of the extended location. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: VirtualMachinesProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Compute/virtualMachines@2024-03-01";
  }
  protected getResourceBody(props: VirtualMachinesProps) {
    return {
      extendedLocation: props.extendedLocation,
      plan: props.plan,
      properties: props.properties,
      zones: props.zones,
    };
  }
  public addVirtualMachinesRunCommands(
    props: VirtualMachinesRunCommandsProps,
  ): VirtualMachinesRunCommands {
    return new VirtualMachinesRunCommands(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addVirtualMachineExtensions(
    props: VirtualMachinesExtensionsProps,
  ): VirtualMachinesExtensions {
    return new VirtualMachinesExtensions(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}
