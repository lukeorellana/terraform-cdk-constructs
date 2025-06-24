# Azure Container Registry Construct

This class represents an Azure Container Registry resource built with AzAPI. It provides a comprehensive way to manage Azure Container Registry resources and their child components.

## What is Azure Container Registry?

Azure Container Registry is a managed Docker registry service for building, storing, and managing container images and artifacts in a secure, scalable way. Azure Container Registry integrates well with orchestrators hosted in Azure Container Service, including Docker Swarm, Kubernetes, and DC/OS, as well as other Azure Services such as Service Fabric and Batch.

You can learn more about Azure Container Registry in the [official Azure documentation](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-intro).

## Container Registry Best Practices

- Use Premium SKU for production workloads to get advanced features
- Enable the admin account only when necessary and disable it when not in use
- Use role-based access control (RBAC) to manage access to your Azure Container Registry
- Regularly remove untagged and unused images to manage costs
- Configure geo-replication for high availability and reduced latency
- Use webhooks to automate CI/CD workflows
- Implement proper network security with network rules and private endpoints

## Container Registry Class Properties

This class supports comprehensive Azure Container Registry configuration:

### Basic Properties
- `name`: The name of the Azure Container Registry
- `location`: The Azure Region where the Azure Container Registry will be deployed
- `resourceGroup`: Optional reference to the resource group (auto-created if not provided)
- `sku`: The SKU of the Azure Container Registry (Basic, Standard, Premium)
- `tags`: The tags to assign to the Azure Container Registry

### Advanced Properties (via `properties`)
- `adminUserEnabled`: Enable/disable admin user access
- `anonymousPullEnabled`: Allow unauthenticated pulls (Premium SKU only)
- `dataEndpointEnabled`: Enable data endpoint per region
- `publicNetworkAccess`: Control public network access
- `zoneRedundancy`: Enable zone redundancy (Premium SKU only)
- `networkRuleSet`: Configure IP access rules
- `policies`: Configure registry policies (retention, trust, quarantine, etc.)
- `encryption`: Configure customer-managed key encryption

## Child Resources

The Registry class supports adding various child resources:

### Webhooks
Automate workflows by triggering HTTP POST requests when events occur:

```typescript
registry.addWebhook({
  name: "myWebhook",
  properties: {
    actions: ["push", "delete"],
    serviceUri: "https://example.com/webhook",
    status: "enabled",
    scope: "myrepo:*",
  },
});
```

### Scope Maps
Define repository permissions for tokens:

```typescript
registry.addScopeMap({
  name: "myScopeMap",
  properties: {
    actions: [
      "repositories/*/content/read",
      "repositories/*/content/write",
    ],
    description: "Read and write access to all repositories",
  },
});
```

### Tokens
Create tokens for programmatic access:

```typescript
registry.addToken({
  name: "myToken",
  properties: {
    scopeMapId: "/subscriptions/.../scopeMaps/myScopeMap",
    status: "enabled",
  },
});
```

### Replications
Configure geo-replication:

```typescript
registry.addReplication({
  name: "westus2replication",
  location: "westus2",
  properties: {
    regionEndpointEnabled: true,
    zoneRedundancy: "Enabled",
  },
});
```

### Cache Rules
Configure artifact caching (Premium SKU only):

```typescript
registry.addCacheRule({
  name: "myCacheRule",
  properties: {
    sourceRepository: "docker.io/library/hello-world",
    targetRepository: "cached/hello-world",
  },
});
```

## Deploying the Azure Container Registry

### Basic Deployment

```typescript
const registry = new Registry(this, 'myContainerRegistry', {
  name: 'myContainerRegistry',
  location: 'East US',
  sku: { name: 'Premium' },
  properties: {
    adminUserEnabled: false,
    publicNetworkAccess: 'Enabled',
  },
  tags: {
    environment: 'production',
  },
});
```

### Advanced Deployment with Child Resources

```typescript
const registry = new Registry(this, 'advancedRegistry', {
  name: 'advancedacr',
  location: 'East US',
  sku: { name: 'Premium' },
  properties: {
    adminUserEnabled: false,
    publicNetworkAccess: 'Enabled',
    policies: {
      retentionPolicy: {
        status: 'enabled',
        days: 30,
      },
      trustPolicy: {
        status: 'enabled',
        type: 'Notary',
      },
    },
    networkRuleSet: {
      defaultAction: 'Deny',
      ipRules: [
        {
          action: 'Allow',
          value: '10.0.0.0/8',
        },
      ],
    },
  },
});

// Add geo-replication
registry.addReplication({
  name: 'westus2',
  location: 'West US 2',
  properties: {
    regionEndpointEnabled: true,
    zoneRedundancy: 'Enabled',
  },
});

// Add webhook for CI/CD
registry.addWebhook({
  name: 'cicdWebhook',
  properties: {
    actions: ['push'],
    serviceUri: 'https://ci.example.com/webhook',
    status: 'enabled',
  },
});
```