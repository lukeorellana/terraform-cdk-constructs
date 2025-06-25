import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup";
import { AzureResource } from "../../core-azure";

/**
 * Application Gateway SKU configuration (AzAPI schema).
 */
export interface ApplicationGatewaySku {
  /**
   * SKU name of the Application Gateway.
   */
  name: string;
  /**
   * SKU tier of the Application Gateway.
   */
  tier: string;
  /**
   * Capacity (instance count) of the Application Gateway.
   */
  capacity?: number;
}

/**
 * Application Gateway backend address pool (AzAPI schema).
 */
export interface ApplicationGatewayBackendAddressPool {
  /**
   * Name of the backend address pool.
   */
  name: string;
  /**
   * Backend addresses.
   */
  backendAddresses?: ApplicationGatewayBackendAddress[];
}

/**
 * Application Gateway backend address (AzAPI schema).
 */
export interface ApplicationGatewayBackendAddress {
  /**
   * IP address or FQDN of the backend server.
   */
  ipAddress?: string;
  /**
   * FQDN of the backend server.
   */
  fqdn?: string;
}

/**
 * Application Gateway backend HTTP settings (AzAPI schema).
 */
export interface ApplicationGatewayBackendHttpSettings {
  /**
   * Name of the backend HTTP settings.
   */
  name: string;
  /**
   * Port number for the backend servers.
   */
  port: number;
  /**
   * Protocol used to communicate with the backend servers.
   */
  protocol: string;
  /**
   * Cookie based affinity.
   */
  cookieBasedAffinity?: string;
  /**
   * Request timeout in seconds.
   */
  requestTimeout?: number;
  /**
   * Path which should be used as a prefix for all paths.
   */
  path?: string;
  /**
   * Host header to be sent to the backend servers.
   */
  hostName?: string;
  /**
   * Whether to pick host header should be picked from the host name of the backend server.
   */
  pickHostNameFromBackendAddress?: boolean;
  /**
   * Array of references to application gateway probes.
   */
  probe?: ApplicationGatewaySubResource;
  /**
   * Array of references to application gateway authentication certificates.
   */
  authenticationCertificates?: ApplicationGatewaySubResource[];
  /**
   * Array of references to application gateway trusted root certificates.
   */
  trustedRootCertificates?: ApplicationGatewaySubResource[];
  /**
   * Connection draining timeout in seconds.
   */
  connectionDraining?: ApplicationGatewayConnectionDraining;
}

/**
 * Application Gateway sub resource (AzAPI schema).
 */
export interface ApplicationGatewaySubResource {
  /**
   * Resource ID.
   */
  id: string;
}

/**
 * Application Gateway connection draining (AzAPI schema).
 */
export interface ApplicationGatewayConnectionDraining {
  /**
   * Whether connection draining is enabled or not.
   */
  enabled: boolean;
  /**
   * The number of seconds connection draining is active.
   */
  drainTimeoutInSec: number;
}

/**
 * Application Gateway frontend IP configuration (AzAPI schema).
 */
export interface ApplicationGatewayFrontendIpConfiguration {
  /**
   * Name of the frontend IP configuration.
   */
  name: string;
  /**
   * Private IP address of the frontend IP configuration.
   */
  privateIPAddress?: string;
  /**
   * The private IP address allocation method.
   */
  privateIPAllocationMethod?: string;
  /**
   * Reference to the subnet resource.
   */
  subnet?: ApplicationGatewaySubResource;
  /**
   * Reference to the PublicIP resource.
   */
  publicIPAddress?: ApplicationGatewaySubResource;
}

/**
 * Application Gateway frontend port (AzAPI schema).
 */
export interface ApplicationGatewayFrontendPort {
  /**
   * Name of the frontend port.
   */
  name: string;
  /**
   * Frontend port number.
   */
  port: number;
}

/**
 * Application Gateway HTTP listener (AzAPI schema).
 */
