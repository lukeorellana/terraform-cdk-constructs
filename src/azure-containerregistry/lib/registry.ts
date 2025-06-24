import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup";
import { AzureResource } from "../../core-azure/lib";

/**
 * The SKU of the container registry.
 */
export interface Sku {
  /**
   * The SKU name of the container registry. Required for registry creation.
   */
  name: string;
}

/**
 * The encryption settings of container registry.
 */
export interface EncryptionProperty {
  /**
   * Key vault properties.
   */
  keyVaultProperties?: KeyVaultProperties;
  /**
   * Indicates whether or not the encryption is enabled for container registry.
   */
  status?: string;
}

/**
 * Key vault properties.
 */
export interface KeyVaultProperties {
  /**
   * The client id of the identity which will be used to access key vault.
   */
  identity?: string;
  /**
   * Key vault uri to access the encryption key.
   */
  keyIdentifier?: string;
}

/**
 * The network rule set for a container registry.
 */
export interface NetworkRuleSet {
  /**
   * The default action of allow or deny when no other rules match.
   */
  defaultAction: string;
  /**
   * The IP ACL rules.
   */
  ipRules?: IpRule[];
}

/**
 * IP ACL rule.
 */
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

/**
 * Policy definitions for various container registry features.
 */
export interface TrustPolicy {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: string;
  /**
   * The type of trust policy.
   */
  type?: string;
}

export interface SoftDeletePolicy {
  /**
   * The number of days after which a soft-deleted item is permanently deleted.
   */
  retentionDays?: number;
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: string;
}

export interface RetentionPolicy {
  /**
   * The number of days to retain an untagged manifest after which it gets purged.
   */
  days?: number;
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: string;
}

export interface QuarantinePolicy {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: string;
}

export interface ExportPolicy {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: string;
}

export interface AzureAdAuthenticationAsArmPolicy {
  /**
   * The value that indicates whether the policy is enabled or not.
   */
  status?: string;
}

/**
 * The policies for a container registry.
 */
export interface Policies {
  /**
   * The policy for using ARM audience token for a container registry.
   */
  azureADAuthenticationAsArmPolicy?: AzureAdAuthenticationAsArmPolicy;
  /**
   * The export policy for a container registry.
   */
  exportPolicy?: ExportPolicy;
  /**
   * The quarantine policy for a container registry.
   */
  quarantinePolicy?: QuarantinePolicy;
  /**
   * The retention policy for a container registry.
   */
  retentionPolicy?: RetentionPolicy;
  /**
   * The soft delete policy for a container registry.
   */
  softDeletePolicy?: SoftDeletePolicy;
  /**
   * The content trust policy for a container registry.
   */
  trustPolicy?: TrustPolicy;
}

/**
 * The properties of the container registry.
 */
export interface RegistryProperties {
  /**
   * The value that indicates whether the admin user is enabled.
   */
  adminUserEnabled?: boolean;
  /**
   * Enables registry-wide pull from unauthenticated clients.
   */
  anonymousPullEnabled?: boolean;
  /**
   * Enable a single data endpoint per region for serving data.
   */
  dataEndpointEnabled?: boolean;
  /**
   * The encryption settings of container registry.
   */
  encryption?: EncryptionProperty;
  /**
   * Determines whether registry artifacts are indexed for metadata search.
   */
  metadataSearch?: string;
  /**
   * Whether to allow trusted Azure services to access a network restricted registry.
   */
  networkRuleBypassOptions?: string;
  /**
   * The network rule set for a container registry.
   */
  networkRuleSet?: NetworkRuleSet;
  /**
   * The policies for a container registry.
   */
  policies?: Policies;
  /**
   * Whether or not public network access is allowed for the container registry.
   */
  publicNetworkAccess?: string;
  /**
   * Whether or not zone redundancy is enabled for this container registry
   */
  zoneRedundancy?: string;
}

