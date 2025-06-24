import * as cdktf from "cdktf";
import { Construct } from "constructs";
import {
  CertificateIssuer,
  SelfSignedCertificate,
  SelfSignedCertificateProps,
} from "./certificate";
import { Key, KeyProps } from "./key";
import { AccessPolicy, AccessPolicyProps } from "./policy";
import { Secret, SecretProps } from "./secret";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup";
import { AzureResource } from "../../core-azure";

/**
 * Azure Key Vault SKU configuration (AzAPI schema).
 */
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

/**
 * IP address rule for network access.
 */
export interface IpRule {
  /**
   * An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78).
   */
  value: string;
}

/**
 * Virtual network rule for network access.
 */
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

/**
 * Network rule set for Key Vault access.
 */
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

/**
 * Permissions for Key Vault access policies.
 */
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

/**
 * Access policy entry for Key Vault.
 */
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

/**
 * Properties of the Key Vault (AzAPI schema).
 */
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

export interface VaultProps {
  /**
   * The name of the Key Vault.
   */
  readonly name: string;
  /**
   * The Azure Region to deploy the Key Vault.
   */
  readonly location: string;
  /**
   * An optional reference to the resource group in which to deploy the Key Vault.
   * If not provided, the Key Vault will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;
  /**
   * The tags to assign to the Key Vault.
   */
  readonly tags?: { [key: string]: string };
  /**
   * The Name of the SKU used for this Key Vault. Possible values are standard and premium.
   */
  readonly sku?: string;
  /**
   * The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault.
   */
  readonly tenantId: string;
  /**
   * Network ACL rules for the Key Vault (legacy compatibility).
   * @deprecated Use networkRuleSet instead for AzAPI compatibility
   */
  readonly networkAcls?: any;
  /**
   * AzAPI-compatible network ACL rules for the Key Vault.
   */
  readonly networkRuleSet?: NetworkRuleSet;
  /**
   * Specifies whether protection against purge is enabled for this Key Vault.
   */
  readonly purgeProtection?: boolean;
  /**
   * The number of days that items should be retained for once soft-deleted.
   */
  readonly softDeleteRetentionDays?: number;
  /**
   * Access policies for the Key Vault.
   */
  readonly accessPolicies?: AccessPolicyEntry[];
  /**
   * Property to specify whether the 'soft delete' functionality is enabled for this key vault.
   */
  readonly enableSoftDelete?: boolean;
  /**
   * Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault.
   */
  readonly enabledForDeployment?: boolean;
  /**
   * Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys.
   */
  readonly enabledForDiskEncryption?: boolean;
  /**
   * Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault.
   */
  readonly enabledForTemplateDeployment?: boolean;
  /**
   * Property that controls how data actions are authorized.
   */
  readonly enableRbacAuthorization?: boolean;
  /**
   * AzAPI-specific properties (for advanced usage).
   */
  readonly properties?: VaultProperties;
}

/**
 * Options for granting custom access permissions in Azure Key Vault.
 */
export interface GrantCustomAccessOptions {
  /**
   * Optional: A list of permissions to grant for secrets in the Key Vault.
   * Example permissions include 'get', 'list', 'set', 'delete', etc.
   */
  readonly secretPermissions?: string[];

  /**
   * Optional: A list of permissions to grant for certificates in the Key Vault.
   * Example permissions include 'get', 'list', 'create', 'delete', etc.
   */
  readonly certificatePermissions?: string[];

  /**
   * Optional: A list of permissions to grant for keys in the Key Vault.
   * Example permissions include 'encrypt', 'decrypt', 'wrapKey', 'unwrapKey', etc.
   */
  readonly keyPermissions?: string[];

  /**
   * Optional: A list of permissions to grant for storage accounts in the Key Vault.
   * Example permissions include 'get', 'list', 'delete', 'set', 'update', etc.
   */
  readonly storagePermissions?: string[];
}

export class Vault extends AzureResource {
  readonly props: VaultProps;
  public resource: resource.Resource;
  public resourceGroup: ResourceGroup;
  public id: string;
  public name: string;
  public location: string;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;
  public readonly locationOutput: cdktf.TerraformOutput;
  public readonly vaultUriOutput: cdktf.TerraformOutput;