export interface ApplicationGatewayHttpListener {
  /**
   * Name of the HTTP listener.
   */
  name: string;
  /**
   * Frontend IP configuration of an application gateway.
   */
  frontendIPConfiguration: ApplicationGatewaySubResource;
  /**
   * Frontend port of an application gateway.
   */
  frontendPort: ApplicationGatewaySubResource;
  /**
   * Protocol of the HTTP listener.
   */
  protocol: string;
  /**
   * Host name of HTTP listener.
   */
  hostName?: string;
  /**
   * Host names of HTTP listener.
   */
  hostNames?: string[];
  /**
   * SSL certificate of an application gateway.
   */
  sslCertificate?: ApplicationGatewaySubResource;
  /**
   * SSL profile of the HTTP listener.
   */
  sslProfile?: ApplicationGatewaySubResource;
  /**
   * Whether the multi-site listener uses Server Name Indication (SNI).
   */
  requireServerNameIndication?: boolean;
  /**
   * Custom error configurations of the HTTP listener.
   */
  customErrorConfigurations?: ApplicationGatewayCustomErrorConfiguration[];
  /**
   * Reference to the FirewallPolicy resource.
   */
  firewallPolicy?: ApplicationGatewaySubResource;
}

/**
 * Application Gateway custom error configuration (AzAPI schema).
 */
export interface ApplicationGatewayCustomErrorConfiguration {
  /**
   * Status code of the application gateway custom error.
   */
  statusCode: string;
  /**
   * Error page URL of the application gateway custom error.
   */
  customErrorPageUrl: string;
}

/**
 * Application Gateway request routing rule (AzAPI schema).
 */
export interface ApplicationGatewayRequestRoutingRule {
  /**
   * Name of the request routing rule.
   */
  name: string;
  /**
   * Rule type.
   */
  ruleType: string;
  /**
   * Priority of the request routing rule.
   */
  priority?: number;
  /**
   * Backend address pool of the application gateway.
   */
  backendAddressPool?: ApplicationGatewaySubResource;
  /**
   * Backend http settings of the application gateway.
   */
  backendHttpSettings?: ApplicationGatewaySubResource;
  /**
   * Http listener of the application gateway.
   */
  httpListener: ApplicationGatewaySubResource;
  /**
   * URL path map of the application gateway.
   */
  urlPathMap?: ApplicationGatewaySubResource;
  /**
   * Redirect configuration of the application gateway.
   */
  redirectConfiguration?: ApplicationGatewaySubResource;
  /**
   * Rewrite Rule Set of the application gateway.
   */
  rewriteRuleSet?: ApplicationGatewaySubResource;
}

/**
 * Application Gateway gateway IP configuration (AzAPI schema).
 */
export interface ApplicationGatewayGatewayIpConfiguration {
  /**
   * Name of the IP configuration.
   */
  name: string;
  /**
   * Reference to the subnet resource.
   */
  subnet: ApplicationGatewaySubResource;
}

/**
 * Application Gateway identity (AzAPI schema).
 */
export interface ApplicationGatewayIdentity {
  /**
   * The type of identity used for the resource.
   */
  type: string;
  /**
   * The list of user identities associated with the resource.
   */
  userAssignedIdentities?: {
    [key: string]: ApplicationGatewayUserAssignedIdentity;
  };
}

/**
 * Application Gateway user assigned identity (AzAPI schema).
 */
export interface ApplicationGatewayUserAssignedIdentity {
  /**
   * The principal id of user assigned identity.
   */
  principalId?: string;
  /**
   * The client id of user assigned identity.
   */
  clientId?: string;
}

/**
 * Application Gateway autoscale configuration (AzAPI schema).
 */
export interface ApplicationGatewayAutoscaleConfiguration {
  /**
   * Lower bound on number of Application Gateway capacity.
   */
  minCapacity: number;
  /**
   * Upper bound on number of Application Gateway capacity.
   */
  maxCapacity?: number;
}

