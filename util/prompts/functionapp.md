import { Construct } from "constructs";
import {
  SitesFunctionsKeys,
  SitesFunctionsKeysProps,
} from "./sitesfunctionskeys";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface SitesFunctionsProps extends IAzAPIBaseProps {
  /**
   * Kind of resource.
   */
  kind?: string;
  /**
   * FunctionEnvelope resource specific properties
   */
  properties?: FunctionEnvelopeProperties;
}

export interface FunctionEnvelopeProperties {
  /**
   * Config information.
   */
  config?: object | string | boolean | number;
  /**
   * Config URI.
   */
  config_href?: string;
  /**
   * File list.
   */
  files?: object | string | boolean | number;
  /**
   * Function App ID.
   */
  function_app_id?: string;
  /**
   * Function URI.
   */
  href?: string;
  /**
   * The invocation URL
   */
  invoke_url_template?: string;
  /**
   * Gets or sets a value indicating whether the function is disabled
   */
  isDisabled?: boolean;
  /**
   * The function language
   */
  language?: string;
  /**
   * Script URI.
   */
  script_href?: string;
  /**
   * Script root path URI.
   */
  script_root_path_href?: string;
  /**
   * Secrets file URI.
   */
  secrets_file_href?: string;
  /**
   * Test data used when testing via the Azure Portal.
   */
  test_data?: string;
  /**
   * Test data URI.
   */
  test_data_href?: string;
}

export class SitesFunctions extends AzAPIBase {
  /**
       * Constructs a new SitesFunctions.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Web/sites/functions@2023-12-01. The properties include:
     * `kind` - (Optional) Kind of resource. Defaults to `string`.
     * `properties` - (Required) FunctionEnvelope resource specific properties Defaults to `FunctionEnvelopeProperties`.
     *
     * ---
     *
     * The `FunctionEnvelopeProperties` block supports the following:

     * `config` - (Optional) Config information. Defaults to `object`.
     * `config_href` - (Optional) Config URI. Defaults to `string`.
     * `files` - (Optional) File list. Defaults to `object`.
     * `function_app_id` - (Optional) Function App ID. Defaults to `string`.
     * `href` - (Optional) Function URI. Defaults to `string`.
     * `invoke_url_template` - (Optional) The invocation URL Defaults to `string`.
     * `isDisabled` - (Optional) Gets or sets a value indicating whether the function is disabled Defaults to `boolean`.
     * `language` - (Optional) The function language Defaults to `string`.
     * `script_href` - (Optional) Script URI. Defaults to `string`.
     * `script_root_path_href` - (Optional) Script root path URI. Defaults to `string`.
     * `secrets_file_href` - (Optional) Secrets file URI. Defaults to `string`.
     * `test_data` - (Optional) Test data used when testing via the Azure Portal. Defaults to `string`.
     * `test_data_href` - (Optional) Test data URI. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: SitesFunctionsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Web/sites/functions@2023-12-01";
  }
  protected getResourceBody(props: SitesFunctionsProps) {
    return {
      kind: props.kind,
      properties: props.properties,
    };
  }
  public addSitesFunctionsKeys(
    props: SitesFunctionsKeysProps,
  ): SitesFunctionsKeys {
    return new SitesFunctionsKeys(this, props.name, {
      name: props.name,
      parentId: this.id,
      value: props.value,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface SitesFunctionsKeysProps extends IAzAPIBaseProps {
  /**
   * Key value
   */
  value?: string;
}

