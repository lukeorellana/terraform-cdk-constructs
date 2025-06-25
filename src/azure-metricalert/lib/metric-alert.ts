import * as cdktf from "cdktf";
import { Construct } from "constructs";
import * as moment from "moment";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";
import { AzureResource } from "../../core-azure/lib";
import * as model from "../model";

export class MetricAlert extends AzureResource {
  readonly props: model.IMetricAlertProps;
  public id: string;
  public resourceGroup: ResourceGroup;

  /**
   * Represents a Metric Alert in Azure Monitor, which is used to automatically monitor metrics across Azure services and trigger actions when certain conditions are met.
   *
   * This class encapsulates the configuration and management of a Metric Alert, allowing users to define alert rules based on the metrics from their Azure resources. Metric Alerts can help in proactively managing the health, performance, and availability of Azure services.
   *
   * Properties:
   * - `name`: The name of the Metric Alert, which must be unique within the resource group.
   * - `description`: Optional. A description of what the Metric Alert monitors and potential impact or remediation.
   * - `enabled`: Indicates whether the alert rule is enabled. Disabled rules will not fire.
   * - `autoMitigate`: Specifies whether the alert should attempt auto-mitigation actions when triggered.
   * - `frequency`: The frequency of evaluation for the alert rule, determining how often the rule is checked.
   * - `severity`: The severity level assigned to the alert. This helps in categorizing the urgency of the alert.
   * - `targetResourceType`: Specifies the type of Azure resource the alert rule applies to, necessary for scoping the alert.
   * - `targetResourceLocation`: Specifies the location of the target resource, required when the alert rule covers resources in multiple locations.
   * - `windowSize`: The period over which data is collected for analysis, which must be greater than the frequency of evaluation.
   * - `tags`: User-defined tags to help organize and identify resources within Azure.
   * - `criteria`: The conditions that trigger the alert. This can be static or dynamic, based on the behavior of the monitored metric over time.
   * - `dynamicCriteria`: Advanced configurations for criteria that dynamically adjust thresholds based on historical data.
   * - `scopes`: The specific resources that the Metric Alert is scoped to monitor.
   * - `resourceGroup`: The Azure Resource Group in which this Metric Alert is defined.
   *
   * Example usage:
   * ```typescript
   * const cpuAlertProps: IMetricAlertProps = {
   *   name: 'High CPU Usage Alert',
   *   resourceGroup: resourceGroupInstance,
   *   scopes: [vm.id],
   *   criteria: [
   *     {
   *       metricName: 'Percentage CPU',
   *       operator: 'GreaterThan',
   *       threshold: 80,
   *       aggregation: 'Average'
   *     }
   *   ],
   *   frequency: 'PT1M',
   *   windowSize: 'PT5M',
   *   severity: 3,
   *   enabled: true
   * };
   *
   * const cpuAlert = new MetricAlert(this, 'cpuUsageAlert', cpuAlertProps);
   * ```
   *
   * This configuration defines a Metric Alert that monitors CPU usage across specified virtual machines, triggering an alert if the CPU usage exceeds 80% over a 5-minute window, evaluated every minute.
   */
  constructor(scope: Construct, id: string, props: model.IMetricAlertProps) {
    super(scope, id);

    this.props = props;

    // Handle resource group setup
    if (props.resourceGroup) {
      this.resourceGroup = props.resourceGroup;
    } else {
      // Create a new resource group using our ResourceGroup class
      this.resourceGroup = new ResourceGroup(this, "rg", {
        name: `rg-${props.name}`,
        location: props.targetResourceLocation || "eastus",
        tags: props.tags,
      });
    }

    // Setup default values
    this.props.enabled = props.enabled ?? true;
    this.props.automitigate = props.automitigate ?? true;
    this.props.frequency = props.frequency ?? "PT5M";
    this.props.severity = props.severity ?? 3;
    this.props.windowSize = props.windowSize ?? props.frequency ?? "PT5M";

    // Properties validation
    this.ValidatePropsFrequency();
    this.ValidatePropsWindowSize();
    this.ValidatePropsWindowSizeGreaterThanFrequency();

    // Create Metric Alert using AzAPI
    const metricAlertProperties: any = {
      enabled: this.props.enabled,
      autoMitigate: this.props.automitigate,
      evaluationFrequency: this.props.frequency,
      severity: this.props.severity,
      windowSize: this.props.windowSize,
      scopes: props.scopes,
      description: props.description,
      targetResourceType: props.targetResourceType,
      targetResourceRegion: props.targetResourceLocation,
    };

    // Add criteria if provided
    if (props.criteria && props.criteria.length > 0) {
      // For AzAPI, criteria is a single object containing all criterion
      metricAlertProperties.criteria = {
        "odata.type":
          "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria",
        allOf: props.criteria.map((criterion: any) => ({
          criterionType: "StaticThresholdCriterion",
          name: criterion.name || criterion.metricName,
          metricName: criterion.metricName,
          metricNamespace: criterion.metricNamespace,
          operator: criterion.operator,
          threshold: criterion.threshold,
          timeAggregation: criterion.aggregation,
          dimensions:
            criterion.dimension?.map((dim: any) => ({
              name: dim.name,
              operator: dim.operator,
              values: dim.values,
            })) || [],
        })),
      };
    }

    // Add dynamic criteria if provided
    if (props.dynamicCriteria && props.dynamicCriteria.length > 0) {
      // For AzAPI, criteria is a single object containing all criterion
      metricAlertProperties.criteria = {
        "odata.type":
          "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria",
        allOf: props.dynamicCriteria.map((criterion: any) => ({
          criterionType: "DynamicThresholdCriterion",
          name: criterion.name || criterion.metricName,
          metricName: criterion.metricName,
          metricNamespace: criterion.metricNamespace,
          operator: criterion.operator,
          alertSensitivity: criterion.alertSensitivity,
          timeAggregation: criterion.aggregation,
          dimensions:
            criterion.dimension?.map((dim: any) => ({
              name: dim.name,
              operator: dim.operator,
              values: dim.values,
            })) || [],
          failingPeriods: {
            numberOfEvaluationPeriods:
              criterion.failingPeriods?.numberOfEvaluationPeriods || 4,
            minFailingPeriodsToAlert:
              criterion.failingPeriods?.minFailingPeriodsToAlert || 3,
          },
        })),
      };
    }

    // Add actions if provided
    if (props.action && props.action.length > 0) {
      metricAlertProperties.actions = props.action.map((action: any) => ({
        actionGroupId: action.actionGroupId,
        webhookProperties: action.webhookProperties,
      }));
    }

    const metricAlert = new resource.Resource(this, "metricAlert", {
      name: props.name,
      location:
        props.targetResourceLocation ||
        this.resourceGroup.resourceGroup.location,
      parentId: this.resourceGroup.resourceGroup.id,
      type: "Microsoft.Insights/metricAlerts@2018-03-01",
      tags: props.tags,
      body: {
        properties: metricAlertProperties,
      },
    });

    this.id = metricAlert.id;

    // Output properties
    const cdktfTerraformOutputMetricAlertId = new cdktf.TerraformOutput(
      this,
      "id",
      {
        value: metricAlert.id,
      },
    );
    cdktfTerraformOutputMetricAlertId.overrideLogicalId("id");
  }

  private ValidatePropsFrequency() {
    const frequencyOptions = ["PT1M", "PT5M", "PT15M", "PT30M", "PT1H"];
    if (!frequencyOptions.includes(this.props.frequency ?? "NotSet")) {
      throw new Error(`frequency must be one of ${frequencyOptions}`);
    }
  }

  private ValidatePropsWindowSize() {
    const windowSizeOptions = [
      "PT1M",
      "PT5M",
      "PT15M",
      "PT30M",
      "PT1H",
      "PT6H",
      "PT12H",
      "P1D",
    ];
    if (!windowSizeOptions.includes(this.props.windowSize ?? "NotSet")) {
      throw new Error(`windowSize must be one of ${windowSizeOptions}`);
    }
  }

  private ValidatePropsWindowSizeGreaterThanFrequency() {
    const f = moment.duration(this.props.frequency);
    const w = moment.duration(this.props.windowSize);
    if (w < f) {
      throw new Error("windowSize must be greater than frequency");
    }
  }
}
