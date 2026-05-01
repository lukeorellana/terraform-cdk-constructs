/**
 * Maps Azure resource types to their REST API spec paths on GitHub.
 *
 * The Azure REST API specs live at:
 *   https://github.com/Azure/azure-rest-api-specs/tree/main/specification/<service>/resource-manager/<Provider>/stable/<version>/
 *
 * This module provides the mapping from resource type strings (e.g. "Microsoft.Network/virtualNetworks")
 * to the spec directory path template with a {version} placeholder.
 */

/**
 * Explicit mapping from Azure resource type to the spec directory path.
 * The path is relative to the azure-rest-api-specs repo root.
 * Use {version} as placeholder for the API version string.
 */
const SPEC_PATH_MAP: Record<string, string> = {
  // Resources
  "Microsoft.Resources/resourceGroups":
    "specification/resources/resource-manager/Microsoft.Resources/stable/{version}",

  // Network
  "Microsoft.Network/virtualNetworks":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/virtualNetworks/subnets":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/publicIPAddresses":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkInterfaces":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkSecurityGroups":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkManagers":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkManagers/ipamPools":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkManagers/ipamPools/staticCidrs":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkManagers/connectivityConfigurations":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkManagers/securityAdminConfigurations":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkManagers/networkGroups":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkManagers/networkGroups/staticMembers":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/networkWatchers":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/A":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/AAAA":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/CAA":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/CNAME":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/MX":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/NS":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/PTR":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/SOA":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/SRV":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsZones/TXT":
    "specification/dns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones/A":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones/AAAA":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones/CNAME":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones/MX":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones/PTR":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones/SOA":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones/SRV":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/privateDnsZones/TXT":
    "specification/privatedns/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/dnsResolvers":
    "specification/dnsresolver/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/connections":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",
  "Microsoft.Network/virtualNetworkGateways":
    "specification/network/resource-manager/Microsoft.Network/stable/{version}",

  // Compute
  "Microsoft.Compute/virtualMachines":
    "specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/{version}",
  "Microsoft.Compute/virtualMachineScaleSets":
    "specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/{version}",

  // Storage
  "Microsoft.Storage/storageAccounts":
    "specification/storage/resource-manager/Microsoft.Storage/stable/{version}",

  // Containers
  "Microsoft.ContainerService/managedClusters":
    "specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/{version}",
  "Microsoft.App/containerApps":
    "specification/app/resource-manager/Microsoft.App/stable/{version}",
  "Microsoft.App/managedEnvironments":
    "specification/app/resource-manager/Microsoft.App/stable/{version}",

  // Authorization
  "Microsoft.Authorization/roleAssignments":
    "specification/authorization/resource-manager/Microsoft.Authorization/stable/{version}",
  "Microsoft.Authorization/roleDefinitions":
    "specification/authorization/resource-manager/Microsoft.Authorization/stable/{version}",
  "Microsoft.Authorization/policyDefinitions":
    "specification/resources/resource-manager/Microsoft.Authorization/stable/{version}",
  "Microsoft.Authorization/policyAssignments":
    "specification/resources/resource-manager/Microsoft.Authorization/stable/{version}",
  "Microsoft.Authorization/policySetDefinitions":
    "specification/resources/resource-manager/Microsoft.Authorization/stable/{version}",

  // Monitoring / Insights
  "Microsoft.Insights/activityLogAlerts":
    "specification/monitor/resource-manager/Microsoft.Insights/stable/{version}",
  "Microsoft.Insights/metricAlerts":
    "specification/monitor/resource-manager/Microsoft.Insights/stable/{version}",
  "Microsoft.Insights/actionGroups":
    "specification/monitor/resource-manager/Microsoft.Insights/stable/{version}",
  "Microsoft.Insights/diagnosticSettings":
    "specification/monitor/resource-manager/Microsoft.Insights/stable/{version}",

  // Log Analytics
  "Microsoft.OperationalInsights/workspaces":
    "specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/stable/{version}",
};

/**
 * Build the GitHub tree URL for a given resource type and version.
 */
function getSpecTreeUrl(resourceType: string, version: string): string {
  const basePath = SPEC_PATH_MAP[resourceType];
  if (basePath) {
    const path = basePath.replace("{version}", version);
    return `https://github.com/Azure/azure-rest-api-specs/tree/main/${path}`;
  }
  // Fallback: construct from resource type convention
  return buildFallbackSpecUrl(resourceType, version);
}

/**
 * Convention-based fallback for unmapped resource types.
 * Microsoft.Foo/bars -> specification/foo/resource-manager/Microsoft.Foo/stable/{version}
 */
function buildFallbackSpecUrl(resourceType: string, version: string): string {
  const namespace = resourceType.split("/")[0]; // Microsoft.Foo
  const service = namespace.replace("Microsoft.", "").toLowerCase(); // foo
  const path = `specification/${service}/resource-manager/${namespace}/stable/${version}`;
  return `https://github.com/Azure/azure-rest-api-specs/tree/main/${path}`;
}

module.exports = { SPEC_PATH_MAP, getSpecTreeUrl };
