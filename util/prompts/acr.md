import { Construct } from "constructs";
import {
  RegistriesCacheRules,
  RegistriesCacheRulesProps,
} from "./registriescacherules";
import {
  RegistriesConnectedRegistries,
  RegistriesConnectedRegistriesProps,
} from "./registriesconnectedregistries";
import {
  RegistriesCredentialSets,
  RegistriesCredentialSetsProps,
} from "./registriescredentialsets";
import {
  RegistriesExportPipelines,
  RegistriesExportPipelinesProps,
} from "./registriesexportpipelines";
import {
  RegistriesImportPipelines,
  RegistriesImportPipelinesProps,
} from "./registriesimportpipelines";
import {
  RegistriesPipelineRuns,
  RegistriesPipelineRunsProps,
} from "./registriespipelineruns";
import {
  RegistriesPrivateEndpointConnections,
  RegistriesPrivateEndpointConnectionsProps,
} from "./registriesprivateendpointconnections";
import {
  RegistriesReplications,
  RegistriesReplicationsProps,
} from "./registriesreplications";
import {
  RegistriesScopeMaps,
  RegistriesScopeMapsProps,
} from "./registriesscopemaps";
import { RegistriesTokens, RegistriesTokensProps } from "./registriestokens";
import {
  RegistriesWebhooks,
  RegistriesWebhooksProps,
} from "./registrieswebhooks";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesProps extends IAzAPIBaseProps {
  /**
   * The properties of the container registry.
   */
  properties?: RegistryProperties;
  /**
   * The SKU of the container registry.
   */
  sku?: Sku;
}

export interface Sku {
  /**
   * The SKU name of the container registry. Required for registry creation.
   */
  name: string;
}

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

