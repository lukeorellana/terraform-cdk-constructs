import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as acr from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan } from "../../testing";

setupJest();

describe("Azure Container Registry With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new acr.Registry(stack, "testAzureContainerRegistryDefaults", {
      name: "testlatestacr123",
      location: "eastus",
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  it("renders an Azure Container Registry with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});

describe("Azure Container Registry With Child Resources", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test-child-resources");

    new AzapiProvider(stack, "azapi", {});

    const registry = new acr.Registry(stack, "testAcrWithChildren", {
      name: "testchildrenacr123",
      location: "eastus",
      sku: { name: "Premium" },
      properties: {
        adminUserEnabled: true,
        publicNetworkAccess: "Enabled",
      },
    });

    // Add child resources
    registry.addWebhook({
      name: "testwebhook",
      properties: {
        actions: ["push", "delete"],
        serviceUri: "https://example.com/webhook",
        status: "enabled",
      },
    });

    registry.addScopeMap({
      name: "testscopemap",
      properties: {
        actions: ["repositories/*/content/read"],
        description: "Test scope map",
      },
    });

    fullSynthResult = Testing.fullSynth(stack);
  });

  it("renders an Azure Container Registry with child resources and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot();
  });

  it("check if the produced terraform configuration with child resources is valid", () => {
    expect(fullSynthResult).toBeValidTerraform();
  });

  it("check if this can be planned with child resources", () => {
    TerraformPlan(fullSynthResult);
  });
});
