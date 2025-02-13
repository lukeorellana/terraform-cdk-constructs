// https://registry.terraform.io/providers/azure/azapi/0.6.0/docs
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AzapiProviderConfig {
  /**
  * The path to the Client Certificate associated with the Service Principal for use when authenticating as a Service Principal using a Client Certificate.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#client_certificate_path AzapiProvider#client_certificate_path}
  */
  readonly clientCertificatePath?: string;
  /**
  * The Client ID which should be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#client_id AzapiProvider#client_id}
  */
  readonly clientId?: string;
  /**
  * The Client Secret which should be used. For use When authenticating as a Service Principal using a Client Secret.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#client_secret AzapiProvider#client_secret}
  */
  readonly clientSecret?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#default_location AzapiProvider#default_location}
  */
  readonly defaultLocation?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#default_tags AzapiProvider#default_tags}
  */
  readonly defaultTags?: { [key: string]: string };
  /**
  * This will disable the x-ms-correlation-request-id header.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#disable_correlation_request_id AzapiProvider#disable_correlation_request_id}
  */
  readonly disableCorrelationRequestId?: boolean | cdktf.IResolvable;
  /**
  * This will disable the Terraform Partner ID which is used if a custom `partner_id` isn't specified.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#disable_terraform_partner_id AzapiProvider#disable_terraform_partner_id}
  */
  readonly disableTerraformPartnerId?: boolean | cdktf.IResolvable;
  /**
  * The Cloud Environment which should be used. Possible values are public, usgovernment and china. Defaults to public.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#environment AzapiProvider#environment}
  */
  readonly environment?: string;
  /**
  * A GUID/UUID that is registered with Microsoft to facilitate partner resource usage attribution.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#partner_id AzapiProvider#partner_id}
  */
  readonly partnerId?: string;
  /**
  * Should the Provider skip registering all of the Resource Providers that it supports, if they're not already registered?
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#skip_provider_registration AzapiProvider#skip_provider_registration}
  */
  readonly skipProviderRegistration?: boolean | cdktf.IResolvable;
  /**
  * The Subscription ID which should be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#subscription_id AzapiProvider#subscription_id}
  */
  readonly subscriptionId?: string;
  /**
  * The Tenant ID which should be used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#tenant_id AzapiProvider#tenant_id}
  */
  readonly tenantId?: string;
  /**
  * Alias name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs#alias AzapiProvider#alias}
  */
  readonly alias?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs azapi}
