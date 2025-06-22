import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as kusto from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan } from "../../testing";

setupJest();

describe("Kusto With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new kusto.Cluster(stack, "testAzureKustoDefaults", {
      name: "kustotest",
      azureSku: {
        name: "Dev(No SLA)_Standard_E2a_v4",
        tier: "Basic",
        capacity: 1,
      },
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  it("renders an Kusto with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});