export interface RegistryProps {
  /**
   * The Azure Region to deploy.
   */
  readonly location: string;
  /**
   * The name of the Container Registry.
   */
  readonly name: string;
  /**
   * An optional reference to the resource group in which to deploy the Container Registry.
   * If not provided, the Container Registry will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;
  /**
   * The SKU of the Container Registry.
   */
  readonly sku?: Sku;
  /**
   * The tags to assign to the Container Registry.
   */
  readonly tags?: { [key: string]: string };

  // Registry configuration properties (flattened from AzAPI properties)
  /**
   * The value that indicates whether the admin user is enabled.
   */
  readonly adminUserEnabled?: boolean;
  /**
   * Enables registry-wide pull from unauthenticated clients.
   */
  readonly anonymousPullEnabled?: boolean;
  /**
   * Enable a single data endpoint per region for serving data.
   */
  readonly dataEndpointEnabled?: boolean;
  /**
   * The encryption settings of container registry.
   */
  readonly encryption?: EncryptionProperty;
  /**
   * Determines whether registry artifacts are indexed for metadata search.
   */
  readonly metadataSearch?: string;
  /**
   * Whether to allow trusted Azure services to access a network restricted registry.
   */
  readonly networkRuleBypassOptions?: string;
  /**
   * The network rule set for a container registry.
   */
  readonly networkRuleSet?: NetworkRuleSet;
  /**
   * The policies for a container registry.
   */
  readonly policies?: Policies;
  /**
   * Whether or not public network access is allowed for the container registry.
   */
  readonly publicNetworkAccess?: string;
  /**
   * Whether or not zone redundancy is enabled for this container registry
   */
  readonly zoneRedundancy?: string;

  // Legacy properties for backward compatibility
  /**
   * Create enable Admin user.
   * @deprecated Use adminUserEnabled instead
   */
  readonly adminEnabled?: boolean;
  /**
   * The properties of the container registry (AzAPI schema).
   * @deprecated Use flattened properties instead
   */
  readonly properties?: RegistryProperties;
  /**
   * Specify the locations to configure replication.
   * @deprecated Use separate replication resources instead
   */
  readonly geoReplicationLocations?: any;
}

export class Registry extends AzureResource {
  public readonly props: RegistryProps;
  public readonly resourceGroup: ResourceGroup;
  public readonly resource: resource.Resource;
  public readonly id: string;
  public readonly loginServer: string;
  public readonly name: string;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;
  public readonly loginServerOutput: cdktf.TerraformOutput;

