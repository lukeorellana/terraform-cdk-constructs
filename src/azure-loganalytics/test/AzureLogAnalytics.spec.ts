import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as la from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan } from "../../testing";

setupJest();

describe("Log Analytics Workspace With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azureFeature", {});

    new la.Workspace(stack, "testAzureLogAnalyticsDefaults", {
      name: "la-test",
      location: "eastus",
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  it("renders a Log Analytics Workspace with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});
