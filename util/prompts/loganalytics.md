import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface WorkspacesProps extends IAzAPIBaseProps {
  /**
   * The etag of the workspace.
   */
  etag?: string;
  /**
   * Workspace properties.
   */
  properties?: WorkspaceProperties;
}

export interface WorkspaceProperties {
  /**
   * The resource ID of the default Data Collection Rule to use for this workspace. Expected format is - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dcrName}.
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
   * The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details.
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

export interface WorkspaceCapping {
  /**
   * The workspace daily quota for ingestion.
   */
  dailyQuotaGb?: number;
}

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

export class Workspaces extends AzAPIBase {
  /**
       * Constructs a new Workspaces.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.OperationalInsights/workspaces@2023-09-01. The properties include:
     * `etag` - (Optional) The etag of the workspace. Defaults to `string`.
     * `properties` - (Required) Workspace properties. Defaults to `WorkspaceProperties`.
     *
     * ---
     *
     * The `WorkspaceProperties` block supports the following:

     * `defaultDataCollectionRuleResourceId` - (Optional) The resource ID of the default Data Collection Rule to use for this workspace. Expected format is - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dcrName}. Defaults to `string`.
     * `features` - (Optional) Workspace features. Defaults to `WorkspaceFeatures`.
     * `forceCmkForQuery` - (Optional) Indicates whether customer managed storage is mandatory for query management. Defaults to `boolean`.
     * `publicNetworkAccessForIngestion` - (Optional) The network access type for accessing Log Analytics ingestion. Defaults to `string`.
     * `publicNetworkAccessForQuery` - (Optional) The network access type for accessing Log Analytics query. Defaults to `string`.
     * `retentionInDays` - (Optional) The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details. Defaults to `integer`.
     * `sku` - (Optional) The SKU of the workspace. Defaults to `WorkspaceSku`.
     * `workspaceCapping` - (Optional) The daily volume cap for ingestion. Defaults to `WorkspaceCapping`.
     *
     * ---
     *
     * The `WorkspaceCapping` block supports the following:

     * `dailyQuotaGb` - (Optional) The workspace daily quota for ingestion. Defaults to `number`.
     *
     * ---
     *
     * The `WorkspaceSku` block supports the following:

     * `capacityReservationLevel` - (Optional) The capacity reservation level in GB for this workspace, when CapacityReservation sku is selected. Defaults to `string`.
     * `name` - (Required) The name of the SKU. Defaults to `string`.
     *
     * ---
     *
     * The `WorkspaceFeatures` block supports the following:

     * `clusterResourceId` - (Optional) Dedicated LA cluster resourceId that is linked to the workspaces. Defaults to `string`.
     * `disableLocalAuth` - (Optional) Disable Non-AAD based Auth. Defaults to `boolean`.
     * `enableDataExport` - (Optional) Flag that indicate if data should be exported. Defaults to `boolean`.
     * `enableLogAccessUsingOnlyResourcePermissions` - (Optional) Flag that indicate which permission to use - resource or workspace or both. Defaults to `boolean`.
     * `immediatePurgeDataOn30Days` - (Optional) Flag that describes if we want to remove the data after 30 days. Defaults to `boolean`.
     *
    */
  constructor(scope: Construct, id: string, props: WorkspacesProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.OperationalInsights/workspaces@2023-09-01";
  }
  protected getResourceBody(props: WorkspacesProps) {
    return {
      etag: props.etag,
      properties: props.properties,
    };
  }
}