  /**
   * Constructs a new Azure Container Registry (ACR) using AzAPI.
   *
   * This class creates an Azure Container Registry instance, which is a managed Docker registry service based on the Docker Registry 2.0 specification.
   * This service enables you to store and manage container images across all types of Azure deployments, you can also use it to build, store, and manage images for all types of container deployments.
   *
   * @param scope - The scope in which to define this construct, typically used for managing lifecycles and creation order.
   * @param id - The unique identifier for this construct instance.
   * @param props - The properties for configuring the Azure Container Registry. The properties include:
   *                - `location`: Required. The Azure region where the registry will be deployed.
   *                - `name`: Required. The name of the Container Registry.
   *                - `resourceGroup`: Optional. Reference to the resource group for deployment.
   *                - `sku`: Optional. The SKU of the Container Registry (e.g., Basic, Standard, Premium). Determines the features available.
   *                - `properties`: Optional. AzAPI-specific properties for advanced configuration.
   *                - `tags`: Optional. Tags for resource management.
   *                - `adminEnabled`: Optional (deprecated). Use properties.adminUserEnabled instead.
   *                - `geoReplicationLocations`: Optional (deprecated). Use separate replication resources instead.
   *
   * Example usage:
   * ```typescript
   * new Registry(this, 'myRegistry', {
   *   location: 'West US',
   *   name: 'myContainerRegistry',
   *   resourceGroup: resourceGroup,
   *   sku: { name: 'Premium' },
   *   properties: {
   *     adminUserEnabled: true,
   *     publicNetworkAccess: 'Enabled'
   *   }
   * });
   * ```
   */
  constructor(scope: Construct, id: string, props: RegistryProps) {
    super(scope, id);

    this.props = props;

    // Setup or reuse the provided resource group.
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location,
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Build registry properties, supporting both new flattened props and legacy nested props
    const registryProperties: RegistryProperties = {
      // Start with legacy properties if provided
      ...props.properties,
      // Override with flattened properties if provided
      adminUserEnabled: props.adminUserEnabled ?? props.properties?.adminUserEnabled,
      anonymousPullEnabled: props.anonymousPullEnabled ?? props.properties?.anonymousPullEnabled,
      dataEndpointEnabled: props.dataEndpointEnabled ?? props.properties?.dataEndpointEnabled,
      encryption: props.encryption ?? props.properties?.encryption,
      metadataSearch: props.metadataSearch ?? props.properties?.metadataSearch,
      networkRuleBypassOptions: props.networkRuleBypassOptions ?? props.properties?.networkRuleBypassOptions,
      networkRuleSet: props.networkRuleSet ?? props.properties?.networkRuleSet,
      policies: props.policies ?? props.properties?.policies,
      publicNetworkAccess: props.publicNetworkAccess ?? props.properties?.publicNetworkAccess,
      zoneRedundancy: props.zoneRedundancy ?? props.properties?.zoneRedundancy,
    };

    // Handle legacy adminEnabled property
    if (
      props.adminEnabled !== undefined &&
      registryProperties.adminUserEnabled === undefined
    ) {
      registryProperties.adminUserEnabled = props.adminEnabled;
    }

    // Provide default SKU if not specified
    const sku: Sku = props.sku ?? { name: "Basic" };

    // Create the ACR using AzAPI
    const acrResource = new resource.Resource(this, "acr", {
      type: "Microsoft.ContainerRegistry/registries@2023-11-01-preview",
      name: props.name,
      location: props.location,
      parentId: this.resourceGroup.resourceGroup.id,
      body: {
        sku: sku,
        properties: registryProperties,
      },
      tags: props.tags,
    });

    this.resource = acrResource;
    this.id = acrResource.id;
    this.name = acrResource.name;
    this.loginServer = `\${jsondecode(${acrResource.fqn}.output).properties.loginServer}`;

    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.id,
    });

    this.nameOutput = new cdktf.TerraformOutput(
      this,
      "container_registry_name",
      {
        value: this.name,
      },
    );

    this.loginServerOutput = new cdktf.TerraformOutput(this, "login_server", {
      value: this.loginServer,
    });

    /*This allows the Terraform resource name to match the original name. You can remove the call if you don't need them to match.*/
    this.idOutput.overrideLogicalId("id");
    this.nameOutput.overrideLogicalId("container_registry_name");
    this.loginServerOutput.overrideLogicalId("login_server");
  }

  /**
   * Adds a cache rule to the container registry.
   */
  public addCacheRule(props: CacheRuleProps): CacheRule {
    return new CacheRule(this, `cache-rule-${props.name}`, props);
  }

  /**
   * Adds a webhook to the container registry.
   */
  public addWebhook(props: WebhookProps): Webhook {
    return new Webhook(this, `webhook-${props.name}`, props);
  }

  /**
   * Adds a scope map to the container registry.
   */
  public addScopeMap(props: ScopeMapProps): ScopeMap {
    return new ScopeMap(this, `scope-map-${props.name}`, props);
  }

  /**
   * Adds a token to the container registry.
   */
  public addToken(props: TokenProps): Token {
    return new Token(this, `token-${props.name}`, props);
  }

  /**
   * Adds a replication to the container registry.
   */
  public addReplication(props: ReplicationProps): Replication {
    return new Replication(this, `replication-${props.name}`, props);
  }
}

// Child resource interfaces and classes

/**
 * Properties for cache rules
 */
export interface CacheRuleProperties {
  /**
   * The ARM resource ID of the credential store which is associated with the cache rule.
   */
  credentialSetResourceId?: string;
  /**
   * Source repository pulled from upstream.
   */
  sourceRepository?: string;
  /**
   * Target repository specified in docker pull command.
   */
  targetRepository?: string;
}

