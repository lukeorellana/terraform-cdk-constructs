import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { PrivateDnsZone } from "@cdktf/provider-azurerm/lib/private-dns-zone";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";
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
  public readonly subnets: TerraformOutput;
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

    const subnets = new TerraformOutput(this, "subnets", {
      value: this.virtualNetworkInstance.subnetsOutput,
      sensitive: true,
    });

    this.subnets = subnets;
  }
}

export class KeyVaultStack extends BaseTestStack {
  public readonly keyVaultInstance: Keyvault;
  constructor(
    scope: Construct,
    id: string,
    subscription: string,
    subnet: Virtualnetwork,
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
    const kvpvdns = new PrivateDnsZone(this, "azurerm_private_dns_zone", {
      name: "privatelink.vaultcore.azure.net",
      resourceGroupName: keyVaultConfig.resourceGroupName,
    });

    // Merge values into the provided KeyvaultConfig
    const updatedKeyVaultConfig: KeyvaultConfig = {
      ...keyVaultConfig, // Keep all existing properties
      tenantId: clientConfig.tenantId, // Override tenantId dynamically
      name: `kv-${this.name}`, // Override name dynamically
      privateEndpoints: {
        primary: {
          private_dns_zone_resource_ids: [kvpvdns.id],
          subnet_resource_id: subnet.getString("subnets.default.resource_id"),
        },
      },
    };

    // Create the Key Vault instance with the updated config
    this.keyVaultInstance = new Keyvault(this, "kv", updatedKeyVaultConfig);
  }
}

export class CoreInfrastructure {
  public readonly resourceGroupStack: ResourceGroupStack;
  public readonly networkStack: NetworkStack;
  public readonly keyVaultStack: KeyVaultStack;

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
      addressSpace: ["10.0.0.0/16"],
      subnets: {
        default: {
          name: "default",
          address_prefix: "10.0.1.0/24",
        },
      },
    });

    this.keyVaultStack = new KeyVaultStack(
      scope,
      `${id}-kv`,
      subscription,
      this.networkStack.virtualNetworkInstance,
      {
        name: `kv-${id}`, // Ensure 'name' is set
        tenantId: "", // Placeholder (will be overridden dynamically)
        resourceGroupName: this.resourceGroupStack.resourceGroupInstance.name,
        enableTelemetry: false,
        location: this.resourceGroupStack.resourceGroupInstance.location,
        publicNetworkAccessEnabled: false,
        privateEndpoints: {
          primary: {
            private_dns_zone_resource_ids: [],
            subnet_resource_id:
              this.networkStack.virtualNetworkInstance.getString(
                "subnets.default.resource_id",
              ),
          },
        },
      },
    );
  }
}
