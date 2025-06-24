import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";
import { AzureResource } from "../../core-azure/lib";

/**
 * Application Insights component properties (AzAPI schema).
 */
export interface ApplicationInsightsProperties {
  /**
   * The kind of application that this component refers to, used to customize UI.
   * This value is case-sensitive. Values are web, ios, other, store, java, phone.
   */
  Application_Type: string;
  /**
   * Retention period in days.
   */
  RetentionInDays?: number;
  /**
   * Application Insights Sampling percentage.
   */
  SamplingPercentage?: number;
  /**
   * Disable IP masking.
   */
  DisableIpMasking?: boolean;
  /**
   * Disable local authentication.
   */
  DisableLocalAuth?: boolean;
  /**
   * Force users to create their own storage account for profiler and debugger.
   */
  ForceCustomerStorageForProfiler?: boolean;
  /**
   * The network access type for accessing Application Insights ingestion.
   */
  IngestionMode?: string;
  /**
   * The network access type for accessing Application Insights query.
   */
  publicNetworkAccessForIngestion?: string;
  /**
   * The network access type for accessing Application Insights query.
   */
  publicNetworkAccessForQuery?: string;
  /**
   * Resource Id of the log analytics workspace which the data will be ingested to.
   */
  WorkspaceResourceId?: string;
  /**
   * Describes what tool created this Application Insights component.
   */
  Request_Source?: string;
  /**
   * Used by the Application Insights portal to determine which type of flow to show the user.
   */
  Flow_Type?: string;
  /**
   * Unique ID for this component.
   */
  HockeyAppId?: string;
  /**
   * Token used to authenticate communications with between Application Insights and HockeyApp.
   */
  HockeyAppToken?: string;
}

/**
 * Properties for the Application Insights component.
 */
export interface AppInsightsProps {
  /**
   * The name of the Application Insights resource.
   */
  readonly name: string;

  /**
   * The Azure Region to deploy.
   */
  readonly location: string;

  /**
   * An optional reference to the resource group in which to deploy the Application Insights.
   * If not provided, the Application Insights will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The tags to assign to the Application Insights resource.
   */
  readonly tags?: { [key: string]: string };

  // ============================================================================
  // FLATTENED APPLICATION INSIGHTS PROPERTIES
  // ============================================================================

  /**
   * The Application type.
   * This value is case-sensitive. Values are web, ios, other, store, java, phone.
   */
  readonly applicationType: string;

  /**
   * The number of days of retention.
   * Possible values are 30, 60, 90, 120, 180, 270, 365, 550 or 730. Defaults to 90.
   * @default 90
   */
  readonly retentionInDays?: number;

  /**
   * Application Insights Sampling percentage.
   */
  readonly samplingPercentage?: number;

  /**
   * Disable IP masking.
   */
  readonly disableIpMasking?: boolean;

  /**
   * Disable local authentication.
   */
  readonly disableLocalAuth?: boolean;

  /**
   * Force users to create their own storage account for profiler and debugger.
   */
  readonly forceCustomerStorageForProfiler?: boolean;

  /**
   * The network access type for accessing Application Insights ingestion.
   */
  readonly ingestionMode?: string;

  /**
   * The network access type for accessing Application Insights ingestion.
   */
  readonly publicNetworkAccessForIngestion?: string;

  /**
   * The network access type for accessing Application Insights query.
   */
  readonly publicNetworkAccessForQuery?: string;

  /**
   * Resource Id of the log analytics workspace which the data will be ingested to.
   * @default - If no workspace id is provided, a new one will be created automatically
   * in the same resource group. The name will be the same as the Application Insights
   * resource with a "-la" suffix.
   */
  readonly workspaceResourceId?: string;

  /**
   * Describes what tool created this Application Insights component.
   */
  readonly requestSource?: string;

  /**
   * Used by the Application Insights portal to determine which type of flow to show the user.
   */
  readonly flowType?: string;

  /**
   * Unique ID for this component.
   */
  readonly hockeyAppId?: string;

  /**
   * Token used to authenticate communications with between Application Insights and HockeyApp.
   */
  readonly hockeyAppToken?: string;

