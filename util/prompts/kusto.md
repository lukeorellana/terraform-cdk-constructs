import { Construct } from "constructs";
import {
  ClustersAttachedDatabaseConfigurations,
  ClustersAttachedDatabaseConfigurationsProps,
} from "./clustersattacheddatabaseconfigurations";
import { ClustersDatabases, ClustersDatabasesProps } from "./clustersdatabases";
import {
  ClustersDataConnections,
  ClustersDataConnectionsProps,
} from "./clustersdataconnections";
import {
  ClustersManagedPrivateEndpoints,
  ClustersManagedPrivateEndpointsProps,
} from "./clustersmanagedprivateendpoints";
import {
  ClustersPrincipalAssignments,
  ClustersPrincipalAssignmentsProps,
} from "./clustersprincipalassignments";
import {
  ClustersPrivateEndpointConnections,
  ClustersPrivateEndpointConnectionsProps,
} from "./clustersprivateendpointconnections";
import {
  ClustersSandboxCustomImages,
  ClustersSandboxCustomImagesProps,
} from "./clusterssandboxcustomimages";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersProps extends IAzAPIBaseProps {
  /**
   * The cluster properties.
   */
  properties?: ClusterProperties;
  /**
   * The SKU of the cluster.
   */
  sku?: AzureSku;
  /**
   * The availability zones of the cluster.
   */
  zones?: string[];
}

export interface AzureSku {
  /**
   * The number of instances of the cluster.
   */
  capacity?: number;
  /**
   * SKU name.
   */
  name: string;
  /**
   * SKU tier.
   */
  tier: string;
}

export interface ClusterProperties {
  /**
   * The cluster's accepted audiences.
   */
  acceptedAudiences?: AcceptedAudiences[];
  /**
   * List of allowed FQDNs(Fully Qualified Domain Name) for egress from Cluster.
   */
  allowedFqdnList?: string[];
  /**
   * The list of ips in the format of CIDR allowed to connect to the cluster.
   */
  allowedIpRangeList?: string[];
  /**
   * A boolean value that indicates if the cluster could be automatically stopped (due to lack of data or no activity for many days).
   */
  enableAutoStop?: boolean;
  /**
   * A boolean value that indicates if the cluster's disks are encrypted.
   */
  enableDiskEncryption?: boolean;
  /**
   * A boolean value that indicates if double encryption is enabled.
   */
  enableDoubleEncryption?: boolean;
  /**
   * A boolean value that indicates if the purge operations are enabled.
   */
  enablePurge?: boolean;
  /**
   * A boolean value that indicates if the streaming ingest is enabled.
   */
  enableStreamingIngest?: boolean;
  /**
   * The engine type
   */
  engineType?: string;
  /**
   * KeyVault properties for the cluster encryption.
   */
  keyVaultProperties?: KeyVaultProperties;
  /**
   * List of the cluster's language extensions.
   */
  languageExtensions?: LanguageExtensionsList;
  /**
   * Optimized auto scale definition.
   */
  optimizedAutoscale?: OptimizedAutoscale;
  /**
   * Indicates what public IP type to create - IPv4 (default), or DualStack (both IPv4 and IPv6)
   */
  publicIPType?: string;
  /**
   * Public network access to the cluster is enabled by default. When disabled, only private endpoint connection to the cluster is allowed
   */
  publicNetworkAccess?: string;
  /**
   * Whether or not to restrict outbound network access.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'
   */
  restrictOutboundNetworkAccess?: string;
  /**
   * The cluster's external tenants.
   */
  trustedExternalTenants?: TrustedExternalTenant[];
  /**
   * Virtual Cluster graduation properties
   */
  virtualClusterGraduationProperties?: string;
  /**
   * Virtual network definition.
   */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
}

export interface VirtualNetworkConfiguration {
  /**
   * Data management's service public IP address resource id.
   */
  dataManagementPublicIpId: string;
  /**
   * Engine service's public IP address resource id.
   */
  enginePublicIpId: string;
  /**
   * When enabled, the cluster is deployed into the configured subnet, when disabled it will be removed from the subnet.
   */
  state?: string;
  /**
   * The subnet resource id.
   */
  subnetId: string;
}

