import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as func from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";

setupJest();

describe("Example of deploying a Function App (AzAPI)", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azapi", {});

    // TODO: Advanced features like Log Analytics, Diagnostics, and Service Plans
    // need to be migrated to AzAPI individually. For now, this test demonstrates
    // basic Function App creation with AzAPI.

    // Basic Linux Function App with AzAPI
    new func.FunctionApp(stack, "basic-functionapp", {
      name: `func-${randomName}`,
      location: "eastus",
      kind: "functionapp,linux",
      enabled: true,
      linuxFxVersion: "NODE|18",
      alwaysOn: false,
      tags: {
        environment: "integration-test",
        owner: "cdktf-team",
      },
    });

    fullSynthResult = Testing.fullSynth(stack);
  });

  it("deploys a basic Function App successfully", () => {
    TerraformApplyAndCheckIdempotency(fullSynthResult, streamOutput);
  });

  afterEach(() => {
    try {
      TerraformDestroy(fullSynthResult, streamOutput);
    } catch (error) {
      console.warn("Failed to destroy resources:", error);
    }
  });
});
