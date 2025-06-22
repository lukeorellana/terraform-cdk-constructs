import { Construct } from "constructs";
import {
  StorageAccountsBlobServices,
  StorageAccountsBlobServicesProps,
} from "./storageaccountsblobservices";
import {
  StorageAccountsEncryptionScopes,
  StorageAccountsEncryptionScopesProps,
} from "./storageaccountsencryptionscopes";
import {
  StorageAccountsFileServices,
  StorageAccountsFileServicesProps,
} from "./storageaccountsfileservices";
import {
  StorageAccountsInventoryPolicies,
  StorageAccountsInventoryPoliciesProps,
} from "./storageaccountsinventorypolicies";
import {
  StorageAccountsLocalUsers,
  StorageAccountsLocalUsersProps,
} from "./storageaccountslocalusers";
import {
  StorageAccountsManagementPolicies,
  StorageAccountsManagementPoliciesProps,
} from "./storageaccountsmanagementpolicies";
import {
  StorageAccountsObjectReplicationPolicies,
  StorageAccountsObjectReplicationPoliciesProps,
} from "./storageaccountsobjectreplicationpolicies";
import {
  StorageAccountsPrivateEndpointConnections,
  StorageAccountsPrivateEndpointConnectionsProps,
} from "./storageaccountsprivateendpointconnections";
import {
  StorageAccountsQueueServices,
  StorageAccountsQueueServicesProps,
} from "./storageaccountsqueueservices";
import {
  StorageAccountsStorageTaskAssignments,
  StorageAccountsStorageTaskAssignmentsProps,
} from "./storageaccountsstoragetaskassignments";
import {
  StorageAccountsTableServices,
  StorageAccountsTableServicesProps,
} from "./storageaccountstableservices";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsProps extends IAzAPIBaseProps {
  /**
   * Optional. Set the extended location of the resource. If not set, the storage account will be created in Azure main region. Otherwise it will be created in the specified extended location
   */
  extendedLocation?: ExtendedLocation;
  /**
   * Required. Indicates the type of storage account.
   */
  kind?: string;
  /**
   * The parameters used to create the storage account.
   */
  properties?: StorageAccountPropertiesCreateParameters;
  /**
   * Required. Gets or sets the SKU name.
   */
  sku?: Sku;
}

export interface Sku {
  /**
   * The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType.
   */
  name: string;
}

export interface StorageAccountPropertiesCreateParameters {
  /**
   * Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type.
   */
  accessTier?: string;
  /**
   * Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property.
   */
  allowBlobPublicAccess?: boolean;
  /**
   * Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default.
   */
  allowCrossTenantReplication?: boolean;
  /**
   * Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true.
   */
  allowSharedKeyAccess?: boolean;
  /**
   * Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet.
   */
  allowedCopyScope?: string;
  /**
   * Provides the identity based authentication settings for Azure Files.
   */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthentication;
  /**
   * User domain assigned to the storage account. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property.
   */
  customDomain?: CustomDomain;
  /**
   * A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property.
   */
  defaultToOAuthAuthentication?: boolean;
  /**
   * Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier.
   */
  dnsEndpointType?: string;
  /**
   * Enables extended group support with local users feature, if set to true
   */
  enableExtendedGroups?: boolean;
  /**
   * Encryption settings to be used for server-side encryption for the storage account.
   */
  encryption?: Encryption;
  /**
   * The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the new containers in the account by default.
   */
  immutableStorageWithVersioning?: ImmutableStorageAccount;
  /**
   * Account HierarchicalNamespace enabled if sets to true.
   */
  isHnsEnabled?: boolean;
  /**
   * Enables local users feature, if set to true
   */
  isLocalUserEnabled?: boolean;
  /**
   * NFS 3.0 protocol support enabled if set to true.
   */
  isNfsV3Enabled?: boolean;
  /**
   * Enables Secure File Transfer Protocol, if set to true
   */
  isSftpEnabled?: boolean;
  /**
   * KeyPolicy assigned to the storage account.
   */
  keyPolicy?: KeyPolicy;
  /**
   * Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled.
   */
  largeFileSharesState?: string;
  /**
   * Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property.
   */
  minimumTlsVersion?: string;
  /**
   * Network rule set
   */
  networkAcls?: NetworkRuleSet;
  /**
   * Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'.
   */
  publicNetworkAccess?: string;
  /**
   * Maintains information about the network routing choice opted by the user for data transfer
   */
  routingPreference?: RoutingPreference;
  /**
   * SasPolicy assigned to the storage account.
   */
  sasPolicy?: SasPolicy;
  /**
   * Allows https traffic only to storage service if sets to true. The default value is true since API version 2019-04-01.
   */
  supportsHttpsTrafficOnly?: boolean;
}

export interface SasPolicy {
  /**
   * The SAS Expiration Action defines the action to be performed when sasPolicy.sasExpirationPeriod is violated. The 'Log' action can be used for audit purposes and the 'Block' action can be used to block and deny the usage of SAS tokens that do not adhere to the sas policy expiration period.
   */
  expirationAction: string;
  /**
   * The SAS expiration period, DD.HH:MM:SS.
   */
  sasExpirationPeriod: string;
}

export interface RoutingPreference {
  /**
   * A boolean flag which indicates whether internet routing storage endpoints are to be published
   */
  publishInternetEndpoints?: boolean;
  /**
   * A boolean flag which indicates whether microsoft routing storage endpoints are to be published
   */
  publishMicrosoftEndpoints?: boolean;
  /**
   * Routing Choice defines the kind of network routing opted by the user.
   */
  routingChoice?: string;
}

export interface NetworkRuleSet {
  /**
   * Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics.
   */
  bypass?: string;
  /**
   * Specifies the default action of allow or deny when no other rules match.
   */
  defaultAction: string;
  /**
   * Sets the IP ACL rules
   */
  ipRules?: IpRule[];
  /**
   * Sets the resource access rules
   */
  resourceAccessRules?: ResourceAccessRule[];
  /**
   * Sets the virtual network rules
   */
  virtualNetworkRules?: VirtualNetworkRule[];
}

export interface VirtualNetworkRule {
  /**
   * The action of virtual network rule.
   */
  action?: string;
  /**
   * Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}.
   */
  id: string;
  /**
   * Gets the state of virtual network rule.
   */
  state?: string;
}

export interface ResourceAccessRule {
  /**
   * Resource Id
   */
  resourceId?: string;
  /**
   * Tenant Id
   */
  tenantId?: string;
}

export interface IpRule {
  /**
   * The action of IP ACL rule.
   */
  action?: string;
  /**
   * Specifies the IP or IP range in CIDR format. Only IPV4 address is allowed.
   */
  value: string;
}

export interface KeyPolicy {
  /**
   * The key expiration period in days.
   */
  keyExpirationPeriodInDays: number;
}

export interface ImmutableStorageAccount {
  /**
   * A boolean flag which enables account-level immutability. All the containers under such an account have object-level immutability enabled by default.
   */
  enabled?: boolean;
  /**
   * Specifies the default account-level immutability policy which is inherited and applied to objects that do not possess an explicit immutability policy at the object level. The object-level immutability policy has higher precedence than the container-level immutability policy, which has a higher precedence than the account-level immutability policy.
   */
  immutabilityPolicy?: AccountImmutabilityPolicyProperties;
}

export interface AccountImmutabilityPolicyProperties {
  /**
   * This property can only be changed for disabled and unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted.
   */
  allowProtectedAppendWrites?: boolean;
  /**
   * The immutability period for the blobs in the container since the policy creation, in days.
   */
  immutabilityPeriodSinceCreationInDays?: number;
  /**
   * The ImmutabilityPolicy state defines the mode of the policy. Disabled state disables the policy, Unlocked state allows increase and decrease of immutability retention time and also allows toggling allowProtectedAppendWrites property, Locked state only allows the increase of the immutability retention time. A policy can only be created in a Disabled or Unlocked state and can be toggled between the two states. Only a policy in an Unlocked state can transition to a Locked state which cannot be reverted.
   */
  state?: string;
}

export interface Encryption {
  /**
   * The identity to be used with service-side encryption at rest.
   */
  identity?: EncryptionIdentity;
  /**
   * The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Storage, Microsoft.Keyvault
   */
  keySource?: string;
  /**
   * Properties provided by key vault.
   */
  keyvaultproperties?: KeyVaultProperties;
  /**
   * A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest.
   */
  requireInfrastructureEncryption?: boolean;
  /**
   * List of services which support encryption.
   */
  services?: EncryptionServices;
}

export interface EncryptionServices {
  /**
   * The encryption function of the blob storage service.
   */
  blob?: EncryptionService;
  /**
   * The encryption function of the file storage service.
   */
  file?: EncryptionService;
  /**
   * The encryption function of the queue storage service.
   */
  queue?: EncryptionService;
  /**
   * The encryption function of the table storage service.
   */
  table?: EncryptionService;
}

export interface EncryptionService {
  /**
   * A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled.
   */
  enabled?: boolean;
  /**
   * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.
   */
  keyType?: string;
}

export interface EncryptionService {
  /**
   * A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled.
   */
  enabled?: boolean;
  /**
   * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.
   */
  keyType?: string;
}

export interface EncryptionService {
  /**
   * A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled.
   */
  enabled?: boolean;
  /**
   * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.
   */
  keyType?: string;
}

export interface EncryptionService {
  /**
   * A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled.
   */
  enabled?: boolean;
  /**
   * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used.
   */
  keyType?: string;
}

export interface KeyVaultProperties {
  /**
   * The name of KeyVault key.
   */
  keyname?: string;
  /**
   * The Uri of KeyVault.
   */
  keyvaulturi?: string;
  /**
   * The version of KeyVault key.
   */
  keyversion?: string;
}

export interface EncryptionIdentity {
  /**
   * ClientId of the multi-tenant application to be used in conjunction with the user-assigned identity for cross-tenant customer-managed-keys server-side encryption on the storage account.
   */
  federatedIdentityClientId?: string;
  /**
   * Resource identifier of the UserAssigned identity to be associated with server-side encryption on the storage account.
   */
  userAssignedIdentity?: string;
}

