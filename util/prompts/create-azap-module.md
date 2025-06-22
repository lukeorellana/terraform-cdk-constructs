This is great! Now can you Look at:
src/azure-resourcegroup and src/azure-virtualmachine 
Can you make the src/azure-metricalert into an AzAPI construct instead of using the AzureRM provider? Also make sure that the .spec test runs, successfully. You may updated the .integ test but dont run it. Also no need to run build.

I am also adding a file to context that contains the AzAPI schema for the requested module you can use it to determine all possible options for the new AzAPI module.