export class Registries extends AzAPIBase {
  /**
       * Constructs a new Registries.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the container registry. Defaults to `RegistryProperties`.
     * `sku` - (Optional) The SKU of the container registry. Defaults to `Sku`.
     *
     * ---
     *
     * The `Sku` block supports the following:

     * `name` - (Required) The SKU name of the container registry. Required for registry creation. Defaults to `string`.
     *
     * ---
     *
     * The `RegistryProperties` block supports the following:

     * `adminUserEnabled` - (Optional) The value that indicates whether the admin user is enabled. Defaults to `boolean`.
     * `anonymousPullEnabled` - (Optional) Enables registry-wide pull from unauthenticated clients. Defaults to `boolean`.
     * `dataEndpointEnabled` - (Optional) Enable a single data endpoint per region for serving data. Defaults to `boolean`.
     * `encryption` - (Optional) The encryption settings of container registry. Defaults to `EncryptionProperty`.
     * `metadataSearch` - (Optional) Determines whether registry artifacts are indexed for metadata search. Defaults to `string`.
     * `networkRuleBypassOptions` - (Optional) Whether to allow trusted Azure services to access a network restricted registry. Defaults to `string`.
     * `networkRuleSet` - (Optional) The network rule set for a container registry. Defaults to `NetworkRuleSet`.
     * `policies` - (Optional) The policies for a container registry. Defaults to `Policies`.
     * `publicNetworkAccess` - (Optional) Whether or not public network access is allowed for the container registry. Defaults to `string`.
     * `zoneRedundancy` - (Optional) Whether or not zone redundancy is enabled for this container registry Defaults to `string`.
     *
     * ---
     *
     * The `Policies` block supports the following:

     * `azureADAuthenticationAsArmPolicy` - (Optional) The policy for using ARM audience token for a container registry. Defaults to `AzureAdAuthenticationAsArmPolicy`.
     * `exportPolicy` - (Optional) The export policy for a container registry. Defaults to `ExportPolicy`.
     * `quarantinePolicy` - (Optional) The quarantine policy for a container registry. Defaults to `QuarantinePolicy`.
     * `retentionPolicy` - (Optional) The retention policy for a container registry. Defaults to `RetentionPolicy`.
     * `softDeletePolicy` - (Optional) The soft delete policy for a container registry. Defaults to `SoftDeletePolicy`.
     * `trustPolicy` - (Optional) The content trust policy for a container registry. Defaults to `TrustPolicy`.
     *
     * ---
     *
     * The `TrustPolicy` block supports the following:

     * `status` - (Optional) The value that indicates whether the policy is enabled or not. Defaults to `string`.
     * `type` - (Optional) The type of trust policy. Defaults to `string`.
     *
     * ---
     *
     * The `SoftDeletePolicy` block supports the following:

     * `retentionDays` - (Optional) The number of days after which a soft-deleted item is permanently deleted. Defaults to `integer`.
     * `status` - (Optional) The value that indicates whether the policy is enabled or not. Defaults to `string`.
     *
     * ---
     *
     * The `RetentionPolicy` block supports the following:

     * `days` - (Optional) The number of days to retain an untagged manifest after which it gets purged. Defaults to `integer`.
     * `status` - (Optional) The value that indicates whether the policy is enabled or not. Defaults to `string`.
     *
     * ---
     *
     * The `QuarantinePolicy` block supports the following:

     * `status` - (Optional) The value that indicates whether the policy is enabled or not. Defaults to `string`.
     *
     * ---
     *
     * The `ExportPolicy` block supports the following:

     * `status` - (Optional) The value that indicates whether the policy is enabled or not. Defaults to `string`.
     *
     * ---
     *
     * The `AzureADAuthenticationAsArmPolicy` block supports the following:

     * `status` - (Optional) The value that indicates whether the policy is enabled or not. Defaults to `string`.
     *
     * ---
     *
     * The `NetworkRuleSet` block supports the following:

     * `defaultAction` - (Required) The default action of allow or deny when no other rules match. Defaults to `string`.
     * `ipRules` - (Optional) The IP ACL rules. Defaults to `IpRule[]`.
     *
     * ---
     *
     * The `IPRule[]` block supports the following:

     * `action` - (Optional) The action of IP ACL rule. Defaults to `string`.
     * `value` - (Required) Specifies the IP or IP range in CIDR format. Only IPV4 address is allowed. Defaults to `string`.
     *
     * ---
     *
     * The `EncryptionProperty` block supports the following:

     * `keyVaultProperties` - (Optional) Key vault properties. Defaults to `KeyVaultProperties`.
     * `status` - (Optional) Indicates whether or not the encryption is enabled for container registry. Defaults to `string`.
     *
     * ---
     *
     * The `KeyVaultProperties` block supports the following:

     * `identity` - (Optional) The client id of the identity which will be used to access key vault. Defaults to `string`.
     * `keyIdentifier` - (Optional) Key vault uri to access the encryption key. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: RegistriesProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesProps) {
    return {
      properties: props.properties,
      sku: props.sku,
    };
  }
  public addRegistriesTokens(props: RegistriesTokensProps): RegistriesTokens {
    return new RegistriesTokens(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesWebhooks(
    props: RegistriesWebhooksProps,
  ): RegistriesWebhooks {
    return new RegistriesWebhooks(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesScopeMaps(
    props: RegistriesScopeMapsProps,
  ): RegistriesScopeMaps {
    return new RegistriesScopeMaps(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesCacheRules(
    props: RegistriesCacheRulesProps,
  ): RegistriesCacheRules {
    return new RegistriesCacheRules(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesPipelineRuns(
    props: RegistriesPipelineRunsProps,
  ): RegistriesPipelineRuns {
    return new RegistriesPipelineRuns(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesReplications(
    props: RegistriesReplicationsProps,
  ): RegistriesReplications {
    return new RegistriesReplications(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesCredentialSets(
    props: RegistriesCredentialSetsProps,
  ): RegistriesCredentialSets {
    return new RegistriesCredentialSets(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesExportPipelines(
    props: RegistriesExportPipelinesProps,
  ): RegistriesExportPipelines {
    return new RegistriesExportPipelines(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesImportPipelines(
    props: RegistriesImportPipelinesProps,
  ): RegistriesImportPipelines {
    return new RegistriesImportPipelines(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesConnectedRegistries(
    props: RegistriesConnectedRegistriesProps,
  ): RegistriesConnectedRegistries {
    return new RegistriesConnectedRegistries(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addRegistriesPrivateEndpointConnections(
    props: RegistriesPrivateEndpointConnectionsProps,
  ): RegistriesPrivateEndpointConnections {
    return new RegistriesPrivateEndpointConnections(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesCacheRulesProps extends IAzAPIBaseProps {
  /**
   * The properties of the cache rule.
   */
  properties?: CacheRuleProperties;
}

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
    Eg: docker pull myregistry.azurecr.io/{targetRepository}:{tag}
    */
  targetRepository?: string;
}