export interface CustomDomain {
  /**
   * Gets or sets the custom domain name assigned to the storage account. Name is the CNAME source.
   */
  name: string;
  /**
   * Indicates whether indirect CName validation is enabled. Default value is false. This should only be set on updates.
   */
  useSubDomainName?: boolean;
}

export interface AzureFilesIdentityBasedAuthentication {
  /**
   * Required if directoryServiceOptions are AD, optional if they are AADKERB.
   */
  activeDirectoryProperties?: ActiveDirectoryProperties;
  /**
   * Default share permission for users using Kerberos authentication if RBAC role is not assigned.
   */
  defaultSharePermission?: string;
  /**
   * Indicates the directory service used. Note that this enum may be extended in the future.
   */
  directoryServiceOptions: string;
}

export interface ActiveDirectoryProperties {
  /**
   * Specifies the Active Directory account type for Azure Storage.
   */
  accountType?: string;
  /**
   * Specifies the security identifier (SID) for Azure Storage.
   */
  azureStorageSid?: string;
  /**
   * Specifies the domain GUID.
   */
  domainGuid: string;
  /**
   * Specifies the primary domain that the AD DNS server is authoritative for.
   */
  domainName: string;
  /**
   * Specifies the security identifier (SID).
   */
  domainSid?: string;
  /**
   * Specifies the Active Directory forest to get.
   */
  forestName?: string;
  /**
   * Specifies the NetBIOS domain name.
   */
  netBiosDomainName?: string;
  /**
   * Specifies the Active Directory SAMAccountName for Azure Storage.
   */
  samAccountName?: string;
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

export class StorageAccounts extends AzAPIBase {
  /**
       * Constructs a new StorageAccounts.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts@2023-05-01. The properties include:
     * `extendedLocation` - (Optional) Optional. Set the extended location of the resource. If not set, the storage account will be created in Azure main region. Otherwise it will be created in the specified extended location Defaults to `ExtendedLocation`.
     * `kind` - (Optional) Required. Indicates the type of storage account. Defaults to `string`.
     * `properties` - (Optional) The parameters used to create the storage account. Defaults to `StorageAccountPropertiesCreateParameters`.
     * `sku` - (Optional) Required. Gets or sets the SKU name. Defaults to `Sku`.
     *
     * ---
     *
     * The `Sku` block supports the following:

     * `name` - (Required) The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType. Defaults to `string`.
     *
     * ---
     *
     * The `StorageAccountPropertiesCreateParameters` block supports the following:

     * `accessTier` - (Optional) Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type. Defaults to `string`.
     * `allowBlobPublicAccess` - (Optional) Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property. Defaults to `boolean`.
     * `allowCrossTenantReplication` - (Optional) Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default. Defaults to `boolean`.
     * `allowSharedKeyAccess` - (Optional) Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true. Defaults to `boolean`.
     * `allowedCopyScope` - (Optional) Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. Defaults to `string`.
     * `azureFilesIdentityBasedAuthentication` - (Optional) Provides the identity based authentication settings for Azure Files. Defaults to `AzureFilesIdentityBasedAuthentication`.
     * `customDomain` - (Optional) User domain assigned to the storage account. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property. Defaults to `CustomDomain`.
     * `defaultToOAuthAuthentication` - (Optional) A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property. Defaults to `boolean`.
     * `dnsEndpointType` - (Optional) Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. Defaults to `string`.
     * `enableExtendedGroups` - (Optional) Enables extended group support with local users feature, if set to true Defaults to `boolean`.
     * `encryption` - (Optional) Encryption settings to be used for server-side encryption for the storage account. Defaults to `Encryption`.
     * `immutableStorageWithVersioning` - (Optional) The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the new containers in the account by default. Defaults to `ImmutableStorageAccount`.
     * `isHnsEnabled` - (Optional) Account HierarchicalNamespace enabled if sets to true. Defaults to `boolean`.
     * `isLocalUserEnabled` - (Optional) Enables local users feature, if set to true Defaults to `boolean`.
     * `isNfsV3Enabled` - (Optional) NFS 3.0 protocol support enabled if set to true. Defaults to `boolean`.
     * `isSftpEnabled` - (Optional) Enables Secure File Transfer Protocol, if set to true Defaults to `boolean`.
     * `keyPolicy` - (Optional) KeyPolicy assigned to the storage account. Defaults to `KeyPolicy`.
     * `largeFileSharesState` - (Optional) Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. Defaults to `string`.
     * `minimumTlsVersion` - (Optional) Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Defaults to `string`.
     * `networkAcls` - (Optional) Network rule set Defaults to `NetworkRuleSet`.
     * `publicNetworkAccess` - (Optional) Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. Defaults to `string`.
     * `routingPreference` - (Optional) Maintains information about the network routing choice opted by the user for data transfer Defaults to `RoutingPreference`.
     * `sasPolicy` - (Optional) SasPolicy assigned to the storage account. Defaults to `SasPolicy`.
     * `supportsHttpsTrafficOnly` - (Optional) Allows https traffic only to storage service if sets to true. The default value is true since API version 2019-04-01. Defaults to `boolean`.
     *
     * ---
     *
     * The `SasPolicy` block supports the following:

     * `expirationAction` - (Required) The SAS Expiration Action defines the action to be performed when sasPolicy.sasExpirationPeriod is violated. The 'Log' action can be used for audit purposes and the 'Block' action can be used to block and deny the usage of SAS tokens that do not adhere to the sas policy expiration period. Defaults to `string`.
     * `sasExpirationPeriod` - (Required) The SAS expiration period, DD.HH:MM:SS. Defaults to `string`.
     *
     * ---
     *
     * The `RoutingPreference` block supports the following:

     * `publishInternetEndpoints` - (Optional) A boolean flag which indicates whether internet routing storage endpoints are to be published Defaults to `boolean`.
     * `publishMicrosoftEndpoints` - (Optional) A boolean flag which indicates whether microsoft routing storage endpoints are to be published Defaults to `boolean`.
     * `routingChoice` - (Optional) Routing Choice defines the kind of network routing opted by the user. Defaults to `string`.
     *
     * ---
     *
     * The `NetworkRuleSet` block supports the following:

     * `bypass` - (Optional) Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics. Defaults to `string`.
     * `defaultAction` - (Required) Specifies the default action of allow or deny when no other rules match. Defaults to `string`.
     * `ipRules` - (Optional) Sets the IP ACL rules Defaults to `IpRule[]`.
     * `resourceAccessRules` - (Optional) Sets the resource access rules Defaults to `ResourceAccessRule[]`.
     * `virtualNetworkRules` - (Optional) Sets the virtual network rules Defaults to `VirtualNetworkRule[]`.
     *
     * ---
     *
     * The `VirtualNetworkRule[]` block supports the following:

     * `action` - (Optional) The action of virtual network rule. Defaults to `string`.
     * `id` - (Required) Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}. Defaults to `string`.
     * `state` - (Optional) Gets the state of virtual network rule. Defaults to `string`.
     *
     * ---
     *
     * The `ResourceAccessRule[]` block supports the following:

     * `resourceId` - (Optional) Resource Id Defaults to `string`.
     * `tenantId` - (Optional) Tenant Id Defaults to `string`.
     *
     * ---
     *
     * The `IPRule[]` block supports the following:

     * `action` - (Optional) The action of IP ACL rule. Defaults to `string`.
     * `value` - (Required) Specifies the IP or IP range in CIDR format. Only IPV4 address is allowed. Defaults to `string`.
     *
     * ---
     *
     * The `KeyPolicy` block supports the following:

     * `keyExpirationPeriodInDays` - (Required) The key expiration period in days. Defaults to `integer`.
     *
     * ---
     *
     * The `ImmutableStorageAccount` block supports the following:

     * `enabled` - (Optional) A boolean flag which enables account-level immutability. All the containers under such an account have object-level immutability enabled by default. Defaults to `boolean`.
     * `immutabilityPolicy` - (Optional) Specifies the default account-level immutability policy which is inherited and applied to objects that do not possess an explicit immutability policy at the object level. The object-level immutability policy has higher precedence than the container-level immutability policy, which has a higher precedence than the account-level immutability policy. Defaults to `AccountImmutabilityPolicyProperties`.
     *
     * ---
     *
     * The `AccountImmutabilityPolicyProperties` block supports the following:

     * `allowProtectedAppendWrites` - (Optional) This property can only be changed for disabled and unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. Defaults to `boolean`.
     * `immutabilityPeriodSinceCreationInDays` - (Optional) The immutability period for the blobs in the container since the policy creation, in days. Defaults to `integer`.
     * `state` - (Optional) The ImmutabilityPolicy state defines the mode of the policy. Disabled state disables the policy, Unlocked state allows increase and decrease of immutability retention time and also allows toggling allowProtectedAppendWrites property, Locked state only allows the increase of the immutability retention time. A policy can only be created in a Disabled or Unlocked state and can be toggled between the two states. Only a policy in an Unlocked state can transition to a Locked state which cannot be reverted. Defaults to `string`.
     *
     * ---
     *
     * The `Encryption` block supports the following:

     * `identity` - (Optional) The identity to be used with service-side encryption at rest. Defaults to `EncryptionIdentity`.
     * `keySource` - (Optional) The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Storage, Microsoft.Keyvault Defaults to `string`.
     * `keyvaultproperties` - (Optional) Properties provided by key vault. Defaults to `KeyVaultProperties`.
     * `requireInfrastructureEncryption` - (Optional) A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest. Defaults to `boolean`.
     * `services` - (Optional) List of services which support encryption. Defaults to `EncryptionServices`.
     *
     * ---
     *
     * The `EncryptionServices` block supports the following:

     * `blob` - (Optional) The encryption function of the blob storage service. Defaults to `EncryptionService`.
     * `file` - (Optional) The encryption function of the file storage service. Defaults to `EncryptionService`.
     * `queue` - (Optional) The encryption function of the queue storage service. Defaults to `EncryptionService`.
     * `table` - (Optional) The encryption function of the table storage service. Defaults to `EncryptionService`.
     *
     * ---
     *
     * The `EncryptionService` block supports the following:

     * `enabled` - (Optional) A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled. Defaults to `boolean`.
     * `keyType` - (Optional) Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used. Defaults to `string`.
     *
     * ---
     *
     * The `EncryptionService` block supports the following:

     * `enabled` - (Optional) A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled. Defaults to `boolean`.
     * `keyType` - (Optional) Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used. Defaults to `string`.
     *
     * ---
     *
     * The `EncryptionService` block supports the following:

     * `enabled` - (Optional) A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled. Defaults to `boolean`.
     * `keyType` - (Optional) Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used. Defaults to `string`.
     *
     * ---
     *
     * The `EncryptionService` block supports the following:

     * `enabled` - (Optional) A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled. Defaults to `boolean`.
     * `keyType` - (Optional) Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used. Defaults to `string`.
     *
     * ---
     *
     * The `KeyVaultProperties` block supports the following:

     * `keyname` - (Optional) The name of KeyVault key. Defaults to `string`.
     * `keyvaulturi` - (Optional) The Uri of KeyVault. Defaults to `string`.
     * `keyversion` - (Optional) The version of KeyVault key. Defaults to `string`.
     *
     * ---
     *
     * The `EncryptionIdentity` block supports the following:

     * `federatedIdentityClientId` - (Optional) ClientId of the multi-tenant application to be used in conjunction with the user-assigned identity for cross-tenant customer-managed-keys server-side encryption on the storage account. Defaults to `string`.
     * `userAssignedIdentity` - (Optional) Resource identifier of the UserAssigned identity to be associated with server-side encryption on the storage account. Defaults to `string`.
     *
     * ---
     *
     * The `CustomDomain` block supports the following:

     * `name` - (Required) Gets or sets the custom domain name assigned to the storage account. Name is the CNAME source. Defaults to `string`.
     * `useSubDomainName` - (Optional) Indicates whether indirect CName validation is enabled. Default value is false. This should only be set on updates. Defaults to `boolean`.
     *
     * ---
     *
     * The `AzureFilesIdentityBasedAuthentication` block supports the following:

     * `activeDirectoryProperties` - (Optional) Required if directoryServiceOptions are AD, optional if they are AADKERB. Defaults to `ActiveDirectoryProperties`.
     * `defaultSharePermission` - (Optional) Default share permission for users using Kerberos authentication if RBAC role is not assigned. Defaults to `string`.
     * `directoryServiceOptions` - (Required) Indicates the directory service used. Note that this enum may be extended in the future. Defaults to `string`.
     *
     * ---
     *
     * The `ActiveDirectoryProperties` block supports the following:

     * `accountType` - (Optional) Specifies the Active Directory account type for Azure Storage. Defaults to `string`.
     * `azureStorageSid` - (Optional) Specifies the security identifier (SID) for Azure Storage. Defaults to `string`.
     * `domainGuid` - (Required) Specifies the domain GUID. Defaults to `string`.
     * `domainName` - (Required) Specifies the primary domain that the AD DNS server is authoritative for. Defaults to `string`.
     * `domainSid` - (Optional) Specifies the security identifier (SID). Defaults to `string`.
     * `forestName` - (Optional) Specifies the Active Directory forest to get. Defaults to `string`.
     * `netBiosDomainName` - (Optional) Specifies the NetBIOS domain name. Defaults to `string`.
     * `samAccountName` - (Optional) Specifies the Active Directory SAMAccountName for Azure Storage. Defaults to `string`.
     *
     * ---
     *
     * The `ExtendedLocation` block supports the following:

     * `name` - (Optional) The name of the extended location. Defaults to `string`.
     * `type` - (Optional) The type of the extended location. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: StorageAccountsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsProps) {
    return {
      extendedLocation: props.extendedLocation,
      kind: props.kind,
      properties: props.properties,
      sku: props.sku,
    };
  }
  public addStorageAccountsLocalUsers(
    props: StorageAccountsLocalUsersProps,
  ): StorageAccountsLocalUsers {
    return new StorageAccountsLocalUsers(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsBlobServices(
    props: StorageAccountsBlobServicesProps,
  ): StorageAccountsBlobServices {
    return new StorageAccountsBlobServices(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsFileServices(
    props: StorageAccountsFileServicesProps,
  ): StorageAccountsFileServices {
    return new StorageAccountsFileServices(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsQueueServices(
    props: StorageAccountsQueueServicesProps,
  ): StorageAccountsQueueServices {
    return new StorageAccountsQueueServices(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsTableServices(
    props: StorageAccountsTableServicesProps,
  ): StorageAccountsTableServices {
    return new StorageAccountsTableServices(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsEncryptionScopes(
    props: StorageAccountsEncryptionScopesProps,
  ): StorageAccountsEncryptionScopes {
    return new StorageAccountsEncryptionScopes(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsInventoryPolicies(
    props: StorageAccountsInventoryPoliciesProps,
  ): StorageAccountsInventoryPolicies {
    return new StorageAccountsInventoryPolicies(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsManagementPolicies(
    props: StorageAccountsManagementPoliciesProps,
  ): StorageAccountsManagementPolicies {
    return new StorageAccountsManagementPolicies(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsStorageTaskAssignments(
    props: StorageAccountsStorageTaskAssignmentsProps,
  ): StorageAccountsStorageTaskAssignments {
    return new StorageAccountsStorageTaskAssignments(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsObjectReplicationPolicies(
    props: StorageAccountsObjectReplicationPoliciesProps,
  ): StorageAccountsObjectReplicationPolicies {
    return new StorageAccountsObjectReplicationPolicies(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addStorageAccountsPrivateEndpointConnections(
    props: StorageAccountsPrivateEndpointConnectionsProps,
  ): StorageAccountsPrivateEndpointConnections {
    return new StorageAccountsPrivateEndpointConnections(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}


import { Construct } from "constructs";
import {
  StorageAccountsBlobServicesContainers,
  StorageAccountsBlobServicesContainersProps,
} from "./storageaccountsblobservicescontainers";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsBlobServicesProps extends IAzAPIBaseProps {
  /**
   * The properties of a storage account’s Blob service.
   */
  properties?: BlobServicePropertiesProperties;
}

export interface BlobServicePropertiesProperties {
  /**
   * Deprecated in favor of isVersioningEnabled property.
   */
  automaticSnapshotPolicyEnabled?: boolean;
  /**
   * The blob service properties for change feed events.
   */
  changeFeed?: ChangeFeed;
  /**
   * The blob service properties for container soft delete.
   */
  containerDeleteRetentionPolicy?: DeleteRetentionPolicy;
  /**
   * Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service.
   */
  cors?: CorsRules;
  /**
   * DefaultServiceVersion indicates the default version to use for requests to the Blob service if an incoming request’s version is not specified. Possible values include version 2008-10-27 and all more recent versions.
   */
  defaultServiceVersion?: string;
  /**
   * The blob service properties for blob soft delete.
   */
  deleteRetentionPolicy?: DeleteRetentionPolicy;
  /**
   * Versioning is enabled if set to true.
   */
  isVersioningEnabled?: boolean;
  /**
   * The blob service property to configure last access time based tracking policy.
   */
  lastAccessTimeTrackingPolicy?: LastAccessTimeTrackingPolicy;
  /**
   * The blob service properties for blob restore policy.
   */
  restorePolicy?: RestorePolicyProperties;
}

export interface RestorePolicyProperties {
  /**
   * how long this blob can be restored. It should be great than zero and less than DeleteRetentionPolicy.days.
   */
  days?: number;
  /**
   * Blob restore is enabled if set to true.
   */
  enabled: boolean;
}

export interface LastAccessTimeTrackingPolicy {
  /**
   * An array of predefined supported blob types. Only blockBlob is the supported value. This field is currently read only
   */
  blobType?: string[];
  /**
   * When set to true last access time based tracking is enabled.
   */
  enable: boolean;
  /**
   * Name of the policy. The valid value is AccessTimeTracking. This field is currently read only
   */
  name?: string;
  /**
   * The field specifies blob object tracking granularity in days, typically how often the blob object should be tracked.This field is currently read only with value as 1
   */
  trackingGranularityInDays?: number;
}

export interface DeleteRetentionPolicy {
  /**
   * This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share.
   */
  allowPermanentDelete?: boolean;
  /**
   * Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365.
   */
  days?: number;
  /**
   * Indicates whether DeleteRetentionPolicy is enabled.
   */
  enabled?: boolean;
}

export interface CorsRules {
  /**
   * The List of CORS rules. You can include up to five CorsRule elements in the request.
   */
  corsRules?: CorsRule[];
}

export interface CorsRule {
  /**
   * Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request.
   */
  allowedHeaders: string[];
  /**
   * Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin.
   */
  allowedMethods: string[];
  /**
   * Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains
   */
  allowedOrigins: string[];
  /**
   * Required if CorsRule element is present. A list of response headers to expose to CORS clients.
   */
  exposedHeaders: string[];
  /**
   * Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response.
   */
  maxAgeInSeconds: number;
}

export interface DeleteRetentionPolicy {
  /**
   * This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share.
   */
  allowPermanentDelete?: boolean;
  /**
   * Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365.
   */
  days?: number;
  /**
   * Indicates whether DeleteRetentionPolicy is enabled.
   */
  enabled?: boolean;
}

export interface ChangeFeed {
  /**
   * Indicates whether change feed event logging is enabled for the Blob service.
   */
  enabled?: boolean;
  /**
   * Indicates the duration of changeFeed retention in days. Minimum value is 1 day and maximum value is 146000 days (400 years). A null value indicates an infinite retention of the change feed.
   */
  retentionInDays?: number;
}

export class StorageAccountsBlobServices extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsBlobServices.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/blobServices@2023-05-01. The properties include:
     * `properties` - (Optional) The properties of a storage account’s Blob service. Defaults to `BlobServicePropertiesProperties`.
     *
     * ---
     *
     * The `BlobServicePropertiesProperties` block supports the following:

