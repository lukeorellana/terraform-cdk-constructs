import { Construct } from "constructs";
import {
  VaultsAccessPolicies,
  VaultsAccessPoliciesProps,
} from "./vaultsaccesspolicies";
import { VaultsKeys, VaultsKeysProps } from "./vaultskeys";
import {
  VaultsPrivateEndpointConnections,
  VaultsPrivateEndpointConnectionsProps,
} from "./vaultsprivateendpointconnections";
import { VaultsSecrets, VaultsSecretsProps } from "./vaultssecrets";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface VaultsProps extends IAzAPIBaseProps {
  /**
   * Properties of the vault
   */
  properties: VaultProperties;
}

export interface VaultProperties {
  /**
   * An array of 0 to 1024 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. When `createMode` is set to `recover`, access policies are not required. Otherwise, access policies are required.
   */
  accessPolicies?: AccessPolicyEntry[];
  /**
   * The vault's create mode to indicate whether the vault need to be recovered or not.
   */
  createMode?: string;
  /**
   * Property specifying whether protection against purge is enabled for this vault. Setting this property to true activates protection against purge for this vault and its content - only the Key Vault service may initiate a hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this functionality is irreversible - that is, the property does not accept false as its value.
   */
  enablePurgeProtection?: boolean;
  /**
   * Property that controls how data actions are authorized. When true, the key vault will use Role Based Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties will be  ignored. When false, the key vault will use the access policies specified in vault properties, and any policy stored on Azure Resource Manager will be ignored. If null or not specified, the vault is created with the default value of false. Note that management actions are always authorized with RBAC.
   */
  enableRbacAuthorization?: boolean;
  /**
   * Property to specify whether the 'soft delete' functionality is enabled for this key vault. If it's not set to any value(true or false) when creating new key vault, it will be set to true by default. Once set to true, it cannot be reverted to false.
   */
  enableSoftDelete?: boolean;
  /**
   * Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault.
   */
  enabledForDeployment?: boolean;
  /**
   * Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys.
   */
  enabledForDiskEncryption?: boolean;
  /**
   * Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault.
   */
  enabledForTemplateDeployment?: boolean;
  /**
   * Rules governing the accessibility of the key vault from specific network locations.
   */
  networkAcls?: NetworkRuleSet;
  /**
   * Provisioning state of the vault.
   */
  provisioningState?: string;
  /**
   * Property to specify whether the vault will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. This will override the set firewall rules, meaning that even if the firewall rules are present we will not honor the rules.
   */
  publicNetworkAccess?: string;
  /**
   * SKU details
   */
  sku: Sku;
  /**
   * softDelete data retention days. It accepts >=7 and <=90.
   */
  softDeleteRetentionInDays?: number;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  tenantId: string;
  /**
   * The URI of the vault for performing operations on keys and secrets.
   */
  vaultUri?: string;
}

export interface Sku {
  /**
   * SKU family name
   */
  family: string;
  /**
   * SKU name to specify whether the key vault is a standard vault or a premium vault.
   */
  name: string;
}

export interface NetworkRuleSet {
  /**
   * Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'.  If not specified the default is 'AzureServices'.
   */
  bypass?: string;
  /**
   * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
   */
  defaultAction?: string;
  /**
   * The list of IP address rules.
   */
  ipRules?: IpRule[];
  /**
   * The list of virtual network rules.
   */
  virtualNetworkRules?: VirtualNetworkRule[];
}

export interface VirtualNetworkRule {
  /**
   * Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'.
   */
  id: string;
  /**
   * Property to specify whether NRP will ignore the check if parent subnet has serviceEndpoints configured.
   */
  ignoreMissingVnetServiceEndpoint?: boolean;
}

export interface IpRule {
  /**
   * An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78).
   */
  value: string;
}

export interface AccessPolicyEntry {
  /**
   *  Application ID of the client making request on behalf of a principal
   */
  applicationId?: string;
  /**
   * The object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies.
   */
  objectId: string;
  /**
   * Permissions the identity has for keys, secrets and certificates.
   */
  permissions?: Permissions;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  tenantId: string;
}

export interface Permissions {
  /**
   * Permissions to certificates
   */
  certificates?: string[];
  /**
   * Permissions to keys
   */
  keys?: string[];
  /**
   * Permissions to secrets
   */
  secrets?: string[];
  /**
   * Permissions to storage accounts
   */
  storage?: string[];
}

