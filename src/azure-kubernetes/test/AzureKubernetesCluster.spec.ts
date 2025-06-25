import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as aks from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan, cleanupCdkTfOutDirs } from "../../testing";

setupJest();

describe("Azure Kubernetes Cluster With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new aks.Cluster(stack, "testAksCluster", {
      name: "akstest",
      location: "eastus",
      agentPoolProfiles: [
        {
          name: "default",
          count: 1,
          vmSize: "Standard_B2s",
          type: "VirtualMachineScaleSets",
        },
      ],
      dnsPrefix: "akstest",
      enableRBAC: true,
      identity: {
        type: "SystemAssigned",
      },
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  afterAll(() => {
    cleanupCdkTfOutDirs();
  });

  it("renders an Azure Kubernetes Cluster with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});