     * `automaticSnapshotPolicyEnabled` - (Optional) Deprecated in favor of isVersioningEnabled property. Defaults to `boolean`.
     * `changeFeed` - (Optional) The blob service properties for change feed events. Defaults to `ChangeFeed`.
     * `containerDeleteRetentionPolicy` - (Optional) The blob service properties for container soft delete. Defaults to `DeleteRetentionPolicy`.
     * `cors` - (Optional) Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service. Defaults to `CorsRules`.
     * `defaultServiceVersion` - (Optional) DefaultServiceVersion indicates the default version to use for requests to the Blob service if an incoming request’s version is not specified. Possible values include version 2008-10-27 and all more recent versions. Defaults to `string`.
     * `deleteRetentionPolicy` - (Optional) The blob service properties for blob soft delete. Defaults to `DeleteRetentionPolicy`.
     * `isVersioningEnabled` - (Optional) Versioning is enabled if set to true. Defaults to `boolean`.
     * `lastAccessTimeTrackingPolicy` - (Optional) The blob service property to configure last access time based tracking policy. Defaults to `LastAccessTimeTrackingPolicy`.
     * `restorePolicy` - (Optional) The blob service properties for blob restore policy. Defaults to `RestorePolicyProperties`.
     *
     * ---
     *
     * The `RestorePolicyProperties` block supports the following:

