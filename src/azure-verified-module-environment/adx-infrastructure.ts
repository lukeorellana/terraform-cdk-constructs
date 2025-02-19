import { KustoCluster } from "@cdktf/provider-azurerm/lib/kusto-cluster";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import "cdktf/lib/testing/adapters/jest";
import { Construct } from "constructs";

export class AdxInfrastructure extends Construct {
  public readonly kustoCluster: KustoCluster;

  constructor(
    scope: Construct,
    id: string,
    name: string,
    location: string,
    resourceGroup: ResourceGroup,
  ) {
    super(scope, id);

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
      publicNetworkAccessEnabled: true,
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
  }
}
