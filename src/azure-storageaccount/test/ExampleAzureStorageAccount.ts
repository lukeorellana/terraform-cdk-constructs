import { DataAzurermClientConfig } from "@cdktf/provider-azurerm/lib/data-azurerm-client-config";
import { LogAnalyticsWorkspace } from "@cdktf/provider-azurerm/lib/log-analytics-workspace";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { App } from "cdktf";
import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as storage from "..";
import { BaseTestStack } from "../../testing";

const app = new App();

export class exampleAzureStorageAccount extends BaseTestStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const clientConfig = new DataAzurermClientConfig(
      this,
      "CurrentClientConfig",
      {},
    );

    new AzurermProvider(this, "azureFeature", {
      features: {},
    });

    // Create a resource group
    const resourceGroup = new ResourceGroup(this, "rg", {
      name: `rg-${this.name}`,
      location: "eastus",
    });

    const storageAccount = new storage.Account(this, "storageaccount", {
      name: `sta${this.name}8898`,
      resourceGroup: resourceGroup,
      location: "eastus",
      accountReplicationType: "LRS",
      accountTier: "Standard",
      enableHttpsTrafficOnly: true,
      accessTier: "Hot",
      isHnsEnabled: true,
      minTlsVersion: "TLS1_2",
      publicNetworkAccessEnabled: false,
    });

    const logAnalyticsWorkspace = new LogAnalyticsWorkspace(
      this,
      "log_analytics",
      {
        location: "eastus",
        name: `la-${this.name}`,
        resourceGroupName: resourceGroup.name,
      },
    );

    //Diag Settings
    storageAccount.addDiagSettings({
      name: "diagsettings",
      logAnalyticsWorkspaceId: logAnalyticsWorkspace.id,
      metricCategories: ["AllMetrics"],
    });

    //RBAC
    storageAccount.addAccess(clientConfig.objectId, "Contributor");

    // Metric Alert
    storageAccount.addMetricAlert({
      name: "testalert",
      criteria: [
        {
          metricName: "Availability",
          metricNamespace: "Microsoft.Storage/storageAccounts",
          aggregation: "Average",
          operator: "LessThan",
          threshold: 0,
        },
      ],
    });

    // Storage Methods
    const storageContainer = storageAccount.addContainer("testcontainer");
    storageContainer.addBlob("testblob.txt", "../../../test.txt");
    storageAccount.addContainer("testcontainer2");

    const storageFileShare = storageAccount.addFileShare("testshare");
    storageFileShare.addFile("testfile.txt", "../../../test.txt");

    storageAccount.addTable("testtable");

    storageAccount.addQueue("testqueue");

    storageAccount.addNetworkRules({
      bypass: ["AzureServices"],
      defaultAction: "Deny",
      ipRules: ["0.0.0.0/0"],
    });

    // Outputs to use for End to End Test
    const cdktfTerraformOutputRGName = new cdktf.TerraformOutput(
      this,
      "resource_group_name",
      {
        value: resourceGroup.name,
      },
    );

    const cdktfTerraformOutputSAName = new cdktf.TerraformOutput(
      this,
      "storage_account_name",
      {
        value: storageAccount.name,
      },
    );

    const cdktfTerraformOutputSAtier = new cdktf.TerraformOutput(
      this,
      "storage_account_account_tier",
      {
        value: storageAccount.accountTier,
      },
    );

    const cdktfTerraformOutputSAkind = new cdktf.TerraformOutput(
      this,
      "storage_account_account_kind",
      {
        value: storageAccount.accountKind,
      },
    );

    const cdktfTerraformOutputSAcontainer = new cdktf.TerraformOutput(
      this,
      "storage_container_name",
      {
        value: storageContainer.name,
      },
    );

    cdktfTerraformOutputRGName.overrideLogicalId("resource_group_name");
    cdktfTerraformOutputSAName.overrideLogicalId("storage_account_name");
    cdktfTerraformOutputSAtier.overrideLogicalId(
      "storage_account_account_tier",
    );
    cdktfTerraformOutputSAkind.overrideLogicalId(
      "storage_account_account_kind",
    );
    cdktfTerraformOutputSAcontainer.overrideLogicalId("storage_container_name");
  }
}

new exampleAzureStorageAccount(app, "testAzureStorageAccount");

app.synth();
