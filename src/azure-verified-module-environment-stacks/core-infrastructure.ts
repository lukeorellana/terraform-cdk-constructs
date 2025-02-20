import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { Construct } from "constructs";
import {
  Containerregistry,
  ContainerregistryConfig,
} from "../../.gen/modules/containerregistry";

import { Keyvault, KeyvaultConfig } from "../../.gen/modules/keyvault";
import {
  Virtualnetwork,
  VirtualnetworkConfig,
} from "../../.gen/modules/virtualnetwork";
import { BaseTestStack } from "../testing";

export class ResourceGroupStack extends BaseTestStack {
  public readonly resourceGroupInstance: ResourceGroup;
  constructor(
    scope: Construct,
    id: string,
    location: string,
    subscription: string,
  ) {
    super(scope, id);

    new AzurermProvider(this, "azurerm", {
      subscriptionId: subscription,
      features: [{}],
    });

    // Create a resource group
    this.resourceGroupInstance = new ResourceGroup(this, "rg", {
      name: `rg-${this.name}`,
      location: location,
    });
  }
}

export class NetworkStack extends BaseTestStack {
  public readonly virtualNetworkInstance: Virtualnetwork;
  constructor(
    scope: Construct,
    id: string,
    subscription: string,
    virtualNetworkConfig: VirtualnetworkConfig,
  ) {
    super(scope, id);

    new AzurermProvider(this, "azurerm", {
      subscriptionId: subscription,
      features: [{}],
    });

    this.virtualNetworkInstance = new Virtualnetwork(this, "vnet", {
      name: `vnet-${this.name}`,
      ...virtualNetworkConfig,
    });
  }
}

export class KeyVaultStack extends BaseTestStack {
  public readonly keyVaultInstance: Keyvault;
  constructor(
    scope: Construct,
    id: string,
    subscription: string,
    keyVaultConfig: KeyvaultConfig,
  ) {
    super(scope, id);

    new AzurermProvider(this, "azurerm", {
      subscriptionId: subscription,
      features: [{}],
    });

    const clientConfig = new DataAzurermClientConfig(
      this,
      "CurrentClientConfig",
      {},
    );

    // Merge values into the provided KeyvaultConfig
    const updatedKeyVaultConfig: KeyvaultConfig = {
      ...keyVaultConfig, // Keep all existing properties
      tenantId: clientConfig.tenantId, // Override tenantId dynamically
      name: `kv-${this.name}`, // Override name dynamically
    };

    // Create the Key Vault instance with the updated config
    this.keyVaultInstance = new Keyvault(this, "kv", updatedKeyVaultConfig);
  }
}

export class ACRStack extends BaseTestStack {
  public readonly acrInstance: Containerregistry;

  constructor(
    scope: Construct,
    id: string,
    subscription: string,
    acrConfig: ContainerregistryConfig,
  ) {
    super(scope, id);

    new AzurermProvider(this, "azurerm", {
      subscriptionId: subscription,
      features: [{}],
    });

    const clientConfig = new DataAzurermClientConfig(
      this,
      "CurrentClientConfig",
      {},
    );

    // Merge values into the provided ACRConfig
    const updatedACRConfig: ContainerregistryConfig = {
      ...acrConfig, // Keep all existing properties
      name: `acr${this.name}`, // Dynamic name assignment
    };

    // Create the ACR instance with the updated config
    this.acrInstance = new Containerregistry(this, "acr", updatedACRConfig);
  }
}

export class CoreInfrastructure {
  public readonly resourceGroupStack: ResourceGroupStack;
  public readonly networkStack: NetworkStack;
  public readonly keyVaultStack: KeyVaultStack;
  public readonly acrStack: ACRStack;

  constructor(
    scope: Construct,
    id: string,
    location: string,
    subscription: string,
  ) {
    this.resourceGroupStack = new ResourceGroupStack(
      scope,
      `${id}-rg`,
      location,
      subscription,
    );

    this.networkStack = new NetworkStack(scope, `${id}-network`, subscription, {
      resourceGroupName: this.resourceGroupStack.resourceGroupInstance.name,
      location: this.resourceGroupStack.resourceGroupInstance.location,
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

    this.keyVaultStack = new KeyVaultStack(scope, `${id}-kv`, subscription, {
      name: `kv-${id}`, // Ensure 'name' is set
      tenantId: "", // Placeholder (will be overridden dynamically)
      resourceGroupName: this.resourceGroupStack.resourceGroupInstance.name,
      enableTelemetry: false,
      location: this.resourceGroupStack.resourceGroupInstance.location,
      publicNetworkAccessEnabled: true,
      networkAcls: {
        defaultAction: "Deny",
        bypass: "AzureServices",
        ipRules: [],
        virtualNetworkSubnets: [
          {
            id: this.networkStack.virtualNetworkInstance.getString(
              "subnets.default.resource_id",
            ),
          },
        ],
      },
    });

    this.acrStack = new ACRStack(scope, `${id}-acr`, subscription, {
      name: `acr-${id}`, // Ensure 'name' is set
      resourceGroupName: this.resourceGroupStack.resourceGroupInstance.name,
      location: this.resourceGroupStack.resourceGroupInstance.location,
      publicNetworkAccessEnabled: false,
      adminEnabled: false,
      enableTelemetry: false,
      networkRuleSet: {
        defaultAction: "Deny",
        ipRules: [],
        virtualNetworkRules: [
          {
            action: "Allow",
            id: this.networkStack.virtualNetworkInstance.getString(
              "subnets.default.resource_id",
            ),
          },
        ],
      },
    });
  }
}
