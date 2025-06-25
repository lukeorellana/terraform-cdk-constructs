import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as func from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan, cleanupCdkTfOutDirs } from "../../testing";

setupJest();

describe("Azure Function App With Defaults (AzAPI)", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new func.FunctionApp(stack, "testAzureFunctionApp", {
      name: "fatest",
      location: "eastus",
      kind: "functionapp,linux",
      enabled: true,
      linuxFxVersion: "NODE|18",
      alwaysOn: false,
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  afterAll(() => {
    cleanupCdkTfOutDirs();
  });

  it("renders an Azure Function App with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});
