import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as la from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan, cleanupCdkTfOutDirs } from "../../testing";

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

  afterAll(() => {
    cleanupCdkTfOutDirs();
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

describe("Log Analytics Workspace With Flattened Properties", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azureFeature", {});

    new la.Workspace(stack, "testAzureLogAnalyticsFlattened", {
      name: "la-flattened-test",
      location: "eastus",
      sku: { name: "PerGB2018" },
      retentionInDays: 90,
      enableDataExport: true,
      enableLogAccessUsingOnlyResourcePermissions: false,
      disableLocalAuth: true,
      dailyQuotaGb: 5,
      publicNetworkAccessForIngestion: "Enabled",
      publicNetworkAccessForQuery: "Enabled",
      tags: {
        environment: "test",
        team: "platform",
      },
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  afterAll(() => {
    cleanupCdkTfOutDirs();
  });

  it("renders a Log Analytics Workspace with flattened properties and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration with flattened properties is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned with flattened properties", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});
