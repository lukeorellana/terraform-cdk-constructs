# Azure Kubernetes Service (AKS) Construct

This documentation details the Azure Kubernetes Service (AKS) Construct, a specialized class designed to simplify the deployment and management of AKS clusters in Azure using the AzAPI provider. It encapsulates the complexities of AKS configuration into an easy-to-use construct with a user-friendly interface that hides the underlying AzAPI implementation details.

## What is Azure Kubernetes Service (AKS)?

Azure Kubernetes Service (AKS) is a managed container orchestration service, based on Kubernetes, that facilitates the deployment, management, and scaling of containerized applications on Azure. It eliminates the complexity of handling the Kubernetes infrastructure, providing users with a serverless Kubernetes, an integrated continuous integration and continuous delivery (CI/CD) experience, and enterprise-grade security and governance.

Learn more about AKS in the official Azure documentation.

## Best Practices for AKS

- **Node Pool Management**: Utilize multiple node pools to separate workloads and manage them efficiently.
- **Security and Identity**: Leverage Azure Active Directory (AAD) integration for AKS to manage user access and maintain security.
- **Monitoring and Diagnostics**: Implement Azure Monitor for containers to gain insights into your AKS clusters and workloads.
- **Cost Management**: Use Azure Advisor to optimize your AKS cluster's performance and manage costs effectively.

## AKS Class Properties

The class offers numerous properties for tailoring the AKS cluster, with a flattened interface for better user experience:

### Core Properties
- **name**: The unique name of the AKS cluster.
- **location**: The Azure region where the AKS cluster will be deployed.
- **resourceGroup**: The Azure Resource Group that the AKS cluster belongs to.
- **identity**: Specifies the identity used for the AKS cluster (SystemAssigned or UserAssigned).
- **tags**: Key-value pairs for resource tagging and categorization.

### Cluster Configuration (Flattened Interface)
- **agentPoolProfiles**: Array of agent pool configurations for the cluster nodes.
- **dnsPrefix**: DNS prefix for the cluster (defaults to cluster name).
- **enableRBAC**: Whether to enable Kubernetes Role-Based Access Control (defaults to true).
- **aadProfile**: Azure Active Directory configuration for the cluster.
- **kubernetesVersion**: Kubernetes version for the cluster.
- **networkProfile**: Network configuration for the cluster.
- **linuxProfile**: Linux VM configuration for the cluster.
- **windowsProfile**: Windows VM configuration for the cluster.
- **apiServerAccessProfile**: API server access configuration.
- **autoScalerProfile**: Cluster autoscaler configuration.
- **securityProfile**: Security configuration for the cluster.

## Deploying the AKS Cluster

### Basic Example
```typescript
const myAKSCluster = new Cluster(this, 'myAKSCluster', {
  name: 'myCluster',
  location: 'East US',
  agentPoolProfiles: [
    {
      name: "default",
      count: 3,
      vmSize: "Standard_DS2_v2",
      type: "VirtualMachineScaleSets",
    }
  ],
  dnsPrefix: 'mycluster',
  enableRBAC: true,
  resourceGroup: myResourceGroup,
  identity: {
    type: "SystemAssigned",
  },
});
```

### Advanced Example with AAD Integration
```typescript
const advancedAKSCluster = new Cluster(this, 'advancedAKSCluster', {
  name: 'advanced-cluster',
  location: 'East US',
  agentPoolProfiles: [
    {
      name: "system",
      count: 3,
      vmSize: "Standard_D4s_v3",
      type: "VirtualMachineScaleSets",
      mode: "System",
    },
    {
      name: "user",
      count: 2,
      vmSize: "Standard_D8s_v3",
      type: "VirtualMachineScaleSets",
      mode: "User",
    }
  ],
  dnsPrefix: 'advanced-cluster',
  enableRBAC: true,
  kubernetesVersion: "1.28.0",
  aadProfile: {
    managed: true,
    enableAzureRbac: true,
    adminGroupObjectIds: ["your-admin-group-id"],
  },
  networkProfile: {
    networkPlugin: "azure",
    serviceCidr: "10.0.0.0/16",
    dnsServiceIp: "10.0.0.10",
  },
  identity: {
    type: "SystemAssigned",
  },
  tags: {
    environment: "production",
    team: "platform",
  },
});
```

## Migration from Legacy Interface

The construct supports backward compatibility with the legacy nested `properties` interface, but the new flattened interface is recommended:

### Legacy (Still Supported)
```typescript
new Cluster(this, 'cluster', {
  name: 'myCluster',
  location: 'East US',
  properties: {  // Nested properties (legacy)
    agentPoolProfiles: [...],
    enableRBAC: true,
  },
});
```

### New Recommended Interface
```typescript
new Cluster(this, 'cluster', {
  name: 'myCluster',
  location: 'East US',
  agentPoolProfiles: [...],  // Flattened properties (recommended)
  enableRBAC: true,
});
```

## Setting Up a Resource Group
If a resource group is not specified, the construct will automatically create one based on the AKS cluster's name and location. This ensures that the AKS cluster is associated with a resource group, either existing or newly created.

## Integrating with Azure Active Directory (AAD)
For enhanced security, integrate AKS with Azure Active Directory (AAD) for authentication and authorization using the `aadProfile` property:

```typescript
aadProfile: {
  managed: true,
  enableAzureRbac: true,
  adminGroupObjectIds: ["group-id-1", "group-id-2"],
}
```

## Monitoring and Management
Leverage Azure Monitor and Azure Policy to monitor the health and performance of your AKS cluster and enforce organizational policies. These services help maintain the security and compliance of your Kubernetes applications.

By using this AKS Construct, developers can more efficiently manage Kubernetes clusters in Azure, benefiting from the scalability, reliability, and security features of AKS. The flattened interface abstracts away the AzAPI complexity, making it easier to deploy and operate Kubernetes workloads in the cloud.