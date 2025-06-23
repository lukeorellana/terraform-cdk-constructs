import { Instance, BaseInstanceProps } from "./instance";
import {
  Namespace as AzApiNamespace,
  NamespaceProps as AzApiNamespaceProps,
} from "./namespace-azapi";

export type NamespaceProps = AzApiNamespaceProps;

export class Namespace extends AzApiNamespace {
  constructor(
    scope: import("constructs").Construct,
    id: string,
    props: NamespaceProps,
  ) {
    super(scope, id, props);
  }

  /**
   * Creates and adds an Event Hub instance to the current namespace.
   * This method adapts the interface to work with the new AzAPI-based resource group.
   */
  addEventhubInstance(props: BaseInstanceProps) {
    // The Instance class may expect a ResourceGroup with .name and .location properties.
    // The AzAPI ResourceGroup class should provide these, but if not, adapt as needed.
    return new Instance(this, props.name, {
      resourceGroup: this.resourceGroup as any,
      namespaceName: this.name,
      ...props,
    });
  }
}
