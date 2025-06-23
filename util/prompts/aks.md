
    import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";
import { ManagedClustersAgentPools, ManagedClustersAgentPoolsProps } from "./managedclustersagentpools";
import { ManagedClustersMaintenanceConfigurations, ManagedClustersMaintenanceConfigurationsProps } from "./managedclustersmaintenanceconfigurations";
import { ManagedClustersTrustedAccessRoleBindings, ManagedClustersTrustedAccessRoleBindingsProps } from "./managedclusterstrustedaccessrolebindings";
import { ManagedClustersPrivateEndpointConnections, ManagedClustersPrivateEndpointConnectionsProps } from "./managedclustersprivateendpointconnections";

    export interface ManagedClustersProps extends IAzAPIBaseProps {
    /**
    * The extended location of the Virtual Machine.
    */
    extendedLocation?: ExtendedLocation;
    /**
    * Properties of a managed cluster.
    */
    properties?: ManagedClusterProperties;
    /**
    * The managed cluster SKU.
    */
    sku?: ManagedClusterSku;
}

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

export interface ManagedClusterProperties {
    /**
    * The Azure Active Directory configuration.
    */
    aadProfile?: ManagedClusterAadProfile;
    /**
    * The profile of managed cluster add-on.
    */
    addonProfiles?: ManagedClusterAddonProfile | object;
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
    * Azure Monitor addon profiles for monitoring the managed cluster.
    */
    azureMonitorProfile?: ManagedClusterAzureMonitorProfile;
    /**
    * If set to true, getting static credentials will be disabled for this cluster. This must only be used on Managed Clusters that are AAD enabled. For more details see [disable local accounts](https://docs.microsoft.com/azure/aks/managed-aad#disable-local-accounts-preview).
    */
    disableLocalAccounts?: boolean;
    /**
    * This is of the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{encryptionSetName}'
    */
    diskEncryptionSetID?: string;
    /**
    * This cannot be updated once the Managed Cluster has been created.
    */
    dnsPrefix?: string;
    /**
    * (DEPRECATED) Whether to enable Kubernetes pod security policy (preview). PodSecurityPolicy was deprecated in Kubernetes v1.21, and removed from Kubernetes in v1.25. Learn more at https://aka.ms/k8s/psp and https://aka.ms/aks/psp.
    */
    enablePodSecurityPolicy?: boolean;
    /**
    * Whether to enable Kubernetes Role-Based Access Control.
    */
    enableRBAC?: boolean;
    /**
    * This cannot be updated once the Managed Cluster has been created.
    */
    fqdnSubdomain?: string;
    /**
    * Configurations for provisioning the cluster with HTTP proxy servers.
    */
    httpProxyConfig?: ManagedClusterHttpProxyConfig;
    /**
    * Identities associated with the cluster.
    */
    identityProfile?: UserAssignedIdentity | object;
    /**
    * Ingress profile for the managed cluster.
    */
    ingressProfile?: ManagedClusterIngressProfile;
    /**
    * Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. When you upgrade a supported AKS cluster, Kubernetes minor versions cannot be skipped. All upgrades must be performed sequentially by major version number. For example, upgrades between 1.14.x -> 1.15.x or 1.15.x -> 1.16.x are allowed, however 1.14.x -> 1.16.x is not allowed. See [upgrading an AKS cluster](https://docs.microsoft.com/azure/aks/upgrade-cluster) for more details.
    */
    kubernetesVersion?: string;
    /**
    * The profile for Linux VMs in the Managed Cluster.
    */
    linuxProfile?: ContainerServiceLinuxProfile;
    /**
    * Optional cluster metrics configuration.
    */
    metricsProfile?: ManagedClusterMetricsProfile;
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
    * See [use AAD pod identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity) for more details on AAD pod identity integration.
    */
    podIdentityProfile?: ManagedClusterPodIdentityProfile;
    /**
    * Private link resources associated with the cluster.
    */
    privateLinkResources?: PrivateLinkResource[];
    /**
    * Allow or deny public network access for AKS
    */
    publicNetworkAccess?: string;
    /**
    * Security profile for the managed cluster.
    */
    securityProfile?: ManagedClusterSecurityProfile;
    /**
    * Service mesh profile for a managed cluster.
    */
    serviceMeshProfile?: ServiceMeshProfile;
    /**
    * Information about a service principal identity for the cluster to use for manipulating Azure APIs.
    */
    servicePrincipalProfile?: ManagedClusterServicePrincipalProfile;
    /**
    * Storage profile for the managed cluster.
    */
    storageProfile?: ManagedClusterStorageProfile;
    /**
    * The support plan for the Managed Cluster. If unspecified, the default is 'KubernetesOfficial'.
    */
    supportPlan?: string;
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

export interface ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler {
    /**
    * Whether to enable VPA. Default value is false.
    */
    enabled: boolean;
}

export interface ManagedClusterWorkloadAutoScalerProfileKeda {
    /**
    * Whether to enable KEDA.
    */
    enabled: boolean;
}

export interface ManagedClusterWindowsProfile {
    /**
    * Specifies the password of the administrator account. <br><br> **Minimum-length:** 8 characters <br><br> **Max-length:** 123 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!"
    */
    adminPassword?: string;
    /**
    * Specifies the name of the administrator account. <br><br> **Restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length:** 1 character <br><br> **Max-length:** 20 characters
    */
    adminUsername: string;
    /**
    * For more details on CSI proxy, see the [CSI proxy GitHub repo](https://github.com/kubernetes-csi/csi-proxy).
    */
    enableCSIProxy?: boolean;
    /**
    * The Windows gMSA Profile in the Managed Cluster.
    */
    gmsaProfile?: WindowsGmsaProfile;
    /**
    * The license type to use for Windows VMs. See [Azure Hybrid User Benefits](https://azure.microsoft.com/pricing/hybrid-benefit/faq/) for more details.
    */
    licenseType?: string;
}

export interface WindowsGmsaProfile {
    /**
    * Specifies the DNS server for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster.
    */
    dnsServer?: string;
    /**
    * Specifies whether to enable Windows gMSA in the managed cluster.
    */
    enabled?: boolean;
    /**
    * Specifies the root domain name for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster.
    */
    rootDomainName?: string;
}

export interface ClusterUpgradeSettings {
    /**
    * Settings for overrides.
    */
    overrideSettings?: UpgradeOverrideSettings;
}

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

export interface ManagedClusterStorageProfile {
    /**
    * AzureBlob CSI Driver settings for the storage profile.
    */
    blobCSIDriver?: ManagedClusterStorageProfileBlobCsiDriver;
    /**
    * AzureDisk CSI Driver settings for the storage profile.
    */
    diskCSIDriver?: ManagedClusterStorageProfileDiskCsiDriver;
    /**
    * AzureFile CSI Driver settings for the storage profile.
    */
    fileCSIDriver?: ManagedClusterStorageProfileFileCsiDriver;
    /**
    * Snapshot Controller settings for the storage profile.
    */
    snapshotController?: ManagedClusterStorageProfileSnapshotController;
}

export interface ManagedClusterStorageProfileSnapshotController {
    /**
    * Whether to enable Snapshot Controller. The default value is true.
    */
    enabled?: boolean;
}

export interface ManagedClusterStorageProfileFileCsiDriver {
    /**
    * Whether to enable AzureFile CSI Driver. The default value is true.
    */
    enabled?: boolean;
}

export interface ManagedClusterStorageProfileDiskCsiDriver {
    /**
    * Whether to enable AzureDisk CSI Driver. The default value is true.
    */
    enabled?: boolean;
}

export interface ManagedClusterStorageProfileBlobCsiDriver {
    /**
    * Whether to enable AzureBlob CSI Driver. The default value is false.
    */
    enabled?: boolean;
}

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

export interface ServiceMeshProfile {
    /**
    * Istio service mesh configuration.
    */
    istio?: IstioServiceMesh;
    /**
    * Mode of the service mesh.
    */
    mode: string;
}

export interface IstioServiceMesh {
    /**
    * Istio Service Mesh Certificate Authority (CA) configuration. For now, we only support plugin certificates as described here https://aka.ms/asm-plugin-ca
    */
    certificateAuthority?: IstioCertificateAuthority;
    /**
    * Istio components configuration.
    */
    components?: IstioComponents;
    /**
    * The list of revisions of the Istio control plane. When an upgrade is not in progress, this holds one value. When canary upgrade is in progress, this can only hold two consecutive values. For more information, see: https://learn.microsoft.com/en-us/azure/aks/istio-upgrade
    */
    revisions?: string[];
}

export interface IstioComponents {
    /**
    * Istio egress gateways.
    */
    egressGateways?: IstioEgressGateway[];
    /**
    * Istio ingress gateways.
    */
    ingressGateways?: IstioIngressGateway[];
}

export interface IstioIngressGateway {
    /**
    * Whether to enable the ingress gateway.
    */
    enabled: boolean;
    /**
    * Mode of an ingress gateway.
    */
    mode: string;
}

export interface IstioEgressGateway {
    /**
    * Whether to enable the egress gateway.
    */
    enabled: boolean;
}

export interface IstioCertificateAuthority {
    /**
    * Plugin certificates information for Service Mesh.
    */
    plugin?: IstioPluginCertificateAuthority;
}

export interface IstioPluginCertificateAuthority {
    /**
    * Certificate chain object name in Azure Key Vault.
    */
    certChainObjectName?: string;
    /**
    * Intermediate certificate object name in Azure Key Vault.
    */
    certObjectName?: string;
    /**
    * Intermediate certificate private key object name in Azure Key Vault.
    */
    keyObjectName?: string;
    /**
    * The resource ID of the Key Vault.
    */
    keyVaultId?: string;
    /**
    * Root certificate object name in Azure Key Vault.
    */
    rootCertObjectName?: string;
}

export interface ManagedClusterSecurityProfile {
    /**
    * Azure Key Vault [key management service](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) settings for the security profile.
    */
    azureKeyVaultKms?: AzureKeyVaultKms;
    /**
    * Microsoft Defender settings for the security profile.
    */
    defender?: ManagedClusterSecurityProfileDefender;
    /**
    * Image Cleaner settings for the security profile.
    */
    imageCleaner?: ManagedClusterSecurityProfileImageCleaner;
    /**
    * Workload identity settings for the security profile. Workload identity enables Kubernetes applications to access Azure cloud resources securely with Azure AD. See https://aka.ms/aks/wi for more details.
    */
    workloadIdentity?: ManagedClusterSecurityProfileWorkloadIdentity;
}

export interface ManagedClusterSecurityProfileWorkloadIdentity {
    /**
    * Whether to enable workload identity.
    */
    enabled?: boolean;
}

export interface ManagedClusterSecurityProfileImageCleaner {
    /**
    * Whether to enable Image Cleaner on AKS cluster.
    */
    enabled?: boolean;
    /**
    * Image Cleaner scanning interval in hours.
    */
    intervalHours?: number;
}

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

export interface ManagedClusterSecurityProfileDefenderSecurityMonitoring {
    /**
    * Whether to enable Defender threat detection
    */
    enabled?: boolean;
}

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

export interface PrivateLinkResource {
    /**
    * The group ID of the resource.
    */
    groupId?: string;
    /**
    * The ID of the private link resource.
    */
    id?: string;
    /**
    * The name of the private link resource.
    */
    name?: string;
    /**
    * The RequiredMembers of the resource
    */
    requiredMembers?: string[];
    /**
    * The resource type.
    */
    type?: string;
}

export interface ManagedClusterPodIdentityProfile {
    /**
    * Running in Kubenet is disabled by default due to the security related nature of AAD Pod Identity and the risks of IP spoofing. See [using Kubenet network plugin with AAD Pod Identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity#using-kubenet-network-plugin-with-azure-active-directory-pod-managed-identities) for more information.
    */
    allowNetworkPluginKubenet?: boolean;
    /**
    * Whether the pod identity addon is enabled.
    */
    enabled?: boolean;
    /**
    * The pod identities to use in the cluster.
    */
    userAssignedIdentities?: ManagedClusterPodIdentity[];
    /**
    * The pod identity exceptions to allow.
    */
    userAssignedIdentityExceptions?: ManagedClusterPodIdentityException[];
}

export interface ManagedClusterPodIdentityException {
    /**
    * The name of the pod identity exception.
    */
    name: string;
    /**
    * The namespace of the pod identity exception.
    */
    namespace: string;
    /**
    * The pod labels to match.
    */
    podLabels: object | string | boolean | number;
}

export interface ManagedClusterPodIdentity {
    /**
    * The binding selector to use for the AzureIdentityBinding resource.
    */
    bindingSelector?: string;
    /**
    * The user assigned identity details.
    */
    identity?: UserAssignedIdentity;
    /**
    * The name of the pod identity.
    */
    name: string;
    /**
    * The namespace of the pod identity.
    */
    namespace: string;
}

export interface UserAssignedIdentity {
    /**
    * The client ID of the user assigned identity.
    */
    clientId?: string;
    /**
    * The object ID of the user assigned identity.
    */
    objectId?: string;
    /**
    * The resource ID of the user assigned identity.
    */
    resourceId?: string;
}

export interface ManagedClusterOidcIssuerProfile {
    /**
    * Whether the OIDC issuer is enabled.
    */
    enabled?: boolean;
}

export interface ContainerServiceNetworkProfile {
    /**
    * An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in serviceCidr.
    */
    dnsServiceIP?: string;
    /**
    * IP families are used to determine single-stack or dual-stack clusters. For single-stack, the expected value is IPv4. For dual-stack, the expected values are IPv4 and IPv6.
    */
    ipFamilies?: string[];
    /**
    * Profile of the cluster load balancer.
    */
    loadBalancerProfile?: ManagedClusterLoadBalancerProfile;
    /**
    * The default is 'standard'. See [Azure Load Balancer SKUs](https://docs.microsoft.com/azure/load-balancer/skus) for more information about the differences between load balancer SKUs.
    */
    loadBalancerSku?: string;
    /**
    * Profile of the cluster NAT gateway.
    */
    natGatewayProfile?: ManagedClusterNatGatewayProfile;
    /**
    * Network dataplane used in the Kubernetes cluster.
    */
    networkDataplane?: string;
    /**
    * This cannot be specified if networkPlugin is anything other than 'azure'.
    */
    networkMode?: string;
    /**
    * Network plugin used for building the Kubernetes network.
    */
    networkPlugin?: string;
    /**
    * The mode the network plugin should use.
    */
    networkPluginMode?: string;
    /**
    * Network policy used for building the Kubernetes network.
    */
    networkPolicy?: string;
    /**
    * This can only be set at cluster creation time and cannot be changed later. For more information see [egress outbound type](https://docs.microsoft.com/azure/aks/egress-outboundtype).
    */
    outboundType?: string;
    /**
    * A CIDR notation IP range from which to assign pod IPs when kubenet is used.
    */
    podCidr?: string;
    /**
    * One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking.
    */
    podCidrs?: string[];
    /**
    * A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges.
    */
    serviceCidr?: string;
    /**
    * One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. They must not overlap with any Subnet IP ranges.
    */
    serviceCidrs?: string[];
}

export interface ManagedClusterNatGatewayProfile {
    /**
    * The effective outbound IP resources of the cluster NAT gateway.
    */
    effectiveOutboundIPs?: ResourceReference[];
    /**
    * Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 4 minutes.
    */
    idleTimeoutInMinutes?: number;
    /**
    * Profile of the managed outbound IP resources of the cluster NAT gateway.
    */
    managedOutboundIPProfile?: ManagedClusterManagedOutboundIpProfile;
}

export interface ManagedClusterManagedOutboundIpProfile {
    /**
    * The desired number of outbound IPs created/managed by Azure. Allowed values must be in the range of 1 to 16 (inclusive). The default value is 1.
    */
    count?: number;
}

export interface ResourceReference {
    /**
    * The fully qualified Azure resource id.
    */
    id?: string;
}

export interface ManagedClusterLoadBalancerProfile {
    /**
    * The desired number of allocated SNAT ports per VM. Allowed values are in the range of 0 to 64000 (inclusive). The default value is 0 which results in Azure dynamically allocating ports.
    */
    allocatedOutboundPorts?: number;
    /**
    * The type of the managed inbound Load Balancer BackendPool.
    */
    backendPoolType?: string;
    /**
    * The effective outbound IP resources of the cluster load balancer.
    */
    effectiveOutboundIPs?: ResourceReference[];
    /**
    * Enable multiple standard load balancers per AKS cluster or not.
    */
    enableMultipleStandardLoadBalancers?: boolean;
    /**
    * Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 30 minutes.
    */
    idleTimeoutInMinutes?: number;
    /**
    * Desired managed outbound IPs for the cluster load balancer.
    */
    managedOutboundIPs?: ManagedClusterLoadBalancerProfileManagedOutboundIPs;
    /**
    * Desired outbound IP Prefix resources for the cluster load balancer.
    */
    outboundIPPrefixes?: ManagedClusterLoadBalancerProfileOutboundIpPrefixes;
    /**
    * Desired outbound IP resources for the cluster load balancer.
    */
    outboundIPs?: ManagedClusterLoadBalancerProfileOutboundIPs;
}

export interface ManagedClusterLoadBalancerProfileOutboundIPs {
    /**
    * A list of public IP resources.
    */
    publicIPs?: ResourceReference[];
}

export interface ManagedClusterLoadBalancerProfileOutboundIpPrefixes {
    /**
    * A list of public IP prefix resources.
    */
    publicIPPrefixes?: ResourceReference[];
}

export interface ManagedClusterLoadBalancerProfileManagedOutboundIPs {
    /**
    * The desired number of IPv4 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 1.
    */
    count?: number;
    /**
    * The desired number of IPv6 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 0 for single-stack and 1 for dual-stack.
    */
    countIPv6?: number;
}

export interface ManagedClusterMetricsProfile {
    /**
    * The cost analysis configuration for the cluster
    */
    costAnalysis?: ManagedClusterCostAnalysis;
}

export interface ManagedClusterCostAnalysis {
    /**
    * The Managed Cluster sku.tier must be set to 'Standard' or 'Premium' to enable this feature. Enabling this will add Kubernetes Namespace and Deployment details to the Cost Analysis views in the Azure portal. If not specified, the default is false. For more information see aka.ms/aks/docs/cost-analysis.
    */
    enabled?: boolean;
}

export interface ContainerServiceLinuxProfile {
    /**
    * The administrator username to use for Linux VMs.
    */
    adminUsername: string;
    /**
    * The SSH configuration for Linux-based VMs running on Azure.
    */
    ssh: ContainerServiceSshConfiguration;
}

export interface ContainerServiceSshConfiguration {
    /**
    * The list of SSH public keys used to authenticate with Linux-based VMs. A maximum of 1 key may be specified.
    */
    publicKeys: ContainerServiceSshPublicKey[];
}

export interface ContainerServiceSshPublicKey {
    /**
    * Certificate public key used to authenticate with VMs through SSH. The certificate must be in PEM format with or without headers.
    */
    keyData: string;
}

export interface ManagedClusterIngressProfile {
    /**
    * App Routing settings for the ingress profile. You can find an overview and onboarding guide for this feature at https://learn.microsoft.com/en-us/azure/aks/app-routing?tabs=default%2Cdeploy-app-default.
    */
    webAppRouting?: ManagedClusterIngressProfileWebAppRouting;
}

export interface ManagedClusterIngressProfileWebAppRouting {
    /**
    * Resource IDs of the DNS zones to be associated with the Application Routing add-on. Used only when Application Routing add-on is enabled. Public and private DNS zones can be in different resource groups, but all public DNS zones must be in the same resource group and all private DNS zones must be in the same resource group.
    */
    dnsZoneResourceIds?: string[];
    /**
    * Whether to enable the Application Routing add-on.
    */
    enabled?: boolean;
}

export interface UserAssignedIdentity {
    /**
    * The client ID of the user assigned identity.
    */
    clientId?: string;
    /**
    * The object ID of the user assigned identity.
    */
    objectId?: string;
    /**
    * The resource ID of the user assigned identity.
    */
    resourceId?: string;
}

export interface ManagedClusterHttpProxyConfig {
    /**
    * The HTTP proxy server endpoint to use.
    */
    httpProxy?: string;
    /**
    * The HTTPS proxy server endpoint to use.
    */
    httpsProxy?: string;
    /**
    * The endpoints that should not go through proxy.
    */
    noProxy?: string[];
    /**
    * Alternative CA cert to use for connecting to proxy servers.
    */
    trustedCa?: string;
}

export interface ManagedClusterAzureMonitorProfile {
    /**
    * Metrics profile for the Azure Monitor managed service for Prometheus addon. Collect out-of-the-box Kubernetes infrastructure metrics to send to an Azure Monitor Workspace and configure additional scraping for custom targets. See aka.ms/AzureManagedPrometheus for an overview.
    */
    metrics?: ManagedClusterAzureMonitorProfileMetrics;
}

export interface ManagedClusterAzureMonitorProfileMetrics {
    /**
    * Whether to enable or disable the Azure Managed Prometheus addon for Prometheus monitoring. See aka.ms/AzureManagedPrometheus-aks-enable for details on enabling and disabling.
    */
    enabled: boolean;
    /**
    * Kube State Metrics profile for the Azure Managed Prometheus addon. These optional settings are for the kube-state-metrics pod that is deployed with the addon. See aka.ms/AzureManagedPrometheus-optional-parameters for details.
    */
    kubeStateMetrics?: ManagedClusterAzureMonitorProfileKubeStateMetrics;
}

export interface ManagedClusterAzureMonitorProfileKubeStateMetrics {
    /**
    * Comma-separated list of Kubernetes annotation keys that will be used in the resource's labels metric (Example: 'namespaces=[kubernetes.io/team,...],pods=[kubernetes.io/team],...'). By default the metric contains only resource name and namespace labels.
    */
    metricAnnotationsAllowList?: string;
    /**
    * Comma-separated list of additional Kubernetes label keys that will be used in the resource's labels metric (Example: 'namespaces=[k8s-label-1,k8s-label-n,...],pods=[app],...'). By default the metric contains only resource name and namespace labels.
    */
    metricLabelsAllowlist?: string;
}

export interface ManagedClusterAutoUpgradeProfile {
    /**
    * Manner in which the OS on your nodes is updated. The default is NodeImage.
    */
    nodeOSUpgradeChannel?: string;
    /**
    * For more information see [setting the AKS cluster auto-upgrade channel](https://docs.microsoft.com/azure/aks/upgrade-cluster#set-auto-upgrade-channel).
    */
    upgradeChannel?: string;
}

export interface ManagedClusterPropertiesAutoScalerProfile {
    /**
    * Valid values are 'true' and 'false'
    */
    balance-similar-node-groups?: string;
    /**
    * If not specified, the default is 'random'. See [expanders](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) for more information.
    */
    expander?: string;
    /**
    * The default is 10.
    */
    max-empty-bulk-delete?: string;
    /**
    * The default is 600.
    */
    max-graceful-termination-sec?: string;
    /**
    * The default is '15m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
    */
    max-node-provision-time?: string;
    /**
    * The default is 45. The maximum is 100 and the minimum is 0.
    */
    max-total-unready-percentage?: string;
    /**
    * For scenarios like burst/batch scale where you don't want CA to act before the kubernetes scheduler could schedule all the pods, you can tell CA to ignore unscheduled pods before they're a certain age. The default is '0s'. Values must be an integer followed by a unit ('s' for seconds, 'm' for minutes, 'h' for hours, etc).
    */
    new-pod-scale-up-delay?: string;
    /**
    * This must be an integer. The default is 3.
    */
    ok-total-unready-count?: string;
    /**
    * The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
    */
    scale-down-delay-after-add?: string;
    /**
    * The default is the scan-interval. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
    */
    scale-down-delay-after-delete?: string;
    /**
    * The default is '3m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
    */
    scale-down-delay-after-failure?: string;
    /**
    * The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
    */
    scale-down-unneeded-time?: string;
    /**
    * The default is '20m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported.
    */
    scale-down-unready-time?: string;
    /**
    * The default is '0.5'.
    */
    scale-down-utilization-threshold?: string;
    /**
    * The default is '10'. Values must be an integer number of seconds.
    */
    scan-interval?: string;
    /**
    * The default is true.
    */
    skip-nodes-with-local-storage?: string;
    /**
    * The default is true.
    */
    skip-nodes-with-system-pods?: string;
}

export interface ManagedClusterApiServerAccessProfile {
    /**
    * IP ranges are specified in CIDR format, e.g. 137.117.106.88/29. This feature is not compatible with clusters that use Public IP Per Node, or clusters that are using a Basic Load Balancer. For more information see [API server authorized IP ranges](https://docs.microsoft.com/azure/aks/api-server-authorized-ip-ranges).
    */
    authorizedIPRanges?: string[];
    /**
    * Whether to disable run command for the cluster or not.
    */
    disableRunCommand?: boolean;
    /**
    * For more details, see [Creating a private AKS cluster](https://docs.microsoft.com/azure/aks/private-clusters).
    */
    enablePrivateCluster?: boolean;
    /**
    * Whether to create additional public FQDN for private cluster or not.
    */
    enablePrivateClusterPublicFQDN?: boolean;
    /**
    * The default is System. For more details see [configure private DNS zone](https://docs.microsoft.com/azure/aks/private-clusters#configure-private-dns-zone). Allowed values are 'system' and 'none'.
    */
    privateDNSZone?: string;
}

export interface ManagedClusterAgentPoolProfile {
    /**
    * The list of Availability zones to use for nodes. This can only be specified if the AgentPoolType property is 'VirtualMachineScaleSets'.
    */
    availabilityZones?: string[];
    /**
    * AKS will associate the specified agent pool with the Capacity Reservation Group.
    */
    capacityReservationGroupID?: string;
    /**
    * Number of agents (VMs) to host docker containers. Allowed values must be in the range of 0 to 1000 (inclusive) for user pools and in the range of 1 to 1000 (inclusive) for system pools. The default value is 1.
    */
    count?: number;
    /**
    * CreationData to be used to specify the source Snapshot ID if the node pool will be created/upgraded using a snapshot.
    */
    creationData?: CreationData;
    /**
    * Whether to enable auto-scaler
    */
    enableAutoScaling?: boolean;
    /**
    * This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption
    */
    enableEncryptionAtHost?: boolean;
    /**
    * See [Add a FIPS-enabled node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#add-a-fips-enabled-node-pool-preview) for more details.
    */
    enableFIPS?: boolean;
    /**
    * Some scenarios may require nodes in a node pool to receive their own dedicated public IP addresses. A common scenario is for gaming workloads, where a console needs to make a direct connection to a cloud virtual machine to minimize hops. For more information see [assigning a public IP per node](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#assign-a-public-ip-per-node-for-your-node-pools). The default is false.
    */
    enableNodePublicIP?: boolean;
    /**
    * Whether to enable UltraSSD
    */
    enableUltraSSD?: boolean;
    /**
    * GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU.
    */
    gpuInstanceProfile?: string;
    /**
    * This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}. For more information see [Azure dedicated hosts](https://docs.microsoft.com/azure/virtual-machines/dedicated-hosts).
    */
    hostGroupID?: string;
    /**
    * The Kubelet configuration on the agent pool nodes.
    */
    kubeletConfig?: KubeletConfig;
    /**
    * Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage.
    */
    kubeletDiskType?: string;
    /**
    * The OS configuration of Linux agent nodes.
    */
    linuxOSConfig?: LinuxOsConfig;
    /**
    * The maximum number of nodes for auto-scaling
    */
    maxCount?: number;
    /**
    * The maximum number of pods that can run on a node.
    */
    maxPods?: number;
    /**
    * The minimum number of nodes for auto-scaling
    */
    minCount?: number;
    /**
    * A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools
    */
    mode?: string;
    /**
    * Windows agent pool names must be 6 characters or less.
    */
    name: string;
    /**
    * Network-related settings of an agent pool.
    */
    networkProfile?: AgentPoolNetworkProfile;
    /**
    * The node labels to be persisted across all nodes in agent pool.
    */
    nodeLabels?: object | string | boolean | number;
    /**
    * This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName}
    */
    nodePublicIPPrefixID?: string;
    /**
    * The taints added to new nodes during node pool create and scale. For example, key=value:NoSchedule.
    */
    nodeTaints?: string[];
    /**
    * Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. As a best practice, you should upgrade all node pools in an AKS cluster to the same Kubernetes version. The node pool version must have the same major version as the control plane. The node pool minor version must be within two minor versions of the control plane version. The node pool version cannot be greater than the control plane version. For more information see [upgrading a node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#upgrade-a-node-pool).
    */
    orchestratorVersion?: string;
    /**
    * OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified.
    */
    osDiskSizeGB?: number;
    /**
    * The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os).
    */
    osDiskType?: string;
    /**
    * Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows.
    */
    osSKU?: string;
    /**
    * The operating system type. The default is Linux.
    */
    osType?: string;
    /**
    * If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}
    */
    podSubnetID?: string;
    /**
    * When an Agent Pool is first created it is initially Running. The Agent Pool can be stopped by setting this field to Stopped. A stopped Agent Pool stops all of its VMs and does not accrue billing charges. An Agent Pool can only be stopped if it is Running and provisioning state is Succeeded
    */
    powerState?: PowerState;
    /**
    * The ID for Proximity Placement Group.
    */
    proximityPlacementGroupID?: string;
    /**
    * This also effects the cluster autoscaler behavior. If not specified, it defaults to Delete.
    */
    scaleDownMode?: string;
    /**
    * This cannot be specified unless the scaleSetPriority is 'Spot'. If not specified, the default is 'Delete'.
    */
    scaleSetEvictionPolicy?: string;
    /**
    * The Virtual Machine Scale Set priority. If not specified, the default is 'Regular'.
    */
    scaleSetPriority?: string;
    /**
    * Possible values are any decimal value greater than zero or -1 which indicates the willingness to pay any on-demand price. For more details on spot pricing, see [spot VMs pricing](https://docs.microsoft.com/azure/virtual-machines/spot-vms#pricing)
    */
    spotMaxPrice?: number;
    /**
    * The tags to be persisted on the agent pool virtual machine scale set.
    */
    tags?: object | string | boolean | number;
    /**
    * The type of Agent Pool.
    */
    type?: string;
    /**
    * Settings for upgrading the agentpool
    */
    upgradeSettings?: AgentPoolUpgradeSettings;
    /**
    * VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions
    */
    vmSize?: string;
    /**
    * If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}
    */
    vnetSubnetID?: string;
    /**
    * The Windows agent pool's specific profile.
    */
    windowsProfile?: AgentPoolWindowsProfile;
    /**
    * Determines the type of workload a node can run.
    */
    workloadRuntime?: string;
}

export interface AgentPoolWindowsProfile {
    /**
    * The default value is false. Outbound NAT can only be disabled if the cluster outboundType is NAT Gateway and the Windows agent pool does not have node public IP enabled.
    */
    disableOutboundNat?: boolean;
}

export interface AgentPoolUpgradeSettings {
    /**
    * The amount of time (in minutes) to wait on eviction of pods and graceful termination per node. This eviction wait time honors waiting on pod disruption budgets. If this time is exceeded, the upgrade fails. If not specified, the default is 30 minutes.
    */
    drainTimeoutInMinutes?: number;
    /**
    * This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 1. For more information, including best practices, see: https://docs.microsoft.com/azure/aks/upgrade-cluster#customize-node-surge-upgrade
    */
    maxSurge?: string;
    /**
    * The amount of time (in minutes) to wait after draining a node and before reimaging it and moving on to next node. If not specified, the default is 0 minutes.
    */
    nodeSoakDurationInMinutes?: number;
}

export interface PowerState {
    /**
    * Tells whether the cluster is Running or Stopped
    */
    code?: string;
}

export interface AgentPoolNetworkProfile {
    /**
    * The port ranges that are allowed to access. The specified ranges are allowed to overlap.
    */
    allowedHostPorts?: PortRange[];
    /**
    * The IDs of the application security groups which agent pool will associate when created.
    */
    applicationSecurityGroups?: string[];
    /**
    * IPTags of instance-level public IPs.
    */
    nodePublicIPTags?: IpTag[];
}

export interface IpTag {
    /**
    * The IP tag type. Example: RoutingPreference.
    */
    ipTagType?: string;
    /**
    * The value of the IP tag associated with the public IP. Example: Internet.
    */
    tag?: string;
}

export interface PortRange {
    /**
    * The maximum port that is included in the range. It should be ranged from 1 to 65535, and be greater than or equal to portStart.
    */
    portEnd?: number;
    /**
    * The minimum port that is included in the range. It should be ranged from 1 to 65535, and be less than or equal to portEnd.
    */
    portStart?: number;
    /**
    * The network protocol of the port.
    */
    protocol?: string;
}

export interface LinuxOsConfig {
    /**
    * The size in MB of a swap file that will be created on each node.
    */
    swapFileSizeMB?: number;
    /**
    * Sysctl settings for Linux agent nodes.
    */
    sysctls?: SysctlConfig;
    /**
    * Valid values are 'always', 'defer', 'defer+madvise', 'madvise' and 'never'. The default is 'madvise'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge).
    */
    transparentHugePageDefrag?: string;
    /**
    * Valid values are 'always', 'madvise', and 'never'. The default is 'always'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge).
    */
    transparentHugePageEnabled?: string;
}

export interface SysctlConfig {
    /**
    * Sysctl setting fs.aio-max-nr.
    */
    fsAioMaxNr?: number;
    /**
    * Sysctl setting fs.file-max.
    */
    fsFileMax?: number;
    /**
    * Sysctl setting fs.inotify.max_user_watches.
    */
    fsInotifyMaxUserWatches?: number;
    /**
    * Sysctl setting fs.nr_open.
    */
    fsNrOpen?: number;
    /**
    * Sysctl setting kernel.threads-max.
    */
    kernelThreadsMax?: number;
    /**
    * Sysctl setting net.core.netdev_max_backlog.
    */
    netCoreNetdevMaxBacklog?: number;
    /**
    * Sysctl setting net.core.optmem_max.
    */
    netCoreOptmemMax?: number;
    /**
    * Sysctl setting net.core.rmem_default.
    */
    netCoreRmemDefault?: number;
    /**
    * Sysctl setting net.core.rmem_max.
    */
    netCoreRmemMax?: number;
    /**
    * Sysctl setting net.core.somaxconn.
    */
    netCoreSomaxconn?: number;
    /**
    * Sysctl setting net.core.wmem_default.
    */
    netCoreWmemDefault?: number;
    /**
    * Sysctl setting net.core.wmem_max.
    */
    netCoreWmemMax?: number;
    /**
    * Sysctl setting net.ipv4.ip_local_port_range.
    */
    netIpv4IpLocalPortRange?: string;
    /**
    * Sysctl setting net.ipv4.neigh.default.gc_thresh1.
    */
    netIpv4NeighDefaultGcThresh1?: number;
    /**
    * Sysctl setting net.ipv4.neigh.default.gc_thresh2.
    */
    netIpv4NeighDefaultGcThresh2?: number;
    /**
    * Sysctl setting net.ipv4.neigh.default.gc_thresh3.
    */
    netIpv4NeighDefaultGcThresh3?: number;
    /**
    * Sysctl setting net.ipv4.tcp_fin_timeout.
    */
    netIpv4TcpFinTimeout?: number;
    /**
    * Sysctl setting net.ipv4.tcp_keepalive_probes.
    */
    netIpv4TcpKeepaliveProbes?: number;
    /**
    * Sysctl setting net.ipv4.tcp_keepalive_time.
    */
    netIpv4TcpKeepaliveTime?: number;
    /**
    * Sysctl setting net.ipv4.tcp_max_syn_backlog.
    */
    netIpv4TcpMaxSynBacklog?: number;
    /**
    * Sysctl setting net.ipv4.tcp_max_tw_buckets.
    */
    netIpv4TcpMaxTwBuckets?: number;
    /**
    * Sysctl setting net.ipv4.tcp_tw_reuse.
    */
    netIpv4TcpTwReuse?: boolean;
    /**
    * Sysctl setting net.ipv4.tcp_keepalive_intvl.
    */
    netIpv4TcpkeepaliveIntvl?: number;
    /**
    * Sysctl setting net.netfilter.nf_conntrack_buckets.
    */
    netNetfilterNfConntrackBuckets?: number;
    /**
    * Sysctl setting net.netfilter.nf_conntrack_max.
    */
    netNetfilterNfConntrackMax?: number;
    /**
    * Sysctl setting vm.max_map_count.
    */
    vmMaxMapCount?: number;
    /**
    * Sysctl setting vm.swappiness.
    */
    vmSwappiness?: number;
    /**
    * Sysctl setting vm.vfs_cache_pressure.
    */
    vmVfsCachePressure?: number;
}

export interface KubeletConfig {
    /**
    * Allowed list of unsafe sysctls or unsafe sysctl patterns (ending in `*`).
    */
    allowedUnsafeSysctls?: string[];
    /**
    * The maximum number of container log files that can be present for a container. The number must be ≥ 2.
    */
    containerLogMaxFiles?: number;
    /**
    * The maximum size (e.g. 10Mi) of container log file before it is rotated.
    */
    containerLogMaxSizeMB?: number;
    /**
    * The default is true.
    */
    cpuCfsQuota?: boolean;
    /**
    * The default is '100ms.' Valid values are a sequence of decimal numbers with an optional fraction and a unit suffix. For example: '300ms', '2h45m'. Supported units are 'ns', 'us', 'ms', 's', 'm', and 'h'.
    */
    cpuCfsQuotaPeriod?: string;
    /**
    * The default is 'none'. See [Kubernetes CPU management policies](https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/#cpu-management-policies) for more information. Allowed values are 'none' and 'static'.
    */
    cpuManagerPolicy?: string;
    /**
    * If set to true it will make the Kubelet fail to start if swap is enabled on the node.
    */
    failSwapOn?: boolean;
    /**
    * To disable image garbage collection, set to 100. The default is 85%
    */
    imageGcHighThreshold?: number;
    /**
    * This cannot be set higher than imageGcHighThreshold. The default is 80%
    */
    imageGcLowThreshold?: number;
    /**
    * The maximum number of processes per pod.
    */
    podMaxPids?: number;
    /**
    * For more information see [Kubernetes Topology Manager](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager). The default is 'none'. Allowed values are 'none', 'best-effort', 'restricted', and 'single-numa-node'.
    */
    topologyManagerPolicy?: string;
}

export interface CreationData {
    /**
    * This is the ARM ID of the source object to be used to create the target object.
    */
    sourceResourceId?: string;
}

export interface ManagedClusterAddonProfile {
    /**
    * Key-value pairs for configuring an add-on.
    */
    config?: object | string | boolean | number;
    /**
    * Whether the add-on is enabled or not.
    */
    enabled: boolean;
}

export interface ManagedClusterAadProfile {
    /**
    * The list of AAD group object IDs that will have admin role of the cluster.
    */
    adminGroupObjectIDs?: string[];
    /**
    * (DEPRECATED) The client AAD application ID. Learn more at https://aka.ms/aks/aad-legacy.
    */
    clientAppID?: string;
    /**
    * Whether to enable Azure RBAC for Kubernetes authorization.
    */
    enableAzureRBAC?: boolean;
    /**
    * Whether to enable managed AAD.
    */
    managed?: boolean;
    /**
    * (DEPRECATED) The server AAD application ID. Learn more at https://aka.ms/aks/aad-legacy.
    */
    serverAppID?: string;
    /**
    * (DEPRECATED) The server AAD application secret. Learn more at https://aka.ms/aks/aad-legacy.
    */
    serverAppSecret?: string;
    /**
    * The AAD tenant ID to use for authentication. If not specified, will use the tenant of the deployment subscription.
    */
    tenantID?: string;
}

export interface ExtendedLocation {
    /**
    * The name of the extended location.
    */
    name?: string;
    /**
    * The type of the extended location.
    */
    type?: string;
}

export class ManagedClusters extends AzAPIBase {
    /**
       * Constructs a new ManagedClusters.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/managedClusters@2024-02-01. The properties include:
     * `extendedLocation` - (Optional) The extended location of the Virtual Machine. Defaults to `ExtendedLocation`.
     * `properties` - (Required) Properties of a managed cluster. Defaults to `ManagedClusterProperties`.
     * `sku` - (Optional) The managed cluster SKU. Defaults to `ManagedClusterSku`.
     *
     * ---
     *
     * The `ManagedClusterSKU` block supports the following:
    
     * `name` - (Optional) The name of a managed cluster SKU. Defaults to `string`.
     * `tier` - (Optional) If not specified, the default is 'Free'. See [AKS Pricing Tier](https://learn.microsoft.com/azure/aks/free-standard-pricing-tiers) for more details. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterProperties` block supports the following:
    
     * `aadProfile` - (Optional) The Azure Active Directory configuration. Defaults to `ManagedClusterAadProfile`.
     * `addonProfiles` - (Optional) The profile of managed cluster add-on. Defaults to `ManagedClusterAddonProfile | object`.
     * `agentPoolProfiles` - (Optional) The agent pool properties. Defaults to `ManagedClusterAgentPoolProfile[]`.
     * `apiServerAccessProfile` - (Optional) The access profile for managed cluster API server. Defaults to `ManagedClusterApiServerAccessProfile`.
     * `autoScalerProfile` - (Optional) Parameters to be applied to the cluster-autoscaler when enabled Defaults to `ManagedClusterPropertiesAutoScalerProfile`.
     * `autoUpgradeProfile` - (Optional) The auto upgrade configuration. Defaults to `ManagedClusterAutoUpgradeProfile`.
     * `azureMonitorProfile` - (Optional) Azure Monitor addon profiles for monitoring the managed cluster. Defaults to `ManagedClusterAzureMonitorProfile`.
     * `disableLocalAccounts` - (Optional) If set to true, getting static credentials will be disabled for this cluster. This must only be used on Managed Clusters that are AAD enabled. For more details see [disable local accounts](https://docs.microsoft.com/azure/aks/managed-aad#disable-local-accounts-preview). Defaults to `boolean`.
     * `diskEncryptionSetID` - (Optional) This is of the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{encryptionSetName}' Defaults to `string`.
     * `dnsPrefix` - (Optional) This cannot be updated once the Managed Cluster has been created. Defaults to `string`.
     * `enablePodSecurityPolicy` - (Optional) (DEPRECATED) Whether to enable Kubernetes pod security policy (preview). PodSecurityPolicy was deprecated in Kubernetes v1.21, and removed from Kubernetes in v1.25. Learn more at https://aka.ms/k8s/psp and https://aka.ms/aks/psp. Defaults to `boolean`.
     * `enableRBAC` - (Optional) Whether to enable Kubernetes Role-Based Access Control. Defaults to `boolean`.
     * `fqdnSubdomain` - (Optional) This cannot be updated once the Managed Cluster has been created. Defaults to `string`.
     * `httpProxyConfig` - (Optional) Configurations for provisioning the cluster with HTTP proxy servers. Defaults to `ManagedClusterHttpProxyConfig`.
     * `identityProfile` - (Optional) Identities associated with the cluster. Defaults to `UserAssignedIdentity | object`.
     * `ingressProfile` - (Optional) Ingress profile for the managed cluster. Defaults to `ManagedClusterIngressProfile`.
     * `kubernetesVersion` - (Optional) Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. When you upgrade a supported AKS cluster, Kubernetes minor versions cannot be skipped. All upgrades must be performed sequentially by major version number. For example, upgrades between 1.14.x -> 1.15.x or 1.15.x -> 1.16.x are allowed, however 1.14.x -> 1.16.x is not allowed. See [upgrading an AKS cluster](https://docs.microsoft.com/azure/aks/upgrade-cluster) for more details. Defaults to `string`.
     * `linuxProfile` - (Optional) The profile for Linux VMs in the Managed Cluster. Defaults to `ContainerServiceLinuxProfile`.
     * `metricsProfile` - (Optional) Optional cluster metrics configuration. Defaults to `ManagedClusterMetricsProfile`.
     * `networkProfile` - (Optional) The network configuration profile. Defaults to `ContainerServiceNetworkProfile`.
     * `nodeResourceGroup` - (Optional) The name of the resource group containing agent pool nodes. Defaults to `string`.
     * `oidcIssuerProfile` - (Optional) The OIDC issuer profile of the Managed Cluster. Defaults to `ManagedClusterOidcIssuerProfile`.
     * `podIdentityProfile` - (Optional) See [use AAD pod identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity) for more details on AAD pod identity integration. Defaults to `ManagedClusterPodIdentityProfile`.
     * `privateLinkResources` - (Optional) Private link resources associated with the cluster. Defaults to `PrivateLinkResource[]`.
     * `publicNetworkAccess` - (Optional) Allow or deny public network access for AKS Defaults to `string`.
     * `securityProfile` - (Optional) Security profile for the managed cluster. Defaults to `ManagedClusterSecurityProfile`.
     * `serviceMeshProfile` - (Optional) Service mesh profile for a managed cluster. Defaults to `ServiceMeshProfile`.
     * `servicePrincipalProfile` - (Optional) Information about a service principal identity for the cluster to use for manipulating Azure APIs. Defaults to `ManagedClusterServicePrincipalProfile`.
     * `storageProfile` - (Optional) Storage profile for the managed cluster. Defaults to `ManagedClusterStorageProfile`.
     * `supportPlan` - (Optional) The support plan for the Managed Cluster. If unspecified, the default is 'KubernetesOfficial'. Defaults to `string`.
     * `upgradeSettings` - (Optional) Settings for upgrading a cluster. Defaults to `ClusterUpgradeSettings`.
     * `windowsProfile` - (Optional) The profile for Windows VMs in the Managed Cluster. Defaults to `ManagedClusterWindowsProfile`.
     * `workloadAutoScalerProfile` - (Optional) Workload Auto-scaler profile for the managed cluster. Defaults to `ManagedClusterWorkloadAutoScalerProfile`.
     *
     * ---
     *
     * The `ManagedClusterWorkloadAutoScalerProfile` block supports the following:
    
     * `keda` - (Optional) KEDA (Kubernetes Event-driven Autoscaling) settings for the workload auto-scaler profile. Defaults to `ManagedClusterWorkloadAutoScalerProfileKeda`.
     * `verticalPodAutoscaler` - (Optional) VPA (Vertical Pod Autoscaler) settings for the workload auto-scaler profile. Defaults to `ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler`.
     *
     * ---
     *
     * The `ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler` block supports the following:
    
     * `enabled` - (Required) Whether to enable VPA. Default value is false. Defaults to `boolean`.
     *
     * ---
     *
     * The `ManagedClusterWorkloadAutoScalerProfileKeda` block supports the following:
    
     * `enabled` - (Required) Whether to enable KEDA. Defaults to `boolean`.
     *
     * ---
     *
     * The `ManagedClusterWindowsProfile` block supports the following:
    
     * `adminPassword` - (Optional) Specifies the password of the administrator account. <br><br> **Minimum-length:** 8 characters <br><br> **Max-length:** 123 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" Defaults to `string`.
     * `adminUsername` - (Required) Specifies the name of the administrator account. <br><br> **Restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length:** 1 character <br><br> **Max-length:** 20 characters Defaults to `string`.
     * `enableCSIProxy` - (Optional) For more details on CSI proxy, see the [CSI proxy GitHub repo](https://github.com/kubernetes-csi/csi-proxy). Defaults to `boolean`.
     * `gmsaProfile` - (Optional) The Windows gMSA Profile in the Managed Cluster. Defaults to `WindowsGmsaProfile`.
     * `licenseType` - (Optional) The license type to use for Windows VMs. See [Azure Hybrid User Benefits](https://azure.microsoft.com/pricing/hybrid-benefit/faq/) for more details. Defaults to `string`.
     *
     * ---
     *
     * The `WindowsGmsaProfile` block supports the following:
    
     * `dnsServer` - (Optional) Specifies the DNS server for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster. Defaults to `string`.
     * `enabled` - (Optional) Specifies whether to enable Windows gMSA in the managed cluster. Defaults to `boolean`.
     * `rootDomainName` - (Optional) Specifies the root domain name for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster. Defaults to `string`.
     *
     * ---
     *
     * The `ClusterUpgradeSettings` block supports the following:
    
     * `overrideSettings` - (Optional) Settings for overrides. Defaults to `UpgradeOverrideSettings`.
     *
     * ---
     *
     * The `UpgradeOverrideSettings` block supports the following:
    
     * `forceUpgrade` - (Optional) Whether to force upgrade the cluster. Note that this option instructs upgrade operation to bypass upgrade protections such as checking for deprecated API usage. Enable this option only with caution. Defaults to `boolean`.
     * `until` - (Optional) Until when the overrides are effective. Note that this only matches the start time of an upgrade, and the effectiveness won't change once an upgrade starts even if the `until` expires as upgrade proceeds. This field is not set by default. It must be set for the overrides to take effect. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterStorageProfile` block supports the following:
    
     * `blobCSIDriver` - (Optional) AzureBlob CSI Driver settings for the storage profile. Defaults to `ManagedClusterStorageProfileBlobCsiDriver`.
     * `diskCSIDriver` - (Optional) AzureDisk CSI Driver settings for the storage profile. Defaults to `ManagedClusterStorageProfileDiskCsiDriver`.
     * `fileCSIDriver` - (Optional) AzureFile CSI Driver settings for the storage profile. Defaults to `ManagedClusterStorageProfileFileCsiDriver`.
     * `snapshotController` - (Optional) Snapshot Controller settings for the storage profile. Defaults to `ManagedClusterStorageProfileSnapshotController`.
     *
     * ---
     *
     * The `ManagedClusterStorageProfileSnapshotController` block supports the following:
    
     * `enabled` - (Optional) Whether to enable Snapshot Controller. The default value is true. Defaults to `boolean`.
     *
     * ---
     *
     * The `ManagedClusterStorageProfileFileCSIDriver` block supports the following:
    
     * `enabled` - (Optional) Whether to enable AzureFile CSI Driver. The default value is true. Defaults to `boolean`.
     *
     * ---
     *
     * The `ManagedClusterStorageProfileDiskCSIDriver` block supports the following:
    
     * `enabled` - (Optional) Whether to enable AzureDisk CSI Driver. The default value is true. Defaults to `boolean`.
     *
     * ---
     *
     * The `ManagedClusterStorageProfileBlobCSIDriver` block supports the following:
    
     * `enabled` - (Optional) Whether to enable AzureBlob CSI Driver. The default value is false. Defaults to `boolean`.
     *
     * ---
     *
     * The `ManagedClusterServicePrincipalProfile` block supports the following:
    
     * `clientId` - (Required) The ID for the service principal. Defaults to `string`.
     * `secret` - (Optional) The secret password associated with the service principal in plain text. Defaults to `string`.
     *
     * ---
     *
     * The `ServiceMeshProfile` block supports the following:
    
     * `istio` - (Optional) Istio service mesh configuration. Defaults to `IstioServiceMesh`.
     * `mode` - (Required) Mode of the service mesh. Defaults to `string`.
     *
     * ---
     *
     * The `IstioServiceMesh` block supports the following:
    
     * `certificateAuthority` - (Optional) Istio Service Mesh Certificate Authority (CA) configuration. For now, we only support plugin certificates as described here https://aka.ms/asm-plugin-ca Defaults to `IstioCertificateAuthority`.
     * `components` - (Optional) Istio components configuration. Defaults to `IstioComponents`.
     * `revisions` - (Optional) The list of revisions of the Istio control plane. When an upgrade is not in progress, this holds one value. When canary upgrade is in progress, this can only hold two consecutive values. For more information, see: https://learn.microsoft.com/en-us/azure/aks/istio-upgrade Defaults to `string[]`.
     *
     * ---
     *
     * The `IstioComponents` block supports the following:
    
     * `egressGateways` - (Optional) Istio egress gateways. Defaults to `IstioEgressGateway[]`.
     * `ingressGateways` - (Optional) Istio ingress gateways. Defaults to `IstioIngressGateway[]`.
     *
     * ---
     *
     * The `IstioIngressGateway[]` block supports the following:
    
     * `enabled` - (Required) Whether to enable the ingress gateway. Defaults to `boolean`.
     * `mode` - (Required) Mode of an ingress gateway. Defaults to `string`.
     *
     * ---
     *
     * The `IstioEgressGateway[]` block supports the following:
    
     * `enabled` - (Required) Whether to enable the egress gateway. Defaults to `boolean`.
     *
     * ---
     *
     * The `IstioCertificateAuthority` block supports the following:
    
     * `plugin` - (Optional) Plugin certificates information for Service Mesh. Defaults to `IstioPluginCertificateAuthority`.
     *
     * ---
     *
     * The `IstioPluginCertificateAuthority` block supports the following:
    
     * `certChainObjectName` - (Optional) Certificate chain object name in Azure Key Vault. Defaults to `string`.
     * `certObjectName` - (Optional) Intermediate certificate object name in Azure Key Vault. Defaults to `string`.
     * `keyObjectName` - (Optional) Intermediate certificate private key object name in Azure Key Vault. Defaults to `string`.
     * `keyVaultId` - (Optional) The resource ID of the Key Vault. Defaults to `string`.
     * `rootCertObjectName` - (Optional) Root certificate object name in Azure Key Vault. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterSecurityProfile` block supports the following:
    
     * `azureKeyVaultKms` - (Optional) Azure Key Vault [key management service](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) settings for the security profile. Defaults to `AzureKeyVaultKms`.
     * `defender` - (Optional) Microsoft Defender settings for the security profile. Defaults to `ManagedClusterSecurityProfileDefender`.
     * `imageCleaner` - (Optional) Image Cleaner settings for the security profile. Defaults to `ManagedClusterSecurityProfileImageCleaner`.
     * `workloadIdentity` - (Optional) Workload identity settings for the security profile. Workload identity enables Kubernetes applications to access Azure cloud resources securely with Azure AD. See https://aka.ms/aks/wi for more details. Defaults to `ManagedClusterSecurityProfileWorkloadIdentity`.
     *
     * ---
     *
     * The `ManagedClusterSecurityProfileWorkloadIdentity` block supports the following:
    
     * `enabled` - (Optional) Whether to enable workload identity. Defaults to `boolean`.
     *
     * ---
     *
     * The `ManagedClusterSecurityProfileImageCleaner` block supports the following:
    
     * `enabled` - (Optional) Whether to enable Image Cleaner on AKS cluster. Defaults to `boolean`.
     * `intervalHours` - (Optional) Image Cleaner scanning interval in hours. Defaults to `integer`.
     *
     * ---
     *
     * The `ManagedClusterSecurityProfileDefender` block supports the following:
    
     * `logAnalyticsWorkspaceResourceId` - (Optional) Resource ID of the Log Analytics workspace to be associated with Microsoft Defender. When Microsoft Defender is enabled, this field is required and must be a valid workspace resource ID. When Microsoft Defender is disabled, leave the field empty. Defaults to `string`.
     * `securityMonitoring` - (Optional) Microsoft Defender threat detection for Cloud settings for the security profile. Defaults to `ManagedClusterSecurityProfileDefenderSecurityMonitoring`.
     *
     * ---
     *
     * The `ManagedClusterSecurityProfileDefenderSecurityMonitoring` block supports the following:
    
     * `enabled` - (Optional) Whether to enable Defender threat detection Defaults to `boolean`.
     *
     * ---
     *
     * The `AzureKeyVaultKms` block supports the following:
    
     * `enabled` - (Optional) Whether to enable Azure Key Vault key management service. The default is false. Defaults to `boolean`.
     * `keyId` - (Optional) Identifier of Azure Key Vault key. See [key identifier format](https://docs.microsoft.com/en-us/azure/key-vault/general/about-keys-secrets-certificates#vault-name-and-object-name) for more details. When Azure Key Vault key management service is enabled, this field is required and must be a valid key identifier. When Azure Key Vault key management service is disabled, leave the field empty. Defaults to `string`.
     * `keyVaultNetworkAccess` - (Optional) Network access of key vault. The possible values are `Public` and `Private`. `Public` means the key vault allows public access from all networks. `Private` means the key vault disables public access and enables private link. The default value is `Public`. Defaults to `string`.
     * `keyVaultResourceId` - (Optional) Resource ID of key vault. When keyVaultNetworkAccess is `Private`, this field is required and must be a valid resource ID. When keyVaultNetworkAccess is `Public`, leave the field empty. Defaults to `string`.
     *
     * ---
     *
     * The `PrivateLinkResource[]` block supports the following:
    
     * `groupId` - (Optional) The group ID of the resource. Defaults to `string`.
     * `id` - (Optional) The ID of the private link resource. Defaults to `string`.
     * `name` - (Optional) The name of the private link resource. Defaults to `string`.
     * `requiredMembers` - (Optional) The RequiredMembers of the resource Defaults to `string[]`.
     * `type` - (Optional) The resource type. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterPodIdentityProfile` block supports the following:
    
     * `allowNetworkPluginKubenet` - (Optional) Running in Kubenet is disabled by default due to the security related nature of AAD Pod Identity and the risks of IP spoofing. See [using Kubenet network plugin with AAD Pod Identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity#using-kubenet-network-plugin-with-azure-active-directory-pod-managed-identities) for more information. Defaults to `boolean`.
     * `enabled` - (Optional) Whether the pod identity addon is enabled. Defaults to `boolean`.
     * `userAssignedIdentities` - (Optional) The pod identities to use in the cluster. Defaults to `ManagedClusterPodIdentity[]`.
     * `userAssignedIdentityExceptions` - (Optional) The pod identity exceptions to allow. Defaults to `ManagedClusterPodIdentityException[]`.
     *
     * ---
     *
     * The `ManagedClusterPodIdentityException[]` block supports the following:
    
     * `name` - (Required) The name of the pod identity exception. Defaults to `string`.
     * `namespace` - (Required) The namespace of the pod identity exception. Defaults to `string`.
     * `podLabels` - (Required) The pod labels to match. Defaults to `object`.
     *
     * ---
     *
     * The `ManagedClusterPodIdentity[]` block supports the following:
    
     * `bindingSelector` - (Optional) The binding selector to use for the AzureIdentityBinding resource. Defaults to `string`.
     * `identity` - (Required) The user assigned identity details. Defaults to `UserAssignedIdentity`.
     * `name` - (Required) The name of the pod identity. Defaults to `string`.
     * `namespace` - (Required) The namespace of the pod identity. Defaults to `string`.
     *
     * ---
     *
     * The `UserAssignedIdentity` block supports the following:
    
     * `clientId` - (Optional) The client ID of the user assigned identity. Defaults to `string`.
     * `objectId` - (Optional) The object ID of the user assigned identity. Defaults to `string`.
     * `resourceId` - (Optional) The resource ID of the user assigned identity. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterOidcIssuerProfile` block supports the following:
    
     * `enabled` - (Optional) Whether the OIDC issuer is enabled. Defaults to `boolean`.
     *
     * ---
     *
     * The `ContainerServiceNetworkProfile` block supports the following:
    
     * `dnsServiceIP` - (Optional) An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in serviceCidr. Defaults to `string`.
     * `ipFamilies` - (Optional) IP families are used to determine single-stack or dual-stack clusters. For single-stack, the expected value is IPv4. For dual-stack, the expected values are IPv4 and IPv6. Defaults to `string[]`.
     * `loadBalancerProfile` - (Optional) Profile of the cluster load balancer. Defaults to `ManagedClusterLoadBalancerProfile`.
     * `loadBalancerSku` - (Optional) The default is 'standard'. See [Azure Load Balancer SKUs](https://docs.microsoft.com/azure/load-balancer/skus) for more information about the differences between load balancer SKUs. Defaults to `string`.
     * `natGatewayProfile` - (Optional) Profile of the cluster NAT gateway. Defaults to `ManagedClusterNatGatewayProfile`.
     * `networkDataplane` - (Optional) Network dataplane used in the Kubernetes cluster. Defaults to `string`.
     * `networkMode` - (Optional) This cannot be specified if networkPlugin is anything other than 'azure'. Defaults to `string`.
     * `networkPlugin` - (Optional) Network plugin used for building the Kubernetes network. Defaults to `string`.
     * `networkPluginMode` - (Optional) The mode the network plugin should use. Defaults to `string`.
     * `networkPolicy` - (Optional) Network policy used for building the Kubernetes network. Defaults to `string`.
     * `outboundType` - (Optional) This can only be set at cluster creation time and cannot be changed later. For more information see [egress outbound type](https://docs.microsoft.com/azure/aks/egress-outboundtype). Defaults to `string`.
     * `podCidr` - (Optional) A CIDR notation IP range from which to assign pod IPs when kubenet is used. Defaults to `string`.
     * `podCidrs` - (Optional) One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. Defaults to `string[]`.
     * `serviceCidr` - (Optional) A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges. Defaults to `string`.
     * `serviceCidrs` - (Optional) One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. They must not overlap with any Subnet IP ranges. Defaults to `string[]`.
     *
     * ---
     *
     * The `ManagedClusterNATGatewayProfile` block supports the following:
    
     * `effectiveOutboundIPs` - (Optional) The effective outbound IP resources of the cluster NAT gateway. Defaults to `ResourceReference[]`.
     * `idleTimeoutInMinutes` - (Optional) Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 4 minutes. Defaults to `integer`.
     * `managedOutboundIPProfile` - (Optional) Profile of the managed outbound IP resources of the cluster NAT gateway. Defaults to `ManagedClusterManagedOutboundIpProfile`.
     *
     * ---
     *
     * The `ManagedClusterManagedOutboundIPProfile` block supports the following:
    
     * `count` - (Optional) The desired number of outbound IPs created/managed by Azure. Allowed values must be in the range of 1 to 16 (inclusive). The default value is 1.  Defaults to `integer`.
     *
     * ---
     *
     * The `ResourceReference[]` block supports the following:
    
     * `id` - (Optional) The fully qualified Azure resource id. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterLoadBalancerProfile` block supports the following:
    
     * `allocatedOutboundPorts` - (Optional) The desired number of allocated SNAT ports per VM. Allowed values are in the range of 0 to 64000 (inclusive). The default value is 0 which results in Azure dynamically allocating ports. Defaults to `integer`.
     * `backendPoolType` - (Optional) The type of the managed inbound Load Balancer BackendPool. Defaults to `string`.
     * `effectiveOutboundIPs` - (Optional) The effective outbound IP resources of the cluster load balancer. Defaults to `ResourceReference[]`.
     * `enableMultipleStandardLoadBalancers` - (Optional) Enable multiple standard load balancers per AKS cluster or not. Defaults to `boolean`.
     * `idleTimeoutInMinutes` - (Optional) Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 30 minutes. Defaults to `integer`.
     * `managedOutboundIPs` - (Optional) Desired managed outbound IPs for the cluster load balancer. Defaults to `ManagedClusterLoadBalancerProfileManagedOutboundIPs`.
     * `outboundIPPrefixes` - (Optional) Desired outbound IP Prefix resources for the cluster load balancer. Defaults to `ManagedClusterLoadBalancerProfileOutboundIpPrefixes`.
     * `outboundIPs` - (Optional) Desired outbound IP resources for the cluster load balancer. Defaults to `ManagedClusterLoadBalancerProfileOutboundIPs`.
     *
     * ---
     *
     * The `ManagedClusterLoadBalancerProfileOutboundIPs` block supports the following:
    
     * `publicIPs` - (Optional) A list of public IP resources. Defaults to `ResourceReference[]`.
     *
     * ---
     *
     * The `ManagedClusterLoadBalancerProfileOutboundIPPrefixes` block supports the following:
    
     * `publicIPPrefixes` - (Optional) A list of public IP prefix resources. Defaults to `ResourceReference[]`.
     *
     * ---
     *
     * The `ManagedClusterLoadBalancerProfileManagedOutboundIPs` block supports the following:
    
     * `count` - (Optional) The desired number of IPv4 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 1.  Defaults to `integer`.
     * `countIPv6` - (Optional) The desired number of IPv6 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 0 for single-stack and 1 for dual-stack.  Defaults to `integer`.
     *
     * ---
     *
     * The `ManagedClusterMetricsProfile` block supports the following:
    
     * `costAnalysis` - (Optional) The cost analysis configuration for the cluster Defaults to `ManagedClusterCostAnalysis`.
     *
     * ---
     *
     * The `ManagedClusterCostAnalysis` block supports the following:
    
     * `enabled` - (Optional) The Managed Cluster sku.tier must be set to 'Standard' or 'Premium' to enable this feature. Enabling this will add Kubernetes Namespace and Deployment details to the Cost Analysis views in the Azure portal. If not specified, the default is false. For more information see aka.ms/aks/docs/cost-analysis. Defaults to `boolean`.
     *
     * ---
     *
     * The `ContainerServiceLinuxProfile` block supports the following:
    
     * `adminUsername` - (Required) The administrator username to use for Linux VMs. Defaults to `string`.
     * `ssh` - (Required) The SSH configuration for Linux-based VMs running on Azure. Defaults to `ContainerServiceSshConfiguration`.
     *
     * ---
     *
     * The `ContainerServiceSshConfiguration` block supports the following:
    
     * `publicKeys` - (Required) The list of SSH public keys used to authenticate with Linux-based VMs. A maximum of 1 key may be specified. Defaults to `ContainerServiceSshPublicKey[]`.
     *
     * ---
     *
     * The `ContainerServiceSshPublicKey[]` block supports the following:
    
     * `keyData` - (Required) Certificate public key used to authenticate with VMs through SSH. The certificate must be in PEM format with or without headers. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterIngressProfile` block supports the following:
    
     * `webAppRouting` - (Optional) App Routing settings for the ingress profile. You can find an overview and onboarding guide for this feature at https://learn.microsoft.com/en-us/azure/aks/app-routing?tabs=default%2Cdeploy-app-default. Defaults to `ManagedClusterIngressProfileWebAppRouting`.
     *
     * ---
     *
     * The `ManagedClusterIngressProfileWebAppRouting` block supports the following:
    
     * `dnsZoneResourceIds` - (Optional) Resource IDs of the DNS zones to be associated with the Application Routing add-on. Used only when Application Routing add-on is enabled. Public and private DNS zones can be in different resource groups, but all public DNS zones must be in the same resource group and all private DNS zones must be in the same resource group. Defaults to `string[]`.
     * `enabled` - (Optional) Whether to enable the Application Routing add-on. Defaults to `boolean`.
     *
     * ---
     *
     * The `UserAssignedIdentity` block supports the following:
    
     * `clientId` - (Optional) The client ID of the user assigned identity. Defaults to `string`.
     * `objectId` - (Optional) The object ID of the user assigned identity. Defaults to `string`.
     * `resourceId` - (Optional) The resource ID of the user assigned identity. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterHttpProxyConfig` block supports the following:
    
     * `httpProxy` - (Optional) The HTTP proxy server endpoint to use. Defaults to `string`.
     * `httpsProxy` - (Optional) The HTTPS proxy server endpoint to use. Defaults to `string`.
     * `noProxy` - (Optional) The endpoints that should not go through proxy. Defaults to `string[]`.
     * `trustedCa` - (Optional) Alternative CA cert to use for connecting to proxy servers. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterAzureMonitorProfile` block supports the following:
    
     * `metrics` - (Optional) Metrics profile for the Azure Monitor managed service for Prometheus addon. Collect out-of-the-box Kubernetes infrastructure metrics to send to an Azure Monitor Workspace and configure additional scraping for custom targets. See aka.ms/AzureManagedPrometheus for an overview. Defaults to `ManagedClusterAzureMonitorProfileMetrics`.
     *
     * ---
     *
     * The `ManagedClusterAzureMonitorProfileMetrics` block supports the following:
    
     * `enabled` - (Required) Whether to enable or disable the Azure Managed Prometheus addon for Prometheus monitoring. See aka.ms/AzureManagedPrometheus-aks-enable for details on enabling and disabling. Defaults to `boolean`.
     * `kubeStateMetrics` - (Optional) Kube State Metrics profile for the Azure Managed Prometheus addon. These optional settings are for the kube-state-metrics pod that is deployed with the addon. See aka.ms/AzureManagedPrometheus-optional-parameters for details. Defaults to `ManagedClusterAzureMonitorProfileKubeStateMetrics`.
     *
     * ---
     *
     * The `ManagedClusterAzureMonitorProfileKubeStateMetrics` block supports the following:
    
     * `metricAnnotationsAllowList` - (Optional) Comma-separated list of Kubernetes annotation keys that will be used in the resource's labels metric (Example: 'namespaces=[kubernetes.io/team,...],pods=[kubernetes.io/team],...'). By default the metric contains only resource name and namespace labels. Defaults to `string`.
     * `metricLabelsAllowlist` - (Optional) Comma-separated list of additional Kubernetes label keys that will be used in the resource's labels metric (Example: 'namespaces=[k8s-label-1,k8s-label-n,...],pods=[app],...'). By default the metric contains only resource name and namespace labels. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterAutoUpgradeProfile` block supports the following:
    
     * `nodeOSUpgradeChannel` - (Optional) Manner in which the OS on your nodes is updated. The default is NodeImage. Defaults to `string`.
     * `upgradeChannel` - (Optional) For more information see [setting the AKS cluster auto-upgrade channel](https://docs.microsoft.com/azure/aks/upgrade-cluster#set-auto-upgrade-channel). Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterPropertiesAutoScalerProfile` block supports the following:
    
     * `balance-similar-node-groups` - (Optional) Valid values are 'true' and 'false' Defaults to `string`.
     * `expander` - (Optional) If not specified, the default is 'random'. See [expanders](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) for more information. Defaults to `string`.
     * `max-empty-bulk-delete` - (Optional) The default is 10. Defaults to `string`.
     * `max-graceful-termination-sec` - (Optional) The default is 600. Defaults to `string`.
     * `max-node-provision-time` - (Optional) The default is '15m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. Defaults to `string`.
     * `max-total-unready-percentage` - (Optional) The default is 45. The maximum is 100 and the minimum is 0. Defaults to `string`.
     * `new-pod-scale-up-delay` - (Optional) For scenarios like burst/batch scale where you don't want CA to act before the kubernetes scheduler could schedule all the pods, you can tell CA to ignore unscheduled pods before they're a certain age. The default is '0s'. Values must be an integer followed by a unit ('s' for seconds, 'm' for minutes, 'h' for hours, etc). Defaults to `string`.
     * `ok-total-unready-count` - (Optional) This must be an integer. The default is 3. Defaults to `string`.
     * `scale-down-delay-after-add` - (Optional) The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. Defaults to `string`.
     * `scale-down-delay-after-delete` - (Optional) The default is the scan-interval. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. Defaults to `string`.
     * `scale-down-delay-after-failure` - (Optional) The default is '3m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. Defaults to `string`.
     * `scale-down-unneeded-time` - (Optional) The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. Defaults to `string`.
     * `scale-down-unready-time` - (Optional) The default is '20m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. Defaults to `string`.
     * `scale-down-utilization-threshold` - (Optional) The default is '0.5'. Defaults to `string`.
     * `scan-interval` - (Optional) The default is '10'. Values must be an integer number of seconds. Defaults to `string`.
     * `skip-nodes-with-local-storage` - (Optional) The default is true. Defaults to `string`.
     * `skip-nodes-with-system-pods` - (Optional) The default is true. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterAPIServerAccessProfile` block supports the following:
    
     * `authorizedIPRanges` - (Optional) IP ranges are specified in CIDR format, e.g. 137.117.106.88/29. This feature is not compatible with clusters that use Public IP Per Node, or clusters that are using a Basic Load Balancer. For more information see [API server authorized IP ranges](https://docs.microsoft.com/azure/aks/api-server-authorized-ip-ranges). Defaults to `string[]`.
     * `disableRunCommand` - (Optional) Whether to disable run command for the cluster or not. Defaults to `boolean`.
     * `enablePrivateCluster` - (Optional) For more details, see [Creating a private AKS cluster](https://docs.microsoft.com/azure/aks/private-clusters). Defaults to `boolean`.
     * `enablePrivateClusterPublicFQDN` - (Optional) Whether to create additional public FQDN for private cluster or not. Defaults to `boolean`.
     * `privateDNSZone` - (Optional) The default is System. For more details see [configure private DNS zone](https://docs.microsoft.com/azure/aks/private-clusters#configure-private-dns-zone). Allowed values are 'system' and 'none'. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterAgentPoolProfile[]` block supports the following:
    
     * `availabilityZones` - (Optional) The list of Availability zones to use for nodes. This can only be specified if the AgentPoolType property is 'VirtualMachineScaleSets'. Defaults to `string[]`.
     * `capacityReservationGroupID` - (Optional) AKS will associate the specified agent pool with the Capacity Reservation Group. Defaults to `string`.
     * `count` - (Optional) Number of agents (VMs) to host docker containers. Allowed values must be in the range of 0 to 1000 (inclusive) for user pools and in the range of 1 to 1000 (inclusive) for system pools. The default value is 1. Defaults to `integer`.
     * `creationData` - (Optional) CreationData to be used to specify the source Snapshot ID if the node pool will be created/upgraded using a snapshot. Defaults to `CreationData`.
     * `enableAutoScaling` - (Optional) Whether to enable auto-scaler Defaults to `boolean`.
     * `enableEncryptionAtHost` - (Optional) This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption Defaults to `boolean`.
     * `enableFIPS` - (Optional) See [Add a FIPS-enabled node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#add-a-fips-enabled-node-pool-preview) for more details. Defaults to `boolean`.
     * `enableNodePublicIP` - (Optional) Some scenarios may require nodes in a node pool to receive their own dedicated public IP addresses. A common scenario is for gaming workloads, where a console needs to make a direct connection to a cloud virtual machine to minimize hops. For more information see [assigning a public IP per node](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#assign-a-public-ip-per-node-for-your-node-pools). The default is false. Defaults to `boolean`.
     * `enableUltraSSD` - (Optional) Whether to enable UltraSSD Defaults to `boolean`.
     * `gpuInstanceProfile` - (Optional) GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. Defaults to `string`.
     * `hostGroupID` - (Optional) This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}. For more information see [Azure dedicated hosts](https://docs.microsoft.com/azure/virtual-machines/dedicated-hosts). Defaults to `string`.
     * `kubeletConfig` - (Optional) The Kubelet configuration on the agent pool nodes. Defaults to `KubeletConfig`.
     * `kubeletDiskType` - (Optional) Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage. Defaults to `string`.
     * `linuxOSConfig` - (Optional) The OS configuration of Linux agent nodes. Defaults to `LinuxOsConfig`.
     * `maxCount` - (Optional) The maximum number of nodes for auto-scaling Defaults to `integer`.
     * `maxPods` - (Optional) The maximum number of pods that can run on a node. Defaults to `integer`.
     * `minCount` - (Optional) The minimum number of nodes for auto-scaling Defaults to `integer`.
     * `mode` - (Optional) A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools Defaults to `string`.
     * `name` - (Required) Windows agent pool names must be 6 characters or less. Defaults to `string`.
     * `networkProfile` - (Optional) Network-related settings of an agent pool. Defaults to `AgentPoolNetworkProfile`.
     * `nodeLabels` - (Optional) The node labels to be persisted across all nodes in agent pool. Defaults to `object`.
     * `nodePublicIPPrefixID` - (Optional) This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName} Defaults to `string`.
     * `nodeTaints` - (Optional) The taints added to new nodes during node pool create and scale. For example, key=value:NoSchedule. Defaults to `string[]`.
     * `orchestratorVersion` - (Optional) Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. As a best practice, you should upgrade all node pools in an AKS cluster to the same Kubernetes version. The node pool version must have the same major version as the control plane. The node pool minor version must be within two minor versions of the control plane version. The node pool version cannot be greater than the control plane version. For more information see [upgrading a node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#upgrade-a-node-pool). Defaults to `string`.
     * `osDiskSizeGB` - (Optional) OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified. Defaults to `integer`.
     * `osDiskType` - (Optional) The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os). Defaults to `string`.
     * `osSKU` - (Optional) Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows. Defaults to `string`.
     * `osType` - (Optional) The operating system type. The default is Linux. Defaults to `string`.
     * `podSubnetID` - (Optional) If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} Defaults to `string`.
     * `powerState` - (Optional) When an Agent Pool is first created it is initially Running. The Agent Pool can be stopped by setting this field to Stopped. A stopped Agent Pool stops all of its VMs and does not accrue billing charges. An Agent Pool can only be stopped if it is Running and provisioning state is Succeeded Defaults to `PowerState`.
     * `proximityPlacementGroupID` - (Optional) The ID for Proximity Placement Group. Defaults to `string`.
     * `scaleDownMode` - (Optional) This also effects the cluster autoscaler behavior. If not specified, it defaults to Delete. Defaults to `string`.
     * `scaleSetEvictionPolicy` - (Optional) This cannot be specified unless the scaleSetPriority is 'Spot'. If not specified, the default is 'Delete'. Defaults to `string`.
     * `scaleSetPriority` - (Optional) The Virtual Machine Scale Set priority. If not specified, the default is 'Regular'. Defaults to `string`.
     * `spotMaxPrice` - (Optional) Possible values are any decimal value greater than zero or -1 which indicates the willingness to pay any on-demand price. For more details on spot pricing, see [spot VMs pricing](https://docs.microsoft.com/azure/virtual-machines/spot-vms#pricing) Defaults to `number`.
     * `tags` - (Optional) The tags to be persisted on the agent pool virtual machine scale set. Defaults to `object`.
     * `type` - (Optional) The type of Agent Pool. Defaults to `string`.
     * `upgradeSettings` - (Optional) Settings for upgrading the agentpool Defaults to `AgentPoolUpgradeSettings`.
     * `vmSize` - (Optional) VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions Defaults to `string`.
     * `vnetSubnetID` - (Optional) If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} Defaults to `string`.
     * `windowsProfile` - (Optional) The Windows agent pool's specific profile. Defaults to `AgentPoolWindowsProfile`.
     * `workloadRuntime` - (Optional) Determines the type of workload a node can run. Defaults to `string`.
     *
     * ---
     *
     * The `AgentPoolWindowsProfile` block supports the following:
    
     * `disableOutboundNat` - (Optional) The default value is false. Outbound NAT can only be disabled if the cluster outboundType is NAT Gateway and the Windows agent pool does not have node public IP enabled. Defaults to `boolean`.
     *
     * ---
     *
     * The `AgentPoolUpgradeSettings` block supports the following:
    
     * `drainTimeoutInMinutes` - (Optional) The amount of time (in minutes) to wait on eviction of pods and graceful termination per node. This eviction wait time honors waiting on pod disruption budgets. If this time is exceeded, the upgrade fails. If not specified, the default is 30 minutes. Defaults to `integer`.
     * `maxSurge` - (Optional) This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 1. For more information, including best practices, see: https://docs.microsoft.com/azure/aks/upgrade-cluster#customize-node-surge-upgrade Defaults to `string`.
     * `nodeSoakDurationInMinutes` - (Optional) The amount of time (in minutes) to wait after draining a node and before reimaging it and moving on to next node. If not specified, the default is 0 minutes. Defaults to `integer`.
     *
     * ---
     *
     * The `PowerState` block supports the following:
    
     * `code` - (Optional) Tells whether the cluster is Running or Stopped Defaults to `string`.
     *
     * ---
     *
     * The `AgentPoolNetworkProfile` block supports the following:
    
     * `allowedHostPorts` - (Optional) The port ranges that are allowed to access. The specified ranges are allowed to overlap. Defaults to `PortRange[]`.
     * `applicationSecurityGroups` - (Optional) The IDs of the application security groups which agent pool will associate when created. Defaults to `string[]`.
     * `nodePublicIPTags` - (Optional) IPTags of instance-level public IPs. Defaults to `IpTag[]`.
     *
     * ---
     *
     * The `IPTag[]` block supports the following:
    
     * `ipTagType` - (Optional) The IP tag type. Example: RoutingPreference. Defaults to `string`.
     * `tag` - (Optional) The value of the IP tag associated with the public IP. Example: Internet. Defaults to `string`.
     *
     * ---
     *
     * The `PortRange[]` block supports the following:
    
     * `portEnd` - (Optional) The maximum port that is included in the range. It should be ranged from 1 to 65535, and be greater than or equal to portStart. Defaults to `integer`.
     * `portStart` - (Optional) The minimum port that is included in the range. It should be ranged from 1 to 65535, and be less than or equal to portEnd. Defaults to `integer`.
     * `protocol` - (Optional) The network protocol of the port. Defaults to `string`.
     *
     * ---
     *
     * The `LinuxOSConfig` block supports the following:
    
     * `swapFileSizeMB` - (Optional) The size in MB of a swap file that will be created on each node. Defaults to `integer`.
     * `sysctls` - (Optional) Sysctl settings for Linux agent nodes. Defaults to `SysctlConfig`.
     * `transparentHugePageDefrag` - (Optional) Valid values are 'always', 'defer', 'defer+madvise', 'madvise' and 'never'. The default is 'madvise'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). Defaults to `string`.
     * `transparentHugePageEnabled` - (Optional) Valid values are 'always', 'madvise', and 'never'. The default is 'always'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). Defaults to `string`.
     *
     * ---
     *
     * The `SysctlConfig` block supports the following:
    
     * `fsAioMaxNr` - (Optional) Sysctl setting fs.aio-max-nr. Defaults to `integer`.
     * `fsFileMax` - (Optional) Sysctl setting fs.file-max. Defaults to `integer`.
     * `fsInotifyMaxUserWatches` - (Optional) Sysctl setting fs.inotify.max_user_watches. Defaults to `integer`.
     * `fsNrOpen` - (Optional) Sysctl setting fs.nr_open. Defaults to `integer`.
     * `kernelThreadsMax` - (Optional) Sysctl setting kernel.threads-max. Defaults to `integer`.
     * `netCoreNetdevMaxBacklog` - (Optional) Sysctl setting net.core.netdev_max_backlog. Defaults to `integer`.
     * `netCoreOptmemMax` - (Optional) Sysctl setting net.core.optmem_max. Defaults to `integer`.
     * `netCoreRmemDefault` - (Optional) Sysctl setting net.core.rmem_default. Defaults to `integer`.
     * `netCoreRmemMax` - (Optional) Sysctl setting net.core.rmem_max. Defaults to `integer`.
     * `netCoreSomaxconn` - (Optional) Sysctl setting net.core.somaxconn. Defaults to `integer`.
     * `netCoreWmemDefault` - (Optional) Sysctl setting net.core.wmem_default. Defaults to `integer`.
     * `netCoreWmemMax` - (Optional) Sysctl setting net.core.wmem_max. Defaults to `integer`.
     * `netIpv4IpLocalPortRange` - (Optional) Sysctl setting net.ipv4.ip_local_port_range. Defaults to `string`.
     * `netIpv4NeighDefaultGcThresh1` - (Optional) Sysctl setting net.ipv4.neigh.default.gc_thresh1. Defaults to `integer`.
     * `netIpv4NeighDefaultGcThresh2` - (Optional) Sysctl setting net.ipv4.neigh.default.gc_thresh2. Defaults to `integer`.
     * `netIpv4NeighDefaultGcThresh3` - (Optional) Sysctl setting net.ipv4.neigh.default.gc_thresh3. Defaults to `integer`.
     * `netIpv4TcpFinTimeout` - (Optional) Sysctl setting net.ipv4.tcp_fin_timeout. Defaults to `integer`.
     * `netIpv4TcpKeepaliveProbes` - (Optional) Sysctl setting net.ipv4.tcp_keepalive_probes. Defaults to `integer`.
     * `netIpv4TcpKeepaliveTime` - (Optional) Sysctl setting net.ipv4.tcp_keepalive_time. Defaults to `integer`.
     * `netIpv4TcpMaxSynBacklog` - (Optional) Sysctl setting net.ipv4.tcp_max_syn_backlog. Defaults to `integer`.
     * `netIpv4TcpMaxTwBuckets` - (Optional) Sysctl setting net.ipv4.tcp_max_tw_buckets. Defaults to `integer`.
     * `netIpv4TcpTwReuse` - (Optional) Sysctl setting net.ipv4.tcp_tw_reuse. Defaults to `boolean`.
     * `netIpv4TcpkeepaliveIntvl` - (Optional) Sysctl setting net.ipv4.tcp_keepalive_intvl. Defaults to `integer`.
     * `netNetfilterNfConntrackBuckets` - (Optional) Sysctl setting net.netfilter.nf_conntrack_buckets. Defaults to `integer`.
     * `netNetfilterNfConntrackMax` - (Optional) Sysctl setting net.netfilter.nf_conntrack_max. Defaults to `integer`.
     * `vmMaxMapCount` - (Optional) Sysctl setting vm.max_map_count. Defaults to `integer`.
     * `vmSwappiness` - (Optional) Sysctl setting vm.swappiness. Defaults to `integer`.
     * `vmVfsCachePressure` - (Optional) Sysctl setting vm.vfs_cache_pressure. Defaults to `integer`.
     *
     * ---
     *
     * The `KubeletConfig` block supports the following:
    
     * `allowedUnsafeSysctls` - (Optional) Allowed list of unsafe sysctls or unsafe sysctl patterns (ending in `*`). Defaults to `string[]`.
     * `containerLogMaxFiles` - (Optional) The maximum number of container log files that can be present for a container. The number must be ≥ 2. Defaults to `integer`.
     * `containerLogMaxSizeMB` - (Optional) The maximum size (e.g. 10Mi) of container log file before it is rotated. Defaults to `integer`.
     * `cpuCfsQuota` - (Optional) The default is true. Defaults to `boolean`.
     * `cpuCfsQuotaPeriod` - (Optional) The default is '100ms.' Valid values are a sequence of decimal numbers with an optional fraction and a unit suffix. For example: '300ms', '2h45m'. Supported units are 'ns', 'us', 'ms', 's', 'm', and 'h'. Defaults to `string`.
     * `cpuManagerPolicy` - (Optional) The default is 'none'. See [Kubernetes CPU management policies](https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/#cpu-management-policies) for more information. Allowed values are 'none' and 'static'. Defaults to `string`.
     * `failSwapOn` - (Optional) If set to true it will make the Kubelet fail to start if swap is enabled on the node. Defaults to `boolean`.
     * `imageGcHighThreshold` - (Optional) To disable image garbage collection, set to 100. The default is 85% Defaults to `integer`.
     * `imageGcLowThreshold` - (Optional) This cannot be set higher than imageGcHighThreshold. The default is 80% Defaults to `integer`.
     * `podMaxPids` - (Optional) The maximum number of processes per pod. Defaults to `integer`.
     * `topologyManagerPolicy` - (Optional) For more information see [Kubernetes Topology Manager](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager). The default is 'none'. Allowed values are 'none', 'best-effort', 'restricted', and 'single-numa-node'. Defaults to `string`.
     *
     * ---
     *
     * The `CreationData` block supports the following:
    
     * `sourceResourceId` - (Optional) This is the ARM ID of the source object to be used to create the target object. Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterAddonProfile` block supports the following:
    
     * `config` - (Optional) Key-value pairs for configuring an add-on. Defaults to `object`.
     * `enabled` - (Required) Whether the add-on is enabled or not. Defaults to `boolean`.
     *
     * ---
     *
     * The `ManagedClusterAADProfile` block supports the following:
    
     * `adminGroupObjectIDs` - (Optional) The list of AAD group object IDs that will have admin role of the cluster. Defaults to `string[]`.
     * `clientAppID` - (Optional) (DEPRECATED) The client AAD application ID. Learn more at https://aka.ms/aks/aad-legacy. Defaults to `string`.
     * `enableAzureRBAC` - (Optional) Whether to enable Azure RBAC for Kubernetes authorization. Defaults to `boolean`.
     * `managed` - (Optional) Whether to enable managed AAD. Defaults to `boolean`.
     * `serverAppID` - (Optional) (DEPRECATED) The server AAD application ID. Learn more at https://aka.ms/aks/aad-legacy. Defaults to `string`.
     * `serverAppSecret` - (Optional) (DEPRECATED) The server AAD application secret. Learn more at https://aka.ms/aks/aad-legacy. Defaults to `string`.
     * `tenantID` - (Optional) The AAD tenant ID to use for authentication. If not specified, will use the tenant of the deployment subscription. Defaults to `string`.
     *
     * ---
     *
     * The `ExtendedLocation` block supports the following:
    
     * `name` - (Optional) The name of the extended location. Defaults to `string`.
     * `type` - (Optional) The type of the extended location. Defaults to `string`.
     *
    */
    constructor(scope: Construct, id: string, props: ManagedClustersProps) {
        super(scope, id, props);
    }
    protected getResourceType(): string {
        return "Microsoft.ContainerService/managedClusters@2024-02-01";
    }
    protected getResourceBody(props: ManagedClustersProps) {
        return {
        extendedLocation: props.extendedLocation,
        properties: props.properties,
        sku: props.sku,
      };
    }
    public addManagedClustersAgentPools(props: ManagedClustersAgentPoolsProps): ManagedClustersAgentPools {
        return new ManagedClustersAgentPools(this, props.name, {
            name: props.name,
            parentId: this.id,
            properties: props.properties
        });
    }
    public addManagedClustersMaintenanceConfigurations(props: ManagedClustersMaintenanceConfigurationsProps): ManagedClustersMaintenanceConfigurations {
        return new ManagedClustersMaintenanceConfigurations(this, props.name, {
            name: props.name,
            parentId: this.id,
            properties: props.properties
        });
    }
    public addManagedClustersTrustedAccessRoleBindings(props: ManagedClustersTrustedAccessRoleBindingsProps): ManagedClustersTrustedAccessRoleBindings {
        return new ManagedClustersTrustedAccessRoleBindings(this, props.name, {
            name: props.name,
            parentId: this.id,
            properties: props.properties
        });
    }
    public addManagedClustersPrivateEndpointConnections(props: ManagedClustersPrivateEndpointConnectionsProps): ManagedClustersPrivateEndpointConnections {
        return new ManagedClustersPrivateEndpointConnections(this, props.name, {
            name: props.name,
            parentId: this.id,
            properties: props.properties
        });
    }
}
    import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ManagedClustersAgentPoolsProps extends IAzAPIBaseProps {
  /**
   * Properties of an agent pool.
   */
  properties?: ManagedClusterAgentPoolProfileProperties;
}

export interface ManagedClusterAgentPoolProfileProperties {
  /**
   * The list of Availability zones to use for nodes. This can only be specified if the AgentPoolType property is 'VirtualMachineScaleSets'.
   */
  availabilityZones?: string[];
  /**
   * AKS will associate the specified agent pool with the Capacity Reservation Group.
   */
  capacityReservationGroupID?: string;
  /**
   * Number of agents (VMs) to host docker containers. Allowed values must be in the range of 0 to 1000 (inclusive) for user pools and in the range of 1 to 1000 (inclusive) for system pools. The default value is 1.
   */
  count?: number;
  /**
   * CreationData to be used to specify the source Snapshot ID if the node pool will be created/upgraded using a snapshot.
   */
  creationData?: CreationData;
  /**
   * Whether to enable auto-scaler
   */
  enableAutoScaling?: boolean;
  /**
   * This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption
   */
  enableEncryptionAtHost?: boolean;
  /**
   * See [Add a FIPS-enabled node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#add-a-fips-enabled-node-pool-preview) for more details.
   */
  enableFIPS?: boolean;
  /**
   * Some scenarios may require nodes in a node pool to receive their own dedicated public IP addresses. A common scenario is for gaming workloads, where a console needs to make a direct connection to a cloud virtual machine to minimize hops. For more information see [assigning a public IP per node](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#assign-a-public-ip-per-node-for-your-node-pools). The default is false.
   */
  enableNodePublicIP?: boolean;
  /**
   * Whether to enable UltraSSD
   */
  enableUltraSSD?: boolean;
  /**
   * GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU.
   */
  gpuInstanceProfile?: string;
  /**
   * This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}. For more information see [Azure dedicated hosts](https://docs.microsoft.com/azure/virtual-machines/dedicated-hosts).
   */
  hostGroupID?: string;
  /**
   * The Kubelet configuration on the agent pool nodes.
   */
  kubeletConfig?: KubeletConfig;
  /**
   * Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage.
   */
  kubeletDiskType?: string;
  /**
   * The OS configuration of Linux agent nodes.
   */
  linuxOSConfig?: LinuxOsConfig;
  /**
   * The maximum number of nodes for auto-scaling
   */
  maxCount?: number;
  /**
   * The maximum number of pods that can run on a node.
   */
  maxPods?: number;
  /**
   * The minimum number of nodes for auto-scaling
   */
  minCount?: number;
  /**
   * A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools
   */
  mode?: string;
  /**
   * Network-related settings of an agent pool.
   */
  networkProfile?: AgentPoolNetworkProfile;
  /**
   * The node labels to be persisted across all nodes in agent pool.
   */
  nodeLabels?: object | string | boolean | number;
  /**
   * This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName}
   */
  nodePublicIPPrefixID?: string;
  /**
   * The taints added to new nodes during node pool create and scale. For example, key=value:NoSchedule.
   */
  nodeTaints?: string[];
  /**
   * Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. As a best practice, you should upgrade all node pools in an AKS cluster to the same Kubernetes version. The node pool version must have the same major version as the control plane. The node pool minor version must be within two minor versions of the control plane version. The node pool version cannot be greater than the control plane version. For more information see [upgrading a node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#upgrade-a-node-pool).
   */
  orchestratorVersion?: string;
  /**
   * OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified.
   */
  osDiskSizeGB?: number;
  /**
   * The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os).
   */
  osDiskType?: string;
  /**
   * Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows.
   */
  osSKU?: string;
  /**
   * The operating system type. The default is Linux.
   */
  osType?: string;
  /**
   * If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}
   */
  podSubnetID?: string;
  /**
   * When an Agent Pool is first created it is initially Running. The Agent Pool can be stopped by setting this field to Stopped. A stopped Agent Pool stops all of its VMs and does not accrue billing charges. An Agent Pool can only be stopped if it is Running and provisioning state is Succeeded
   */
  powerState?: PowerState;
  /**
   * The ID for Proximity Placement Group.
   */
  proximityPlacementGroupID?: string;
  /**
   * This also effects the cluster autoscaler behavior. If not specified, it defaults to Delete.
   */
  scaleDownMode?: string;
  /**
   * This cannot be specified unless the scaleSetPriority is 'Spot'. If not specified, the default is 'Delete'.
   */
  scaleSetEvictionPolicy?: string;
  /**
   * The Virtual Machine Scale Set priority. If not specified, the default is 'Regular'.
   */
  scaleSetPriority?: string;
  /**
   * Possible values are any decimal value greater than zero or -1 which indicates the willingness to pay any on-demand price. For more details on spot pricing, see [spot VMs pricing](https://docs.microsoft.com/azure/virtual-machines/spot-vms#pricing)
   */
  spotMaxPrice?: number;
  /**
   * The tags to be persisted on the agent pool virtual machine scale set.
   */
  tags?: object | string | boolean | number;
  /**
   * The type of Agent Pool.
   */
  type?: string;
  /**
   * Settings for upgrading the agentpool
   */
  upgradeSettings?: AgentPoolUpgradeSettings;
  /**
   * VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions
   */
  vmSize?: string;
  /**
   * If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}
   */
  vnetSubnetID?: string;
  /**
   * The Windows agent pool's specific profile.
   */
  windowsProfile?: AgentPoolWindowsProfile;
  /**
   * Determines the type of workload a node can run.
   */
  workloadRuntime?: string;
}

export interface AgentPoolWindowsProfile {
  /**
   * The default value is false. Outbound NAT can only be disabled if the cluster outboundType is NAT Gateway and the Windows agent pool does not have node public IP enabled.
   */
  disableOutboundNat?: boolean;
}

export interface AgentPoolUpgradeSettings {
  /**
   * The amount of time (in minutes) to wait on eviction of pods and graceful termination per node. This eviction wait time honors waiting on pod disruption budgets. If this time is exceeded, the upgrade fails. If not specified, the default is 30 minutes.
   */
  drainTimeoutInMinutes?: number;
  /**
   * This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 1. For more information, including best practices, see: https://docs.microsoft.com/azure/aks/upgrade-cluster#customize-node-surge-upgrade
   */
  maxSurge?: string;
  /**
   * The amount of time (in minutes) to wait after draining a node and before reimaging it and moving on to next node. If not specified, the default is 0 minutes.
   */
  nodeSoakDurationInMinutes?: number;
}

export interface PowerState {
  /**
   * Tells whether the cluster is Running or Stopped
   */
  code?: string;
}

export interface AgentPoolNetworkProfile {
  /**
   * The port ranges that are allowed to access. The specified ranges are allowed to overlap.
   */
  allowedHostPorts?: PortRange[];
  /**
   * The IDs of the application security groups which agent pool will associate when created.
   */
  applicationSecurityGroups?: string[];
  /**
   * IPTags of instance-level public IPs.
   */
  nodePublicIPTags?: IpTag[];
}

export interface IpTag {
  /**
   * The IP tag type. Example: RoutingPreference.
   */
  ipTagType?: string;
  /**
   * The value of the IP tag associated with the public IP. Example: Internet.
   */
  tag?: string;
}

export interface PortRange {
  /**
   * The maximum port that is included in the range. It should be ranged from 1 to 65535, and be greater than or equal to portStart.
   */
  portEnd?: number;
  /**
   * The minimum port that is included in the range. It should be ranged from 1 to 65535, and be less than or equal to portEnd.
   */
  portStart?: number;
  /**
   * The network protocol of the port.
   */
  protocol?: string;
}

export interface LinuxOsConfig {
  /**
   * The size in MB of a swap file that will be created on each node.
   */
  swapFileSizeMB?: number;
  /**
   * Sysctl settings for Linux agent nodes.
   */
  sysctls?: SysctlConfig;
  /**
   * Valid values are 'always', 'defer', 'defer+madvise', 'madvise' and 'never'. The default is 'madvise'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge).
   */
  transparentHugePageDefrag?: string;
  /**
   * Valid values are 'always', 'madvise', and 'never'. The default is 'always'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge).
   */
  transparentHugePageEnabled?: string;
}

export interface SysctlConfig {
  /**
   * Sysctl setting fs.aio-max-nr.
   */
  fsAioMaxNr?: number;
  /**
   * Sysctl setting fs.file-max.
   */
  fsFileMax?: number;
  /**
   * Sysctl setting fs.inotify.max_user_watches.
   */
  fsInotifyMaxUserWatches?: number;
  /**
   * Sysctl setting fs.nr_open.
   */
  fsNrOpen?: number;
  /**
   * Sysctl setting kernel.threads-max.
   */
  kernelThreadsMax?: number;
  /**
   * Sysctl setting net.core.netdev_max_backlog.
   */
  netCoreNetdevMaxBacklog?: number;
  /**
   * Sysctl setting net.core.optmem_max.
   */
  netCoreOptmemMax?: number;
  /**
   * Sysctl setting net.core.rmem_default.
   */
  netCoreRmemDefault?: number;
  /**
   * Sysctl setting net.core.rmem_max.
   */
  netCoreRmemMax?: number;
  /**
   * Sysctl setting net.core.somaxconn.
   */
  netCoreSomaxconn?: number;
  /**
   * Sysctl setting net.core.wmem_default.
   */
  netCoreWmemDefault?: number;
  /**
   * Sysctl setting net.core.wmem_max.
   */
  netCoreWmemMax?: number;
  /**
   * Sysctl setting net.ipv4.ip_local_port_range.
   */
  netIpv4IpLocalPortRange?: string;
  /**
   * Sysctl setting net.ipv4.neigh.default.gc_thresh1.
   */
  netIpv4NeighDefaultGcThresh1?: number;
  /**
   * Sysctl setting net.ipv4.neigh.default.gc_thresh2.
   */
  netIpv4NeighDefaultGcThresh2?: number;
  /**
   * Sysctl setting net.ipv4.neigh.default.gc_thresh3.
   */
  netIpv4NeighDefaultGcThresh3?: number;
  /**
   * Sysctl setting net.ipv4.tcp_fin_timeout.
   */
  netIpv4TcpFinTimeout?: number;
  /**
   * Sysctl setting net.ipv4.tcp_keepalive_probes.
   */
  netIpv4TcpKeepaliveProbes?: number;
  /**
   * Sysctl setting net.ipv4.tcp_keepalive_time.
   */
  netIpv4TcpKeepaliveTime?: number;
  /**
   * Sysctl setting net.ipv4.tcp_max_syn_backlog.
   */
  netIpv4TcpMaxSynBacklog?: number;
  /**
   * Sysctl setting net.ipv4.tcp_max_tw_buckets.
   */
  netIpv4TcpMaxTwBuckets?: number;
  /**
   * Sysctl setting net.ipv4.tcp_tw_reuse.
   */
  netIpv4TcpTwReuse?: boolean;
  /**
   * Sysctl setting net.ipv4.tcp_keepalive_intvl.
   */
  netIpv4TcpkeepaliveIntvl?: number;
  /**
   * Sysctl setting net.netfilter.nf_conntrack_buckets.
   */
  netNetfilterNfConntrackBuckets?: number;
  /**
   * Sysctl setting net.netfilter.nf_conntrack_max.
   */
  netNetfilterNfConntrackMax?: number;
  /**
   * Sysctl setting vm.max_map_count.
   */
  vmMaxMapCount?: number;
  /**
   * Sysctl setting vm.swappiness.
   */
  vmSwappiness?: number;
  /**
   * Sysctl setting vm.vfs_cache_pressure.
   */
  vmVfsCachePressure?: number;
}

export interface KubeletConfig {
  /**
   * Allowed list of unsafe sysctls or unsafe sysctl patterns (ending in `*`).
   */
  allowedUnsafeSysctls?: string[];
  /**
   * The maximum number of container log files that can be present for a container. The number must be ≥ 2.
   */
  containerLogMaxFiles?: number;
  /**
   * The maximum size (e.g. 10Mi) of container log file before it is rotated.
   */
  containerLogMaxSizeMB?: number;
  /**
   * The default is true.
   */
  cpuCfsQuota?: boolean;
  /**
   * The default is '100ms.' Valid values are a sequence of decimal numbers with an optional fraction and a unit suffix. For example: '300ms', '2h45m'. Supported units are 'ns', 'us', 'ms', 's', 'm', and 'h'.
   */
  cpuCfsQuotaPeriod?: string;
  /**
   * The default is 'none'. See [Kubernetes CPU management policies](https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/#cpu-management-policies) for more information. Allowed values are 'none' and 'static'.
   */
  cpuManagerPolicy?: string;
  /**
   * If set to true it will make the Kubelet fail to start if swap is enabled on the node.
   */
  failSwapOn?: boolean;
  /**
   * To disable image garbage collection, set to 100. The default is 85%
   */
  imageGcHighThreshold?: number;
  /**
   * This cannot be set higher than imageGcHighThreshold. The default is 80%
   */
  imageGcLowThreshold?: number;
  /**
   * The maximum number of processes per pod.
   */
  podMaxPids?: number;
  /**
   * For more information see [Kubernetes Topology Manager](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager). The default is 'none'. Allowed values are 'none', 'best-effort', 'restricted', and 'single-numa-node'.
   */
  topologyManagerPolicy?: string;
}

export interface CreationData {
  /**
   * This is the ARM ID of the source object to be used to create the target object.
   */
  sourceResourceId?: string;
}

export class ManagedClustersAgentPools extends AzAPIBase {
  /**
       * Constructs a new ManagedClustersAgentPools.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/managedClusters/agentPools@2024-02-01. The properties include:
     * `properties` - (Required) Properties of an agent pool. Defaults to `ManagedClusterAgentPoolProfileProperties`.
     *
     * ---
     *
     * The `ManagedClusterAgentPoolProfileProperties` block supports the following:

     * `availabilityZones` - (Optional) The list of Availability zones to use for nodes. This can only be specified if the AgentPoolType property is 'VirtualMachineScaleSets'. Defaults to `string[]`.
     * `capacityReservationGroupID` - (Optional) AKS will associate the specified agent pool with the Capacity Reservation Group. Defaults to `string`.
     * `count` - (Optional) Number of agents (VMs) to host docker containers. Allowed values must be in the range of 0 to 1000 (inclusive) for user pools and in the range of 1 to 1000 (inclusive) for system pools. The default value is 1. Defaults to `integer`.
     * `creationData` - (Optional) CreationData to be used to specify the source Snapshot ID if the node pool will be created/upgraded using a snapshot. Defaults to `CreationData`.
     * `enableAutoScaling` - (Optional) Whether to enable auto-scaler Defaults to `boolean`.
     * `enableEncryptionAtHost` - (Optional) This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption Defaults to `boolean`.
     * `enableFIPS` - (Optional) See [Add a FIPS-enabled node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#add-a-fips-enabled-node-pool-preview) for more details. Defaults to `boolean`.
     * `enableNodePublicIP` - (Optional) Some scenarios may require nodes in a node pool to receive their own dedicated public IP addresses. A common scenario is for gaming workloads, where a console needs to make a direct connection to a cloud virtual machine to minimize hops. For more information see [assigning a public IP per node](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#assign-a-public-ip-per-node-for-your-node-pools). The default is false. Defaults to `boolean`.
     * `enableUltraSSD` - (Optional) Whether to enable UltraSSD Defaults to `boolean`.
     * `gpuInstanceProfile` - (Optional) GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. Defaults to `string`.
     * `hostGroupID` - (Optional) This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}. For more information see [Azure dedicated hosts](https://docs.microsoft.com/azure/virtual-machines/dedicated-hosts). Defaults to `string`.
     * `kubeletConfig` - (Optional) The Kubelet configuration on the agent pool nodes. Defaults to `KubeletConfig`.
     * `kubeletDiskType` - (Optional) Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage. Defaults to `string`.
     * `linuxOSConfig` - (Optional) The OS configuration of Linux agent nodes. Defaults to `LinuxOsConfig`.
     * `maxCount` - (Optional) The maximum number of nodes for auto-scaling Defaults to `integer`.
     * `maxPods` - (Optional) The maximum number of pods that can run on a node. Defaults to `integer`.
     * `minCount` - (Optional) The minimum number of nodes for auto-scaling Defaults to `integer`.
     * `mode` - (Optional) A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools Defaults to `string`.
     * `networkProfile` - (Optional) Network-related settings of an agent pool. Defaults to `AgentPoolNetworkProfile`.
     * `nodeLabels` - (Optional) The node labels to be persisted across all nodes in agent pool. Defaults to `object`.
     * `nodePublicIPPrefixID` - (Optional) This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName} Defaults to `string`.
     * `nodeTaints` - (Optional) The taints added to new nodes during node pool create and scale. For example, key=value:NoSchedule. Defaults to `string[]`.
     * `orchestratorVersion` - (Optional) Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. As a best practice, you should upgrade all node pools in an AKS cluster to the same Kubernetes version. The node pool version must have the same major version as the control plane. The node pool minor version must be within two minor versions of the control plane version. The node pool version cannot be greater than the control plane version. For more information see [upgrading a node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#upgrade-a-node-pool). Defaults to `string`.
     * `osDiskSizeGB` - (Optional) OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified. Defaults to `integer`.
     * `osDiskType` - (Optional) The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os). Defaults to `string`.
     * `osSKU` - (Optional) Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows. Defaults to `string`.
     * `osType` - (Optional) The operating system type. The default is Linux. Defaults to `string`.
     * `podSubnetID` - (Optional) If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} Defaults to `string`.
     * `powerState` - (Optional) When an Agent Pool is first created it is initially Running. The Agent Pool can be stopped by setting this field to Stopped. A stopped Agent Pool stops all of its VMs and does not accrue billing charges. An Agent Pool can only be stopped if it is Running and provisioning state is Succeeded Defaults to `PowerState`.
     * `proximityPlacementGroupID` - (Optional) The ID for Proximity Placement Group. Defaults to `string`.
     * `scaleDownMode` - (Optional) This also effects the cluster autoscaler behavior. If not specified, it defaults to Delete. Defaults to `string`.
     * `scaleSetEvictionPolicy` - (Optional) This cannot be specified unless the scaleSetPriority is 'Spot'. If not specified, the default is 'Delete'. Defaults to `string`.
     * `scaleSetPriority` - (Optional) The Virtual Machine Scale Set priority. If not specified, the default is 'Regular'. Defaults to `string`.
     * `spotMaxPrice` - (Optional) Possible values are any decimal value greater than zero or -1 which indicates the willingness to pay any on-demand price. For more details on spot pricing, see [spot VMs pricing](https://docs.microsoft.com/azure/virtual-machines/spot-vms#pricing) Defaults to `number`.
     * `tags` - (Optional) The tags to be persisted on the agent pool virtual machine scale set. Defaults to `object`.
     * `type` - (Optional) The type of Agent Pool. Defaults to `string`.
     * `upgradeSettings` - (Optional) Settings for upgrading the agentpool Defaults to `AgentPoolUpgradeSettings`.
     * `vmSize` - (Optional) VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions Defaults to `string`.
     * `vnetSubnetID` - (Optional) If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} Defaults to `string`.
     * `windowsProfile` - (Optional) The Windows agent pool's specific profile. Defaults to `AgentPoolWindowsProfile`.
     * `workloadRuntime` - (Optional) Determines the type of workload a node can run. Defaults to `string`.
     *
     * ---
     *
     * The `AgentPoolWindowsProfile` block supports the following:

     * `disableOutboundNat` - (Optional) The default value is false. Outbound NAT can only be disabled if the cluster outboundType is NAT Gateway and the Windows agent pool does not have node public IP enabled. Defaults to `boolean`.
     *
     * ---
     *
     * The `AgentPoolUpgradeSettings` block supports the following:

     * `drainTimeoutInMinutes` - (Optional) The amount of time (in minutes) to wait on eviction of pods and graceful termination per node. This eviction wait time honors waiting on pod disruption budgets. If this time is exceeded, the upgrade fails. If not specified, the default is 30 minutes. Defaults to `integer`.
     * `maxSurge` - (Optional) This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 1. For more information, including best practices, see: https://docs.microsoft.com/azure/aks/upgrade-cluster#customize-node-surge-upgrade Defaults to `string`.
     * `nodeSoakDurationInMinutes` - (Optional) The amount of time (in minutes) to wait after draining a node and before reimaging it and moving on to next node. If not specified, the default is 0 minutes. Defaults to `integer`.
     *
     * ---
     *
     * The `PowerState` block supports the following:

     * `code` - (Optional) Tells whether the cluster is Running or Stopped Defaults to `string`.
     *
     * ---
     *
     * The `AgentPoolNetworkProfile` block supports the following:

     * `allowedHostPorts` - (Optional) The port ranges that are allowed to access. The specified ranges are allowed to overlap. Defaults to `PortRange[]`.
     * `applicationSecurityGroups` - (Optional) The IDs of the application security groups which agent pool will associate when created. Defaults to `string[]`.
     * `nodePublicIPTags` - (Optional) IPTags of instance-level public IPs. Defaults to `IpTag[]`.
     *
     * ---
     *
     * The `IPTag[]` block supports the following:

     * `ipTagType` - (Optional) The IP tag type. Example: RoutingPreference. Defaults to `string`.
     * `tag` - (Optional) The value of the IP tag associated with the public IP. Example: Internet. Defaults to `string`.
     *
     * ---
     *
     * The `PortRange[]` block supports the following:

     * `portEnd` - (Optional) The maximum port that is included in the range. It should be ranged from 1 to 65535, and be greater than or equal to portStart. Defaults to `integer`.
     * `portStart` - (Optional) The minimum port that is included in the range. It should be ranged from 1 to 65535, and be less than or equal to portEnd. Defaults to `integer`.
     * `protocol` - (Optional) The network protocol of the port. Defaults to `string`.
     *
     * ---
     *
     * The `LinuxOSConfig` block supports the following:

     * `swapFileSizeMB` - (Optional) The size in MB of a swap file that will be created on each node. Defaults to `integer`.
     * `sysctls` - (Optional) Sysctl settings for Linux agent nodes. Defaults to `SysctlConfig`.
     * `transparentHugePageDefrag` - (Optional) Valid values are 'always', 'defer', 'defer+madvise', 'madvise' and 'never'. The default is 'madvise'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). Defaults to `string`.
     * `transparentHugePageEnabled` - (Optional) Valid values are 'always', 'madvise', and 'never'. The default is 'always'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). Defaults to `string`.
     *
     * ---
     *
     * The `SysctlConfig` block supports the following:

     * `fsAioMaxNr` - (Optional) Sysctl setting fs.aio-max-nr. Defaults to `integer`.
     * `fsFileMax` - (Optional) Sysctl setting fs.file-max. Defaults to `integer`.
     * `fsInotifyMaxUserWatches` - (Optional) Sysctl setting fs.inotify.max_user_watches. Defaults to `integer`.
     * `fsNrOpen` - (Optional) Sysctl setting fs.nr_open. Defaults to `integer`.
     * `kernelThreadsMax` - (Optional) Sysctl setting kernel.threads-max. Defaults to `integer`.
     * `netCoreNetdevMaxBacklog` - (Optional) Sysctl setting net.core.netdev_max_backlog. Defaults to `integer`.
     * `netCoreOptmemMax` - (Optional) Sysctl setting net.core.optmem_max. Defaults to `integer`.
     * `netCoreRmemDefault` - (Optional) Sysctl setting net.core.rmem_default. Defaults to `integer`.
     * `netCoreRmemMax` - (Optional) Sysctl setting net.core.rmem_max. Defaults to `integer`.
     * `netCoreSomaxconn` - (Optional) Sysctl setting net.core.somaxconn. Defaults to `integer`.
     * `netCoreWmemDefault` - (Optional) Sysctl setting net.core.wmem_default. Defaults to `integer`.
     * `netCoreWmemMax` - (Optional) Sysctl setting net.core.wmem_max. Defaults to `integer`.
     * `netIpv4IpLocalPortRange` - (Optional) Sysctl setting net.ipv4.ip_local_port_range. Defaults to `string`.
     * `netIpv4NeighDefaultGcThresh1` - (Optional) Sysctl setting net.ipv4.neigh.default.gc_thresh1. Defaults to `integer`.
     * `netIpv4NeighDefaultGcThresh2` - (Optional) Sysctl setting net.ipv4.neigh.default.gc_thresh2. Defaults to `integer`.
     * `netIpv4NeighDefaultGcThresh3` - (Optional) Sysctl setting net.ipv4.neigh.default.gc_thresh3. Defaults to `integer`.
     * `netIpv4TcpFinTimeout` - (Optional) Sysctl setting net.ipv4.tcp_fin_timeout. Defaults to `integer`.
     * `netIpv4TcpKeepaliveProbes` - (Optional) Sysctl setting net.ipv4.tcp_keepalive_probes. Defaults to `integer`.
     * `netIpv4TcpKeepaliveTime` - (Optional) Sysctl setting net.ipv4.tcp_keepalive_time. Defaults to `integer`.
     * `netIpv4TcpMaxSynBacklog` - (Optional) Sysctl setting net.ipv4.tcp_max_syn_backlog. Defaults to `integer`.
     * `netIpv4TcpMaxTwBuckets` - (Optional) Sysctl setting net.ipv4.tcp_max_tw_buckets. Defaults to `integer`.
     * `netIpv4TcpTwReuse` - (Optional) Sysctl setting net.ipv4.tcp_tw_reuse. Defaults to `boolean`.
     * `netIpv4TcpkeepaliveIntvl` - (Optional) Sysctl setting net.ipv4.tcp_keepalive_intvl. Defaults to `integer`.
     * `netNetfilterNfConntrackBuckets` - (Optional) Sysctl setting net.netfilter.nf_conntrack_buckets. Defaults to `integer`.
     * `netNetfilterNfConntrackMax` - (Optional) Sysctl setting net.netfilter.nf_conntrack_max. Defaults to `integer`.
     * `vmMaxMapCount` - (Optional) Sysctl setting vm.max_map_count. Defaults to `integer`.
     * `vmSwappiness` - (Optional) Sysctl setting vm.swappiness. Defaults to `integer`.
     * `vmVfsCachePressure` - (Optional) Sysctl setting vm.vfs_cache_pressure. Defaults to `integer`.
     *
     * ---
     *
     * The `KubeletConfig` block supports the following:

     * `allowedUnsafeSysctls` - (Optional) Allowed list of unsafe sysctls or unsafe sysctl patterns (ending in `*`). Defaults to `string[]`.
     * `containerLogMaxFiles` - (Optional) The maximum number of container log files that can be present for a container. The number must be ≥ 2. Defaults to `integer`.
     * `containerLogMaxSizeMB` - (Optional) The maximum size (e.g. 10Mi) of container log file before it is rotated. Defaults to `integer`.
     * `cpuCfsQuota` - (Optional) The default is true. Defaults to `boolean`.
     * `cpuCfsQuotaPeriod` - (Optional) The default is '100ms.' Valid values are a sequence of decimal numbers with an optional fraction and a unit suffix. For example: '300ms', '2h45m'. Supported units are 'ns', 'us', 'ms', 's', 'm', and 'h'. Defaults to `string`.
     * `cpuManagerPolicy` - (Optional) The default is 'none'. See [Kubernetes CPU management policies](https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/#cpu-management-policies) for more information. Allowed values are 'none' and 'static'. Defaults to `string`.
     * `failSwapOn` - (Optional) If set to true it will make the Kubelet fail to start if swap is enabled on the node. Defaults to `boolean`.
     * `imageGcHighThreshold` - (Optional) To disable image garbage collection, set to 100. The default is 85% Defaults to `integer`.
     * `imageGcLowThreshold` - (Optional) This cannot be set higher than imageGcHighThreshold. The default is 80% Defaults to `integer`.
     * `podMaxPids` - (Optional) The maximum number of processes per pod. Defaults to `integer`.
     * `topologyManagerPolicy` - (Optional) For more information see [Kubernetes Topology Manager](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager). The default is 'none'. Allowed values are 'none', 'best-effort', 'restricted', and 'single-numa-node'. Defaults to `string`.
     *
     * ---
     *
     * The `CreationData` block supports the following:

     * `sourceResourceId` - (Optional) This is the ARM ID of the source object to be used to create the target object. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ManagedClustersAgentPoolsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/managedClusters/agentPools@2024-02-01";
  }
  protected getResourceBody(props: ManagedClustersAgentPoolsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ManagedClustersLoadBalancersProps extends IAzAPIBaseProps {
  /**
   * The properties of the load balancer.
   */
  properties: LoadBalancerProperties;
}

export interface LoadBalancerProperties {
  /**
   * Whether to automatically place services on the load balancer. If not supplied, the default value is true. If set to false manually, both of the external and the internal load balancer will not be selected for services unless they explicitly target it.
   */
  allowServicePlacement?: boolean;
  /**
   * Name of the public load balancer. There will be an internal load balancer created if needed, and the name will be `<name>-internal`. The internal lb shares the same configurations as the external one. The internal lbs are not needed to be included in LoadBalancer list. There must be a name of kubernetes in the list.
   */
  name: string;
  /**
   * Nodes that match this selector will be possible members of this load balancer.
   */
  nodeSelector?: LabelSelector;
  /**
   * Required field. A string value that must specify the ID of an existing agent pool. All nodes in the given pool will always be added to this load balancer. This agent pool must have at least one node and minCount>=1 for autoscaling operations. An agent pool can only be the primary pool for a single load balancer.
   */
  primaryAgentPoolName: string;
  /**
   * Only services that must match this selector can be placed on this load balancer.
   */
  serviceLabelSelector?: LabelSelector;
  /**
   * Services created in namespaces that match the selector can be placed on this load balancer.
   */
  serviceNamespaceSelector?: LabelSelector;
}

export interface LabelSelector {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   */
  matchExpressions?: LabelSelectorRequirement[];
  /**
   * matchLabels is an array of {key=value} pairs. A single {key=value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is `key`, the operator is `In`, and the values array contains only `value`. The requirements are ANDed.
   */
  matchLabels?: string[];
}

export interface LabelSelectorRequirement {
  /**
   * key is the label key that the selector applies to.
   */
  key?: string;
  /**
   * operator represents a key's relationship to a set of values. Valid operators are In and NotIn
   */
  operator?: string;
  /**
   * values is an array of string values, the values array must be non-empty.
   */
  values?: string[];
}

export interface LabelSelector {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   */
  matchExpressions?: LabelSelectorRequirement[];
  /**
   * matchLabels is an array of {key=value} pairs. A single {key=value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is `key`, the operator is `In`, and the values array contains only `value`. The requirements are ANDed.
   */
  matchLabels?: string[];
}

export interface LabelSelector {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   */
  matchExpressions?: LabelSelectorRequirement[];
  /**
   * matchLabels is an array of {key=value} pairs. A single {key=value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is `key`, the operator is `In`, and the values array contains only `value`. The requirements are ANDed.
   */
  matchLabels?: string[];
}

export class ManagedClustersLoadBalancers extends AzAPIBase {
  /**
       * Constructs a new ManagedClustersLoadBalancers.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/managedClusters/loadBalancers@2024-03-02-preview. The properties include:
     * `properties` - (Required) The properties of the load balancer. Defaults to `LoadBalancerProperties`.
     *
     * ---
     *
     * The `LoadBalancerProperties` block supports the following:

     * `allowServicePlacement` - (Optional) Whether to automatically place services on the load balancer. If not supplied, the default value is true. If set to false manually, both of the external and the internal load balancer will not be selected for services unless they explicitly target it. Defaults to `boolean`.
     * `name` - (Required) Name of the public load balancer. There will be an internal load balancer created if needed, and the name will be `<name>-internal`. The internal lb shares the same configurations as the external one. The internal lbs are not needed to be included in LoadBalancer list. There must be a name of kubernetes in the list. Defaults to `string`.
     * `nodeSelector` - (Optional) Nodes that match this selector will be possible members of this load balancer. Defaults to `LabelSelector`.
     * `primaryAgentPoolName` - (Required) Required field. A string value that must specify the ID of an existing agent pool. All nodes in the given pool will always be added to this load balancer. This agent pool must have at least one node and minCount>=1 for autoscaling operations. An agent pool can only be the primary pool for a single load balancer. Defaults to `string`.
     * `serviceLabelSelector` - (Optional) Only services that must match this selector can be placed on this load balancer. Defaults to `LabelSelector`.
     * `serviceNamespaceSelector` - (Optional) Services created in namespaces that match the selector can be placed on this load balancer. Defaults to `LabelSelector`.
     *
     * ---
     *
     * The `LabelSelector` block supports the following:

     * `matchExpressions` - (Optional) matchExpressions is a list of label selector requirements. The requirements are ANDed. Defaults to `LabelSelectorRequirement[]`.
     * `matchLabels` - (Optional) matchLabels is an array of {key=value} pairs. A single {key=value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is `key`, the operator is `In`, and the values array contains only `value`. The requirements are ANDed. Defaults to `string[]`.
     *
     * ---
     *
     * The `LabelSelectorRequirement[]` block supports the following:

     * `key` - (Optional) key is the label key that the selector applies to. Defaults to `string`.
     * `operator` - (Optional) operator represents a key's relationship to a set of values. Valid operators are In and NotIn Defaults to `string`.
     * `values` - (Optional) values is an array of string values, the values array must be non-empty. Defaults to `string[]`.
     *
     * ---
     *
     * The `LabelSelector` block supports the following:

     * `matchExpressions` - (Optional) matchExpressions is a list of label selector requirements. The requirements are ANDed. Defaults to `LabelSelectorRequirement[]`.
     * `matchLabels` - (Optional) matchLabels is an array of {key=value} pairs. A single {key=value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is `key`, the operator is `In`, and the values array contains only `value`. The requirements are ANDed. Defaults to `string[]`.
     *
     * ---
     *
     * The `LabelSelector` block supports the following:

     * `matchExpressions` - (Optional) matchExpressions is a list of label selector requirements. The requirements are ANDed. Defaults to `LabelSelectorRequirement[]`.
     * `matchLabels` - (Optional) matchLabels is an array of {key=value} pairs. A single {key=value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is `key`, the operator is `In`, and the values array contains only `value`. The requirements are ANDed. Defaults to `string[]`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ManagedClustersLoadBalancersProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/managedClusters/loadBalancers@2024-03-02-preview";
  }
  protected getResourceBody(props: ManagedClustersLoadBalancersProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ManagedClustersMaintenanceConfigurationsProps
  extends IAzAPIBaseProps {
  /**
   * Properties of a default maintenance configuration.
   */
  properties?: MaintenanceConfigurationProperties;
}

export interface MaintenanceConfigurationProperties {
  /**
   * Maintenance window for the maintenance configuration.
   */
  maintenanceWindow?: MaintenanceWindow;
  /**
   * Time slots on which upgrade is not allowed.
   */
  notAllowedTime?: TimeSpan[];
  /**
   * If two array entries specify the same day of the week, the applied configuration is the union of times in both entries.
   */
  timeInWeek?: TimeInWeek[];
}

export interface TimeInWeek {
  /**
   * The day of the week.
   */
  day?: string;
  /**
   * Each integer hour represents a time range beginning at 0m after the hour ending at the next hour (non-inclusive). 0 corresponds to 00:00 UTC, 23 corresponds to 23:00 UTC. Specifying [0, 1] means the 00:00 - 02:00 UTC time range.
   */
  hourSlots?: number[];
}

export interface TimeSpan {
  /**
   * The end of a time span
   */
  end?: string;
  /**
   * The start of a time span
   */
  start?: string;
}

export interface MaintenanceWindow {
  /**
   * Length of maintenance window range from 4 to 24 hours.
   */
  durationHours: number;
  /**
   * Date ranges on which upgrade is not allowed. 'utcOffset' applies to this field. For example, with 'utcOffset: +02:00' and 'dateSpan' being '2022-12-23' to '2023-01-03', maintenance will be blocked from '2022-12-22 22:00' to '2023-01-03 22:00' in UTC time.
   */
  notAllowedDates?: DateSpan[];
  /**
   * Recurrence schedule for the maintenance window.
   */
  schedule?: Schedule;
  /**
   * The date the maintenance window activates. If the current date is before this date, the maintenance window is inactive and will not be used for upgrades. If not specified, the maintenance window will be active right away.
   */
  startDate?: string;
  /**
   * The start time of the maintenance window. Accepted values are from '00:00' to '23:59'. 'utcOffset' applies to this field. For example: '02:00' with 'utcOffset: +02:00' means UTC time '00:00'.
   */
  startTime: string;
  /**
   * The UTC offset in format +/-HH:mm. For example, '+05:30' for IST and '-07:00' for PST. If not specified, the default is '+00:00'.
   */
  utcOffset?: string;
}

export interface Schedule {
  /**
   * For schedules like: 'recur every month on the 15th' or 'recur every 3 months on the 20th'.
   */
  absoluteMonthly?: AbsoluteMonthlySchedule;
  /**
   * For schedules like: 'recur every day' or 'recur every 3 days'.
   */
  daily?: DailySchedule;
  /**
   * For schedules like: 'recur every month on the first Monday' or 'recur every 3 months on last Friday'.
   */
  relativeMonthly?: RelativeMonthlySchedule;
  /**
   * For schedules like: 'recur every Monday' or 'recur every 3 weeks on Wednesday'.
   */
  weekly?: WeeklySchedule;
}

export interface WeeklySchedule {
  /**
   * Specifies on which day of the week the maintenance occurs.
   */
  dayOfWeek: string;
  /**
   * Specifies the number of weeks between each set of occurrences.
   */
  intervalWeeks: number;
}

export interface RelativeMonthlySchedule {
  /**
   * Specifies on which day of the week the maintenance occurs.
   */
  dayOfWeek: string;
  /**
   * Specifies the number of months between each set of occurrences.
   */
  intervalMonths: number;
  /**
   * Specifies on which week of the month the dayOfWeek applies.
   */
  weekIndex: string;
}

export interface DailySchedule {
  /**
   * Specifies the number of days between each set of occurrences.
   */
  intervalDays: number;
}

export interface AbsoluteMonthlySchedule {
  /**
   * The date of the month.
   */
  dayOfMonth: number;
  /**
   * Specifies the number of months between each set of occurrences.
   */
  intervalMonths: number;
}

export interface DateSpan {
  /**
   * The end date of the date span.
   */
  end: string;
  /**
   * The start date of the date span.
   */
  start: string;
}

export class ManagedClustersMaintenanceConfigurations extends AzAPIBase {
  /**
       * Constructs a new ManagedClustersMaintenanceConfigurations.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/managedClusters/maintenanceConfigurations@2024-02-01. The properties include:
     * `properties` - (Required) Properties of a default maintenance configuration. Defaults to `MaintenanceConfigurationProperties`.
     *
     * ---
     *
     * The `MaintenanceConfigurationProperties` block supports the following:

     * `maintenanceWindow` - (Optional) Maintenance window for the maintenance configuration. Defaults to `MaintenanceWindow`.
     * `notAllowedTime` - (Optional) Time slots on which upgrade is not allowed. Defaults to `TimeSpan[]`.
     * `timeInWeek` - (Optional) If two array entries specify the same day of the week, the applied configuration is the union of times in both entries. Defaults to `TimeInWeek[]`.
     *
     * ---
     *
     * The `TimeInWeek[]` block supports the following:

     * `day` - (Optional) The day of the week. Defaults to `string`.
     * `hourSlots` - (Optional) Each integer hour represents a time range beginning at 0m after the hour ending at the next hour (non-inclusive). 0 corresponds to 00:00 UTC, 23 corresponds to 23:00 UTC. Specifying [0, 1] means the 00:00 - 02:00 UTC time range. Defaults to `integer[]`.
     *
     * ---
     *
     * The `TimeSpan[]` block supports the following:

     * `end` - (Optional) The end of a time span Defaults to `string`.
     * `start` - (Optional) The start of a time span Defaults to `string`.
     *
     * ---
     *
     * The `MaintenanceWindow` block supports the following:

     * `durationHours` - (Required) Length of maintenance window range from 4 to 24 hours. Defaults to `integer`.
     * `notAllowedDates` - (Optional) Date ranges on which upgrade is not allowed. 'utcOffset' applies to this field. For example, with 'utcOffset: +02:00' and 'dateSpan' being '2022-12-23' to '2023-01-03', maintenance will be blocked from '2022-12-22 22:00' to '2023-01-03 22:00' in UTC time. Defaults to `DateSpan[]`.
     * `schedule` - (Required) Recurrence schedule for the maintenance window. Defaults to `Schedule`.
     * `startDate` - (Optional) The date the maintenance window activates. If the current date is before this date, the maintenance window is inactive and will not be used for upgrades. If not specified, the maintenance window will be active right away. Defaults to `string`.
     * `startTime` - (Required) The start time of the maintenance window. Accepted values are from '00:00' to '23:59'. 'utcOffset' applies to this field. For example: '02:00' with 'utcOffset: +02:00' means UTC time '00:00'. Defaults to `string`.
     * `utcOffset` - (Optional) The UTC offset in format +/-HH:mm. For example, '+05:30' for IST and '-07:00' for PST. If not specified, the default is '+00:00'. Defaults to `string`.
     *
     * ---
     *
     * The `Schedule` block supports the following:

     * `absoluteMonthly` - (Optional) For schedules like: 'recur every month on the 15th' or 'recur every 3 months on the 20th'. Defaults to `AbsoluteMonthlySchedule`.
     * `daily` - (Optional) For schedules like: 'recur every day' or 'recur every 3 days'. Defaults to `DailySchedule`.
     * `relativeMonthly` - (Optional) For schedules like: 'recur every month on the first Monday' or 'recur every 3 months on last Friday'. Defaults to `RelativeMonthlySchedule`.
     * `weekly` - (Optional) For schedules like: 'recur every Monday' or 'recur every 3 weeks on Wednesday'. Defaults to `WeeklySchedule`.
     *
     * ---
     *
     * The `WeeklySchedule` block supports the following:

     * `dayOfWeek` - (Required) Specifies on which day of the week the maintenance occurs. Defaults to `string`.
     * `intervalWeeks` - (Required) Specifies the number of weeks between each set of occurrences. Defaults to `integer`.
     *
     * ---
     *
     * The `RelativeMonthlySchedule` block supports the following:

     * `dayOfWeek` - (Required) Specifies on which day of the week the maintenance occurs. Defaults to `string`.
     * `intervalMonths` - (Required) Specifies the number of months between each set of occurrences. Defaults to `integer`.
     * `weekIndex` - (Required) Specifies on which week of the month the dayOfWeek applies. Defaults to `string`.
     *
     * ---
     *
     * The `DailySchedule` block supports the following:

     * `intervalDays` - (Required) Specifies the number of days between each set of occurrences. Defaults to `integer`.
     *
     * ---
     *
     * The `AbsoluteMonthlySchedule` block supports the following:

     * `dayOfMonth` - (Required) The date of the month. Defaults to `integer`.
     * `intervalMonths` - (Required) Specifies the number of months between each set of occurrences. Defaults to `integer`.
     *
     * ---
     *
     * The `DateSpan[]` block supports the following:

     * `end` - (Required) The end date of the date span. Defaults to `string`.
     * `start` - (Required) The start date of the date span. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ManagedClustersMaintenanceConfigurationsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/managedClusters/maintenanceConfigurations@2024-02-01";
  }
  protected getResourceBody(
    props: ManagedClustersMaintenanceConfigurationsProps,
  ) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ManagedclustersnapshotsProps extends IAzAPIBaseProps {
  /**
   * Properties of a managed cluster snapshot.
   */
  properties?: ManagedClusterSnapshotProperties;
}

export interface ManagedClusterSnapshotProperties {
  /**
   * CreationData to be used to specify the source resource ID to create this snapshot.
   */
  creationData?: CreationData;
  /**
   * The type of a snapshot. The default is NodePool.
   */
  snapshotType?: string;
}

export interface CreationData {
  /**
   * This is the ARM ID of the source object to be used to create the target object.
   */
  sourceResourceId?: string;
}

export class Managedclustersnapshots extends AzAPIBase {
  /**
       * Constructs a new Managedclustersnapshots.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/managedclustersnapshots@2024-03-02-preview. The properties include:
     * `properties` - (Required) Properties of a managed cluster snapshot. Defaults to `ManagedClusterSnapshotProperties`.
     *
     * ---
     *
     * The `ManagedClusterSnapshotProperties` block supports the following:

     * `creationData` - (Optional) CreationData to be used to specify the source resource ID to create this snapshot. Defaults to `CreationData`.
     * `snapshotType` - (Optional) The type of a snapshot. The default is NodePool. Defaults to `string`.
     *
     * ---
     *
     * The `CreationData` block supports the following:

     * `sourceResourceId` - (Optional) This is the ARM ID of the source object to be used to create the target object. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ManagedclustersnapshotsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/managedclustersnapshots@2024-03-02-preview";
  }
  protected getResourceBody(props: ManagedclustersnapshotsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ManagedClustersPrivateEndpointConnectionsProps
  extends IAzAPIBaseProps {
  /**
   * The properties of a private endpoint connection.
   */
  properties: PrivateEndpointConnectionProperties;
}

export interface PrivateEndpointConnectionProperties {
  /**
   * The resource of private endpoint.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export interface PrivateLinkServiceConnectionState {
  /**
   * The private link service connection description.
   */
  description?: string;
  /**
   * The private link service connection status.
   */
  status?: string;
}

export interface PrivateEndpoint {
  /**
   * The resource ID of the private endpoint
   */
  id?: string;
}

export class ManagedClustersPrivateEndpointConnections extends AzAPIBase {
  /**
       * Constructs a new ManagedClustersPrivateEndpointConnections.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/managedClusters/privateEndpointConnections@2024-02-01. The properties include:
     * `properties` - (Required) The properties of a private endpoint connection. Defaults to `PrivateEndpointConnectionProperties`.
     *
     * ---
     *
     * The `PrivateEndpointConnectionProperties` block supports the following:

     * `privateEndpoint` - (Optional) The resource of private endpoint. Defaults to `PrivateEndpoint`.
     * `privateLinkServiceConnectionState` - (Required) A collection of information about the state of the connection between service consumer and provider. Defaults to `PrivateLinkServiceConnectionState`.
     *
     * ---
     *
     * The `PrivateLinkServiceConnectionState` block supports the following:

     * `description` - (Optional) The private link service connection description. Defaults to `string`.
     * `status` - (Optional) The private link service connection status. Defaults to `string`.
     *
     * ---
     *
     * The `PrivateEndpoint` block supports the following:

     * `id` - (Optional) The resource ID of the private endpoint Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ManagedClustersPrivateEndpointConnectionsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/managedClusters/privateEndpointConnections@2024-02-01";
  }
  protected getResourceBody(
    props: ManagedClustersPrivateEndpointConnectionsProps,
  ) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface ManagedClustersTrustedAccessRoleBindingsProps
  extends IAzAPIBaseProps {
  /**
   * Properties for trusted access role binding
   */
  properties: TrustedAccessRoleBindingProperties;
}

export interface TrustedAccessRoleBindingProperties {
  /**
   * A list of roles to bind, each item is a resource type qualified role name. For example: 'Microsoft.MachineLearningServices/workspaces/reader'.
   */
  roles: string[];
  /**
   * The ARM resource ID of source resource that trusted access is configured for.
   */
  sourceResourceId: string;
}

export class ManagedClustersTrustedAccessRoleBindings extends AzAPIBase {
  /**
       * Constructs a new ManagedClustersTrustedAccessRoleBindings.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/managedClusters/trustedAccessRoleBindings@2024-02-01. The properties include:
     * `properties` - (Required) Properties for trusted access role binding Defaults to `TrustedAccessRoleBindingProperties`.
     *
     * ---
     *
     * The `TrustedAccessRoleBindingProperties` block supports the following:

     * `roles` - (Required) A list of roles to bind, each item is a resource type qualified role name. For example: 'Microsoft.MachineLearningServices/workspaces/reader'. Defaults to `string[]`.
     * `sourceResourceId` - (Required) The ARM resource ID of source resource that trusted access is configured for. Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: ManagedClustersTrustedAccessRoleBindingsProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/managedClusters/trustedAccessRoleBindings@2024-02-01";
  }
  protected getResourceBody(
    props: ManagedClustersTrustedAccessRoleBindingsProps,
  ) {
    return {
      properties: props.properties,
    };
  }
}
