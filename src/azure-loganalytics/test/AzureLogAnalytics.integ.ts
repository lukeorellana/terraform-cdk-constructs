import { Testing, TerraformStack } from "cdktf";

import * as la from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";

import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";
import "cdktf/lib/testing/adapters/jest";

describe("Example of deploying Log Analytics", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azureFeature", {});

    // Create a resource group
    const resourceGroup = new ResourceGroup(stack, "rg", {
      name: `rg-${randomName}`,
      location: "eastus",
    });

    // Create Log Analytics Workspace using AzAPI

    const logAnalyticsWorkspace = new la.Workspace(stack, "la", {
      name: `la-${randomName}`,
      location: "eastus",
      resourceGroup: resourceGroup,
      sku: { name: "PerGB2018" },
      retentionInDays: 90,
      enableDataExport: true,
      enableLogAccessUsingOnlyResourcePermissions: false,
      tags: {
        test: "true",
        environment: "development",
      },
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  afterEach(() => {
    try {
      TerraformDestroy(fullSynthResult, streamOutput);
    } catch (error) {
      console.error("Error during Terraform destroy:", error);
    }
  });

  it("check if stack can be deployed", () => {
    TerraformApplyAndCheckIdempotency(fullSynthResult, streamOutput); // Set to true to stream output
  });
});
