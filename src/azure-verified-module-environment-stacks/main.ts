import { App } from "cdktf";
import { CoreInfrastructure } from "./core-infrastructure";
import { DatalakeStack } from "./datalake";

const app = new App();

const core = new CoreInfrastructure(
  app,
  "dev",
  "EastUS2",
  "635ff6b0-25c0-4b95-ae39-e04703583504",
);

new DatalakeStack(app, "dev", "635ff6b0-25c0-4b95-ae39-e04703583504", {
  name: `datalake`,
  resourceGroupName: core.resourceGroupStack.resourceGroupInstance.name,
  location: core.resourceGroupStack.resourceGroupInstance.location,
  accountReplicationType: "ZRS",
  accountTier: "Standard",
  accountKind: "StorageV2",
  httpsTrafficOnlyEnabled: true,
  minTlsVersion: "TLS1_2",
  sharedAccessKeyEnabled: true,
  isHnsEnabled: true,
  publicNetworkAccessEnabled: true,

  managedIdentities: {
    systemAssigned: true,
  },

  azureFilesAuthentication: {
    defaultShareLevelPermission: "StorageFileDataSmbShareReader",
    directoryType: "AADKERB",
  },
  networkRules: {
    bypass: ["AzureServices"],
    defaultAction: "Deny",
    ipRules: [],
    virtualNetworkSubnetIds: [
      core.keyVaultStack.keyVaultInstance.getString(
        "subnets.default.resource_id",
      ),
    ],
  },

  containers: {
    blob_container0: {
      name: "container0",
    },
  },
});

app.synth();