export class SitesFunctionsKeys extends AzAPIBase {
  /**
   * Constructs a new SitesFunctionsKeys.
   *
   * @param scope - The scope in which to define this construct.
   * @param id - The ID of this construct.
   * @param props - The properties for configuring the Microsoft.Web/sites/functions/keys@2023-12-01. The properties include:
   * `value` - (Optional) Key value Defaults to `string`.
   *
   */
  constructor(scope: Construct, id: string, props: SitesFunctionsKeysProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Web/sites/functions/keys@2023-12-01";
  }
  protected getResourceBody(props: SitesFunctionsKeysProps) {
    return {
      value: props.value,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface SitesHostNameBindingsProps extends IAzAPIBaseProps {
  /**
   * Kind of resource.
   */
  kind?: string;
  /**
   * HostNameBinding resource specific properties
   */
  properties?: HostNameBindingProperties;
}

export interface HostNameBindingProperties {
  /**
   * Azure resource name.
   */
  azureResourceName?: string;
  /**
   * Azure resource type.
   */
  azureResourceType?: string;
  /**
   * Custom DNS record type.
   */
  customHostNameDnsRecordType?: string;
  /**
   * Fully qualified ARM domain resource URI.
   */
  domainId?: string;
  /**
   * Hostname type.
   */
  hostNameType?: string;
  /**
   * App Service app name.
   */
  siteName?: string;
  /**
   * SSL type
   */
  sslState?: string;
  /**
   * SSL certificate thumbprint
   */
  thumbprint?: string;
}

export class SitesHostNameBindings extends AzAPIBase {
  /**
       * Constructs a new SitesHostNameBindings.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Web/sites/hostNameBindings@2023-12-01. The properties include:
     * `kind` - (Optional) Kind of resource. Defaults to `string`.
     * `properties` - (Required) HostNameBinding resource specific properties Defaults to `HostNameBindingProperties`.
     *
     * ---
     *
     * The `HostNameBindingProperties` block supports the following:

     * `azureResourceName` - (Optional) Azure resource name. Defaults to `string`.
     * `azureResourceType` - (Optional) Azure resource type. Defaults to `string`.
     * `customHostNameDnsRecordType` - (Optional) Custom DNS record type. Defaults to `string`.
     * `domainId` - (Optional) Fully qualified ARM domain resource URI. Defaults to `string`.
     * `hostNameType` - (Optional) Hostname type. Defaults to `string`.
     * `siteName` - (Optional) App Service app name. Defaults to `string`.
     * `sslState` - (Optional) SSL type Defaults to `string`.
     * `thumbprint` - (Optional) SSL certificate thumbprint Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: SitesHostNameBindingsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Web/sites/hostNameBindings@2023-12-01";
  }
  protected getResourceBody(props: SitesHostNameBindingsProps) {
    return {
      kind: props.kind,
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface SitesHybridconnectionProps extends IAzAPIBaseProps {
  /**
   * Kind of resource.
   */
  kind?: string;
  /**
   * RelayServiceConnectionEntity resource specific properties
   */
  properties?: RelayServiceConnectionEntityProperties;
}

export interface RelayServiceConnectionEntityProperties {
  /**
   *
   */
  biztalkUri?: string;
  /**
   *
   */
  entityConnectionString?: string;
  /**
   *
   */
  entityName?: string;
  /**
   *
   */
  hostname?: string;
  /**
   *
   */
  port?: number;
  /**
   *
   */
  resourceConnectionString?: string;
  /**
   *
   */
  resourceType?: string;
}

export class SitesHybridconnection extends AzAPIBase {
  /**
       * Constructs a new SitesHybridconnection.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Web/sites/hybridconnection@2023-12-01. The properties include:
     * `kind` - (Optional) Kind of resource. Defaults to `string`.
     * `properties` - (Required) RelayServiceConnectionEntity resource specific properties Defaults to `RelayServiceConnectionEntityProperties`.
     *
     * ---
     *
     * The `RelayServiceConnectionEntityProperties` block supports the following:

     * `biztalkUri` - (Optional)  Defaults to `string`.
     * `entityConnectionString` - (Optional)  Defaults to `string`.
     * `entityName` - (Optional)  Defaults to `string`.
     * `hostname` - (Optional)  Defaults to `string`.
     * `port` - (Optional)  Defaults to `integer`.
     * `resourceConnectionString` - (Optional)  Defaults to `string`.
     * `resourceType` - (Optional)  Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: SitesHybridconnectionProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Web/sites/hybridconnection@2023-12-01";
  }
  protected getResourceBody(props: SitesHybridconnectionProps) {
    return {
      kind: props.kind,
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface SitesHybridConnectionNamespacesRelaysProps
  extends IAzAPIBaseProps {
  /**
   * Kind of resource.
   */
  kind?: string;
  /**
   * HybridConnection resource specific properties
   */
  properties?: HybridConnectionProperties;
}

export interface HybridConnectionProperties {
  /**
   * The hostname of the endpoint.
   */
  hostname?: string;
  /**
   * The port of the endpoint.
   */
  port?: number;
  /**
   * The ARM URI to the Service Bus relay.
   */
  relayArmUri?: string;
  /**
   * The name of the Service Bus relay.
   */
  relayName?: string;
  /**
   * The name of the Service Bus key which has Send permissions. This is used to authenticate to Service Bus.
   */
  sendKeyName?: string;
  /**
    * The value of the Service Bus key. This is used to authenticate to Service Bus. In ARM this key will not be returned
    normally, use the POST /listKeys API instead.
    */
  sendKeyValue?: string;
  /**
   * The name of the Service Bus namespace.
   */
  serviceBusNamespace?: string;
  /**
   * The suffix for the service bus endpoint. By default this is .servicebus.windows.net
   */
  serviceBusSuffix?: string;
}

export class SitesHybridConnectionNamespacesRelays extends AzAPIBase {
  /**
       * Constructs a new SitesHybridConnectionNamespacesRelays.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.Web/sites/hybridConnectionNamespaces/relays@2023-12-01. The properties include:
     * `kind` - (Optional) Kind of resource. Defaults to `string`.
     * `properties` - (Required) HybridConnection resource specific properties Defaults to `HybridConnectionProperties`.
     *
     * ---
     *
     * The `HybridConnectionProperties` block supports the following:

     * `hostname` - (Optional) The hostname of the endpoint. Defaults to `string`.
     * `port` - (Optional) The port of the endpoint. Defaults to `integer`.
     * `relayArmUri` - (Optional) The ARM URI to the Service Bus relay. Defaults to `string`.
     * `relayName` - (Optional) The name of the Service Bus relay. Defaults to `string`.
     * `sendKeyName` - (Optional) The name of the Service Bus key which has Send permissions. This is used to authenticate to Service Bus. Defaults to `string`.
     * `sendKeyValue` - (Optional) The value of the Service Bus key. This is used to authenticate to Service Bus. In ARM this key will not be returned
    normally, use the POST /listKeys API instead. Defaults to `string`.
     * `serviceBusNamespace` - (Optional) The name of the Service Bus namespace. Defaults to `string`.
     * `serviceBusSuffix` - (Optional) The suffix for the service bus endpoint. By default this is .servicebus.windows.net Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: SitesHybridConnectionNamespacesRelaysProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.Web/sites/hybridConnectionNamespaces/relays@2023-12-01";
  }
  protected getResourceBody(props: SitesHybridConnectionNamespacesRelaysProps) {
    return {
      kind: props.kind,
      properties: props.properties,
    };
  }
}