export class RegistriesCacheRules extends AzAPIBase {
  /**
       * Constructs a new RegistriesCacheRules.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/cacheRules@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the cache rule. Defaults to `CacheRuleProperties`.
     *
     * ---
     *
     * The `CacheRuleProperties` block supports the following:

     * `credentialSetResourceId` - (Optional) The ARM resource ID of the credential store which is associated with the cache rule. Defaults to `string`.
     * `sourceRepository` - (Optional) Source repository pulled from upstream. Defaults to `string`.
     * `targetRepository` - (Optional) Target repository specified in docker pull command.
    Eg: docker pull myregistry.azurecr.io/{targetRepository}:{tag} Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: RegistriesCacheRulesProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/cacheRules@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesCacheRulesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesConnectedRegistriesProps extends IAzAPIBaseProps {
  /**
   * The properties of the connected registry.
   */
  properties: ConnectedRegistryProperties;
}

export interface ConnectedRegistryProperties {
  /**
   * The list of the ACR token resource IDs used to authenticate clients to the connected registry.
   */
  clientTokenIds?: string[];
  /**
   * The logging properties of the connected registry.
   */
  logging?: LoggingProperties;
  /**
   * The login server properties of the connected registry.
   */
  loginServer?: LoginServerProperties;
  /**
   * The mode of the connected registry resource that indicates the permissions of the registry.
   */
  mode: string;
  /**
   * The list of notifications subscription information for the connected registry.
   */
  notificationsList?: string[];
  /**
   * The parent of the connected registry.
   */
  parent: ParentProperties;
}

export interface ParentProperties {
  /**
   * The resource ID of the parent to which the connected registry will be associated.
   */
  id?: string;
  /**
   * The sync properties of the connected registry with its parent.
   */
  syncProperties: SyncProperties;
}

export interface SyncProperties {
  /**
   * The period of time for which a message is available to sync before it is expired. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601.
   */
  messageTtl: string;
  /**
   * The cron expression indicating the schedule that the connected registry will sync with its parent.
   */
  schedule?: string;
  /**
   * The time window during which sync is enabled for each schedule occurrence. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601.
   */
  syncWindow?: string;
  /**
   * The resource ID of the ACR token used to authenticate the connected registry to its parent during sync.
   */
  tokenId: string;
}

export interface LoginServerProperties {}

export interface LoggingProperties {
  /**
   * Indicates whether audit logs are enabled on the connected registry.
   */
  auditLogStatus?: string;
  /**
   * The verbosity of logs persisted on the connected registry.
   */
  logLevel?: string;
}

export class RegistriesConnectedRegistries extends AzAPIBase {
  /**
       * Constructs a new RegistriesConnectedRegistries.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/connectedRegistries@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the connected registry. Defaults to `ConnectedRegistryProperties`.
     *
     * ---
     *
     * The `ConnectedRegistryProperties` block supports the following:

     * `clientTokenIds` - (Optional) The list of the ACR token resource IDs used to authenticate clients to the connected registry. Defaults to `string[]`.
     * `logging` - (Optional) The logging properties of the connected registry. Defaults to `LoggingProperties`.
     * `loginServer` - (Optional) The login server properties of the connected registry. Defaults to `LoginServerProperties`.
     * `mode` - (Required) The mode of the connected registry resource that indicates the permissions of the registry. Defaults to `string`.
     * `notificationsList` - (Optional) The list of notifications subscription information for the connected registry. Defaults to `string[]`.
     * `parent` - (Required) The parent of the connected registry. Defaults to `ParentProperties`.
     *
     * ---
     *
     * The `ParentProperties` block supports the following:

     * `id` - (Optional) The resource ID of the parent to which the connected registry will be associated. Defaults to `string`.
     * `syncProperties` - (Required) The sync properties of the connected registry with its parent. Defaults to `SyncProperties`.
     *
     * ---
     *
     * The `SyncProperties` block supports the following:

     * `messageTtl` - (Required) The period of time for which a message is available to sync before it is expired. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601. Defaults to `string`.
     * `schedule` - (Optional) The cron expression indicating the schedule that the connected registry will sync with its parent. Defaults to `string`.
     * `syncWindow` - (Optional) The time window during which sync is enabled for each schedule occurrence. Specify the duration using the format P[n]Y[n]M[n]DT[n]H[n]M[n]S as per ISO8601. Defaults to `string`.
     * `tokenId` - (Required) The resource ID of the ACR token used to authenticate the connected registry to its parent during sync. Defaults to `string`.
     *
     * ---
     *
     * The `LoginServerProperties` block supports the following:

     *
     * ---
     *
     * The `LoggingProperties` block supports the following:

     * `auditLogStatus` - (Optional) Indicates whether audit logs are enabled on the connected registry. Defaults to `string`.
     * `logLevel` - (Optional) The verbosity of logs persisted on the connected registry. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesConnectedRegistriesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/connectedRegistries@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesConnectedRegistriesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesCredentialSetsProps extends IAzAPIBaseProps {
  /**
   * The properties of the credential set.
   */
  properties?: CredentialSetProperties;
}

