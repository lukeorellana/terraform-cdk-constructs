import { Construct } from "constructs";
import {
  VirtualMachineScaleSetsExtensions,
  VirtualMachineScaleSetsExtensionsProps,
} from "./virtualmachinescalesetsextensions";
import {
  VirtualMachineScaleSetsVirtualMachines,
  VirtualMachineScaleSetsVirtualMachinesProps,
} from "./virtualmachinescalesetsvirtualmachines";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface VirtualMachineScaleSetsProps extends IAzAPIBaseProps {
  /**
   * The extended location of the Virtual Machine Scale Set.
   */
  extendedLocation?: ExtendedLocation;
  /**
   * Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**.
   */
  plan?: Plan;
  /**
   * Describes the properties of a Virtual Machine Scale Set.
   */
  properties?: VirtualMachineScaleSetProperties;
  /**
   * The virtual machine scale set sku.
   */
  sku?: Sku;
  /**
   * The virtual machine scale set zones. NOTE: Availability zones can only be set when you create the scale set
   */
  zones?: string[];
}

export interface Sku {
  /**
   * Specifies the number of virtual machines in the scale set.
   */
  capacity?: number;
  /**
   * The sku name.
   */
  name?: string;
  /**
   * Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic**
   */
  tier?: string;
}

export interface VirtualMachineScaleSetProperties {
  /**
   * Specifies additional capabilities enabled or disabled on the Virtual Machines in the Virtual Machine Scale Set. For instance: whether the Virtual Machines have the capability to support attaching managed data disks with UltraSSD_LRS storage account type.
   */
  additionalCapabilities?: AdditionalCapabilities;
  /**
   * Policy for automatic repairs.
   */
  automaticRepairsPolicy?: AutomaticRepairsPolicy;
  /**
   * Optional property which must either be set to True or omitted.
   */
  constrainedMaximumCapacity?: boolean;
  /**
   * When Overprovision is enabled, extensions are launched only on the requested number of VMs which are finally kept. This property will hence ensure that the extensions do not run on the extra overprovisioned VMs.
   */
  doNotRunExtensionsOnOverprovisionedVMs?: boolean;
  /**
   * Specifies information about the dedicated host group that the virtual machine scale set resides in. Minimum api-version: 2020-06-01.
   */
  hostGroup?: SubResource;
  /**
   * Specifies the orchestration mode for the virtual machine scale set.
   */
  orchestrationMode?: string;
  /**
   * Specifies whether the Virtual Machine Scale Set should be overprovisioned.
   */
  overprovision?: boolean;
  /**
   * Fault Domain count for each placement group.
   */
  platformFaultDomainCount?: number;
  /**
   * Specifies the desired targets for mixing Spot and Regular priority VMs within the same VMSS Flex instance.
   */
  priorityMixPolicy?: PriorityMixPolicy;
  /**
   * Specifies information about the proximity placement group that the virtual machine scale set should be assigned to. Minimum api-version: 2018-04-01.
   */
  proximityPlacementGroup?: SubResource;
  /**
   * Policy for Resiliency
   */
  resiliencyPolicy?: ResiliencyPolicy;
  /**
   * Specifies the policies applied when scaling in Virtual Machines in the Virtual Machine Scale Set.
   */
  scaleInPolicy?: ScaleInPolicy;
  /**
   * The ScheduledEventsPolicy.
   */
  scheduledEventsPolicy?: ScheduledEventsPolicy;
  /**
   * When true this limits the scale set to a single placement group, of max size 100 virtual machines. NOTE: If singlePlacementGroup is true, it may be modified to false. However, if singlePlacementGroup is false, it may not be modified to true.
   */
  singlePlacementGroup?: boolean;
  /**
   * Specifies the Spot Restore properties for the virtual machine scale set.
   */
  spotRestorePolicy?: SpotRestorePolicy;
  /**
   * The upgrade policy.
   */
  upgradePolicy?: UpgradePolicy;
  /**
   * The virtual machine profile.
   */
  virtualMachineProfile?: VirtualMachineScaleSetVmProfile;
  /**
   * Whether to force strictly even Virtual Machine distribution cross x-zones in case there is zone outage. zoneBalance property can only be set if the zones property of the scale set contains more than one zone. If there are no zones or only one zone specified, then zoneBalance property should not be set.
   */
  zoneBalance?: boolean;
}

export interface VirtualMachineScaleSetVmProfile {
  /**
   * Specifies the gallery applications that should be made available to the VM/VMSS
   */
  applicationProfile?: ApplicationProfile;
  /**
   * Specifies the billing related details of a Azure Spot VMSS. Minimum api-version: 2019-03-01.
   */
  billingProfile?: BillingProfile;
  /**
   * Specifies the capacity reservation related details of a scale set. Minimum api-version: 2021-04-01.
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
   * Specifies a collection of settings for extensions installed on virtual machines in the scale set.
   */
  extensionProfile?: VirtualMachineScaleSetExtensionProfile;
  /**
   * Specifies the hardware profile related details of a scale set. Minimum api-version: 2021-11-01.
   */
  hardwareProfile?: VirtualMachineScaleSetHardwareProfile;
  /**
   * Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15
   */
  licenseType?: string;
  /**
   * Specifies properties of the network interfaces of the virtual machines in the scale set.
   */
  networkProfile?: VirtualMachineScaleSetNetworkProfile;
  /**
   * Specifies the operating system settings for the virtual machines in the scale set.
   */
  osProfile?: VirtualMachineScaleSetOsProfile;
  /**
   * Specifies the priority for the virtual machines in the scale set. Minimum api-version: 2017-10-30-preview.
   */
  priority?: string;
  /**
   * Specifies Scheduled Event related configurations.
   */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /**
   * Specifies the security posture to be used for all virtual machines in the scale set. Minimum api-version: 2023-03-01
   */
  securityPostureReference?: SecurityPostureReference;
  /**
   * Specifies the Security related profile settings for the virtual machines in the scale set.
   */
  securityProfile?: SecurityProfile;
  /**
   * Specifies the service artifact reference id used to set same image version for all virtual machines in the scale set when using 'latest' image version. Minimum api-version: 2022-11-01
   */
  serviceArtifactReference?: ServiceArtifactReference;
  /**
   * Specifies the storage settings for the virtual machine disks.
   */
  storageProfile?: VirtualMachineScaleSetStorageProfile;
  /**
   * UserData for the virtual machines in the scale set, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum api-version: 2021-03-01.
   */
  userData?: string;
}

export interface VirtualMachineScaleSetStorageProfile {
  /**
   * Specifies the parameters that are used to add data disks to the virtual machines in the scale set. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview).
   */
  dataDisks?: VirtualMachineScaleSetDataDisk[];
  /**
   *
   */
  diskControllerType?: string;
  /**
   * Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations.
   */
  imageReference?: ImageReference;
  /**
   * Specifies information about the operating system disk used by the virtual machines in the scale set. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview).
   */
  osDisk?: VirtualMachineScaleSetOsDisk;
}

