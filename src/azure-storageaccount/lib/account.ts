import * as cdktf from "cdktf";
import { Construct } from "constructs";
import { Container } from "./container";
import { FileShare, FileShareProps } from "./fileshare";
import { Queue } from "./queue";
import { Table } from "./table";
import * as resource from "../../../.gen/providers/azapi/resource";
import { ResourceGroup } from "../../azure-resourcegroup/lib/resource-group";
import { AzureResource } from "../../core-azure/lib";

export interface NetworkRulesProps {
  /**
   * Specifies which traffic to bypass from the network rules. The possible values are 'AzureServices', 'Logging', 'Metrics',
   * and 'None'. Bypassing 'AzureServices' enables Azure's internal services to access the storage account.
   */
  readonly bypass?: string[];

  /**
   * The default action of the network rule set. Options are 'Allow' or 'Deny'. Set to 'Deny' to enable network rules and restrict
   * access to the storage account. 'Allow' permits access by default.
   */
  readonly defaultAction: string;

  /**
   * An array of IP rules to allow access to the storage account. These are specified as CIDR ranges.
   * Example: ['1.2.3.4/32', '5.6.7.0/24'] to allow specific IPs/subnets.
   */
  readonly ipRules?: string[];

  /**
   * An array of virtual network subnet IDs that are allowed to access the storage account. This enables you to secure the storage
   * account to a specific virtual network and subnet within Azure.
   */
  readonly virtualNetworkSubnetIds?: string[];

  /**
   * An array of objects representing the private link access settings. Each object in the array defines the sub-resource name
   * (e.g., 'blob', 'file') and its respective private endpoint connections for the storage account.
   */
  readonly privateLinkAccess?: any[];
}

export interface AccountProps {
  /**
   * The type of replication to use for the storage account. This determines how your data is replicated across Azure's infrastructure.
   * Example values: Standard_LRS, Standard_GRS, Standard_RAGRS, Premium_LRS.
   */
  readonly accountReplicationType?: string;

  /**
   * The performance tier of the storage account. Determines the type of hardware and performance level.
   * Example values: Standard, Premium.
   */
  readonly accountTier?: string;

  /**
   * The storage account kind. Options: Storage, StorageV2, BlobStorage, FileStorage, BlockBlobStorage.
   */
  readonly kind?: string;

  /**
   * The Azure region in which to create the storage account.
   */
  readonly location: string;

  /**
   * The name of the storage account. Must be unique across Azure.
   */
  readonly name: string;

  /**
   * The Azure resource group in which to create the storage account.
   */
  readonly resourceGroup?: ResourceGroup;

  /**
   * Tags to apply to the storage account, used for categorization and billing purposes.
   * Format: { [key: string]: string }
   */
  readonly tags?: { readonly [key: string]: string };

  /**
   * A boolean flag indicating whether to enforce HTTPS for data transfer to the storage account.
   */
  readonly enableHttpsTrafficOnly?: boolean;

  /**
   * The data access tier of the storage account, which impacts storage costs and data retrieval speeds.
   * Example values: Hot, Cool.
   */
  readonly accessTier?: string;

  /**
   * A flag indicating whether the Hierarchical Namespace (HNS) is enabled, which is required for Azure Data Lake Storage Gen2 features.
   */
  readonly isHnsEnabled?: boolean;

  /**
   * The minimum TLS version to be used for securing connections to the storage account.
   * Example values: TLS1_0, TLS1_1, TLS1_2.
   */
  readonly minTlsVersion?: string;

  /**
   * A boolean flag indicating whether public network access to the storage account is allowed.
   */
  readonly publicNetworkAccessEnabled?: boolean;

  /**
   * Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key.
   */
  readonly sharedAccessKeyEnabled?: boolean;

  /**
   * Network access rules for the storage account.
   */
  readonly networkRules?: NetworkRulesProps;

  /**
   * Identity configuration for the storage account.
   */
  readonly identity?: {
    type: string;
    userAssignedIdentities?: string[];
  };

  /**
   * Lifecycle rules to ignore changes.
   */
  readonly ignoreChanges?: string[];
}

