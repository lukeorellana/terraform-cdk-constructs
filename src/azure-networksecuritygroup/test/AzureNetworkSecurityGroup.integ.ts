import { Testing, TerraformStack } from "cdktf";
import * as network from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";

import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";
import { PreconfiguredRules } from "../lib/preconfigured-rules";
import "cdktf/lib/testing/adapters/jest";

describe("Example of deploying a Network Security Group", () => {
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

    // Create a virtual network using AzAPI
    const vnet = new resource.Resource(stack, "vnet", {
      name: `vnet-${randomName}`,
      location: "eastus",
      parentId: resourceGroup.id,
      type: "Microsoft.Network/virtualNetworks@2023-04-01",
      body: {
        location: "eastus",
        properties: {
          addressSpace: {
            addressPrefixes: ["10.0.0.0/16"],
          },
        },
      },
    });

    // Create subnets using AzAPI
    const subnet = new resource.Resource(stack, "subnet1", {
      name: "subnet1",
      parentId: vnet.id,
      type: "Microsoft.Network/virtualNetworks/subnets@2023-04-01",
      body: {
        properties: {
          addressPrefix: "10.0.1.0/24",
        },
      },
    });

    const subnet2 = new resource.Resource(stack, "subnet2", {
      name: "subnet2",
      parentId: vnet.id,
      type: "Microsoft.Network/virtualNetworks/subnets@2023-04-01",
      body: {
        properties: {
          addressPrefix: "10.0.2.0/24",
        },
      },
    });

    const nsg = new network.SecurityGroup(stack, "nsg", {
      name: `nsg-${randomName}`,
      location: "eastus",
      resourceGroup: resourceGroup,
      rules: [
        {
          name: "SSH",
          priority: 1001,
          direction: "Inbound",
          access: "Allow",
          protocol: "Tcp",
          sourcePortRange: "*",
          destinationPortRange: "22",
          sourceAddressPrefix: "10.23.15.38",
          destinationAddressPrefix: "VirtualNetwork",
        },
        PreconfiguredRules.addSourceAddress(
          PreconfiguredRules.rdp,
          "10.0.0.0/24",
        ),
      ],
    });

    // RBAC - commenting out as we don't have client config in AzAPI setup
    // nsg.addAccess(clientConfig.objectId, "Contributor");

    // Associate the nsg to the subnets using AzAPI resources
    nsg.associateToSubnet(subnet);
    nsg.associateToSubnet(subnet2);

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