/**
 * Application Gateway WAF configuration (AzAPI schema).
 */
export interface ApplicationGatewayWebApplicationFirewallConfiguration {
  /**
   * Whether the web application firewall is enabled or not.
   */
  enabled: boolean;
  /**
   * Web application firewall mode.
   */
  firewallMode: string;
  /**
   * The type of the web application firewall rule set.
   */
  ruleSetType?: string;
  /**
   * The version of the rule set type.
   */
  ruleSetVersion?: string;
  /**
   * Whether allow WAF to check request Body.
   */
  requestBodyCheck?: boolean;
  /**
   * Maximum request body size in KB for WAF.
   */
  maxRequestBodySizeInKb?: number;
  /**
   * Maximum file upload size in MB for WAF.
   */
  fileUploadLimitInMb?: number;
  /**
   * The disabled rule groups.
   */
  disabledRuleGroups?: ApplicationGatewayFirewallDisabledRuleGroup[];
  /**
   * The exclusion list.
   */
  exclusions?: ApplicationGatewayFirewallExclusion[];
}

/**
 * Application Gateway firewall disabled rule group (AzAPI schema).
 */
export interface ApplicationGatewayFirewallDisabledRuleGroup {
  /**
   * The name of the rule group that will be disabled.
   */
  ruleGroupName: string;
  /**
   * The list of rules that will be disabled.
   */
  rules?: number[];
}

/**
 * Application Gateway firewall exclusion (AzAPI schema).
 */
export interface ApplicationGatewayFirewallExclusion {
  /**
   * The variable to be excluded.
   */
  matchVariable: string;
  /**
   * When matchVariable is a collection, operator used to specify which elements in the collection this exclusion applies to.
   */
  selectorMatchOperator: string;
  /**
   * When matchVariable is a collection, operate on the selector to specify which elements in the collection this exclusion applies to.
   */
  selector: string;
}

/**
 * Application Gateway properties (AzAPI schema).
 */
export interface ApplicationGatewayProperties {
  /**
   * SKU of the application gateway resource.
   */
  sku: ApplicationGatewaySku;
  /**
   * Subnets of the application gateway resource.
   */
  gatewayIPConfigurations: ApplicationGatewayGatewayIpConfiguration[];
  /**
   * Authentication certificates of the application gateway resource.
   */
  authenticationCertificates?: any[];
  /**
   * Trusted root certificates of the application gateway resource.
   */
  trustedRootCertificates?: any[];
  /**
   * Trusted client certificates of the application gateway resource.
   */
  trustedClientCertificates?: any[];
  /**
   * SSL certificates of the application gateway resource.
   */
  sslCertificates?: any[];
  /**
   * Frontend IP addresses of the application gateway resource.
   */
  frontendIPConfigurations: ApplicationGatewayFrontendIpConfiguration[];
  /**
   * Frontend ports of the application gateway resource.
   */
  frontendPorts: ApplicationGatewayFrontendPort[];
  /**
   * Probes of the application gateway resource.
   */
  probes?: any[];
  /**
   * Backend address pool of the application gateway resource.
   */
  backendAddressPools: ApplicationGatewayBackendAddressPool[];
  /**
   * Backend http settings of the application gateway resource.
   */
  backendHttpSettingsCollection: ApplicationGatewayBackendHttpSettings[];
  /**
   * Backend settings of the application gateway resource.
   */
  backendSettingsCollection?: any[];
  /**
   * Http listeners of the application gateway resource.
   */
  httpListeners: ApplicationGatewayHttpListener[];
  /**
   * Listeners of the application gateway resource.
   */
  listeners?: any[];
  /**
   * URL path map of the application gateway resource.
   */
  urlPathMaps?: any[];
  /**
   * Request routing rules of the application gateway resource.
   */
  requestRoutingRules: ApplicationGatewayRequestRoutingRule[];
  /**
   * Routing rules of the application gateway resource.
   */
  routingRules?: any[];
  /**
   * Rewrite rules for the application gateway resource.
   */
  rewriteRuleSets?: any[];
  /**
   * Redirect configurations of the application gateway resource.
   */
  redirectConfigurations?: any[];
  /**
   * Web application firewall configuration.
   */
  webApplicationFirewallConfiguration?: ApplicationGatewayWebApplicationFirewallConfiguration;
  /**
   * Reference to the FirewallPolicy resource.
   */
  firewallPolicy?: ApplicationGatewaySubResource;
  /**
   * Whether HTTP2 is enabled on the application gateway resource.
   */
  enableHttp2?: boolean;
  /**
   * Whether FIPS is enabled on the application gateway resource.
   */
  enableFips?: boolean;
  /**
   * Autoscale Configuration.
   */
  autoscaleConfiguration?: ApplicationGatewayAutoscaleConfiguration;
  /**
   * Private Link configurations on application gateway.
   */
  privateLinkConfigurations?: any[];
  /**
   * PrivateEndpointConnections on application gateway.
   */
  privateEndpointConnections?: any[];
  /**
   * Custom error configurations of the application gateway resource.
   */
  customErrorConfigurations?: ApplicationGatewayCustomErrorConfiguration[];
  /**
   * If true, associates a firewall policy with an application gateway regardless whether the policy differs from the WAF Config.
   */
  forceFirewallPolicyAssociation?: boolean;
  /**
   * Load distribution policies of the application gateway resource.
   */
  loadDistributionPolicies?: any[];
  /**
   * Global Configuration.
   */
  globalConfiguration?: any;
  /**
   * Identity for the application gateway resource.
   */
  identity?: ApplicationGatewayIdentity;
}

