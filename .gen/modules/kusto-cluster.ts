// generated by cdktf get
// Azure/avm-res-kusto-cluster/azurerm
import { TerraformModule, TerraformModuleUserConfig } from 'cdktf';
import { Construct } from 'constructs';
export interface KustoClusterConfig extends TerraformModuleUserConfig {
  /**
  * (Optional) List of allowed FQDNs(Fully Qualified Domain Name) for egress from Cluster.
  */
  readonly allowedFqdns?: string[];
  /**
  * (Optional) The list of ips in the format of CIDR allowed to connect to the cluster.
  */
  readonly allowedIpRanges?: string[];
  /**
  * (Optional) Specifies if the cluster could be automatically stopped 
(due to lack of data or no activity for many days). 

Defaults to true.

  * true
  */
  readonly autoStopEnabled?: boolean;
  /**
  * Customer managed keys that should be associated with the resource.
  * [object Object]
  */
  readonly customerManagedKey?: any;
  /**
  * (Optional) A map of kusto database objects:

- `name` - (Required) The name of the Kusto Database to create. Changing this forces a new resource to be created.
- `location` - (Optional) The location where the Kusto Database should be created. If not provided, will default to the location of the kusto cluster. Changing this forces a new resource to be created.
- `resource_group_name` - (Optional) Specifies the Resource Group where the Kusto Database should exist. If not provided, will default to the location of the kusto cluster. Changing this forces a new resource to be created.
- `cluster_name` - (Optional) Specifies the name of the Kusto Cluster this database will be added to. If not provided, will default to the location of the kusto cluster. Changing this forces a new resource to be created.
- `hot_cache_period` - (Optional) The time the data that should be kept in cache for fast queries as ISO 8601 timespan. Default is unlimited. For more information see: ISO 8601 Timespan.
- `soft_delete_period` - (Optional) The time the data should be kept before it stops being accessible to queries as ISO 8601 timespan. Default is unlimited. For more information see: ISO 8601 Timespan

  * [object Object]
  */
  readonly databases?: any;
  /**
  * A map of diagnostic settings to create on the Key Vault. The map key is deliberately arbitrary to avoid issues where map keys maybe unknown at plan time.

- `event_hub_authorization_rule_resource_id` - (Optional) The resource ID of the event hub authorization rule to send logs and metrics to.
- `event_hub_name` - (Optional) The name of the event hub. If none is specified, the default event hub will be selected.
- `log_analytics_destination_type` - (Optional) The destination type for the diagnostic setting. Possible values are `Dedicated` and `AzureDiagnostics`. Defaults to `Dedicated`.
- `log_categories` - (Optional) A set of log categories to send to the log analytics workspace. Defaults to `[]`.
- `log_groups` - (Optional) A set of log groups to send to the log analytics workspace. Defaults to `["allLogs"]`.
- `marketplace_partner_resource_id` - (Optional) The full ARM resource ID of the Marketplace resource to which you would like to send Diagnostic LogsLogs.
- `metric_categories` - (Optional) A set of metric categories to send to the log analytics workspace. Defaults to `["AllMetrics"]`.
- `name` - (Optional) The name of the diagnostic setting. One will be generated if not set, however this will not be unique if you want to create multiple diagnostic setting resources.
- `storage_account_resource_id` - (Optional) The resource ID of the storage account to send logs and metrics to.
- `workspace_resource_id` - (Optional) The resource ID of the log analytics workspace to send logs and metrics to.

  * [object Object]
  */
  readonly diagnosticSettings?: any;
  /**
  * (Optional) Specifies if the cluster's disks are encrypted.
  * true
  */
  readonly diskEncryptionEnabled?: boolean;
  /**
  * (Optional) Is the cluster's double encryption enabled? Changing this forces a new resource to be created.
  */
  readonly doubleEncryptionEnabled?: boolean;
  /**
  * This variable controls whether or not telemetry is enabled for the module.
For more information see <https://aka.ms/avm/telemetryinfo>.
If it is set to false, then no telemetry will be collected.

  * true
  */
  readonly enableTelemetry?: boolean;
  /**
  * A map that manages a Kusto Cluster Principal Assignment.

- `name` (Required) The name of the Kusto cluster principal assignment. Changing this forces a new resource to be created.
- `principal_id` (Required) The object id of the principal. Changing this forces a new resource to be created.
- `principal_type` (Required) The type of the principal. Valid values include App, Group, User. Changing this forces a new resource to be created.
- `role` (Required) The cluster role assigned to the principal. Valid values include AllDatabasesAdmin and AllDatabasesViewer. Changing this forces a new resource to be created.
- `tenant_id` (Required) The tenant id in which the principal resides. Changing this forces a new resource to be created.

  * [object Object]
  */
  readonly kustoClusterPrincipalAssignments?: any;
  /**
  * A map that manages a Kusto (also known as Azure Data Explorer) Database Principal Assignment.

- `database_name` (Required) The name of the database in which to create the resource. Changing this forces a new resource to be created.
- `name` (Required) The name of the Kusto cluster principal assignment. Changing this forces a new resource to be created.
- `principal_id` (Required) The object id of the principal. Changing this forces a new resource to be created.
- `principal_type` (Required) The type of the principal. Valid values include App, Group, User. Changing this forces a new resource to be created.
- `role` (Required) The cluster role assigned to the principal. Valid values include AllDatabasesAdmin and AllDatabasesViewer. Changing this forces a new resource to be created.
- `tenant_id` (Required) The tenant id in which the principal resides. Changing this forces a new resource to be created.

  * [object Object]
  */
  readonly kustoDatabasePrincipalAssignment?: any;
  /**
  * (Optional) An list of language_extensions to enable. 
  
Valid values are: PYTHON, PYTHON_3.10.8 and R. 
  
PYTHON is used to specify Python 3.6.5 image and PYTHON_3.10.8 is used to specify Python 3.10.8 image.
Note that PYTHON_3.10.8 is only available in skus which support nested virtualization.

NOTE:
In v4.0.0 and later version of the AzureRM Provider, 
language_extensions will be changed to a list of language_extension block. 
In each block, name and image are required. 
name is the name of the language extension, possible values are PYTHON, R. 
image is the image of the language extension, possible values are Python3_6_5, Python3_10_8 and R.

  */
  readonly languageExtensions?: string[];
  /**
  * Azure region where the resource should be deployed.  If null, the location will be inferred from the resource group location.
  */
  readonly location?: string;
  /**
  * The lock level to apply. Default is `None`. Possible values are `None`, `CanNotDelete`, and `ReadOnly`.
  * [object Object]
  */
  readonly lock?: any;
  /**
  * Managed identities to be created for the resource.
  */
  readonly managedIdentities?: any;
  /**
  * The name of the this resource.
  */
  readonly name: string;
  /**
  * A optimized_auto_scale block supports the following:

minimum_instances - (Required) The minimum number of allowed instances. Must between 0 and 1000.

maximum_instances - (Required) The maximum number of allowed instances. Must between 0 and 1000.

  */
  readonly optimizedAutoScale?: any;
  /**
  * (Optional) Whether to restrict outbound network access. 
Value is optional but if passed in, must be true or false.
  
Default is false.

  */
  readonly outboundNetworkAccessRestricted?: boolean;
  /**
  * A map of private endpoints to create on this resource. The map key is deliberately arbitrary to avoid issues where map keys maybe unknown at plan time.

- `name` - (Optional) The name of the private endpoint. One will be generated if not set.
- `role_assignments` - (Optional) A map of role assignments to create on the private endpoint. The map key is deliberately arbitrary to avoid issues where map keys maybe unknown at plan time. See `var.role_assignments` for more information.
- `lock` - (Optional) The lock level to apply to the private endpoint. Default is `None`. Possible values are `None`, `CanNotDelete`, and `ReadOnly`.
- `tags` - (Optional) A mapping of tags to assign to the private endpoint.
- `subnet_resource_id` - The resource ID of the subnet to deploy the private endpoint in.
- `private_dns_zone_group_name` - (Optional) The name of the private DNS zone group. One will be generated if not set.
- `private_dns_zone_resource_ids` - (Optional) A set of resource IDs of private DNS zones to associate with the private endpoint. If not set, no zone groups will be created and the private endpoint will not be associated with any private DNS zones. DNS records must be managed external to this module.
- `application_security_group_resource_ids` - (Optional) A map of resource IDs of application security groups to associate with the private endpoint. The map key is deliberately arbitrary to avoid issues where map keys maybe unknown at plan time.
- `private_service_connection_name` - (Optional) The name of the private service connection. One will be generated if not set.
- `network_interface_name` - (Optional) The name of the network interface. One will be generated if not set.
- `location` - (Optional) The Azure location where the resources will be deployed. Defaults to the location of the resource group.
- `resource_group_name` - (Optional) The resource group where the resources will be deployed. Defaults to the resource group of this resource.
- `ip_configurations` - (Optional) A map of IP configurations to create on the private endpoint. If not specified the platform will create one. The map key is deliberately arbitrary to avoid issues where map keys maybe unknown at plan time.
  - `name` - The name of the IP configuration.
  - `private_ip_address` - The private IP address of the IP configuration.

  * [object Object]
  */
  readonly privateEndpoints?: any;
  /**
  * (Optional) Indicates what public IP type to create - IPv4 (default), or DualStack (both IPv4 and IPv6). Defaults to IPv4.
  * IPv4
  */
  readonly publicIpType?: string;
  /**
  * (Optional) Is the public network access enabled? Defaults to true.
  */
  readonly publicNetworkAccessEnabled?: boolean;
  /**
  * (Optional) Specifies if the purge operations are enabled.
  */
  readonly purgeEnabled?: boolean;
  /**
  * The resource group where the resources will be deployed.
  */
  readonly resourceGroupName: string;
  /**
  * A map of role assignments to create on this resource. The map key is deliberately arbitrary to avoid issues where map keys maybe unknown at plan time.

- `role_definition_id_or_name` - The ID or name of the role definition to assign to the principal.
- `principal_id` - The ID of the principal to assign the role to.
- `description` - The description of the role assignment.
- `skip_service_principal_aad_check` - If set to true, skips the Azure Active Directory check for the service principal in the tenant. Defaults to false.
- `condition` - The condition which will be used to scope the role assignment.
- `condition_version` - The version of the condition syntax. Valid values are '2.0'.

> Note: only set `skip_service_principal_aad_check` to true if you are assigning a role to a service principal.

  * [object Object]
  */
  readonly roleAssignments?: any;
  /**
  * A sku block supports the following:

name - (Required) The name of the SKU. 
  
Possible values are:
- Dev(No SLA)_Standard_D11_v2, 
- Dev(No SLA)_Standard_E2a_v4, 
- Standard_D14_v2, 
- Standard_D11_v2, 
- Standard_D16d_v5, 
- Standard_D13_v2, 
- Standard_D12_v2, 
- Standard_DS14_v2+4TB_PS, 
- Standard_DS14_v2+3TB_PS, 
- Standard_DS13_v2+1TB_PS, 
- Standard_DS13_v2+2TB_PS, 
- Standard_D32d_v5, 
- Standard_D32d_v4, 
- Standard_EC8ads_v5, 
- Standard_EC8as_v5+1TB_PS, 
- Standard_EC8as_v5+2TB_PS, 
- Standard_EC16ads_v5, 
- Standard_EC16as_v5+4TB_PS, 
- Standard_EC16as_v5+3TB_PS, 
- Standard_E80ids_v4, 
- Standard_E8a_v4, 
- Standard_E8ads_v5, 
- Standard_E8as_v5+1TB_PS, 
- Standard_E8as_v5+2TB_PS, 
- Standard_E8as_v4+1TB_PS, 
- Standard_E8as_v4+2TB_PS, 
- Standard_E8d_v5, 
- Standard_E8d_v4, 
- Standard_E8s_v5+1TB_PS, 
- Standard_E8s_v5+2TB_PS, 
- Standard_E8s_v4+1TB_PS, 
- Standard_E8s_v4+2TB_PS, 
- Standard_E4a_v4, 
- Standard_E4ads_v5, 
- Standard_E4d_v5, 
- Standard_E4d_v4, 
- Standard_E16a_v4, 
- Standard_E16ads_v5, 
- Standard_E16as_v5+4TB_PS, 
- Standard_E16as_v5+3TB_PS, 
- Standard_E16as_v4+4TB_PS, 
- Standard_E16as_v4+3TB_PS, 
- Standard_E16d_v5, 
- Standard_E16d_v4, 
- Standard_E16s_v5+4TB_PS, 
- Standard_E16s_v5+3TB_PS, 
- Standard_E16s_v4+4TB_PS, 
- Standard_E16s_v4+3TB_PS, 
- Standard_E64i_v3, 
- Standard_E2a_v4, 
- Standard_E2ads_v5, 
- Standard_E2d_v5, 
- Standard_E2d_v4, 
- Standard_L8as_v3, 
- Standard_L8s, 
- Standard_L8s_v3, 
- Standard_L8s_v2, 
- Standard_L4s, 
- Standard_L16as_v3, 
- Standard_L16s, 
- Standard_L16s_v3, 
- Standard_L16s_v2, 
- Standard_L32as_v3 
- Standard_L32s_v3
capacity - (Optional) Specifies the node count for the cluster. Boundaries depend on the SKU name.
NOTE:
If no optimized_auto_scale block is defined, then the capacity is required. ~> NOTE: If an optimized_auto_scale block is defined and no capacity is set, then the capacity is initially set to the value of minimum_instances.

  */
  readonly sku: any;
  /**
  * (Optional) Specifies if the streaming ingest is enabled.
  */
  readonly streamingIngestionEnabled?: boolean;
  /**
  * Map of tags to assign to the resource.
  * The property type contains a map, they have special handling, please see {@link cdk.tf/module-map-inputs the docs}
  */
  readonly tags?: { [key: string]: string };
  /**
  * (Optional) Specifies a list of tenant IDs that are trusted by the cluster. 
New or updated Kusto Cluster will only allow your own tenant by default. 

Use trusted_external_tenants = ["*"] to explicitly allow all other tenants, 
trusted_external_tenants = [] for only your tenant or 
trusted_external_tenants = ["<tenantId1>", "<tenantIdx>"] to allow specific other tenants.

  * 
  */
  readonly trustedExternalTenants?: string[];
  /**
  * (Optional) A virtual_network_configuration block as defined below. 
Changing this forces a new resource to be created.

A virtual_network_configuration block supports the following:

subnet_id - (Required) The subnet resource id.

engine_public_ip_id - (Required) Engine service's public IP address resource id.

data_management_public_ip_id - (Required) Data management's service public IP address resource id.

  */
  readonly virtualNetworkConfiguration?: any;
  /**
  * (Optional) Specifies a list of Availability Zones in which this Kusto Cluster should be located. Changing this forces a new Kusto Cluster to be created.
  */
  readonly zones?: string[];
}
/**
* Defines an KustoCluster based on a Terraform module
*
* Docs at Terraform Registry: {@link https://registry.terraform.io/modules/Azure/avm-res-kusto-cluster/azurerm/0.1.0 Azure/avm-res-kusto-cluster/azurerm}
*/
export class KustoCluster extends TerraformModule {
  private readonly inputs: { [name: string]: any } = { }
  public constructor(scope: Construct, id: string, config: KustoClusterConfig) {
    super(scope, id, {
      ...config,
      source: 'Azure/avm-res-kusto-cluster/azurerm',
      version: '0.1.0',
    });
    this.allowedFqdns = config.allowedFqdns;
    this.allowedIpRanges = config.allowedIpRanges;
    this.autoStopEnabled = config.autoStopEnabled;
    this.customerManagedKey = config.customerManagedKey;
    this.databases = config.databases;
    this.diagnosticSettings = config.diagnosticSettings;
    this.diskEncryptionEnabled = config.diskEncryptionEnabled;
    this.doubleEncryptionEnabled = config.doubleEncryptionEnabled;
    this.enableTelemetry = config.enableTelemetry;
    this.kustoClusterPrincipalAssignments = config.kustoClusterPrincipalAssignments;
    this.kustoDatabasePrincipalAssignment = config.kustoDatabasePrincipalAssignment;
    this.languageExtensions = config.languageExtensions;
    this.location = config.location;
    this.lock = config.lock;
    this.managedIdentities = config.managedIdentities;
    this.name = config.name;
    this.optimizedAutoScale = config.optimizedAutoScale;
    this.outboundNetworkAccessRestricted = config.outboundNetworkAccessRestricted;
    this.privateEndpoints = config.privateEndpoints;
    this.publicIpType = config.publicIpType;
    this.publicNetworkAccessEnabled = config.publicNetworkAccessEnabled;
    this.purgeEnabled = config.purgeEnabled;
    this.resourceGroupName = config.resourceGroupName;
    this.roleAssignments = config.roleAssignments;
    this.sku = config.sku;
    this.streamingIngestionEnabled = config.streamingIngestionEnabled;
    this.tags = config.tags;
    this.trustedExternalTenants = config.trustedExternalTenants;
    this.virtualNetworkConfiguration = config.virtualNetworkConfiguration;
    this.zones = config.zones;
  }
  public get allowedFqdns(): string[] | undefined {
    return this.inputs['allowed_fqdns'] as string[] | undefined;
  }
  public set allowedFqdns(value: string[] | undefined) {
    this.inputs['allowed_fqdns'] = value;
  }
  public get allowedIpRanges(): string[] | undefined {
    return this.inputs['allowed_ip_ranges'] as string[] | undefined;
  }
  public set allowedIpRanges(value: string[] | undefined) {
    this.inputs['allowed_ip_ranges'] = value;
  }
  public get autoStopEnabled(): boolean | undefined {
    return this.inputs['auto_stop_enabled'] as boolean | undefined;
  }
  public set autoStopEnabled(value: boolean | undefined) {
    this.inputs['auto_stop_enabled'] = value;
  }
  public get customerManagedKey(): any | undefined {
    return this.inputs['customer_managed_key'] as any | undefined;
  }
  public set customerManagedKey(value: any | undefined) {
    this.inputs['customer_managed_key'] = value;
  }
  public get databases(): any | undefined {
    return this.inputs['databases'] as any | undefined;
  }
  public set databases(value: any | undefined) {
    this.inputs['databases'] = value;
  }
  public get diagnosticSettings(): any | undefined {
    return this.inputs['diagnostic_settings'] as any | undefined;
  }
  public set diagnosticSettings(value: any | undefined) {
    this.inputs['diagnostic_settings'] = value;
  }
  public get diskEncryptionEnabled(): boolean | undefined {
    return this.inputs['disk_encryption_enabled'] as boolean | undefined;
  }
  public set diskEncryptionEnabled(value: boolean | undefined) {
    this.inputs['disk_encryption_enabled'] = value;
  }
  public get doubleEncryptionEnabled(): boolean | undefined {
    return this.inputs['double_encryption_enabled'] as boolean | undefined;
  }
  public set doubleEncryptionEnabled(value: boolean | undefined) {
    this.inputs['double_encryption_enabled'] = value;
  }
  public get enableTelemetry(): boolean | undefined {
    return this.inputs['enable_telemetry'] as boolean | undefined;
  }
  public set enableTelemetry(value: boolean | undefined) {
    this.inputs['enable_telemetry'] = value;
  }
  public get kustoClusterPrincipalAssignments(): any | undefined {
    return this.inputs['kusto_cluster_principal_assignments'] as any | undefined;
  }
  public set kustoClusterPrincipalAssignments(value: any | undefined) {
    this.inputs['kusto_cluster_principal_assignments'] = value;
  }
  public get kustoDatabasePrincipalAssignment(): any | undefined {
    return this.inputs['kusto_database_principal_assignment'] as any | undefined;
  }
  public set kustoDatabasePrincipalAssignment(value: any | undefined) {
    this.inputs['kusto_database_principal_assignment'] = value;
  }
  public get languageExtensions(): string[] | undefined {
    return this.inputs['language_extensions'] as string[] | undefined;
  }
  public set languageExtensions(value: string[] | undefined) {
    this.inputs['language_extensions'] = value;
  }
  public get location(): string | undefined {
    return this.inputs['location'] as string | undefined;
  }
  public set location(value: string | undefined) {
    this.inputs['location'] = value;
  }
  public get lock(): any | undefined {
    return this.inputs['lock'] as any | undefined;
  }
  public set lock(value: any | undefined) {
    this.inputs['lock'] = value;
  }
  public get managedIdentities(): any | undefined {
    return this.inputs['managed_identities'] as any | undefined;
  }
  public set managedIdentities(value: any | undefined) {
    this.inputs['managed_identities'] = value;
  }
  public get name(): string {
    return this.inputs['name'] as string;
  }
  public set name(value: string) {
    this.inputs['name'] = value;
  }
  public get optimizedAutoScale(): any | undefined {
    return this.inputs['optimized_auto_scale'] as any | undefined;
  }
  public set optimizedAutoScale(value: any | undefined) {
    this.inputs['optimized_auto_scale'] = value;
  }
  public get outboundNetworkAccessRestricted(): boolean | undefined {
    return this.inputs['outbound_network_access_restricted'] as boolean | undefined;
  }
  public set outboundNetworkAccessRestricted(value: boolean | undefined) {
    this.inputs['outbound_network_access_restricted'] = value;
  }
  public get privateEndpoints(): any | undefined {
    return this.inputs['private_endpoints'] as any | undefined;
  }
  public set privateEndpoints(value: any | undefined) {
    this.inputs['private_endpoints'] = value;
  }
  public get publicIpType(): string | undefined {
    return this.inputs['public_ip_type'] as string | undefined;
  }
  public set publicIpType(value: string | undefined) {
    this.inputs['public_ip_type'] = value;
  }
  public get publicNetworkAccessEnabled(): boolean | undefined {
    return this.inputs['public_network_access_enabled'] as boolean | undefined;
  }
  public set publicNetworkAccessEnabled(value: boolean | undefined) {
    this.inputs['public_network_access_enabled'] = value;
  }
  public get purgeEnabled(): boolean | undefined {
    return this.inputs['purge_enabled'] as boolean | undefined;
  }
  public set purgeEnabled(value: boolean | undefined) {
    this.inputs['purge_enabled'] = value;
  }
  public get resourceGroupName(): string {
    return this.inputs['resource_group_name'] as string;
  }
  public set resourceGroupName(value: string) {
    this.inputs['resource_group_name'] = value;
  }
  public get roleAssignments(): any | undefined {
    return this.inputs['role_assignments'] as any | undefined;
  }
  public set roleAssignments(value: any | undefined) {
    this.inputs['role_assignments'] = value;
  }
  public get sku(): any {
    return this.inputs['sku'] as any;
  }
  public set sku(value: any) {
    this.inputs['sku'] = value;
  }
  public get streamingIngestionEnabled(): boolean | undefined {
    return this.inputs['streaming_ingestion_enabled'] as boolean | undefined;
  }
  public set streamingIngestionEnabled(value: boolean | undefined) {
    this.inputs['streaming_ingestion_enabled'] = value;
  }
  public get tags(): { [key: string]: string } | undefined {
    return this.inputs['tags'] as { [key: string]: string } | undefined;
  }
  public set tags(value: { [key: string]: string } | undefined) {
    this.inputs['tags'] = value;
  }
  public get trustedExternalTenants(): string[] | undefined {
    return this.inputs['trusted_external_tenants'] as string[] | undefined;
  }
  public set trustedExternalTenants(value: string[] | undefined) {
    this.inputs['trusted_external_tenants'] = value;
  }
  public get virtualNetworkConfiguration(): any | undefined {
    return this.inputs['virtual_network_configuration'] as any | undefined;
  }
  public set virtualNetworkConfiguration(value: any | undefined) {
    this.inputs['virtual_network_configuration'] = value;
  }
  public get zones(): string[] | undefined {
    return this.inputs['zones'] as string[] | undefined;
  }
  public set zones(value: string[] | undefined) {
    this.inputs['zones'] = value;
  }
  public get dataIngestionUriOutput() {
    return this.getString('data_ingestion_uri')
  }
  public get idOutput() {
    return this.getString('id')
  }
  public get identityOutput() {
    return this.getString('identity')
  }
  public get privateEndpointsOutput() {
    return this.getString('private_endpoints')
  }
  public get resourceOutput() {
    return this.getString('resource')
  }
  public get uriOutput() {
    return this.getString('uri')
  }
  protected synthesizeAttributes() {
    return this.inputs;
  }
}