     * `days` - (Optional) how long this blob can be restored. It should be great than zero and less than DeleteRetentionPolicy.days. Defaults to `integer`.
     * `enabled` - (Required) Blob restore is enabled if set to true. Defaults to `boolean`.
     *
     * ---
     *
     * The `LastAccessTimeTrackingPolicy` block supports the following:

     * `blobType` - (Optional) An array of predefined supported blob types. Only blockBlob is the supported value. This field is currently read only Defaults to `string[]`.
     * `enable` - (Required) When set to true last access time based tracking is enabled. Defaults to `boolean`.
     * `name` - (Optional) Name of the policy. The valid value is AccessTimeTracking. This field is currently read only Defaults to `string`.
     * `trackingGranularityInDays` - (Optional) The field specifies blob object tracking granularity in days, typically how often the blob object should be tracked.This field is currently read only with value as 1 Defaults to `integer`.
     *
     * ---
     *
     * The `DeleteRetentionPolicy` block supports the following:

     * `allowPermanentDelete` - (Optional) This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share. Defaults to `boolean`.
     * `days` - (Optional) Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365. Defaults to `integer`.
     * `enabled` - (Optional) Indicates whether DeleteRetentionPolicy is enabled. Defaults to `boolean`.
     *
     * ---
     *
     * The `CorsRules` block supports the following:

     * `corsRules` - (Optional) The List of CORS rules. You can include up to five CorsRule elements in the request.  Defaults to `CorsRule[]`.
     *
     * ---
     *
     * The `CorsRule[]` block supports the following:

     * `allowedHeaders` - (Required) Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request. Defaults to `string[]`.
     * `allowedMethods` - (Required) Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin. Defaults to `string[]`.
     * `allowedOrigins` - (Required) Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains Defaults to `string[]`.
     * `exposedHeaders` - (Required) Required if CorsRule element is present. A list of response headers to expose to CORS clients. Defaults to `string[]`.
     * `maxAgeInSeconds` - (Required) Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response. Defaults to `integer`.
     *
     * ---
     *
     * The `DeleteRetentionPolicy` block supports the following:

     * `allowPermanentDelete` - (Optional) This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share. Defaults to `boolean`.
     * `days` - (Optional) Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365. Defaults to `integer`.
     * `enabled` - (Optional) Indicates whether DeleteRetentionPolicy is enabled. Defaults to `boolean`.
     *
     * ---
     *
     * The `ChangeFeed` block supports the following:

