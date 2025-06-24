import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup";
import { AzureResource } from "../../core-azure";

/**
 * Azure Managed Cluster SKU configuration.
 */
export interface ManagedClusterSku {
  /**
   * The name of a managed cluster SKU.
   */
  name?: string;
  /**
   * If not specified, the default is 'Free'. See [AKS Pricing Tier](https://learn.microsoft.com/azure/aks/free-standard-pricing-tiers) for more details.
   */
  tier?: string;
}

/**
 * Properties of a managed cluster.
 */
export interface ManagedClusterProperties {
  /**
   * The Azure Active Directory configuration.
   */
  aadProfile?: ManagedClusterAadProfile;
  /**
   * The agent pool properties.
   */
  agentPoolProfiles?: ManagedClusterAgentPoolProfile[];
  /**
   * The access profile for managed cluster API server.
   */
  apiServerAccessProfile?: ManagedClusterApiServerAccessProfile;
  /**
   * Parameters to be applied to the cluster-autoscaler when enabled
   */
  autoScalerProfile?: ManagedClusterPropertiesAutoScalerProfile;
  /**
   * The auto upgrade configuration.
   */
  autoUpgradeProfile?: ManagedClusterAutoUpgradeProfile;
  /**
   * If set to true, getting static credentials will be disabled for this cluster. This must only be used on Managed Clusters that are AAD enabled. For more details see [disable local accounts](https://docs.microsoft.com/azure/aks/managed-aad#disable-local-accounts-preview).
   */
  disableLocalAccounts?: boolean;
  /**
   * This cannot be updated once the Managed Cluster has been created.
   */
  dnsPrefix?: string;
  /**
   * Whether to enable Kubernetes Role-Based Access Control.
   */
  enableRBAC?: boolean;
  /**
   * Identities associated with the cluster.
   */
  identityProfile?: { [key: string]: UserAssignedIdentity };
  /**
   * Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. When you upgrade a supported AKS cluster, Kubernetes minor versions cannot be skipped. All upgrades must be performed sequentially by major version number. For example, upgrades between 1.14.x -> 1.15.x or 1.15.x -> 1.16.x are allowed, however 1.14.x -> 1.16.x is not allowed. See [upgrading an AKS cluster](https://docs.microsoft.com/azure/aks/upgrade-cluster) for more details.
   */
  kubernetesVersion?: string;
  /**
   * The profile for Linux VMs in the Managed Cluster.
   */
  linuxProfile?: ContainerServiceLinuxProfile;
  /**
   * The network configuration profile.
   */
  networkProfile?: ContainerServiceNetworkProfile;
  /**
   * The name of the resource group containing agent pool nodes.
   */
  nodeResourceGroup?: string;
  /**
   * The OIDC issuer profile of the Managed Cluster.
   */
  oidcIssuerProfile?: ManagedClusterOidcIssuerProfile;
  /**
   * Allow or deny public network access for AKS
   */
  publicNetworkAccess?: string;
  /**
   * Security profile for the managed cluster.
   */
  securityProfile?: ManagedClusterSecurityProfile;
  /**
   * Information about a service principal identity for the cluster to use for manipulating Azure APIs.
   */
  servicePrincipalProfile?: ManagedClusterServicePrincipalProfile;
  /**
   * Settings for upgrading a cluster.
   */
  upgradeSettings?: ClusterUpgradeSettings;
  /**
   * The profile for Windows VMs in the Managed Cluster.
   */
  windowsProfile?: ManagedClusterWindowsProfile;
  /**
   * Workload Auto-scaler profile for the managed cluster.
   */
  workloadAutoScalerProfile?: ManagedClusterWorkloadAutoScalerProfile;
}

/**
 * Azure Active Directory configuration.
 */
