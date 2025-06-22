import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as storage from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";
setupJest();

describe("Example of deploying a Storage Account", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azureFeature", {});

    // Create a resource group
    const resourceGroup = new ResourceGroup(stack, "rg", {
      name: `rg-${randomName}`,
      location: "eastus",
    });

    const storageAccount = new storage.Account(stack, "storageaccount", {
      name: `sta${randomName}8898`,
      resourceGroup: resourceGroup,
      location: "eastus",
      accountReplicationType: "LRS",
      accountTier: "Standard",
      enableHttpsTrafficOnly: true,
      accessTier: "Hot",
      isHnsEnabled: true,
      minTlsVersion: "TLS1_2",
      publicNetworkAccessEnabled: true,
      networkRules: {
        bypass: ["AzureServices"],
        defaultAction: "Deny",
        ipRules: ["0.0.0.0/0"],
      },
    });

    // Storage Methods
    storageAccount.addContainer("testcontainer");
    storageAccount.addContainer("testcontainer2");
    storageAccount.addFileShare("testshare");
    storageAccount.addTable("testtable");
    storageAccount.addQueue("testqueue");

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
    TerraformApplyAndCheckIdempotency(fullSynthResult, streamOutput);
  });
});