export interface TrustedExternalTenant {
  /**
   * GUID representing an external tenant.
   */
  value?: string;
}

export interface OptimizedAutoscale {
  /**
   * A boolean value that indicate if the optimized autoscale feature is enabled or not.
   */
  isEnabled: boolean;
  /**
   * Maximum allowed instances count.
   */
  maximum: number;
  /**
   * Minimum allowed instances count.
   */
  minimum: number;
  /**
   * The version of the template defined, for instance 1.
   */
  version: number;
}

export interface LanguageExtensionsList {
  /**
   * The list of language extensions.
   */
  value?: LanguageExtension[];
}

export interface LanguageExtension {
  /**
   * The language extension custom image name.
   */
  languageExtensionCustomImageName?: string;
  /**
   * The language extension image name.
   */
  languageExtensionImageName?: string;
  /**
   * The language extension name.
   */
  languageExtensionName?: string;
}

export interface KeyVaultProperties {
  /**
   * The name of the key vault key.
   */
  keyName?: string;
  /**
   * The Uri of the key vault.
   */
  keyVaultUri?: string;
  /**
   * The version of the key vault key.
   */
  keyVersion?: string;
  /**
   * The user assigned identity (ARM resource id) that has access to the key.
   */
  userIdentity?: string;
}

export interface AcceptedAudiences {
  /**
   * GUID or valid URL representing an accepted audience.
   */
  value?: string;
}

