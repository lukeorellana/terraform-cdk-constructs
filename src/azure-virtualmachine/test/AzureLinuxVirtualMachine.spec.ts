import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { Testing, TerraformStack } from "cdktf";
import "cdktf/lib/testing/adapters/jest";
import * as vm from "..";
import { exampleAzureLinuxVirtualMachine } from "../test/ExampleAzureLinuxVirtualMachine";

describe("Azure Linux Virtual Machine With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "testAzureVMWithDefaults");

    new AzurermProvider(stack, "azureFeature", { features: {} });

    new vm.LinuxVM(stack, "testVirtualMachine", {});

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  it("renders an Azure Linux Virtual Machine with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    expect(fullSynthResult).toPlanSuccessfully(); // Use the saved result
  });
});

describe("Azure Linux Virtual Machine Example", () => {
  it("renders the Azure Linux Virtual Machine and checks snapshot", () => {
    expect(
      Testing.synth(
        new exampleAzureLinuxVirtualMachine(
          Testing.app(),
          "testAzureLinuxVirtualMachineExample",
        ),
      ),
    ).toMatchSnapshot();
  });

  it("check if the produced terraform configuration is valid", () => {
    // We need to do a full synth to plan the terraform configuration
    expect(
      Testing.fullSynth(
        new exampleAzureLinuxVirtualMachine(
          Testing.app(),
          "testAzureLinuxVirtualMachineExample",
        ),
      ),
    ).toBeValidTerraform();
  });

  it("check if this can be planned", () => {
    // We need to do a full synth to plan the terraform configuration
    expect(
      Testing.fullSynth(
        new exampleAzureLinuxVirtualMachine(
          Testing.app(),
          "testAzureLinuxVirtualMachineExample",
        ),
      ),
    ).toPlanSuccessfully();
  });
});
