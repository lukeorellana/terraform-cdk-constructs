import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup";
import { AzureResource } from "../../core-azure";

/**
 * Azure Function App SKU configuration (AzAPI schema).
 */
export interface SkuDescription {
  /**
   * Current number of instances assigned to the resource.
   */
  capacity?: number;
  /**
   * Family code of the resource SKU.
   */
  family?: string;
  /**
   * Name of the resource SKU.
   */
  name?: string;
  /**
   * Size specifier of the resource SKU.
   */
  size?: string;
  /**
   * Service tier of the resource SKU.
   */
  tier?: string;
}

/**
 * Site configuration for Function App (AzAPI schema).
 */
export interface SiteConfig {
  /**
   * true if Always On is enabled; otherwise, false.
   */
  alwaysOn?: boolean;
  /**
   * App command line to launch.
   */
  appCommandLine?: string;
  /**
   * Application settings.
   */
  appSettings?: NameValuePair[];
  /**
   * true if Auto Heal is enabled; otherwise, false.
   */
  autoHealEnabled?: boolean;
  /**
   * Connection strings.
   */
  connectionStrings?: ConnStringInfo[];
  /**
   * Default documents.
   */
  defaultDocuments?: string[];
  /**
   * true if detailed error logging is enabled; otherwise, false.
   */
  detailedErrorLoggingEnabled?: boolean;
  /**
   * Document root.
   */
  documentRoot?: string;
  /**
   * This is work around for polymorphic types.
   */
  experiments?: Experiments;
  /**
   * State of FTP / FTPS service
   */
  ftpsState?: string;
  /**
   * Maximum number of workers that a site can scale out to.
   */
  functionAppScaleLimit?: number;
  /**
   * Gets or sets a value indicating whether functions runtime scale monitoring is enabled. When enabled,
   * the ScaleController will not monitor event sources directly, but will instead call to the
   * runtime to get scale status.
   */
  functionsRuntimeScaleMonitoringEnabled?: boolean;
  /**
   * Http20Enabled: configures a web site to allow clients to connect over http2.0
   */
  http20Enabled?: boolean;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpLoggingEnabled?: boolean;
  /**
   * IP security restrictions for main.
   */
  ipSecurityRestrictions?: IpSecurityRestriction[];
  /**
   * Java container.
   */
  javaContainer?: string;
  /**
   * Java container version.
   */
  javaContainerVersion?: string;
  /**
   * Java version.
   */
  javaVersion?: string;
  /**
   * Site limits.
   */
  limits?: SiteLimits;
  /**
   * Linux App Framework and version
   */
  linuxFxVersion?: string;
  /**
   * Site load balancing.
   */
  loadBalancing?: string;
  /**
   * true to enable local MySQL; otherwise, false.
   */
  localMySqlEnabled?: boolean;
  /**
   * HTTP logs directory size limit.
   */
  logsDirectorySizeLimit?: number;
  /**
   * Managed pipeline mode.
   */
  managedPipelineMode?: string;
  /**
   * MinTlsVersion: configures the minimum version of TLS required for SSL requests
   */
  minTlsVersion?: string;
  /**
   * .NET Framework version.
   */
  netFrameworkVersion?: string;
  /**
   * Version of Node.js.
   */
  nodeVersion?: string;
  /**
   * Number of workers.
   */
  numberOfWorkers?: number;
  /**
   * Version of PHP.
   */
  phpVersion?: string;
  /**
   * Version of PowerShell.
   */
  powerShellVersion?: string;
  /**
   * Number of preWarmed instances.
   * This setting only applies to the Consumption and Elastic Plans
   */
  preWarmedInstanceCount?: number;
  /**
   * Publishing user name.
   */
  publishingUsername?: string;
  /**
   * Version of Python.
   */
  pythonVersion?: string;
  /**
   * true if remote debugging is enabled; otherwise, false.
   */
  remoteDebuggingEnabled?: boolean;
  /**
   * Remote debugging version.
   */
  remoteDebuggingVersion?: string;
  /**
   * true if request tracing is enabled; otherwise, false.
   */
  requestTracingEnabled?: boolean;
  /**
   * Request tracing expiration time.
   */
  requestTracingExpirationTime?: string;
  /**
   * IP security restrictions for scm.
   */
  scmIpSecurityRestrictions?: IpSecurityRestriction[];
  /**
   * IP security restrictions for scm to use main.
   */
  scmIpSecurityRestrictionsUseMain?: boolean;
  /**
   * ScmMinTlsVersion: configures the minimum version of TLS required for SSL requests for SCM site
   */
  scmMinTlsVersion?: string;
  /**
   * SCM type.
   */
  scmType?: string;
  /**
   * true to use 32-bit worker process; otherwise, false.
   */
  use32BitWorkerProcess?: boolean;
  /**
   * Virtual applications.
   */
  virtualApplications?: VirtualApplication[];
  /**
   * Virtual Network name.
   */
  vnetName?: string;
  /**
   * The number of private ports assigned to this app. These will be assigned dynamically on runtime.
   */
  vnetPrivatePortsCount?: number;
  /**
   * Virtual Network Route All enabled. This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied.
   */
  vnetRouteAllEnabled?: boolean;
  /**
   * true if WebSocket is enabled; otherwise, false.
   */
  webSocketsEnabled?: boolean;
  /**
   * Xenon App Framework and version
   */
  windowsFxVersion?: string;
  /**
   * Explicit Managed Service Identity Id
   */
  xManagedServiceIdentityId?: number;
}