export class Clusters extends AzAPIBase {
  /**
       * Constructs a new Clusters.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Kusto/clusters@2023-08-15. The properties include:
     * `properties` - (Optional) The cluster properties. Defaults to `ClusterProperties`.
     * `sku` - (Optional) The SKU of the cluster. Defaults to `AzureSku`.
     * `zones` - (Optional) The availability zones of the cluster. Defaults to `string[]`.
     *
     * ---
     *
     * The `AzureSku` block supports the following:

     * `capacity` - (Optional) The number of instances of the cluster. Defaults to `integer`.
     * `name` - (Required) SKU name. Defaults to `string`.
     * `tier` - (Required) SKU tier. Defaults to `string`.
     *
     * ---
     *
     * The `ClusterProperties` block supports the following:

     * `acceptedAudiences` - (Optional) The cluster's accepted audiences. Defaults to `AcceptedAudiences[]`.
     * `allowedFqdnList` - (Optional) List of allowed FQDNs(Fully Qualified Domain Name) for egress from Cluster. Defaults to `string[]`.
     * `allowedIpRangeList` - (Optional) The list of ips in the format of CIDR allowed to connect to the cluster. Defaults to `string[]`.
     * `enableAutoStop` - (Optional) A boolean value that indicates if the cluster could be automatically stopped (due to lack of data or no activity for many days). Defaults to `boolean`.
     * `enableDiskEncryption` - (Optional) A boolean value that indicates if the cluster's disks are encrypted. Defaults to `boolean`.
     * `enableDoubleEncryption` - (Optional) A boolean value that indicates if double encryption is enabled. Defaults to `boolean`.
     * `enablePurge` - (Optional) A boolean value that indicates if the purge operations are enabled. Defaults to `boolean`.
     * `enableStreamingIngest` - (Optional) A boolean value that indicates if the streaming ingest is enabled. Defaults to `boolean`.
     * `engineType` - (Optional) The engine type Defaults to `string`.
     * `keyVaultProperties` - (Optional) KeyVault properties for the cluster encryption. Defaults to `KeyVaultProperties`.
     * `languageExtensions` - (Optional) List of the cluster's language extensions. Defaults to `LanguageExtensionsList`.
     * `optimizedAutoscale` - (Optional) Optimized auto scale definition. Defaults to `OptimizedAutoscale`.
     * `publicIPType` - (Optional) Indicates what public IP type to create - IPv4 (default), or DualStack (both IPv4 and IPv6) Defaults to `string`.
     * `publicNetworkAccess` - (Optional) Public network access to the cluster is enabled by default. When disabled, only private endpoint connection to the cluster is allowed Defaults to `string`.
     * `restrictOutboundNetworkAccess` - (Optional) Whether or not to restrict outbound network access.  Value is optional but if passed in, must be 'Enabled' or 'Disabled' Defaults to `string`.
     * `trustedExternalTenants` - (Optional) The cluster's external tenants. Defaults to `TrustedExternalTenant[]`.
     * `virtualClusterGraduationProperties` - (Optional) Virtual Cluster graduation properties Defaults to `string`.
     * `virtualNetworkConfiguration` - (Optional) Virtual network definition. Defaults to `VirtualNetworkConfiguration`.
     *
     * ---
     *
     * The `VirtualNetworkConfiguration` block supports the following:

     * `dataManagementPublicIpId` - (Required) Data management's service public IP address resource id. Defaults to `string`.
     * `enginePublicIpId` - (Required) Engine service's public IP address resource id. Defaults to `string`.
     * `state` - (Optional) When enabled, the cluster is deployed into the configured subnet, when disabled it will be removed from the subnet. Defaults to `string`.
     * `subnetId` - (Required) The subnet resource id. Defaults to `string`.
     *
     * ---
     *
     * The `TrustedExternalTenant[]` block supports the following:

     * `value` - (Optional) GUID representing an external tenant. Defaults to `string`.
     *
     * ---
     *
     * The `OptimizedAutoscale` block supports the following:

     * `isEnabled` - (Required) A boolean value that indicate if the optimized autoscale feature is enabled or not. Defaults to `boolean`.
     * `maximum` - (Required) Maximum allowed instances count. Defaults to `integer`.
     * `minimum` - (Required) Minimum allowed instances count. Defaults to `integer`.
     * `version` - (Required) The version of the template defined, for instance 1. Defaults to `integer`.
     *
     * ---
     *
     * The `LanguageExtensionsList` block supports the following:

     * `value` - (Optional) The list of language extensions. Defaults to `LanguageExtension[]`.
     *
     * ---
     *
     * The `LanguageExtension[]` block supports the following:

     * `languageExtensionCustomImageName` - (Optional) The language extension custom image name. Defaults to `string`.
     * `languageExtensionImageName` - (Optional) The language extension image name. Defaults to `string`.
     * `languageExtensionName` - (Optional) The language extension name. Defaults to `string`.
     *
     * ---
     *
     * The `KeyVaultProperties` block supports the following:

     * `keyName` - (Optional) The name of the key vault key. Defaults to `string`.
     * `keyVaultUri` - (Optional) The Uri of the key vault. Defaults to `string`.
     * `keyVersion` - (Optional) The version of the key vault key. Defaults to `string`.
     * `userIdentity` - (Optional) The user assigned identity (ARM resource id) that has access to the key. Defaults to `string`.
     *
     * ---
     *
     * The `AcceptedAudiences[]` block supports the following:

     * `value` - (Optional) GUID or valid URL representing an accepted audience. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: ClustersProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters@2023-08-15";
  }
  protected getResourceBody(props: ClustersProps) {
    return {
      properties: props.properties,
      sku: props.sku,
      zones: props.zones,
    };
  }
  public addClustersDatabases(
    props: ClustersDatabasesProps,
  ): ClustersDatabases {
    return new ClustersDatabases(this, props.name, {
      name: props.name,
      parentId: this.id,
    });
  }
  public addClustersSandboxCustomImages(
    props: ClustersSandboxCustomImagesProps,
  ): ClustersSandboxCustomImages {
    return new ClustersSandboxCustomImages(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addClustersPrincipalAssignments(
    props: ClustersPrincipalAssignmentsProps,
  ): ClustersPrincipalAssignments {
    return new ClustersPrincipalAssignments(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addClustersManagedPrivateEndpoints(
    props: ClustersManagedPrivateEndpointsProps,
  ): ClustersManagedPrivateEndpoints {
    return new ClustersManagedPrivateEndpoints(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addClustersPrivateEndpointConnections(
    props: ClustersPrivateEndpointConnectionsProps,
  ): ClustersPrivateEndpointConnections {
    return new ClustersPrivateEndpointConnections(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addClustersAttachedDatabaseConfigurations(
    props: ClustersAttachedDatabaseConfigurationsProps,
  ): ClustersAttachedDatabaseConfigurations {
    return new ClustersAttachedDatabaseConfigurations(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addClustersDataConnections(
    props: ClustersDataConnectionsProps,
  ): ClustersDataConnections {
    return new ClustersDataConnections(this, props.name, {
      name: props.name,
      parentId: this.id,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersAttachedDatabaseConfigurationsProps
  extends IAzAPIBaseProps {
  /**
   * The properties of the attached database configuration.
   */
  properties: AttachedDatabaseConfigurationProperties;
}

