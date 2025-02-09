import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { KustoCluster } from "../../.gen/modules/kusto-cluster";
import { Virtualnetwork } from "../../.gen/modules/virtualnetwork";
import "cdktf/lib/testing/adapters/jest";
import { Construct } from "constructs";
import { PrivateDnsZone } from "@cdktf/provider-azurerm/lib/private-dns-zone";

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
      enableTelemetry: false,
      allowedFqdns: [],
      allowedIpRanges: [],
      autoStopEnabled: true,
      diskEncryptionEnabled: true,
      doubleEncryptionEnabled: false,
      outboundNetworkAccessRestricted: false,
      languageExtensions: ["PYTHON"],
      publicIpType: "IPv4",
      publicNetworkAccessEnabled: false,
      purgeEnabled: false,
      streamingIngestionEnabled: true,
      trustedExternalTenants: [],
      zones: ["1", "2", "3"],
      lock: { kind: "None" },
      sku: {
        name: "Dev(No SLA)_Standard_D11_v2",
        capacity: 1,
      },

      // Databases
      databases: {
        crm: {
          name: "crm",
          hotCachePeriod: "P30D",
          softDeletePeriod: "P30D",
        },
      },

      // Managed Identities
      managedIdentities: {
        type: "SystemAssigned",
      },

      privateEndpoints: {
        primary: {
          private_dns_zone_resource_ids: [adxpvdns.id],
          subnet_resource_id: virtualNetwork.getString(
            "subnets.default.resource_id",
          ),
        },
      },
    });
  }
}
