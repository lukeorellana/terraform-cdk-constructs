import * as cdktf from "cdktf";
import { Construct } from "constructs";
import {
  ComputeSpecification,
  IComputeSpecification,
} from "./compute-specification";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup";
import { AzureResource } from "../../core-azure";

/**
 * Properties for the Kusto cluster SKU (AzAPI schema).
 */
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

/**
 * Properties for optimized autoscale.
 */
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

/**
 * Properties for virtual network configuration.
 */
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

/**
 * Properties for trusted external tenants.
 */
export interface TrustedExternalTenant {
  /**
   * GUID representing an external tenant.
   */
  value?: string;
}

/**
 * Properties for the Kusto cluster (AzAPI schema).
 */
export interface ClusterProperties {
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
   * Virtual network definition.
   */
  virtualNetworkConfiguration?: VirtualNetworkConfiguration;
}

export interface ClusterProps {
  /**
   * The Azure Region to deploy.
   */
  readonly location?: string;
  /**
   * An optional reference to the resource group in which to deploy the Kusto Cluster.
   * If not provided, the Kusto Cluster will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;
  /**
   * The name of the Kusto Cluster to create.
   * Only 4-22 lowercase alphanumeric characters allowed, starting with a letter.
   */
  readonly name?: string;
  /**
   * The SKU of the Kusto Cluster. All the allowed values are defined in the ComputeSpecification class.
   * @default devtestExtraSmallDv2
   * @deprecated Use azureSku instead for AzAPI compatibility
   */
  readonly sku?: IComputeSpecification;
  /**
   * The AzAPI SKU of the Kusto Cluster.
   */
  readonly azureSku?: AzureSku;
  /**
   * The node count for the cluster.
   * @default 2
   * @deprecated Use azureSku.capacity instead
   */
  readonly capacity?: number;
  /**
   * The type of Managed Service Identity.
   * @default "SystemAssigned"
   */
  readonly identityType?: string;
  /**
   * A list of User Assigned Managed Identity IDs to be assigned to this Kusto Cluster.
   */
  readonly identityIds?: string[];
  /**
   * Is the public network access enabled?
   * @default true
   * @deprecated Use properties.publicNetworkAccess instead
   */
  readonly publicNetworkAccessEnabled?: boolean;
  /**
   * Specifies if the cluster could be automatically stopped.
   * (due to lack of data or no activity for many days).
   * @default true
   * @deprecated Use properties.enableAutoStop instead
   */
  readonly autoStopEnabled?: boolean;
  /**
   * Specifies if the streaming ingest is enabled.
   * @default true
   * @deprecated Use properties.enableStreamingIngest instead
   */
  readonly streamingIngestionEnabled?: boolean;
  /**
   * Specifies if the purge operations are enabled.
   * @default false
   * @deprecated Use properties.enablePurge instead
   */
  readonly purgeEnabled?: boolean;
  /**
   * Specifies if the purge operations are enabled. Based on the SKU, the number of zones allowed are different.
   * @default true
   */
  readonly enableZones?: boolean;
  /**
   * The minimum number of allowed instances. Must between 0 and 1000.
   * @deprecated Use properties.optimizedAutoscale.minimum instead
   */
  readonly minimumInstances?: number;
  /**
   * The maximum number of allowed instances. Must between 0 and 1000.
   * @deprecated Use properties.optimizedAutoscale.maximum instead
   */
  readonly maximumInstances?: number;
  /**
   * A mapping of tags to assign to the Kusto.
   */
  readonly tags?: { [key: string]: string };
  /**
   * The availability zones of the cluster.
   */
  readonly zones?: string[];
  /**
   * The cluster properties using AzAPI schema.
   */
  readonly properties?: ClusterProperties;
}

export class Cluster extends AzureResource {
  readonly props: ClusterProps;
  public readonly resource: resource.Resource;
  public id: string;
  public resourceGroup: ResourceGroup;
  public name: string;
  public readonly fqdn: string;
  public readonly dataIngestionUri: string;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;
  public readonly fqdnOutput: cdktf.TerraformOutput;

