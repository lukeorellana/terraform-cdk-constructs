import { PrivateDnsZone } from "@cdktf/provider-azurerm/lib/private-dns-zone";
import { PrivateDnsZoneVirtualNetworkLink } from "@cdktf/provider-azurerm/lib/private-dns-zone-virtual-network-link";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { Password } from "@cdktf/provider-random/lib/password";
import { RandomProvider } from "@cdktf/provider-random/lib/provider";
import { Construct } from "constructs";
import { Postgressql } from "../../.gen/modules/postgressql";
import { Virtualnetwork } from "../../.gen/modules/virtualnetwork";

export class PostgresSQLInfrastructure extends Construct {
  public readonly Postgressql: Postgressql;

  constructor(
    scope: Construct,
    id: string,
    name: string,
    location: string,
    resourceGroup: ResourceGroup,
    virtualNetwork: Virtualnetwork,
  ) {
    super(scope, id);

    new RandomProvider(this, "random", {});

    const randomPassword = new Password(this, "sqlAdminPassword", {
      length: 16,
      special: true,
      overrideSpecial: "!@#$%^&*()",
    });

    const dns = new PrivateDnsZone(this, "azurerm_private_dns_zone", {
      name: "privatelink.database.windows.net",
      resourceGroupName: resourceGroup.name,
    });

    new PrivateDnsZoneVirtualNetworkLink(
      this,
      "azurerm_private_dns_zone_virtual_network_link",
      {
        name: "sql-privatelink-dns",
        resourceGroupName: resourceGroup.name,
        privateDnsZoneName: dns.name,
        virtualNetworkId: virtualNetwork.resourceIdOutput,
      },
    );

    this.Postgressql = new Postgressql(this, "postgresqlServer", {
      name: `postgres-${name}`,
      resourceGroupName: resourceGroup.name,
      location: location,
      enableTelemetry: false,
      administratorLogin: "psqladmin",
      administratorPassword: randomPassword.result,
      serverVersion: "16",
      skuName: "GP_Standard_D2s_v3",
      publicNetworkAccessEnabled: true,

      highAvailability: {
        // Explicitly disable HA for Dev
        mode: "SameZone",
      },

      // firewallRules: {
      //   single_ip: {
      //     start_ip_address: "172.191.151.56",
      //     end_ip_address: "172.191.151.56",
      //     name: "single_ip",
      //   },
      //   ip_range: {
      //     start_ip_address: "40.112.0.0",
      //     end_ip_address: "40.112.255.255",
      //     name: "ip_range",
      //   },
      // },

      privateEndpoints: {
        primary: {
          private_dns_zone_resource_ids: [dns.id],
          subnet_resource_id: virtualNetwork.getString(
            "subnets.pep.resource_id",
          ),
        },
      },

      databases: {
        pgdb: {
          name: "pgdb",
          charset: "UTF8",
          collation: "en_US.utf8",
        },
      },
    });
  }
}
