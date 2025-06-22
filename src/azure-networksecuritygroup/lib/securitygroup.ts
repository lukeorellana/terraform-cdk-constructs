import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";
import { AzureResource } from "../../core-azure/lib";

/**
 * Configuration properties for defining a security rule within an Azure Network Security Group.
 * This interface aligns with the AzAPI schema for SecurityRulePropertiesFormat.
 */
export interface SecurityRulePropertiesFormat {
  /**
   * The network traffic is allowed or denied. Possible values are 'Allow' or 'Deny'.
   */
  readonly access: string;

  /**
   * A description for this rule. Restricted to 140 chars.
   */
  readonly description?: string;

  /**
   * The destination address prefix. CIDR or destination IP range. Asterisk '*' can also be used to match all source IPs.
   * Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used.
   */
  readonly destinationAddressPrefix?: string;

  /**
   * The destination address prefixes. CIDR or destination IP ranges.
   */
  readonly destinationAddressPrefixes?: string[];

  /**
   * The application security group specified as destination.
   */
  readonly destinationApplicationSecurityGroups?: ApplicationSecurityGroup[];

  /**
   * The destination port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.
   */
  readonly destinationPortRange?: string;

  /**
   * The destination port ranges.
   */
  readonly destinationPortRanges?: string[];

  /**
   * The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic.
   * Possible values are 'Inbound' or 'Outbound'.
   */
  readonly direction: string;

  /**
   * The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection.
   * The lower the priority number, the higher the priority of the rule.
   */
  readonly priority: number;

  /**
   * Network protocol this rule applies to. Possible values are 'Tcp', 'Udp', '*' or 'Icmp'.
   */
  readonly protocol: string;

  /**
   * The CIDR or source IP range. Asterisk '*' can also be used to match all source IPs.
   * Default tags such as 'VirtualNetwork', 'AzureLoadBalancer' and 'Internet' can also be used.
   * If this is an ingress rule, specifies where network traffic originates from.
   */
  readonly sourceAddressPrefix?: string;

  /**
   * The CIDR or source IP ranges.
   */
  readonly sourceAddressPrefixes?: string[];

  /**
   * The application security group specified as source.
   */
  readonly sourceApplicationSecurityGroups?: ApplicationSecurityGroup[];

  /**
   * The source port or range. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports.
   */
  readonly sourcePortRange?: string;

  /**
   * The source port ranges.
   */
  readonly sourcePortRanges?: string[];
}

/**
 * Interface for Application Security Group.
 */
export interface ApplicationSecurityGroup {
  /**
   * Resource ID.
   */
  readonly id?: string;

  /**
   * Resource location.
   */
  readonly location?: string;

  /**
   * Properties of the application security group.
   */
  readonly properties?: ApplicationSecurityGroupPropertiesFormat;

  /**
   * Resource tags.
   */
  readonly tags?: { [key: string]: string };
}

/**
 * Properties format for Application Security Group.
 */
export interface ApplicationSecurityGroupPropertiesFormat {
  // Currently no specific properties defined in the schema
}

/**
 * Interface for Security Rule aligned with AzAPI schema.
 */
export interface SecurityRule {
  /**
   * Resource ID.
   */
  readonly id?: string;

  /**
   * The name of the resource that is unique within a resource group. This name can be used to access the resource.
   */
  readonly name?: string;

  /**
   * Properties of the security rule.
   */
  readonly properties?: SecurityRulePropertiesFormat;

  /**
   * The type of the resource.
   */
  readonly type?: string;
}

/**
 * Properties format for Network Security Group.
 */
export interface NetworkSecurityGroupPropertiesFormat {
  /**
   * When enabled, flows created from Network Security Group connections will be re-evaluated when rules are updates.
   * Initial enablement will trigger re-evaluation.
   */
  readonly flushConnection?: boolean;

  /**
   * A collection of security rules of the network security group.
   */
  readonly securityRules?: SecurityRule[];
}

/**
 * Configuration properties for defining a rule within an Azure Network Security Group.
 * This interface maintains backward compatibility with the existing RuleConfig interface.
 */
export interface RuleConfig {
  /**
   * The name of the security rule.
   */
  readonly name: string;

  /**
   * The priority of the rule. Lower numbers have higher priority. Allowed values are from 100 to 4096.
   */
  readonly priority: number;

  /**
   * The direction of the rule, which can be 'Inbound' or 'Outbound'.
   */
  readonly direction: string;

  /**
   * The access type of the rule, which determines whether the rule permits or denies traffic. Common values are 'Allow' or 'Deny'.
   */
  readonly access: string;

