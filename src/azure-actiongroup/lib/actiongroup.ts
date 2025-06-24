import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup";
import { AzureResource } from "../../core-azure/lib";

/**
 * Action Group ARM role receiver (AzAPI schema).
 */
export interface ActionGroupArmRoleReceiver {
  /**
   * The name of the ARM role receiver.
   */
  name: string;
  /**
   * The ARM role ID.
   */
  roleId: string;
  /**
   * Whether to use the common alert schema.
   */
  useCommonAlertSchema?: boolean;
}

/**
 * Action Group email receiver (AzAPI schema).
 */
export interface ActionGroupEmailReceiver {
  /**
   * The name of the email receiver.
   */
  name: string;
  /**
   * The email address of the receiver.
   */
  emailAddress: string;
  /**
   * Whether to use the common alert schema.
   */
  useCommonAlertSchema?: boolean;
}

/**
 * Action Group SMS receiver (AzAPI schema).
 */
export interface ActionGroupSmsReceiver {
  /**
   * The name of the SMS receiver.
   */
  name: string;
  /**
   * The country code of the SMS receiver.
   */
  countryCode: string;
  /**
   * The phone number of the SMS receiver.
   */
  phoneNumber: string;
}

/**
 * Action Group voice receiver (AzAPI schema).
 */
export interface ActionGroupVoiceReceiver {
  /**
   * The name of the voice receiver.
   */
  name: string;
  /**
   * The country code of the voice receiver.
   */
  countryCode: string;
  /**
   * The phone number of the voice receiver.
   */
  phoneNumber: string;
}

/**
 * Action Group webhook receiver (AzAPI schema).
 */
export interface ActionGroupWebhookReceiver {
  /**
   * The name of the webhook receiver.
   */
  name: string;
  /**
   * The URI where the webhook notification will be sent.
   */
  serviceUri: string;
  /**
   * Whether to use the common alert schema.
   */
  useCommonAlertSchema?: boolean;
  /**
   * The identifier URI for AAD application.
   */
  identifierUri?: string;
  /**
   * The object identifier for the AAD application.
   */
  objectId?: string;
  /**
   * The tenant identifier for the AAD application.
   */
  tenantId?: string;
}

/**
 * Action Group Event Hub receiver (AzAPI schema).
 */
export interface ActionGroupEventHubReceiver {
  /**
   * The name of the Event Hub receiver.
   */
  name: string;
  /**
   * The name of the Event Hub.
   */
  eventHubName: string;
  /**
   * The namespace name of the Event Hub.
   */
  eventHubNameSpace: string;
  /**
   * Whether to use the common alert schema.
   */
  useCommonAlertSchema?: boolean;
  /**
   * The tenant identifier for the AAD application.
   */
  tenantId?: string;
  /**
   * The subscription identifier.
   */
  subscriptionId: string;
}

/**
 * Action Group Azure app push receiver (AzAPI schema).
 */
export interface ActionGroupAzureAppPushReceiver {
  /**
   * The name of the Azure app push receiver.
   */
  name: string;
  /**
   * The email address registered for the Azure mobile application.
   */
  emailAddress: string;
}

/**
 * Action Group Logic App receiver (AzAPI schema).
 */
export interface ActionGroupLogicAppReceiver {
  /**
   * The name of the Logic App receiver.
   */
  name: string;
  /**
   * The Azure resource ID of the Logic App.
   */
  resourceId: string;
  /**
   * The callback URL of the Logic App.
   */
  callbackUrl: string;
  /**
   * Whether to use the common alert schema.
   */
  useCommonAlertSchema?: boolean;
}

/**
 * Action Group properties (AzAPI schema).
 */
export interface ActionGroupProperties {
  /**
   * The short name of the action group.
   */
  groupShortName: string;
  /**
   * Whether this action group is enabled.
   */
  enabled: boolean;
  /**
   * The list of ARM role receivers that are part of this action group.
   */
  armRoleReceivers?: ActionGroupArmRoleReceiver[];
  /**
   * The list of email receivers that are part of this action group.
   */
  emailReceivers?: ActionGroupEmailReceiver[];
  /**
   * The list of SMS receivers that are part of this action group.
   */
  smsReceivers?: ActionGroupSmsReceiver[];
  /**
   * The list of voice receivers that are part of this action group.
   */
  voiceReceivers?: ActionGroupVoiceReceiver[];
  /**
   * The list of webhook receivers that are part of this action group.
   */
  webhookReceivers?: ActionGroupWebhookReceiver[];
  /**
   * The list of Event Hub receivers that are part of this action group.
   */
  eventHubReceivers?: ActionGroupEventHubReceiver[];
  /**
   * The list of Azure app push receivers that are part of this action group.
   */
  azureAppPushReceivers?: ActionGroupAzureAppPushReceiver[];
  /**
   * The list of Logic App receivers that are part of this action group.
   */
  logicAppReceivers?: ActionGroupLogicAppReceiver[];
}

/**
 * Action Group configuration interface with flattened properties.
 */
export interface ActionGroupProps {
  /**
   * The name of the Action Group.
   */
  readonly name: string;

  /**
   * An optional reference to the resource group in which to deploy the Action Group.
   * If not provided, the Action Group will be deployed in the default resource group.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * The Azure Region where the Action Group should exist.
   * @default "global"
   */
  readonly location?: string;

  /**
   * A mapping of tags to assign to the resource.
   */
  readonly tags?: { [key: string]: string };

  // ============================================================================
  // FLATTENED ACTION GROUP PROPERTIES
  // ============================================================================

  /**
   * The short name of the action group. This will be used in SMS messages.
   * The length should be in the range (1 - 12).
   */
  readonly shortName: string;

