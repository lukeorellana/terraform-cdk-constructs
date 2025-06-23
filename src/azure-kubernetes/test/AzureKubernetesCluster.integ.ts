import { Testing, TerraformStack } from "cdktf";
import "cdktf/lib/testing/adapters/jest";
import * as aks from "..";
import { generateRandomName } from "../../util/randomName";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { ResourceGroup } from "../../azure-resourcegroup";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";

describe("Example of deploying a Kubernetes Cluster", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azapi", {});

    // Create a resource group
    const resourceGroup = new ResourceGroup(stack, "rg", {
      name: `rg-${randomName}`,
      location: "southcentralus",
    });

    // TODO: Add Log Analytics Workspace when migrated to AzAPI
    // const logAnalyticsWorkspace = new LogAnalyticsWorkspace(
    //   stack,
    //   "log_analytics",
    //   {
    //     location: "southcentralus",
    //     name: `la-${randomName}`,
    //     resourceGroupName: resourceGroup.name,
    //   },
    // );

    const aksCluster = new aks.Cluster(stack, "testAksCluster", {
      name: "akstest",
      location: "southcentralus",
      resourceGroup: resourceGroup,
      //apiServerAuthorizedIpRanges: ["0.0.0.0"],
      properties: {
        agentPoolProfiles: [
          {
            name: "default",
            count: 1,
            vmSize: "Standard_D2as_v4",
            type: "VirtualMachineScaleSets",
            // TODO: Add upgrade settings when supported in AzAPI schema
            // upgradeSettings: {
            //   maxSurge: "10%",
            // },
          },
        ],
        dnsPrefix: "akstest",
        enableRBAC: true,
        aadProfile: {
          managed: true,
          enableAzureRbac: true,
        },
      },
      identity: {
        type: "SystemAssigned",
      },
    });

    //TODO: Add Diagnostic Settings when migrated to AzAPI
    // aksCluster.addDiagSettings({
    //   name: "diagsettings",
    //   logAnalyticsWorkspaceId: logAnalyticsWorkspace.id,
    //   metric: [
    //     {
    //       category: "AllMetrics",
    //     },
    //   ],
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
