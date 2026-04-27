# Design: Monthly Azure API Version Update Pipeline

## Context

This project maintains ~31 Azure AZAPI constructs, each with hand-curated `*-schemas.ts` files defining `VersionConfig[]` arrays for supported API versions. Today, discovering and adding new Azure API versions is entirely manual. This pipeline automates that process end-to-end: discover new stable versions monthly, generate accurate schema updates using AI, run tests, and create a PR.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Monthly Cron (15th of each month)                          │
│  .github/workflows/azure-version-update.yml                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Job 1: discover                                            │
│  ├─ Scan src/azure-*/lib/*-schemas.ts for resource types    │
│  ├─ Query ARM API for available stable versions             │
│  ├─ Diff against known versions                             │
│  └─ Output version-manifest.json                            │
│                                                             │
│  Job 2: generate (via GitHub Copilot Coding Agent)          │
│  ├─ Create a GitHub Issue with version update instructions  │
│  ├─ Assign to Copilot Coding Agent                          │
│  ├─ Agent fetches Azure REST API specs from GitHub          │
│  ├─ Agent generates new VersionConfig + ApiSchema entries   │
│  ├─ Agent updates defaultVersion() in construct files       │
│  ├─ Agent updates unit test version assertions              │
│  └─ Agent creates a PR with all changes                     │
│                                                             │
│  Job 3: test (triggered by PR creation)                     │
│  ├─ Existing build.yml runs on the PR                       │
│  ├─ Unit tests via npx projen build                         │
│  ├─ Integration tests (continue-on-error)                   │
│  └─ Results visible on the PR                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Approach: GitHub Copilot Coding Agent

Instead of writing custom code generation scripts that call Claude via GitHub Models API, we leverage the **GitHub Copilot Coding Agent** -- GitHub's built-in autonomous coding agent that can be assigned to issues and creates PRs autonomously.

### Why Copilot Coding Agent?

| Aspect | Custom Scripts + GitHub Models API | Copilot Coding Agent |
|--------|-----------------------------------|----------------------|
| Code generation | Custom TypeScript scripts with regex/template logic | Agent reads codebase, understands patterns, generates code |
| Maintenance burden | Must maintain spec-mapping, prompt engineering, file insertion logic | Zero maintenance -- agent adapts to project changes |
| Test execution | Custom workflow jobs for running tests | Agent can run tests itself and iterate on failures |
| PR creation | peter-evans/create-pull-request | Agent creates PR natively |
| Edge cases | Must handle every schema variation in code | Agent handles variations naturally via codebase understanding |
| New secret required | GITHUB_MODELS_TOKEN (PAT with models:read) | None -- uses existing Copilot license |
| Self-healing | Fails on unexpected schema patterns | Agent can read errors and fix its own code |

### How It Works

1. **Discovery script** (`scripts/azure-version-updater/discover.ts`) runs on a monthly cron and produces a `version-manifest.json` listing new API versions per construct
2. **Workflow creates a GitHub Issue** with structured instructions for the Copilot Coding Agent, including:
   - The version manifest (which constructs need updates, which new versions)
   - Links to Azure REST API spec files on GitHub for each new version
   - Instructions referencing the project's schema conventions and a reference file
3. **Copilot Coding Agent is assigned** to the issue via `gh issue edit --add-assignee @copilot`
4. **The agent autonomously**:
   - Reads the existing schema files to understand the pattern
   - Fetches Azure REST API specs to understand property changes
   - Generates new `ApiSchema` and `VersionConfig` entries
   - Updates `defaultVersion()` in construct files
   - Updates unit tests
   - Creates a PR
5. **Existing build.yml** runs on the PR (unit tests, lint, build)
6. **A separate integration test job** can be triggered on the PR

---

## Files to Create

### 1. `scripts/azure-version-updater/discover.ts`

**Purpose**: Scan constructs, query Azure ARM, produce a manifest of new versions.

**Logic**:
1. Glob `src/azure-*/lib/*-schemas.ts`
2. For each file, regex-extract:
   - Resource type constant: `export const \w+_TYPE\s*=\s*"(.+)"`
   - Schema prefix: `export const (\w+)_TYPE`
   - Known versions: all `version:\s*"(\d{4}-\d{2}-\d{2})"` strings
3. Dedupe by namespace, batch ARM API calls:
   `GET https://management.azure.com/providers/{namespace}?api-version=2024-09-01`
4. For each resource type, filter to stable versions (no `-preview`), find versions newer than the latest known
5. Write `version-manifest.json`:

```json
{
  "updates": [
    {
      "schemaFile": "src/azure-resourcegroup/lib/resource-group-schemas.ts",
      "constructFile": "src/azure-resourcegroup/lib/resource-group.ts",
      "testFile": "src/azure-resourcegroup/test/resource-group.spec.ts",
      "resourceType": "Microsoft.Resources/resourceGroups",
      "namespace": "Microsoft.Resources",
      "resourceTypeName": "resourceGroups",
      "prefix": "RESOURCE_GROUP",
      "knownVersions": ["2024-11-01", "2025-01-01", "2025-03-01"],
      "newVersions": ["2025-05-01", "2025-07-01"],
      "specUrls": {
        "2025-05-01": "https://github.com/Azure/azure-rest-api-specs/tree/main/specification/resources/resource-manager/Microsoft.Resources/stable/2025-05-01",
        "2025-07-01": "https://github.com/Azure/azure-rest-api-specs/tree/main/specification/resources/resource-manager/Microsoft.Resources/stable/2025-07-01"
      }
    }
  ],
  "summary": { "totalConstructs": 31, "constructsWithUpdates": 3 }
}
```

### 2. `scripts/azure-version-updater/spec-mapping.ts`

**Purpose**: Map Azure resource types to their REST API spec paths on GitHub.

Contains:
- `SPEC_PATH_MAP`: explicit mapping from resource type to spec directory path
- Convention-based fallback for unmapped types
- Helper to build spec URLs for the issue body

### 3. `.github/workflows/azure-version-update.yml`

**Purpose**: Monthly cron workflow that discovers versions and creates a Copilot Agent issue.

```yaml
name: azure-version-update
on:
  workflow_dispatch: {}
  schedule:
    - cron: "0 10 15 * *"  # 15th of month, 10:00 UTC

jobs:
  discover:
    name: Discover New API Versions
    runs-on: ubuntu-latest
    environment: Build
    permissions:
      contents: read
      id-token: write
      issues: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20.16.0" }
      - uses: azure/login@v2
        with:
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
      - run: yarn install --check-files --frozen-lockfile
      - name: Discover versions
        id: discover
        run: |
          npx ts-node scripts/azure-version-updater/discover.ts > version-manifest.json
          echo "has_updates=$(jq 'if .updates | length > 0 then "true" else "false" end' -r version-manifest.json)" >> "$GITHUB_OUTPUT"
      - name: Create Copilot Agent issue
        if: steps.discover.outputs.has_updates == 'true'
        env:
          GH_TOKEN: ${{ secrets.PROJEN_GITHUB_TOKEN }}
        run: |
          npx ts-node scripts/azure-version-updater/create-issue.ts version-manifest.json | \
            gh issue create \
              --title "feat(azure): update API versions to latest stable ($(date +%Y-%m))" \
              --body-file - \
              --assignee copilot
```

### 4. `scripts/azure-version-updater/create-issue.ts`

**Purpose**: Generate a well-structured GitHub Issue body that gives the Copilot Coding Agent all the context it needs.

The issue body will include:
- Summary of which constructs have new versions
- For each construct:
  - The schema file path
  - The construct file path
  - The test file path
  - Current latest version and new version(s)
  - Link to Azure REST API spec for the new version
- Reference to the project conventions:
  - "See `src/azure-resourcegroup/lib/resource-group-schemas.ts` as a reference for the schema pattern"
  - "See `src/core-azure/lib/version-manager/interfaces/version-interfaces.ts` for the interfaces"
- Explicit instructions:
  - "For each new version, create a new `ApiSchema` const and `VersionConfig` const following the naming convention `{PREFIX}_SCHEMA_{VERSION_UNDERSCORED}`"
  - "Add the new version to the `ALL_*_VERSIONS` array"
  - "Update `defaultVersion()` to return the newest version"
  - "Update unit tests to include the new version in version list assertions and update latest version expectations"
  - "Fetch the Azure REST API OpenAPI spec to identify any new or changed properties"
  - "Run `npm test` to verify unit tests pass"

### 5. `.github/copilot-instructions.md` (update)

Add project-specific instructions for the Copilot Agent to understand the schema conventions, file structure, and coding patterns. This file is automatically read by Copilot when working on the repo.

---

## Secrets Required

| Secret | Purpose | Status |
|--------|---------|--------|
| `AZURE_SUBSCRIPTION_ID` | ARM API calls for version discovery | Already exists |
| `AZURE_TENANT_ID` | Azure OIDC auth | Already exists |
| `AZURE_CLIENT_ID` | Azure OIDC auth | Already exists |
| `PROJEN_GITHUB_TOKEN` | Issue creation + Copilot Agent trigger | Already exists |

No new secrets needed -- the Copilot Coding Agent uses the organization's existing Copilot license.

---

## Copilot Agent Issue Template

```markdown
## Azure API Version Update - {month} {year}

The following constructs have new stable Azure API versions available.

### Instructions

For each construct listed below:
1. Open the Azure REST API spec link to understand property changes
2. Read the existing schema file to understand the pattern
3. Create new `ApiSchema` and `VersionConfig` entries following the exact naming convention
4. Add the new entries to the `ALL_*_VERSIONS` array
5. Update `defaultVersion()` in the construct file to return the newest version
6. Update unit tests to include the new version
7. Run `npm test` to verify

**Reference files:**
- Schema pattern: `src/azure-resourcegroup/lib/resource-group-schemas.ts`
- Interfaces: `src/core-azure/lib/version-manager/interfaces/version-interfaces.ts`

### Updates

#### 1. Resource Group (`Microsoft.Resources/resourceGroups`)
- **Schema file**: `src/azure-resourcegroup/lib/resource-group-schemas.ts`
- **Construct file**: `src/azure-resourcegroup/lib/resource-group.ts`
- **Test file**: `src/azure-resourcegroup/test/resource-group.spec.ts`
- **Current latest**: `2025-03-01`
- **New versions**: `2025-05-01`
- **Azure REST API spec**: https://github.com/Azure/azure-rest-api-specs/tree/main/specification/resources/resource-manager/Microsoft.Resources/stable/2025-05-01

#### 2. ...
```

---

## Verification

1. **Local testing of discover.ts**: `az login && npx ts-node scripts/azure-version-updater/discover.ts`
2. **Issue creation dry run**: Review generated issue body before assigning to Copilot
3. **Copilot Agent behavior**: Monitor the agent's PR for correctness
4. **CI validation**: Existing build.yml runs unit tests on the PR
5. **Manual review**: A human reviews the PR before merging

---

## Implementation Order

1. `scripts/azure-version-updater/spec-mapping.ts` -- resource type to spec path mapping
2. `scripts/azure-version-updater/discover.ts` -- version discovery
3. `scripts/azure-version-updater/create-issue.ts` -- issue body generation
4. `.github/workflows/azure-version-update.yml` -- workflow
5. `.github/copilot-instructions.md` -- Copilot Agent context
6. Test locally with `workflow_dispatch`