// Define the interface for Application Gateway properties
export interface IGatewayProps {
  /**
   * The name of the Application Gateway.
   */
  readonly name: string;

  /**
   * The location where the Application Gateway will be deployed (e.g., region).
   */
  readonly location: string;

  /**
   * An optional reference to the resource group in which to deploy the Application Gateway.
   * If not provided, the Application Gateway will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * Optional tags for the Application Gateway resource.
   */
  readonly tags?: { [key: string]: string };

  // ============================================================================
  // FLATTENED APPLICATION GATEWAY PROPERTIES
  // ============================================================================

  /**
   * The SKU tier of the Application Gateway (e.g., Standard_v2, WAF_v2).
   */
  readonly skuTier: string;

  /**
   * The size of the SKU for the Application Gateway.
   */
  readonly skuSize: string;

  /**
   * The capacity (instance count) of the Application Gateway.
   */
  readonly capacity?: number;

  /**
   * The backend address pools for the Application Gateway.
   */
  readonly backendAddressPools?: ApplicationGatewayBackendAddressPool[];

  /**
   * The backend HTTP settings for the Application Gateway.
   */
  readonly backendHttpSettings?: ApplicationGatewayBackendHttpSettings[];

  /**
   * The frontend IP configurations for the Application Gateway.
   */
  readonly frontendIpConfigurations?: ApplicationGatewayFrontendIpConfiguration[];

  /**
   * The frontend ports for the Application Gateway.
   */
  readonly frontendPorts?: ApplicationGatewayFrontendPort[];

  /**
   * The HTTP listeners for the Application Gateway.
   */
  readonly httpListeners?: ApplicationGatewayHttpListener[];

  /**
   * The request routing rules for the Application Gateway.
   */
  readonly requestRoutingRules?: ApplicationGatewayRequestRoutingRule[];

  /**
   * The gateway IP configurations (subnet associations).
   */
  readonly gatewayIpConfigurations?: ApplicationGatewayGatewayIpConfiguration[];

  /**
   * Flag to enable HTTP2.
   */
  readonly enableHttp2?: boolean;

  /**
   * Flag to enable FIPS-compliant algorithms.
   */
  readonly enableFips?: boolean;