export interface ManagedClusterAadProfile {
  /**
   * The server AAD application ID.
   */
  serverAppId?: string;
  /**
   * The server AAD application secret.
   */
  serverAppSecret?: string;
  /**
   * The client AAD application ID.
   */
  clientAppId?: string;
  /**
   * The tenant ID for the tenant that the cluster will be created in.
   */
  tenantId?: string;
  /**
   * Whether to enable AAD
   */
  managed?: boolean;
  /**
   * Whether to enable Azure RBAC for Kubernetes authorization.
   */
  enableAzureRbac?: boolean;
  /**
   * AAD group object IDs that will have admin role of the cluster.
   */
  adminGroupObjectIds?: string[];
}

/**
 * Agent pool profile
 */
export interface ManagedClusterAgentPoolProfile {
  /**
   * Number of agents (VMs) to host docker containers. Allowed values must be in the range of 0 to 1000 (inclusive) for user pools and in the range of 1 to 1000 (inclusive) for system pools. The default value is 1.
   */
  count?: number;
  /**
   * VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions
   */
  vmSize?: string;
  /**
   * OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified.
   */
  osDiskSizeGb?: number;
  /**
   * OS Disk type to be used for machines in a given agent pool. Allowed values are 'Ephemeral' and 'Managed'. If unspecified, defaults to 'Ephemeral' when the VM supports ephemeral OS and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os).
   */
  osDiskType?: string;
  /**
   * A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools
   */
  type?: string;
  /**
   * Whether to enable auto-scaler
   */
  enableAutoScaling?: boolean;
  /**
   * The minimum number of nodes for auto-scaling
   */
  minCount?: number;
  /**
   * The maximum number of nodes for auto-scaling
   */
  maxCount?: number;
  /**
   * Agent pool name.
   */
  name: string;
  /**
   * OsType to be used to specify os type. Choose from Linux and Windows. Default to Linux.
   */
  osType?: string;
  /**
   * If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}
   */
  vnetSubnetId?: string;
  /**
   * If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}
   */
  podSubnetId?: string;
  /**
   * Availability zones for nodes. Must use VirtualMachineScaleSets AgentPoolType.
   */
  availabilityZones?: string[];
  /**
   * The tags to be persisted on the agent pool virtual machine scale set.
   */
  tags?: { [key: string]: string };
}

/**
 * API server access profile
 */
export interface ManagedClusterApiServerAccessProfile {
  /**
   * The list of authorized IP ranges to access the Kubernetes API server.
   */
  authorizedIpRanges?: string[];
  /**
   * Whether to create the cluster as a private cluster or not.
   */
  enablePrivateCluster?: boolean;
  /**
   * The default private DNS zone for the cluster.
   */
  privateDnsZone?: string;
}

/**
 * Auto-scaler profile
 */
export interface ManagedClusterPropertiesAutoScalerProfile {
  /**
   * Valid values are 'true' and 'false'
   */
  balanceSimilarNodeGroups?: string;
  /**
   * If not specified, the default is 'random'. See [expanders](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) for more information.
   */
  expander?: string;
  /**
   * The default is 10.
   */
  maxEmptyBulkDelete?: string;
  /**
   * The default is 600.
   */
  maxGracefulTerminationSec?: string;
  /**
   * The default is '15m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
   */
  maxNodeProvisionTime?: string;
  /**
   * The default is 45. The maximum is 100 and the minimum is 0.
   */
  maxTotalUnreadyPercentage?: string;
  /**
   * For scenarios like burst/batch scale where you don't want CA to act before the kubernetes scheduler could schedule all the pods, you can tell CA to ignore unscheduled pods before they're a certain age. The default is '0s'. Values must be an integer followed by a unit ('s' for seconds, 'm' for minutes, 'h' for hours, etc).
   */
  newPodScaleUpDelay?: string;
  /**
   * This must be an integer. The default is 3.
   */
  okTotalUnreadyCount?: string;
  /**
   * The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
   */
  scaleDownDelayAfterAdd?: string;
  /**
   * The default is the scan-interval. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
   */
  scaleDownDelayAfterDelete?: string;
  /**
   * The default is '3m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
   */
  scaleDownDelayAfterFailure?: string;
  /**
   * The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
   */
  scaleDownUnneededTime?: string;
  /**
   * The default is '20m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
   */
  scaleDownUnreadyTime?: string;
  /**
   * The default is '0.5'.
   */
  scaleDownUtilizationThreshold?: string;
  /**
   * The default is '10'. Values must be an integer number of seconds.
   */
  scanInterval?: string;
  /**
   * The default is true.
   */
  skipNodesWithLocalStorage?: string;
  /**
   * The default is true.
   */
  skipNodesWithSystemPods?: string;
}

