# Azure Application Gateway Construct

This class represents an Azure Application Gateway resource. It provides a convenient way to manage Azure Application Gateway resources using the AzAPI provider.

## What is Azure Application Gateway?

Azure Application Gateway is a web traffic load balancer that enables you to manage traffic to your web applications. It offers various features like URL-based routing, session affinity, secure sockets layer (SSL) termination, Web Application Firewall (WAF), and more. This makes it an ideal choice for optimizing web app performance and reliability.

For more information, refer to the [official Azure documentation on Application Gateway](https://docs.microsoft.com/en-us/azure/application-gateway/).

## AzAPI Migration

This module has been migrated from the AzureRM provider to the AzAPI provider for better Azure REST API compatibility and access to the latest features. The interface has been flattened to provide a more user-friendly experience.

## Application Gateway Best Practices

- Use separate instances for production and non-production environments.
- Implement WAF to protect your web applications from common web vulnerabilities.
- Use URL-based routing for better control of the traffic distribution.
- Enable diagnostics and logging for better monitoring and troubleshooting.

## Interface

This class provides a flattened interface for easier configuration:

### Required Properties

- `name`: The name of the Application Gateway resource.
- `location`: The Azure region where the Application Gateway will be deployed.
- `skuTier`: The pricing tier (e.g., Standard_v2, WAF_v2).
- `skuSize`: The size of the Application Gateway instance.

### Core Configuration

- `capacity`: The number of instances for the Application Gateway.
- `gatewayIpConfigurations`: Gateway IP configurations (subnet associations).
- `frontendIpConfigurations`: Frontend IP configurations (public/private IPs).
- `frontendPorts`: Frontend ports configuration.
- `backendAddressPools`: Backend address pools for routing traffic.
- `backendHttpSettings`: HTTP settings for the backend address pool.
- `httpListeners`: HTTP listeners for processing incoming traffic.
- `requestRoutingRules`: Routing rules for directing traffic.

### Optional Properties

- `resourceGroup`: The Azure Resource Group (will be created if not provided).
- `tags`: Tags for identifying and categorizing the Application Gateway.
- `enableHttp2`: Enable HTTP/2 support.
- `enableFips`: Enable FIPS-compliant algorithms.
- `autoscaleConfiguration`: Autoscaling configuration.
- `wafConfiguration`: Web Application Firewall configuration.
- `zones`: Availability zones.
- `identity`: Managed identity configuration.
- Additional properties for advanced configurations (SSL certificates, probes, etc.).

## Basic Usage

Here's an example of how to deploy an Application Gateway using the new flattened interface:

```typescript
import { Gateway } from "@microsoft/terraform-cdk-constructs/azure-applicationgateway";

const appGateway = new Gateway(this, 'myAppGateway', {
  name: 'myAppGateway',
  location: 'eastus',
  skuTier: 'Standard_v2',
  skuSize: 'Standard_v2',
  capacity: 2,
  
  // Gateway IP configuration (subnet association)
  gatewayIpConfigurations: [{
    name: 'gateway-ip-config',
    subnet: { id: '/subscriptions/.../subnets/gateway-subnet' }
  }],
  
  // Frontend configuration
  frontendIpConfigurations: [{
    name: 'frontend-ip-config',
    publicIPAddress: { id: '/subscriptions/.../publicIPAddresses/gateway-pip' }
  }],
  
  frontendPorts: [
    { name: 'port-80', port: 80 },
    { name: 'port-443', port: 443 }
  ],
  
  // Backend configuration
  backendAddressPools: [{
    name: 'backend-pool',
    backendAddresses: [
      { ipAddress: '10.0.1.4' },
      { ipAddress: '10.0.1.5' }
    ]
  }],
  
  backendHttpSettings: [{
    name: 'backend-http-settings',
    port: 80,
    protocol: 'Http',
    cookieBasedAffinity: 'Disabled',
    requestTimeout: 20
  }],
  
  // Listeners and routing
  httpListeners: [{
    name: 'http-listener',
    frontendIPConfiguration: { id: 'frontend-ip-config' },
    frontendPort: { id: 'port-80' },
    protocol: 'Http'
  }],
  
  requestRoutingRules: [{
    name: 'routing-rule',
    ruleType: 'Basic',
    httpListener: { id: 'http-listener' },
    backendAddressPool: { id: 'backend-pool' },
    backendHttpSettings: { id: 'backend-http-settings' }
  }],
  
  tags: {
    Environment: 'production',
    Application: 'web-app'
  }
});
```

## Advanced Configuration

### With Web Application Firewall

```typescript
const wafGateway = new Gateway(this, 'wafGateway', {
  name: 'waf-gateway',
  location: 'eastus',
  skuTier: 'WAF_v2',
  skuSize: 'WAF_v2',
  capacity: 2,
  
  // ... basic configuration ...
  
  wafConfiguration: {
    enabled: true,
    firewallMode: 'Prevention',
    ruleSetType: 'OWASP',
    ruleSetVersion: '3.2'
  }
});
```

### With Autoscaling

```typescript
const autoscaleGateway = new Gateway(this, 'autoscaleGateway', {
  name: 'autoscale-gateway',
  location: 'eastus',
  skuTier: 'Standard_v2',
  skuSize: 'Standard_v2',
  
  // ... basic configuration ...
  
  autoscaleConfiguration: {
    minCapacity: 2,
    maxCapacity: 10
  }
});
```

## Migration from AzureRM

If you're migrating from the previous AzureRM-based version, the legacy `properties` interface is still supported for backward compatibility:

```typescript
// Legacy interface (deprecated but supported)
const legacyGateway = new Gateway(this, 'legacyGateway', {
  name: 'legacy-gateway',
  location: 'eastus',
  skuTier: 'Standard_v2',
  skuSize: 'Standard_v2',
  
  properties: {
    sku: {
      name: 'Standard_v2',
      tier: 'Standard_v2',
      capacity: 2
    },
    gatewayIPConfigurations: [/*...*/],
    frontendIPConfigurations: [/*...*/],
    // ... other legacy properties
  }
});
```

However, it's recommended to migrate to the new flattened interface for better developer experience and future compatibility.

## Resource Outputs

The construct exposes the following outputs:

- `id`: The resource ID of the Application Gateway
- `resource`: The underlying AzAPI resource for advanced scenarios

## Examples

For more comprehensive examples, see the test files in the `test/` directory.