  /**
   * Optional ID of the firewall policy.
   */
  readonly firewallPolicyId?: string;

  /**
   * Flag to enforce association of the firewall policy.
   */
  readonly forceFirewallPolicyAssociation?: boolean;

  /**
   * Optional availability zones for the Application Gateway.
   */
  readonly zones?: string[];

  /**
   * Optional autoscale configuration for dynamically adjusting the capacity of the Application Gateway.
   */
  readonly autoscaleConfiguration?: ApplicationGatewayAutoscaleConfiguration;

  /**
   * Optional custom error configurations to specify custom error pages.
   */
  readonly customErrorConfigurations?: ApplicationGatewayCustomErrorConfiguration[];

  /**
   * Optional identity for the Application Gateway, used for accessing other Azure resources.
   */
  readonly identity?: ApplicationGatewayIdentity;

  /**
   * Optional configurations for enabling Private Link on the Application Gateway.
   */
  readonly privateLinkConfigurations?: any[];

  /**
   * Optional probes for health checks of the backend HTTP settings.
   */
  readonly probes?: any[];

  /**
   * Optional configurations for redirect rules.
   */
  readonly redirectConfigurations?: any[];

  /**
   * Optional rewrite rule sets for modifying HTTP request and response headers and bodies.
   */
  readonly rewriteRuleSets?: any[];

  /**
   * Optional SSL certificates for enabling HTTPS on the Application Gateway.
   */
  readonly sslCertificates?: any[];

  /**
   * Optional SSL policy configurations, defining the protocol and cipher suites used.
   */
  readonly sslPolicy?: any;

  /**
   * Optional SSL profiles for managing SSL termination and policy settings.
   */
  readonly sslProfiles?: any[];

  /**
   * Optional trusted client certificates for mutual authentication.
   */
  readonly trustedClientCertificates?: any[];

  /**
   * Optional trusted root certificates for backend authentication.
   */
  readonly trustedRootCertificates?: any[];

  /**
   * Optional URL path map for routing based on URL paths.
   */
  readonly urlPathMaps?: any[];

  /**
   * Optional Web Application Firewall (WAF) configuration to provide enhanced security.
   */
  readonly wafConfiguration?: ApplicationGatewayWebApplicationFirewallConfiguration;

  // ============================================================================
  // LEGACY PROPERTIES (for backward compatibility)
  // ============================================================================

  /**
   * Application Gateway properties using AzAPI schema.
   * @deprecated Use the flattened properties directly instead
   */
  readonly properties?: ApplicationGatewayProperties;

  // Legacy convenience properties
  /**
   * Optional public IP address for the frontend of the Application Gateway.
   * @deprecated Use frontendIpConfigurations instead
   */
  readonly publicIpAddress?: any;

  /**
   * Optional private IP address for the frontend of the Application Gateway.
   * @deprecated Use frontendIpConfigurations instead
   */
  readonly privateIpAddress?: string;

  /**
   * Allocation method for the private IP address (e.g., Static, Dynamic).
   * @deprecated Use frontendIpConfigurations instead
   */
  readonly privateIpAddressAllocation?: string;

  /**
   * Optional subnet for the Application Gateway.
   * @deprecated Use gatewayIpConfigurations instead
   */
  readonly subnet?: any;

  /**
   * Optional tenant ID for use with Key Vault, if applicable.
   * @deprecated Use identity configuration instead
   */
  readonly tenantId?: string;

  /**
   * Optional Key Vault resource for storing SSL certificates.
   * @deprecated Use identity-based access instead
   */
  readonly keyVault?: any;

  /**
   * Optional authentication certificates for mutual authentication.
   * @deprecated Use trustedRootCertificates instead
   */
  readonly authenticationCertificate?: any[];
}

// Define the class for Azure Application Gateway
export class Gateway extends AzureResource {
  public readonly props: IGatewayProps;
  public resourceGroup: ResourceGroup;
  public id: string;
  public readonly resource: resource.Resource;

