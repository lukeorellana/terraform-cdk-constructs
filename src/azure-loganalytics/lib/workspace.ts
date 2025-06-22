import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";
import { AzureResource } from "../../core-azure/lib";

/**
 * Properties for the Log Analytics Workspace SKU.
 */
export interface WorkspaceSku {
  /**
   * The capacity reservation level in GB for this workspace, when CapacityReservation sku is selected.
   */
  capacityReservationLevel?: string;
  /**
   * The name of the SKU.
   */
  name: string;
}

/**
 * Properties for workspace capping.
 */
export interface WorkspaceCapping {
  /**
   * The workspace daily quota for ingestion.
   */
  dailyQuotaGb?: number;
}

/**
 * Properties for workspace features.
 */
export interface WorkspaceFeatures {
  /**
   * Dedicated LA cluster resourceId that is linked to the workspaces.
   */
  clusterResourceId?: string;
  /**
   * Disable Non-AAD based Auth.
   */
  disableLocalAuth?: boolean;
  /**
   * Flag that indicate if data should be exported.
   */
  enableDataExport?: boolean;
  /**
   * Flag that indicate which permission to use - resource or workspace or both.
   */
  enableLogAccessUsingOnlyResourcePermissions?: boolean;
  /**
   * Flag that describes if we want to remove the data after 30 days.
   */
  immediatePurgeDataOn30Days?: boolean;
}

/**
 * Properties for the Log Analytics Workspace.
 */
export interface WorkspaceProperties {
  /**
   * The resource ID of the default Data Collection Rule to use for this workspace.
   */
  defaultDataCollectionRuleResourceId?: string;
  /**
   * Workspace features.
   */
  features?: WorkspaceFeatures;
  /**
   * Indicates whether customer managed storage is mandatory for query management.
   */
  forceCmkForQuery?: boolean;
  /**
   * The network access type for accessing Log Analytics ingestion.
   */
  publicNetworkAccessForIngestion?: string;
  /**
   * The network access type for accessing Log Analytics query.
   */
  publicNetworkAccessForQuery?: string;
  /**
   * The workspace data retention in days. Allowed values are per pricing plan.
   */
  retentionInDays?: number;
  /**
   * The SKU of the workspace.
   */
  sku?: WorkspaceSku;
  /**
   * The daily volume cap for ingestion.
   */
  workspaceCapping?: WorkspaceCapping;
}

export interface WorkspaceProps {
  /**
   * The Azure Region to deploy.
   */
  readonly location?: string;
  /**
   * The name of the Log Analytics Workspace.
   */
  readonly name?: string;
  /**
   * An optional reference to the resource group in which to deploy the Workspace.
   * If not provided, the Workspace will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;
  /**
   * The SKU of the Log Analytics Workspace.
   * @deprecated Use properties.sku instead
   */
  readonly sku?: string;
  /**
   * The number of days of retention. Default is 30.
   * @deprecated Use properties.retentionInDays instead
   */
  readonly retention?: number;
  /**
   * The tags to assign to the Log Analytics Workspace.
   */
  readonly tags?: { [key: string]: string };
  /**
   * The etag of the workspace.
   */
  readonly etag?: string;
  /**
   * Workspace properties using AzAPI schema.
   */
  readonly properties?: WorkspaceProperties;
}

export class Workspace extends AzureResource {
  public readonly props: WorkspaceProps;
  public resourceGroup: ResourceGroup;
  public readonly workspace: resource.Resource;
  public readonly id: string;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;
  public readonly workspaceIdOutput: cdktf.TerraformOutput;
  public readonly primarySharedKeyOutput: cdktf.TerraformOutput;

  /**
   * Represents an Azure Log Analytics Workspace using AzAPI.
   *
   * This class is responsible for the creation and configuration of a Log Analytics Workspace in Azure. A Log Analytics Workspace
   * is a unique environment for Azure Monitor data, where data is collected, aggregated, and serves as the administrative boundary.
   * Within a workspace, data is collected from various sources and is used for analysis, visualization, and alerting.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the Log Analytics workspace.
   * @param props - The properties required to configure the Log Analytics workspace, as defined in the WorkspaceProps interface.
   *
   * Example usage:
   * ```typescript
   * new Workspace(this, 'MyLogAnalyticsWorkspace', {
   *   location: 'East US',
   *   name: 'myWorkspace',
   *   properties: {
   *     sku: { name: 'PerGB2018' },
   *     retentionInDays: 60,
   *     features: {
   *       enableDataExport: true
   *     }
   *   },
   *   tags: { department: 'IT' }
   * });
   * ```
   */
  constructor(scope: Construct, id: string, props: WorkspaceProps = {}) {
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
      name: props.name || `law-${this.node.path.split("/")[0]}`,
      location: props.location || "eastus",
    };

    // Build workspace properties, supporting both new and legacy prop patterns
    const workspaceProperties: WorkspaceProperties = {
      ...props.properties,
      sku:
        props.properties?.sku ||
        (props.sku ? { name: props.sku } : { name: "PerGB2018" }),
      retentionInDays:
        props.properties?.retentionInDays || props.retention || 30,
    };

    // Create the Log Analytics Workspace using AzAPI
    this.workspace = new resource.Resource(this, "workspace", {
      name: defaults.name,
      location: defaults.location,
      parentId: this.resourceGroup.resourceGroup.id,
      type: "Microsoft.OperationalInsights/workspaces@2023-09-01",
      body: {
        etag: props.etag,
        properties: workspaceProperties,
      },
      tags: props.tags,
    });

    this.id = this.workspace.id;

    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "log_analytics_id", {
      value: this.workspace.id,
    });

    this.nameOutput = new cdktf.TerraformOutput(this, "log_analytics_name", {
      value: this.workspace.name,
    });

    this.workspaceIdOutput = new cdktf.TerraformOutput(
      this,
      "log_analytics_workspace_id",
      {
        value: `\${jsondecode(${this.workspace.output}).properties.customerId}`,
      },
    );

    this.primarySharedKeyOutput = new cdktf.TerraformOutput(
      this,
      "log_analytics_primary_shared_key",
      {
        value: `\${jsondecode(${this.workspace.output}).properties.primarySharedKey}`,
        sensitive: true,
      },
    );

    /*This allows the Terraform resource name to match the original name. You can remove the call if you don't need them to match.*/
    this.idOutput.overrideLogicalId("log_analytics_id");
    this.nameOutput.overrideLogicalId("log_analytics_name");
    this.workspaceIdOutput.overrideLogicalId("log_analytics_workspace_id");
    this.primarySharedKeyOutput.overrideLogicalId(
      "log_analytics_primary_shared_key",
    );
  }
}
