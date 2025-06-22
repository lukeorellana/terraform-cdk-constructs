import { Testing, TerraformStack } from "cdktf";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import * as queryalert from "../../azure-queryrulealert";
import * as azureResourceGroup from "../../azure-resourcegroup";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";
import "cdktf/lib/testing/adapters/jest";

describe("Example of deploying a Query Alert", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;
  const streamOutput = process.env.STREAM_OUTPUT !== "false";

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");
    const randomName = generateRandomName(12);

    new AzapiProvider(stack, "azapi", {});

    // Create a resource group
    const resourceGroup = new azureResourceGroup.ResourceGroup(stack, "rg", {
      name: `rg-${randomName}`,
      location: "eastus",
    });

    // Query Rule Alert
    new queryalert.QueryRuleAlert(stack, "queryRuleAlert", {
      name: `qra-${randomName}`,
      resourceGroup: resourceGroup,
      location: "eastus",
      criteriaOperator: "GreaterThan",
      criteriaQuery: `
AppExceptions 
| where Message has "file can not be reloaded"
`,
      criteriaThreshold: 100,
      criteriatimeAggregationMethod: "Count",
      evaluationFrequency: "PT5M",
      windowDuration: "PT30M",
      scopes: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.OperationalInsights/workspaces/test-workspace",
      ],
      severity: 4,
      criteriaFailMinimumFailingPeriodsToTriggerAlert: 1,
      criteriaFailNumberOfEvaluationPeriods: 1,
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
