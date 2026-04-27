#!/usr/bin/env ts-node
/**
 * Azure API Version Discovery Script
 *
 * Scans all AZAPI construct schema files, queries the Azure ARM providers API
 * for available API versions, and outputs a JSON manifest of new versions.
 *
 * Usage:
 *   npx ts-node scripts/azure-version-updater/discover.ts > version-manifest.json
 *
 * Prerequisites:
 *   - Must be authenticated with Azure (`az login` or OIDC in CI)
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");
const specMapping = require("./spec-mapping");

interface SchemaFileInfo {
  schemaFile: string;
  constructFile: string;
  testFile: string;
  resourceType: string;
  namespace: string;
  resourceTypeName: string;
  prefix: string;
  knownVersions: string[];
}

interface UpdateEntry extends SchemaFileInfo {
  newVersions: string[];
  specUrls: Record<string, string>;
}

interface VersionManifest {
  updates: UpdateEntry[];
  noUpdates: Array<{ resourceType: string; latestKnown: string }>;
  errors: Array<{ resourceType: string; error: string }>;
  summary: {
    totalConstructs: number;
    constructsWithUpdates: number;
    totalNewVersions: number;
    discoveryDate: string;
  };
}

/**
 * Scan all schema files and extract resource type info.
 */
function scanSchemaFiles(): SchemaFileInfo[] {
  const srcDir = path.resolve(__dirname, "../../src");
  const results: SchemaFileInfo[] = [];

  const azureDirs = fs
    .readdirSync(srcDir)
    .filter((d: string) => d.startsWith("azure-"))
    .map((d: string) => path.join(srcDir, d));

  for (const dir of azureDirs) {
    const libDir = path.join(dir, "lib");
    if (!fs.existsSync(libDir)) continue;

    // Find all *-schemas.ts files recursively
    const schemaFiles = findSchemaFiles(libDir);

    for (const schemaFile of schemaFiles) {
      const content = fs.readFileSync(schemaFile, "utf-8");
      const infos = extractSchemaInfo(schemaFile, content, dir);
      results.push(...infos);
    }
  }

  return results;
}

function findSchemaFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findSchemaFiles(full));
    } else if (entry.name.endsWith("-schemas.ts")) {
      files.push(full);
    }
  }
  return files;
}

function extractSchemaInfo(
  schemaFile: string,
  content: string,
  constructDir: string,
): SchemaFileInfo[] {
  const results: SchemaFileInfo[] = [];
  const rootDir = path.resolve(__dirname, "../..");

  // Extract all TYPE constants
  const typeRegex = /export\s+const\s+(\w+)_TYPE\s*=\s*"([^"]+)"/g;
  let match;
  while ((match = typeRegex.exec(content)) !== null) {
    const prefix = match[1];
    const resourceType = match[2];
    const parts = resourceType.split("/");
    const namespace = parts[0];
    const resourceTypeName = parts.slice(1).join("/");

    // Extract known versions from this file for this resource type
    // Match version strings in VersionConfig blocks
    const versionRegex = /version:\s*"(\d{4}-\d{2}-\d{2})"/g;
    const knownVersions = new Set<string>();
    let vMatch;
    while ((vMatch = versionRegex.exec(content)) !== null) {
      knownVersions.add(vMatch[1]);
    }

    // Find corresponding construct and test files
    const constructFile = findConstructFile(constructDir, prefix);
    const testFile = findTestFile(constructDir, prefix);

    results.push({
      schemaFile: path.relative(rootDir, schemaFile),
      constructFile: constructFile
        ? path.relative(rootDir, constructFile)
        : "",
      testFile: testFile ? path.relative(rootDir, testFile) : "",
      resourceType,
      namespace,
      resourceTypeName,
      prefix,
      knownVersions: Array.from(knownVersions.values()).sort(),
    });
  }

  return results;
}

function findConstructFile(
  constructDir: string,
  _prefix: string,
): string | null {
  const libDir = path.join(constructDir, "lib");
  if (!fs.existsSync(libDir)) return null;

  // Look for .ts files (not -schemas.ts) that contain defaultVersion()
  const tsFiles = fs
    .readdirSync(libDir)
    .filter((f: string) => f.endsWith(".ts") && !f.endsWith("-schemas.ts") && f !== "index.ts");

  for (const f of tsFiles) {
    const content = fs.readFileSync(path.join(libDir, f), "utf-8");
    if (content.includes("defaultVersion()")) {
      return path.join(libDir, f);
    }
  }
  return null;
}

function findTestFile(constructDir: string, _prefix: string): string | null {
  const testDir = path.join(constructDir, "test");
  if (!fs.existsSync(testDir)) return null;

  const specFiles = fs
    .readdirSync(testDir)
    .filter((f: string) => f.endsWith(".spec.ts"));
  return specFiles.length > 0 ? path.join(testDir, specFiles[0]) : null;
}

/**
 * Get an Azure access token using the CLI.
 */
function getAccessToken(): string {
  const result = execSync(
    'az account get-access-token --query accessToken -o tsv',
    { encoding: "utf-8" },
  );
  return result.trim();
}

/**
 * Fetch available API versions from the ARM providers endpoint.
 */
