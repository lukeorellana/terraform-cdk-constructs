import { cdktf } from "projen";
import { NpmAccess, UpdateSnapshot } from "projen/lib/javascript";

const project = new cdktf.ConstructLibraryCdktf({
  author: "Microsoft",
  authorAddress: "https://microsoft.com",
  cdktfVersion: "0.21.0",
  jsiiVersion: "^5.7.0",
  description:
    "A collection of CDK modules for provisioning and managing Terraform resources efficiently.",
  keywords: [
    "cdk",
    "cdktf",
    "terraform",
    "infrastructure",
    "cloud",
    "devops",
    "azure",
  ],
  constructsVersion: "^10.4.2",
  typescriptVersion: "~5.2.0",
  minNodeVersion: "20.10.0",
  defaultReleaseBranch: "main",
  name: "@microsoft/terraform-cdk-constructs",
  projenrcTs: true,
  prerelease: "pre",
  jest: true,
  testdir: "",
  prettier: true,
  repositoryUrl: "https://github.com/azure/terraform-cdk-constructs.git",
  licensed: true,
  license: "MIT",
  pullRequestTemplate: false,
  mergify: false,
  npmAccess: NpmAccess.PUBLIC,
  publishToNuget: {
    dotNetNamespace: "Microsoft.Cdktf.Azure.TFConstructs",
    packageId: "Microsoft.Cdktf.Azure.TFConstructs",
  },
  publishToPypi: {
    distName: "microsoft-cdktfconstructs",
    module: "microsoft_cdktfconstructs",
  },
  publishToMaven: {
    javaPackage: "com.microsoft.terraformcdkconstructs",
    mavenGroupId: "com.microsoft.terraformcdkconstructs",
    mavenArtifactId: "cdktf-azure-constructs",
  },
  jestOptions: {
    updateSnapshot: UpdateSnapshot.NEVER,
  },
  deps: [
    "@cdktf/provider-azurerm@14.3.0",
    "nanoid@^4.0.2",
    "ts-md5@^1.3.1",
    "cdktf@0.21.0",
    "moment@^2.30.1",
  ],
  peerDeps: ["@cdktf/provider-azurerm@14.3.0"],
  bundledDeps: ["moment@^2.30.1", "ts-md5@^1.3.1", "nanoid@^4.0.2"],
  devDeps: [
    "@cdktf/provider-azurerm@14.3.0",
    "cdktf@0.21.0",
    "@types/jest@^29.5.8",
    "@types/node@^18.7.18",
    "jest@^29.6.1",
    "ts-jest@^29.1.1",
    "ts-node@^10.9.1",
    "typescript@~5.2.0",
    "@types/moment@^2.13.0",
  ],
  releaseToNpm: true,
});

// rest of the file stays unchanged...

project.prettier?.addIgnorePattern(".github");
project.eslint?.addIgnorePattern(".github");
// ...etc...

project.synth();
