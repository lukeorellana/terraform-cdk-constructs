import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { Construct } from "constructs";
import { Storage } from "../../.gen/modules/storage";
import { Virtualnetwork } from "../../.gen/modules/virtualnetwork";

export class DatalakeInfrastructure extends Construct {
  public readonly Datalake: Storage;

  constructor(
    scope: Construct,
    id: string,
    name: string,
    location: string,
    resourceGroup: ResourceGroup,
    virtualNetwork: Virtualnetwork,
  ) {
    super(scope, id);

    const clientConfigDatalake = new DataAzurermClientConfig(
      this,
      "CurrentClientConfigDatalake",
      {},
    );

    this.Datalake = new Storage(this, "storageAccount", {
      name: `${name}sta`,
      resourceGroupName: resourceGroup.name,
      location: location,
      accountReplicationType: "ZRS",
      accountTier: "Standard",
      accountKind: "StorageV2",
      httpsTrafficOnlyEnabled: true,
      minTlsVersion: "TLS1_2",
      sharedAccessKeyEnabled: true,
      isHnsEnabled: true,
      publicNetworkAccessEnabled: true,

      managedIdentities: {
        systemAssigned: true,
      },

      azureFilesAuthentication: {
        defaultShareLevelPermission: "StorageFileDataSmbShareReader",
        directoryType: "AADKERB",
      },

      roleAssignments: {
        role_assignment_1: {
          role_definition_id_or_name: "Storage Blob Data Owner",
          principal_id: clientConfigDatalake.objectId,
          skip_service_principal_aad_check: false,
        },
      },

      networkRules: {
        bypass: ["AzureServices"],
        defaultAction: "Deny",
        ipRules: [],
        virtualNetworkSubnetIds: [
          virtualNetwork.getString("subnets.default.resource_id"),
        ],
      },

      containers: {
        blob_container0: {
          name: "container0",
        },
      },
    });
  }
}
