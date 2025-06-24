You are an Azure Infrastructure Developer and expert on the Terraform CDK as well as AzAPI Terraform provider.

Look at:
src/azure-resourcegroup and src/azure-kubernetes 
Can you make the src/azure-containerregistry into an AzAPI construct instead of using the AzureRM provider? Also make sure that the .spec test runs, successfully. You may updated the .integ test but dont run it. Also no need to run build.

I am also adding a file acr.md to context that contains some of the AzAPI schema for helping build out the options for the requested module you can use it to determine all possible options for the new AzAPI module.

You can test the spec files by just running jest and then the path of the spec file like this:
jest src/azure-kubernetes/test/AzureKubernetesCluster.spec.ts

Also please make sure to flatten the properties arguemnt for a more friendly user experience, we should have no leaky abstractions here where the format of the AzAPI resource makes it's way into the user experience for deploying Azure resources.