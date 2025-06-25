import * as cdktf from "cdktf";
import { Construct } from "constructs";
import { Instance, BaseInstanceProps } from "./instance";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup";
import { AzureResource } from "../../core-azure/lib";

/**
 * EventHub Namespace properties interface
 */
export interface NamespaceProps {
  /**
   * The name of the EventHub namespace
   */
  readonly name: string;

  /**
   * The resource group to deploy the namespace in
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The location/region for the namespace
   */
  readonly location?: string;

  /**
   * Tags to apply to the namespace
   */
  readonly tags?: { [key: string]: string };

  /**
   * The SKU of the EventHub Namespace
   * @default "Standard"
   */
  readonly sku?: string;

  /**
   * The capacity of the EventHub Namespace
   * @default 1
   */
  readonly capacity?: number;

  /**
   * Specifies if this EventHub Namespace is enabled
   * @default true
   */
  readonly enabled?: boolean;
}

/**
 * Azure EventHub Namespace construct using AzAPI
 */
export class Namespace extends AzureResource {
  public readonly name: string;
  public readonly resourceGroup: ResourceGroup;
  public readonly resource: resource.Resource;
  public readonly id: string;

  constructor(scope: Construct, id: string, props: NamespaceProps) {
    super(scope, id);

    this.name = props.name;

    // Setup or reuse the provided resource group
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location || "eastus",
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Create the EventHub Namespace using AzAPI
    this.resource = new resource.Resource(this, "namespace", {
      type: "Microsoft.EventHub/namespaces@2021-11-01",
      name: props.name,
      location: props.location || "eastus",
      parentId: this.resourceGroup.resourceGroup.id,
      tags: props.tags,
      body: {
        sku: {
          name: props.sku || "Standard",
          tier: props.sku || "Standard",
          capacity: props.capacity || 1,
        },
        properties: {
          isAutoInflateEnabled: false,
          maximumThroughputUnits: 0,
          kafkaEnabled: false,
          zoneRedundant: false,
          encryption: {
            keySource: "Microsoft.KeyVault",
          },
        },
      },
    });

    this.id = this.resource.id;

    // Terraform Outputs
    const idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.id,
    });

    idOutput.overrideLogicalId("id");
  }

  /**
   * Creates and adds an Event Hub instance to the current namespace.
   */
  addEventhubInstance(props: BaseInstanceProps) {
    return new Instance(this, props.name, {
      resourceGroup: this.resourceGroup as any,
      namespaceName: this.name,
      ...props,
    });
  }
}