*/
export class AzapiProvider extends cdktf.TerraformProvider {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "azapi";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/azure/azapi/0.6.0/docs azapi} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AzapiProviderConfig = {}
  */
  public constructor(scope: Construct, id: string, config: AzapiProviderConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'azapi',
      terraformGeneratorMetadata: {
        providerName: 'azapi',
        providerVersion: '0.6.0',
        providerVersionConstraint: '~> 0.6.0'
      },
      terraformProviderSource: 'Azure/azapi'
    });
    this._clientCertificatePath = config.clientCertificatePath;
    this._clientId = config.clientId;
    this._clientSecret = config.clientSecret;
    this._defaultLocation = config.defaultLocation;
    this._defaultTags = config.defaultTags;
    this._disableCorrelationRequestId = config.disableCorrelationRequestId;
    this._disableTerraformPartnerId = config.disableTerraformPartnerId;
    this._environment = config.environment;
    this._partnerId = config.partnerId;
    this._skipProviderRegistration = config.skipProviderRegistration;
    this._subscriptionId = config.subscriptionId;
    this._tenantId = config.tenantId;
    this._alias = config.alias;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // client_certificate_path - computed: false, optional: true, required: false
  private _clientCertificatePath?: string; 
  public get clientCertificatePath() {
    return this._clientCertificatePath;
  }
  public set clientCertificatePath(value: string | undefined) {
    this._clientCertificatePath = value;
  }
  public resetClientCertificatePath() {
    this._clientCertificatePath = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientCertificatePathInput() {
    return this._clientCertificatePath;
  }

  // client_id - computed: false, optional: true, required: false
  private _clientId?: string; 
  public get clientId() {
    return this._clientId;
  }
  public set clientId(value: string | undefined) {
    this._clientId = value;
  }
  public resetClientId() {
    this._clientId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientIdInput() {
    return this._clientId;
  }

  // client_secret - computed: false, optional: true, required: false
  private _clientSecret?: string; 
  public get clientSecret() {
    return this._clientSecret;
  }
  public set clientSecret(value: string | undefined) {
    this._clientSecret = value;
  }
  public resetClientSecret() {
    this._clientSecret = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clientSecretInput() {
    return this._clientSecret;
  }

  // default_location - computed: false, optional: true, required: false
  private _defaultLocation?: string; 
  public get defaultLocation() {
    return this._defaultLocation;
  }
  public set defaultLocation(value: string | undefined) {
    this._defaultLocation = value;
  }
  public resetDefaultLocation() {
    this._defaultLocation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultLocationInput() {
    return this._defaultLocation;
  }

  // default_tags - computed: false, optional: true, required: false
  private _defaultTags?: { [key: string]: string }; 
  public get defaultTags() {
    return this._defaultTags;
  }
  public set defaultTags(value: { [key: string]: string } | undefined) {
    this._defaultTags = value;
  }
  public resetDefaultTags() {
    this._defaultTags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultTagsInput() {
    return this._defaultTags;
  }

  // disable_correlation_request_id - computed: false, optional: true, required: false
  private _disableCorrelationRequestId?: boolean | cdktf.IResolvable; 
  public get disableCorrelationRequestId() {
    return this._disableCorrelationRequestId;
  }
  public set disableCorrelationRequestId(value: boolean | cdktf.IResolvable | undefined) {
    this._disableCorrelationRequestId = value;
  }
  public resetDisableCorrelationRequestId() {
    this._disableCorrelationRequestId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disableCorrelationRequestIdInput() {
    return this._disableCorrelationRequestId;
  }

  // disable_terraform_partner_id - computed: false, optional: true, required: false
  private _disableTerraformPartnerId?: boolean | cdktf.IResolvable; 
  public get disableTerraformPartnerId() {
    return this._disableTerraformPartnerId;
  }
  public set disableTerraformPartnerId(value: boolean | cdktf.IResolvable | undefined) {
    this._disableTerraformPartnerId = value;
  }
  public resetDisableTerraformPartnerId() {
    this._disableTerraformPartnerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disableTerraformPartnerIdInput() {
    return this._disableTerraformPartnerId;
  }

  // environment - computed: false, optional: true, required: false
  private _environment?: string; 
  public get environment() {
    return this._environment;
  }
  public set environment(value: string | undefined) {
    this._environment = value;
  }
  public resetEnvironment() {
    this._environment = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get environmentInput() {
    return this._environment;
  }

  // partner_id - computed: false, optional: true, required: false
  private _partnerId?: string; 
  public get partnerId() {
    return this._partnerId;
  }
  public set partnerId(value: string | undefined) {
    this._partnerId = value;
  }
  public resetPartnerId() {
    this._partnerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get partnerIdInput() {
    return this._partnerId;
  }

  // skip_provider_registration - computed: false, optional: true, required: false
  private _skipProviderRegistration?: boolean | cdktf.IResolvable; 
  public get skipProviderRegistration() {
    return this._skipProviderRegistration;
  }
  public set skipProviderRegistration(value: boolean | cdktf.IResolvable | undefined) {
    this._skipProviderRegistration = value;
  }
  public resetSkipProviderRegistration() {
    this._skipProviderRegistration = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get skipProviderRegistrationInput() {
    return this._skipProviderRegistration;
  }

  // subscription_id - computed: false, optional: true, required: false
  private _subscriptionId?: string; 
  public get subscriptionId() {
    return this._subscriptionId;
  }
  public set subscriptionId(value: string | undefined) {
    this._subscriptionId = value;
  }
  public resetSubscriptionId() {
    this._subscriptionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subscriptionIdInput() {
    return this._subscriptionId;
  }

  // tenant_id - computed: false, optional: true, required: false
  private _tenantId?: string; 
  public get tenantId() {
    return this._tenantId;
  }
  public set tenantId(value: string | undefined) {
    this._tenantId = value;
  }
  public resetTenantId() {
    this._tenantId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tenantIdInput() {
    return this._tenantId;
  }

  // alias - computed: false, optional: true, required: false
  private _alias?: string; 
  public get alias() {
    return this._alias;
  }
  public set alias(value: string | undefined) {
    this._alias = value;
  }
  public resetAlias() {
    this._alias = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aliasInput() {
    return this._alias;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      client_certificate_path: cdktf.stringToTerraform(this._clientCertificatePath),
      client_id: cdktf.stringToTerraform(this._clientId),
      client_secret: cdktf.stringToTerraform(this._clientSecret),
      default_location: cdktf.stringToTerraform(this._defaultLocation),
      default_tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._defaultTags),
      disable_correlation_request_id: cdktf.booleanToTerraform(this._disableCorrelationRequestId),
      disable_terraform_partner_id: cdktf.booleanToTerraform(this._disableTerraformPartnerId),
      environment: cdktf.stringToTerraform(this._environment),
      partner_id: cdktf.stringToTerraform(this._partnerId),
      skip_provider_registration: cdktf.booleanToTerraform(this._skipProviderRegistration),
      subscription_id: cdktf.stringToTerraform(this._subscriptionId),
      tenant_id: cdktf.stringToTerraform(this._tenantId),
      alias: cdktf.stringToTerraform(this._alias),
    };
  }
}