     * `enabled` - (Optional) Indicates whether change feed event logging is enabled for the Blob service. Defaults to `boolean`.
     * `retentionInDays` - (Optional) Indicates the duration of changeFeed retention in days. Minimum value is 1 day and maximum value is 146000 days (400 years). A null value indicates an infinite retention of the change feed. Defaults to `integer`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsBlobServicesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/blobServices@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsBlobServicesProps) {
    return {
      properties: props.properties,
    };
  }
  public addStorageAccountsBlobServicesContainers(
    props: StorageAccountsBlobServicesContainersProps,
  ): StorageAccountsBlobServicesContainers {
    return new StorageAccountsBlobServicesContainers(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import {
  StorageAccountsBlobServicesContainersImmutabilityPolicies,
  StorageAccountsBlobServicesContainersImmutabilityPoliciesProps,
} from "./storageaccountsblobservicescontainersimmutabilitypolicies";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsBlobServicesContainersProps
  extends IAzAPIBaseProps {
  /**
   * Properties of the blob container.
   */
  properties?: ContainerProperties;
}

export interface ContainerProperties {
  /**
   * Default the container to use specified encryption scope for all writes.
   */
  defaultEncryptionScope?: string;
  /**
   * Block override of encryption scope from the container default.
   */
  denyEncryptionScopeOverride?: boolean;
  /**
   * Enable NFSv3 all squash on blob container.
   */
  enableNfsV3AllSquash?: boolean;
  /**
   * Enable NFSv3 root squash on blob container.
   */
  enableNfsV3RootSquash?: boolean;
  /**
   * The object level immutability property of the container. The property is immutable and can only be set to true at the container creation time. Existing containers must undergo a migration process.
   */
  immutableStorageWithVersioning?: ImmutableStorageWithVersioning;
  /**
   * A name-value pair to associate with the container as metadata.
   */
  metadata?: object | string | boolean | number;
  /**
   * Specifies whether data in the container may be accessed publicly and the level of access.
   */
  publicAccess?: string;
}

export interface ImmutableStorageWithVersioning {
  /**
   * This is an immutable property, when set to true it enables object level immutability at the container level.
   */
  enabled?: boolean;
}

export class StorageAccountsBlobServicesContainers extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsBlobServicesContainers.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01. The properties include:
     * `properties` - (Optional) Properties of the blob container. Defaults to `ContainerProperties`.
     *
     * ---
     *
     * The `ContainerProperties` block supports the following:

     * `defaultEncryptionScope` - (Optional) Default the container to use specified encryption scope for all writes. Defaults to `string`.
     * `denyEncryptionScopeOverride` - (Optional) Block override of encryption scope from the container default. Defaults to `boolean`.
     * `enableNfsV3AllSquash` - (Optional) Enable NFSv3 all squash on blob container. Defaults to `boolean`.
     * `enableNfsV3RootSquash` - (Optional) Enable NFSv3 root squash on blob container. Defaults to `boolean`.
     * `immutableStorageWithVersioning` - (Optional) The object level immutability property of the container. The property is immutable and can only be set to true at the container creation time. Existing containers must undergo a migration process. Defaults to `ImmutableStorageWithVersioning`.
     * `metadata` - (Optional) A name-value pair to associate with the container as metadata. Defaults to `object`.
     * `publicAccess` - (Optional) Specifies whether data in the container may be accessed publicly and the level of access. Defaults to `string`.
     *
     * ---
     *
     * The `ImmutableStorageWithVersioning` block supports the following:

     * `enabled` - (Optional) This is an immutable property, when set to true it enables object level immutability at the container level. Defaults to `boolean`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsBlobServicesContainersProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsBlobServicesContainersProps) {
    return {
      properties: props.properties,
    };
  }
  public addStorageAccountsBlobServicesContainersImmutabilityPolicies(
    props: StorageAccountsBlobServicesContainersImmutabilityPoliciesProps,
  ): StorageAccountsBlobServicesContainersImmutabilityPolicies {
    return new StorageAccountsBlobServicesContainersImmutabilityPolicies(
      this,
      props.name,
      {
        name: props.name,
        parentId: this.id,
        properties: props.properties,
      },
    );
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsBlobServicesContainersImmutabilityPoliciesProps
  extends IAzAPIBaseProps {
  /**
   * The properties of an ImmutabilityPolicy of a blob container.
   */
  properties?: ImmutabilityPolicyProperty;
}

export interface ImmutabilityPolicyProperty {
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API.
   */
  allowProtectedAppendWrites?: boolean;
  /**
   * This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive.
   */
  allowProtectedAppendWritesAll?: boolean;
  /**
   * The immutability period for the blobs in the container since the policy creation, in days.
   */
  immutabilityPeriodSinceCreationInDays?: number;
}

export class StorageAccountsBlobServicesContainersImmutabilityPolicies extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsBlobServicesContainersImmutabilityPolicies.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies@2023-05-01. The properties include:
     * `properties` - (Optional) The properties of an ImmutabilityPolicy of a blob container. Defaults to `ImmutabilityPolicyProperty`.
     *
     * ---
     *
     * The `ImmutabilityPolicyProperty` block supports the following:

     * `allowProtectedAppendWrites` - (Optional) This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. Defaults to `boolean`.
     * `allowProtectedAppendWritesAll` - (Optional) This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive. Defaults to `boolean`.
     * `immutabilityPeriodSinceCreationInDays` - (Optional) The immutability period for the blobs in the container since the policy creation, in days. Defaults to `integer`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsBlobServicesContainersImmutabilityPoliciesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies@2023-05-01";
  }
  protected getResourceBody(
    props: StorageAccountsBlobServicesContainersImmutabilityPoliciesProps,
  ) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsEncryptionScopesProps extends IAzAPIBaseProps {
  /**
   * Properties of the encryption scope.
   */
  properties?: EncryptionScopeProperties;
}

export interface EncryptionScopeProperties {
  /**
   * The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'.
   */
  keyVaultProperties?: EncryptionScopeKeyVaultProperties;
  /**
   * A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest.
   */
  requireInfrastructureEncryption?: boolean;
  /**
   * The provider for the encryption scope. Possible values (case-insensitive):  Microsoft.Storage, Microsoft.KeyVault.
   */
  source?: string;
  /**
   * The state of the encryption scope. Possible values (case-insensitive):  Enabled, Disabled.
   */
  state?: string;
}

export interface EncryptionScopeKeyVaultProperties {
  /**
   * The object identifier for a key vault key object. When applied, the encryption scope will use the key referenced by the identifier to enable customer-managed key support on this encryption scope.
   */
  keyUri?: string;
}

export class StorageAccountsEncryptionScopes extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsEncryptionScopes.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/encryptionScopes@2023-05-01. The properties include:
     * `properties` - (Optional) Properties of the encryption scope. Defaults to `EncryptionScopeProperties`.
     *
     * ---
     *
     * The `EncryptionScopeProperties` block supports the following:

     * `keyVaultProperties` - (Optional) The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'. Defaults to `EncryptionScopeKeyVaultProperties`.
     * `requireInfrastructureEncryption` - (Optional) A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest. Defaults to `boolean`.
     * `source` - (Optional) The provider for the encryption scope. Possible values (case-insensitive):  Microsoft.Storage, Microsoft.KeyVault. Defaults to `string`.
     * `state` - (Optional) The state of the encryption scope. Possible values (case-insensitive):  Enabled, Disabled. Defaults to `string`.
     *
     * ---
     *
     * The `EncryptionScopeKeyVaultProperties` block supports the following:

     * `keyUri` - (Optional) The object identifier for a key vault key object. When applied, the encryption scope will use the key referenced by the identifier to enable customer-managed key support on this encryption scope. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsEncryptionScopesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/encryptionScopes@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsEncryptionScopesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import {
  StorageAccountsFileServicesShares,
  StorageAccountsFileServicesSharesProps,
} from "./storageaccountsfileservicesshares";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsFileServicesProps extends IAzAPIBaseProps {
  /**
   * The properties of File services in storage account.
   */
  properties?: FileServicePropertiesProperties;
}

export interface FileServicePropertiesProperties {
  /**
   * Specifies CORS rules for the File service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the File service.
   */
  cors?: CorsRules;
  /**
   * Protocol settings for file service
   */
  protocolSettings?: ProtocolSettings;
  /**
   * The file service properties for share soft delete.
   */
  shareDeleteRetentionPolicy?: DeleteRetentionPolicy;
}

export interface DeleteRetentionPolicy {
  /**
   * This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share.
   */
  allowPermanentDelete?: boolean;
  /**
   * Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365.
   */
  days?: number;
  /**
   * Indicates whether DeleteRetentionPolicy is enabled.
   */
  enabled?: boolean;
}

export interface ProtocolSettings {
  /**
   * Setting for SMB protocol
   */
  smb?: SmbSetting;
}

export interface SmbSetting {
  /**
   * SMB authentication methods supported by server. Valid values are NTLMv2, Kerberos. Should be passed as a string with delimiter ';'.
   */
  authenticationMethods?: string;
  /**
   * SMB channel encryption supported by server. Valid values are AES-128-CCM, AES-128-GCM, AES-256-GCM. Should be passed as a string with delimiter ';'.
   */
  channelEncryption?: string;
  /**
   * Kerberos ticket encryption supported by server. Valid values are RC4-HMAC, AES-256. Should be passed as a string with delimiter ';'
   */
  kerberosTicketEncryption?: string;
  /**
   * Multichannel setting. Applies to Premium FileStorage only.
   */
  multichannel?: Multichannel;
  /**
   * SMB protocol versions supported by server. Valid values are SMB2.1, SMB3.0, SMB3.1.1. Should be passed as a string with delimiter ';'.
   */
  versions?: string;
}

export interface Multichannel {
  /**
   * Indicates whether multichannel is enabled
   */
  enabled?: boolean;
}

export interface CorsRules {
  /**
   * The List of CORS rules. You can include up to five CorsRule elements in the request.
   */
  corsRules?: CorsRule[];
}

export interface CorsRule {
  /**
   * Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request.
   */
  allowedHeaders: string[];
  /**
   * Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin.
   */
  allowedMethods: string[];
  /**
   * Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains
   */
  allowedOrigins: string[];
  /**
   * Required if CorsRule element is present. A list of response headers to expose to CORS clients.
   */
  exposedHeaders: string[];
  /**
   * Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response.
   */
  maxAgeInSeconds: number;
}

export class StorageAccountsFileServices extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsFileServices.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/fileServices@2023-05-01. The properties include:
     * `properties` - (Optional) The properties of File services in storage account. Defaults to `FileServicePropertiesProperties`.
     *
     * ---
     *
     * The `FileServicePropertiesProperties` block supports the following:

     * `cors` - (Optional) Specifies CORS rules for the File service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the File service. Defaults to `CorsRules`.
     * `protocolSettings` - (Optional) Protocol settings for file service Defaults to `ProtocolSettings`.
     * `shareDeleteRetentionPolicy` - (Optional) The file service properties for share soft delete. Defaults to `DeleteRetentionPolicy`.
     *
     * ---
     *
     * The `DeleteRetentionPolicy` block supports the following:

     * `allowPermanentDelete` - (Optional) This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share. Defaults to `boolean`.
     * `days` - (Optional) Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365. Defaults to `integer`.
     * `enabled` - (Optional) Indicates whether DeleteRetentionPolicy is enabled. Defaults to `boolean`.
     *
     * ---
     *
     * The `ProtocolSettings` block supports the following:

     * `smb` - (Optional) Setting for SMB protocol Defaults to `SmbSetting`.
     *
     * ---
     *
     * The `SmbSetting` block supports the following:

     * `authenticationMethods` - (Optional) SMB authentication methods supported by server. Valid values are NTLMv2, Kerberos. Should be passed as a string with delimiter ';'. Defaults to `string`.
     * `channelEncryption` - (Optional) SMB channel encryption supported by server. Valid values are AES-128-CCM, AES-128-GCM, AES-256-GCM. Should be passed as a string with delimiter ';'. Defaults to `string`.
     * `kerberosTicketEncryption` - (Optional) Kerberos ticket encryption supported by server. Valid values are RC4-HMAC, AES-256. Should be passed as a string with delimiter ';' Defaults to `string`.
     * `multichannel` - (Optional) Multichannel setting. Applies to Premium FileStorage only. Defaults to `Multichannel`.
     * `versions` - (Optional) SMB protocol versions supported by server. Valid values are SMB2.1, SMB3.0, SMB3.1.1. Should be passed as a string with delimiter ';'. Defaults to `string`.
     *
     * ---
     *
     * The `Multichannel` block supports the following:

     * `enabled` - (Optional) Indicates whether multichannel is enabled Defaults to `boolean`.
     *
     * ---
     *
     * The `CorsRules` block supports the following:

     * `corsRules` - (Optional) The List of CORS rules. You can include up to five CorsRule elements in the request.  Defaults to `CorsRule[]`.
     *
     * ---
     *
     * The `CorsRule[]` block supports the following:

     * `allowedHeaders` - (Required) Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request. Defaults to `string[]`.
     * `allowedMethods` - (Required) Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin. Defaults to `string[]`.
     * `allowedOrigins` - (Required) Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains Defaults to `string[]`.
     * `exposedHeaders` - (Required) Required if CorsRule element is present. A list of response headers to expose to CORS clients. Defaults to `string[]`.
     * `maxAgeInSeconds` - (Required) Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response. Defaults to `integer`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsFileServicesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/fileServices@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsFileServicesProps) {
    return {
      properties: props.properties,
    };
  }
  public addStorageAccountsFileServicesShares(
    props: StorageAccountsFileServicesSharesProps,
  ): StorageAccountsFileServicesShares {
    return new StorageAccountsFileServicesShares(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsFileServicesSharesProps
  extends IAzAPIBaseProps {
  /**
   * Properties of the file share.
   */
  properties?: FileShareProperties;
}

export interface FileShareProperties {
  /**
   * Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium.
   */
  accessTier?: string;
  /**
   * The authentication protocol that is used for the file share. Can only be specified when creating a share.
   */
  enabledProtocols?: string;
  /**
   * A name-value pair to associate with the share as metadata.
   */
  metadata?: object | string | boolean | number;
  /**
   * The property is for NFS share only. The default is NoRootSquash.
   */
  rootSquash?: string;
  /**
   * The maximum size of the share, in gigabytes. Must be greater than 0, and less than or equal to 5TB (5120). For Large File Shares, the maximum size is 102400.
   */
  shareQuota?: number;
  /**
   * List of stored access policies specified on the share.
   */
  signedIdentifiers?: SignedIdentifier[];
}

export interface SignedIdentifier {
  /**
   * Access policy
   */
  accessPolicy?: AccessPolicy;
  /**
   * An unique identifier of the stored access policy.
   */
  id?: string;
}

export interface AccessPolicy {
  /**
   * Expiry time of the access policy
   */
  expiryTime?: string;
  /**
   * List of abbreviated permissions.
   */
  permission?: string;
  /**
   * Start time of the access policy
   */
  startTime?: string;
}

export class StorageAccountsFileServicesShares extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsFileServicesShares.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/fileServices/shares@2023-05-01. The properties include:
     * `properties` - (Optional) Properties of the file share. Defaults to `FileShareProperties`.
     *
     * ---
     *
     * The `FileShareProperties` block supports the following:

     * `accessTier` - (Optional) Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium. Defaults to `string`.
     * `enabledProtocols` - (Optional) The authentication protocol that is used for the file share. Can only be specified when creating a share. Defaults to `string`.
     * `metadata` - (Optional) A name-value pair to associate with the share as metadata. Defaults to `object`.
     * `rootSquash` - (Optional) The property is for NFS share only. The default is NoRootSquash. Defaults to `string`.
     * `shareQuota` - (Optional) The maximum size of the share, in gigabytes. Must be greater than 0, and less than or equal to 5TB (5120). For Large File Shares, the maximum size is 102400. Defaults to `integer`.
     * `signedIdentifiers` - (Optional) List of stored access policies specified on the share. Defaults to `SignedIdentifier[]`.
     *
     * ---
     *
     * The `SignedIdentifier[]` block supports the following:

     * `accessPolicy` - (Optional) Access policy Defaults to `AccessPolicy`.
     * `id` - (Optional) An unique identifier of the stored access policy. Defaults to `string`.
     *
     * ---
     *
     * The `AccessPolicy` block supports the following:

     * `expiryTime` - (Optional) Expiry time of the access policy Defaults to `string`.
     * `permission` - (Optional) List of abbreviated permissions. Defaults to `string`.
     * `startTime` - (Optional) Start time of the access policy Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsFileServicesSharesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/fileServices/shares@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsFileServicesSharesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsInventoryPoliciesProps extends IAzAPIBaseProps {
  /**
   * Returns the storage account blob inventory policy rules.
   */
  properties?: BlobInventoryPolicyProperties;
}

export interface BlobInventoryPolicyProperties {
  /**
   * The storage account blob inventory policy object. It is composed of policy rules.
   */
  policy: BlobInventoryPolicySchema;
}

export interface BlobInventoryPolicySchema {
  /**
   * Policy is enabled if set to true.
   */
  enabled: boolean;
  /**
   * The storage account blob inventory policy rules. The rule is applied when it is enabled.
   */
  rules: BlobInventoryPolicyRule[];
  /**
   * The valid value is Inventory
   */
  type: string;
}

export interface BlobInventoryPolicyRule {
  /**
   * An object that defines the blob inventory policy rule.
   */
  definition: BlobInventoryPolicyDefinition;
  /**
   * Container name where blob inventory files are stored. Must be pre-created.
   */
  destination: string;
  /**
   * Rule is enabled when set to true.
   */
  enabled: boolean;
  /**
   * A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy.
   */
  name: string;
}

export interface BlobInventoryPolicyDefinition {
  /**
   * An object that defines the filter set.
   */
  filters?: BlobInventoryPolicyFilter;
  /**
   * This is a required field, it specifies the format for the inventory files.
   */
  format: string;
  /**
   * This is a required field. This field specifies the scope of the inventory created either at the blob or container level.
   */
  objectType: string;
  /**
   * This is a required field. This field is used to schedule an inventory formation.
   */
  schedule: string;
  /**
   * This is a required field. This field specifies the fields and properties of the object to be included in the inventory. The Schema field value 'Name' is always required. The valid values for this field for the 'Blob' definition.objectType include 'Name, Creation-Time, Last-Modified, Content-Length, Content-MD5, BlobType, AccessTier, AccessTierChangeTime, AccessTierInferred, Tags, Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, Snapshot, VersionId, IsCurrentVersion, Metadata, LastAccessTime, Tags, Etag, ContentType, ContentEncoding, ContentLanguage, ContentCRC64, CacheControl, ContentDisposition, LeaseStatus, LeaseState, LeaseDuration, ServerEncrypted, Deleted, DeletionId, DeletedTime, RemainingRetentionDays, ImmutabilityPolicyUntilDate, ImmutabilityPolicyMode, LegalHold, CopyId, CopyStatus, CopySource, CopyProgress, CopyCompletionTime, CopyStatusDescription, CustomerProvidedKeySha256, RehydratePriority, ArchiveStatus, XmsBlobSequenceNumber, EncryptionScope, IncrementalCopy, TagCount'. For Blob object type schema field value 'DeletedTime' is applicable only for Hns enabled accounts. The valid values for 'Container' definition.objectType include 'Name, Last-Modified, Metadata, LeaseStatus, LeaseState, LeaseDuration, PublicAccess, HasImmutabilityPolicy, HasLegalHold, Etag, DefaultEncryptionScope, DenyEncryptionScopeOverride, ImmutableStorageWithVersioningEnabled, Deleted, Version, DeletedTime, RemainingRetentionDays'. Schema field values 'Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, DeletionId' are valid only for Hns enabled accounts.Schema field values 'Tags, TagCount' are only valid for Non-Hns accounts.
   */
  schemaFields: string[];
}

export interface BlobInventoryPolicyFilter {
  /**
   * An array of predefined enum values. Valid values include blockBlob, appendBlob, pageBlob. Hns accounts does not support pageBlobs. This field is required when definition.objectType property is set to 'Blob'.
   */
  blobTypes?: string[];
  /**
   * This property is used to filter objects based on the object creation time
   */
  creationTime?: BlobInventoryCreationTime;
  /**
   * An array of strings with maximum 10 blob prefixes to be excluded from the inventory.
   */
  excludePrefix?: string[];
  /**
   * Includes blob versions in blob inventory when value is set to true. The definition.schemaFields values 'VersionId and IsCurrentVersion' are required if this property is set to true, else they must be excluded.
   */
  includeBlobVersions?: boolean;
  /**
   * For 'Container' definition.objectType the definition.schemaFields must include 'Deleted, Version, DeletedTime and RemainingRetentionDays'. For 'Blob' definition.objectType and HNS enabled storage accounts the definition.schemaFields must include 'DeletionId, Deleted, DeletedTime and RemainingRetentionDays' and for Hns disabled accounts the definition.schemaFields must include 'Deleted and RemainingRetentionDays', else it must be excluded.
   */
  includeDeleted?: boolean;
  /**
   * Includes blob snapshots in blob inventory when value is set to true. The definition.schemaFields value 'Snapshot' is required if this property is set to true, else it must be excluded.
   */
  includeSnapshots?: boolean;
  /**
   * An array of strings with maximum 10 blob prefixes to be included in the inventory.
   */
  prefixMatch?: string[];
}

export interface BlobInventoryCreationTime {
  /**
   * When set the policy filters the objects that are created in the last N days. Where N is an integer value between 1 to 36500.
   */
  lastNDays?: number;
}

export class StorageAccountsInventoryPolicies extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsInventoryPolicies.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/inventoryPolicies@2023-05-01. The properties include:
     * `properties` - (Optional) Returns the storage account blob inventory policy rules. Defaults to `BlobInventoryPolicyProperties`.
     *
     * ---
     *
     * The `BlobInventoryPolicyProperties` block supports the following:

     * `policy` - (Required) The storage account blob inventory policy object. It is composed of policy rules. Defaults to `BlobInventoryPolicySchema`.
     *
     * ---
     *
     * The `BlobInventoryPolicySchema` block supports the following:

     * `enabled` - (Required) Policy is enabled if set to true. Defaults to `boolean`.
     * `rules` - (Required) The storage account blob inventory policy rules. The rule is applied when it is enabled. Defaults to `BlobInventoryPolicyRule[]`.
     * `type` - (Required) The valid value is Inventory Defaults to `string`.
     *
     * ---
     *
     * The `BlobInventoryPolicyRule[]` block supports the following:

     * `definition` - (Required) An object that defines the blob inventory policy rule. Defaults to `BlobInventoryPolicyDefinition`.
     * `destination` - (Required) Container name where blob inventory files are stored. Must be pre-created. Defaults to `string`.
     * `enabled` - (Required) Rule is enabled when set to true. Defaults to `boolean`.
     * `name` - (Required) A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy. Defaults to `string`.
     *
     * ---
     *
     * The `BlobInventoryPolicyDefinition` block supports the following:

     * `filters` - (Optional) An object that defines the filter set. Defaults to `BlobInventoryPolicyFilter`.
     * `format` - (Required) This is a required field, it specifies the format for the inventory files. Defaults to `string`.
     * `objectType` - (Required) This is a required field. This field specifies the scope of the inventory created either at the blob or container level. Defaults to `string`.
     * `schedule` - (Required) This is a required field. This field is used to schedule an inventory formation. Defaults to `string`.
     * `schemaFields` - (Required) This is a required field. This field specifies the fields and properties of the object to be included in the inventory. The Schema field value 'Name' is always required. The valid values for this field for the 'Blob' definition.objectType include 'Name, Creation-Time, Last-Modified, Content-Length, Content-MD5, BlobType, AccessTier, AccessTierChangeTime, AccessTierInferred, Tags, Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, Snapshot, VersionId, IsCurrentVersion, Metadata, LastAccessTime, Tags, Etag, ContentType, ContentEncoding, ContentLanguage, ContentCRC64, CacheControl, ContentDisposition, LeaseStatus, LeaseState, LeaseDuration, ServerEncrypted, Deleted, DeletionId, DeletedTime, RemainingRetentionDays, ImmutabilityPolicyUntilDate, ImmutabilityPolicyMode, LegalHold, CopyId, CopyStatus, CopySource, CopyProgress, CopyCompletionTime, CopyStatusDescription, CustomerProvidedKeySha256, RehydratePriority, ArchiveStatus, XmsBlobSequenceNumber, EncryptionScope, IncrementalCopy, TagCount'. For Blob object type schema field value 'DeletedTime' is applicable only for Hns enabled accounts. The valid values for 'Container' definition.objectType include 'Name, Last-Modified, Metadata, LeaseStatus, LeaseState, LeaseDuration, PublicAccess, HasImmutabilityPolicy, HasLegalHold, Etag, DefaultEncryptionScope, DenyEncryptionScopeOverride, ImmutableStorageWithVersioningEnabled, Deleted, Version, DeletedTime, RemainingRetentionDays'. Schema field values 'Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, DeletionId' are valid only for Hns enabled accounts.Schema field values 'Tags, TagCount' are only valid for Non-Hns accounts. Defaults to `string[]`.
     *
     * ---
     *
     * The `BlobInventoryPolicyFilter` block supports the following:

     * `blobTypes` - (Optional) An array of predefined enum values. Valid values include blockBlob, appendBlob, pageBlob. Hns accounts does not support pageBlobs. This field is required when definition.objectType property is set to 'Blob'. Defaults to `string[]`.
     * `creationTime` - (Optional) This property is used to filter objects based on the object creation time Defaults to `BlobInventoryCreationTime`.
     * `excludePrefix` - (Optional) An array of strings with maximum 10 blob prefixes to be excluded from the inventory. Defaults to `string[]`.
     * `includeBlobVersions` - (Optional) Includes blob versions in blob inventory when value is set to true. The definition.schemaFields values 'VersionId and IsCurrentVersion' are required if this property is set to true, else they must be excluded. Defaults to `boolean`.
     * `includeDeleted` - (Optional) For 'Container' definition.objectType the definition.schemaFields must include 'Deleted, Version, DeletedTime and RemainingRetentionDays'. For 'Blob' definition.objectType and HNS enabled storage accounts the definition.schemaFields must include 'DeletionId, Deleted, DeletedTime and RemainingRetentionDays' and for Hns disabled accounts the definition.schemaFields must include 'Deleted and RemainingRetentionDays', else it must be excluded. Defaults to `boolean`.
     * `includeSnapshots` - (Optional) Includes blob snapshots in blob inventory when value is set to true. The definition.schemaFields value 'Snapshot' is required if this property is set to true, else it must be excluded. Defaults to `boolean`.
     * `prefixMatch` - (Optional) An array of strings with maximum 10 blob prefixes to be included in the inventory. Defaults to `string[]`.
     *
     * ---
     *
     * The `BlobInventoryCreationTime` block supports the following:

     * `lastNDays` - (Optional) When set the policy filters the objects that are created in the last N days. Where N is an integer value between 1 to 36500. Defaults to `integer`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsInventoryPoliciesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/inventoryPolicies@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsInventoryPoliciesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsPrivateEndpointConnectionsProps
  extends IAzAPIBaseProps {
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionProperties;
}

export interface PrivateEndpointConnectionProperties {
  /**
   * The resource of private end point.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export interface PrivateLinkServiceConnectionState {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionRequired?: string;
  /**
   * The reason for approval/rejection of the connection.
   */
  description?: string;
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   */
  status?: string;
}

export interface PrivateEndpoint {}

export class StorageAccountsPrivateEndpointConnections extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsPrivateEndpointConnections.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/privateEndpointConnections@2023-05-01. The properties include:
     * `properties` - (Optional) Resource properties. Defaults to `PrivateEndpointConnectionProperties`.
     *
     * ---
     *
     * The `PrivateEndpointConnectionProperties` block supports the following:

     * `privateEndpoint` - (Optional) The resource of private end point. Defaults to `PrivateEndpoint`.
     * `privateLinkServiceConnectionState` - (Required) A collection of information about the state of the connection between service consumer and provider. Defaults to `PrivateLinkServiceConnectionState`.
     *
     * ---
     *
     * The `PrivateLinkServiceConnectionState` block supports the following:

     * `actionRequired` - (Optional) A message indicating if changes on the service provider require any updates on the consumer. Defaults to `string`.
     * `description` - (Optional) The reason for approval/rejection of the connection. Defaults to `string`.
     * `status` - (Optional) Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. Defaults to `string`.
     *
     * ---
     *
     * The `PrivateEndpoint` block supports the following:

     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsPrivateEndpointConnectionsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/privateEndpointConnections@2023-05-01";
  }
  protected getResourceBody(
    props: StorageAccountsPrivateEndpointConnectionsProps,
  ) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsObjectReplicationPoliciesProps
  extends IAzAPIBaseProps {
  /**
   * Returns the Storage Account Object Replication Policy.
   */
  properties?: ObjectReplicationPolicyProperties;
}

export interface ObjectReplicationPolicyProperties {
  /**
   * Required. Destination account name. It should be full resource id if allowCrossTenantReplication set to false.
   */
  destinationAccount: string;
  /**
   * The storage account object replication rules.
   */
  rules?: ObjectReplicationPolicyRule[];
  /**
   * Required. Source account name. It should be full resource id if allowCrossTenantReplication set to false.
   */
  sourceAccount: string;
}

export interface ObjectReplicationPolicyRule {
  /**
   * Required. Destination container name.
   */
  destinationContainer: string;
  /**
   * Optional. An object that defines the filter set.
   */
  filters?: ObjectReplicationPolicyFilter;
  /**
   * Rule Id is auto-generated for each new rule on destination account. It is required for put policy on source account.
   */
  ruleId?: string;
  /**
   * Required. Source container name.
   */
  sourceContainer: string;
}

export interface ObjectReplicationPolicyFilter {
  /**
   * Blobs created after the time will be replicated to the destination. It must be in datetime format 'yyyy-MM-ddTHH:mm:ssZ'. Example: 2020-02-19T16:05:00Z
   */
  minCreationTime?: string;
  /**
   * Optional. Filters the results to replicate only blobs whose names begin with the specified prefix.
   */
  prefixMatch?: string[];
}

export class StorageAccountsObjectReplicationPolicies extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsObjectReplicationPolicies.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/objectReplicationPolicies@2023-05-01. The properties include:
     * `properties` - (Optional) Returns the Storage Account Object Replication Policy. Defaults to `ObjectReplicationPolicyProperties`.
     *
     * ---
     *
     * The `ObjectReplicationPolicyProperties` block supports the following:

     * `destinationAccount` - (Required) Required. Destination account name. It should be full resource id if allowCrossTenantReplication set to false. Defaults to `string`.
     * `rules` - (Optional) The storage account object replication rules. Defaults to `ObjectReplicationPolicyRule[]`.
     * `sourceAccount` - (Required) Required. Source account name. It should be full resource id if allowCrossTenantReplication set to false. Defaults to `string`.
     *
     * ---
     *
     * The `ObjectReplicationPolicyRule[]` block supports the following:

     * `destinationContainer` - (Required) Required. Destination container name. Defaults to `string`.
     * `filters` - (Optional) Optional. An object that defines the filter set. Defaults to `ObjectReplicationPolicyFilter`.
     * `ruleId` - (Optional) Rule Id is auto-generated for each new rule on destination account. It is required for put policy on source account. Defaults to `string`.
     * `sourceContainer` - (Required) Required. Source container name. Defaults to `string`.
     *
     * ---
     *
     * The `ObjectReplicationPolicyFilter` block supports the following:

     * `minCreationTime` - (Optional) Blobs created after the time will be replicated to the destination. It must be in datetime format 'yyyy-MM-ddTHH:mm:ssZ'. Example: 2020-02-19T16:05:00Z Defaults to `string`.
     * `prefixMatch` - (Optional) Optional. Filters the results to replicate only blobs whose names begin with the specified prefix. Defaults to `string[]`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsObjectReplicationPoliciesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/objectReplicationPolicies@2023-05-01";
  }
  protected getResourceBody(
    props: StorageAccountsObjectReplicationPoliciesProps,
  ) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import {
  StorageAccountsQueueServicesQueues,
  StorageAccountsQueueServicesQueuesProps,
} from "./storageaccountsqueueservicesqueues";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsQueueServicesProps extends IAzAPIBaseProps {
  /**
   * The properties of a storage account’s Queue service.
   */
  properties?: QueueServicePropertiesProperties;
}

