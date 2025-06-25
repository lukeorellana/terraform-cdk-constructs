import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as vm from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan, cleanupCdkTfOutDirs } from "../../testing";
setupJest();

describe("Azure Windows Virtual Machine With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "testAzureVMWithDefaults");

    new AzapiProvider(stack, "azureFeature", {});

    new vm.WindowsVM(stack, "testVirtualMachine", {
      adminUsername: "testAdmin",
      adminPassword: "testPassword&@34$$123",
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  afterAll(() => {
    cleanupCdkTfOutDirs();
  });

  it("renders an Azure Windows Virtual Machine with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});
