import { KustoCluster } from "@cdktf/provider-azurerm/lib/kusto-cluster";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { Virtualnetwork } from "../../.gen/modules/virtualnetwork";
import "cdktf/lib/testing/adapters/jest";
import { Construct } from "constructs";
import { PrivateDnsZone } from "@cdktf/provider-azurerm/lib/private-dns-zone";
import { PrivateEndpoint } from "@cdktf/provider-azurerm/lib/private-endpoint";

export class AdxInfrastructure extends Construct {
  public readonly kustoCluster: KustoCluster;

  constructor(
    scope: Construct,
    id: string,
    name: string,
    location: string,
    resourceGroup: ResourceGroup,
    virtualNetwork: Virtualnetwork,
  ) {
    super(scope, id);

    const adxpvdns = new PrivateDnsZone(this, "adxzone", {
      name: "privatelink.azurecr.io",
      resourceGroupName: resourceGroup.name,
    });

    this.kustoCluster = new KustoCluster(this, "adx", {
      name: `adx${name}`,
      location: location,
      resourceGroupName: resourceGroup.name,
      allowedFqdns: [],
      allowedIpRanges: [],
      autoStopEnabled: true,
      diskEncryptionEnabled: true,
      doubleEncryptionEnabled: false,
      outboundNetworkAccessRestricted: false,
      publicIpType: "IPv4",
      publicNetworkAccessEnabled: false,
      purgeEnabled: false,
      streamingIngestionEnabled: true,
      trustedExternalTenants: [],
      zones: ["1", "2", "3"],
      sku: {
        name: "Dev(No SLA)_Standard_D11_v2",
        capacity: 1,
      },
      identity: {
        type: "SystemAssigned",
        identityIds: [],
      },
    });

    new PrivateEndpoint(this, "adx-private-endpoint", {
      name: `adx-pe-${name}`,
      location: location,
      resourceGroupName: resourceGroup.name,
      subnetId: virtualNetwork.getString("subnets.default.resource_id"),
      privateServiceConnection: {
        name: `adx-psc-${name}`,
        privateConnectionResourceId: this.kustoCluster.id,
        isManualConnection: false,
        subresourceNames: ["cluster"],
      },
      privateDnsZoneGroup: {
        name: "default",
        privateDnsZoneIds: [adxpvdns.id],
      },
    });
  }
}
