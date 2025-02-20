import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { LogAnalyticsWorkspace } from "@cdktf/provider-azurerm/lib/log-analytics-workspace";
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
          delegation: [
            {
              name: "appgw_delegation",
              service_delegation: {
                name: "Microsoft.ServiceNetworking/trafficControllers",
                actions: ["Microsoft.Network/virtualNetworks/subnets/action"],
              },
            },
          ],
        },
        pep: {
          name: "pep",
          address_prefix: "10.100.3.0/24",
        },
      },
    });

    const kv = new Keyvault(this, "kv", {
      name: `kv-${name}`,
      resourceGroupName: rg.name,
      enableTelemetry: false,
      location: rg.location,

      tenantId: clientConfig.tenantId,
      publicNetworkAccessEnabled: true,
      networkAcls: {
        defaultAction: "Deny",
        bypass: "AzureServices",
        ipRules: [],
        virtualNetworkSubnets: [
          {
            id: vnet.getString("subnets.default.resource_id"),
          },
        ],
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

    const acr = new Containerregistry(this, "acr", {
      name: `acr${name}`,
      resourceGroupName: rg.name,
      location: rg.location,
      publicNetworkAccessEnabled: false,
      adminEnabled: false,
      enableTelemetry: false,
      networkRuleSet: {
        defaultAction: "Deny",
        ipRules: [],
        virtualNetworkRules: [
          {
            action: "Allow",
            id: vnet.getString("subnets.default.resource_id"),
          },
        ],
      },
    });

    this.resourceGroup = rg;
    this.virtualnetwork = vnet;
    this.keyVault = kv;
    this.logAnalytics = logAnalyticsWorkspace;
    this.acr = acr;
  }
}