/**
 * Auto upgrade profile
 */
export interface ManagedClusterAutoUpgradeProfile {
  /**
   * For more information see [setting the AKS cluster auto-upgrade channel](https://docs.microsoft.com/azure/aks/upgrade-cluster#set-auto-upgrade-channel).
   */
  upgradeChannel?: string;
}

/**
 * User assigned identity
 */
export interface UserAssignedIdentity {
  /**
   * The resource ID of the user assigned identity.
   */
  resourceId?: string;
  /**
   * The client ID of the user assigned identity.
   */
  clientId?: string;
  /**
   * The object ID of the user assigned identity.
   */
  objectId?: string;
}

/**
 * Linux profile
 */
export interface ContainerServiceLinuxProfile {
  /**
   * The administrator username to use for Linux VMs.
   */
  adminUsername: string;
  /**
   * SSH configuration for Linux-based VMs running on Azure.
   */
  ssh: ContainerServiceSshConfiguration;
}

/**
 * SSH configuration
 */
export interface ContainerServiceSshConfiguration {
  /**
   * The list of SSH public keys used to authenticate with Linux-based VMs. A maximum of 1 key may be specified.
   */
  publicKeys: ContainerServiceSshPublicKey[];
}

/**
 * SSH public key
 */
export interface ContainerServiceSshPublicKey {
  /**
   * Certificate public key used to authenticate with VMs through SSH. The certificate must be in PEM format with or without headers.
   */
  keyData: string;
}

/**
 * Network profile
 */
export interface ContainerServiceNetworkProfile {
  /**
   * Network plugin used for building the Kubernetes network.
   */
  networkPlugin?: string;
  /**
   * Network policy used for building the Kubernetes network.
   */
  networkPolicy?: string;
  /**
   * A CIDR notation IP range from which to assign pod IPs when kubenet is used.
   */
  podCidr?: string;
  /**
   * A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges.
   */
  serviceCidr?: string;
  /**
   * An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in serviceCidr.
   */
  dnsServiceIp?: string;
  /**
   * A CIDR notation IP range assigned to the Docker bridge network. It must not overlap with any Subnet IP ranges or the Kubernetes service address range.
   */
  dockerBridgeCidr?: string;
  /**
   * The default is 'standard'. See [Azure Load Balancer SKUs](https://docs.microsoft.com/azure/load-balancer/skus) for more information about the differences between load balancer SKUs.
   */
  loadBalancerSku?: string;
  /**
   * This can only be set at cluster creation time and cannot be changed later. For more information see [egress outbound type](https://docs.microsoft.com/azure/aks/egress-outboundtype).
   */
  outboundType?: string;
}

/**
 * OIDC issuer profile
 */
export interface ManagedClusterOidcIssuerProfile {
  /**
   * Whether the OIDC issuer is enabled.
   */
  enabled?: boolean;
  /**
   * The OIDC issuer url of the Managed Cluster.
   */
  issuerUrl?: string;
}

/**
 * Security profile
 */
export interface ManagedClusterSecurityProfile {
  /**
   * Microsoft Defender settings for the security profile.
   */
  defender?: ManagedClusterSecurityProfileDefender;
  /**
   * Azure Key Vault [key management service](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) settings for the security profile.
   */
  azureKeyVaultKms?: AzureKeyVaultKms;
  /**
   * Workload identity settings for the security profile. Workload identity enables Kubernetes applications to access Azure cloud resources securely with Azure AD. See https://aka.ms/aks/wi for more details.
   */
  workloadIdentity?: ManagedClusterSecurityProfileWorkloadIdentity;
}

/**
 * Defender profile
 */