/**
 * Name value pair.
 */
export interface NameValuePair {
  /**
   * Pair name.
   */
  name?: string;
  /**
   * Pair value.
   */
  value?: string;
}

/**
 * Database connection string information.
 */
export interface ConnStringInfo {
  /**
   * Connection string value.
   */
  connectionString?: string;
  /**
   * Name of connection string.
   */
  name?: string;
  /**
   * Type of database.
   */
  type?: string;
}

/**
 * Routing rules in production experiments.
 */
export interface Experiments {
  /**
   * List of ramp-up rules.
   */
  rampUpRules?: RampUpRule[];
}

/**
 * Routing rules for ramp up testing. This rule allows to redirect static traffic % to a slot or to gradually change routing % based on performance.
 */
export interface RampUpRule {
  /**
   * Hostname of a slot to which the traffic will be redirected if decided to. E.g. myapp-stage.azurewebsites.net.
   */
  actionHostName?: string;
  /**
   * Custom decision algorithm can be provided in TiPCallback site extension which URL can be specified. See TiPCallback site extension for the scaffold and contracts.
   * https://www.siteextensions.net/packages/TiPCallback/
   */
  changeDecisionCallbackUrl?: string;
  /**
   * Specifies interval in minutes to reevaluate ReroutePercentage.
   */
  changeIntervalInMinutes?: number;
  /**
   * In auto ramp up scenario this is the step to add/remove from ReroutePercentage until it reaches MinReroutePercentage or
   * MaxReroutePercentage. Site metrics are checked every N minutes specified in ChangeIntervalInMinutes.
   * Custom decision algorithm can be provided in TiPCallback site extension which URL can be specified in ChangeDecisionCallbackUrl.
   */
  changeStep?: number;
  /**
   * Specifies upper boundary below which ReroutePercentage will stay.
   */
  maxReroutePercentage?: number;
  /**
   * Specifies lower boundary above which ReroutePercentage will stay.
   */
  minReroutePercentage?: number;
  /**
   * Name of the routing rule. The recommended name would be to point to the slot which will receive the traffic in the experiment.
   */
  name?: string;
  /**
   * Percentage of the traffic which will be redirected to ActionHostName.
   */
  reroutePercentage?: number;
}

/**
 * IP security restriction on an app.
 */
export interface IpSecurityRestriction {
  /**
   * Allow or Deny access for this IP range.
   */
  action?: string;
  /**
   * IP restriction rule description.
   */
  description?: string;
  /**
   * IP restriction rule headers.
   * X-Forwarded-Host (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host#Examples).
   * The matching logic is ..
   * - If the property is null or empty (default), all hosts(or lack of) are allowed.
   * - A value is compared using ordinal-ignore-case (excluding port number).
   * - Subdomain wildcards are permitted but don't match the root domain. For example, *.contoso.com matches the subdomain foo.contoso.com
   *  but not the root domain contoso.com or multi-level foo.bar.contoso.com
   * - Unicode host names are allowed but are converted to Punycode for matching.
   *
   * X-Forwarded-For (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For#Examples).
   * The matching logic is ..
   * - If the property is null or empty (default), any forwarded-for chains (or lack of) are allowed.
   * - If any address (excluding port number) in the chain (comma separated) matches the CIDR defined by the property.
   *
   * X-Azure-FDID and X-FD-HealthProbe.
   * The matching logic is exact match.
   */
  headers?: object;
  /**
   * IP address the security restriction is valid for.
   * It can be in form of pure ipv4 address (required SubnetMask property) or
   * CIDR notation such as ipv4/mask (leading bit match). For CIDR,
   * SubnetMask property must not be specified.
   */
  ipAddress?: string;
  /**
   * IP restriction rule name.
   */
  name?: string;
  /**
   * Priority of IP restriction rule.
   */
  priority?: number;
  /**
   * Subnet mask for the range of IP addresses the restriction is valid for.
   */
  subnetMask?: string;
  /**
   * (internal) Subnet traffic tag
   */
  subnetTrafficTag?: number;
  /**
   * Defines what this IP filter will be used for. This is to support IP filtering on proxies.
   */
  tag?: string;
  /**
   * Virtual network resource id
   */
  vnetSubnetResourceId?: string;
  /**
   * (internal) Vnet traffic tag
   */
  vnetTrafficTag?: number;
}