  /**
   * The protocol to which the rule applies, such as 'Tcp', 'Udp', or '*' (for all protocols).
   */
  readonly protocol: string;

  /**
   * The range of source ports to which the rule applies. Can be a single port or a range like '1024-2048'.
   */
  readonly sourcePortRange: string;

  /**
   * The range of destination ports to which the rule applies. Can also be a single port or a range.
   */
  readonly destinationPortRange: string;

  /**
   * The CIDR or source IP range or '*' to match any IP. This is the range of source IPs for which the rule applies.
   */
  readonly sourceAddressPrefix: string;

  /**
   * The CIDR or destination IP range or '*' to match any IP. This specifies the range of destination IPs for which the rule is applicable.
   */
  readonly destinationAddressPrefix: string;
}

/**
 * Properties for defining an Azure Network Security Group.
 */
export interface SecurityGroupProps {
  /**
   * An optional reference to the resource group in which to deploy the Network Security Group.
   * If not provided, the Network Security Group will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The Azure region in which to create the network security group, e.g., 'East US', 'West Europe'.
   */
  readonly location: string;

  /**
   * The name of the network security group. Must be unique within the resource group.
   */
  readonly name: string;

  /**
   * An array of rule configurations to be applied to the network security group.
   */
  readonly rules: RuleConfig[];

  /**
   * Optional tags for the Network Security Group resource.
   */
  readonly tags?: { [key: string]: string };
}

export class SecurityGroup extends AzureResource {
  readonly props: SecurityGroupProps;
  public id: string;
  public readonly name: string;
  public resourceGroup: ResourceGroup;

  /**
   * Represents an Azure Network Security Group (NSG).
   *
   * This class is responsible for the creation and management of an Azure Network Security Group, which acts as a virtual firewall
   * for virtual network resources. A Network Security Group contains a list of security rules that allow or deny network traffic
   * to resources connected to Azure Virtual Networks (VNet). Each rule specifies a combination of source and destination, port,
   * and protocol, and an action (allow or deny) based on those combinations. This class allows for detailed configuration of these
   * rules to enforce security policies for inbound and outbound network traffic.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the security group.
   * @param props - The properties required to configure the Network Security Group, as defined in the SecurityGroupProps interface. These include:
   *                - `resourceGroup`: Optional. Reference to the resource group for deployment.
   *                - `location`: The Azure region where the NSG will be created.
   *                - `name`: The name of the NSG, which must be unique within the resource group.
   *                - `rules`: A list of rules that define the security policies for traffic control.
   *
   * Example usage:
   * ```typescript
   * new SecurityGroup(this, 'MySecurityGroup', {
   *   resourceGroup: myResourceGroup,
   *   location: 'East US',
   *   name: 'myNsg',
   *   rules: [{
   *     name: 'AllowSSH',
   *     priority: 100,
   *     direction: 'Inbound',
   *     access: 'Allow',
   *     protocol: 'Tcp',
   *     sourcePortRange: '*',
   *     destinationPortRange: '22',
   *     sourceAddressPrefix: '*',
   *     destinationAddressPrefix: '*'
   *   }]
   * });
   * ```
   * This class initializes a Network Security Group with specified rules, handling network security management tasks efficiently.
   */
  constructor(scope: Construct, id: string, props: SecurityGroupProps) {
    super(scope, id);

    this.props = props;

    // Handle resource group setup
    if (props.resourceGroup) {
      this.resourceGroup = props.resourceGroup;
    } else {
      // Create a new resource group using our ResourceGroup class
      this.resourceGroup = new ResourceGroup(this, "rg", {
        name: `rg-${props.name}`,
        location: props.location,
        tags: props.tags,
      });
    }

    // Convert RuleConfig array to SecurityRule array for AzAPI
    const securityRules: SecurityRule[] = props.rules.map((ruleConfig) => ({
      name: ruleConfig.name,
      properties: {
        access: ruleConfig.access,
        direction: ruleConfig.direction,
        priority: ruleConfig.priority,
        protocol: ruleConfig.protocol,
        sourcePortRange: ruleConfig.sourcePortRange,
        destinationPortRange: ruleConfig.destinationPortRange,
        sourceAddressPrefix: ruleConfig.sourceAddressPrefix,
        destinationAddressPrefix: ruleConfig.destinationAddressPrefix,
      },
    }));

    // Create network security group using AzAPI
    const nsgProperties: NetworkSecurityGroupPropertiesFormat = {
      securityRules: securityRules,
    };

    const nsg = new resource.Resource(this, "nsg", {
      name: props.name,
      location: props.location,
      parentId: this.resourceGroup.resourceGroup.id,
      type: "Microsoft.Network/networkSecurityGroups@2023-11-01",
      tags: props.tags,
      body: {
        properties: nsgProperties,
      },
    });

    this.id = nsg.id;
    this.name = props.name;
  }