export interface CredentialSetProperties {
  /**
    * List of authentication credentials stored for an upstream.
    Usually consists of a primary and an optional secondary credential.
    */
  authCredentials?: AuthCredential[];
  /**
   * The credentials are stored for this upstream or login server.
   */
  loginServer?: string;
}

export interface AuthCredential {
  /**
   * The name of the credential.
   */
  name?: string;
  /**
   * KeyVault Secret URI for accessing the password.
   */
  passwordSecretIdentifier?: string;
  /**
   * KeyVault Secret URI for accessing the username.
   */
  usernameSecretIdentifier?: string;
}

export class RegistriesCredentialSets extends AzAPIBase {
  /**
       * Constructs a new RegistriesCredentialSets.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/credentialSets@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the credential set. Defaults to `CredentialSetProperties`.
     *
     * ---
     *
     * The `CredentialSetProperties` block supports the following:

     * `authCredentials` - (Optional) List of authentication credentials stored for an upstream.
    Usually consists of a primary and an optional secondary credential. Defaults to `AuthCredential[]`.
     * `loginServer` - (Optional) The credentials are stored for this upstream or login server. Defaults to `string`.
     *
     * ---
     *
     * The `AuthCredential[]` block supports the following:

     * `name` - (Optional) The name of the credential. Defaults to `string`.
     * `passwordSecretIdentifier` - (Optional) KeyVault Secret URI for accessing the password. Defaults to `string`.
     * `usernameSecretIdentifier` - (Optional) KeyVault Secret URI for accessing the username. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesCredentialSetsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/credentialSets@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesCredentialSetsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesCredentialSetsProps extends IAzAPIBaseProps {
  /**
   * The properties of the credential set.
   */
  properties?: CredentialSetProperties;
}

export interface CredentialSetProperties {
  /**
    * List of authentication credentials stored for an upstream.
    Usually consists of a primary and an optional secondary credential.
    */
  authCredentials?: AuthCredential[];
  /**
   * The credentials are stored for this upstream or login server.
   */
  loginServer?: string;
}

export interface AuthCredential {
  /**
   * The name of the credential.
   */
  name?: string;
  /**
   * KeyVault Secret URI for accessing the password.
   */
  passwordSecretIdentifier?: string;
  /**
   * KeyVault Secret URI for accessing the username.
   */
  usernameSecretIdentifier?: string;
}

export class RegistriesCredentialSets extends AzAPIBase {
  /**
       * Constructs a new RegistriesCredentialSets.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/credentialSets@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the credential set. Defaults to `CredentialSetProperties`.
     *
     * ---
     *
     * The `CredentialSetProperties` block supports the following:

     * `authCredentials` - (Optional) List of authentication credentials stored for an upstream.
    Usually consists of a primary and an optional secondary credential. Defaults to `AuthCredential[]`.
     * `loginServer` - (Optional) The credentials are stored for this upstream or login server. Defaults to `string`.
     *
     * ---
     *
     * The `AuthCredential[]` block supports the following:

     * `name` - (Optional) The name of the credential. Defaults to `string`.
     * `passwordSecretIdentifier` - (Optional) KeyVault Secret URI for accessing the password. Defaults to `string`.
     * `usernameSecretIdentifier` - (Optional) KeyVault Secret URI for accessing the username. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesCredentialSetsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/credentialSets@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesCredentialSetsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesExportPipelinesProps extends IAzAPIBaseProps {
  /**
   * The properties of the export pipeline.
   */
  properties: ExportPipelineProperties;
}

export interface ExportPipelineProperties {
  /**
   * The list of all options configured for the pipeline.
   */
  options?: string[];
  /**
   * The target properties of the export pipeline.
   */
  target: ExportPipelineTargetProperties;
}

export interface ExportPipelineTargetProperties {
  /**
   * They key vault secret uri to obtain the target storage SAS token.
   */
  keyVaultUri: string;
  /**
   * The type of target for the export pipeline.
   */
  type?: string;
  /**
    * The target uri of the export pipeline.
    When 'AzureStorageBlob': "https://accountName.blob.core.windows.net/containerName/blobName"
    When 'AzureStorageBlobContainer':  "https://accountName.blob.core.windows.net/containerName"
    */
  uri?: string;
}

