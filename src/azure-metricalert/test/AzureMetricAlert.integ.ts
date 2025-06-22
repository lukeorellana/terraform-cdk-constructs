import { Testing, TerraformStack } from "cdktf";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import * as resource from "../../../.gen/providers/azapi/resource";
import * as metricalert from "../../azure-metricalert";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";

import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";
import "cdktf/lib/testing/adapters/jest";

describe("Example of deploying a Metric Alert", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azureFeature", {});

    // Create a resource group using our AzAPI ResourceGroup
    const resourceGroup = new ResourceGroup(stack, "rg", {
      name: `rg-${randomName}`,
      location: "eastus",
    });

    // Create a Log Analytics Workspace using AzAPI
    const logAnalyticsWorkspace = new resource.Resource(stack, "la", {
      name: `la-${randomName}`,
      location: "eastus",
      parentId: resourceGroup.resourceGroup.id,
      type: "Microsoft.OperationalInsights/workspaces@2021-06-01",
      body: {
        properties: {
          sku: {
            name: "pergb2018",
          },
          retentionInDays: 30,
        },
      },
    });

    // Create Metric Alert
    new metricalert.MetricAlert(stack, "metricAlert1", {
      name: `metricalert1-${randomName}`,
      resourceGroup: resourceGroup,
      scopes: [logAnalyticsWorkspace.id],
      criteria: [
        {
          metricName: "Heartbeat",
          metricNamespace: "Microsoft.operationalinsights/workspaces",
          aggregation: "Average",
          operator: "LessThan",
          threshold: 0,
          dimension: [
            {
              name: "OSType",
              operator: "Include",
              values: ["*"],
            },
            {
              name: "Version",
              operator: "Include",
              values: ["*"],
            },
          ],
        },
      ],
    });

    new metricalert.MetricAlert(stack, "metricAlert2", {
      name: `metricalert2-${randomName}`,
      resourceGroup: resourceGroup,
      scopes: [logAnalyticsWorkspace.id],
      criteria: [
        {
          metricName: "Heartbeat",
          metricNamespace: "Microsoft.operationalinsights/workspaces",
          aggregation: "Average",
          operator: "LessThan",
          threshold: 0,
        },
      ],
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
