import { Construct } from "constructs";
import {
  NetworkSecurityGroupsSecurityRules,
  NetworkSecurityGroupsSecurityRulesProps,
} from "./networksecuritygroupssecurityrules";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface NetworkSecurityGroupsProps extends IAzAPIBaseProps {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * Properties of the network security group.
   */
  properties?: NetworkSecurityGroupPropertiesFormat;
}

export interface NetworkSecurityGroupPropertiesFormat {
  /**
   * When enabled, flows created from Network Security Group connections will be re-evaluated when rules are updates. Initial enablement will trigger re-evaluation.
   */
  flushConnection?: boolean;
  /**
   * A collection of security rules of the network security group.
   */
  securityRules?: SecurityRule[];
}

export interface SecurityRule {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * The name of the resource that is unique within a resource group. This name can be used to access the resource.
   */
  name?: string;
  /**
   * Properties of the security rule.
   */
  properties?: SecurityRulePropertiesFormat;
  /**
   * The type of the resource.
   */
  type?: string;
}

export interface SecurityRulePropertiesFormat {
  /**
   * The network traffic is allowed or denied.
   */
  access: string;
  /**
   * A description for this rule. Restricted to 140 chars.
   */
  description?: string;
  /**
   * The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used.
   */
  destinationAddressPrefix?: string;
  /**
   * The destination address prefixes. CIDR or destination IP ranges.
   */
  destinationAddressPrefixes?: string[];
  /**
   * The application security group specified as destination.
   */
  destinationApplicationSecurityGroups?: ApplicationSecurityGroup[];
  /**
   * The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.
   */
  destinationPortRange?: string;
  /**
   * The destination port ranges.
   */
  destinationPortRanges?: string[];
  /**
   * The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic.
   */
  direction: string;
  /**
   * The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule.
   */
  priority: number;
  /**
   * Network protocol this rule applies to.
   */
  protocol: string;
  /**
   * The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from.
   */
  sourceAddressPrefix?: string;
  /**
   * The CIDR or source IP ranges.
   */
  sourceAddressPrefixes?: string[];
  /**
   * The application security group specified as source.
   */
  sourceApplicationSecurityGroups?: ApplicationSecurityGroup[];
  /**
   * The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.
   */
  sourcePortRange?: string;
  /**
   * The source port ranges.
   */
  sourcePortRanges?: string[];
}

export interface ApplicationSecurityGroup {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * Resource location.
   */
  location?: string;
  /**
   * Properties of the application security group.
   */
  properties?: ApplicationSecurityGroupPropertiesFormat;
  /**
   * Resource tags.
   */
  tags?: object | string | boolean | number;
}

export interface ApplicationSecurityGroupPropertiesFormat {}

export interface ApplicationSecurityGroup {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * Resource location.
   */
  location?: string;
  /**
   * Properties of the application security group.
   */
  properties?: ApplicationSecurityGroupPropertiesFormat;
  /**
   * Resource tags.
   */
  tags?: object | string | boolean | number;
}

