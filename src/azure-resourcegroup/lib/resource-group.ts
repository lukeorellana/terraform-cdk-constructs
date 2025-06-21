import * as resource from "../../../.gen/providers/azapi/resource";
import * as cdktf from "cdktf";
import { Construct } from "constructs";
import { AzureResource } from "../../core-azure/lib";

// Construct
/**
 * Properties for the resource group
 */
export interface ResourceGroupProps {
  /**
   * The Azure Region to deploy.
   */
  readonly location?: string;
  /**
   * The name of the Azure Resource Group.
   */
  readonly name?: string;

  /**
   * The tags to assign to the Resource Group.
   */
  readonly tags?: { [key: string]: string };
  /**
   * The lifecycle rules to ignore changes.
   */
  readonly ignoreChanges?: string[];
}

export class ResourceGroup extends AzureResource {
  public readonly resourceGroup: resource.Resource;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly locationOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;


  /**
   * Represents an Azure Resource Group.
   *
   * This class is responsible for the creation and management of an Azure Resource Group, which is a container that holds
   * related resources for an Azure solution. A resource group includes those resources that you want to manage as a group.
   * You decide how to allocate resources to resource groups based on what makes the most sense for your organization.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the Resource Group.
   * @param props - Optional properties for configuring the Resource Group. These can include:
   *                - `location`: The Azure region where the Resource Group will be created.
   *                - `name`: The name of the Resource Group, which must be unique within your Azure subscription.
   *                - `tags`: A dictionary of tags to apply to the Resource Group for organizational, billing, or other purposes.
   *                - `ignoreChanges`: A list of properties which should be ignored if changes are made after initial deployment,
   *                  useful in certain scenarios where properties are externally managed or should not trigger updates.
   *
   * Example usage:
   * ```typescript
   * new Group(this, 'MyResourceGroup', {
   *   location: 'East US',
   *   name: 'ApplicationResources',
   *   tags: {
   *     environment: 'production'
   *   }
   * });
   * ```
   * This class sets up the resource group and applies any specified configurations, making it ready to hold other Azure resources.
   */
  constructor(scope: Construct, id: string, props: ResourceGroupProps = {}) {
    super(scope, id);

    const defaults = {
      name: props.name || `rg-${this.node.path.split("/")[0]}`,
      location: props.location || "eastus",
    };

    this.resourceGroup = new resource.Resource(scope, `${id}-resource`, {
      ...defaults,
      tags: props.tags,
      type: "Microsoft.Resources/resourceGroups@2022-09-01",
    });

    this.resourceGroup.addOverride("lifecycle", [
      {
        ignore_changes: props.ignoreChanges || [],
      },
    ]);
  
    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.resourceGroup.id,
    });
    this.locationOutput = new cdktf.TerraformOutput(this, "location", {
      value: this.resourceGroup.location,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.resourceGroup.name,
    });

    /*This allows the Terraform resource name to match the original name. You can remove the call if you don't need them to match.*/
    this.locationOutput.overrideLogicalId("location");
    this.nameOutput.overrideLogicalId("name");
    this.idOutput.overrideLogicalId("id");
  }
}