/**
 * Metric limits set on an app.
 */
export interface SiteLimits {
  /**
   * Maximum allowed disk size usage in MB.
   */
  maxDiskSizeInMb?: number;
  /**
   * Maximum allowed memory usage in MB.
   */
  maxMemoryInMb?: number;
  /**
   * Maximum allowed CPU usage percentage.
   */
  maxPercentageCpu?: number;
}

/**
 * Virtual application in an app.
 */
export interface VirtualApplication {
  /**
   * Physical path.
   */
  physicalPath?: string;
  /**
   * true if preloading is enabled; otherwise, false.
   */
  preloadEnabled?: boolean;
  /**
   * Virtual directories for virtual application.
   */
  virtualDirectories?: VirtualDirectory[];
  /**
   * Virtual path.
   */
  virtualPath?: string;
}

/**
 * Directory for virtual application.
 */
export interface VirtualDirectory {
  /**
   * Physical path.
   */
  physicalPath?: string;
  /**
   * Path to virtual application.
   */
  virtualPath?: string;
}

/**
 * Managed service identity.
 */
export interface ManagedServiceIdentity {
  /**
   * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed).
   */
  type: string;
  /**
   * The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests.
   */
  userAssignedIdentities?: { [key: string]: UserAssignedIdentity };
}

/**
 * User assigned identity properties
 */
export interface UserAssignedIdentity {
  /**
   * The client ID of the assigned identity.
   */
  clientId?: string;
  /**
   * The principal ID of the assigned identity.
   */
  principalId?: string;
}

/**
 * Function App properties (AzAPI schema).
 */
export interface SiteProperties {
  /**
   * Management information availability state for the app.
   */
  availabilityState?: string;
  /**
   * true to enable client affinity; false to stop sending session affinity cookies, which route client requests in the same session to the same instance. Default is true.
   */
  clientAffinityEnabled?: boolean;
  /**
   * true to enable client certificate authentication (TLS mutual authentication); otherwise, false. Default is false.
   */
  clientCertEnabled?: boolean;
  /**
   * client certificate authentication comma-separated exclusion paths
   */
  clientCertExclusionPaths?: string;
  /**
   * This composes with ClientCertEnabled setting.
   * - ClientCertEnabled: false means ClientCert is ignored.
   * - ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.
   * - ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.
   */
  clientCertMode?: string;
  /**
   * Size of the function container.
   */
  containerSize?: number;
  /**
   * Maximum allowed daily memory-time quota (applicable on dynamic apps only).
   */
  dailyMemoryTimeQuota?: number;
  /**
   * true if the app is enabled; otherwise, false. Setting this value to false disables the app (takes the app offline).
   */
  enabled?: boolean;
  /**
   * Hostname SSL states are used to manage the SSL bindings for app's hostnames.
   */
  hostNameSslStates?: HostNameSslState[];
  /**
   * true to disable the public hostnames of the app; otherwise, false.
   *  If true, the app is only accessible via API management process.
   */
  hostNamesDisabled?: boolean;
  /**
   * App Service Environment to use for the app.
   */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /**
   * Hyper-V sandbox.
   */
  hyperV?: boolean;
  /**
   * Site is a default container.
   */
  isDefaultContainer?: boolean;
  /**
   * true if the app is a default container; otherwise, false.
   */
  isXenon?: boolean;
  /**
   * Identity to use for Key Vault Reference authentication.
   */
  keyVaultReferenceIdentity?: string;
  /**
   * Last time the app was modified, in UTC. Read-only.
   */
  lastModifiedTimeUtc?: string;
  /**
   * Maximum number of workers.
   * This only applies to Functions container.
   */
  maxNumberOfWorkers?: number;
  /**
   * List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from tenants that site can be hosted with current settings. Read-only.
   */
  outboundIpAddresses?: string;
  /**
   * List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from all tenants except dataComponent. Read-only.
   */
  possibleOutboundIpAddresses?: string;
  /**
   * Property to allow or block all public traffic.
   */
  publicNetworkAccess?: string;
  /**
   * true if reserved; otherwise, false.
   */
  reserved?: boolean;
  /**
   * true to stop SCM (KUDU) site when the app is stopped; otherwise, false. The default is false.
   */
  scmSiteAlsoStopped?: boolean;
  /**
   * Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}".
   */
  serverFarmId?: string;
  /**
   * Configuration of the app.
   */
  siteConfig?: SiteConfig;
  /**
   * Current state of the app.
   */
  state?: string;
  /**
   * App suspended till in case memory-time quota is exceeded.
   */
  suspendedTill?: string;
  /**
   * Specifies which deployment slot this app will swap into. Read-only.
   */
  targetSwapSlot?: string;
  /**
   * Azure Traffic Manager hostnames associated with the app. Read-only.
   */
  trafficManagerHostNames?: string[];
  /**
   * State indicating whether the app has exceeded its quota usage. Read-only.
   */
  usageState?: string;
  /**
   * Virtual Network Profile
   */
  virtualNetworkSubnetId?: string;
  /**
   * To enable accessing content over virtual network
   */
  vnetContentShareEnabled?: boolean;
  /**
   * To enable pulling image over Virtual Network
   */
  vnetImagePullEnabled?: boolean;
  /**
   * Virtual Network Route All enabled. This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied.
   */
  vnetRouteAllEnabled?: boolean;
}