export class Vaults extends AzAPIBase {
  /**
       * Constructs a new Vaults.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.KeyVault/vaults@2023-07-01. The properties include:
     * `properties` - (Required) Properties of the vault Defaults to `VaultProperties`.
     *
     * ---
     *
     * The `VaultProperties` block supports the following:

     * `accessPolicies` - (Optional) An array of 0 to 1024 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. When `createMode` is set to `recover`, access policies are not required. Otherwise, access policies are required. Defaults to `AccessPolicyEntry[]`.
     * `createMode` - (Optional) The vault's create mode to indicate whether the vault need to be recovered or not. Defaults to `string`.
     * `enablePurgeProtection` - (Optional) Property specifying whether protection against purge is enabled for this vault. Setting this property to true activates protection against purge for this vault and its content - only the Key Vault service may initiate a hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this functionality is irreversible - that is, the property does not accept false as its value. Defaults to `boolean`.
     * `enableRbacAuthorization` - (Optional) Property that controls how data actions are authorized. When true, the key vault will use Role Based Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties will be  ignored. When false, the key vault will use the access policies specified in vault properties, and any policy stored on Azure Resource Manager will be ignored. If null or not specified, the vault is created with the default value of false. Note that management actions are always authorized with RBAC. Defaults to `boolean`.
     * `enableSoftDelete` - (Optional) Property to specify whether the 'soft delete' functionality is enabled for this key vault. If it's not set to any value(true or false) when creating new key vault, it will be set to true by default. Once set to true, it cannot be reverted to false. Defaults to `boolean`.
     * `enabledForDeployment` - (Optional) Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault. Defaults to `boolean`.
     * `enabledForDiskEncryption` - (Optional) Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys. Defaults to `boolean`.
     * `enabledForTemplateDeployment` - (Optional) Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault. Defaults to `boolean`.
     * `networkAcls` - (Optional) Rules governing the accessibility of the key vault from specific network locations. Defaults to `NetworkRuleSet`.
     * `provisioningState` - (Optional) Provisioning state of the vault. Defaults to `string`.
     * `publicNetworkAccess` - (Optional) Property to specify whether the vault will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. This will override the set firewall rules, meaning that even if the firewall rules are present we will not honor the rules. Defaults to `string`.
     * `sku` - (Required) SKU details Defaults to `Sku`.
     * `softDeleteRetentionInDays` - (Optional) softDelete data retention days. It accepts >=7 and <=90. Defaults to `integer`.
     * `tenantId` - (Required) The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. Defaults to `string`.
     * `vaultUri` - (Optional) The URI of the vault for performing operations on keys and secrets. Defaults to `string`.
     *
     * ---
     *
     * The `Sku` block supports the following:

     * `family` - (Required) SKU family name Defaults to `string`.
     * `name` - (Required) SKU name to specify whether the key vault is a standard vault or a premium vault. Defaults to `string`.
     *
     * ---
     *
     * The `NetworkRuleSet` block supports the following:

     * `bypass` - (Optional) Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'.  If not specified the default is 'AzureServices'. Defaults to `string`.
     * `defaultAction` - (Optional) The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated. Defaults to `string`.
     * `ipRules` - (Optional) The list of IP address rules. Defaults to `IpRule[]`.
     * `virtualNetworkRules` - (Optional) The list of virtual network rules. Defaults to `VirtualNetworkRule[]`.
     *
     * ---
     *
     * The `VirtualNetworkRule[]` block supports the following:

     * `id` - (Required) Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'. Defaults to `string`.
     * `ignoreMissingVnetServiceEndpoint` - (Optional) Property to specify whether NRP will ignore the check if parent subnet has serviceEndpoints configured. Defaults to `boolean`.
     *
     * ---
     *
     * The `IPRule[]` block supports the following:

     * `value` - (Required) An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78). Defaults to `string`.
     *
     * ---
     *
     * The `AccessPolicyEntry[]` block supports the following:

     * `applicationId` - (Optional)  Application ID of the client making request on behalf of a principal Defaults to `string`.
     * `objectId` - (Required) The object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies. Defaults to `string`.
     * `permissions` - (Required) Permissions the identity has for keys, secrets and certificates. Defaults to `Permissions`.
     * `tenantId` - (Required) The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. Defaults to `string`.
     *
     * ---
     *
     * The `Permissions` block supports the following:

     * `certificates` - (Optional) Permissions to certificates Defaults to `string[]`.
     * `keys` - (Optional) Permissions to keys Defaults to `string[]`.
     * `secrets` - (Optional) Permissions to secrets Defaults to `string[]`.
     * `storage` - (Optional) Permissions to storage accounts Defaults to `string[]`.
     *
    */
  constructor(scope: Construct, id: string, props: VaultsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.KeyVault/vaults@2023-07-01";
  }
  protected getResourceBody(props: VaultsProps) {
    return {
      properties: props.properties,
    };
  }
  public addVaultsKeys(props: VaultsKeysProps): VaultsKeys {
    return new VaultsKeys(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addVaultsSecrets(props: VaultsSecretsProps): VaultsSecrets {
    return new VaultsSecrets(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addVaultsAccessPolicies(
    props: VaultsAccessPoliciesProps,
  ): VaultsAccessPolicies {
    return new VaultsAccessPolicies(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addVaultsPrivateEndpointConnections(
    props: VaultsPrivateEndpointConnectionsProps,
  ): VaultsPrivateEndpointConnections {
    return new VaultsPrivateEndpointConnections(this, props.name, {
      name: props.name,
      parentId: this.id,
      etag: props.etag,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface VaultsAccessPoliciesProps extends IAzAPIBaseProps {
  /**
   * Properties of the access policy
   */
  properties: VaultAccessPolicyProperties;
}

export interface VaultAccessPolicyProperties {
  /**
   * An array of 0 to 16 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID.
   */
  accessPolicies: AccessPolicyEntry[];
}

export interface AccessPolicyEntry {
  /**
   *  Application ID of the client making request on behalf of a principal
   */
  applicationId?: string;
  /**
   * The object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies.
   */
  objectId: string;
  /**
   * Permissions the identity has for keys, secrets and certificates.
   */
  permissions?: Permissions;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  tenantId: string;
}

export interface Permissions {
  /**
   * Permissions to certificates
   */
  certificates?: string[];
  /**
   * Permissions to keys
   */
  keys?: string[];
  /**
   * Permissions to secrets
   */
  secrets?: string[];
  /**
   * Permissions to storage accounts
   */
  storage?: string[];
}

export class VaultsAccessPolicies extends AzAPIBase {
  /**
       * Constructs a new VaultsAccessPolicies.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.KeyVault/vaults/accessPolicies@2023-07-01. The properties include:
     * `properties` - (Required) Properties of the access policy Defaults to `VaultAccessPolicyProperties`.
     *
     * ---
     *
     * The `VaultAccessPolicyProperties` block supports the following:

     * `accessPolicies` - (Required) An array of 0 to 16 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. Defaults to `AccessPolicyEntry[]`.
     *
     * ---
     *
     * The `AccessPolicyEntry[]` block supports the following:

     * `applicationId` - (Optional)  Application ID of the client making request on behalf of a principal Defaults to `string`.
     * `objectId` - (Required) The object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies. Defaults to `string`.
     * `permissions` - (Required) Permissions the identity has for keys, secrets and certificates. Defaults to `Permissions`.
     * `tenantId` - (Required) The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. Defaults to `string`.
     *
     * ---
     *
     * The `Permissions` block supports the following:

     * `certificates` - (Optional) Permissions to certificates Defaults to `string[]`.
     * `keys` - (Optional) Permissions to keys Defaults to `string[]`.
     * `secrets` - (Optional) Permissions to secrets Defaults to `string[]`.
     * `storage` - (Optional) Permissions to storage accounts Defaults to `string[]`.
     *
    */
  constructor(scope: Construct, id: string, props: VaultsAccessPoliciesProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.KeyVault/vaults/accessPolicies@2023-07-01";
  }
  protected getResourceBody(props: VaultsAccessPoliciesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface VaultsKeysProps extends IAzAPIBaseProps {
  /**
   * The properties of the key to be created.
   */
  properties?: KeyProperties;
}

export interface KeyProperties {
  /**
   * The attributes of the key.
   */
  attributes?: KeyAttributes;
  /**
   * The elliptic curve name. For valid values, see JsonWebKeyCurveName.
   */
  curveName?: string;
  /**
   * Array of JsonWebKeyOperation
   */
  keyOps?: string[];
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA.
   */
  keySize?: number;
  /**
   * The type of the key. For valid values, see JsonWebKeyType.
   */
  kty?: string;
  /**
   * Key release policy in response. It will be used for both output and input. Omitted if empty
   */
  release_policy?: KeyReleasePolicy;
  /**
   * Key rotation policy in response. It will be used for both output and input. Omitted if empty
   */
  rotationPolicy?: RotationPolicy;
}

export interface RotationPolicy {
  /**
   * The attributes of key rotation policy.
   */
  attributes?: KeyRotationPolicyAttributes;
  /**
   * The lifetimeActions for key rotation action.
   */
  lifetimeActions?: LifetimeAction[];
}

export interface LifetimeAction {
  /**
   * The action of key rotation policy lifetimeAction.
   */
  action?: Action;
  /**
   * The trigger of key rotation policy lifetimeAction.
   */
  trigger?: Trigger;
}

export interface Trigger {
  /**
   * The time duration after key creation to rotate the key. It only applies to rotate. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeAfterCreate?: string;
  /**
   * The time duration before key expiring to rotate or notify. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'.
   */
  timeBeforeExpiry?: string;
}

export interface Action {
  /**
   * The type of action.
   */
  type?: string;
}

export interface KeyRotationPolicyAttributes {
  /**
   * The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'.
   */
  expiryTime?: string;
}

export interface KeyReleasePolicy {
  /**
   * Content type and version of key release policy
   */
  contentType?: string;
  /**
   * Blob encoding the policy rules under which the key can be released.
   */
  data?: string;
}

export interface KeyAttributes {
  /**
   * Determines whether or not the object is enabled.
   */
  enabled?: boolean;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  exp?: number;
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: boolean;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  nbf?: number;
}

export class VaultsKeys extends AzAPIBase {
  /**
       * Constructs a new VaultsKeys.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.KeyVault/vaults/keys@2023-07-01. The properties include:
     * `properties` - (Required) The properties of the key to be created. Defaults to `KeyProperties`.
     *
     * ---
     *
     * The `KeyProperties` block supports the following:

     * `attributes` - (Optional) The attributes of the key. Defaults to `KeyAttributes`.
     * `curveName` - (Optional) The elliptic curve name. For valid values, see JsonWebKeyCurveName. Defaults to `string`.
     * `keyOps` - (Optional) Array of JsonWebKeyOperation Defaults to `string[]`.
     * `keySize` - (Optional) The key size in bits. For example: 2048, 3072, or 4096 for RSA. Defaults to `integer`.
     * `kty` - (Optional) The type of the key. For valid values, see JsonWebKeyType. Defaults to `string`.
     * `release_policy` - (Optional) Key release policy in response. It will be used for both output and input. Omitted if empty Defaults to `KeyReleasePolicy`.
     * `rotationPolicy` - (Optional) Key rotation policy in response. It will be used for both output and input. Omitted if empty Defaults to `RotationPolicy`.
     *
     * ---
     *
     * The `RotationPolicy` block supports the following:

     * `attributes` - (Optional) The attributes of key rotation policy. Defaults to `KeyRotationPolicyAttributes`.
     * `lifetimeActions` - (Optional) The lifetimeActions for key rotation action. Defaults to `LifetimeAction[]`.
     *
     * ---
     *
     * The `LifetimeAction[]` block supports the following:

     * `action` - (Optional) The action of key rotation policy lifetimeAction. Defaults to `Action`.
     * `trigger` - (Optional) The trigger of key rotation policy lifetimeAction. Defaults to `Trigger`.
     *
     * ---
     *
     * The `Trigger` block supports the following:

     * `timeAfterCreate` - (Optional) The time duration after key creation to rotate the key. It only applies to rotate. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'. Defaults to `string`.
     * `timeBeforeExpiry` - (Optional) The time duration before key expiring to rotate or notify. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'. Defaults to `string`.
     *
     * ---
     *
     * The `Action` block supports the following:

     * `type` - (Optional) The type of action. Defaults to `string`.
     *
     * ---
     *
     * The `KeyRotationPolicyAttributes` block supports the following:

     * `expiryTime` - (Optional) The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'. Defaults to `string`.
     *
     * ---
     *
     * The `KeyReleasePolicy` block supports the following:

     * `contentType` - (Optional) Content type and version of key release policy Defaults to `string`.
     * `data` - (Optional) Blob encoding the policy rules under which the key can be released. Defaults to `string`.
     *
     * ---
     *
     * The `KeyAttributes` block supports the following:

     * `enabled` - (Optional) Determines whether or not the object is enabled. Defaults to `boolean`.
     * `exp` - (Optional) Expiry date in seconds since 1970-01-01T00:00:00Z. Defaults to `integer`.
     * `exportable` - (Optional) Indicates if the private key can be exported. Defaults to `boolean`.
     * `nbf` - (Optional) Not before date in seconds since 1970-01-01T00:00:00Z. Defaults to `integer`.
     *
    */
  constructor(scope: Construct, id: string, props: VaultsKeysProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.KeyVault/vaults/keys@2023-07-01";
  }
  protected getResourceBody(props: VaultsKeysProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface VaultsPrivateEndpointConnectionsProps extends IAzAPIBaseProps {
  /**
   * Modified whenever there is a change in the state of private endpoint connection.
   */
  etag?: string;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionProperties;
}

export interface PrivateEndpointConnectionProperties {
  /**
   * Properties of the private endpoint object.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * Approval state of the private link connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /**
   * Provisioning state of the private endpoint connection.
   */
  provisioningState?: string;
}

export interface PrivateLinkServiceConnectionState {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: string;
  /**
   * The reason for approval or rejection.
   */
  description?: string;
  /**
   * Indicates whether the connection has been approved, rejected or removed by the key vault owner.
   */
  status?: string;
}

export interface PrivateEndpoint {}

export class VaultsPrivateEndpointConnections extends AzAPIBase {
  /**
       * Constructs a new VaultsPrivateEndpointConnections.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.KeyVault/vaults/privateEndpointConnections@2023-07-01. The properties include:
     * `etag` - (Optional) Modified whenever there is a change in the state of private endpoint connection. Defaults to `string`.
     * `properties` - (Required) Resource properties. Defaults to `PrivateEndpointConnectionProperties`.
     *
     * ---
     *
     * The `PrivateEndpointConnectionProperties` block supports the following:

     * `privateEndpoint` - (Optional) Properties of the private endpoint object. Defaults to `PrivateEndpoint`.
     * `privateLinkServiceConnectionState` - (Optional) Approval state of the private link connection. Defaults to `PrivateLinkServiceConnectionState`.
     * `provisioningState` - (Optional) Provisioning state of the private endpoint connection. Defaults to `string`.
     *
     * ---
     *
     * The `PrivateLinkServiceConnectionState` block supports the following:

     * `actionsRequired` - (Optional) A message indicating if changes on the service provider require any updates on the consumer. Defaults to `string`.
     * `description` - (Optional) The reason for approval or rejection. Defaults to `string`.
     * `status` - (Optional) Indicates whether the connection has been approved, rejected or removed by the key vault owner. Defaults to `string`.
     *
     * ---
     *
     * The `PrivateEndpoint` block supports the following:

     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: VaultsPrivateEndpointConnectionsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.KeyVault/vaults/privateEndpointConnections@2023-07-01";
  }
  protected getResourceBody(props: VaultsPrivateEndpointConnectionsProps) {
    return {
      etag: props.etag,
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface VaultsSecretsProps extends IAzAPIBaseProps {
  /**
   * Properties of the secret
   */
  properties?: SecretProperties;
}

export interface SecretProperties {
  /**
   * The attributes of the secret.
   */
  attributes?: SecretAttributes;
  /**
   * The content type of the secret.
   */
  contentType?: string;
  /**
   * The value of the secret. NOTE: 'value' will never be returned from the service, as APIs using this model are is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
   */
  value?: string;
}

export interface SecretAttributes {
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Expiry date in seconds since 1970-01-01T00:00:00Z.
   */
  exp?: number;
  /**
   * Not before date in seconds since 1970-01-01T00:00:00Z.
   */
  nbf?: number;
}

export class VaultsSecrets extends AzAPIBase {
  /**
       * Constructs a new VaultsSecrets.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.KeyVault/vaults/secrets@2023-07-01. The properties include:
     * `properties` - (Required) Properties of the secret Defaults to `SecretProperties`.
     *
     * ---
     *
     * The `SecretProperties` block supports the following:

     * `attributes` - (Optional) The attributes of the secret. Defaults to `SecretAttributes`.
     * `contentType` - (Optional) The content type of the secret. Defaults to `string`.
     * `value` - (Optional) The value of the secret. NOTE: 'value' will never be returned from the service, as APIs using this model are is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. Defaults to `string`.
     *
     * ---
     *
     * The `SecretAttributes` block supports the following:

     * `enabled` - (Optional) Determines whether the object is enabled. Defaults to `boolean`.
     * `exp` - (Optional) Expiry date in seconds since 1970-01-01T00:00:00Z. Defaults to `integer`.
     * `nbf` - (Optional) Not before date in seconds since 1970-01-01T00:00:00Z. Defaults to `integer`.
     *
    */
  constructor(scope: Construct, id: string, props: VaultsSecretsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.KeyVault/vaults/secrets@2023-07-01";
  }
  protected getResourceBody(props: VaultsSecretsProps) {
    return {
      properties: props.properties,
    };
  }
}