async function fetchProviderVersions(
  namespace: string,
  token: string,
): Promise<Record<string, string[]>> {
  const url = `https://management.azure.com/providers/${namespace}?api-version=2024-11-01`;
  const response = await httpGet(url, {
    Authorization: `Bearer ${token}`,
  });

  const data = JSON.parse(response);
  const result: Record<string, string[]> = {};

  if (data.resourceTypes) {
    for (const rt of data.resourceTypes) {
      result[rt.resourceType] = rt.apiVersions || [];
    }
  }
  return result;
}

function httpGet(
  url: string,
  headers: Record<string, string>,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "GET",
      headers: { ...headers, "Content-Type": "application/json" },
    };
    const req = https.request(options, (res: any) => {
      let body = "";
      res.on("data", (chunk: Buffer) => (body += chunk.toString()));
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(
            new Error(
              `HTTP ${res.statusCode} from ${url}: ${body.substring(0, 500)}`,
            ),
          );
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

/**
 * Case-insensitive lookup of resource type in provider data.
 * ARM API may return "dnszones" when we expect "dnsZones", or
 * child resources may not be listed separately -- fall back to parent.
 */
function findVersionsCaseInsensitive(
  providerData: Record<string, string[]>,
  resourceTypeName: string,
): string[] | undefined {
  // Try exact match first
  if (providerData[resourceTypeName]) {
    return providerData[resourceTypeName];
  }
  // Case-insensitive match
  const lowerTarget = resourceTypeName.toLowerCase();
  for (const [key, value] of Object.entries(providerData)) {
    if (key.toLowerCase() === lowerTarget) {
      return value;
    }
  }
  // For child resources like "virtualNetworks/subnets" or
  // "networkManagers/connectivityConfigurations", try the top-level parent
  if (resourceTypeName.includes("/")) {
    const parent = resourceTypeName.split("/")[0];
    return findVersionsCaseInsensitive(providerData, parent);
  }
  return undefined;
}

async function main(): Promise<void> {
  const schemaInfos = scanSchemaFiles();
  console.error(
    `Found ${schemaInfos.length} resource types across schema files`,
  );

  // Get Azure access token
  let token: string;
  try {
    token = getAccessToken();
  } catch (e) {
    console.error(
      "Failed to get Azure access token. Ensure you are logged in with `az login`.",
    );
    process.exit(1);
  }

  // Dedupe namespaces and fetch provider info
  const namespaces = [...new Set(schemaInfos.map((s) => s.namespace))];
  console.error(`Querying ${namespaces.length} Azure namespaces...`);

  const providerCache: Record<string, Record<string, string[]>> = {};
  for (const ns of namespaces) {
    try {
      providerCache[ns] = await fetchProviderVersions(ns, token);
      console.error(`  ${ns}: OK (${Object.keys(providerCache[ns]).length} resource types)`);
    } catch (e) {
      console.error(`  ${ns}: FAILED - ${(e as Error).message}`);
      providerCache[ns] = {};
    }
  }

  // Compare and find new versions
  const manifest: VersionManifest = {
    updates: [],
    noUpdates: [],
    errors: [],
    summary: {
      totalConstructs: schemaInfos.length,
      constructsWithUpdates: 0,
      totalNewVersions: 0,
      discoveryDate: new Date().toISOString().split("T")[0],
    },
  };

  for (const info of schemaInfos) {
    const providerData = providerCache[info.namespace];
    if (!providerData || Object.keys(providerData).length === 0) {
      manifest.errors.push({
        resourceType: info.resourceType,
        error: `No provider data for namespace ${info.namespace}`,
      });
      continue;
    }

    // ARM API may return resource type names with different casing (e.g., "dnszones" vs "dnsZones").
    // Do a case-insensitive lookup.
    const rtName = info.resourceTypeName;
    const armVersions = findVersionsCaseInsensitive(providerData, rtName);

    if (!armVersions) {
      manifest.errors.push({
        resourceType: info.resourceType,
        error: `Resource type "${rtName}" not found in provider ${info.namespace}. Available: ${Object.keys(providerData).slice(0, 10).join(", ")}...`,
      });
      continue;
    }

    // Filter to stable only (no -preview) and newer than our latest
    const latestKnown =
      info.knownVersions.length > 0
        ? info.knownVersions[info.knownVersions.length - 1]
        : "0000-00-00";

    const newVersions = armVersions
      .filter((v) => !v.includes("-preview") && v > latestKnown)
      .sort();

    if (newVersions.length === 0) {
      manifest.noUpdates.push({
        resourceType: info.resourceType,
        latestKnown,
      });
      continue;
    }

    // Build spec URLs for each new version
    const specUrls: Record<string, string> = {};
    for (const v of newVersions) {
      specUrls[v] = specMapping.getSpecTreeUrl(info.resourceType, v);
    }

    manifest.updates.push({
      ...info,
      newVersions,
      specUrls,
    });

    manifest.summary.constructsWithUpdates++;
    manifest.summary.totalNewVersions += newVersions.length;
  }

  // Output manifest to stdout (logs go to stderr)
  console.log(JSON.stringify(manifest, null, 2));

  console.error(
    `\nSummary: ${manifest.summary.constructsWithUpdates}/${manifest.summary.totalConstructs} constructs have ${manifest.summary.totalNewVersions} new version(s)`,
  );
  if (manifest.errors.length > 0) {
    console.error(`Errors: ${manifest.errors.length} resource types could not be queried`);
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