export class NetworkSecurityGroups extends AzAPIBase {
  /**
       * Constructs a new NetworkSecurityGroups.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Network/networkSecurityGroups@2023-11-01. The properties include:
     * `id` - (Optional) Resource ID. Defaults to `string`.
     * `properties` - (Required) Properties of the network security group. Defaults to `NetworkSecurityGroupPropertiesFormat`.
     *
     * ---
     *
     * The `NetworkSecurityGroupPropertiesFormat` block supports the following:

     * `flushConnection` - (Optional) When enabled, flows created from Network Security Group connections will be re-evaluated when rules are updates. Initial enablement will trigger re-evaluation. Defaults to `boolean`.
     * `securityRules` - (Optional) A collection of security rules of the network security group. Defaults to `SecurityRule[]`.
     *
     * ---
     *
     * The `SecurityRule[]` block supports the following:

     * `id` - (Optional) Resource ID. Defaults to `string`.
     * `name` - (Optional) The name of the resource that is unique within a resource group. This name can be used to access the resource. Defaults to `string`.
     * `properties` - (Optional) Properties of the security rule. Defaults to `SecurityRulePropertiesFormat`.
     * `type` - (Optional) The type of the resource. Defaults to `string`.
     *
     * ---
     *
     * The `SecurityRulePropertiesFormat` block supports the following:

     * `access` - (Required) The network traffic is allowed or denied. Defaults to `string`.
     * `description` - (Optional) A description for this rule. Restricted to 140 chars. Defaults to `string`.
     * `destinationAddressPrefix` - (Optional) The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. Defaults to `string`.
     * `destinationAddressPrefixes` - (Optional) The destination address prefixes. CIDR or destination IP ranges. Defaults to `string[]`.
     * `destinationApplicationSecurityGroups` - (Optional) The application security group specified as destination. Defaults to `ApplicationSecurityGroup[]`.
     * `destinationPortRange` - (Optional) The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. Defaults to `string`.
     * `destinationPortRanges` - (Optional) The destination port ranges. Defaults to `string[]`.
     * `direction` - (Required) The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. Defaults to `string`.
     * `priority` - (Required) The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. Defaults to `integer`.
     * `protocol` - (Required) Network protocol this rule applies to. Defaults to `string`.
     * `sourceAddressPrefix` - (Optional) The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from. Defaults to `string`.
     * `sourceAddressPrefixes` - (Optional) The CIDR or source IP ranges. Defaults to `string[]`.
     * `sourceApplicationSecurityGroups` - (Optional) The application security group specified as source. Defaults to `ApplicationSecurityGroup[]`.
     * `sourcePortRange` - (Optional) The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. Defaults to `string`.
     * `sourcePortRanges` - (Optional) The source port ranges. Defaults to `string[]`.
     *
     * ---
     *
     * The `ApplicationSecurityGroup[]` block supports the following:

     * `id` - (Optional) Resource ID. Defaults to `string`.
     * `location` - (Optional) Resource location. Defaults to `string`.
     * `properties` - (Optional) Properties of the application security group. Defaults to `ApplicationSecurityGroupPropertiesFormat`.
     * `tags` - (Optional) Resource tags. Defaults to `object`.
     *
     * ---
     *
     * The `ApplicationSecurityGroupPropertiesFormat` block supports the following:

     *
     * ---
     *
     * The `ApplicationSecurityGroup[]` block supports the following:

     * `id` - (Optional) Resource ID. Defaults to `string`.
     * `location` - (Optional) Resource location. Defaults to `string`.
     * `properties` - (Optional) Properties of the application security group. Defaults to `ApplicationSecurityGroupPropertiesFormat`.
     * `tags` - (Optional) Resource tags. Defaults to `object`.
     *
    */
  constructor(scope: Construct, id: string, props: NetworkSecurityGroupsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Network/networkSecurityGroups@2023-11-01";
  }
  protected getResourceBody(props: NetworkSecurityGroupsProps) {
    return {
      id: props.id,
      properties: props.properties,
    };
  }
  public addNetworkSecurityGroupsSecurityRules(
    props: NetworkSecurityGroupsSecurityRulesProps,
  ): NetworkSecurityGroupsSecurityRules {
    return new NetworkSecurityGroupsSecurityRules(this, props.name, {
      name: props.name,
      parentId: this.id,
      id: props.id,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface NetworkSecurityGroupsSecurityRulesProps
  extends IAzAPIBaseProps {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * Properties of the security rule.
   */
  properties: SecurityRulePropertiesFormat;
}

export interface SecurityRulePropertiesFormat {
  /**
   * The network traffic is allowed or denied.
   */
  access: string;
  /**
   * A description for this rule. Restricted to 140 chars.
   */
  description?: string;
  /**
   * The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used.
   */
  destinationAddressPrefix?: string;
  /**
   * The destination address prefixes. CIDR or destination IP ranges.
   */
  destinationAddressPrefixes?: string[];
  /**
   * The application security group specified as destination.
   */
  destinationApplicationSecurityGroups?: ApplicationSecurityGroup[];
  /**
   * The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.
   */
  destinationPortRange?: string;
  /**
   * The destination port ranges.
   */
  destinationPortRanges?: string[];
  /**
   * The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic.
   */
  direction: string;
  /**
   * The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule.
   */
  priority: number;
  /**
   * Network protocol this rule applies to.
   */
  protocol: string;
  /**
   * The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from.
   */
  sourceAddressPrefix?: string;
  /**
   * The CIDR or source IP ranges.
   */
  sourceAddressPrefixes?: string[];
  /**
   * The application security group specified as source.
   */
  sourceApplicationSecurityGroups?: ApplicationSecurityGroup[];
  /**
   * The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.
   */
  sourcePortRange?: string;
  /**
   * The source port ranges.
   */
  sourcePortRanges?: string[];
}

export interface ApplicationSecurityGroup {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * Resource location.
   */
  location?: string;
  /**
   * Properties of the application security group.
   */
  properties?: ApplicationSecurityGroupPropertiesFormat;
  /**
   * Resource tags.
   */
  tags?: object | string | boolean | number;
}

export interface ApplicationSecurityGroupPropertiesFormat {}

export interface ApplicationSecurityGroup {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * Resource location.
   */
  location?: string;
  /**
   * Properties of the application security group.
   */
  properties?: ApplicationSecurityGroupPropertiesFormat;
  /**
   * Resource tags.
   */
  tags?: object | string | boolean | number;
}

export class NetworkSecurityGroupsSecurityRules extends AzAPIBase {
  /**
       * Constructs a new NetworkSecurityGroupsSecurityRules.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Network/networkSecurityGroups/securityRules@2023-11-01. The properties include:
     * `id` - (Optional) Resource ID. Defaults to `string`.
     * `properties` - (Required) Properties of the security rule. Defaults to `SecurityRulePropertiesFormat`.
     *
     * ---
     *
     * The `SecurityRulePropertiesFormat` block supports the following:

     * `access` - (Required) The network traffic is allowed or denied. Defaults to `string`.
     * `description` - (Optional) A description for this rule. Restricted to 140 chars. Defaults to `string`.
     * `destinationAddressPrefix` - (Optional) The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. Defaults to `string`.
     * `destinationAddressPrefixes` - (Optional) The destination address prefixes. CIDR or destination IP ranges. Defaults to `string[]`.
     * `destinationApplicationSecurityGroups` - (Optional) The application security group specified as destination. Defaults to `ApplicationSecurityGroup[]`.
     * `destinationPortRange` - (Optional) The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. Defaults to `string`.
     * `destinationPortRanges` - (Optional) The destination port ranges. Defaults to `string[]`.
     * `direction` - (Required) The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. Defaults to `string`.
     * `priority` - (Required) The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. Defaults to `integer`.
     * `protocol` - (Required) Network protocol this rule applies to. Defaults to `string`.
     * `sourceAddressPrefix` - (Optional) The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs. Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used. If this is an ingress rule, specifies where network traffic originates from. Defaults to `string`.
     * `sourceAddressPrefixes` - (Optional) The CIDR or source IP ranges. Defaults to `string[]`.
     * `sourceApplicationSecurityGroups` - (Optional) The application security group specified as source. Defaults to `ApplicationSecurityGroup[]`.
     * `sourcePortRange` - (Optional) The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. Defaults to `string`.
     * `sourcePortRanges` - (Optional) The source port ranges. Defaults to `string[]`.
     *
     * ---
     *
     * The `ApplicationSecurityGroup[]` block supports the following:

     * `id` - (Optional) Resource ID. Defaults to `string`.
     * `location` - (Optional) Resource location. Defaults to `string`.
     * `properties` - (Optional) Properties of the application security group. Defaults to `ApplicationSecurityGroupPropertiesFormat`.
     * `tags` - (Optional) Resource tags. Defaults to `object`.
     *
     * ---
     *
     * The `ApplicationSecurityGroupPropertiesFormat` block supports the following:

     *
     * ---
     *
     * The `ApplicationSecurityGroup[]` block supports the following:

     * `id` - (Optional) Resource ID. Defaults to `string`.
     * `location` - (Optional) Resource location. Defaults to `string`.
     * `properties` - (Optional) Properties of the application security group. Defaults to `ApplicationSecurityGroupPropertiesFormat`.
     * `tags` - (Optional) Resource tags. Defaults to `object`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: NetworkSecurityGroupsSecurityRulesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Network/networkSecurityGroups/securityRules@2023-11-01";
  }
  protected getResourceBody(props: NetworkSecurityGroupsSecurityRulesProps) {
    return {
      id: props.id,
      properties: props.properties,
    };
  }
}
