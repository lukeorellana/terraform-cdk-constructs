import { Testing, TerraformStack } from "cdktf";
import "cdktf/lib/testing/adapters/jest";
import * as kusto from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { ResourceGroup } from "../../azure-resourcegroup";
import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";

describe("Example of deploying a Kusto Cluster", () => {
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
      location: "eastus",
    });

    // Create Kusto Cluster using AzAPI
    const kustoCluster = new kusto.Cluster(stack, "kusto", {
      resourceGroup: resourceGroup,
      name: `kusto${randomName}`, // Only lowercase Alphanumeric characters allowed.
      azureSku: {
        name: "Dev(No SLA)_Standard_E2a_v4",
        tier: "Basic",
        capacity: 1,
      },
      properties: {
        enableAutoStop: true,
        enableStreamingIngest: true,
        enablePurge: false,
        publicNetworkAccess: "Enabled",
      },
    });

    // TODO: Re-enable these features once they are migrated to AzAPI
    // // Add RBAC to Kusto Cluster
    // kustoCluster.addAccess(clientConfig.objectId, "Contributor");

    // // Create Database
    // const testDB1 = kustoCluster.addDatabase({
    //   name: "testDB1",
    //   hotCachePeriod: "P7D",
    //   softDeletePeriod: "P31D",
    // });

    // // Create Table in Kusto Database
    // testDB1.addTable("MyTestTable", [
    //   {
    //     columnName: "Timestamp",
    //     columnType: "datetime",
    //   },
    //   {
    //     columnName: "User",
    //     columnType: "string",
    //   },
    //   {
    //     columnName: "Value",
    //     columnType: "int32",
    //   },
    // ]);

    // testDB1.addScript(
    //   "MyTestScript",
    //   ".create table MyTestTable2 ( Timestamp:datetime, User:string, Value:int32 )",
    // );

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