/**
 * SSL-enabled hostname.
 */
export interface HostNameSslState {
  /**
   * Indicates whether the hostname is a standard or repository hostname.
   */
  hostType?: string;
  /**
   * Hostname.
   */
  name?: string;
  /**
   * SSL type.
   */
  sslState?: string;
  /**
   * SSL certificate thumbprint.
   */
  thumbprint?: string;
  /**
   * Set to true to update existing hostname.
   */
  toUpdate?: boolean;
  /**
   * Virtual IP address assigned to the hostname if IP based SSL is enabled.
   */
  virtualIp?: string;
}

/**
 * Specification for an App Service Environment to use for this resource.
 */
export interface HostingEnvironmentProfile {
  /**
   * Resource ID of the App Service Environment.
   */
  id?: string;
}

/**
 * Properties for the Function App (flattened interface to hide AzAPI details).
 */
export interface FunctionAppProps {
  /**
   * The name of the Function App.
   */
  readonly name: string;

  /**
   * The Azure Region where the Function App will be deployed.
   */
  readonly location: string;

  /**
   * Optional reference to the resource group.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * Optional tags for the Function App.
   */
  readonly tags?: { [key: string]: string };

  /**
   * Optional lifecycle rules to ignore changes.
   */
  readonly ignoreChanges?: string[];

  // Flattened Function App configuration properties
  /**
   * AzAPI: Kind of resource.
   */
  readonly kind?: string;

  /**
   * true if the app is enabled; otherwise, false.
   */
  readonly enabled?: boolean;

  /**
   * true to enforce HTTPS only traffic.
   */
  readonly httpsOnly?: boolean;

  /**
   * true to enable client certificate authentication (TLS mutual authentication).
   */
  readonly clientCertEnabled?: boolean;

  /**
   * client certificate authentication comma-separated exclusion paths
   */
  readonly clientCertExclusionPaths?: string;

  /**
   * Client certificate mode: Required, Optional, or OptionalInteractiveUser.
   */
  readonly clientCertMode?: string;

  /**
   * Size of the function container.
   */
  readonly containerSize?: number;

  /**
   * Maximum allowed daily memory-time quota (applicable on dynamic apps only).
   */
  readonly dailyMemoryTimeQuota?: number;

  /**
   * true to disable the public hostnames of the app.
   */
  readonly hostNamesDisabled?: boolean;

  /**
   * Hyper-V sandbox.
   */
  readonly hyperV?: boolean;

  /**
   * Identity to use for Key Vault Reference authentication.
   */
  readonly keyVaultReferenceIdentity?: string;

  /**
   * Maximum number of workers.
   */
  readonly maxNumberOfWorkers?: number;

  /**
   * Property to allow or block all public traffic.
   */
  readonly publicNetworkAccess?: string;

  /**
   * true if reserved; otherwise, false.
   */
  readonly reserved?: boolean;

  /**
   * true to stop SCM (KUDU) site when the app is stopped.
   */
  readonly scmSiteAlsoStopped?: boolean;

  /**
   * Resource ID of the associated App Service plan.
   */
  readonly serverFarmId?: string;

  // Flattened SiteConfig properties
  /**
   * true if Always On is enabled; otherwise, false.
   */
  readonly alwaysOn?: boolean;

  /**
   * App command line to launch.
   */
  readonly appCommandLine?: string;

  /**
   * Application settings.
   */
  readonly appSettings?: NameValuePair[];

  /**
   * true if Auto Heal is enabled; otherwise, false.
   */
  readonly autoHealEnabled?: boolean;

  /**
   * Connection strings.
   */
  readonly connectionStrings?: ConnStringInfo[];

  /**
   * Default documents.
   */
  readonly defaultDocuments?: string[];