export interface QueueServicePropertiesProperties {
  /**
   * Specifies CORS rules for the Queue service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Queue service.
   */
  cors?: CorsRules;
}

export interface CorsRules {
  /**
   * The List of CORS rules. You can include up to five CorsRule elements in the request.
   */
  corsRules?: CorsRule[];
}

export interface CorsRule {
  /**
   * Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request.
   */
  allowedHeaders: string[];
  /**
   * Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin.
   */
  allowedMethods: string[];
  /**
   * Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains
   */
  allowedOrigins: string[];
  /**
   * Required if CorsRule element is present. A list of response headers to expose to CORS clients.
   */
  exposedHeaders: string[];
  /**
   * Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response.
   */
  maxAgeInSeconds: number;
}

export class StorageAccountsQueueServices extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsQueueServices.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/queueServices@2023-05-01. The properties include:
     * `properties` - (Optional) The properties of a storage account’s Queue service. Defaults to `QueueServicePropertiesProperties`.
     *
     * ---
     *
     * The `QueueServicePropertiesProperties` block supports the following:

     * `cors` - (Optional) Specifies CORS rules for the Queue service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Queue service. Defaults to `CorsRules`.
     *
     * ---
     *
     * The `CorsRules` block supports the following:

     * `corsRules` - (Optional) The List of CORS rules. You can include up to five CorsRule elements in the request.  Defaults to `CorsRule[]`.
     *
     * ---
     *
     * The `CorsRule[]` block supports the following:

     * `allowedHeaders` - (Required) Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request. Defaults to `string[]`.
     * `allowedMethods` - (Required) Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin. Defaults to `string[]`.
     * `allowedOrigins` - (Required) Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains Defaults to `string[]`.
     * `exposedHeaders` - (Required) Required if CorsRule element is present. A list of response headers to expose to CORS clients. Defaults to `string[]`.
     * `maxAgeInSeconds` - (Required) Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response. Defaults to `integer`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsQueueServicesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/queueServices@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsQueueServicesProps) {
    return {
      properties: props.properties,
    };
  }
  public addStorageAccountsQueueServicesQueues(
    props: StorageAccountsQueueServicesQueuesProps,
  ): StorageAccountsQueueServicesQueues {
    return new StorageAccountsQueueServicesQueues(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsQueueServicesQueuesProps
  extends IAzAPIBaseProps {
  /**
   * Queue resource properties.
   */
  properties?: QueueProperties;
}

export interface QueueProperties {
  /**
   * A name-value pair that represents queue metadata.
   */
  metadata?: object | string | boolean | number;
}

export class StorageAccountsQueueServicesQueues extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsQueueServicesQueues.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/queueServices/queues@2023-05-01. The properties include:
     * `properties` - (Optional) Queue resource properties. Defaults to `QueueProperties`.
     *
     * ---
     *
     * The `QueueProperties` block supports the following:

     * `metadata` - (Optional) A name-value pair that represents queue metadata. Defaults to `object`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsQueueServicesQueuesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/queueServices/queues@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsQueueServicesQueuesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsStorageTaskAssignmentsProps
  extends IAzAPIBaseProps {
  /**
   * Properties of the storage task assignment.
   */
  properties?: StorageTaskAssignmentProperties;
}

export interface StorageTaskAssignmentProperties {
  /**
   * Text that describes the purpose of the storage task assignment
   */
  description: string;
  /**
   * Whether the storage task assignment is enabled or not
   */
  enabled: boolean;
  /**
   * The storage task assignment execution context
   */
  executionContext: StorageTaskAssignmentExecutionContext;
  /**
   * The storage task assignment report
   */
  report: StorageTaskAssignmentReport;
  /**
   * Run status of storage task assignment
   */
  runStatus?: StorageTaskReportProperties;
  /**
   * Id of the corresponding storage task
   */
  taskId: string;
}

export interface StorageTaskReportProperties {}

export interface StorageTaskAssignmentReport {
  /**
   * The container prefix for the location of storage task assignment report
   */
  prefix: string;
}

export interface StorageTaskAssignmentExecutionContext {
  /**
   * Execution target of the storage task assignment
   */
  target?: ExecutionTarget;
  /**
   * Execution trigger of the storage task assignment
   */
  trigger: ExecutionTrigger;
}

export interface ExecutionTrigger {
  /**
   * The trigger parameters of the storage task assignment execution
   */
  parameters?: TriggerParameters;
  /**
   * The trigger type of the storage task assignment execution
   */
  type: string;
}

export interface TriggerParameters {
  /**
   * When to end task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  endBy?: string;
  /**
   * Run interval of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  interval?: number;
  /**
   * Run interval unit of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  intervalUnit?: string;
  /**
   * When to start task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce'
   */
  startFrom?: string;
  /**
   * When to start task execution. This is an optional field when ExecutionTrigger.properties.type is 'RunOnce'; this property should not be present when ExecutionTrigger.properties.type is 'OnSchedule'
   */
  startOn?: string;
}

export interface ExecutionTarget {
  /**
   * List of object prefixes to be excluded from task execution. If there is a conflict between include and exclude prefixes, the exclude prefix will be the determining factor
   */
  excludePrefix?: string[];
  /**
   * Required list of object prefixes to be included for task execution
   */
  prefix?: string[];
}

export class StorageAccountsStorageTaskAssignments extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsStorageTaskAssignments.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/storageTaskAssignments@2023-05-01. The properties include:
     * `properties` - (Optional) Properties of the storage task assignment. Defaults to `StorageTaskAssignmentProperties`.
     *
     * ---
     *
     * The `StorageTaskAssignmentProperties` block supports the following:

     * `description` - (Required) Text that describes the purpose of the storage task assignment Defaults to `string`.
     * `enabled` - (Required) Whether the storage task assignment is enabled or not Defaults to `boolean`.
     * `executionContext` - (Required) The storage task assignment execution context Defaults to `StorageTaskAssignmentExecutionContext`.
     * `report` - (Required) The storage task assignment report Defaults to `StorageTaskAssignmentReport`.
     * `runStatus` - (Optional) Run status of storage task assignment Defaults to `StorageTaskReportProperties`.
     * `taskId` - (Required) Id of the corresponding storage task Defaults to `string`.
     *
     * ---
     *
     * The `StorageTaskReportProperties` block supports the following:

     *
     * ---
     *
     * The `StorageTaskAssignmentReport` block supports the following:

     * `prefix` - (Required) The container prefix for the location of storage task assignment report Defaults to `string`.
     *
     * ---
     *
     * The `StorageTaskAssignmentExecutionContext` block supports the following:

     * `target` - (Optional) Execution target of the storage task assignment Defaults to `ExecutionTarget`.
     * `trigger` - (Required) Execution trigger of the storage task assignment Defaults to `ExecutionTrigger`.
     *
     * ---
     *
     * The `ExecutionTrigger` block supports the following:

     * `parameters` - (Required) The trigger parameters of the storage task assignment execution Defaults to `TriggerParameters`.
     * `type` - (Required) The trigger type of the storage task assignment execution Defaults to `string`.
     *
     * ---
     *
     * The `TriggerParameters` block supports the following:

     * `endBy` - (Optional) When to end task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' Defaults to `string`.
     * `interval` - (Optional) Run interval of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' Defaults to `integer`.
     * `intervalUnit` - (Optional) Run interval unit of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' Defaults to `string`.
     * `startFrom` - (Optional) When to start task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' Defaults to `string`.
     * `startOn` - (Optional) When to start task execution. This is an optional field when ExecutionTrigger.properties.type is 'RunOnce'; this property should not be present when ExecutionTrigger.properties.type is 'OnSchedule' Defaults to `string`.
     *
     * ---
     *
     * The `ExecutionTarget` block supports the following:

     * `excludePrefix` - (Optional) List of object prefixes to be excluded from task execution. If there is a conflict between include and exclude prefixes, the exclude prefix will be the determining factor Defaults to `string[]`.
     * `prefix` - (Optional) Required list of object prefixes to be included for task execution Defaults to `string[]`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsStorageTaskAssignmentsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/storageTaskAssignments@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsStorageTaskAssignmentsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import {
  StorageAccountsTableServicesTables,
  StorageAccountsTableServicesTablesProps,
} from "./storageaccountstableservicestables";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsTableServicesProps extends IAzAPIBaseProps {
  /**
   * The properties of a storage account’s Table service.
   */
  properties?: TableServicePropertiesProperties;
}

export interface TableServicePropertiesProperties {
  /**
   * Specifies CORS rules for the Table service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Table service.
   */
  cors?: CorsRules;
}

export interface CorsRules {
  /**
   * The List of CORS rules. You can include up to five CorsRule elements in the request.
   */
  corsRules?: CorsRule[];
}

export interface CorsRule {
  /**
   * Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request.
   */
  allowedHeaders: string[];
  /**
   * Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin.
   */
  allowedMethods: string[];
  /**
   * Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains
   */
  allowedOrigins: string[];
  /**
   * Required if CorsRule element is present. A list of response headers to expose to CORS clients.
   */
  exposedHeaders: string[];
  /**
   * Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response.
   */
  maxAgeInSeconds: number;
}

export class StorageAccountsTableServices extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsTableServices.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/tableServices@2023-05-01. The properties include:
     * `properties` - (Optional) The properties of a storage account’s Table service. Defaults to `TableServicePropertiesProperties`.
     *
     * ---
     *
     * The `TableServicePropertiesProperties` block supports the following:

     * `cors` - (Optional) Specifies CORS rules for the Table service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Table service. Defaults to `CorsRules`.
     *
     * ---
     *
     * The `CorsRules` block supports the following:

     * `corsRules` - (Optional) The List of CORS rules. You can include up to five CorsRule elements in the request.  Defaults to `CorsRule[]`.
     *
     * ---
     *
     * The `CorsRule[]` block supports the following:

     * `allowedHeaders` - (Required) Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request. Defaults to `string[]`.
     * `allowedMethods` - (Required) Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin. Defaults to `string[]`.
     * `allowedOrigins` - (Required) Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains Defaults to `string[]`.
     * `exposedHeaders` - (Required) Required if CorsRule element is present. A list of response headers to expose to CORS clients. Defaults to `string[]`.
     * `maxAgeInSeconds` - (Required) Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response. Defaults to `integer`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsTableServicesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/tableServices@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsTableServicesProps) {
    return {
      properties: props.properties,
    };
  }
  public addStorageAccountsTableServicesTables(
    props: StorageAccountsTableServicesTablesProps,
  ): StorageAccountsTableServicesTables {
    return new StorageAccountsTableServicesTables(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface StorageAccountsTableServicesTablesProps
  extends IAzAPIBaseProps {
  /**
   * Table resource properties.
   */
  properties?: TableProperties;
}

export interface TableProperties {
  /**
   * List of stored access policies specified on the table.
   */
  signedIdentifiers?: TableSignedIdentifier[];
}

export interface TableSignedIdentifier {
  /**
   * Access policy
   */
  accessPolicy?: TableAccessPolicy;
  /**
   * unique-64-character-value of the stored access policy.
   */
  id: string;
}

export interface TableAccessPolicy {
  /**
   * Expiry time of the access policy
   */
  expiryTime?: string;
  /**
   * Required. List of abbreviated permissions. Supported permission values include 'r','a','u','d'
   */
  permission: string;
  /**
   * Start time of the access policy
   */
  startTime?: string;
}

export class StorageAccountsTableServicesTables extends AzAPIBase {
  /**
       * Constructs a new StorageAccountsTableServicesTables.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Storage/storageAccounts/tableServices/tables@2023-05-01. The properties include:
     * `properties` - (Optional) Table resource properties. Defaults to `TableProperties`.
     *
     * ---
     *
     * The `TableProperties` block supports the following:

     * `signedIdentifiers` - (Optional) List of stored access policies specified on the table. Defaults to `TableSignedIdentifier[]`.
     *
     * ---
     *
     * The `TableSignedIdentifier[]` block supports the following:

     * `accessPolicy` - (Optional) Access policy Defaults to `TableAccessPolicy`.
     * `id` - (Required) unique-64-character-value of the stored access policy. Defaults to `string`.
     *
     * ---
     *
     * The `TableAccessPolicy` block supports the following:

     * `expiryTime` - (Optional) Expiry time of the access policy Defaults to `string`.
     * `permission` - (Required) Required. List of abbreviated permissions. Supported permission values include 'r','a','u','d' Defaults to `string`.
     * `startTime` - (Optional) Start time of the access policy Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: StorageAccountsTableServicesTablesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Storage/storageAccounts/tableServices/tables@2023-05-01";
  }
  protected getResourceBody(props: StorageAccountsTableServicesTablesProps) {
    return {
      properties: props.properties,
    };
  }
}
