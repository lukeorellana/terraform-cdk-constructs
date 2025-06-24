# Azure Action Group Construct

## What is Azure Action Group?

An Azure Action Group enables you to organize and manage notifications and responses triggered by Azure Monitor alerts. You can define recipients and a list of actions to execute when an alert is triggered. Official Documentation can be found [here](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/action-groups).

## Azure Action Group Class Properties

This class uses the **AzAPI provider** and provides a **flattened properties interface** for ease of use. It supports both the new flattened interface and legacy properties for backward compatibility.

### Core Properties

- `name`: The name of the Action Group resource.
- `resourceGroup`: (Optional) An optional reference to the resource group in which to deploy the Action Group. If not provided, a new resource group will be created.
- `location`: (Optional) The Azure Region where the Action Group resource should exist. Should be `global`, `swedencentral`, `germanywestcentral`, `northcentralus`, `southcentralus`, `eastus2`. Defaults to `global`.
- `tags`: (Optional) A mapping of tags to assign to the Action Group resource.

### Flattened Action Group Properties

- `shortName`: The short name of the Action Group resource. This will be used in SMS messages. The length should be in the range (1 - 12).
- `enabled`: (Optional) Whether the Action Group resource is enabled. Defaults to `true`.

### Receiver Configuration (Flattened Interface)

All receiver types can be configured directly on the main interface:

- `armRoleReceivers`: (Optional) A list of ARM role receivers.
- `emailReceivers`: (Optional) A list of email receivers.
- `smsReceivers`: (Optional) A list of SMS receivers.
- `voiceReceivers`: (Optional) A list of voice receivers.
- `webhookReceivers`: (Optional) A list of webhook receivers.
- `eventHubReceivers`: (Optional) A list of Event Hub receivers.
- `azureAppPushReceivers`: (Optional) A list of Azure app push receivers.
- `logicAppReceivers`: (Optional) A list of Logic App receivers.

### Legacy Support

For backward compatibility, the legacy `properties` field is still supported:

- `properties`: (Optional, **deprecated**) Action Group properties using AzAPI schema. Use the flattened properties directly instead.

**Note:** Flattened properties take precedence over legacy properties when both are provided.

## Deploying an Action Group

### Using the New Flattened Interface (Recommended)

```typescript
import { ActionGroup } from "@cdktf/provider-azure-constructs/azure-actiongroup";
import { ResourceGroup } from "@cdktf/provider-azure-constructs/azure-resourcegroup";

// Create Resource Group (optional - will be created automatically if not provided)
const resourceGroup = new ResourceGroup(this, "myResourceGroup", {
  name: "myResourceGroup",
  location: "eastus",
});

// Create Action Group with flattened interface
const actionGroup = new ActionGroup(this, "testAzureActionGroup", {
  name: "testactiongroup",
  resourceGroup: resourceGroup,
  shortName: "testshortn",
  enabled: true,
  location: "global",
  emailReceivers: [
    {
      name: "admin",
      emailAddress: "admin@example.com",
      useCommonAlertSchema: true,
    },
    {
      name: "devteam",
      emailAddress: "dev@example.com",
      useCommonAlertSchema: false,
    },
  ],
  smsReceivers: [
    {
      name: "adminSms",
      countryCode: "1",
      phoneNumber: "5551234567",
    },
  ],
  webhookReceivers: [
    {
      name: "webhook1",
      serviceUri: "https://example.com/webhook",
      useCommonAlertSchema: true,
    },
  ],
  tags: {
    environment: "production",
    team: "platform",
  },
});
```

### Using All Receiver Types

```typescript
const actionGroup = new ActionGroup(this, "comprehensiveActionGroup", {
  name: "comprehensive-action-group",
  shortName: "comprehensive",
  enabled: true,
  emailReceivers: [
    {
      name: "admin",
      emailAddress: "admin@example.com",
      useCommonAlertSchema: true,
    },
  ],
  smsReceivers: [
    {
      name: "adminSms",
      countryCode: "1",
      phoneNumber: "5551234567",
    },
  ],
  voiceReceivers: [
    {
      name: "adminVoice",
      countryCode: "1",
      phoneNumber: "5551234567",
    },
  ],
  webhookReceivers: [
    {
      name: "webhook1",
      serviceUri: "https://example.com/webhook",
      useCommonAlertSchema: false,
    },
  ],
  armRoleReceivers: [
    {
      name: "contributorRole",
      roleId: "b24988ac-6180-42a0-ab88-20f7382dd24c",
      useCommonAlertSchema: true,
    },
  ],
  azureAppPushReceivers: [
    {
      name: "mobileApp",
      emailAddress: "mobile@example.com",
    },
  ],
  logicAppReceivers: [
    {
      name: "logicApp1",
      resourceId: "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Logic/workflows/workflow",
      callbackUrl: "https://example.com/callback",
      useCommonAlertSchema: true,
    },
  ],
  eventHubReceivers: [
    {
      name: "eventHub1",
      eventHubName: "myeventhub",
      eventHubNameSpace: "mynamespace",
      subscriptionId: "subscription-id",
      useCommonAlertSchema: false,
    },
  ],
});
```

## Migration from AzureRM to AzAPI

If you're migrating from the previous AzureRM-based implementation:

### Key Changes

1. **Provider**: Now uses AzAPI instead of AzureRM
2. **Flattened Interface**: All Action Group properties are now available at the top level
3. **Resource Group**: Can now accept a `ResourceGroup` construct instead of just a string name
4. **Backward Compatibility**: Legacy `properties` field is still supported but deprecated

### Migration Steps

1. **Update imports**: Import from the new AzAPI-based module
2. **Use flattened properties**: Move receiver configurations to the top level
3. **Update resource group reference**: Use `ResourceGroup` construct instead of string
4. **Test thoroughly**: Ensure all functionality works as expected

### Before (AzureRM)

```typescript
const actionGroup = new ActionGroup(this, "actionGroup", {
  name: "test-action-group",
  resourceGroupName: "my-rg",
  shortName: "test",
  emailReceivers: [...],
});
```

### After (AzAPI with Flattened Interface)

```typescript
const actionGroup = new ActionGroup(this, "actionGroup", {
  name: "test-action-group",
  resourceGroup: myResourceGroup,  // ResourceGroup construct
  shortName: "test",               // Flattened property
  emailReceivers: [...],           // Flattened property
});
```

### Legacy Properties Support

If you need to maintain the old structure temporarily, you can still use the `properties` field:

```typescript
const actionGroup = new ActionGroup(this, "actionGroup", {
  name: "test-action-group",
  shortName: "test",
  properties: {
    groupShortName: "legacy",
    enabled: true,
    emailReceivers: [...],
  },
});
```

**Note:** Flattened properties will override legacy properties when both are provided.

## API Reference

For detailed API documentation, please refer to the TypeScript interfaces in the source code.