  /**
   * true if detailed error logging is enabled; otherwise, false.
   */
  readonly detailedErrorLoggingEnabled?: boolean;

  /**
   * Document root.
   */
  readonly documentRoot?: string;

  /**
   * State of FTP / FTPS service
   */
  readonly ftpsState?: string;

  /**
   * Maximum number of workers that a site can scale out to.
   */
  readonly functionAppScaleLimit?: number;

  /**
   * Gets or sets a value indicating whether functions runtime scale monitoring is enabled.
   */
  readonly functionsRuntimeScaleMonitoringEnabled?: boolean;

  /**
   * Http20Enabled: configures a web site to allow clients to connect over http2.0
   */
  readonly http20Enabled?: boolean;

  /**
   * HttpsOnly: configures a web site to accept only https requests.
   */
  readonly httpLoggingEnabled?: boolean;

  /**
   * IP security restrictions for main.
   */
  readonly ipSecurityRestrictions?: IpSecurityRestriction[];

  /**
   * Java container.
   */
  readonly javaContainer?: string;

  /**
   * Java container version.
   */
  readonly javaContainerVersion?: string;

  /**
   * Java version.
   */
  readonly javaVersion?: string;

  /**
   * Site limits.
   */
  readonly limits?: SiteLimits;

  /**
   * Linux App Framework and version
   */
  readonly linuxFxVersion?: string;

  /**
   * Site load balancing.
   */
  readonly loadBalancing?: string;

  /**
   * true to enable local MySQL; otherwise, false.
   */
  readonly localMySqlEnabled?: boolean;

  /**
   * HTTP logs directory size limit.
   */
  readonly logsDirectorySizeLimit?: number;

  /**
   * Managed pipeline mode.
   */
  readonly managedPipelineMode?: string;

  /**
   * MinTlsVersion: configures the minimum version of TLS required for SSL requests
   */
  readonly minTlsVersion?: string;

  /**
   * .NET Framework version.
   */
  readonly netFrameworkVersion?: string;

  /**
   * Version of Node.js.
   */
  readonly nodeVersion?: string;

  /**
   * Number of workers.
   */
  readonly numberOfWorkers?: number;

  /**
   * Version of PHP.
   */
  readonly phpVersion?: string;

  /**
   * Version of PowerShell.
   */
  readonly powerShellVersion?: string;

  /**
   * Number of preWarmed instances.
   */
  readonly preWarmedInstanceCount?: number;

  /**
   * Publishing user name.
   */
  readonly publishingUsername?: string;

  /**
   * Version of Python.
   */
  readonly pythonVersion?: string;

  /**
   * true if remote debugging is enabled; otherwise, false.
   */
  readonly remoteDebuggingEnabled?: boolean;

  /**
   * Remote debugging version.
   */
  readonly remoteDebuggingVersion?: string;

  /**
   * true if request tracing is enabled; otherwise, false.
   */
  readonly requestTracingEnabled?: boolean;

  /**
   * Request tracing expiration time.
   */
  readonly requestTracingExpirationTime?: string;

  /**
   * IP security restrictions for scm.
   */
  readonly scmIpSecurityRestrictions?: IpSecurityRestriction[];

  /**
   * IP security restrictions for scm to use main.
   */
  readonly scmIpSecurityRestrictionsUseMain?: boolean;

  /**
   * ScmMinTlsVersion: configures the minimum version of TLS required for SSL requests for SCM site
   */
  readonly scmMinTlsVersion?: string;

  /**
   * The action to take when an unauthenticated client attempts to access the app.
   */
  readonly unauthenticatedClientAction?: string;

  /**
   * true to use 32-bit worker process; otherwise, false.
   */
  readonly use32BitWorkerProcess?: boolean;

  /**
   * Virtual applications.
   */
  readonly virtualApplications?: VirtualApplication[];

  /**
   * Virtual Network name.
   */
  readonly vnetName?: string;

  /**
   * Virtual Network Route All enabled. This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied.
   */
  readonly vnetRouteAllEnabled?: boolean;

  /**
   * true if WebSocket is enabled; otherwise, false.
   */
  readonly webSocketsEnabled?: boolean;

  /**
   * Xenon App Framework and version.
   */
  readonly windowsFxVersion?: string;

  /**
   * Explicit Managed Service Identity
   */
  readonly identity?: ManagedServiceIdentity;

  // Legacy properties for backward compatibility
  /**
   * Optional runtime version specification for the Function App.
   * @deprecated Use specific version properties instead
   */
  readonly runtimeVersion?: any;

  /**
   * Optional ID of an existing App Service Plan.
   * @deprecated Use serverFarmId instead
   */
  readonly servicePlan?: any;

  /**
   * Optional SKU for the App Service Plan.
   * @deprecated Use separate service plan resource instead
   */
  readonly servicePlanSku?: string;