export interface VirtualMachineScaleSetOsDisk {
  /**
   * Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage.**
   */
  caching?: string;
  /**
   * Specifies how the virtual machines in the scale set should be created. The only allowed value is: **FromImage.** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described.
   */
  createOption: string;
  /**
   * Specifies whether OS Disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only). <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the OS disk is retained after VMSS Flex VM is deleted. <br><br> The default value is set to **Delete**. For an Ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for Ephemeral OS Disk.
   */
  deleteOption?: string;
  /**
   * Specifies the ephemeral disk Settings for the operating system disk used by the virtual machine scale set.
   */
  diffDiskSettings?: DiffDiskSettings;
  /**
   * Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023.
   */
  diskSizeGB?: number;
  /**
   * Specifies information about the unmanaged user image to base the scale set on.
   */
  image?: VirtualHardDisk;
  /**
   * The managed disk parameters.
   */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /**
   * The disk name.
   */
  name?: string;
  /**
   * This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.**
   */
  osType?: string;
  /**
   * Specifies the container urls that are used to store operating system disks for the scale set.
   */
  vhdContainers?: string[];
  /**
   * Specifies whether writeAccelerator should be enabled or disabled on the disk.
   */
  writeAcceleratorEnabled?: boolean;
}

export interface VirtualMachineScaleSetManagedDiskParameters {
  /**
   * Specifies the customer managed disk encryption set resource id for the managed disk.
   */
  diskEncryptionSet?: DiskEncryptionSetParameters;
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

export interface VirtualMachineScaleSetDataDisk {
  /**
   * Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage.**
   */
  caching?: string;
  /**
   * The create option.
   */
  createOption: string;
  /**
   * Specifies whether data disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only).<br><br> Possible values: <br><br> **Delete** If this value is used, the data disk is deleted when the VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the data disk is retained after VMSS Flex VM is deleted.<br><br> The default value is set to **Delete**.
   */
  deleteOption?: string;
  /**
   * Specifies the Read-Write IOPS for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB.
   */
  diskIOPSReadWrite?: number;
  /**
   * Specifies the bandwidth in MB per second for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB.
   */
  diskMBpsReadWrite?: number;
  /**
   * Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023.
   */
  diskSizeGB?: number;
  /**
   * Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM.
   */
  lun: number;
  /**
   * The managed disk parameters.
   */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /**
   * The disk name.
   */
  name?: string;
  /**
   * Specifies whether writeAccelerator should be enabled or disabled on the disk.
   */
  writeAcceleratorEnabled?: boolean;
}

export interface ServiceArtifactReference {
  /**
   * The service artifact reference id in the form of /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactName}/vmArtifactsProfiles/{vmArtifactsProfilesName}
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

export interface SecurityPostureReference {
  /**
   * List of virtual machine extensions to exclude when applying the Security Posture.
   */
  excludeExtensions?: VirtualMachineExtension[];
  /**
   * The security posture reference id in the form of /CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|{major.*}|latest
   */
  id?: string;
}

export interface VirtualMachineExtension {
  /**
   * Resource location
   */
  location?: string;
  /**
   * Describes the properties of a Virtual Machine Extension.
   */
  properties?: VirtualMachineExtensionProperties;
  /**
   * Resource tags
   */
  tags?: object | string | boolean | number;
}

export interface VirtualMachineExtensionProperties {
  /**
   * Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true.
   */
  autoUpgradeMinorVersion?: boolean;
  /**
   * Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available.
   */
  enableAutomaticUpgrade?: boolean;
  /**
   * How the extension handler should be forced to update even if the extension configuration has not changed.
   */
  forceUpdateTag?: string;
  /**
   * The virtual machine extension instance view.
   */
  instanceView?: VirtualMachineExtensionInstanceView;
  /**
   * The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all.
   */
  protectedSettings?: object | string | boolean | number;
  /**
   * The extensions protected settings that are passed by reference, and consumed from key vault
   */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
  /**
   * Collection of extension names after which this extension needs to be provisioned.
   */
  provisionAfterExtensions?: string[];
  /**
   * The name of the extension handler publisher.
   */
  publisher?: string;
  /**
   * Json formatted public settings for the extension.
   */
  settings?: object | string | boolean | number;
  /**
   * Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false.
   */
  suppressFailures?: boolean;
  /**
   * Specifies the type of the extension; an example is "CustomScriptExtension".
   */
  type?: string;
  /**
   * Specifies the version of the script handler.
   */
  typeHandlerVersion?: string;
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

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface VirtualMachineExtensionInstanceView {
  /**
   * The virtual machine extension name.
   */
  name?: string;
  /**
   * The resource status information.
   */
  statuses?: InstanceViewStatus[];
  /**
   * The resource status information.
   */
  substatuses?: InstanceViewStatus[];
  /**
   * Specifies the type of the extension; an example is "CustomScriptExtension".
   */
  type?: string;
  /**
   * Specifies the version of the script handler.
   */
  typeHandlerVersion?: string;
}

export interface InstanceViewStatus {
  /**
   * The status code.
   */
  code?: string;
  /**
   * The short localizable label for the status.
   */
  displayStatus?: string;
  /**
   * The level code.
   */
  level?: string;
  /**
   * The detailed status message, including for alerts and error messages.
   */
  message?: string;
  /**
   * The time of the status.
   */
  time?: string;
}

export interface InstanceViewStatus {
  /**
   * The status code.
   */
  code?: string;
  /**
   * The short localizable label for the status.
   */
  displayStatus?: string;
  /**
   * The level code.
   */
  level?: string;
  /**
   * The detailed status message, including for alerts and error messages.
   */
  message?: string;
  /**
   * The time of the status.
   */
  time?: string;
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

export interface VirtualMachineScaleSetOsProfile {
  /**
   * Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection)
   */
  adminPassword?: string;
  /**
   * Specifies the name of the administrator account. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters
   */
  adminUsername?: string;
  /**
   * Specifies whether extension operations should be allowed on the virtual machine scale set. This may only be set to False when no extensions are present on the virtual machine scale set.
   */
  allowExtensionOperations?: boolean;
  /**
   * Specifies the computer name prefix for all of the virtual machines in the scale set. Computer name prefixes must be 1 to 15 characters long.
   */
  computerNamePrefix?: string;
  /**
   * Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. For using cloud-init for your VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init)
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
   * Specifies set of certificates that should be installed onto the virtual machines in the scale set. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
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

export interface VirtualMachineScaleSetNetworkProfile {
  /**
   * A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'.
   */
  healthProbe?: ApiEntityReference;
  /**
   * specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations for Virtual Machine Scale Set with orchestration mode 'Flexible'
   */
  networkApiVersion?: string;
  /**
   * The list of network configurations.
   */
  networkInterfaceConfigurations?: VirtualMachineScaleSetNetworkConfiguration[];
}

export interface VirtualMachineScaleSetNetworkConfiguration {
  /**
   * The network configuration name.
   */
  name: string;
  /**
   * Describes a virtual machine scale set network profile's IP configuration.
   */
  properties?: VirtualMachineScaleSetNetworkConfigurationProperties;
}

export interface VirtualMachineScaleSetNetworkConfigurationProperties {
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
  dnsSettings?: VirtualMachineScaleSetNetworkConfigurationDnsSettings;
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
  ipConfigurations: VirtualMachineScaleSetIpConfiguration[];
  /**
   * The network security group.
   */
  networkSecurityGroup?: SubResource;
  /**
   * Specifies the primary network interface in case the virtual machine has more than 1 network interface.
   */
  primary?: boolean;
}

export interface VirtualMachineScaleSetIpConfiguration {
  /**
   * The IP configuration name.
   */
  name: string;
  /**
   * Describes a virtual machine scale set network profile's IP configuration properties.
   */
  properties?: VirtualMachineScaleSetIpConfigurationProperties;
}

export interface VirtualMachineScaleSetIpConfigurationProperties {
  /**
   * Specifies an array of references to backend address pools of application gateways. A scale set can reference backend address pools of multiple application gateways. Multiple scale sets cannot use the same application gateway.
   */
  applicationGatewayBackendAddressPools?: SubResource[];
  /**
   * Specifies an array of references to application security group.
   */
  applicationSecurityGroups?: SubResource[];
  /**
   * Specifies an array of references to backend address pools of load balancers. A scale set can reference backend address pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer.
   */
  loadBalancerBackendAddressPools?: SubResource[];
  /**
   * Specifies an array of references to inbound Nat pools of the load balancers. A scale set can reference inbound nat pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer.
   */
  loadBalancerInboundNatPools?: SubResource[];
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
  publicIPAddressConfiguration?: VirtualMachineScaleSetPublicIpAddressConfiguration;
  /**
   * Specifies the identifier of the subnet.
   */
  subnet?: ApiEntityReference;
}

export interface ApiEntityReference {
  /**
   * The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/...
   */
  id?: string;
}

export interface VirtualMachineScaleSetPublicIpAddressConfiguration {
  /**
   * The publicIP address configuration name.
   */
  name: string;
  /**
   * Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration
   */
  properties?: VirtualMachineScaleSetPublicIpAddressConfigurationProperties;
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

export interface VirtualMachineScaleSetPublicIpAddressConfigurationProperties {
  /**
   * Specify what happens to the public IP when the VM is deleted
   */
  deleteOption?: string;
  /**
   * The dns settings to be applied on the publicIP addresses .
   */
  dnsSettings?: VirtualMachineScaleSetPublicIpAddressConfigurationDnsSettings;
  /**
   * The idle timeout of the public IP address.
   */
  idleTimeoutInMinutes?: number;
  /**
   * The list of IP tags associated with the public IP address.
   */
  ipTags?: VirtualMachineScaleSetIpTag[];
  /**
   * Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'.
   */
  publicIPAddressVersion?: string;
  /**
   * The PublicIPPrefix from which to allocate publicIP addresses.
   */
  publicIPPrefix?: SubResource;
}

export interface VirtualMachineScaleSetIpTag {
  /**
   * IP tag type. Example: FirstPartyUsage.
   */
  ipTagType?: string;
  /**
   * IP tag associated with the public IP. Example: SQL, Storage etc.
   */
  tag?: string;
}

export interface VirtualMachineScaleSetPublicIpAddressConfigurationDnsSettings {
  /**
   * The Domain name label.The concatenation of the domain name label and vm index will be the domain name labels of the PublicIPAddress resources that will be created
   */
  domainNameLabel: string;
  /**
   * The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created
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

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface VirtualMachineScaleSetNetworkConfigurationDnsSettings {
  /**
   * List of DNS servers IP addresses
   */
  dnsServers?: string[];
}

export interface ApiEntityReference {
  /**
   * The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/...
   */
  id?: string;
}

export interface VirtualMachineScaleSetHardwareProfile {
  /**
   * Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-11-01. Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details.
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

export interface VirtualMachineScaleSetExtensionProfile {
  /**
   * The virtual machine scale set child extension resources.
   */
  extensions?: VirtualMachineScaleSetExtension[];
  /**
   * Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum api-version: 2020-06-01.
   */
  extensionsTimeBudget?: string;
}

export interface VirtualMachineScaleSetExtension {
  /**
   * The name of the extension.
   */
  name?: string;
  /**
   *
   */
  properties?: string;
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

export interface UpgradePolicy {
  /**
   * Configuration parameters used for performing automatic OS Upgrade.
   */
  automaticOSUpgradePolicy?: AutomaticOsUpgradePolicy;
  /**
   * Specifies the mode of an upgrade to virtual machines in the scale set.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of updates to virtual machines in the scale set. You do this by using the manualUpgrade action.<br /><br /> **Automatic** - All virtual machines in the scale set are  automatically updated at the same time.
   */
  mode?: string;
  /**
   * The configuration parameters used while performing a rolling upgrade.
   */
  rollingUpgradePolicy?: RollingUpgradePolicy;
}

export interface RollingUpgradePolicy {
  /**
   * Allow VMSS to ignore AZ boundaries when constructing upgrade batches. Take into consideration the Update Domain and maxBatchInstancePercent to determine the batch size.
   */
  enableCrossZoneUpgrade?: boolean;
  /**
   * The maximum percent of total virtual machine instances that will be upgraded simultaneously by the rolling upgrade in one batch. As this is a maximum, unhealthy instances in previous or future batches can cause the percentage of instances in a batch to decrease to ensure higher reliability. The default value for this parameter is 20%.
   */
  maxBatchInstancePercent?: number;
  /**
   * Create new virtual machines to upgrade the scale set, rather than updating the existing virtual machines. Existing virtual machines will be deleted once the new virtual machines are created for each batch.
   */
  maxSurge?: boolean;
  /**
   * The maximum percentage of the total virtual machine instances in the scale set that can be simultaneously unhealthy, either as a result of being upgraded, or by being found in an unhealthy state by the virtual machine health checks before the rolling upgrade aborts. This constraint will be checked prior to starting any batch. The default value for this parameter is 20%.
   */
  maxUnhealthyInstancePercent?: number;
  /**
   * The maximum percentage of upgraded virtual machine instances that can be found to be in an unhealthy state. This check will happen after each batch is upgraded. If this percentage is ever exceeded, the rolling update aborts. The default value for this parameter is 20%.
   */
  maxUnhealthyUpgradedInstancePercent?: number;
  /**
   * The wait time between completing the update for all virtual machines in one batch and starting the next batch. The time duration should be specified in ISO 8601 format. The default value is 0 seconds (PT0S).
   */
  pauseTimeBetweenBatches?: string;
  /**
   * Upgrade all unhealthy instances in a scale set before any healthy instances.
   */
  prioritizeUnhealthyInstances?: boolean;
  /**
   * Rollback failed instances to previous model if the Rolling Upgrade policy is violated.
   */
  rollbackFailedInstancesOnPolicyBreach?: boolean;
}

export interface AutomaticOsUpgradePolicy {
  /**
   * Whether OS image rollback feature should be disabled. Default value is false.
   */
  disableAutomaticRollback?: boolean;
  /**
   * Indicates whether OS upgrades should automatically be applied to scale set instances in a rolling fashion when a newer version of the OS image becomes available. Default value is false. If this is set to true for Windows based scale sets, [enableAutomaticUpdates](https://docs.microsoft.com/dotnet/api/microsoft.azure.management.compute.models.windowsconfiguration.enableautomaticupdates?view=azure-dotnet) is automatically set to false and cannot be set to true.
   */
  enableAutomaticOSUpgrade?: boolean;
  /**
   * Indicates whether Auto OS Upgrade should undergo deferral. Deferred OS upgrades will send advanced notifications on a per-VM basis that an OS upgrade from rolling upgrades is incoming, via the IMDS tag 'Platform.PendingOSUpgrade'. The upgrade then defers until the upgrade is approved via an ApproveRollingUpgrade call.
   */
  osRollingUpgradeDeferral?: boolean;
  /**
   * Indicates whether rolling upgrade policy should be used during Auto OS Upgrade. Default value is false. Auto OS Upgrade will fallback to the default policy if no policy is defined on the VMSS.
   */
  useRollingUpgradePolicy?: boolean;
}

export interface SpotRestorePolicy {
  /**
   * Enables the Spot-Try-Restore feature where evicted VMSS SPOT instances will be tried to be restored opportunistically based on capacity availability and pricing constraints
   */
  enabled?: boolean;
  /**
   * Timeout value expressed as an ISO 8601 time duration after which the platform will not try to restore the VMSS SPOT instances
   */
  restoreTimeout?: string;
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

export interface ScaleInPolicy {
  /**
   * This property allows you to specify if virtual machines chosen for removal have to be force deleted when a virtual machine scale set is being scaled-in.(Feature in Preview)
   */
  forceDeletion?: boolean;
  /**
   * The rules to be followed when scaling-in a virtual machine scale set. <br><br> Possible values are: <br><br> **Default** When a virtual machine scale set is scaled in, the scale set will first be balanced across zones if it is a zonal scale set. Then, it will be balanced across Fault Domains as far as possible. Within each Fault Domain, the virtual machines chosen for removal will be the newest ones that are not protected from scale-in. <br><br> **OldestVM** When a virtual machine scale set is being scaled-in, the oldest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the oldest virtual machines that are not protected will be chosen for removal. <br><br> **NewestVM** When a virtual machine scale set is being scaled-in, the newest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the newest virtual machines that are not protected will be chosen for removal. <br><br>
   */
  rules?: string[];
}

export interface ResiliencyPolicy {
  /**
   * The configuration parameters used while performing resilient VM creation.
   */
  resilientVMCreationPolicy?: ResilientVmCreationPolicy;
  /**
   * The configuration parameters used while performing resilient VM deletion.
   */
  resilientVMDeletionPolicy?: ResilientVmDeletionPolicy;
}

export interface ResilientVmDeletionPolicy {
  /**
   * Specifies whether resilient VM deletion should be enabled on the virtual machine scale set. The default value is false.
   */
  enabled?: boolean;
}

export interface ResilientVmCreationPolicy {
  /**
   * Specifies whether resilient VM creation should be enabled on the virtual machine scale set. The default value is false.
   */
  enabled?: boolean;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface PriorityMixPolicy {
  /**
   * The base number of regular priority VMs that will be created in this scale set as it scales out.
   */
  baseRegularPriorityCount?: number;
  /**
   * The percentage of VM instances, after the base regular priority count has been reached, that are expected to use regular priority.
   */
  regularPriorityPercentageAboveBase?: number;
}

export interface SubResource {
  /**
   * Resource Id
   */
  id?: string;
}

export interface AutomaticRepairsPolicy {
  /**
   * Specifies whether automatic repairs should be enabled on the virtual machine scale set. The default value is false.
   */
  enabled?: boolean;
  /**
   * The amount of time for which automatic repairs are suspended due to a state change on VM. The grace time starts after the state change has completed. This helps avoid premature or accidental repairs. The time duration should be specified in ISO 8601 format. The minimum allowed grace period is 10 minutes (PT10M), which is also the default value. The maximum allowed grace period is 90 minutes (PT90M).
   */
  gracePeriod?: string;
  /**
   * Type of repair action (replace, restart, reimage) that will be used for repairing unhealthy virtual machines in the scale set. Default value is replace.
   */
  repairAction?: string;
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

export class VirtualMachineScaleSets extends AzAPIBase {
  /**
       * Constructs a new VirtualMachineScaleSets.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Compute/virtualMachineScaleSets@2024-03-01. The properties include:
     * `extendedLocation` - (Optional) The extended location of the Virtual Machine Scale Set. Defaults to `ExtendedLocation`.
     * `plan` - (Optional) Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. Defaults to `Plan`.
     * `properties` - (Required) Describes the properties of a Virtual Machine Scale Set. Defaults to `VirtualMachineScaleSetProperties`.
     * `sku` - (Optional) The virtual machine scale set sku. Defaults to `Sku`.
     * `zones` - (Optional) The virtual machine scale set zones. NOTE: Availability zones can only be set when you create the scale set Defaults to `string[]`.
     *
     * ---
     *
     * The `Sku` block supports the following:

     * `capacity` - (Optional) Specifies the number of virtual machines in the scale set. Defaults to `integer`.
     * `name` - (Optional) The sku name. Defaults to `string`.
     * `tier` - (Optional) Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic** Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetProperties` block supports the following:

     * `additionalCapabilities` - (Optional) Specifies additional capabilities enabled or disabled on the Virtual Machines in the Virtual Machine Scale Set. For instance: whether the Virtual Machines have the capability to support attaching managed data disks with UltraSSD_LRS storage account type. Defaults to `AdditionalCapabilities`.
     * `automaticRepairsPolicy` - (Optional) Policy for automatic repairs. Defaults to `AutomaticRepairsPolicy`.
     * `constrainedMaximumCapacity` - (Optional) Optional property which must either be set to True or omitted. Defaults to `boolean`.
     * `doNotRunExtensionsOnOverprovisionedVMs` - (Optional) When Overprovision is enabled, extensions are launched only on the requested number of VMs which are finally kept. This property will hence ensure that the extensions do not run on the extra overprovisioned VMs. Defaults to `boolean`.
     * `hostGroup` - (Optional) Specifies information about the dedicated host group that the virtual machine scale set resides in. Minimum api-version: 2020-06-01. Defaults to `SubResource`.
     * `orchestrationMode` - (Optional) Specifies the orchestration mode for the virtual machine scale set. Defaults to `string`.
     * `overprovision` - (Optional) Specifies whether the Virtual Machine Scale Set should be overprovisioned. Defaults to `boolean`.
     * `platformFaultDomainCount` - (Optional) Fault Domain count for each placement group. Defaults to `integer`.
     * `priorityMixPolicy` - (Optional) Specifies the desired targets for mixing Spot and Regular priority VMs within the same VMSS Flex instance. Defaults to `PriorityMixPolicy`.
     * `proximityPlacementGroup` - (Optional) Specifies information about the proximity placement group that the virtual machine scale set should be assigned to. Minimum api-version: 2018-04-01. Defaults to `SubResource`.
     * `resiliencyPolicy` - (Optional) Policy for Resiliency Defaults to `ResiliencyPolicy`.
     * `scaleInPolicy` - (Optional) Specifies the policies applied when scaling in Virtual Machines in the Virtual Machine Scale Set. Defaults to `ScaleInPolicy`.
     * `scheduledEventsPolicy` - (Optional) The ScheduledEventsPolicy. Defaults to `ScheduledEventsPolicy`.
     * `singlePlacementGroup` - (Optional) When true this limits the scale set to a single placement group, of max size 100 virtual machines. NOTE: If singlePlacementGroup is true, it may be modified to false. However, if singlePlacementGroup is false, it may not be modified to true. Defaults to `boolean`.
     * `spotRestorePolicy` - (Optional) Specifies the Spot Restore properties for the virtual machine scale set. Defaults to `SpotRestorePolicy`.
     * `upgradePolicy` - (Optional) The upgrade policy. Defaults to `UpgradePolicy`.
     * `virtualMachineProfile` - (Optional) The virtual machine profile. Defaults to `VirtualMachineScaleSetVmProfile`.
     * `zoneBalance` - (Optional) Whether to force strictly even Virtual Machine distribution cross x-zones in case there is zone outage. zoneBalance property can only be set if the zones property of the scale set contains more than one zone. If there are no zones or only one zone specified, then zoneBalance property should not be set. Defaults to `boolean`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetVMProfile` block supports the following:

     * `applicationProfile` - (Optional) Specifies the gallery applications that should be made available to the VM/VMSS Defaults to `ApplicationProfile`.
     * `billingProfile` - (Optional) Specifies the billing related details of a Azure Spot VMSS. Minimum api-version: 2019-03-01. Defaults to `BillingProfile`.
     * `capacityReservation` - (Optional) Specifies the capacity reservation related details of a scale set. Minimum api-version: 2021-04-01. Defaults to `CapacityReservationProfile`.
     * `diagnosticsProfile` - (Optional) Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15. Defaults to `DiagnosticsProfile`.
     * `evictionPolicy` - (Optional) Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. Defaults to `string`.
     * `extensionProfile` - (Optional) Specifies a collection of settings for extensions installed on virtual machines in the scale set. Defaults to `VirtualMachineScaleSetExtensionProfile`.
     * `hardwareProfile` - (Optional) Specifies the hardware profile related details of a scale set. Minimum api-version: 2021-11-01. Defaults to `VirtualMachineScaleSetHardwareProfile`.
     * `licenseType` - (Optional) Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 Defaults to `string`.
     * `networkProfile` - (Optional) Specifies properties of the network interfaces of the virtual machines in the scale set. Defaults to `VirtualMachineScaleSetNetworkProfile`.
     * `osProfile` - (Optional) Specifies the operating system settings for the virtual machines in the scale set. Defaults to `VirtualMachineScaleSetOsProfile`.
     * `priority` - (Optional) Specifies the priority for the virtual machines in the scale set. Minimum api-version: 2017-10-30-preview. Defaults to `string`.
     * `scheduledEventsProfile` - (Optional) Specifies Scheduled Event related configurations. Defaults to `ScheduledEventsProfile`.
     * `securityPostureReference` - (Optional) Specifies the security posture to be used for all virtual machines in the scale set. Minimum api-version: 2023-03-01 Defaults to `SecurityPostureReference`.
     * `securityProfile` - (Optional) Specifies the Security related profile settings for the virtual machines in the scale set. Defaults to `SecurityProfile`.
     * `serviceArtifactReference` - (Optional) Specifies the service artifact reference id used to set same image version for all virtual machines in the scale set when using 'latest' image version. Minimum api-version: 2022-11-01 Defaults to `ServiceArtifactReference`.
     * `storageProfile` - (Optional) Specifies the storage settings for the virtual machine disks. Defaults to `VirtualMachineScaleSetStorageProfile`.
     * `userData` - (Optional) UserData for the virtual machines in the scale set, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum api-version: 2021-03-01. Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetStorageProfile` block supports the following:

     * `dataDisks` - (Optional) Specifies the parameters that are used to add data disks to the virtual machines in the scale set. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). Defaults to `VirtualMachineScaleSetDataDisk[]`.
     * `diskControllerType` - (Optional)  Defaults to `string`.
     * `imageReference` - (Optional) Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. Defaults to `ImageReference`.
     * `osDisk` - (Optional) Specifies information about the operating system disk used by the virtual machines in the scale set. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). Defaults to `VirtualMachineScaleSetOsDisk`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetOSDisk` block supports the following:

     * `caching` - (Optional) Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage.** Defaults to `string`.
     * `createOption` - (Required) Specifies how the virtual machines in the scale set should be created. The only allowed value is: **FromImage.** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. Defaults to `string`.
     * `deleteOption` - (Optional) Specifies whether OS Disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only). <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the OS disk is retained after VMSS Flex VM is deleted. <br><br> The default value is set to **Delete**. For an Ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for Ephemeral OS Disk. Defaults to `string`.
     * `diffDiskSettings` - (Optional) Specifies the ephemeral disk Settings for the operating system disk used by the virtual machine scale set. Defaults to `DiffDiskSettings`.
     * `diskSizeGB` - (Optional) Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. Defaults to `integer`.
     * `image` - (Optional) Specifies information about the unmanaged user image to base the scale set on. Defaults to `VirtualHardDisk`.
     * `managedDisk` - (Optional) The managed disk parameters. Defaults to `VirtualMachineScaleSetManagedDiskParameters`.
     * `name` - (Optional) The disk name. Defaults to `string`.
     * `osType` - (Optional) This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.** Defaults to `string`.
     * `vhdContainers` - (Optional) Specifies the container urls that are used to store operating system disks for the scale set. Defaults to `string[]`.
     * `writeAcceleratorEnabled` - (Optional) Specifies whether writeAccelerator should be enabled or disabled on the disk. Defaults to `boolean`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetManagedDiskParameters` block supports the following:

     * `diskEncryptionSet` - (Optional) Specifies the customer managed disk encryption set resource id for the managed disk. Defaults to `DiskEncryptionSetParameters`.
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
     * The `VirtualMachineScaleSetDataDisk[]` block supports the following:

     * `caching` - (Optional) Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage.** Defaults to `string`.
     * `createOption` - (Required) The create option. Defaults to `string`.
     * `deleteOption` - (Optional) Specifies whether data disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only).<br><br> Possible values: <br><br> **Delete** If this value is used, the data disk is deleted when the VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the data disk is retained after VMSS Flex VM is deleted.<br><br> The default value is set to **Delete**. Defaults to `string`.
     * `diskIOPSReadWrite` - (Optional) Specifies the Read-Write IOPS for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. Defaults to `integer`.
     * `diskMBpsReadWrite` - (Optional) Specifies the bandwidth in MB per second for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. Defaults to `integer`.
     * `diskSizeGB` - (Optional) Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. Defaults to `integer`.
     * `lun` - (Required) Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. Defaults to `integer`.
     * `managedDisk` - (Optional) The managed disk parameters. Defaults to `VirtualMachineScaleSetManagedDiskParameters`.
     * `name` - (Optional) The disk name. Defaults to `string`.
     * `writeAcceleratorEnabled` - (Optional) Specifies whether writeAccelerator should be enabled or disabled on the disk. Defaults to `boolean`.
     *
     * ---
     *
     * The `ServiceArtifactReference` block supports the following:

     * `id` - (Optional) The service artifact reference id in the form of /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactName}/vmArtifactsProfiles/{vmArtifactsProfilesName} Defaults to `string`.
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
     * The `SecurityPostureReference` block supports the following:

     * `excludeExtensions` - (Optional) List of virtual machine extensions to exclude when applying the Security Posture. Defaults to `VirtualMachineExtension[]`.
     * `id` - (Optional) The security posture reference id in the form of /CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|{major.*}|latest Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineExtension[]` block supports the following:

     * `location` - (Optional) Resource location Defaults to `string`.
     * `properties` - (Optional) Describes the properties of a Virtual Machine Extension. Defaults to `VirtualMachineExtensionProperties`.
     * `tags` - (Optional) Resource tags Defaults to `object`.
     *
     * ---
     *
     * The `VirtualMachineExtensionProperties` block supports the following:

     * `autoUpgradeMinorVersion` - (Optional) Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. Defaults to `boolean`.
     * `enableAutomaticUpgrade` - (Optional) Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. Defaults to `boolean`.
     * `forceUpdateTag` - (Optional) How the extension handler should be forced to update even if the extension configuration has not changed. Defaults to `string`.
     * `instanceView` - (Optional) The virtual machine extension instance view. Defaults to `VirtualMachineExtensionInstanceView`.
     * `protectedSettings` - (Optional) The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. Defaults to `object`.
     * `protectedSettingsFromKeyVault` - (Optional) The extensions protected settings that are passed by reference, and consumed from key vault Defaults to `KeyVaultSecretReference`.
     * `provisionAfterExtensions` - (Optional) Collection of extension names after which this extension needs to be provisioned. Defaults to `string[]`.
     * `publisher` - (Optional) The name of the extension handler publisher. Defaults to `string`.
     * `settings` - (Optional) Json formatted public settings for the extension. Defaults to `object`.
     * `suppressFailures` - (Optional) Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. Defaults to `boolean`.
     * `type` - (Optional) Specifies the type of the extension; an example is "CustomScriptExtension". Defaults to `string`.
     * `typeHandlerVersion` - (Optional) Specifies the version of the script handler. Defaults to `string`.
     *
     * ---
     *
     * The `KeyVaultSecretReference` block supports the following:

     * `secretUrl` - (Required) The URL referencing a secret in a Key Vault. Defaults to `string`.
     * `sourceVault` - (Required) The relative URL of the Key Vault containing the secret. Defaults to `SubResource`.
     *
     * ---
     *
     * The `SubResource` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineExtensionInstanceView` block supports the following:

     * `name` - (Optional) The virtual machine extension name. Defaults to `string`.
     * `statuses` - (Optional) The resource status information. Defaults to `InstanceViewStatus[]`.
     * `substatuses` - (Optional) The resource status information. Defaults to `InstanceViewStatus[]`.
     * `type` - (Optional) Specifies the type of the extension; an example is "CustomScriptExtension". Defaults to `string`.
     * `typeHandlerVersion` - (Optional) Specifies the version of the script handler. Defaults to `string`.
     *
     * ---
     *
     * The `InstanceViewStatus[]` block supports the following:

     * `code` - (Optional) The status code. Defaults to `string`.
     * `displayStatus` - (Optional) The short localizable label for the status. Defaults to `string`.
     * `level` - (Optional) The level code. Defaults to `string`.
     * `message` - (Optional) The detailed status message, including for alerts and error messages. Defaults to `string`.
     * `time` - (Optional) The time of the status. Defaults to `string`.
     *
     * ---
     *
     * The `InstanceViewStatus[]` block supports the following:

     * `code` - (Optional) The status code. Defaults to `string`.
     * `displayStatus` - (Optional) The short localizable label for the status. Defaults to `string`.
     * `level` - (Optional) The level code. Defaults to `string`.
     * `message` - (Optional) The detailed status message, including for alerts and error messages. Defaults to `string`.
     * `time` - (Optional) The time of the status. Defaults to `string`.
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
     * The `VirtualMachineScaleSetOSProfile` block supports the following:

     * `adminPassword` - (Optional) Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) Defaults to `string`.
     * `adminUsername` - (Optional) Specifies the name of the administrator account. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters Defaults to `string`.
     * `allowExtensionOperations` - (Optional) Specifies whether extension operations should be allowed on the virtual machine scale set. This may only be set to False when no extensions are present on the virtual machine scale set. Defaults to `boolean`.
     * `computerNamePrefix` - (Optional) Specifies the computer name prefix for all of the virtual machines in the scale set. Computer name prefixes must be 1 to 15 characters long. Defaults to `string`.
     * `customData` - (Optional) Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. For using cloud-init for your VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init) Defaults to `string`.
     * `linuxConfiguration` - (Optional) Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). Defaults to `LinuxConfiguration`.
     * `requireGuestProvisionSignal` - (Optional) Optional property which must either be set to True or omitted. Defaults to `boolean`.
     * `secrets` - (Optional) Specifies set of certificates that should be installed onto the virtual machines in the scale set. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). Defaults to `VaultSecretGroup[]`.
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
     * The `VirtualMachineScaleSetNetworkProfile` block supports the following:

     * `healthProbe` - (Optional) A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'. Defaults to `ApiEntityReference`.
     * `networkApiVersion` - (Optional) specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations for Virtual Machine Scale Set with orchestration mode 'Flexible' Defaults to `string`.
     * `networkInterfaceConfigurations` - (Optional) The list of network configurations. Defaults to `VirtualMachineScaleSetNetworkConfiguration[]`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetNetworkConfiguration[]` block supports the following:

     * `name` - (Required) The network configuration name. Defaults to `string`.
     * `properties` - (Optional) Describes a virtual machine scale set network profile's IP configuration. Defaults to `VirtualMachineScaleSetNetworkConfigurationProperties`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetNetworkConfigurationProperties` block supports the following:

     * `auxiliaryMode` - (Optional) Specifies whether the Auxiliary mode is enabled for the Network Interface resource. Defaults to `string`.
     * `auxiliarySku` - (Optional) Specifies whether the Auxiliary sku is enabled for the Network Interface resource. Defaults to `string`.
     * `deleteOption` - (Optional) Specify what happens to the network interface when the VM is deleted Defaults to `string`.
     * `disableTcpStateTracking` - (Optional) Specifies whether the network interface is disabled for tcp state tracking. Defaults to `boolean`.
     * `dnsSettings` - (Optional) The dns settings to be applied on the network interfaces. Defaults to `VirtualMachineScaleSetNetworkConfigurationDnsSettings`.
     * `enableAcceleratedNetworking` - (Optional) Specifies whether the network interface is accelerated networking-enabled. Defaults to `boolean`.
     * `enableFpga` - (Optional) Specifies whether the network interface is FPGA networking-enabled. Defaults to `boolean`.
     * `enableIPForwarding` - (Optional) Whether IP forwarding enabled on this NIC. Defaults to `boolean`.
     * `ipConfigurations` - (Required) Specifies the IP configurations of the network interface. Defaults to `VirtualMachineScaleSetIpConfiguration[]`.
     * `networkSecurityGroup` - (Optional) The network security group. Defaults to `SubResource`.
     * `primary` - (Optional) Specifies the primary network interface in case the virtual machine has more than 1 network interface. Defaults to `boolean`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetIPConfiguration[]` block supports the following:

     * `name` - (Required) The IP configuration name. Defaults to `string`.
     * `properties` - (Optional) Describes a virtual machine scale set network profile's IP configuration properties. Defaults to `VirtualMachineScaleSetIpConfigurationProperties`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetIPConfigurationProperties` block supports the following:

     * `applicationGatewayBackendAddressPools` - (Optional) Specifies an array of references to backend address pools of application gateways. A scale set can reference backend address pools of multiple application gateways. Multiple scale sets cannot use the same application gateway. Defaults to `SubResource[]`.
     * `applicationSecurityGroups` - (Optional) Specifies an array of references to application security group. Defaults to `SubResource[]`.
     * `loadBalancerBackendAddressPools` - (Optional) Specifies an array of references to backend address pools of load balancers. A scale set can reference backend address pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. Defaults to `SubResource[]`.
     * `loadBalancerInboundNatPools` - (Optional) Specifies an array of references to inbound Nat pools of the load balancers. A scale set can reference inbound nat pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. Defaults to `SubResource[]`.
     * `primary` - (Optional) Specifies the primary network interface in case the virtual machine has more than 1 network interface. Defaults to `boolean`.
     * `privateIPAddressVersion` - (Optional) Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. Defaults to `string`.
     * `publicIPAddressConfiguration` - (Optional) The publicIPAddressConfiguration. Defaults to `VirtualMachineScaleSetPublicIpAddressConfiguration`.
     * `subnet` - (Optional) Specifies the identifier of the subnet. Defaults to `ApiEntityReference`.
     *
     * ---
     *
     * The `ApiEntityReference` block supports the following:

     * `id` - (Optional) The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetPublicIPAddressConfiguration` block supports the following:

     * `name` - (Required) The publicIP address configuration name. Defaults to `string`.
     * `properties` - (Optional) Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration Defaults to `VirtualMachineScaleSetPublicIpAddressConfigurationProperties`.
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
     * The `VirtualMachineScaleSetPublicIPAddressConfigurationProperties` block supports the following:

     * `deleteOption` - (Optional) Specify what happens to the public IP when the VM is deleted Defaults to `string`.
     * `dnsSettings` - (Optional) The dns settings to be applied on the publicIP addresses . Defaults to `VirtualMachineScaleSetPublicIpAddressConfigurationDnsSettings`.
     * `idleTimeoutInMinutes` - (Optional) The idle timeout of the public IP address. Defaults to `integer`.
     * `ipTags` - (Optional) The list of IP tags associated with the public IP address. Defaults to `VirtualMachineScaleSetIpTag[]`.
     * `publicIPAddressVersion` - (Optional) Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. Defaults to `string`.
     * `publicIPPrefix` - (Optional) The PublicIPPrefix from which to allocate publicIP addresses. Defaults to `SubResource`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetIpTag[]` block supports the following:

     * `ipTagType` - (Optional) IP tag type. Example: FirstPartyUsage. Defaults to `string`.
     * `tag` - (Optional) IP tag associated with the public IP. Example: SQL, Storage etc. Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings` block supports the following:

     * `domainNameLabel` - (Required) The Domain name label.The concatenation of the domain name label and vm index will be the domain name labels of the PublicIPAddress resources that will be created Defaults to `string`.
     * `domainNameLabelScope` - (Optional) The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created Defaults to `string`.
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
     * The `SubResource[]` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetNetworkConfigurationDnsSettings` block supports the following:

     * `dnsServers` - (Optional) List of DNS servers IP addresses Defaults to `string[]`.
     *
     * ---
     *
     * The `ApiEntityReference` block supports the following:

     * `id` - (Optional) The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetHardwareProfile` block supports the following:

     * `vmSizeProperties` - (Optional) Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-11-01. Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details. Defaults to `VmSizeProperties`.
     *
     * ---
     *
     * The `VMSizeProperties` block supports the following:

     * `vCPUsAvailable` - (Optional) Specifies the number of vCPUs available for the VM. When this property is not specified in the request body the default behavior is to set it to the value of vCPUs available for that VM size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). Defaults to `integer`.
     * `vCPUsPerCore` - (Optional) Specifies the vCPU to physical core ratio. When this property is not specified in the request body the default behavior is set to the value of vCPUsPerCore for the VM Size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). **Setting this property to 1 also means that hyper-threading is disabled.** Defaults to `integer`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetExtensionProfile` block supports the following:

     * `extensions` - (Optional) The virtual machine scale set child extension resources. Defaults to `VirtualMachineScaleSetExtension[]`.
     * `extensionsTimeBudget` - (Optional) Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum api-version: 2020-06-01. Defaults to `string`.
     *
     * ---
     *
     * The `VirtualMachineScaleSetExtension[]` block supports the following:

     * `name` - (Optional) The name of the extension. Defaults to `string`.
     * `properties` - (Optional)  Defaults to `string`.
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
     * The `UpgradePolicy` block supports the following:

     * `automaticOSUpgradePolicy` - (Optional) Configuration parameters used for performing automatic OS Upgrade. Defaults to `AutomaticOsUpgradePolicy`.
     * `mode` - (Optional) Specifies the mode of an upgrade to virtual machines in the scale set.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of updates to virtual machines in the scale set. You do this by using the manualUpgrade action.<br /><br /> **Automatic** - All virtual machines in the scale set are  automatically updated at the same time. Defaults to `string`.
     * `rollingUpgradePolicy` - (Optional) The configuration parameters used while performing a rolling upgrade. Defaults to `RollingUpgradePolicy`.
     *
     * ---
     *
     * The `RollingUpgradePolicy` block supports the following:

     * `enableCrossZoneUpgrade` - (Optional) Allow VMSS to ignore AZ boundaries when constructing upgrade batches. Take into consideration the Update Domain and maxBatchInstancePercent to determine the batch size. Defaults to `boolean`.
     * `maxBatchInstancePercent` - (Optional) The maximum percent of total virtual machine instances that will be upgraded simultaneously by the rolling upgrade in one batch. As this is a maximum, unhealthy instances in previous or future batches can cause the percentage of instances in a batch to decrease to ensure higher reliability. The default value for this parameter is 20%. Defaults to `integer`.
     * `maxSurge` - (Optional) Create new virtual machines to upgrade the scale set, rather than updating the existing virtual machines. Existing virtual machines will be deleted once the new virtual machines are created for each batch. Defaults to `boolean`.
     * `maxUnhealthyInstancePercent` - (Optional) The maximum percentage of the total virtual machine instances in the scale set that can be simultaneously unhealthy, either as a result of being upgraded, or by being found in an unhealthy state by the virtual machine health checks before the rolling upgrade aborts. This constraint will be checked prior to starting any batch. The default value for this parameter is 20%. Defaults to `integer`.
     * `maxUnhealthyUpgradedInstancePercent` - (Optional) The maximum percentage of upgraded virtual machine instances that can be found to be in an unhealthy state. This check will happen after each batch is upgraded. If this percentage is ever exceeded, the rolling update aborts. The default value for this parameter is 20%. Defaults to `integer`.
     * `pauseTimeBetweenBatches` - (Optional) The wait time between completing the update for all virtual machines in one batch and starting the next batch. The time duration should be specified in ISO 8601 format. The default value is 0 seconds (PT0S). Defaults to `string`.
     * `prioritizeUnhealthyInstances` - (Optional) Upgrade all unhealthy instances in a scale set before any healthy instances. Defaults to `boolean`.
     * `rollbackFailedInstancesOnPolicyBreach` - (Optional) Rollback failed instances to previous model if the Rolling Upgrade policy is violated. Defaults to `boolean`.
     *
     * ---
     *
     * The `AutomaticOSUpgradePolicy` block supports the following:

     * `disableAutomaticRollback` - (Optional) Whether OS image rollback feature should be disabled. Default value is false. Defaults to `boolean`.
     * `enableAutomaticOSUpgrade` - (Optional) Indicates whether OS upgrades should automatically be applied to scale set instances in a rolling fashion when a newer version of the OS image becomes available. Default value is false. If this is set to true for Windows based scale sets, [enableAutomaticUpdates](https://docs.microsoft.com/dotnet/api/microsoft.azure.management.compute.models.windowsconfiguration.enableautomaticupdates?view=azure-dotnet) is automatically set to false and cannot be set to true. Defaults to `boolean`.
     * `osRollingUpgradeDeferral` - (Optional) Indicates whether Auto OS Upgrade should undergo deferral. Deferred OS upgrades will send advanced notifications on a per-VM basis that an OS upgrade from rolling upgrades is incoming, via the IMDS tag 'Platform.PendingOSUpgrade'. The upgrade then defers until the upgrade is approved via an ApproveRollingUpgrade call. Defaults to `boolean`.
     * `useRollingUpgradePolicy` - (Optional) Indicates whether rolling upgrade policy should be used during Auto OS Upgrade. Default value is false. Auto OS Upgrade will fallback to the default policy if no policy is defined on the VMSS. Defaults to `boolean`.
     *
     * ---
     *
     * The `SpotRestorePolicy` block supports the following:

     * `enabled` - (Optional) Enables the Spot-Try-Restore feature where evicted VMSS SPOT instances will be tried to be restored opportunistically based on capacity availability and pricing constraints Defaults to `boolean`.
     * `restoreTimeout` - (Optional) Timeout value expressed as an ISO 8601 time duration after which the platform will not try to restore the VMSS SPOT instances Defaults to `string`.
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
     * The `ScaleInPolicy` block supports the following:

     * `forceDeletion` - (Optional) This property allows you to specify if virtual machines chosen for removal have to be force deleted when a virtual machine scale set is being scaled-in.(Feature in Preview) Defaults to `boolean`.
     * `rules` - (Optional) The rules to be followed when scaling-in a virtual machine scale set. <br><br> Possible values are: <br><br> **Default** When a virtual machine scale set is scaled in, the scale set will first be balanced across zones if it is a zonal scale set. Then, it will be balanced across Fault Domains as far as possible. Within each Fault Domain, the virtual machines chosen for removal will be the newest ones that are not protected from scale-in. <br><br> **OldestVM** When a virtual machine scale set is being scaled-in, the oldest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the oldest virtual machines that are not protected will be chosen for removal. <br><br> **NewestVM** When a virtual machine scale set is being scaled-in, the newest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the newest virtual machines that are not protected will be chosen for removal. <br><br> Defaults to `string[]`.
     *
     * ---
     *
     * The `ResiliencyPolicy` block supports the following:

     * `resilientVMCreationPolicy` - (Optional) The configuration parameters used while performing resilient VM creation. Defaults to `ResilientVmCreationPolicy`.
     * `resilientVMDeletionPolicy` - (Optional) The configuration parameters used while performing resilient VM deletion. Defaults to `ResilientVmDeletionPolicy`.
     *
     * ---
     *
     * The `ResilientVMDeletionPolicy` block supports the following:

     * `enabled` - (Optional) Specifies whether resilient VM deletion should be enabled on the virtual machine scale set. The default value is false. Defaults to `boolean`.
     *
     * ---
     *
     * The `ResilientVMCreationPolicy` block supports the following:

     * `enabled` - (Optional) Specifies whether resilient VM creation should be enabled on the virtual machine scale set. The default value is false. Defaults to `boolean`.
     *
     * ---
     *
     * The `SubResource` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `PriorityMixPolicy` block supports the following:

     * `baseRegularPriorityCount` - (Optional) The base number of regular priority VMs that will be created in this scale set as it scales out. Defaults to `integer`.
     * `regularPriorityPercentageAboveBase` - (Optional) The percentage of VM instances, after the base regular priority count has been reached, that are expected to use regular priority. Defaults to `integer`.
     *
     * ---
     *
     * The `SubResource` block supports the following:

     * `id` - (Optional) Resource Id Defaults to `string`.
     *
     * ---
     *
     * The `AutomaticRepairsPolicy` block supports the following:

     * `enabled` - (Optional) Specifies whether automatic repairs should be enabled on the virtual machine scale set. The default value is false. Defaults to `boolean`.
     * `gracePeriod` - (Optional) The amount of time for which automatic repairs are suspended due to a state change on VM. The grace time starts after the state change has completed. This helps avoid premature or accidental repairs. The time duration should be specified in ISO 8601 format. The minimum allowed grace period is 10 minutes (PT10M), which is also the default value. The maximum allowed grace period is 90 minutes (PT90M). Defaults to `string`.
     * `repairAction` - (Optional) Type of repair action (replace, restart, reimage) that will be used for repairing unhealthy virtual machines in the scale set. Default value is replace. Defaults to `string`.
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
  constructor(
    scope: Construct,
    id: string,
    props: VirtualMachineScaleSetsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Compute/virtualMachineScaleSets@2024-03-01";
  }
  protected getResourceBody(props: VirtualMachineScaleSetsProps) {
    return {
      extendedLocation: props.extendedLocation,
      plan: props.plan,
      properties: props.properties,
      sku: props.sku,
      zones: props.zones,
    };
  }
  public addVirtualMachineScaleSetsVirtualMachines(
    props: VirtualMachineScaleSetsVirtualMachinesProps,
  ): VirtualMachineScaleSetsVirtualMachines {
    return new VirtualMachineScaleSetsVirtualMachines(this, props.name, {
      name: props.name,
      parentId: this.id,
      plan: props.plan,
      properties: props.properties,
    });
  }
}
