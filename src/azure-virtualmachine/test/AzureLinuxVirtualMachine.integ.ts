import { Testing, TerraformStack } from "cdktf";
import * as vm from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";
import { Network } from "../../azure-virtualnetwork/lib/network";

import {
  TerraformApplyAndCheckIdempotency,
  TerraformDestroy,
} from "../../testing";
import { generateRandomName } from "../../util/randomName";
import "cdktf/lib/testing/adapters/jest";

describe("Example of deploying a Linux Virtual Machine", () => {
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
      location: "southcentralus",
    });

    // Create a virtual network
    const network = new Network(stack, "vnet", {
      name: `vnet-${randomName}`,
      location: "southcentralus",
      resourceGroup: resourceGroup,
      addressSpace: ["10.0.0.0/16"],
    });

    const linuxVm = new vm.LinuxVM(stack, "vm", {
      name: randomName,
      location: "southcentralus",
      resourceGroup: resourceGroup,
      size: "Standard_D2as_v4",
      adminUsername: "testadmin",
      adminPassword: "Password1234!",
      osDisk: {
        caching: "ReadWrite",
        createOption: "FromImage",
        managedDisk: {
          storageAccountType: "Standard_LRS",
        },
      },
      sourceImageReference: {
        publisher: "Canonical",
        offer: "0001-com-ubuntu-server-jammy",
        sku: "22_04-lts-gen2",
        version: "latest",
      },
      subnet: network.subnets.default,
      enablePublicIp: true,
      userData: "#!/bin/bash\nsudo apt-get install -y apache2",
      enableSshAzureADLogin: true,
      identity: {
        type: "SystemAssigned",
      },
      lifecycle: {
        ignoreChanges: ["tags", "identity"],
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