export interface CacheRuleProps {
  /**
   * The name of the cache rule.
   */
  readonly name: string;
  /**
   * The ARM resource ID of the credential store which is associated with the cache rule.
   */
  readonly credentialSetResourceId?: string;
  /**
   * Source repository pulled from upstream.
   */
  readonly sourceRepository?: string;
  /**
   * Target repository specified in docker pull command.
   */
  readonly targetRepository?: string;
}

/**
 * Properties for webhooks
 */
export interface WebhookPropertiesCreateParameters {
  /**
   * The list of actions that trigger the webhook to post notifications.
   */
  actions: string[];
  /**
   * Custom headers that will be added to the webhook notifications.
   */
  customHeaders?: { [key: string]: any };
  /**
   * The scope of repositories where the event can be triggered.
   */
  scope?: string;
  /**
   * The service URI for the webhook to post notifications.
   */
  serviceUri: string;
  /**
   * The status of the webhook at the time the operation was called.
   */
  status?: string;
}

export interface WebhookProps {
  /**
   * The name of the webhook.
   */
  readonly name: string;
  /**
   * The list of actions that trigger the webhook to post notifications.
   */
  readonly actions: string[];
  /**
   * Custom headers that will be added to the webhook notifications.
   */
  readonly customHeaders?: { [key: string]: any };
  /**
   * The scope of repositories where the event can be triggered.
   */
  readonly scope?: string;
  /**
   * The service URI for the webhook to post notifications.
   */
  readonly serviceUri: string;
  /**
   * The status of the webhook at the time the operation was called.
   */
  readonly status?: string;
}

/**
 * Properties for scope maps
 */
export interface ScopeMapProperties {
  /**
   * The list of scoped permissions for registry artifacts.
   */
  actions: string[];
  /**
   * The user friendly description of the scope map.
   */
  description?: string;
}

export interface ScopeMapProps {
  /**
   * The name of the scope map.
   */
  readonly name: string;
  /**
   * The list of scoped permissions for registry artifacts.
   */
  readonly actions: string[];
  /**
   * The user friendly description of the scope map.
   */
  readonly description?: string;
}

/**
 * Properties for tokens
 */
export interface TokenCredentialsProperties {
  /**
   * Array of TokenCertificate
   */
  certificates?: TokenCertificate[];
  /**
   * Array of TokenPassword
   */
  passwords?: TokenPassword[];
}

export interface TokenCertificate {
  /**
   * Base 64 encoded string of the public certificate1 in PEM format.
   */
  encodedPemCertificate?: string;
  /**
   * The expiry datetime of the certificate.
   */
  expiry?: string;
  /**
   * The name of the certificate.
   */
  name?: string;
  /**
   * The thumbprint of the certificate.
   */
  thumbprint?: string;
}

export interface TokenPassword {
  /**
   * The creation datetime of the password.
   */
  creationTime?: string;
  /**
   * The expiry datetime of the password.
   */
  expiry?: string;
  /**
   * The password name "password1" or "password2"
   */
  name?: string;
}

export interface TokenProperties {
  /**
   * The credentials that can be used for authenticating the token.
   */
  credentials?: TokenCredentialsProperties;
  /**
   * The resource ID of the scope map to which the token will be associated with.
   */
  scopeMapId?: string;
  /**
   * The status of the token example enabled or disabled.
   */
  status?: string;
}

export interface TokenProps {
  /**
   * The name of the token.
   */
  readonly name: string;
  /**
   * The credentials that can be used for authenticating the token.
   */
  readonly credentials?: TokenCredentialsProperties;
  /**
   * The resource ID of the scope map to which the token will be associated with.
   */
  readonly scopeMapId?: string;
  /**
   * The status of the token example enabled or disabled.
   */
  readonly status?: string;
}

/**
 * Properties for replications
 */
