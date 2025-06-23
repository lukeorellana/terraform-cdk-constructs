import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as kv from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import * as util from "../../util/azureTenantIdHelpers";
import { generateRandomName } from "../../util/randomName";

setupJest();

describe("Example of deploying a Key Vault with AzAPI", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azapi", {});

    const azureKeyVault = new kv.Vault(stack, "kv", {
      name: `kv-${randomName}`,
      location: "eastus",
      sku: "standard",
      tenantId: util.getAzureTenantId(),
      networkRuleSet: {
        bypass: "AzureServices",
        defaultAction: "Allow",
        ipRules: [{ value: "0.0.0.0/0" }],
      },
      softDeleteRetentionDays: 7,
    });

    // TODO: Add secrets, keys, and certificates when the methods are fully migrated to AzAPI
    // Basic secret
    // azureKeyVault.addSecret("secret1", {
    //   value: "supersecret",
    // });

    // TODO: Add access policies when the methods are fully migrated to AzAPI
    // Access policies can be added via the constructor for now:
    // accessPolicies: [{
    //   tenantId: util.getAzureTenantId(),
    //   objectId: "00000000-0000-0000-0000-000000000000",
    //   permissions: {
    //     secrets: ["Get", "Set", "List"],
    //     keys: ["Get", "Create", "Delete", "List"],
    //     certificates: ["Get", "Create", "Delete", "List"],
    //   }
    // }]

    fullSynthResult = Testing.fullSynth(stack);
  });

  it("should synthesize a valid configuration", async () => {
    expect(fullSynthResult).toBeValidTerraform();
  });

  it("check if this can be planned", () => {
    // Note: This test will verify the configuration is syntactically correct
    // but won't actually deploy to Azure (no apply operation)
    expect(() => {
      Testing.fullSynth(stack);
    }).not.toThrow();
  });

  // TODO: Uncomment when ready to test actual deployment (requires Azure credentials)
  // it("should apply and destroy", async () => {
  //   await TerraformApplyAndCheckIdempotency(
  //     Testing.fullSynth(stack),
  //     streamOutput,
  //   );
  //   await TerraformDestroy(Testing.fullSynth(stack), streamOutput);
  // });
});