export interface ManagedClusterSecurityProfileDefender {
  /**
   * Resource ID of the Log Analytics workspace to be associated with Microsoft Defender. When Microsoft Defender is enabled, this field is required and must be a valid workspace resource ID. When Microsoft Defender is disabled, leave the field empty.
   */
  logAnalyticsWorkspaceResourceId?: string;
  /**
   * Microsoft Defender threat detection for Cloud settings for the security profile.
   */
  securityMonitoring?: ManagedClusterSecurityProfileDefenderSecurityMonitoring;
}

/**
 * Security monitoring
 */
export interface ManagedClusterSecurityProfileDefenderSecurityMonitoring {
  /**
   * Whether to enable Defender threat detection
   */
  enabled?: boolean;
}

/**
 * Azure Key Vault KMS
 */
export interface AzureKeyVaultKms {
  /**
   * Whether to enable Azure Key Vault key management service. The default is false.
   */
  enabled?: boolean;
  /**
   * Identifier of Azure Key Vault key. See [key identifier format](https://docs.microsoft.com/en-us/azure/key-vault/general/about-keys-secrets-certificates#vault-name-and-object-name) for more details. When Azure Key Vault key management service is enabled, this field is required and must be a valid key identifier. When Azure Key Vault key management service is disabled, leave the field empty.
   */
  keyId?: string;
  /**
   * Network access of key vault. The possible values are `Public` and `Private`. `Public` means the key vault allows public access from all networks. `Private` means the key vault disables public access and enables private link. The default value is `Public`.
   */
  keyVaultNetworkAccess?: string;
  /**
   * Resource ID of key vault. When keyVaultNetworkAccess is `Private`, this field is required and must be a valid resource ID. When keyVaultNetworkAccess is `Public`, leave the field empty.
   */
  keyVaultResourceId?: string;
}

/**
 * Workload identity
 */
export interface ManagedClusterSecurityProfileWorkloadIdentity {
  /**
   * Whether to enable workload identity.
   */
  enabled?: boolean;
}

/**
 * Service principal profile
 */
export interface ManagedClusterServicePrincipalProfile {
  /**
   * The ID for the service principal.
   */
  clientId: string;
  /**
   * The secret password associated with the service principal in plain text.
   */
  secret?: string;
}

/**
 * Cluster upgrade settings
 */
export interface ClusterUpgradeSettings {
  /**
   * Settings for overrides.
   */
  overrideSettings?: UpgradeOverrideSettings;
}

/**
 * Upgrade override settings
 */
export interface UpgradeOverrideSettings {
  /**
   * Whether to force upgrade the cluster. Note that this option instructs upgrade operation to bypass upgrade protections such as checking for deprecated API usage. Enable this option only with caution.
   */
  forceUpgrade?: boolean;
  /**
   * Until when the overrides are effective. Note that this only matches the start time of an upgrade, and the effectiveness won't change once an upgrade starts even if the `until` expires as upgrade proceeds. This field is not set by default. It must be set for the overrides to take effect.
   */
  until?: string;
}

/**
 * Windows profile
 */
export interface ManagedClusterWindowsProfile {
  /**
   * Specifies the name of the administrator account. <br><br> **Restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length:** 1 character <br><br> **Max-length:** 20 characters
   */
  adminUsername: string;
  /**
   * Specifies the password of the administrator account. <br><br> **Minimum-length:** 8 characters <br><br> **Max-length:** 123 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!"
   */
  adminPassword?: string;
  /**
   * The license type to use for Windows VMs. See [Azure Hybrid User Benefits](https://azure.microsoft.com/pricing/hybrid-benefit/faq/) for more details.
   */
  licenseType?: string;
  /**
   * For more details on CSI proxy, see the [CSI proxy GitHub repo](https://github.com/kubernetes-csi/csi-proxy).
   */
  enableCSIProxy?: boolean;
  /**
   * The Windows gMSA Profile in the Managed Cluster.
   */
  gmsaProfile?: WindowsGmsaProfile;
}

/**
 * Windows gMSA profile
 */
export interface WindowsGmsaProfile {
  /**
   * Specifies whether to enable Windows gMSA in the managed cluster.
   */
  enabled?: boolean;
  /**
   * Specifies the DNS server for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster.
   */
  dnsServer?: string;
  /**
   * Specifies the root domain name for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster.
   */
  rootDomainName?: string;
}