  // ============================================================================
  // LEGACY PROPERTIES (for backward compatibility)
  // ============================================================================

  /**
   * Application Insights properties using AzAPI schema.
   * @deprecated Use the flattened properties directly instead
   */
  readonly properties?: ApplicationInsightsProperties;

  /**
   * The Application Insights daily data cap in GB.
   * @deprecated Use a separate dailyDataCap configuration
   */
  readonly dailyDataCapInGb?: number;

  /**
   * The Application Insights daily data cap notifications disabled.
   * @deprecated Use a separate dailyDataCap configuration
   */
  readonly dailyDataCapNotificationDisabled?: boolean;

  /**
   * The id of the Log Analytics Workspace.
   * @deprecated Use workspaceResourceId instead
   */
  readonly workspaceId?: string;
}

export class AppInsights extends AzureResource {
  readonly props: AppInsightsProps;
  public resourceGroup: ResourceGroup;
  public id: string;
  public readonly resource: resource.Resource;
  public readonly instrumentationKey: string;
  public readonly connectionString: string;
  public readonly appId: string;

  /**
   * Constructs a new Azure Application Insights resource using AzAPI.
   *
   * @param scope - The scope in which to define this construct.
   * @param id - The ID of this construct.
   * @param props - The properties for configuring the Azure Application Insights. The properties include:
   *                - `name`: Required. Unique name for the Application Insights resource within Azure.
   *                - `location`: Required. Azure Region for deployment.
   *                - `resourceGroup`: Optional. Reference to the resource group for deployment.
   *                - `applicationType`: Required. The type of application (e.g., web, other).
   *                - `retentionInDays`: Optional. Number of days to retain data. Default is 90 days.
   *                - `tags`: Optional. Tags for resource management.
   *                - `workspaceResourceId`: Optional. ID of the Log Analytics Workspace to associate with Application Insights. If not provided, a new workspace is created automatically.
   *
   * Example usage:
   * ```typescript
   * new AppInsights(this, 'myAppInsights', {
   *   name: 'myAppInsightsResource',
   *   location: 'East US',
   *   resourceGroup: resourceGroup,
   *   applicationType: 'web',
   *   retentionInDays: 120,
   *   tags: {
   *     "environment": "production"
   *   }
   * });
   * ```
   */

