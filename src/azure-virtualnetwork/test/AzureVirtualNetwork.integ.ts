import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as vnet from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import * as rg from "../../azure-resourcegroup";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";
setupJest();

describe("Example of deploying a Virtual Network", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azureFeature", {});

    // Create resource groups for each virtual network
    const resourceGroupEast = new rg.ResourceGroup(stack, "rg-east", {
      name: `rg-east-${randomName}`,
      location: "eastus",
    });

    const resourceGroupWest = new rg.ResourceGroup(stack, "rg-west", {
      name: `rg-west-${randomName}`,
      location: "westus",
    });

    const network = new vnet.Network(stack, "testAzureVirtualNetworkDefaults", {
      name: `vnet-${randomName}`,
      location: "eastus",
      resourceGroup: resourceGroupEast,
      addressSpace: ["10.0.0.0/16"],
      subnets: [
        {
          name: "subnet1",
          addressPrefixes: ["10.0.1.0/24"],
        },
        {
          name: "subnet2",
          addressPrefixes: ["10.0.2.0/24"],
        },
      ],
    });

    const remotenetwork = new vnet.Network(
      stack,
      "testAzureRemoteVirtualNetworkDefaults",
      {
        name: `vnet-${randomName}2`,
        location: "westus",
        resourceGroup: resourceGroupWest,
        addressSpace: ["10.1.0.0/16"],
        subnets: [
          {
            name: "subnet1",
            addressPrefixes: ["10.1.1.0/24"],
          },
          {
            name: "subnet2",
            addressPrefixes: ["10.1.2.0/24"],
          },
        ],
      },
    );

    // Peer the networks
    network.addVnetPeering(remotenetwork);

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  afterEach(() => {
    try {
      TerraformDestroy(fullSynthResult, streamOutput);
    } catch (error) {
      console.error("Error during Terraform destroy:", error);
    }
  });

  it("check if stac can be deployed", () => {
    TerraformApplyAndCheckIdempotency(fullSynthResult, streamOutput); // Set to true to stream output
  });
});