export class Account extends AzureResource {
  public readonly props: AccountProps;
  public readonly storageAccount: resource.Resource;
  public readonly idOutput: cdktf.TerraformOutput;
  public readonly nameOutput: cdktf.TerraformOutput;
  public readonly locationOutput: cdktf.TerraformOutput;
  public id: string;
  public readonly name: string;
  public readonly location: string;
  public resourceGroup: ResourceGroup;
  public readonly accountKind: string;
  public readonly accountTier: string;
  private readonly containers: Map<string, Container>;
  private readonly shares: Map<string, FileShare>;
  private readonly tables: Map<string, Table>;

  /**
   * Represents an Azure Storage Account within a Terraform deployment using AzAPI.
   *
   * This class is responsible for the creation and management of an Azure Storage Account, which is a scalable and secure service
   * for storing large amounts of unstructured data that can be accessed from anywhere in the world over HTTP or HTTPS. Common uses
   * of the Azure Storage Account include storing of blobs (objects), file shares, tables, and queues. This class provides methods
   * to manage storage resources, configure network rules, and integrate with Azure Active Directory for secure access management.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the storage account.
   * @param props - The properties required to configure the Azure Storage Account, as defined in the AccountProps interface.
   */
  constructor(scope: Construct, id: string, props: AccountProps) {
    super(scope, id);

    this.props = props;
    this.containers = new Map<string, Container>();
    this.shares = new Map<string, FileShare>();
    this.tables = new Map<string, Table>();
    this.name = props.name;
    this.location = props.location;

    // Set up resource group
    if (props.resourceGroup) {
      this.resourceGroup = props.resourceGroup;
    } else {
      this.resourceGroup = new ResourceGroup(this, `${id}-rg`, {
        name: `rg-${props.name}`,
        location: props.location,
      });
    }

    // Default Storage Account Settings
    const defaults = {
      kind: props.kind || "StorageV2",
      accountTier: props.accountTier || "Standard",
      accountReplicationType: props.accountReplicationType || "LRS",
      enableHttpsTrafficOnly: props.enableHttpsTrafficOnly !== false,
      accessTier: props.accessTier || "Hot",
      isHnsEnabled: props.isHnsEnabled || false,
      minTlsVersion: props.minTlsVersion || "TLS1_2",
      publicNetworkAccessEnabled: props.publicNetworkAccessEnabled !== false,
      sharedAccessKeyEnabled: props.sharedAccessKeyEnabled !== false,
    };

    // Build the storage account SKU
    const sku = {
      name: `${defaults.accountTier}_${defaults.accountReplicationType}`,
    };

    // Build the storage account properties
    const storageAccountProperties: any = {
      accessTier: defaults.accessTier,
      allowBlobPublicAccess: true,
      allowCrossTenantReplication: true,
      allowSharedKeyAccess: defaults.sharedAccessKeyEnabled,
      supportsHttpsTrafficOnly: defaults.enableHttpsTrafficOnly,
      isHnsEnabled: defaults.isHnsEnabled,
      minimumTlsVersion: defaults.minTlsVersion,
      publicNetworkAccess: defaults.publicNetworkAccessEnabled
        ? "Enabled"
        : "Disabled",
    };

    // Add network rules if provided
    if (props.networkRules) {
      storageAccountProperties.networkAcls = {
        bypass: props.networkRules.bypass?.join(",") || "AzureServices",
        defaultAction: props.networkRules.defaultAction,
        ipRules: props.networkRules.ipRules?.map((ip) => ({ value: ip })) || [],
        virtualNetworkRules:
          props.networkRules.virtualNetworkSubnetIds?.map((subnetId) => ({
            id: subnetId,
          })) || [],
      };
    }

    // Add identity if provided
    if (props.identity) {
      storageAccountProperties.identity = {
        type: props.identity.type,
        ...(props.identity.userAssignedIdentities && {
          userAssignedIdentities: props.identity.userAssignedIdentities.reduce(
            (acc, identityId) => {
              acc[identityId] = {};
              return acc;
            },
            {} as any,
          ),
        }),
      };
    }

    // Create the storage account using AzAPI
    this.storageAccount = new resource.Resource(this, `${id}-storage`, {
      name: props.name,
      location: props.location,
      parentId: this.resourceGroup.resourceGroup.id,
      type: "Microsoft.Storage/storageAccounts@2023-05-01",
      tags: props.tags,
      body: {
        kind: defaults.kind,
        sku: sku,
        properties: storageAccountProperties,
      },
    });

    // Add lifecycle management if specified
    if (props.ignoreChanges) {
      this.storageAccount.addOverride("lifecycle", [
        {
          ignore_changes: props.ignoreChanges,
        },
      ]);
    }

    this.id = this.storageAccount.id;
    this.accountKind = defaults.kind;
    this.accountTier = defaults.accountTier;

    // Terraform Outputs
    this.idOutput = new cdktf.TerraformOutput(this, "id", {
      value: this.storageAccount.id,
    });
    this.nameOutput = new cdktf.TerraformOutput(this, "name", {
      value: this.storageAccount.name,
    });
    this.locationOutput = new cdktf.TerraformOutput(this, "location", {
      value: this.storageAccount.location,
    });

    // This allows the Terraform resource name to match the original name
    this.idOutput.overrideLogicalId("id");
    this.nameOutput.overrideLogicalId("name");
    this.locationOutput.overrideLogicalId("location");
  }