export class RegistriesExportPipelines extends AzAPIBase {
  /**
       * Constructs a new RegistriesExportPipelines.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/exportPipelines@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the export pipeline. Defaults to `ExportPipelineProperties`.
     *
     * ---
     *
     * The `ExportPipelineProperties` block supports the following:

     * `options` - (Optional) The list of all options configured for the pipeline. Defaults to `string[]`.
     * `target` - (Required) The target properties of the export pipeline. Defaults to `ExportPipelineTargetProperties`.
     *
     * ---
     *
     * The `ExportPipelineTargetProperties` block supports the following:

     * `keyVaultUri` - (Required) They key vault secret uri to obtain the target storage SAS token. Defaults to `string`.
     * `type` - (Optional) The type of target for the export pipeline. Defaults to `string`.
     * `uri` - (Optional) The target uri of the export pipeline.
    When 'AzureStorageBlob': "https://accountName.blob.core.windows.net/containerName/blobName"
    When 'AzureStorageBlobContainer':  "https://accountName.blob.core.windows.net/containerName" Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesExportPipelinesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/exportPipelines@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesExportPipelinesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesImportPipelinesProps extends IAzAPIBaseProps {
  /**
   * The properties of the import pipeline.
   */
  properties: ImportPipelineProperties;
}

export interface ImportPipelineProperties {
  /**
   * The list of all options configured for the pipeline.
   */
  options?: string[];
  /**
   * The source properties of the import pipeline.
   */
  source: ImportPipelineSourceProperties;
  /**
   * The properties that describe the trigger of the import pipeline.
   */
  trigger?: PipelineTriggerProperties;
}

export interface PipelineTriggerProperties {
  /**
   * The source trigger properties of the pipeline.
   */
  sourceTrigger?: PipelineSourceTriggerProperties;
}

export interface PipelineSourceTriggerProperties {
  /**
   * The current status of the source trigger.
   */
  status: string;
}

export interface ImportPipelineSourceProperties {
  /**
   * They key vault secret uri to obtain the source storage SAS token.
   */
  keyVaultUri: string;
  /**
   * The type of source for the import pipeline.
   */
  type?: string;
  /**
    * The source uri of the import pipeline.
    When 'AzureStorageBlob': "https://accountName.blob.core.windows.net/containerName/blobName"
    When 'AzureStorageBlobContainer': "https://accountName.blob.core.windows.net/containerName"
    */
  uri?: string;
}

export class RegistriesImportPipelines extends AzAPIBase {
  /**
       * Constructs a new RegistriesImportPipelines.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/importPipelines@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the import pipeline. Defaults to `ImportPipelineProperties`.
     *
     * ---
     *
     * The `ImportPipelineProperties` block supports the following:

     * `options` - (Optional) The list of all options configured for the pipeline. Defaults to `string[]`.
     * `source` - (Required) The source properties of the import pipeline. Defaults to `ImportPipelineSourceProperties`.
     * `trigger` - (Optional) The properties that describe the trigger of the import pipeline. Defaults to `PipelineTriggerProperties`.
     *
     * ---
     *
     * The `PipelineTriggerProperties` block supports the following:

     * `sourceTrigger` - (Optional) The source trigger properties of the pipeline. Defaults to `PipelineSourceTriggerProperties`.
     *
     * ---
     *
     * The `PipelineSourceTriggerProperties` block supports the following:

     * `status` - (Required) The current status of the source trigger. Defaults to `string`.
     *
     * ---
     *
     * The `ImportPipelineSourceProperties` block supports the following:

     * `keyVaultUri` - (Required) They key vault secret uri to obtain the source storage SAS token. Defaults to `string`.
     * `type` - (Optional) The type of source for the import pipeline. Defaults to `string`.
     * `uri` - (Optional) The source uri of the import pipeline.
    When 'AzureStorageBlob': "https://accountName.blob.core.windows.net/containerName/blobName"
    When 'AzureStorageBlobContainer': "https://accountName.blob.core.windows.net/containerName" Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesImportPipelinesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/importPipelines@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesImportPipelinesProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import {
  RegistriesPackagesArchivesVersions,
  RegistriesPackagesArchivesVersionsProps,
} from "./registriespackagesarchivesversions";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesPackagesArchivesProps extends IAzAPIBaseProps {
  /**
   * The properties of the archive.
   */
  properties?: ArchiveProperties;
}

export interface ArchiveProperties {
  /**
   * The package source of the archive.
   */
  packageSource?: ArchivePackageSourceProperties;
  /**
   * The published version of the archive.
   */
  publishedVersion?: string;
  /**
   *
   */
  repositoryEndpointPrefix?: string;
}

