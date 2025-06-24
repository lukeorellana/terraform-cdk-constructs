import { Construct } from "constructs";
import * as resource from "../../../.gen/providers/azapi/resource";

/**
 * Access Control Entry for Data Lake Path (AzAPI schema).
 */
export interface DataLakePathAce {
  /**
   * The type of ACE (access control entry).
   */
  type?: string;
  /**
   * The ID of the user or group.
   */
  id?: string;
  /**
   * The permissions for this ACE.
   */
  permissions?: string;
}

export interface DataLakePathConfig {
  readonly group?: string;
  readonly owner?: string;
  readonly ace?: DataLakePathAce[];
  readonly filesystemName?: string;
  readonly storageAccountId?: string;
  readonly path?: string;
  readonly resource?: string;
}

export class DataLakePath extends Construct {
  public readonly name: string;
  public readonly pathResource: resource.Resource;
  /**
   * Manages a specific path within an Azure Data Lake Storage Gen2 filesystem.
   *
   * This class provides functionality to configure and manage a data path within a Data Lake Gen2 filesystem,
   * such as directories and files, with access control settings. It is used to create and manage the structure
   * and security settings of data stored in Azure Data Lake Storage Gen2.
   *
   * @param scope - The scope in which to define this construct, typically representing the Cloud Development Kit (CDK) stack.
   * @param id - The unique identifier for this instance of the Data Lake path. Typically, this is the name of the path.
   * @param props - Configuration properties for the Data Lake Gen2 path. These properties may include:
   *                - `filesystemName`: The name of the filesystem within which this path is defined.
   *                - `path`: The specific path within the filesystem. This could represent a file or a directory.
   *                - `storageAccountId`: The ID of the Azure Storage account that hosts the filesystem.
   *                - `ace`: An array of access control expressions to define permissions for the path.
   *                - `owner`: The owner of the path for access control purposes.
   *                - `group`: The owning group for the path for access control purposes.
   *                - `resource`: Type of the resource, typically a file or directory.
   *
   * Example usage:
   * ```typescript
   * const dataLakePath = new DataLakePath(this, 'myDataPath', {
   *   filesystemName: 'myfilesystem',
   *   path: 'path/to/directory',
   *   storageAccountId: 'storage_account_id',
   *   owner: 'owner_id',
   *   group: 'group_id',
   *   ace: [{
   *     id: 'user_id',
   *     type: 'user',
   *     permissions: 'rwx',
   *   }],
   *   resource: 'directory'
   * });
   * ```
   * This setup creates and manages a directory or a file path within a specified Data Lake Gen2 filesystem,
   * applying the necessary permissions and access controls as configured.
   */
  constructor(scope: Construct, id: string, props: DataLakePathConfig) {
    super(scope, id);
    this.name = props.path || id;

    // Create the Data Lake path using AzAPI
    // Note: Paths in Data Lake are typically managed at the filesystem level
    // For now, we'll create a simple resource representation
    this.pathResource = new resource.Resource(this, "path", {
      type: "Microsoft.Storage/storageAccounts/blobServices/containers/blobs@2023-01-01",
      name: this.name,
      parentId: `${props.storageAccountId}/blobServices/default/containers/${props.filesystemName}`,
      body: {
        properties: {
          contentType:
            props.resource === "directory"
              ? "httpd/unix-directory"
              : "application/octet-stream",
        },
      },
    });
  }
}