  constructor(scope: Construct, id: string, props: AppInsightsProps) {
    super(scope, id);

    this.props = props;
    
    // Setup or reuse the provided resource group.
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location || "eastus",
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Build Application Insights properties from flattened interface, supporting legacy props
    const appInsightsProperties: ApplicationInsightsProperties = {
      // If properties is provided (legacy), use it as base
      ...props.properties,

      // Override with flattened properties (new interface)
      Application_Type: props.applicationType,
      RetentionInDays:
        props.retentionInDays ?? props.properties?.RetentionInDays ?? 90,
      SamplingPercentage:
        props.samplingPercentage ?? props.properties?.SamplingPercentage,
      DisableIpMasking:
        props.disableIpMasking ?? props.properties?.DisableIpMasking,
      DisableLocalAuth:
        props.disableLocalAuth ?? props.properties?.DisableLocalAuth,
      ForceCustomerStorageForProfiler:
        props.forceCustomerStorageForProfiler ??
        props.properties?.ForceCustomerStorageForProfiler,
      IngestionMode: props.ingestionMode || props.properties?.IngestionMode,
      publicNetworkAccessForIngestion:
        props.publicNetworkAccessForIngestion ||
        props.properties?.publicNetworkAccessForIngestion,
      publicNetworkAccessForQuery:
        props.publicNetworkAccessForQuery ||
        props.properties?.publicNetworkAccessForQuery,
      WorkspaceResourceId:
        props.workspaceResourceId ||
        props.workspaceId ||
        props.properties?.WorkspaceResourceId ||
        this.setupLogAnalytics(props),
      Request_Source: props.requestSource || props.properties?.Request_Source,
      Flow_Type: props.flowType || props.properties?.Flow_Type,
      HockeyAppId: props.hockeyAppId || props.properties?.HockeyAppId,
      HockeyAppToken: props.hockeyAppToken || props.properties?.HockeyAppToken,
    };

    // Create the Application Insights component using AzAPI
    this.resource = new resource.Resource(this, "appinsights", {
      type: "Microsoft.Insights/components@2020-02-02",
      name: props.name,
      location: props.location,
      parentId: this.resourceGroup.resourceGroup.id,
      tags: props.tags,
      body: {
        kind: props.applicationType,
        properties: appInsightsProperties,
      },
    });

    // Extract values from the created resource
    this.id = this.resource.id;
    this.instrumentationKey = `\${${this.resource.fqn}.properties.InstrumentationKey}`;
    this.connectionString = `\${${this.resource.fqn}.properties.ConnectionString}`;
    this.appId = `\${${this.resource.fqn}.properties.AppId}`;

    // Terraform Outputs
    const cdktfTerraformOutputAppiID = new cdktf.TerraformOutput(this, "id", {
      value: this.id,
    });
    const cdktfTerraformOutputAppiName = new cdktf.TerraformOutput(
      this,
      "name",
      {
        value: this.resource.name,
      },
    );
    const cdktfTerraformOutputAppiAppId = new cdktf.TerraformOutput(
      this,
      "app_id",
      {
        value: this.appId,
      },
    );
    const cdktfTerraformOutputAppiIKey = new cdktf.TerraformOutput(
      this,
      "instrumentation_key",
      {
        value: this.instrumentationKey,
        sensitive: true,
      },
    );
    const cdktfTerraformOutputAppiConnectStr = new cdktf.TerraformOutput(
      this,
      "connection_string",
      {
        value: this.connectionString,
        sensitive: true,
      },
    );

    /*This allows the Terraform resource name to match the original name. You can remove the call if you don't need them to match.*/
    cdktfTerraformOutputAppiID.overrideLogicalId("id");
    cdktfTerraformOutputAppiName.overrideLogicalId("name");
    cdktfTerraformOutputAppiAppId.overrideLogicalId("app_id");
    cdktfTerraformOutputAppiIKey.overrideLogicalId("instrumentation_key");
    cdktfTerraformOutputAppiConnectStr.overrideLogicalId("connection_string");
  }

  /**
   * Saves the Application Insights instrumentation key to an Azure Key Vault.
   *
   * This method creates a new secret in the specified Azure Key Vault with the
   * instrumentation key of the Application Insights resource. This enables secure storage
   * and management of the instrumentation key, facilitating secure access across various
   * Azure services.
   *
   * @param keyVaultId - The unique identifier of the Azure Key Vault where the secret will be stored.
   * @param keyVaultSecretName - The name of the secret within the Key Vault. Defaults to 'instrumentation-key'.
   *                             This name can be used to retrieve the secret in client applications.
   *
   * Example usage:
   * ```typescript
   * appInsightsInstance.saveIKeyToKeyVault('my-key-vault-id');
   * ```
   */
  public saveIKeyToKeyVault(
    keyVaultId: string,
    keyVaultSecretName: string = "instrumentation-key",
  ) {
    // Create a Key Vault secret using AzAPI
    new resource.Resource(this, keyVaultSecretName, {
      type: "Microsoft.KeyVault/vaults/secrets@2023-07-01",
      name: keyVaultSecretName,
      parentId: keyVaultId,
      body: {
        properties: {
          value: this.instrumentationKey,
        },
      },
    });
  }

  private setupLogAnalytics(props: AppInsightsProps): string {
    if (cdktf.canInspect(props.workspaceResourceId || props.workspaceId)) {
      // Use the provided Log Analytics Workspace
      return props.workspaceResourceId || props.workspaceId!;
    } else {
      // Create a new Log Analytics Workspace using AzAPI
      const logAnalyticsWorkspace = new resource.Resource(
        this,
        "log_analytics",
        {
          type: "Microsoft.OperationalInsights/workspaces@2023-09-01",
          name: `${props.name}-la`,
          location: props.location,
          parentId: this.resourceGroup.resourceGroup.id,
          tags: props.tags,
          body: {
            properties: {
              sku: {
                name: "PerGB2018",
              },
              retentionInDays: props.retentionInDays ?? 90,
            },
          },
        },
      );
      return logAnalyticsWorkspace.id;
    }
  }
}
