// https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface UpdateResourceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#body UpdateResource#body}
  */
  readonly body?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#id UpdateResource#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#ignore_casing UpdateResource#ignore_casing}
  */
  readonly ignoreCasing?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#ignore_missing_property UpdateResource#ignore_missing_property}
  */
  readonly ignoreMissingProperty?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#locks UpdateResource#locks}
  */
  readonly locks?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#name UpdateResource#name}
  */
  readonly name?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#parent_id UpdateResource#parent_id}
  */
  readonly parentId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#resource_id UpdateResource#resource_id}
  */
  readonly resourceId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#response_export_values UpdateResource#response_export_values}
  */
  readonly responseExportValues?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#type UpdateResource#type}
  */
  readonly type: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#timeouts UpdateResource#timeouts}
  */
  readonly timeouts?: UpdateResourceTimeouts;
}
export interface UpdateResourceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#create UpdateResource#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#delete UpdateResource#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#read UpdateResource#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource#update UpdateResource#update}
  */
  readonly update?: string;
}

export function updateResourceTimeoutsToTerraform(struct?: UpdateResourceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    read: cdktf.stringToTerraform(struct!.read),
    update: cdktf.stringToTerraform(struct!.update),
  }
}

export class UpdateResourceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): UpdateResourceTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._read !== undefined) {
      hasAnyValues = true;
      internalValueResult.read = this._read;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: UpdateResourceTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._read = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
      this._read = value.read;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // read - computed: false, optional: true, required: false
  private _read?: string; 
  public get read() {
    return this.getStringAttribute('read');
  }
  public set read(value: string) {
    this._read = value;
  }
  public resetRead() {
    this._read = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readInput() {
    return this._read;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource azapi_update_resource}
*/
export class UpdateResource extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "azapi_update_resource";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs/resources/update_resource azapi_update_resource} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options UpdateResourceConfig
  */
  public constructor(scope: Construct, id: string, config: UpdateResourceConfig) {
    super(scope, id, {
      terraformResourceType: 'azapi_update_resource',
      terraformGeneratorMetadata: {
        providerName: 'azapi',
        providerVersion: '0.6.0',
        providerVersionConstraint: '~> 0.6.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._body = config.body;
    this._id = config.id;
    this._ignoreCasing = config.ignoreCasing;
    this._ignoreMissingProperty = config.ignoreMissingProperty;
    this._locks = config.locks;
    this._name = config.name;
    this._parentId = config.parentId;
    this._resourceId = config.resourceId;
    this._responseExportValues = config.responseExportValues;
    this._type = config.type;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // body - computed: false, optional: true, required: false
  private _body?: string; 
  public get body() {
    return this.getStringAttribute('body');
  }
  public set body(value: string) {
    this._body = value;
  }
  public resetBody() {
    this._body = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bodyInput() {
    return this._body;
  }

  // id - computed: true, optional: true, required: false
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  public resetId() {
    this._id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // ignore_casing - computed: false, optional: true, required: false
  private _ignoreCasing?: boolean | cdktf.IResolvable; 
  public get ignoreCasing() {
    return this.getBooleanAttribute('ignore_casing');
  }
  public set ignoreCasing(value: boolean | cdktf.IResolvable) {
    this._ignoreCasing = value;
  }
  public resetIgnoreCasing() {
    this._ignoreCasing = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ignoreCasingInput() {
    return this._ignoreCasing;
  }

  // ignore_missing_property - computed: false, optional: true, required: false
  private _ignoreMissingProperty?: boolean | cdktf.IResolvable; 
  public get ignoreMissingProperty() {
    return this.getBooleanAttribute('ignore_missing_property');
  }
  public set ignoreMissingProperty(value: boolean | cdktf.IResolvable) {
    this._ignoreMissingProperty = value;
  }
  public resetIgnoreMissingProperty() {
    this._ignoreMissingProperty = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ignoreMissingPropertyInput() {
    return this._ignoreMissingProperty;
  }

  // locks - computed: false, optional: true, required: false
  private _locks?: string[]; 
  public get locks() {
    return this.getListAttribute('locks');
  }
  public set locks(value: string[]) {
    this._locks = value;
  }
  public resetLocks() {
    this._locks = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get locksInput() {
    return this._locks;
  }

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // output - computed: true, optional: false, required: false
  public get output() {
    return this.getStringAttribute('output');
  }

  // parent_id - computed: true, optional: true, required: false
  private _parentId?: string; 
  public get parentId() {
    return this.getStringAttribute('parent_id');
  }
  public set parentId(value: string) {
    this._parentId = value;
  }
  public resetParentId() {
    this._parentId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get parentIdInput() {
    return this._parentId;
  }

  // resource_id - computed: true, optional: true, required: false
  private _resourceId?: string; 
  public get resourceId() {
    return this.getStringAttribute('resource_id');
  }
  public set resourceId(value: string) {
    this._resourceId = value;
  }
  public resetResourceId() {
    this._resourceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceIdInput() {
    return this._resourceId;
  }

  // response_export_values - computed: false, optional: true, required: false
  private _responseExportValues?: string[]; 
  public get responseExportValues() {
    return this.getListAttribute('response_export_values');
  }
  public set responseExportValues(value: string[]) {
    this._responseExportValues = value;
  }
  public resetResponseExportValues() {
    this._responseExportValues = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get responseExportValuesInput() {
    return this._responseExportValues;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new UpdateResourceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: UpdateResourceTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      body: cdktf.stringToTerraform(this._body),
      id: cdktf.stringToTerraform(this._id),
      ignore_casing: cdktf.booleanToTerraform(this._ignoreCasing),
      ignore_missing_property: cdktf.booleanToTerraform(this._ignoreMissingProperty),
      locks: cdktf.listMapper(cdktf.stringToTerraform, false)(this._locks),
      name: cdktf.stringToTerraform(this._name),
      parent_id: cdktf.stringToTerraform(this._parentId),
      resource_id: cdktf.stringToTerraform(this._resourceId),
      response_export_values: cdktf.listMapper(cdktf.stringToTerraform, false)(this._responseExportValues),
      type: cdktf.stringToTerraform(this._type),
      timeouts: updateResourceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