  /**
   * Whether this action group is enabled. If an action group is not enabled,
   * then none of its receivers will receive communications.
   * @default true
   */
  readonly enabled?: boolean;

  /**
   * The list of ARM role receivers that are part of this action group.
   */
  readonly armRoleReceivers?: ActionGroupArmRoleReceiver[];

  /**
   * The list of email receivers that are part of this action group.
   */
  readonly emailReceivers?: ActionGroupEmailReceiver[];

  /**
   * The list of SMS receivers that are part of this action group.
   */
  readonly smsReceivers?: ActionGroupSmsReceiver[];

  /**
   * The list of voice receivers that are part of this action group.
   */
  readonly voiceReceivers?: ActionGroupVoiceReceiver[];

  /**
   * The list of webhook receivers that are part of this action group.
   */
  readonly webhookReceivers?: ActionGroupWebhookReceiver[];

  /**
   * The list of Event Hub receivers that are part of this action group.
   */
  readonly eventHubReceivers?: ActionGroupEventHubReceiver[];

  /**
   * The list of Azure app push receivers that are part of this action group.
   */
  readonly azureAppPushReceivers?: ActionGroupAzureAppPushReceiver[];

  /**
   * The list of Logic App receivers that are part of this action group.
   */
  readonly logicAppReceivers?: ActionGroupLogicAppReceiver[];

  // ============================================================================
  // LEGACY PROPERTIES (for backward compatibility)
  // ============================================================================

  /**
   * Action Group properties using AzAPI schema.
   * @deprecated Use the flattened properties directly instead
   */
  readonly properties?: ActionGroupProperties;
}

/**
 * Manages an Azure Monitor Action Group using AzAPI.
 */
export class ActionGroup extends AzureResource {
  readonly props: ActionGroupProps;
  public resourceGroup: ResourceGroup;
  public id: string;
  public readonly resource: resource.Resource;

  /**
   * Manages an Azure Monitor Action Group, which is used to trigger actions or notifications
   * based on alerts or conditions met within Azure Monitor.
   *
   * An Action Group in Azure Monitor defines a collection of individual actions that are
   * triggered when the conditions of an associated alert rule are met. Actions can include
   * sending emails, triggering Azure Functions, calling webhooks, and more. This class allows
   * for configuring and managing these actions, making it essential for setting up
   * comprehensive monitoring and response systems in Azure applications.
   *
   * @param scope - The scope in which to define this construct, typically representing the
   *                Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the Action Group.
   * @param props - Configuration properties for the Action Group. These properties may include:
   *                - `name`: The name of the Action Group.
   *                - `resourceGroup`: Optional. Reference to the resource group for deployment.
   *                - `shortName`: A shorter name for the Action Group used in notifications.
   *                - `enabled`: Specifies if the Action Group is active. Defaults to true.
   *                - `location`: The Azure region where the Action Group is hosted. Defaults to global.
   *                - `tags`: A dictionary of tags to apply to the Action Group for resource management.
   *                - Receivers: Configurations for various types of notifications (e.g., email, SMS, webhook).
   *
   * Example usage:
   * ```typescript
   * const actionGroup = new ActionGroup(this, 'myActionGroup', {
   *   name: 'criticalAlertsGroup',
   *   resourceGroup: myResourceGroup,
   *   shortName: 'Alerts',
   *   location: 'East US',
   *   emailReceivers: [{
   *     name: 'admin',
   *     emailAddress: 'admin@example.com'
   *   }],
   *   smsReceivers: [{
   *     name: 'adminSms',
   *     countryCode: '1',
   *     phoneNumber: '5551234567'
   *   }],
   *   tags: {
   *     environment: 'production'
   *   }
   * });
   * ```
   * This setup creates an Action Group that sends email and SMS notifications when triggered by an alert.
   */
  constructor(scope: Construct, id: string, props: ActionGroupProps) {
    super(scope, id);

    this.props = props;

    // Setup or reuse the provided resource group.
    this.resourceGroup =
      props.resourceGroup ||
      new ResourceGroup(this, "resource-group", {
        location: props.location || "eastus",
        name: props.name ? `rg-${props.name}` : undefined,
      });

    // Build Action Group properties from flattened interface, supporting legacy props
    const actionGroupProperties: ActionGroupProperties = {
      // If properties is provided (legacy), use it as base
      ...props.properties,

      // Override with flattened properties (new interface)
      groupShortName: props.shortName,
      enabled: props.enabled ?? props.properties?.enabled ?? true,
      armRoleReceivers:
        props.armRoleReceivers || props.properties?.armRoleReceivers,
      emailReceivers: props.emailReceivers || props.properties?.emailReceivers,
      smsReceivers: props.smsReceivers || props.properties?.smsReceivers,
      voiceReceivers: props.voiceReceivers || props.properties?.voiceReceivers,
      webhookReceivers:
        props.webhookReceivers || props.properties?.webhookReceivers,
      eventHubReceivers:
        props.eventHubReceivers || props.properties?.eventHubReceivers,
      azureAppPushReceivers:
        props.azureAppPushReceivers || props.properties?.azureAppPushReceivers,
      logicAppReceivers:
        props.logicAppReceivers || props.properties?.logicAppReceivers,
    };

    // Create the Action Group using AzAPI
    this.resource = new resource.Resource(this, "actiongroup", {
      type: "Microsoft.Insights/actionGroups@2023-01-01",
      name: props.name,
      location: props.location || "global",
      parentId: this.resourceGroup.resourceGroup.id,
      tags: props.tags,
      body: {
        properties: actionGroupProperties,
      },
    });

    this.id = this.resource.id;

    // Terraform Outputs
    const idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.id,
    });

    idOutput.overrideLogicalId("id");
  }
}
