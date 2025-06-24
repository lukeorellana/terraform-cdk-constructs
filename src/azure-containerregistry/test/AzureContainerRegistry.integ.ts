import { Testing, TerraformStack } from "cdktf";
import * as acr from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { ResourceGroup } from "../../azure-resourcegroup";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";
import "cdktf/lib/testing/adapters/jest";

describe("Example of deploying a Container Registry", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azapi", {});

    const resourceGroup = new ResourceGroup(stack, "rg", {
      name: `rg-${randomName}`,
      location: "eastus",
    });

    const azureContainerRegistry = new acr.Registry(stack, "testACR", {
      name: `acr${randomName}`,
      location: "eastus",
      resourceGroup: resourceGroup,
      sku: { name: "Premium" },
      properties: {
        adminUserEnabled: false,
        publicNetworkAccess: "Enabled",
        policies: {
          retentionPolicy: {
            status: "enabled",
            days: 7,
          },
          trustPolicy: {
            status: "enabled",
            type: "Notary",
          },
        },
        networkRuleSet: {
          defaultAction: "Allow",
        },
      },
      tags: {
        environment: "test",
      },
    });

    // Add child resources to demonstrate the enhanced functionality
    azureContainerRegistry.addScopeMap({
      name: "testScopeMap",
      properties: {
        actions: [
          "repositories/*/content/read",
          "repositories/*/content/write",
        ],
        description: "Test scope map for integration test",
      },
    });

    azureContainerRegistry.addReplication({
      name: "westus2replication",
      location: "westus2",
      properties: {
        regionEndpointEnabled: true,
        zoneRedundancy: "Disabled",
      },
      tags: {
        purpose: "replication",
      },
    });

    // Note: Webhook would require a real endpoint for integration testing
    // azureContainerRegistry.addWebhook({
    //   name: "testWebhook",
    //   properties: {
    //     actions: ["push"],
    //     serviceUri: "https://example.com/webhook",
    //     status: "enabled",
    //   },
    // });

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
