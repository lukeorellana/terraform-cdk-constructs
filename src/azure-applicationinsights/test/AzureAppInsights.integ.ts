import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { KeyVault } from "@cdktf/provider-azurerm/lib/key-vault";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { Testing, TerraformStack } from "cdktf";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { ResourceGroup } from "../../azure-resourcegroup";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import * as util from "../../util/azureTenantIdHelpers";
import { generateRandomName } from "../../util/randomName";
import "cdktf/lib/testing/adapters/jest";

import * as appi from "../lib";

describe("Example of deploying Application Insights", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    const clientConfig = new DataAzurermClientConfig(
      stack,
      "CurrentClientConfig",
      {},
    );

    new AzurermProvider(stack, "azureFeature", {});

    new AzapiProvider(stack, "azapi", {});

    // Create a resource group using AzAPI
    const resourceGroup = new ResourceGroup(stack, "rg", {
      name: `rg-${randomName}`,
      location: "eastus",
    });

    const keyvault = new KeyVault(stack, "key_vault", {
      name: `kv-${randomName}`,
      location: "eastus",
      resourceGroupName: resourceGroup.resourceGroup.name,
      skuName: "standard",
      tenantId: util.getAzureTenantId(),
      purgeProtectionEnabled: true,
      softDeleteRetentionDays: 7,
      accessPolicy: [
        {
          tenantId: util.getAzureTenantId(),
          objectId: clientConfig.objectId,
          secretPermissions: [
            "Get",
            "List",
            "Set",
            "Delete",
            "Backup",
            "Restore",
            "Recover",
            "Purge",
          ],
        },
      ],
    });

    const applicationInsights = new appi.AppInsights(stack, "testappi", {
      name: `appi-${randomName}`,
      location: "eastus",
      resourceGroup: resourceGroup,
      applicationType: "web",
      retentionInDays: 90,
    });

    // Save Ikey to Key Vault as secret
    applicationInsights.saveIKeyToKeyVault(keyvault.id);
    applicationInsights.saveIKeyToKeyVault(keyvault.id, "customSecretName");

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  afterEach(() => {
    try {
      TerraformDestroy(fullSynthResult, streamOutput);
    } catch (error) {
      console.error("Error during Terraform destroy:", error);
    }
  });

  it("check if stack can be deployed", () => {
    TerraformApplyAndCheckIdempotency(fullSynthResult, streamOutput); // Set to true to stream output
  });
});