/**
 * Workload auto-scaler profile
 */
export interface ManagedClusterWorkloadAutoScalerProfile {
  /**
   * KEDA (Kubernetes Event-driven Autoscaling) settings for the workload auto-scaler profile.
   */
  keda?: ManagedClusterWorkloadAutoScalerProfileKeda;
  /**
   * VPA (Vertical Pod Autoscaler) settings for the workload auto-scaler profile.
   */
  verticalPodAutoscaler?: ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler;
}

/**
 * KEDA settings
 */
export interface ManagedClusterWorkloadAutoScalerProfileKeda {
  /**
   * Whether to enable KEDA.
   */
  enabled: boolean;
}

/**
 * VPA settings
 */
export interface ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler {
  /**
   * Whether to enable VPA. Default value is false.
   */
  enabled: boolean;
}

/**
 * Interface defining the properties required to create an AKS cluster using AzAPI.
 */
export interface ClusterProps {
  /** The name of the AKS cluster. Must be unique within the Azure region. */
  readonly name: string;

  /** The Azure region where the AKS cluster will be deployed. */
  readonly location: string;

  /**
   * The Azure Resource Group where the AKS cluster will be deployed.
   * Optional. If not provided, a new resource group will be created.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The managed cluster SKU.
   */
  readonly sku?: ManagedClusterSku;

  /**
   * The identity used for the AKS cluster. Can be either SystemAssigned or UserAssigned.
   */
  readonly identity?: {
    type: string;
    userAssignedIdentities?: { [key: string]: {} };
  };

  /**
   * Tags to be applied to the AKS cluster resources for organizational purposes.
   * Key-value pairs. Optional.
   */
  readonly tags?: { [key: string]: string };

  // ============================================================================
  // FLATTENED CLUSTER PROPERTIES (from ManagedClusterProperties)
  // ============================================================================

  /**
   * The Azure Active Directory configuration.
   */
  readonly aadProfile?: ManagedClusterAadProfile;

  /**
   * The agent pool properties.
   */
  readonly agentPoolProfiles?: ManagedClusterAgentPoolProfile[];

  /**
   * The access profile for managed cluster API server.
   */
  readonly apiServerAccessProfile?: ManagedClusterApiServerAccessProfile;

  /**
   * Parameters to be applied to the cluster-autoscaler when enabled
   */
  readonly autoScalerProfile?: ManagedClusterPropertiesAutoScalerProfile;

  /**
   * The auto upgrade configuration.
   */
  readonly autoUpgradeProfile?: ManagedClusterAutoUpgradeProfile;

  /**
   * If set to true, getting static credentials will be disabled for this cluster. This must only be used on Managed Clusters that are AAD enabled.
   */
  readonly disableLocalAccounts?: boolean;

  /**
   * This cannot be updated once the Managed Cluster has been created.
   */
  readonly dnsPrefix?: string;

  /**
   * Whether to enable Kubernetes Role-Based Access Control.
   */
  readonly enableRBAC?: boolean;

  /**
   * Identities associated with the cluster.
   */
  readonly identityProfile?: { [key: string]: UserAssignedIdentity };

  /**
   * Kubernetes version. Both patch version and major.minor are supported.
   */
  readonly kubernetesVersion?: string;

  /**
   * The profile for Linux VMs in the Managed Cluster.
   */
  readonly linuxProfile?: ContainerServiceLinuxProfile;

  /**
   * The network configuration profile.
   */
  readonly networkProfile?: ContainerServiceNetworkProfile;

  /**
   * The name of the resource group containing agent pool nodes.
   */
  readonly nodeResourceGroup?: string;

  /**
   * The OIDC issuer profile of the Managed Cluster.
   */
  readonly oidcIssuerProfile?: ManagedClusterOidcIssuerProfile;

  /**
   * Allow or deny public network access for AKS
   */
  readonly publicNetworkAccess?: string;

