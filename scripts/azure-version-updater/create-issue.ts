#!/usr/bin/env ts-node
/**
 * Create Issue Body for GitHub Copilot Coding Agent
 *
 * Reads the version-manifest.json and generates a structured GitHub Issue body
 * that provides the Copilot Coding Agent with all context needed to update
 * the schema files, construct files, and tests.
 *
 * Usage:
 *   npx ts-node scripts/azure-version-updater/create-issue.ts version-manifest.json
 *
 * Outputs the issue body (markdown) to stdout for piping to `gh issue create --body-file -`.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");

interface UpdateEntry {
  schemaFile: string;
  constructFile: string;
  testFile: string;
  resourceType: string;
  namespace: string;
  resourceTypeName: string;
  prefix: string;
  knownVersions: string[];
  newVersions: string[];
  specUrls: Record<string, string>;
}

interface VersionManifest {
  updates: UpdateEntry[];
  errors: Array<{ resourceType: string; error: string }>;
  summary: {
    totalConstructs: number;
    constructsWithUpdates: number;
    totalNewVersions: number;
    discoveryDate: string;
  };
}

function generateIssueBody(manifest: VersionManifest): string {
  const lines: string[] = [];

  lines.push("## Azure API Version Update\n");
  lines.push(
    `**Discovery date**: ${manifest.summary.discoveryDate}`,
  );
  lines.push(
    `**Constructs with updates**: ${manifest.summary.constructsWithUpdates} of ${manifest.summary.totalConstructs}`,
  );
  lines.push(
    `**Total new versions**: ${manifest.summary.totalNewVersions}\n`,
  );

  lines.push("---\n");
  lines.push("## Instructions\n");
  lines.push(
    "For each construct listed below, add new API version support by following these steps:\n",
  );
  lines.push(
    "1. **Read the existing schema file** to understand the pattern (property definitions, naming conventions, structure)",
  );
  lines.push(
    "2. **Open the Azure REST API spec link** to check for property changes between the previous and new API version",
  );
  lines.push(
    "3. **Create new `ApiSchema` and `VersionConfig` const exports** following the exact naming convention `{PREFIX}_SCHEMA_{VERSION_UNDERSCORED}` and `{PREFIX}_VERSION_{VERSION_UNDERSCORED}` (e.g., `RESOURCE_GROUP_SCHEMA_2025_05_01`)",
  );
  lines.push(
    "4. **Add the new entries** to the `ALL_*_VERSIONS` array at the end",
  );
  lines.push(
    "5. **Update `defaultVersion()`** in the construct file to return the newest version string",
  );
  lines.push(
    "6. **Update unit tests** (`.spec.ts`) to include the new version in version list assertions and update the latest version expectation",
  );
  lines.push("7. **Run `npm test`** to verify all unit tests pass\n");

  lines.push("### Key conventions\n");
  lines.push(
    "- New `ApiSchema` entries should spread `COMMON_PROPERTIES` (or the equivalent shared properties object in the file) and include any new properties from the API spec",
  );
  lines.push(
    "- New `VersionConfig` entries should have `supportLevel: VersionSupportLevel.ACTIVE`",
  );
  lines.push(
    "- Set `releaseDate` to today's date in `YYYY-MM-DD` format",
  );
  lines.push(
    "- Add `changeLog` entries for any added, removed, or changed properties",
  );
  lines.push(
    "- If the API spec shows no property changes, clone the previous version's schema exactly with only the version string updated\n",
  );

  lines.push("### Reference files\n");
  lines.push(
    "- **Schema pattern example**: `src/azure-resourcegroup/lib/resource-group-schemas.ts`",
  );
  lines.push(
    "- **TypeScript interfaces**: `src/core-azure/lib/version-manager/interfaces/version-interfaces.ts`",
  );
  lines.push(
    "- **Unit test pattern**: `src/azure-resourcegroup/test/resource-group.spec.ts`\n",
  );

  lines.push("---\n");
  lines.push("## Constructs to Update\n");

  for (let i = 0; i < manifest.updates.length; i++) {
    const update = manifest.updates[i];
    const latestKnown =
      update.knownVersions[update.knownVersions.length - 1] || "none";

    lines.push(
      `### ${i + 1}. \`${update.resourceType}\` (prefix: \`${update.prefix}\`)\n`,
    );
    lines.push(`| Field | Value |`);
    lines.push(`|-------|-------|`);
    lines.push(`| Schema file | \`${update.schemaFile}\` |`);
    if (update.constructFile) {
      lines.push(`| Construct file | \`${update.constructFile}\` |`);
    }
    if (update.testFile) {
      lines.push(`| Test file | \`${update.testFile}\` |`);
    }
    lines.push(
      `| Known versions | ${update.knownVersions.map((v) => `\`${v}\``).join(", ")} |`,
    );
    lines.push(`| Current latest | \`${latestKnown}\` |`);
    lines.push(
      `| **New versions** | ${update.newVersions.map((v) => `**\`${v}\`**`).join(", ")} |`,
    );
    lines.push("");

    // Spec links
    if (Object.keys(update.specUrls).length > 0) {
      lines.push("**Azure REST API Specs:**");
      for (const [version, url] of Object.entries(update.specUrls)) {
        lines.push(`- [${version}](${url})`);
      }
      lines.push("");
    }
  }

  // Errors section
  if (manifest.errors.length > 0) {
    lines.push("---\n");
    lines.push("## Discovery Errors\n");
    lines.push(
      "The following resource types could not be queried (may need manual review):\n",
    );
    for (const err of manifest.errors) {
      lines.push(`- \`${err.resourceType}\`: ${err.error}`);
    }
    lines.push("");
  }

  lines.push("---\n");
  lines.push(
    "*This issue was automatically created by the [azure-version-update](.github/workflows/azure-version-update.yml) workflow.*",
  );

  return lines.join("\n");
}

function main(): void {
  const manifestPath = process.argv[2];
  if (!manifestPath) {
    console.error("Usage: create-issue.ts <version-manifest.json>");
    process.exit(1);
  }

  const manifest: VersionManifest = JSON.parse(
    fs.readFileSync(manifestPath, "utf-8"),
  );

  if (manifest.updates.length === 0) {
    console.error("No updates found in manifest. Nothing to do.");
    process.exit(0);
  }

  const body = generateIssueBody(manifest);
  console.log(body);
}

main();