  public addContainer(
    name: string,
    containerAccessType?: string,
    metadata?: { [key: string]: string },
  ): Container {
    if (this.containers.has(name)) {
      throw new Error(`Container '${name}' already exists.`);
    }

    const newContainer = new Container(this, name, {
      name: name,
      storageAccountName: this.name,
      containerAccessType: containerAccessType || "private",
      metadata: metadata || {},
    });

    this.containers.set(name, newContainer);
    return newContainer;
  }

  /**
   * Adds a new file share to the storage account.
   * @param name The name of the file share. Must be unique within the storage account.
   * @param props Optional properties for configuring the file share, such as quota and access tier.
   * @returns The created FileShare instance.
   * @throws Error if a file share with the same name already exists.
   */
  public addFileShare(name: string, props?: FileShareProps): FileShare {
    if (this.shares.has(name)) {
      throw new Error(`Share '${name}' already exists.`);
    }

    const defaults = {
      quota: props?.quota || 1024,
      accessTier: props?.accessTier || "Hot",
      enabledProtocol: props?.enabledProtocol || "SMB",
      acl: props?.acl || [],
      metadata: props?.metadata || {},
    };

    const newShare = new FileShare(this, name, {
      ...defaults,
      name: name,
      storageAccountName: this.name,
    });

    this.shares.set(name, newShare);
    return newShare;
  }

  /**
   * Adds a new table to the storage account.
   * @param name The name of the table. Must be unique within the storage account.
   * @param acl Optional access control list for the table, specifying permissions.
   * @returns The created Table instance.
   * @throws Error if a table with the same name already exists.
   */
  public addTable(name: string, acl?: any[]): Table {
    if (this.tables.has(name)) {
      throw new Error(`Table '${name}' already exists.`);
    }

    const newTable = new Table(this, name, {
      name: name,
      storageAccountName: this.name,
      acl: acl,
    });

    this.tables.set(name, newTable);
    return newTable;
  }

  /**
   * Adds a new queue to the storage account.
   * @param name The name of the queue. Must be unique within the storage account.
   * @param metadata Optional metadata for the queue as key-value pairs.
   * @returns The created Queue instance.
   */
  public addQueue(name: string, metadata?: { [key: string]: string }): Queue {
    return new Queue(this, name, {
      name: name,
      storageAccountName: this.name,
      metadata: metadata,
    });
  }

  /**
   * Adds network rules to the storage account to control access based on IP and virtual network settings.
   * Note: This method is deprecated in favor of specifying network rules directly in the constructor props.
   * @param props Configuration properties for the network rules, including allowed IPs and virtual network subnet IDs.
   * @deprecated Use networkRules property in constructor props instead.
   */
  public addNetworkRules(_props: NetworkRulesProps): void {
    console.warn(
      "addNetworkRules is deprecated. Use networkRules property in constructor props instead.",
    );
    // This method is kept for backward compatibility but doesn't create additional resources
  }
}