export interface ReplicationProperties {
  /**
   * Specifies whether the replication's regional endpoint is enabled.
   */
  regionEndpointEnabled?: boolean;
  /**
   * Whether or not zone redundancy is enabled for this container registry replication
   */
  zoneRedundancy?: string;
}

export interface ReplicationProps {
  /**
   * The name of the replication.
   */
  readonly name: string;
  /**
   * The location for the replication.
   */
  readonly location: string;
  /**
   * Specifies whether the replication's regional endpoint is enabled.
   */
  readonly regionEndpointEnabled?: boolean;
  /**
   * Whether or not zone redundancy is enabled for this container registry replication
   */
  readonly zoneRedundancy?: string;
  /**
   * The tags to assign to the replication.
   */
  readonly tags?: { [key: string]: string };
}

/**
 * Child resource classes
 */
export class CacheRule extends AzureResource {
  public readonly resource: resource.Resource;

  constructor(scope: Construct, id: string, props: CacheRuleProps) {
    super(scope, id);

    // Get the parent registry resource
    const parentRegistry = scope as Registry;
    
    this.resource = new resource.Resource(this, "cache-rule", {
      type: "Microsoft.ContainerRegistry/registries/cacheRules@2023-11-01-preview",
      name: props.name,
      parentId: parentRegistry.resource.id,
      body: {
        properties: {
          credentialSetResourceId: props.credentialSetResourceId,
          sourceRepository: props.sourceRepository,
          targetRepository: props.targetRepository,
        },
      },
    });
  }
}

export class Webhook extends AzureResource {
  public readonly resource: resource.Resource;

  constructor(scope: Construct, id: string, props: WebhookProps) {
    super(scope, id);

    // Get the parent registry resource
    const parentRegistry = scope as Registry;

    this.resource = new resource.Resource(this, "webhook", {
      type: "Microsoft.ContainerRegistry/registries/webhooks@2023-11-01-preview",
      name: props.name,
      parentId: parentRegistry.resource.id,
      body: {
        properties: {
          actions: props.actions,
          customHeaders: props.customHeaders,
          scope: props.scope,
          serviceUri: props.serviceUri,
          status: props.status,
        },
      },
    });
  }
}

export class ScopeMap extends AzureResource {
  public readonly resource: resource.Resource;

  constructor(scope: Construct, id: string, props: ScopeMapProps) {
    super(scope, id);

    // Get the parent registry resource
    const parentRegistry = scope as Registry;

    this.resource = new resource.Resource(this, "scope-map", {
      type: "Microsoft.ContainerRegistry/registries/scopeMaps@2023-11-01-preview",
      name: props.name,
      parentId: parentRegistry.resource.id,
      body: {
        properties: {
          actions: props.actions,
          description: props.description,
        },
      },
    });
  }
}

export class Token extends AzureResource {
  public readonly resource: resource.Resource;

  constructor(scope: Construct, id: string, props: TokenProps) {
    super(scope, id);

    // Get the parent registry resource
    const parentRegistry = scope as Registry;

    this.resource = new resource.Resource(this, "token", {
      type: "Microsoft.ContainerRegistry/registries/tokens@2023-11-01-preview",
      name: props.name,
      parentId: parentRegistry.resource.id,
      body: {
        properties: {
          credentials: props.credentials,
          scopeMapId: props.scopeMapId,
          status: props.status,
        },
      },
    });
  }
}

export class Replication extends AzureResource {
  public readonly resource: resource.Resource;

  constructor(scope: Construct, id: string, props: ReplicationProps) {
    super(scope, id);

    // Get the parent registry resource
    const parentRegistry = scope as Registry;

    this.resource = new resource.Resource(this, "replication", {
      type: "Microsoft.ContainerRegistry/registries/replications@2023-11-01-preview",
      name: props.name,
      location: props.location,
      parentId: parentRegistry.resource.id,
      body: {
        properties: {
          regionEndpointEnabled: props.regionEndpointEnabled,
          zoneRedundancy: props.zoneRedundancy,
        },
      },
      tags: props.tags,
    });
  }
}