  /**
   * Optional storage account to be used by the Function App.
   * @deprecated Use appSettings to configure storage instead
   */
  readonly storageAccount?: any;

  /**
   * Optional site configuration.
   * @deprecated Use flattened properties instead
   */
  readonly siteConfig?: any;

  /**
   * Optional authentication settings.
   * @deprecated Use separate auth resources instead
   */
  readonly authSettings?: any;

  /**
   * Optional flag to enforce HTTPS only traffic.
   * @deprecated Use httpsOnly instead
   */
  readonly clientCertificateEnabled?: boolean;

  /**
   * Optional mode for client certificate requirement.
   * @deprecated Use clientCertMode instead
   */
  readonly clientCertificateMode?: string;

  /**
   * Optional version setting for the Azure Functions runtime.
   * @deprecated Use appSettings instead
   */
  readonly functionsExtensionVersion?: string;

  /**
   * Optional flag to enable built-in logging capabilities.
   * @deprecated Use appSettings instead
   */
  readonly builtinLoggingEnabled?: boolean;

  /**
   * Optional connection strings.
   * @deprecated Use connectionStrings instead
   */
  readonly connectionString?: any[];

  /**
   * AzAPI: Site properties.
   * @deprecated Use flattened properties instead
   */
  readonly properties?: SiteProperties;
}

export class FunctionApp extends AzureResource {
  public readonly resource: resource.Resource;
  public readonly resourceGroup: ResourceGroup;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;
  public readonly locationOutput: cdktf.TerraformOutput;
  public readonly defaultHostnameOutput: cdktf.TerraformOutput;

