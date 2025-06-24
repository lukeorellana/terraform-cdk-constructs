# Azure Log Analytics Workspace Construct

This class represents a Log Analytics Workspace in Azure using the AzAPI provider. It provides a convenient way to manage Azure Log Analytics Workspaces with a user-friendly interface that hides the underlying AzAPI implementation details.

## What is a Log Analytics Workspace?

Azure Log Analytics Workspace is a unique environment for Azure Monitor log data. Each workspace has its own data repository and configuration, and data sources and solutions are configured to store their data in that workspace.

You can learn more about Log Analytics Workspace in the [official Azure documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/data-platform-logs).

## Log Analytics Workspace Best Practices

- Consolidate your data in a limited number of workspaces.
- Assign a workspace at the management group level.
- Log minimal data initially, and then increase as necessary.
- Create a data export rule for long-term retention and cold data.
- Assign Azure RBAC roles for Azure Monitor Logs.

## Log Analytics Workspace Class Properties

The class offers numerous properties for tailoring the Log Analytics Workspace, with a flattened interface for better user experience:

### Core Properties
- **name**: The name of the Log Analytics Workspace.
- **location**: The Azure region where the workspace will be deployed.
- **resourceGroup**: The Azure Resource Group that the workspace belongs to.
- **tags**: Key-value pairs for resource tagging and categorization.

### Workspace Configuration (Flattened Interface)
- **sku**: The SKU configuration for the workspace (e.g., `{ name: "PerGB2018" }`).
- **retentionInDays**: The workspace data retention in days (default: 30).
- **dailyQuotaGb**: The workspace daily quota for ingestion in GB.
- **publicNetworkAccessForIngestion**: Network access type for ingestion ("Enabled" or "Disabled").
- **publicNetworkAccessForQuery**: Network access type for query ("Enabled" or "Disabled").
- **forceCmkForQuery**: Whether customer managed storage is mandatory for query management.
- **defaultDataCollectionRuleResourceId**: The resource ID of the default Data Collection Rule.

### Workspace Features (Flattened Interface)
- **enableDataExport**: Flag that indicates if data should be exported.
- **enableLogAccessUsingOnlyResourcePermissions**: Permission model for log access.
- **disableLocalAuth**: Disable Non-AAD based authentication.
- **immediatePurgeDataOn30Days**: Remove data after 30 days.
- **clusterResourceId**: Dedicated LA cluster resourceId linked to the workspace.

## Deploying the Log Analytics Workspace

### Basic Example
```typescript
const azureLogAnalytics = new la.Workspace(this, 'myLogAnalytics', {
  name: 'my-log-analytics',
  location: 'East US',
  sku: { name: 'PerGB2018' },
  retentionInDays: 30,
  tags: {
    environment: 'production',
    team: 'platform',
  },
});
```

### Advanced Example with All Features
```typescript
const advancedLogAnalytics = new la.Workspace(this, 'advancedLogAnalytics', {
  name: 'advanced-log-analytics',
  location: 'East US',
  resourceGroup: myResourceGroup,
  sku: { name: 'PerGB2018' },
  retentionInDays: 90,
  dailyQuotaGb: 10,
  publicNetworkAccessForIngestion: 'Enabled',
  publicNetworkAccessForQuery: 'Enabled',
  enableDataExport: true,
  enableLogAccessUsingOnlyResourcePermissions: false,
  disableLocalAuth: true,
  immediatePurgeDataOn30Days: false,
  forceCmkForQuery: false,
  tags: {
    environment: 'production',
    team: 'platform',
    costCenter: 'engineering',
  },
});
```

## Migration from Legacy Interface

The construct supports backward compatibility with the legacy nested `properties` interface, but the new flattened interface is recommended:

### Legacy (Still Supported)
```typescript
new la.Workspace(this, 'workspace', {
  name: 'my-workspace',
  location: 'East US',
  properties: {  // Nested properties (legacy)
    sku: { name: 'PerGB2018' },
    retentionInDays: 90,
    features: {
      enableDataExport: true,
    },
  },
});
```

### New Recommended Interface
```typescript
new la.Workspace(this, 'workspace', {
  name: 'my-workspace',
  location: 'East US',
  sku: { name: 'PerGB2018' },      // Flattened properties (recommended)
  retentionInDays: 90,
  enableDataExport: true,
});
```

## Cost Optimization

In Azure Log Analytics, you are charged for data ingestion and data retention. You pay almost 9x more for data ingested than for data stored. The first 30 days of storage retention are free.

To optimize your costs:
- **Filter ingested data**: Only log data that will be used
- **Set daily quotas**: Use `dailyQuotaGb` to control ingestion costs
- **Use appropriate retention**: Set `retentionInDays` based on your needs
- **Enable data export**: Use `enableDataExport: true` for long-term retention and cold data

By using this Log Analytics Workspace Construct, you can efficiently manage your Azure Monitor data collection with a simplified interface that abstracts away the AzAPI complexity while providing full access to all workspace features.