# Azure Container Registry Construct

This module provides a CDK for Terraform construct for managing Azure Container Registries using the AZAPI provider for direct Azure REST API access.

## Features

- **Version-aware**: Supports multiple API versions with automatic latest version resolution
- **Schema-driven validation**: Built-in property validation based on API schemas
- **Full backward compatibility**: Works with all supported API versions
- **JSII-compliant**: Multi-language support (TypeScript, Python)
- **Tag management**: Built-in tag add/remove operations
- **Policy support**: Configure retention, trust, export, and soft delete policies

## Supported API Versions

| Version | Status | Description |
|---------|--------|-------------|
| 2025-04-01 | **Active** | Latest version with improved features |
| 2023-07-01 | Maintenance | Stable release with policy and encryption support |

## Basic Usage

```typescript
import { ContainerRegistry } from "@microsoft/terraform-cdk-constructs";

// Basic Container Registry with Standard SKU
const registry = new ContainerRegistry(this, "acr", {
  name: "mycontainerregistry",
  location: "eastus",
  resourceGroupId: resourceGroup.id,
  sku: { name: "Standard" },
});
```

## Advanced Usage

### Premium Registry with Security Features

```typescript
const registry = new ContainerRegistry(this, "acr", {
  name: "mycontainerregistry",
  location: "eastus",
  resourceGroupId: resourceGroup.id,
  sku: { name: "Premium" },
  publicNetworkAccess: "Disabled",
  zoneRedundancy: "Enabled",
  dataEndpointEnabled: true,
  networkRuleBypassOptions: "AzureServices",
  networkRuleSet: {
    defaultAction: "Deny",
    ipRules: [{ value: "10.0.0.0/24", action: "Allow" }],
  },
  identity: {
    type: "SystemAssigned",
  },
  tags: {
    environment: "production",
  },
});
```

### Registry with Policies

```typescript
const registry = new ContainerRegistry(this, "acr", {
  name: "mycontainerregistry",
  location: "eastus",
  resourceGroupId: resourceGroup.id,
  sku: { name: "Premium" },
  policies: {
    retentionPolicy: {
      days: 30,
      status: "enabled",
    },
    trustPolicy: {
      type: "Notary",
      status: "enabled",
    },
    exportPolicy: {
      status: "enabled",
    },
    softDeletePolicy: {
      retentionDays: 14,
      status: "enabled",
    },
  },
});
```

### Registry with Customer-Managed Key Encryption

```typescript
const registry = new ContainerRegistry(this, "acr", {
  name: "mycontainerregistry",
  location: "eastus",
  resourceGroupId: resourceGroup.id,
  sku: { name: "Premium" },
  encryption: {
    status: "enabled",
    keyVaultProperties: {
      identity: userAssignedIdentity.clientId,
      keyIdentifier: "https://myvault.vault.azure.net/keys/mykey/version",
    },
  },
  identity: {
    type: "UserAssigned",
    userAssignedIdentities: {
      [userAssignedIdentity.id]: {},
    },
  },
});
```

### Explicit API Version Pinning

```typescript
const registry = new ContainerRegistry(this, "acr", {
  name: "mycontainerregistry",
  location: "eastus",
  resourceGroupId: resourceGroup.id,
  sku: { name: "Standard" },
  apiVersion: "2023-07-01",
});
```

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `name` | string | Yes | - | Registry name (5-50 alphanumeric characters, globally unique) |
| `location` | string | Yes | - | Azure region |
| `sku` | object | Yes | - | SKU tier: Basic, Standard, or Premium |
| `resourceGroupId` | string | No | - | Parent resource group ID |
| `adminUserEnabled` | boolean | No | false | Enable admin user authentication |
| `publicNetworkAccess` | string | No | "Enabled" | Public network access (Enabled/Disabled) |
| `networkRuleSet` | object | No | - | Network rule set (Premium only) |
| `encryption` | object | No | - | Customer-managed key encryption (Premium only) |
| `policies` | object | No | - | Registry policies configuration |
| `identity` | object | No | - | Managed identity configuration |
| `zoneRedundancy` | string | No | "Disabled" | Zone redundancy (Premium only) |
| `dataEndpointEnabled` | boolean | No | false | Dedicated data endpoint (Premium only) |
| `anonymousPullEnabled` | boolean | No | false | Anonymous pull access |
| `networkRuleBypassOptions` | string | No | "AzureServices" | Trusted service bypass |
| `tags` | object | No | {} | Resource tags |
| `apiVersion` | string | No | Latest | API version to use |
| `ignoreChanges` | string[] | No | - | Properties to ignore during updates |

## Outputs

| Output | Description |
|--------|-------------|
| `idOutput` | The resource ID of the Container Registry |
| `locationOutput` | The Azure region of the Container Registry |
| `nameOutput` | The name of the Container Registry |
| `tagsOutput` | The tags assigned to the Container Registry |
| `loginServerOutput` | The login server URL (e.g., myregistry.azurecr.io) |

## Methods

| Method | Description |
|--------|-------------|
| `loginServer` | Get the login server URL |
| `addTag(key, value)` | Add a tag to the registry |
| `removeTag(key)` | Remove a tag from the registry |

## SKU Comparison

| Feature | Basic | Standard | Premium |
|---------|-------|----------|---------|
| Storage | 10 GiB | 100 GiB | 500 GiB |
| Network Rules | ❌ | ❌ | ✅ |
| Zone Redundancy | ❌ | ❌ | ✅ |
| Encryption (CMK) | ❌ | ❌ | ✅ |
| Data Endpoint | ❌ | ❌ | ✅ |
| Content Trust | ❌ | ❌ | ✅ |
| Anonymous Pull | ❌ | ✅ | ✅ |
| Geo-Replication | ❌ | ❌ | ✅ |