export interface AttachedDatabaseConfigurationProperties {
  /**
   * The resource id of the cluster where the databases you would like to attach reside.
   */
  clusterResourceId: string;
  /**
   * The name of the database which you would like to attach, use * if you want to follow all current and future databases.
   */
  databaseName: string;
  /**
   * Overrides the original database name. Relevant only when attaching to a specific database.
   */
  databaseNameOverride?: string;
  /**
   * Adds a prefix to the attached databases name. When following an entire cluster, that prefix would be added to all of the databases original names from leader cluster.
   */
  databaseNamePrefix?: string;
  /**
   * The default principals modification kind
   */
  defaultPrincipalsModificationKind: string;
  /**
   * Table level sharing specifications
   */
  tableLevelSharingProperties?: TableLevelSharingProperties;
}

export interface TableLevelSharingProperties {
  /**
   * List of external tables to exclude from the follower database
   */
  externalTablesToExclude?: string[];
  /**
   * List of external tables to include in the follower database
   */
  externalTablesToInclude?: string[];
  /**
   * List of functions to exclude from the follower database
   */
  functionsToExclude?: string[];
  /**
   * List of functions to include in the follower database
   */
  functionsToInclude?: string[];
  /**
   * List of materialized views to exclude from the follower database
   */
  materializedViewsToExclude?: string[];
  /**
   * List of materialized views to include in the follower database
   */
  materializedViewsToInclude?: string[];
  /**
   * List of tables to exclude from the follower database
   */
  tablesToExclude?: string[];
  /**
   * List of tables to include in the follower database
   */
  tablesToInclude?: string[];
}

