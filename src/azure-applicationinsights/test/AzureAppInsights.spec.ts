import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as appi from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan, cleanupCdkTfOutDirs } from "../../testing";

setupJest();

describe("Application Insights With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new appi.AppInsights(stack, "testAzureApplicationInsightsDefaults", {
      name: "appi-test",
      location: "eastus",
      applicationType: "web",
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  afterAll(() => {
    // Clean up after all tests in this suite have run
    cleanupCdkTfOutDirs();
  });

  it("renders an Application Insights with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});

describe("Application Insights With Flattened Properties", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new appi.AppInsights(stack, "testFlattenedProps", {
      name: "appi-flattened",
      location: "eastus",
      applicationType: "web",
      retentionInDays: 120,
      disableIpMasking: true,
      samplingPercentage: 50,
      publicNetworkAccessForIngestion: "Enabled",
      publicNetworkAccessForQuery: "Enabled",
    });

    fullSynthResult = Testing.fullSynth(stack);
  });

  afterAll(() => {
    // Clean up after all tests in this suite have run
    cleanupCdkTfOutDirs();
  });

  it("renders Application Insights with flattened properties", () => {
    expect(Testing.synth(stack)).toMatchSnapshot();
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform();
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult);
  });
});

describe("Application Insights Legacy Properties Compatibility", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    // Test backward compatibility with legacy properties structure
    new appi.AppInsights(stack, "testLegacyProps", {
      name: "appi-legacy",
      location: "eastus",
      applicationType: "web",
      properties: {
        Application_Type: "web",
        RetentionInDays: 90,
        DisableIpMasking: false,
      },
    });

    fullSynthResult = Testing.fullSynth(stack);
  });

  afterAll(() => {
    // Clean up after all tests in this suite have run
    cleanupCdkTfOutDirs();
  });

  it("renders Application Insights with legacy properties", () => {
    expect(Testing.synth(stack)).toMatchSnapshot();
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform();
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult);
  });
});
