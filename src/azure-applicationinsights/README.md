# Azure Application Insights Construct

This class represents an Application Insights resource in Azure using the AzAPI provider. It provides a convenient way to manage Azure Application Insights resources with a flattened, user-friendly interface.

## What is Azure Application Insights?

Azure Application Insights is an extensible Application Performance Management (APM) service for developers and DevOps professionals. Use it to monitor your live applications. It automatically detects performance anomalies, and includes powerful analytics tools to help you diagnose issues and to understand what users actually do with your app.

You can learn more about Azure Application Insights in the [official Azure documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview).

## Application Insights Best Practices

- Enable Application Insights during development and use it for all environments, including production.
- Use multiple Application Insights resources for different environments and use Azure resource tags to filter and identify them.
- Leverage the data retention policy to retain data according to your requirements.

## Application Insights Class Properties

This class uses a flattened interface that provides direct access to Application Insights properties without requiring knowledge of the underlying AzAPI schema:

### Core Properties
- `name`: The name of the Application Insights resource.
- `location`: The Azure Region where the Application Insights resource will be deployed.
- `resourceGroup`: The Azure Resource Group (optional - will create one if not provided).
- `applicationType`: The Application type (e.g., 'web', 'ios', 'other', 'store', 'java', 'phone').

### Configuration Properties
- `retentionInDays`: The number of days of retention (30, 60, 90, 120, 180, 270, 365, 550, or 730).
- `samplingPercentage`: Application Insights Sampling percentage.
- `disableIpMasking`: Disable IP masking.
- `disableLocalAuth`: Disable local authentication.
- `workspaceResourceId`: Resource Id of the Log Analytics workspace (auto-created if not provided).
- `publicNetworkAccessForIngestion`: Network access type for ingestion.
- `publicNetworkAccessForQuery`: Network access type for query.
- `tags`: The tags to assign to the Application Insights resource.

### Advanced Properties
- `forceCustomerStorageForProfiler`: Force users to create their own storage account for profiler and debugger.
- `ingestionMode`: The network access type for accessing Application Insights ingestion.
- `requestSource`: Describes what tool created this Application Insights component.
- `flowType`: Used by the Application Insights portal to determine which type of flow to show the user.
- `hockeyAppId`: Unique ID for this component.
- `hockeyAppToken`: Token used to authenticate communications with between Application Insights and HockeyApp.

## Deploying the Application Insights

You can deploy an Application Insights resource using this class like so:

```typescript
// Basic deployment with flattened properties
const azureAppInsights = new AppInsights(this, 'myAppInsights', {
  name: 'myAppInsights',
  location: 'East US',
  applicationType: 'web',
  retentionInDays: 90,
  disableIpMasking: false,
  samplingPercentage: 100,
  tags: {
    'environment': 'production',
    'project': 'myproject'
  },
});

// Advanced deployment with custom workspace
const azureAppInsights = new AppInsights(this, 'advancedAppInsights', {
  name: 'advancedAppInsights',
  location: 'West US',
  applicationType: 'web',
  retentionInDays: 365,
  workspaceResourceId: '/subscriptions/.../workspaces/my-workspace',
  publicNetworkAccessForIngestion: 'Enabled',
  publicNetworkAccessForQuery: 'Enabled',
  disableLocalAuth: true,
  tags: {
    'env': 'production',
    'cost-center': 'engineering'
  },
});
```

## Migration from AzureRM Provider

This construct now uses the AzAPI provider instead of the AzureRM provider. The interface has been flattened to provide a better developer experience:

### Before (AzureRM with nested properties)
```typescript
// Old approach with nested properties
new AppInsights(this, 'myAppInsights', {
  name: 'myAppInsights',
  properties: {
    Application_Type: 'web',
    RetentionInDays: 90,
    DisableIpMasking: false,
  }
});
```

### After (AzAPI with flattened properties)
```typescript
// New approach with flattened properties
new AppInsights(this, 'myAppInsights', {
  name: 'myAppInsights',
  applicationType: 'web',
  retentionInDays: 90,
  disableIpMasking: false,
});
```

## Backward Compatibility

The construct maintains backward compatibility with the legacy `properties` field. However, when both flattened properties and the legacy `properties` field are provided, the flattened properties take precedence.

This code will create a new Application Insights resource named myAppInsights in the West US Azure region with a production environment tag. The resource belongs to the resource group myResourceGroup, it has a daily data cap of 10 GB, sends notifications when the daily data cap is reached, retains data for 90 days, and uses the provided workspace ID.