  /**
   * Associates this Network Security Group with a specified subnet.
   *
   * This method facilitates the attachment of the security group to a subnet, applying the security group's rules to all
   * resources within the subnet. This is crucial for managing network access and security policies at the subnet level.
   *
   * @param subnet - The subnet object to which this network security group will be associated.
   *
   * Example usage:
   * ```typescript
   * const mySubnet = { id: 'subnet-123', name: 'SubnetA' };
   * mySecurityGroup.associateToSubnet(mySubnet);
   * ```
   * This operation ensures that the security rules defined in the network security group are enforced on all network interfaces
   * attached to the specified subnet.
   */
  public associateToSubnet(subnet: { id: string; name: string }) {
    new SecurityGroupAssociations(this, subnet.name, {
      subnetId: subnet.id,
      networkSecurityGroupId: this.id,
    });
  }

  /**
   * Associates this Network Security Group with a specified network interface.
   *
   * This method attaches the security group to a network interface, applying the security group's rules to the network interface.
   * This allows for fine-grained control of network traffic to and from the specific network interface.
   *
   * @param networkInterface - The network interface object to which this network security group will be associated.
   *
   * Example usage:
   * ```typescript
   * const myNetworkInterface = { id: 'nic-456', name: 'NetworkInterfaceA' };
   * mySecurityGroup.associateToNetworkInterface(myNetworkInterface);
   * ```
   * This operation ensures that the security rules defined in the network security group are applied directly to the specified
   * network interface, controlling access in a more targeted manner.
   */
  public associateToNetworkInterface(networkInterface: {
    id: string;
    name: string;
  }) {
    new SecurityGroupAssociations(this, networkInterface.name, {
      networkInterfaceId: networkInterface.id,
      networkSecurityGroupId: this.id,
    });
  }
}

/**
 * Properties for associating Azure Network Security Groups with subnets and network interfaces.
 */
export interface SecurityGroupAssociationsProps {
  /**
   * The ID of the network security group to be associated.
   */
  readonly networkSecurityGroupId: string;

  /**
   * Optional subnet ID to associate with the network security group.
   * If provided, the security group will be associated with this subnet.
   */
  readonly subnetId?: string;

  /**
   * Optional network interface ID to associate with the network security group.
   * If provided, the security group will be associated with this network interface.
   */
  readonly networkInterfaceId?: string;
}

export class SecurityGroupAssociations extends Construct {
  /**
   * Manages the associations of Azure Network Security Groups with subnets and network interfaces.
   *
   * This class provides the functionality to associate a network security group with either subnets or network interfaces
   * within the Azure environment. By managing these associations, it helps enforce security rules at both the subnet level
   * and the network interface level, enhancing security configurations and compliance.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for the association instance.
   * @param props - The properties for the association. Includes the network security group ID and optionally a subnet ID or network interface ID.
   *
   * Example usage:
   * ```typescript
   * new SecurityGroupAssociations(this, 'MyAssociations', {
   *   networkSecurityGroupId: 'nsg-123',
   *   subnetId: 'subnet-123',
   *   networkInterfaceId: 'nic-456',
   * });
   * ```
   * Depending on the properties provided, this class will create the appropriate associations to apply the network security group
   * to the specified subnet or network interface.
   */
  constructor(
    scope: Construct,
    id: string,
    props: SecurityGroupAssociationsProps,
  ) {
    super(scope, id);

    // If subnetId is provided, create a subnet association using AzAPI
    if (props.subnetId) {
      new resource.Resource(this, "subnet-association", {
        type: "Microsoft.Network/virtualNetworks/subnets@2023-11-01",
        parentId: props.subnetId,
        body: {
          properties: {
            networkSecurityGroup: {
              id: props.networkSecurityGroupId,
            },
          },
        },
      });
    }

    // If networkInterfaceId is provided, create a network interface association using AzAPI
    if (props.networkInterfaceId) {
      new resource.Resource(this, "nic-association", {
        type: "Microsoft.Network/networkInterfaces@2023-11-01",
        parentId: props.networkInterfaceId,
        body: {
          properties: {
            networkSecurityGroup: {
              id: props.networkSecurityGroupId,
            },
          },
        },
      });
    }
  }
}
