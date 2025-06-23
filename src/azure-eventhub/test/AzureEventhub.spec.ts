import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as eh from "..";
import { TerraformPlan } from "../../testing";

setupJest();

describe("Azure Eventhub With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new eh.Namespace(stack, "testAzureEventhubDefaults", {
      name: "eh-test-namespace",
      tags: {
        test: "test",
      },
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  it("renders an Azure Eventhub with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});
