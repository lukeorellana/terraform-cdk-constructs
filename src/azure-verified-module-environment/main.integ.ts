import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { Testing, TerraformStack } from "cdktf";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../testing";
import { generateRandomName } from "../util/randomName";
import "cdktf/lib/testing/adapters/jest";
import { CoreInfrastructure } from "./core-infrastructure";
// import { SQLInfrastructure } from "./sql-infrastructure";
// import { AksInfrastructure } from "./aks-infrastructure";
// import { DatalakeInfrastructure } from "./datalake-infrastructure";
// import { AdxInfrastructure } from "./adx-infrastructure";
import { PostgresSQLInfrastructure } from "./postgressql-infrastructure";

describe("Example of deploying an Environment", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzurermProvider(stack, "azureFeature", {
      subscriptionId: "635ff6b0-25c0-4b95-ae39-e04703583504",
      features: [{}],
    });

    const core = new CoreInfrastructure(
      stack,
      "core-infrastructure",
      randomName,
      "eastus2",
    );

    // new AksInfrastructure(
    //   stack,
    //   "aks-infrastructure",
    //   randomName,
    //   "eastus2",
    //   core.resourceGroup,
    //   core.virtualnetwork,
    // );

    // new DatalakeInfrastructure(
    //   stack,
    //   "datalake-infrastructure",
    //   randomName,
    //   "eastus2",
    //   core.resourceGroup,
    //   core.virtualnetwork,
    // );

    // new AdxInfrastructure(
    //   stack,
    //   "adx-infrastructure",
    //   randomName,
    //   "eastus2",
    //   core.resourceGroup,
    // );

    // new SQLInfrastructure(
    //   stack,
    //   "sql-infrastructure",
    //   randomName,
    //   "eastus2",
    //   core.resourceGroup,
    //   core.virtualnetwork,
    // );

    new PostgresSQLInfrastructure(
      stack,
      "postgresql-infrastructure",
      randomName,
      "eastus2",
      core.resourceGroup,
      core.virtualnetwork,
    );

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