export interface ArchivePackageSourceProperties {
  /**
   * The type of package source for a archive.
   */
  type?: string;
  /**
   * The external repository url.
   */
  url?: string;
}

export class RegistriesPackagesArchives extends AzAPIBase {
  /**
       * Constructs a new RegistriesPackagesArchives.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/packages/archives@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the archive. Defaults to `ArchiveProperties`.
     *
     * ---
     *
     * The `ArchiveProperties` block supports the following:

     * `packageSource` - (Optional) The package source of the archive. Defaults to `ArchivePackageSourceProperties`.
     * `publishedVersion` - (Optional) The published version of the archive. Defaults to `string`.
     * `repositoryEndpointPrefix` - (Optional)  Defaults to `string`.
     *
     * ---
     *
     * The `ArchivePackageSourceProperties` block supports the following:

     * `type` - (Optional) The type of package source for a archive. Defaults to `string`.
     * `url` - (Optional) The external repository url. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesPackagesArchivesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/packages/archives@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesPackagesArchivesProps) {
    return {
      properties: props.properties,
    };
  }
  public addRegistriesPackagesArchivesVersions(
    props: RegistriesPackagesArchivesVersionsProps,
  ): RegistriesPackagesArchivesVersions {
    return new RegistriesPackagesArchivesVersions(this, props.name, {
      name: props.name,
      parentId: this.id,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesPackagesArchivesVersionsProps
  extends IAzAPIBaseProps {}

export class RegistriesPackagesArchivesVersions extends AzAPIBase {
  /**
   * Constructs a new RegistriesPackagesArchivesVersions.
   *
   * @param scope - The scope in which to define this construct.
   * @param id - The ID of this construct.
   * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/packages/archives/versions@2023-11-01-preview. The properties include:
   *
   */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesPackagesArchivesVersionsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/packages/archives/versions@2023-11-01-preview";
  }
  protected getResourceBody(): { [key: string]: any } {
    return {};
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesPipelineRunsProps extends IAzAPIBaseProps {
  /**
   * The properties of a pipeline run.
   */
  properties?: PipelineRunProperties;
}

export interface PipelineRunProperties {
  /**
   * How the pipeline run should be forced to recreate even if the pipeline run configuration has not changed.
   */
  forceUpdateTag?: string;
  /**
   * The request parameters for a pipeline run.
   */
  request?: PipelineRunRequest;
}

export interface PipelineRunRequest {
  /**
    * List of source artifacts to be transferred by the pipeline.
    Specify an image by repository ('hello-world'). This will use the 'latest' tag.
    Specify an image by tag ('hello-world:latest').
    Specify an image by sha256-based manifest digest ('hello-world@sha256:abc123').
    */
  artifacts?: string[];
  /**
   * The digest of the tar used to transfer the artifacts.
   */
  catalogDigest?: string;
  /**
   * The resource ID of the pipeline to run.
   */
  pipelineResourceId?: string;
  /**
   * The source properties of the pipeline run.
   */
  source?: PipelineRunSourceProperties;
  /**
   * The target properties of the pipeline run.
   */
  target?: PipelineRunTargetProperties;
}

export interface PipelineRunTargetProperties {
  /**
   * The name of the target.
   */
  name?: string;
  /**
   * The type of the target.
   */
  type?: string;
}

export interface PipelineRunSourceProperties {
  /**
   * The name of the source.
   */
  name?: string;
  /**
   * The type of the source.
   */
  type?: string;
}

export class RegistriesPipelineRuns extends AzAPIBase {
  /**
       * Constructs a new RegistriesPipelineRuns.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/pipelineRuns@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of a pipeline run. Defaults to `PipelineRunProperties`.
     *
     * ---
     *
     * The `PipelineRunProperties` block supports the following:

     * `forceUpdateTag` - (Optional) How the pipeline run should be forced to recreate even if the pipeline run configuration has not changed. Defaults to `string`.
     * `request` - (Optional) The request parameters for a pipeline run. Defaults to `PipelineRunRequest`.
     *
     * ---
     *
     * The `PipelineRunRequest` block supports the following:

     * `artifacts` - (Optional) List of source artifacts to be transferred by the pipeline.
    Specify an image by repository ('hello-world'). This will use the 'latest' tag.
    Specify an image by tag ('hello-world:latest').
    Specify an image by sha256-based manifest digest ('hello-world@sha256:abc123'). Defaults to `string[]`.
     * `catalogDigest` - (Optional) The digest of the tar used to transfer the artifacts. Defaults to `string`.
     * `pipelineResourceId` - (Optional) The resource ID of the pipeline to run. Defaults to `string`.
     * `source` - (Optional) The source properties of the pipeline run. Defaults to `PipelineRunSourceProperties`.
     * `target` - (Optional) The target properties of the pipeline run. Defaults to `PipelineRunTargetProperties`.
     *
     * ---
     *
     * The `PipelineRunTargetProperties` block supports the following:

     * `name` - (Optional) The name of the target. Defaults to `string`.
     * `type` - (Optional) The type of the target. Defaults to `string`.
     *
     * ---
     *
     * The `PipelineRunSourceProperties` block supports the following:

     * `name` - (Optional) The name of the source. Defaults to `string`.
     * `type` - (Optional) The type of the source. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesPipelineRunsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/pipelineRuns@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesPipelineRunsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesPrivateEndpointConnectionsProps
  extends IAzAPIBaseProps {
  /**
   * The properties of a private endpoint connection.
   */
  properties?: PrivateEndpointConnectionProperties;
}

export interface PrivateEndpointConnectionProperties {
  /**
   * The resource of private endpoint.
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
  actionsRequired?: string;
  /**
   * The description for connection status. For example if connection is rejected it can indicate reason for rejection.
   */
  description?: string;
  /**
   * The private link service connection status.
   */
  status?: string;
}

export interface PrivateEndpoint {
  /**
   * This is private endpoint resource created with Microsoft.Network resource provider.
   */
  id?: string;
}

export class RegistriesPrivateEndpointConnections extends AzAPIBase {
  /**
       * Constructs a new RegistriesPrivateEndpointConnections.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/privateEndpointConnections@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of a private endpoint connection. Defaults to `PrivateEndpointConnectionProperties`.
     *
     * ---
     *
     * The `PrivateEndpointConnectionProperties` block supports the following:

     * `privateEndpoint` - (Optional) The resource of private endpoint. Defaults to `PrivateEndpoint`.
     * `privateLinkServiceConnectionState` - (Optional) A collection of information about the state of the connection between service consumer and provider. Defaults to `PrivateLinkServiceConnectionState`.
     *
     * ---
     *
     * The `PrivateLinkServiceConnectionState` block supports the following:

     * `actionsRequired` - (Optional) A message indicating if changes on the service provider require any updates on the consumer. Defaults to `string`.
     * `description` - (Optional) The description for connection status. For example if connection is rejected it can indicate reason for rejection. Defaults to `string`.
     * `status` - (Optional) The private link service connection status. Defaults to `string`.
     *
     * ---
     *
     * The `PrivateEndpoint` block supports the following:

     * `id` - (Optional) This is private endpoint resource created with Microsoft.Network resource provider. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesPrivateEndpointConnectionsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/privateEndpointConnections@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesPrivateEndpointConnectionsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesReplicationsProps extends IAzAPIBaseProps {
  /**
   * The properties of the replication.
   */
  properties?: ReplicationProperties;
}

export interface ReplicationProperties {
  /**
   * Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications.
   */
  regionEndpointEnabled?: boolean;
  /**
   * Whether or not zone redundancy is enabled for this container registry replication
   */
  zoneRedundancy?: string;
}

export class RegistriesReplications extends AzAPIBase {
  /**
       * Constructs a new RegistriesReplications.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/replications@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the replication. Defaults to `ReplicationProperties`.
     *
     * ---
     *
     * The `ReplicationProperties` block supports the following:

     * `regionEndpointEnabled` - (Optional) Specifies whether the replication's regional endpoint is enabled. Requests will not be routed to a replication whose regional endpoint is disabled, however its data will continue to be synced with other replications. Defaults to `boolean`.
     * `zoneRedundancy` - (Optional) Whether or not zone redundancy is enabled for this container registry replication Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: RegistriesReplicationsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/replications@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesReplicationsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesScopeMapsProps extends IAzAPIBaseProps {
  /**
   * The properties of the scope map.
   */
  properties: ScopeMapProperties;
}

export interface ScopeMapProperties {
  /**
    * The list of scoped permissions for registry artifacts.
    E.g. repositories/repository-name/content/read,
    repositories/repository-name/metadata/write
    */
  actions: string[];
  /**
   * The user friendly description of the scope map.
   */
  description?: string;
}

export class RegistriesScopeMaps extends AzAPIBase {
  /**
       * Constructs a new RegistriesScopeMaps.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/scopeMaps@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the scope map. Defaults to `ScopeMapProperties`.
     *
     * ---
     *
     * The `ScopeMapProperties` block supports the following:

     * `actions` - (Required) The list of scoped permissions for registry artifacts.
    E.g. repositories/repository-name/content/read,
    repositories/repository-name/metadata/write Defaults to `string[]`.
     * `description` - (Optional) The user friendly description of the scope map. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: RegistriesScopeMapsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/scopeMaps@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesScopeMapsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesTokensProps extends IAzAPIBaseProps {
  /**
   * The properties of the token.
   */
  properties?: TokenProperties;
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

export interface TokenCertificate {
  /**
   * Base 64 encoded string of the public certificate1 in PEM format that will be used for authenticating the token.
   */
  encodedPemCertificate?: string;
  /**
   * The expiry datetime of the certificate.
   */
  expiry?: string;
  /**
   *
   */
  name?: string;
  /**
   * The thumbprint of the certificate.
   */
  thumbprint?: string;
}

export class RegistriesTokens extends AzAPIBase {
  /**
       * Constructs a new RegistriesTokens.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/tokens@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties of the token. Defaults to `TokenProperties`.
     *
     * ---
     *
     * The `TokenProperties` block supports the following:

     * `credentials` - (Optional) The credentials that can be used for authenticating the token. Defaults to `TokenCredentialsProperties`.
     * `scopeMapId` - (Optional) The resource ID of the scope map to which the token will be associated with. Defaults to `string`.
     * `status` - (Optional) The status of the token example enabled or disabled. Defaults to `string`.
     *
     * ---
     *
     * The `TokenCredentialsProperties` block supports the following:

     * `certificates` - (Optional) Array of TokenCertificate Defaults to `TokenCertificate[]`.
     * `passwords` - (Optional) Array of TokenPassword Defaults to `TokenPassword[]`.
     *
     * ---
     *
     * The `TokenPassword[]` block supports the following:

     * `creationTime` - (Optional) The creation datetime of the password. Defaults to `string`.
     * `expiry` - (Optional) The expiry datetime of the password. Defaults to `string`.
     * `name` - (Optional) The password name "password1" or "password2" Defaults to `string`.
     *
     * ---
     *
     * The `TokenCertificate[]` block supports the following:

     * `encodedPemCertificate` - (Optional) Base 64 encoded string of the public certificate1 in PEM format that will be used for authenticating the token. Defaults to `string`.
     * `expiry` - (Optional) The expiry datetime of the certificate. Defaults to `string`.
     * `name` - (Optional)  Defaults to `string`.
     * `thumbprint` - (Optional) The thumbprint of the certificate. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: RegistriesTokensProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/tokens@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesTokensProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface RegistriesWebhooksProps extends IAzAPIBaseProps {
  /**
   * The properties that the webhook will be created with.
   */
  properties: WebhookPropertiesCreateParameters;
}

export interface WebhookPropertiesCreateParameters {
  /**
   * The list of actions that trigger the webhook to post notifications.
   */
  actions: string[];
  /**
   * Custom headers that will be added to the webhook notifications.
   */
  customHeaders?: object | string | boolean | number;
  /**
   * The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events.
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

export class RegistriesWebhooks extends AzAPIBase {
  /**
       * Constructs a new RegistriesWebhooks.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerRegistry/registries/webhooks@2023-11-01-preview. The properties include:
     * `properties` - (Required) The properties that the webhook will be created with. Defaults to `WebhookPropertiesCreateParameters`.
     *
     * ---
     *
     * The `WebhookPropertiesCreateParameters` block supports the following:

     * `actions` - (Required) The list of actions that trigger the webhook to post notifications. Defaults to `string[]`.
     * `customHeaders` - (Optional) Custom headers that will be added to the webhook notifications. Defaults to `object`.
     * `scope` - (Optional) The scope of repositories where the event can be triggered. For example, 'foo:*' means events for all tags under repository 'foo'. 'foo:bar' means events for 'foo:bar' only. 'foo' is equivalent to 'foo:latest'. Empty means all events. Defaults to `string`.
     * `serviceUri` - (Required) The service URI for the webhook to post notifications. Defaults to `string`.
     * `status` - (Optional) The status of the webhook at the time the operation was called. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: RegistriesWebhooksProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerRegistry/registries/webhooks@2023-11-01-preview";
  }
  protected getResourceBody(props: RegistriesWebhooksProps) {
    return {
      properties: props.properties,
    };
  }
}