  /**
   * Security profile for the managed cluster.
   */
  readonly securityProfile?: ManagedClusterSecurityProfile;

  /**
   * Information about a service principal identity for the cluster to use for manipulating Azure APIs.
   */
  readonly servicePrincipalProfile?: ManagedClusterServicePrincipalProfile;

  /**
   * Settings for upgrading a cluster.
   */
  readonly upgradeSettings?: ClusterUpgradeSettings;

  /**
   * The profile for Windows VMs in the Managed Cluster.
   */
  readonly windowsProfile?: ManagedClusterWindowsProfile;

  /**
   * Workload Auto-scaler profile for the managed cluster.
   */
  readonly workloadAutoScalerProfile?: ManagedClusterWorkloadAutoScalerProfile;

  // ============================================================================
  // LEGACY PROPERTIES (for backward compatibility)
  // ============================================================================

  /**
   * Properties of a managed cluster using AzAPI schema.
   * @deprecated Use the flattened properties directly instead
   */
  readonly properties?: ManagedClusterProperties;

  /**
   * Configuration for the default node pool of the AKS cluster.
   * @deprecated Use agentPoolProfiles instead
   */
  readonly defaultNodePool?: ManagedClusterAgentPoolProfile;

  /**
   * Configures integration of Azure Active Directory (AAD) with Kubernetes Role-Based Access Control (RBAC) for the AKS cluster.
   * @deprecated Use aadProfile instead
   */
  readonly azureActiveDirectoryRoleBasedAccessControl?: ManagedClusterAadProfile;

  /**
   * A list of IP address ranges that are authorized to access the AKS API server.
   * @deprecated Use apiServerAccessProfile.authorizedIpRanges instead
   */
  readonly apiServerAuthorizedIpRanges?: string[];
}

/**
 * Class representing the AKS cluster resource using AzAPI.
 */
export class Cluster extends AzureResource {
  /** The unique identifier of the AKS cluster resource. */
  public id: string;

  /** The Resource Group associated with the AKS cluster. */
  public resourceGroup: ResourceGroup;

  /** The AzAPI resource representing the managed cluster. */
  public readonly resource: resource.Resource;

  /** The fully qualified domain name of the AKS cluster. */
  public readonly fqdn: string;

  /** The API server endpoint URL. */
  public readonly apiServerEndpoint: string;

  /** Terraform outputs for the cluster. */
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;
  public readonly fqdnOutput: cdktf.TerraformOutput;

