import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { LogAnalyticsWorkspace } from "@cdktf/provider-azurerm/lib/log-analytics-workspace";
import { PrivateDnsZone } from "@cdktf/provider-azurerm/lib/private-dns-zone";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { Containerregistry } from "../../.gen/modules/containerregistry";
import { Keyvault } from "../../.gen/modules/keyvault";
import { Virtualnetwork } from "../../.gen/modules/virtualnetwork";
import "cdktf/lib/testing/adapters/jest";
import { Construct } from "constructs";

export class CoreInfrastructure extends Construct {
  public readonly resourceGroup: ResourceGroup;
  public readonly virtualnetwork: Virtualnetwork;
  public readonly keyVault: Keyvault;
  public readonly logAnalytics: LogAnalyticsWorkspace;
  public readonly acr: Containerregistry;

  constructor(scope: Construct, id: string, name: string, location: string) {
    super(scope, id);

    const clientConfig = new DataAzurermClientConfig(
      this,
      "CurrentClientConfig",
      {},
    );

    // Create a resource group
    const rg = new ResourceGroup(this, "rg", {
      name: `rg-${name}`,
      location: location,
    });

    const logAnalyticsWorkspace = new LogAnalyticsWorkspace(
      this,
      "log_analytics",
      {
        location: "eastus",
        name: `la-${name}`,
        resourceGroupName: rg.name,
      },
    );

    const vnet = new Virtualnetwork(this, "vnet", {
      name: `vnet-${name}`,
      resourceGroupName: rg.name,
      location: rg.location,
      enableTelemetry: false,
      addressSpace: ["10.100.0.0/16"],
      subnets: {
        default: {
          name: "default",
          address_prefix: "10.100.1.0/24",
        },
        appgw: {
          name: "appgw",
          address_prefix: "10.100.2.0/24",
        },
      },
    });

    const kvpvdns = new PrivateDnsZone(this, "azurerm_private_dns_zone", {
      name: "privatelink.vaultcore.azure.net",
      resourceGroupName: rg.name,
    });

    const kv = new Keyvault(this, "kv", {
      name: `kv-${name}`,
      resourceGroupName: rg.name,
      enableTelemetry: false,
      location: rg.location,

      tenantId: clientConfig.tenantId,
      publicNetworkAccessEnabled: false,
      privateEndpoints: {
        primary: {
          private_dns_zone_resource_ids: [kvpvdns.id],
          subnet_resource_id: vnet.getString("subnets.default.resource_id"),
        },
      },
      diagnosticSettings: {
        log: {
          workspace_resource_id: logAnalyticsWorkspace.id,
          retention_policy: {
            days: 30,
            enabled: true,
          },
        },
      },
    });

    const acrpvdns = new PrivateDnsZone(this, "acrzone", {
      name: "privatelink.azurecr.io",
      resourceGroupName: rg.name,
    });

    const acr = new Containerregistry(this, "acr", {
      name: `acr${name}`,
      resourceGroupName: rg.name,
      location: rg.location,
      publicNetworkAccessEnabled: false,
      adminEnabled: false,
      enableTelemetry: false,

      privateEndpoints: {
        primary: {
          private_dns_zone_resource_ids: [acrpvdns.id],
          subnet_resource_id: vnet.getString("subnets.default.resource_id"),
        },
      },
    });

    this.resourceGroup = rg;
    this.virtualnetwork = vnet;
    this.keyVault = kv;
    this.logAnalytics = logAnalyticsWorkspace;
    this.acr = acr;
  }
}