  /**
   * Constructs a new Azure Application Gateway using AzAPI.
   *
   * @param scope - The scope in which to define this construct.
   * @param id - The ID of this construct.
   * @param props - The properties for configuring the Azure Application Gateway.
   *
   * Example usage:
   * ```typescript
   * new Gateway(this, 'appGateway1', {
   *   name: 'gatewayEast',
   *   location: "eastus",
   *   skuTier: "Standard_v2",
   *   skuSize: "Standard_v2",
   *   capacity: 2,
   *   gatewayIpConfigurations: [{
   *     name: "gateway-ip-config",
   *     subnet: { id: "/subscriptions/.../subnets/gateway-subnet" }
   *   }],
   *   frontendIpConfigurations: [{
   *     name: "frontend-ip-config",
   *     publicIPAddress: { id: "/subscriptions/.../publicIPAddresses/gateway-pip" }
   *   }],
   *   frontendPorts: [{ name: "port-80", port: 80 }],
   *   backendAddressPools: [
   *     { name: "backend-pool-1", backendAddresses: [] }
   *   ],
   *   backendHttpSettings: [
   *     {
   *       name: "backend-http-setting",
   *       port: 80,
   *       protocol: "Http",
   *       requestTimeout: 20,
   *       cookieBasedAffinity: "Disabled",
   *     },
   *   ],
   *   httpListeners: [
   *     {
   *       name: "http-listener",
   *       frontendIPConfiguration: { id: "frontend-ip-config" },
   *       frontendPort: { id: "port-80" },
   *       protocol: "Http",
   *     },
   *   ],
   *   requestRoutingRules: [
   *     {
   *       name: "routing-rule-1",
   *       ruleType: "Basic",
   *       httpListener: { id: "http-listener" },
   *       backendAddressPool: { id: "backend-pool-1" },
   *       backendHttpSettings: { id: "backend-http-setting" },
   *     },
   *   ],
   * });
   * ```
   */