  /**
   * Represents an Azure Kubernetes Service (AKS) cluster resource in Azure using AzAPI.
   *
   * This class is responsible for the creation and management of an AKS cluster, allowing for the deployment and orchestration
   * of containerized applications using Kubernetes within the Azure cloud platform.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the AKS cluster.
   * @param props - The properties required to configure the AKS cluster, as defined in the ClusterProps interface.
   *
   * Example usage:
   * ```typescript
   * new Cluster(this, 'MyAKSCluster', {
   *   name: 'example-cluster',
   *   location: 'East US',
   *   properties: {
   *     agentPoolProfiles: [{
   *       name: 'default',
   *       vmSize: 'Standard_D2_v3',
   *       count: 3,
   *       type: 'VirtualMachineScaleSets'
   *     }],
   *     dnsPrefix: 'example-cluster',
   *     enableRBAC: true
   *   },
   *   resourceGroup: existingResourceGroup,
   *   tags: {
   *     environment: 'production'
   *   }
   * });
   * ```
   */
  constructor(scope: Construct, id: string, props: ClusterProps) {
    super(scope, id);

    // Setup or reuse the provided resource group.
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location || "eastus",
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Build cluster properties from flattened interface, supporting legacy props
    const clusterProperties: ManagedClusterProperties = {
      // If properties is provided (legacy), use it as base
      ...props.properties,
      
      // Override with flattened properties (new interface)
      aadProfile: props.aadProfile || props.properties?.aadProfile,
      agentPoolProfiles: props.agentPoolProfiles || props.properties?.agentPoolProfiles,
      apiServerAccessProfile: props.apiServerAccessProfile || props.properties?.apiServerAccessProfile,
      autoScalerProfile: props.autoScalerProfile || props.properties?.autoScalerProfile,
      autoUpgradeProfile: props.autoUpgradeProfile || props.properties?.autoUpgradeProfile,
      disableLocalAccounts: props.disableLocalAccounts ?? props.properties?.disableLocalAccounts,
      dnsPrefix: props.dnsPrefix || props.properties?.dnsPrefix || props.name,
      enableRBAC: props.enableRBAC ?? props.properties?.enableRBAC ?? true,
      identityProfile: props.identityProfile || props.properties?.identityProfile,
      kubernetesVersion: props.kubernetesVersion || props.properties?.kubernetesVersion,
      linuxProfile: props.linuxProfile || props.properties?.linuxProfile,
      networkProfile: props.networkProfile || props.properties?.networkProfile,
      nodeResourceGroup: props.nodeResourceGroup || props.properties?.nodeResourceGroup,
      oidcIssuerProfile: props.oidcIssuerProfile || props.properties?.oidcIssuerProfile,
      publicNetworkAccess: props.publicNetworkAccess || props.properties?.publicNetworkAccess,
      securityProfile: props.securityProfile || props.properties?.securityProfile,
      servicePrincipalProfile: props.servicePrincipalProfile || props.properties?.servicePrincipalProfile,
      upgradeSettings: props.upgradeSettings || props.properties?.upgradeSettings,
      windowsProfile: props.windowsProfile || props.properties?.windowsProfile,
      workloadAutoScalerProfile: props.workloadAutoScalerProfile || props.properties?.workloadAutoScalerProfile,
    };

    // Handle legacy defaultNodePool property
    if (props.defaultNodePool && !clusterProperties.agentPoolProfiles) {
      clusterProperties.agentPoolProfiles = [props.defaultNodePool];
    }

    // Handle legacy identity property for identityProfile
    if (props.identity && !clusterProperties.identityProfile) {
      if (props.identity.type === "SystemAssigned") {
        // System assigned identity doesn't need identityProfile
      } else if (props.identity.userAssignedIdentities) {
        clusterProperties.identityProfile = {};
        Object.keys(props.identity.userAssignedIdentities).forEach(
          (resourceId) => {
            clusterProperties.identityProfile![resourceId] = {
              resourceId: resourceId,
            };
          },
        );
      }
    }

    // Handle legacy AAD RBAC property
    if (
      props.azureActiveDirectoryRoleBasedAccessControl &&
      !clusterProperties.aadProfile
    ) {
      clusterProperties.aadProfile =
        props.azureActiveDirectoryRoleBasedAccessControl;
    }

    // Handle legacy API server authorized IP ranges
    if (
      props.apiServerAuthorizedIpRanges &&
      !clusterProperties.apiServerAccessProfile
    ) {
      clusterProperties.apiServerAccessProfile = {
        authorizedIpRanges: props.apiServerAuthorizedIpRanges,
      };
    }

    // Create the AKS Cluster using AzAPI
    const aksCluster = new resource.Resource(this, "aks", {
      type: "Microsoft.ContainerService/managedClusters@2023-10-01",
      name: props.name,
      location: props.location,
      parentId: this.resourceGroup.resourceGroup.id,
      body: {
        sku: props.sku,
        properties: clusterProperties,
      },
      tags: props.tags,
    });

    // Handle identity if specified
    if (props.identity) {
      aksCluster.addOverride("body.identity", {
        type: props.identity.type,
        userAssignedIdentities: props.identity.userAssignedIdentities,
      });
    }

    this.resource = aksCluster;
    this.id = aksCluster.id;
    this.fqdn = `\${jsondecode(${aksCluster.fqn}.output).properties.fqdn}`;
    this.apiServerEndpoint = `\${jsondecode(${aksCluster.fqn}.output).properties.fqdn}`;

    // Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "aks_id", {
      value: this.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "aks_name", {
      value: aksCluster.name,
    });
    this.fqdnOutput = new cdktf.TerraformOutput(this, "aks_fqdn", {
      value: this.fqdn,
    });
  }
}