export class ClustersAttachedDatabaseConfigurations extends AzAPIBase {
  /**
       * Constructs a new ClustersAttachedDatabaseConfigurations.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Kusto/clusters/attachedDatabaseConfigurations@2023-08-15. The properties include:
     * `properties` - (Required) The properties of the attached database configuration. Defaults to `AttachedDatabaseConfigurationProperties`.
     *
     * ---
     *
     * The `AttachedDatabaseConfigurationProperties` block supports the following:

     * `clusterResourceId` - (Required) The resource id of the cluster where the databases you would like to attach reside. Defaults to `string`.
     * `databaseName` - (Required) The name of the database which you would like to attach, use * if you want to follow all current and future databases. Defaults to `string`.
     * `databaseNameOverride` - (Optional) Overrides the original database name. Relevant only when attaching to a specific database. Defaults to `string`.
     * `databaseNamePrefix` - (Optional) Adds a prefix to the attached databases name. When following an entire cluster, that prefix would be added to all of the databases original names from leader cluster. Defaults to `string`.
     * `defaultPrincipalsModificationKind` - (Required) The default principals modification kind Defaults to `string`.
     * `tableLevelSharingProperties` - (Optional) Table level sharing specifications Defaults to `TableLevelSharingProperties`.
     *
     * ---
     *
     * The `TableLevelSharingProperties` block supports the following:

     * `externalTablesToExclude` - (Optional) List of external tables to exclude from the follower database Defaults to `string[]`.
     * `externalTablesToInclude` - (Optional) List of external tables to include in the follower database Defaults to `string[]`.
     * `functionsToExclude` - (Optional) List of functions to exclude from the follower database Defaults to `string[]`.
     * `functionsToInclude` - (Optional) List of functions to include in the follower database Defaults to `string[]`.
     * `materializedViewsToExclude` - (Optional) List of materialized views to exclude from the follower database Defaults to `string[]`.
     * `materializedViewsToInclude` - (Optional) List of materialized views to include in the follower database Defaults to `string[]`.
     * `tablesToExclude` - (Optional) List of tables to exclude from the follower database Defaults to `string[]`.
     * `tablesToInclude` - (Optional) List of tables to include in the follower database Defaults to `string[]`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersAttachedDatabaseConfigurationsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/attachedDatabaseConfigurations@2023-08-15";
  }
  protected getResourceBody(
    props: ClustersAttachedDatabaseConfigurationsProps,
  ) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import {
  ClustersDatabasesDataConnections,
  ClustersDatabasesDataConnectionsProps,
} from "./clustersdatabasesdataconnections";
import {
  ClustersDatabasesPrincipalAssignments,
  ClustersDatabasesPrincipalAssignmentsProps,
} from "./clustersdatabasesprincipalassignments";
import {
  ClustersDatabasesScripts,
  ClustersDatabasesScriptsProps,
} from "./clustersdatabasesscripts";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersDatabasesProps extends IAzAPIBaseProps {}

export class ClustersDatabases extends AzAPIBase {
  /**
   * Constructs a new ClustersDatabases.
   *
   * @param scope - The scope in which to define this construct.
   * @param id - The ID of this construct.
   * @param props - The properties for configuring the Microsoft.Kusto/clusters/databases@2023-08-15. The properties include:
   *
   */
  constructor(scope: Construct, id: string, props: ClustersDatabasesProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/databases@2023-08-15";
  }
  protected getResourceBody(): { [key: string]: any } {
    return {};
  }
  public addClustersDatabasesScripts(
    props: ClustersDatabasesScriptsProps,
  ): ClustersDatabasesScripts {
    return new ClustersDatabasesScripts(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addClustersDatabasesDataConnections(
    props: ClustersDatabasesDataConnectionsProps,
  ): ClustersDatabasesDataConnections {
    return new ClustersDatabasesDataConnections(this, props.name, {
      name: props.name,
      parentId: this.id,
    });
  }
  public addClustersDatabasesPrincipalAssignments(
    props: ClustersDatabasesPrincipalAssignmentsProps,
  ): ClustersDatabasesPrincipalAssignments {
    return new ClustersDatabasesPrincipalAssignments(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersDatabasesDataConnectionsProps
  extends IAzAPIBaseProps {}

export class ClustersDatabasesDataConnections extends AzAPIBase {
  /**
   * Constructs a new ClustersDatabasesDataConnections.
   *
   * @param scope - The scope in which to define this construct.
   * @param id - The ID of this construct.
   * @param props - The properties for configuring the Microsoft.Kusto/clusters/databases/dataConnections@2023-08-15. The properties include:
   *
   */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersDatabasesDataConnectionsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/databases/dataConnections@2023-08-15";
  }
  protected getResourceBody(): { [key: string]: any } {
    return {};
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersDatabasesPrincipalAssignmentsProps
  extends IAzAPIBaseProps {
  /**
   * The database principal.
   */
  properties: DatabasePrincipalProperties;
}

export interface DatabasePrincipalProperties {
  /**
   * The principal ID assigned to the database principal. It can be a user email, application ID, or security group name.
   */
  principalId: string;
  /**
   * Principal type.
   */
  principalType: string;
  /**
   * Database principal role.
   */
  role: string;
  /**
   * The tenant id of the principal
   */
  tenantId?: string;
}

export class ClustersDatabasesPrincipalAssignments extends AzAPIBase {
  /**
       * Constructs a new ClustersDatabasesPrincipalAssignments.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Kusto/clusters/databases/principalAssignments@2023-08-15. The properties include:
     * `properties` - (Required) The database principal. Defaults to `DatabasePrincipalProperties`.
     *
     * ---
     *
     * The `DatabasePrincipalProperties` block supports the following:

     * `principalId` - (Required) The principal ID assigned to the database principal. It can be a user email, application ID, or security group name. Defaults to `string`.
     * `principalType` - (Required) Principal type. Defaults to `string`.
     * `role` - (Required) Database principal role. Defaults to `string`.
     * `tenantId` - (Optional) The tenant id of the principal Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersDatabasesPrincipalAssignmentsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/databases/principalAssignments@2023-08-15";
  }
  protected getResourceBody(props: ClustersDatabasesPrincipalAssignmentsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersDatabasesScriptsProps extends IAzAPIBaseProps {
  /**
   * The database script.
   */
  properties?: ScriptProperties;
}

export interface ScriptProperties {
  /**
   * Flag that indicates whether to continue if one of the command fails.
   */
  continueOnErrors?: boolean;
  /**
   * A unique string. If changed the script will be applied again.
   */
  forceUpdateTag?: string;
  /**
   * The script content. This property should be used when the script is provide inline and not through file in a SA. Must not be used together with scriptUrl and scriptUrlSasToken properties.
   */
  scriptContent?: string;
  /**
   * The url to the KQL script blob file. Must not be used together with scriptContent property
   */
  scriptUrl?: string;
  /**
   * The SaS token that provide read access to the file which contain the script. Must be provided when using scriptUrl property.
   */
  scriptUrlSasToken?: string;
}

export class ClustersDatabasesScripts extends AzAPIBase {
  /**
       * Constructs a new ClustersDatabasesScripts.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Kusto/clusters/databases/scripts@2023-08-15. The properties include:
     * `properties` - (Required) The database script. Defaults to `ScriptProperties`.
     *
     * ---
     *
     * The `ScriptProperties` block supports the following:

     * `continueOnErrors` - (Optional) Flag that indicates whether to continue if one of the command fails. Defaults to `boolean`.
     * `forceUpdateTag` - (Optional) A unique string. If changed the script will be applied again. Defaults to `string`.
     * `scriptContent` - (Optional) The script content. This property should be used when the script is provide inline and not through file in a SA. Must not be used together with scriptUrl and scriptUrlSasToken properties. Defaults to `string`.
     * `scriptUrl` - (Optional) The url to the KQL script blob file. Must not be used together with scriptContent property Defaults to `string`.
     * `scriptUrlSasToken` - (Optional) The SaS token that provide read access to the file which contain the script. Must be provided when using scriptUrl property. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersDatabasesScriptsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/databases/scripts@2023-08-15";
  }
  protected getResourceBody(props: ClustersDatabasesScriptsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersDataConnectionsProps extends IAzAPIBaseProps {}

export class ClustersDataConnections extends AzAPIBase {
  /**
   * Constructs a new ClustersDataConnections.
   *
   * @param scope - The scope in which to define this construct.
   * @param id - The ID of this construct.
   * @param props - The properties for configuring the Microsoft.Kusto/clusters/dataConnections@2023-08-15. The properties include:
   *
   */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersDataConnectionsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/dataConnections@2023-08-15";
  }
  protected getResourceBody(): { [key: string]: any } {
    return {};
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersManagedPrivateEndpointsProps extends IAzAPIBaseProps {
  /**
   * A managed private endpoint.
   */
  properties: ManagedPrivateEndpointProperties;
}

export interface ManagedPrivateEndpointProperties {
  /**
   * The groupId in which the managed private endpoint is created.
   */
  groupId: string;
  /**
   * The ARM resource ID of the resource for which the managed private endpoint is created.
   */
  privateLinkResourceId: string;
  /**
   * The region of the resource to which the managed private endpoint is created.
   */
  privateLinkResourceRegion?: string;
  /**
   * The user request message.
   */
  requestMessage?: string;
}

export class ClustersManagedPrivateEndpoints extends AzAPIBase {
  /**
       * Constructs a new ClustersManagedPrivateEndpoints.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Kusto/clusters/managedPrivateEndpoints@2023-08-15. The properties include:
     * `properties` - (Required) A managed private endpoint. Defaults to `ManagedPrivateEndpointProperties`.
     *
     * ---
     *
     * The `ManagedPrivateEndpointProperties` block supports the following:

     * `groupId` - (Required) The groupId in which the managed private endpoint is created. Defaults to `string`.
     * `privateLinkResourceId` - (Required) The ARM resource ID of the resource for which the managed private endpoint is created. Defaults to `string`.
     * `privateLinkResourceRegion` - (Optional) The region of the resource to which the managed private endpoint is created. Defaults to `string`.
     * `requestMessage` - (Optional) The user request message. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersManagedPrivateEndpointsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/managedPrivateEndpoints@2023-08-15";
  }
  protected getResourceBody(props: ClustersManagedPrivateEndpointsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersPrincipalAssignmentsProps extends IAzAPIBaseProps {
  /**
   * The cluster principal.
   */
  properties: ClusterPrincipalProperties;
}

export interface ClusterPrincipalProperties {
  /**
   * The principal ID assigned to the cluster principal. It can be a user email, application ID, or security group name.
   */
  principalId: string;
  /**
   * Principal type.
   */
  principalType: string;
  /**
   * Cluster principal role.
   */
  role: string;
  /**
   * The tenant id of the principal
   */
  tenantId?: string;
}

export class ClustersPrincipalAssignments extends AzAPIBase {
  /**
       * Constructs a new ClustersPrincipalAssignments.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Kusto/clusters/principalAssignments@2023-08-15. The properties include:
     * `properties` - (Required) The cluster principal. Defaults to `ClusterPrincipalProperties`.
     *
     * ---
     *
     * The `ClusterPrincipalProperties` block supports the following:

     * `principalId` - (Required) The principal ID assigned to the cluster principal. It can be a user email, application ID, or security group name. Defaults to `string`.
     * `principalType` - (Required) Principal type. Defaults to `string`.
     * `role` - (Required) Cluster principal role. Defaults to `string`.
     * `tenantId` - (Optional) The tenant id of the principal Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersPrincipalAssignmentsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/principalAssignments@2023-08-15";
  }
  protected getResourceBody(props: ClustersPrincipalAssignmentsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersPrivateEndpointConnectionsProps
  extends IAzAPIBaseProps {
  /**
   * Resource properties.
   */
  properties: PrivateEndpointConnectionProperties;
}

export interface PrivateEndpointConnectionProperties {
  /**
   * Connection State of the Private Endpoint Connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
}

export interface PrivateLinkServiceConnectionStateProperty {
  /**
   * The private link service connection description.
   */
  description?: string;
  /**
   * The private link service connection status.
   */
  status?: string;
}

export class ClustersPrivateEndpointConnections extends AzAPIBase {
  /**
       * Constructs a new ClustersPrivateEndpointConnections.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Kusto/clusters/privateEndpointConnections@2023-08-15. The properties include:
     * `properties` - (Required) Resource properties. Defaults to `PrivateEndpointConnectionProperties`.
     *
     * ---
     *
     * The `PrivateEndpointConnectionProperties` block supports the following:

     * `privateLinkServiceConnectionState` - (Required) Connection State of the Private Endpoint Connection. Defaults to `PrivateLinkServiceConnectionStateProperty`.
     *
     * ---
     *
     * The `PrivateLinkServiceConnectionStateProperty` block supports the following:

     * `description` - (Optional) The private link service connection description. Defaults to `string`.
     * `status` - (Optional) The private link service connection status. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersPrivateEndpointConnectionsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/privateEndpointConnections@2023-08-15";
  }
  protected getResourceBody(props: ClustersPrivateEndpointConnectionsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ClustersSandboxCustomImagesProps extends IAzAPIBaseProps {
  /**
   * A sandbox custom image.
   */
  properties: SandboxCustomImageProperties;
}

export interface SandboxCustomImageProperties {
  /**
   * The language name, for example Python.
   */
  language: string;
  /**
   * The version of the language.
   */
  languageVersion: string;
  /**
   * The requirements file content.
   */
  requirementsFileContent?: string;
}

export class ClustersSandboxCustomImages extends AzAPIBase {
  /**
       * Constructs a new ClustersSandboxCustomImages.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Kusto/clusters/sandboxCustomImages@2023-08-15. The properties include:
     * `properties` - (Required) A sandbox custom image. Defaults to `SandboxCustomImageProperties`.
     *
     * ---
     *
     * The `SandboxCustomImageProperties` block supports the following:

     * `language` - (Required) The language name, for example Python. Defaults to `string`.
     * `languageVersion` - (Required) The version of the language. Defaults to `string`.
     * `requirementsFileContent` - (Optional) The requirements file content. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ClustersSandboxCustomImagesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Kusto/clusters/sandboxCustomImages@2023-08-15";
  }
  protected getResourceBody(props: ClustersSandboxCustomImagesProps) {
    return {
      properties: props.properties,
    };
  }
}
