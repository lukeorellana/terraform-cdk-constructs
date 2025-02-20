import { ApplicationLoadBalancer } from "@cdktf/provider-azurerm/lib/application-load-balancer";
import { ApplicationLoadBalancerFrontend } from "@cdktf/provider-azurerm/lib/application-load-balancer-frontend";
import { ApplicationLoadBalancerSubnetAssociation } from "@cdktf/provider-azurerm/lib/application-load-balancer-subnet-association";
import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { PrivateDnsZone } from "@cdktf/provider-azurerm/lib/private-dns-zone";
import { PrivateDnsZoneVirtualNetworkLink } from "@cdktf/provider-azurerm/lib/private-dns-zone-virtual-network-link";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { RoleAssignment } from "@cdktf/provider-azurerm/lib/role-assignment";
import { UserAssignedIdentity } from "@cdktf/provider-azurerm/lib/user-assigned-identity";
import { Construct } from "constructs";
import { Aks } from "../../.gen/modules/aks";
import { Virtualnetwork } from "../../.gen/modules/virtualnetwork";

export class AksInfrastructure extends Construct {
  public readonly aksCluster: Aks;

  constructor(
    scope: Construct,
    id: string,
    name: string,
    location: string,
    resourceGroup: ResourceGroup,
    virtualNetwork: Virtualnetwork,
  ) {
    super(scope, id);

    // Private DNS Zone
    const privateDnsZone = new PrivateDnsZone(this, "privateDnsZone", {
      name: `privatelink.${location}.azmk8s.io`,
      resourceGroupName: resourceGroup.name,
    });

    const clientConfigAKS = new DataAzurermClientConfig(
      this,
      "CurrentClientConfigAKS",
      {},
    );

    const msi = new UserAssignedIdentity(this, "aksMsi", {
      name: `aks-${name}-msi`,
      location: location,
      resourceGroupName: resourceGroup.name,
    });

    new RoleAssignment(this, "privateDnsZoneContributor", {
      principalId: msi.principalId, // Assign identity's principal ID
      scope: privateDnsZone.id, // Scope it to the Private DNS Zone
      roleDefinitionName: "Private DNS Zone Contributor", // Role name
    });

    new PrivateDnsZoneVirtualNetworkLink(this, "privateDnsZoneVnetLink", {
      name: `privatelink-${location}-azmk8s-io`,
      privateDnsZoneName: privateDnsZone.name,
      resourceGroupName: resourceGroup.name,
      virtualNetworkId: virtualNetwork.getString("resource_id"),
    });

    // Deploy Private AKS Cluster
    this.aksCluster = new Aks(this, "privateAks", {
      name: `aks-${name}`,
      resourceGroupName: resourceGroup.name,
      location: location,
      skuTier: "Standard",
      privateClusterEnabled: true,
      privateDnsZoneId: privateDnsZone.id,
      dnsPrefixPrivateCluster: `aks${name}`,

      azureActiveDirectoryRoleBasedAccessControl: {
        azure_rbac_enabled: true,
        tenant_id: clientConfigAKS.tenantId,
      },

      // AKS Identity
      identity: {
        type: "UserAssigned",
        identity_ids: [msi.id],
      },

      // Networking
      networkProfile: {
        network_plugin: "azure",
        network_data_plane: "azure",
        network_plugin_mode: "overlay",
      },

      // Default Node Pool
      defaultNodePool: {
        name: "default",
        vm_size: "Standard_DS2_v2",
        zones: ["3"],
        auto_scaling_enabled: true,
        max_count: 3,
        max_pods: 30,
        min_count: 1,
        vnet_subnet_id: virtualNetwork.getString("subnets.default.resource_id"),
        only_critical_addons_enabled: true,
        upgrade_settings: {
          max_surge: "10%",
        },
      },

      // Additional Node Pools
      nodePools: {
        userpool1: {
          name: "userpool1",
          vm_size: "Standard_DS2_v2",
          zones: ["3"],
          auto_scaling_enabled: true,
          max_count: 3,
          max_pods: 30,
          min_count: 1,
          os_disk_size_gb: 128,
          vnet_subnet_id: virtualNetwork.getString(
            "subnets.default.resource_id",
          ),
          only_critical_addons_enabled: true,
          upgrade_settings: {
            max_surge: "10%",
          },
        },
      },
    });

    const alb = new ApplicationLoadBalancer(
      this,
      "aksApplicationLoadBalancer",
      {
        name: `aks-${name}-alb`,
        location: location,
        resourceGroupName: resourceGroup.name,
      },
    );

    new ApplicationLoadBalancerFrontend(
      this,
      "aksApplicationLoadBalancerFrontend",
      {
        name: `aks-${name}-alb-frontend`,
        applicationLoadBalancerId: alb.id,
      },
    );

    new ApplicationLoadBalancerSubnetAssociation(
      this,
      "aksApplicationLoadBalancerSubnetAssociation",
      {
        name: `aks-${name}-alb-subnet-association`,
        applicationLoadBalancerId: alb.id,
        subnetId: virtualNetwork.getString("subnets.appgw.resource_id"),
      },
    );
  }
}
