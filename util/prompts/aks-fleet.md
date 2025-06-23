import { Construct } from "constructs";
import { FleetsMembers, FleetsMembersProps } from "./fleetsmembers";
import { FleetsUpdateRuns, FleetsUpdateRunsProps } from "./fleetsupdateruns";
import {
  FleetsUpdateStrategies,
  FleetsUpdateStrategiesProps,
} from "./fleetsupdatestrategies";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface FleetsProps extends IAzAPIBaseProps {
  /**
   * The resource-specific properties for this resource.
   */
  properties?: FleetProperties;
}

export interface FleetProperties {}

export class Fleets extends AzAPIBase {
  /**
       * Constructs a new Fleets.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/fleets@2023-10-15. The properties include:
     * `properties` - (Required) The resource-specific properties for this resource. Defaults to `FleetProperties`.
     *
     * ---
     *
     * The `FleetProperties` block supports the following:

     *
    */
  constructor(scope: Construct, id: string, props: FleetsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/fleets@2023-10-15";
  }
  protected getResourceBody(props: FleetsProps) {
    return {
      properties: props.properties,
    };
  }
  public addFleetsMembers(props: FleetsMembersProps): FleetsMembers {
    return new FleetsMembers(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addFleetsUpdateRuns(props: FleetsUpdateRunsProps): FleetsUpdateRuns {
    return new FleetsUpdateRuns(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
  public addFleetsUpdateStrategies(
    props: FleetsUpdateStrategiesProps,
  ): FleetsUpdateStrategies {
    return new FleetsUpdateStrategies(this, props.name, {
      name: props.name,
      parentId: this.id,
      properties: props.properties,
    });
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface FleetsMembersProps extends IAzAPIBaseProps {
  /**
   * The resource-specific properties for this resource.
   */
  properties: FleetMemberProperties;
}

export interface FleetMemberProperties {
  /**
   * The ARM resource id of the cluster that joins the Fleet. Must be a valid Azure resource id. e.g.: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{clusterName}'.
   */
  clusterResourceId: string;
  /**
   * The group this member belongs to for multi-cluster update management.
   */
  group?: string;
}

export class FleetsMembers extends AzAPIBase {
  /**
       * Constructs a new FleetsMembers.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/fleets/members@2023-10-15. The properties include:
     * `properties` - (Required) The resource-specific properties for this resource. Defaults to `FleetMemberProperties`.
     *
     * ---
     *
     * The `FleetMemberProperties` block supports the following:

     * `clusterResourceId` - (Required) The ARM resource id of the cluster that joins the Fleet. Must be a valid Azure resource id. e.g.: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{clusterName}'. Defaults to `string`.
     * `group` - (Optional) The group this member belongs to for multi-cluster update management. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: FleetsMembersProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/fleets/members@2023-10-15";
  }
  protected getResourceBody(props: FleetsMembersProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface FleetsUpdateRunsProps extends IAzAPIBaseProps {
  /**
   * The resource-specific properties for this resource.
   */
  properties: UpdateRunProperties;
}

export interface UpdateRunProperties {
  /**
   * The update to be applied to all clusters in the UpdateRun. The managedClusterUpdate can be modified until the run is started.
   */
  managedClusterUpdate: ManagedClusterUpdate;
  /**
    * The strategy defines the order in which the clusters will be updated.
    If not set, all members will be updated sequentially. The UpdateRun status will show a single UpdateStage and a single UpdateGroup targeting all members.
    The strategy of the UpdateRun can be modified until the run is started.
    */
  strategy?: UpdateRunStrategy;
  /**
    * The resource id of the FleetUpdateStrategy resource to reference.

    When creating a new run, there are three ways to define a strategy for the run:
    1. Define a new strategy in place: Set the "strategy" field.
    2. Use an existing strategy: Set the "updateStrategyId" field. (since 2023-08-15-preview)
    3. Use the default strategy to update all the members one by one: Leave both "updateStrategyId" and "strategy" unset. (since 2023-08-15-preview)

    Setting both "updateStrategyId" and "strategy" is invalid.

    UpdateRuns created by "updateStrategyId" snapshot the referenced UpdateStrategy at the time of creation and store it in the "strategy" field.
    Subsequent changes to the referenced FleetUpdateStrategy resource do not propagate.
    UpdateRunStrategy changes can be made directly on the "strategy" field before launching the UpdateRun.
    */
  updateStrategyId?: string;
}

export interface UpdateRunStrategy {
  /**
   * The list of stages that compose this update run. Min size: 1.
   */
  stages: UpdateStage[];
}

export interface UpdateStage {
  /**
   * The time in seconds to wait at the end of this stage before starting the next one. Defaults to 0 seconds if unspecified.
   */
  afterStageWaitInSeconds?: number;
  /**
   * Defines the groups to be executed in parallel in this stage. Duplicate groups are not allowed. Min size: 1.
   */
  groups?: UpdateGroup[];
  /**
   * The name of the stage. Must be unique within the UpdateRun.
   */
  name: string;
}

export interface UpdateGroup {
  /**
    * Name of the group.
    It must match a group name of an existing fleet member.
    */
  name: string;
}

export interface ManagedClusterUpdate {
  /**
   * The node image upgrade to be applied to the target nodes in update run.
   */
  nodeImageSelection?: NodeImageSelection;
  /**
   * The upgrade to apply to the ManagedClusters.
   */
  upgrade: ManagedClusterUpgradeSpec;
}

export interface ManagedClusterUpgradeSpec {
  /**
   * The Kubernetes version to upgrade the member clusters to.
   */
  kubernetesVersion?: string;
  /**
   * ManagedClusterUpgradeType is the type of upgrade to be applied.
   */
  type: string;
}

export interface NodeImageSelection {
  /**
   * The node image upgrade type.
   */
  type: string;
}

export class FleetsUpdateRuns extends AzAPIBase {
  /**
       * Constructs a new FleetsUpdateRuns.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/fleets/updateRuns@2023-10-15. The properties include:
     * `properties` - (Required) The resource-specific properties for this resource. Defaults to `UpdateRunProperties`.
     *
     * ---
     *
     * The `UpdateRunProperties` block supports the following:

     * `managedClusterUpdate` - (Required) The update to be applied to all clusters in the UpdateRun. The managedClusterUpdate can be modified until the run is started. Defaults to `ManagedClusterUpdate`.
     * `strategy` - (Optional) The strategy defines the order in which the clusters will be updated.
    If not set, all members will be updated sequentially. The UpdateRun status will show a single UpdateStage and a single UpdateGroup targeting all members.
    The strategy of the UpdateRun can be modified until the run is started. Defaults to `UpdateRunStrategy`.
     * `updateStrategyId` - (Optional) The resource id of the FleetUpdateStrategy resource to reference.

    When creating a new run, there are three ways to define a strategy for the run:
    1. Define a new strategy in place: Set the "strategy" field.
    2. Use an existing strategy: Set the "updateStrategyId" field. (since 2023-08-15-preview)
    3. Use the default strategy to update all the members one by one: Leave both "updateStrategyId" and "strategy" unset. (since 2023-08-15-preview)

    Setting both "updateStrategyId" and "strategy" is invalid.

    UpdateRuns created by "updateStrategyId" snapshot the referenced UpdateStrategy at the time of creation and store it in the "strategy" field.
    Subsequent changes to the referenced FleetUpdateStrategy resource do not propagate.
    UpdateRunStrategy changes can be made directly on the "strategy" field before launching the UpdateRun. Defaults to `string`.
     *
     * ---
     *
     * The `UpdateRunStrategy` block supports the following:

     * `stages` - (Required) The list of stages that compose this update run. Min size: 1. Defaults to `UpdateStage[]`.
     *
     * ---
     *
     * The `UpdateStage[]` block supports the following:

     * `afterStageWaitInSeconds` - (Optional) The time in seconds to wait at the end of this stage before starting the next one. Defaults to 0 seconds if unspecified. Defaults to `integer`.
     * `groups` - (Optional) Defines the groups to be executed in parallel in this stage. Duplicate groups are not allowed. Min size: 1. Defaults to `UpdateGroup[]`.
     * `name` - (Required) The name of the stage. Must be unique within the UpdateRun. Defaults to `string`.
     *
     * ---
     *
     * The `UpdateGroup[]` block supports the following:

     * `name` - (Required) Name of the group.
    It must match a group name of an existing fleet member.  Defaults to `string`.
     *
     * ---
     *
     * The `ManagedClusterUpdate` block supports the following:

     * `nodeImageSelection` - (Optional) The node image upgrade to be applied to the target nodes in update run. Defaults to `NodeImageSelection`.
     * `upgrade` - (Required) The upgrade to apply to the ManagedClusters. Defaults to `ManagedClusterUpgradeSpec`.
     *
     * ---
     *
     * The `ManagedClusterUpgradeSpec` block supports the following:

     * `kubernetesVersion` - (Optional) The Kubernetes version to upgrade the member clusters to. Defaults to `string`.
     * `type` - (Required) ManagedClusterUpgradeType is the type of upgrade to be applied. Defaults to `string`.
     *
     * ---
     *
     * The `NodeImageSelection` block supports the following:

     * `type` - (Required) The node image upgrade type. Defaults to `string`.
     *
    */
  constructor(scope: Construct, id: string, props: FleetsUpdateRunsProps) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/fleets/updateRuns@2023-10-15";
  }
  protected getResourceBody(props: FleetsUpdateRunsProps) {
    return {
      properties: props.properties,
    };
  }
}
import { Construct } from "constructs";
import { AzAPIBase, IAzAPIBaseProps } from "../core-azapi";

export interface FleetsUpdateStrategiesProps extends IAzAPIBaseProps {
  /**
   * The resource-specific properties for this resource.
   */
  properties: FleetUpdateStrategyProperties;
}

export interface FleetUpdateStrategyProperties {
  /**
   * Defines the update sequence of the clusters.
   */
  strategy: UpdateRunStrategy;
}

export interface UpdateRunStrategy {
  /**
   * The list of stages that compose this update run. Min size: 1.
   */
  stages: UpdateStage[];
}

export interface UpdateStage {
  /**
   * The time in seconds to wait at the end of this stage before starting the next one. Defaults to 0 seconds if unspecified.
   */
  afterStageWaitInSeconds?: number;
  /**
   * Defines the groups to be executed in parallel in this stage. Duplicate groups are not allowed. Min size: 1.
   */
  groups?: UpdateGroup[];
  /**
   * The name of the stage. Must be unique within the UpdateRun.
   */
  name: string;
}

export interface UpdateGroup {
  /**
    * Name of the group.
    It must match a group name of an existing fleet member.
    */
  name: string;
}

export class FleetsUpdateStrategies extends AzAPIBase {
  /**
       * Constructs a new FleetsUpdateStrategies.
       *
       * @param scope - The scope in which to define this construct.
       * @param id - The ID of this construct.
       * @param props - The properties for configuring the Microsoft.ContainerService/fleets/updateStrategies@2023-10-15. The properties include:
     * `properties` - (Required) The resource-specific properties for this resource. Defaults to `FleetUpdateStrategyProperties`.
     *
     * ---
     *
     * The `FleetUpdateStrategyProperties` block supports the following:

     * `strategy` - (Required) Defines the update sequence of the clusters. Defaults to `UpdateRunStrategy`.
     *
     * ---
     *
     * The `UpdateRunStrategy` block supports the following:

     * `stages` - (Required) The list of stages that compose this update run. Min size: 1. Defaults to `UpdateStage[]`.
     *
     * ---
     *
     * The `UpdateStage[]` block supports the following:

     * `afterStageWaitInSeconds` - (Optional) The time in seconds to wait at the end of this stage before starting the next one. Defaults to 0 seconds if unspecified. Defaults to `integer`.
     * `groups` - (Optional) Defines the groups to be executed in parallel in this stage. Duplicate groups are not allowed. Min size: 1. Defaults to `UpdateGroup[]`.
     * `name` - (Required) The name of the stage. Must be unique within the UpdateRun. Defaults to `string`.
     *
     * ---
     *
     * The `UpdateGroup[]` block supports the following:

     * `name` - (Required) Name of the group.
    It must match a group name of an existing fleet member.  Defaults to `string`.
     *
    */
  constructor(
    scope: Construct,
    id: string,
    props: FleetsUpdateStrategiesProps,
  ) {
    super(scope, id, props);
  }
  protected getResourceType(): string {
    return "Microsoft.ContainerService/fleets/updateStrategies@2023-10-15";
  }
  protected getResourceBody(props: FleetsUpdateStrategiesProps) {
    return {
      properties: props.properties,
    };
  }
}