  constructor(scope: Construct, id: string, props: IGatewayProps) {
    super(scope, id);

    this.props = props;

    // Setup or reuse the provided resource group.
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location || "eastus",
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Build Application Gateway properties from flattened interface, supporting legacy props
    const gatewayProperties: ApplicationGatewayProperties = {
      // If properties is provided (legacy), use it as base
      ...props.properties,

      // Override with flattened properties (new interface)
      sku: {
        name: props.skuSize,
        tier: props.skuTier,
        capacity: props.capacity,
      },
      gatewayIPConfigurations:
        props.gatewayIpConfigurations ||
        props.properties?.gatewayIPConfigurations ||
        this.buildDefaultGatewayIpConfiguration(props),
      frontendIPConfigurations:
        props.frontendIpConfigurations ||
        props.properties?.frontendIPConfigurations ||
        this.buildDefaultFrontendIpConfiguration(props),
      frontendPorts:
        props.frontendPorts ||
        props.properties?.frontendPorts ||
        this.buildDefaultFrontendPorts(),
      backendAddressPools:
        props.backendAddressPools ||
        props.properties?.backendAddressPools ||
        [],
      backendHttpSettingsCollection:
        props.backendHttpSettings ||
        props.properties?.backendHttpSettingsCollection ||
        [],
      httpListeners:
        props.httpListeners || props.properties?.httpListeners || [],
      requestRoutingRules:
        props.requestRoutingRules ||
        props.properties?.requestRoutingRules ||
        [],
      enableHttp2: props.enableHttp2 ?? props.properties?.enableHttp2,
      enableFips: props.enableFips ?? props.properties?.enableFips,
      forceFirewallPolicyAssociation:
        props.forceFirewallPolicyAssociation ??
        props.properties?.forceFirewallPolicyAssociation,
      autoscaleConfiguration:
        props.autoscaleConfiguration ||
        props.properties?.autoscaleConfiguration,
      customErrorConfigurations:
        props.customErrorConfigurations ||
        props.properties?.customErrorConfigurations,
      webApplicationFirewallConfiguration:
        props.wafConfiguration ||
        props.properties?.webApplicationFirewallConfiguration,
      probes: props.probes || props.properties?.probes,
      redirectConfigurations:
        props.redirectConfigurations ||
        props.properties?.redirectConfigurations,
      rewriteRuleSets:
        props.rewriteRuleSets || props.properties?.rewriteRuleSets,
      sslCertificates:
        props.sslCertificates || props.properties?.sslCertificates,
      trustedRootCertificates:
        props.trustedRootCertificates ||
        props.properties?.trustedRootCertificates,
      trustedClientCertificates:
        props.trustedClientCertificates ||
        props.properties?.trustedClientCertificates,
      urlPathMaps: props.urlPathMaps || props.properties?.urlPathMaps,
      privateLinkConfigurations:
        props.privateLinkConfigurations ||
        props.properties?.privateLinkConfigurations,
    };

    // Handle firewall policy
    if (props.firewallPolicyId) {
      gatewayProperties.firewallPolicy = { id: props.firewallPolicyId };
    }

    // Handle identity
    if (props.identity) {
      gatewayProperties.identity = props.identity;
    }

    // Create the Application Gateway using AzAPI
    this.resource = new resource.Resource(this, "gateway", {
      type: "Microsoft.Network/applicationGateways@2023-09-01",
      name: props.name,
      location: props.location,
      parentId: this.resourceGroup.resourceGroup.id,
      tags: props.tags,
      schemaValidationEnabled: false, // Disable schema validation due to complex nested structure migration in progress
      body: {
        properties: gatewayProperties,
        zones: props.zones,
        identity: props.identity,
      },
    });

    this.id = this.resource.id;

    // Terraform Outputs
    const idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.id,
    });
    const nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.resource.name,
    });

    idOutput.overrideLogicalId("id");
    nameOutput.overrideLogicalId("name");
  }

  private buildDefaultGatewayIpConfiguration(
    props: IGatewayProps,
  ): ApplicationGatewayGatewayIpConfiguration[] {
    // Handle legacy subnet property
    if (props.subnet) {
      return [
        {
          name: `${props.name}-gateway-ip-config`,
          subnet: { id: (props.subnet as any).id },
        },
      ];
    }

    // Default subnet configuration would need to be created
    // For now, require explicit configuration
    return [
      {
        name: `${props.name}-gateway-ip-config`,
        subnet: { id: "" }, // This should be provided by the user
      },
    ];
  }

  private buildDefaultFrontendIpConfiguration(
    props: IGatewayProps,
  ): ApplicationGatewayFrontendIpConfiguration[] {
    const frontendConfigs: ApplicationGatewayFrontendIpConfiguration[] = [];

    // Handle legacy public IP property
    if (props.publicIpAddress) {
      frontendConfigs.push({
        name: "Public-frontend-ip-configuration",
        publicIPAddress: { id: (props.publicIpAddress as any).id },
      });
    }

    // Handle legacy private IP property
    if (props.privateIpAddress || props.privateIpAddressAllocation) {
      frontendConfigs.push({
        name: "Private-frontend-ip-configuration",
        privateIPAddress: props.privateIpAddress,
        privateIPAllocationMethod: props.privateIpAddressAllocation,
        subnet: props.subnet ? { id: (props.subnet as any).id } : undefined,
      });
    }

    // Default configuration if none provided
    if (frontendConfigs.length === 0) {
      frontendConfigs.push({
        name: "Default-frontend-ip-configuration",
      });
    }

    return frontendConfigs;
  }

  private buildDefaultFrontendPorts(): ApplicationGatewayFrontendPort[] {
    return [
      { name: "port-80", port: 80 },
      { name: "port-443", port: 443 },
    ];
  }
}