  /**
   * Constructs a new Azure Key Vault resource using AzAPI.
   *
   * This class creates and configures an Azure Key Vault, a secure store for managing secrets, keys, certificates, and other sensitive data.
   * It supports advanced configurations such as access policies, network rules, and data retention policies.
   *
   * @param scope - The scope in which to define this construct, usually representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the Key Vault.
   * @param props - The properties for creating the Key Vault as defined in VaultProps. These include settings for location, SKU, tenant ID, etc.
   *
   * Example usage:
   * ```typescript
   * new Vault(this, 'MyKeyVault', {
   *   name: 'mySecureVault',
   *   location: 'East US',
   *   resourceGroup: myResourceGroup,
   *   sku: 'premium',
   *   tenantId: 'my-tenant-id',
   *   softDeleteRetentionDays: 90,
   *   purgeProtection: true,
   *   tags: {
   *     project: 'My Application'
   *   }
   * });
   * ```
   */
  constructor(scope: Construct, id: string, props: VaultProps) {
    super(scope, id);

    this.props = props;
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location,
      });

    // Set defaults
    const defaults = {
      sku: props.sku || "standard",
      softDeleteRetentionDays: props.softDeleteRetentionDays || 90,
      purgeProtection: props.purgeProtection ?? true,
      enableSoftDelete: props.enableSoftDelete ?? true,
    };

    // Build the SKU object
    const sku: Sku = {
      family: "A",
      name: defaults.sku,
    };

    // Convert legacy networkAcls to AzAPI format if provided
    let networkRuleSet: NetworkRuleSet | undefined = props.networkRuleSet;
    if (props.networkAcls && !networkRuleSet) {
      // Convert legacy format to AzAPI format
      networkRuleSet = {
        bypass: props.networkAcls.bypass,
        defaultAction: props.networkAcls.defaultAction,
        ipRules: props.networkAcls.ipRules?.map((rule: any) => ({
          value: rule.value,
        })),
        virtualNetworkRules: props.networkAcls.virtualNetworkRules?.map(
          (rule: any) => ({
            id: rule.id,
            ignoreMissingVnetServiceEndpoint:
              rule.ignoreMissingVnetServiceEndpoint,
          }),
        ),
      };
    }

    // Build the vault properties
    const vaultProperties: VaultProperties = {
      tenantId: props.tenantId,
      sku: sku,
      softDeleteRetentionInDays: defaults.softDeleteRetentionDays,
      enablePurgeProtection: defaults.purgeProtection,
      enableSoftDelete: defaults.enableSoftDelete,
      enabledForDeployment: props.enabledForDeployment,
      enabledForDiskEncryption: props.enabledForDiskEncryption,
      enabledForTemplateDeployment: props.enabledForTemplateDeployment,
      enableRbacAuthorization: props.enableRbacAuthorization,
      networkAcls: networkRuleSet,
      accessPolicies: props.accessPolicies,
      ...props.properties, // Allow override with custom properties
    };

    // Create the Key Vault using AzAPI
    this.resource = new resource.Resource(this, "vault", {
      type: "Microsoft.KeyVault/vaults@2023-07-01",
      name: props.name,
      location: props.location,
      parentId: this.resourceGroup.resourceGroup.id,
      body: {
        properties: vaultProperties,
      },
      tags: props.tags,
    });

    // Set public properties
    this.id = this.resource.id;
    this.name = props.name;
    this.location = props.location;

    // Create outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.resource.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.resource.name,
    });
    this.locationOutput = new cdktf.TerraformOutput(this, "location", {
      value: this.resource.location,
    });
    this.vaultUriOutput = new cdktf.TerraformOutput(this, "vaultUri", {
      value: `\${jsondecode(${this.resource.output}).properties.vaultUri}`,
    });

    // Override logical IDs for compatibility
    this.idOutput.overrideLogicalId("id");
    this.nameOutput.overrideLogicalId("name");
    this.locationOutput.overrideLogicalId("location");
    this.vaultUriOutput.overrideLogicalId("vaultUri");
  }

  /**
   * Legacy property compatibility - returns the AzAPI resource
   * @deprecated Use `resource` instead
   */
  public get keyVault(): resource.Resource {
    return this.resource;
  }

  /**
   * Add a secret to the Key Vault.
   */
  public addSecret(secretId: string, props: SecretProps): Secret {
    return new Secret(this, secretId, {
      ...props,
      keyVaultId: this,
    });
  }

  /**
   * Add a key to the Key Vault.
   */
  public addKey(keyId: string, props: KeyProps): Key {
    return new Key(this, keyId, {
      ...props,
      keyVaultId: this,
    });
  }

  /**
   * Add an access policy to the Key Vault.
   */
  public addAccessPolicy(
    policyId: string,
    props: AccessPolicyProps,
  ): AccessPolicy {
    return new AccessPolicy(this, policyId, {
      ...props,
      keyVaultId: this,
      tenantId: props.tenantId || this.props.tenantId,
    });
  }

  /**
   * Create a self-signed certificate in the Key Vault.
   */
  public addSelfSignedCertificate(
    certId: string,
    props: SelfSignedCertificateProps,
  ): SelfSignedCertificate {
    return new SelfSignedCertificate(this, certId, {
      ...props,
      keyVaultId: this,
    });
  }

  /**
   * Add a certificate issuer to the Key Vault.
   */
  public addCertificateIssuer(issuerId: string, props: any): CertificateIssuer {
    return new CertificateIssuer(this, issuerId, {
      ...props,
      keyVaultId: this,
    });
  }
}