  /**
   * Represents an Azure Function App using AzAPI.
   *
   * This class is responsible for the creation and management of an Azure Function App using the AzAPI provider.
   * It provides compatibility with both legacy properties and new AzAPI schema.
   *
   * @param scope - The scope in which to define this construct.
   * @param id - The unique identifier for this instance of the Function App.
   * @param props - Properties for configuring the Function App.
   */
  constructor(scope: Construct, id: string, props: FunctionAppProps) {
    super(scope, id);

    const defaults = {
      name: props.name || `func-${this.node.path.split("/")[0]}`,
      location: props.location || "eastus",
    };

    // Create or use existing resource group
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        name: `rg-${defaults.name}`,
        location: defaults.location,
        tags: props.tags,
      });

    // Build SiteConfig from flattened properties
    const siteConfig: SiteConfig = {
      // Use flattened properties first, then fall back to legacy siteConfig or properties.siteConfig
      alwaysOn: props.alwaysOn ?? props.siteConfig?.alwaysOn ?? props.properties?.siteConfig?.alwaysOn,
      appCommandLine: props.appCommandLine ?? props.siteConfig?.appCommandLine ?? props.properties?.siteConfig?.appCommandLine,
      appSettings: props.appSettings ?? props.siteConfig?.appSettings ?? props.properties?.siteConfig?.appSettings,
      autoHealEnabled: props.autoHealEnabled ?? props.siteConfig?.autoHealEnabled ?? props.properties?.siteConfig?.autoHealEnabled,
      connectionStrings: props.connectionStrings ?? props.siteConfig?.connectionStrings ?? props.properties?.siteConfig?.connectionStrings,
      defaultDocuments: props.defaultDocuments ?? props.siteConfig?.defaultDocuments ?? props.properties?.siteConfig?.defaultDocuments,
      detailedErrorLoggingEnabled: props.detailedErrorLoggingEnabled ?? props.siteConfig?.detailedErrorLoggingEnabled ?? props.properties?.siteConfig?.detailedErrorLoggingEnabled,
      documentRoot: props.documentRoot ?? props.siteConfig?.documentRoot ?? props.properties?.siteConfig?.documentRoot,
      ftpsState: props.ftpsState ?? props.siteConfig?.ftpsState ?? props.properties?.siteConfig?.ftpsState,
      functionAppScaleLimit: props.functionAppScaleLimit ?? props.siteConfig?.functionAppScaleLimit ?? props.properties?.siteConfig?.functionAppScaleLimit,
      functionsRuntimeScaleMonitoringEnabled: props.functionsRuntimeScaleMonitoringEnabled ?? props.siteConfig?.functionsRuntimeScaleMonitoringEnabled ?? props.properties?.siteConfig?.functionsRuntimeScaleMonitoringEnabled,
      http20Enabled: props.http20Enabled ?? props.siteConfig?.http20Enabled ?? props.properties?.siteConfig?.http20Enabled,
      httpLoggingEnabled: props.httpLoggingEnabled ?? props.siteConfig?.httpLoggingEnabled ?? props.properties?.siteConfig?.httpLoggingEnabled,
      ipSecurityRestrictions: props.ipSecurityRestrictions ?? props.siteConfig?.ipSecurityRestrictions ?? props.properties?.siteConfig?.ipSecurityRestrictions,
      javaContainer: props.javaContainer ?? props.siteConfig?.javaContainer ?? props.properties?.siteConfig?.javaContainer,
      javaContainerVersion: props.javaContainerVersion ?? props.siteConfig?.javaContainerVersion ?? props.properties?.siteConfig?.javaContainerVersion,
      javaVersion: props.javaVersion ?? props.siteConfig?.javaVersion ?? props.properties?.siteConfig?.javaVersion,
      limits: props.limits ?? props.siteConfig?.limits ?? props.properties?.siteConfig?.limits,
      linuxFxVersion: props.linuxFxVersion ?? props.siteConfig?.linuxFxVersion ?? props.properties?.siteConfig?.linuxFxVersion,
      loadBalancing: props.loadBalancing ?? props.siteConfig?.loadBalancing ?? props.properties?.siteConfig?.loadBalancing,
      localMySqlEnabled: props.localMySqlEnabled ?? props.siteConfig?.localMySqlEnabled ?? props.properties?.siteConfig?.localMySqlEnabled,
      logsDirectorySizeLimit: props.logsDirectorySizeLimit ?? props.siteConfig?.logsDirectorySizeLimit ?? props.properties?.siteConfig?.logsDirectorySizeLimit,
      managedPipelineMode: props.managedPipelineMode ?? props.siteConfig?.managedPipelineMode ?? props.properties?.siteConfig?.managedPipelineMode,
      minTlsVersion: props.minTlsVersion ?? props.siteConfig?.minTlsVersion ?? props.properties?.siteConfig?.minTlsVersion,
      netFrameworkVersion: props.netFrameworkVersion ?? props.siteConfig?.netFrameworkVersion ?? props.properties?.siteConfig?.netFrameworkVersion,
      nodeVersion: props.nodeVersion ?? props.siteConfig?.nodeVersion ?? props.properties?.siteConfig?.nodeVersion,
      numberOfWorkers: props.numberOfWorkers ?? props.siteConfig?.numberOfWorkers ?? props.properties?.siteConfig?.numberOfWorkers,
      phpVersion: props.phpVersion ?? props.siteConfig?.phpVersion ?? props.properties?.siteConfig?.phpVersion,
      powerShellVersion: props.powerShellVersion ?? props.siteConfig?.powerShellVersion ?? props.properties?.siteConfig?.powerShellVersion,
      preWarmedInstanceCount: props.preWarmedInstanceCount ?? props.siteConfig?.preWarmedInstanceCount ?? props.properties?.siteConfig?.preWarmedInstanceCount,
      publishingUsername: props.publishingUsername ?? props.siteConfig?.publishingUsername ?? props.properties?.siteConfig?.publishingUsername,
      pythonVersion: props.pythonVersion ?? props.siteConfig?.pythonVersion ?? props.properties?.siteConfig?.pythonVersion,
      remoteDebuggingEnabled: props.remoteDebuggingEnabled ?? props.siteConfig?.remoteDebuggingEnabled ?? props.properties?.siteConfig?.remoteDebuggingEnabled,
      remoteDebuggingVersion: props.remoteDebuggingVersion ?? props.siteConfig?.remoteDebuggingVersion ?? props.properties?.siteConfig?.remoteDebuggingVersion,
      requestTracingEnabled: props.requestTracingEnabled ?? props.siteConfig?.requestTracingEnabled ?? props.properties?.siteConfig?.requestTracingEnabled,
      requestTracingExpirationTime: props.requestTracingExpirationTime ?? props.siteConfig?.requestTracingExpirationTime ?? props.properties?.siteConfig?.requestTracingExpirationTime,
      scmIpSecurityRestrictions: props.scmIpSecurityRestrictions ?? props.siteConfig?.scmIpSecurityRestrictions ?? props.properties?.siteConfig?.scmIpSecurityRestrictions,
      scmIpSecurityRestrictionsUseMain: props.scmIpSecurityRestrictionsUseMain ?? props.siteConfig?.scmIpSecurityRestrictionsUseMain ?? props.properties?.siteConfig?.scmIpSecurityRestrictionsUseMain,
      scmMinTlsVersion: props.scmMinTlsVersion ?? props.siteConfig?.scmMinTlsVersion ?? props.properties?.siteConfig?.scmMinTlsVersion,
      use32BitWorkerProcess: props.use32BitWorkerProcess ?? props.siteConfig?.use32BitWorkerProcess ?? props.properties?.siteConfig?.use32BitWorkerProcess,
      virtualApplications: props.virtualApplications ?? props.siteConfig?.virtualApplications ?? props.properties?.siteConfig?.virtualApplications,
      vnetName: props.vnetName ?? props.siteConfig?.vnetName ?? props.properties?.siteConfig?.vnetName,
      vnetRouteAllEnabled: props.vnetRouteAllEnabled ?? props.siteConfig?.vnetRouteAllEnabled ?? props.properties?.siteConfig?.vnetRouteAllEnabled,
      webSocketsEnabled: props.webSocketsEnabled ?? props.siteConfig?.webSocketsEnabled ?? props.properties?.siteConfig?.webSocketsEnabled,
      windowsFxVersion: props.windowsFxVersion ?? props.siteConfig?.windowsFxVersion ?? props.properties?.siteConfig?.windowsFxVersion,
    };

    // Build SiteProperties from flattened properties and legacy properties
    const siteProperties: SiteProperties = {
      // Start with legacy properties if provided
      ...props.properties,
      // Override with flattened properties if provided
      enabled: props.enabled ?? props.properties?.enabled ?? true,
      httpsOnly: props.httpsOnly ?? props.properties?.httpsOnly,
      clientCertEnabled: props.clientCertEnabled ?? props.clientCertificateEnabled ?? props.properties?.clientCertEnabled,
      clientCertExclusionPaths: props.clientCertExclusionPaths ?? props.properties?.clientCertExclusionPaths,
      clientCertMode: props.clientCertMode ?? props.clientCertificateMode ?? props.properties?.clientCertMode,
      containerSize: props.containerSize ?? props.properties?.containerSize,
      dailyMemoryTimeQuota: props.dailyMemoryTimeQuota ?? props.properties?.dailyMemoryTimeQuota,
      hostNamesDisabled: props.hostNamesDisabled ?? props.properties?.hostNamesDisabled,
      hyperV: props.hyperV ?? props.properties?.hyperV,
      keyVaultReferenceIdentity: props.keyVaultReferenceIdentity ?? props.properties?.keyVaultReferenceIdentity,
      maxNumberOfWorkers: props.maxNumberOfWorkers ?? props.properties?.maxNumberOfWorkers,
      publicNetworkAccess: props.publicNetworkAccess ?? props.properties?.publicNetworkAccess,
      reserved: props.reserved ?? props.properties?.reserved,
      scmSiteAlsoStopped: props.scmSiteAlsoStopped ?? props.properties?.scmSiteAlsoStopped,
      serverFarmId: props.serverFarmId ?? props.properties?.serverFarmId,
      siteConfig: siteConfig,
    };

    // Handle legacy identity mapping
    let identity: ManagedServiceIdentity | undefined;
    if (props.identity) {
      if (typeof props.identity === "object" && "type" in props.identity) {
        // Already in AzAPI format
        identity = props.identity as ManagedServiceIdentity;
      } else {
        // Legacy format, convert to AzAPI
        identity = {
          type: (props.identity as any).type || "SystemAssigned",
          userAssignedIdentities: (props.identity as any)
            .userAssignedIdentities,
        };
      }
    }

    // Create the Function App using AzAPI
    this.resource = new resource.Resource(this, "functionapp", {
      type: "Microsoft.Web/sites@2023-12-01",
      name: defaults.name,
      location: defaults.location,
      parentId: this.resourceGroup.resourceGroup.id,
      body: {
        kind: props.kind || "functionapp,linux",
        properties: siteProperties,
        identity: identity,
      },
      tags: props.tags,
    });

    // Handle lifecycle
    if (props.ignoreChanges && props.ignoreChanges.length > 0) {
      this.resource.addOverride("lifecycle", [
        {
          ignore_changes: props.ignoreChanges,
        },
      ]);
    }

    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.resource.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.resource.name,
    });
    this.locationOutput = new cdktf.TerraformOutput(this, "location", {
      value: this.resource.location,
    });
    this.defaultHostnameOutput = new cdktf.TerraformOutput(
      this,
      "default_hostname",
      {
        value: this.resource.output,
      },
    );

    // Override logical IDs to match original names
    this.idOutput.overrideLogicalId("id");
    this.nameOutput.overrideLogicalId("name");
    this.locationOutput.overrideLogicalId("location");
    this.defaultHostnameOutput.overrideLogicalId("default_hostname");
  }

  /**
   * Get the Function App ID.
   */
  public get functionAppId(): string {
    return this.resource.id;
  }

  /**
   * Get the Function App name.
   */
  public get name(): string {
    return this.resource.name;
  }

  /**
   * Get the Function App location.
   */
  public get location(): string {
    return this.resource.location;
  }

  /**
   * Get the default hostname of the Function App.
   */
  public get defaultHostname(): any {
    return this.resource.output;
  }
}