  /**
   * Represents a Kusto (Azure Data Explorer) cluster in Azure.
   *
   * This class is responsible for the creation and management of a Kusto Cluster, which is a highly scalable and secure
   * analytics service for ingesting, storing, and analyzing large volumes of data. The cluster supports various configurations
   * tailored to the needs of specific data workloads and security requirements.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the cluster.
   * @param props - The properties required to configure the Kusto cluster, as defined in the ClusterProps interface.
   *
   * Example usage:
   * ```typescript
   * new Cluster(this, 'MyKustoCluster', {
   *   name: 'example-cluster',
   *   location: 'West US',
   *   resourceGroup: myResourceGroup,
   *   sku: { tier: 'Standard', name: 'D13_v2', capacity: 2 },
   *   tags: {
   *     project: 'Data Analytics'
   *   }
   * });
   * ```
   */
  constructor(scope: Construct, id: string, props: ClusterProps = {}) {
    super(scope, id);

    this.props = props;
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location || "eastus",
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Default values
    const defaults = {
      name: props.name || `kusto-${this.node.path.split("/")[0]}`,
      location: props.location || "eastus",
    };

    // Handle legacy vs new SKU props - support backward compatibility
    let azureSku: AzureSku;
    if (props.azureSku) {
      azureSku = props.azureSku;
    } else {
      const sku = props.sku || ComputeSpecification.devtestExtraSmallDv2;
      azureSku = {
        name: sku.skuName,
        tier: sku.workload.includes("dev") ? "Basic" : "Standard",
        capacity: props.capacity || 2,
      };
    }

    // Build cluster properties, supporting both new and legacy prop patterns
    const clusterProperties: ClusterProperties = {
      ...props.properties,
      enableAutoStop:
        props.properties?.enableAutoStop ?? props.autoStopEnabled ?? true,
      enableStreamingIngest:
        props.properties?.enableStreamingIngest ??
        props.streamingIngestionEnabled ??
        true,
      enablePurge: props.properties?.enablePurge ?? props.purgeEnabled ?? false,
      publicNetworkAccess:
        props.properties?.publicNetworkAccess ??
        (props.publicNetworkAccessEnabled !== false ? "Enabled" : "Disabled"),
    };

    // Handle autoscale if minimum and maximum instances are provided
    if (
      props.minimumInstances &&
      props.maximumInstances &&
      !props.properties?.optimizedAutoscale
    ) {
      clusterProperties.optimizedAutoscale = {
        isEnabled: true,
        minimum: props.minimumInstances,
        maximum: props.maximumInstances,
        version: 1,
      };
    }

    // Determine zones
    const zones =
      props.zones ||
      (props.enableZones && props.sku ? props.sku.availibleZones : undefined);

    /**
     * Create Kusto Cluster resource using AzAPI.
     */
    const azapiKustoCluster = new resource.Resource(this, "kusto", {
      type: "Microsoft.Kusto/clusters@2023-08-15",
      name: defaults.name,
      location: defaults.location,
      parentId: this.resourceGroup.resourceGroup.id,
      body: {
        sku: azureSku,
        properties: clusterProperties,
        zones: zones,
      },
      tags: props.tags,
    });

    // Handle identity if specified
    if (props.identityType) {
      azapiKustoCluster.addOverride("body.identity", {
        type: props.identityType,
        userAssignedIdentities: props.identityIds?.reduce(
          (acc, identityId) => {
            acc[identityId] = {};
            return acc;
          },
          {} as { [key: string]: {} },
        ),
      });
    }

    this.resource = azapiKustoCluster;
    this.id = azapiKustoCluster.id;
    this.name = azapiKustoCluster.name;
    this.fqdn = `\${jsondecode(${azapiKustoCluster.fqn}.output).properties.uri}`;
    this.dataIngestionUri = `\${jsondecode(${azapiKustoCluster.fqn}.output).properties.dataIngestionUri}`;

    // Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "kusto_id", {
      value: this.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "kusto_name", {
      value: this.name,
    });
    this.fqdnOutput = new cdktf.TerraformOutput(this, "kusto_fqdn", {
      value: this.fqdn,
    });
  }

  // TODO: Update addDatabase method to work with AzAPI resources
  // public addDatabase(databaseProps: DatabaseProps) {
  //   return new Database(this, databaseProps.name, {
  //     kustoCluster: this.resource,
  //     name: databaseProps.name,
  //     hotCachePeriod: databaseProps.hotCachePeriod,
  //     softDeletePeriod: databaseProps.softDeletePeriod,
  //   });
  // }
}
