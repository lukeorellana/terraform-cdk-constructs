import { Eventhub } from "@cdktf/provider-azurerm/lib/eventhub";
import { EventhubAuthorizationRule } from "@cdktf/provider-azurerm/lib/eventhub-authorization-rule";
import { EventhubNamespace } from "@cdktf/provider-azurerm/lib/eventhub-namespace";
import { KustoCluster } from "@cdktf/provider-azurerm/lib/kusto-cluster";
import { MonitorDiagnosticSetting } from "@cdktf/provider-azurerm/lib/monitor-diagnostic-setting";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { Construct } from "constructs";

export class MonitoringInfrastructure extends Construct {
  public readonly kustoCluster: KustoCluster;
  public readonly eventHubNamespace: EventhubNamespace;
  public readonly eventHub: Eventhub;
  public readonly eventHubAuthRule: EventhubAuthorizationRule;
  public readonly adxDiagnosticSetting: MonitorDiagnosticSetting;

  constructor(
    scope: Construct,
    id: string,
    name: string,
    location: string,
    resourceGroup: ResourceGroup,
  ) {
    super(scope, id);

    // -------------------------------------------------------------------
    // 1. Kusto Cluster
    // -------------------------------------------------------------------
    this.kustoCluster = new KustoCluster(this, "adx", {
      name: `adx-${name}`,
      location: location,
      resourceGroupName: resourceGroup.name,
      allowedFqdns: [],
      allowedIpRanges: [],
      autoStopEnabled: true,
      diskEncryptionEnabled: true,
      doubleEncryptionEnabled: false,
      outboundNetworkAccessRestricted: false,
      publicIpType: "IPv4",
      publicNetworkAccessEnabled: true,
      purgeEnabled: false,
      streamingIngestionEnabled: true,
      trustedExternalTenants: [],
      zones: ["1", "2", "3"],
      sku: {
        name: "Dev(No SLA)_Standard_D11_v2",
        capacity: 1,
      },
      identity: {
        type: "SystemAssigned",
      },
    });

    // -------------------------------------------------------------------
    // 2. Event Hub Namespace (central place to route logs)
    // -------------------------------------------------------------------
    this.eventHubNamespace = new EventhubNamespace(this, "eventHubNamespace", {
      name: `ehns-${name}`,
      location: location,
      resourceGroupName: resourceGroup.name,
      sku: "Basic", // Or 'Standard', etc.
    });

    // -------------------------------------------------------------------
    // 3. Event Hub (within the namespace)
    // -------------------------------------------------------------------
    this.eventHub = new Eventhub(this, "eventHub", {
      name: `eh-${name}`,
      resourceGroupName: resourceGroup.name,
      namespaceName: this.eventHubNamespace.name,
      partitionCount: 2,
      messageRetention: 1,
    });

    // (Optional) Authorization rule if you want to separate rights
    // or need to reference an explicit Shared Access Key for the EventHub:
    this.eventHubAuthRule = new EventhubAuthorizationRule(
      this,
      "eventHubAuthRule",
      {
        name: `eh-authrule-${name}`,
        namespaceName: this.eventHubNamespace.name,
        eventhubName: this.eventHub.name,
        resourceGroupName: resourceGroup.name,
        listen: true,
        send: true,
        manage: false,
      },
    );
  }
}
