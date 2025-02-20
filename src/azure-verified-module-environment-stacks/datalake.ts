import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { Construct } from "constructs";
import { Storage, StorageConfig } from "../../.gen/modules/storage";
import { BaseTestStack } from "../testing";

export class DatalakeStack extends BaseTestStack {
  public readonly datalakeInstance: Storage;
  constructor(
    scope: Construct,
    id: string,
    subscription: string,
    storageConfig: StorageConfig,
  ) {
    super(scope, id);

    new AzurermProvider(this, "azurerm", {
      subscriptionId: subscription,
      features: [{}],
    });

    const clientConfigDatalake = new DataAzurermClientConfig(
      this,
      "CurrentClientConfigDatalake",
      {},
    );

    // Merge values into the provided KeyvaultConfig
    const updatedStorageConfig: StorageConfig = {
      ...storageConfig, // Keep all existing properties
      name: `${this.name}sta`,
      roleAssignments: {
        role_assignment_1: {
          role_definition_id_or_name: "Storage Blob Data Owner",
          principal_id: clientConfigDatalake.objectId,
          skip_service_principal_aad_check: false,
        },
      },
    };

    // Create the Datalake instance with the updated config
    this.datalakeInstance = new Storage(
      this,
      "storageAccount",
      updatedStorageConfig,
    );
  }
}
