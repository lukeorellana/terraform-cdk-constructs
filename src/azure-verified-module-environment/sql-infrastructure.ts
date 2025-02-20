import { PrivateDnsZone } from "@cdktf/provider-azurerm/lib/private-dns-zone";
import { PrivateDnsZoneVirtualNetworkLink } from "@cdktf/provider-azurerm/lib/private-dns-zone-virtual-network-link";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { Password } from "@cdktf/provider-random/lib/password";
import { RandomProvider } from "@cdktf/provider-random/lib/provider";
import { Construct } from "constructs";
import { Sql } from "../../.gen/modules/sql";
import { Virtualnetwork } from "../../.gen/modules/virtualnetwork";

export class SQLInfrastructure extends Construct {
  public readonly Sql: Sql;

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

    this.Sql = new Sql(this, "sqlServer", {
      name: `sql-${name}`,
      resourceGroupName: resourceGroup.name,
      location: location,
      enableTelemetry: false,
      administratorLogin: "mysqladmin",
      administratorLoginPassword: randomPassword.result,
      serverVersion: "12.0",
      publicNetworkAccessEnabled: true,

      firewallRules: {
        single_ip: {
          start_ip_address: "40.112.8.12",
          end_ip_address: "40.112.8.12",
        },
        ip_range: {
          start_ip_address: "40.112.0.0",
          end_ip_address: "40.112.255.255",
        },
        access_azure: {
          // OPtional Alllow access from Azure services
          start_ip_address: "0.0.0.0",
          end_ip_address: "0.0.0.0",
        },
      },

      privateEndpoints: {
        primary: {
          private_dns_zone_resource_ids: [dns.id],
          subnet_resource_id: virtualNetwork.getString(
            "subnets.pep.resource_id",
          ),
        },
      },

      databases: {
        mySampleDb: {
          name: "my_sample_db",
          createMode: "Default",
          collation: "SQL_Latin1_General_CP1_CI_AS",
          licenseType: "LicenseIncluded",
          maxSizeGb: 50,
          skuName: "S0",

          shortTermRetentionPolicy: {
            retentionDays: 1,
            backupIntervalInHours: 24,
          },

          longTermRetentionPolicy: {
            weeklyRetention: "P2W1D",
            monthlyRetention: "P2M",
            yearlyRetention: "P1Y",
            weekOfYear: 1,
          },
          tags: {
            environment: "sample",
            costCentre: "demo",
          },
        },
      },

      tags: {
        environment: "sample",
        costCentre: "demo",
      },
    });
  }
}
