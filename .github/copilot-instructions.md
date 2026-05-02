# Copilot Instructions for terraform-cdk-constructs

## Project Overview

This is `@microsoft/terraform-cdk-constructs` — a JSII-compatible TypeScript library providing Azure CDK constructs using the AZAPI Terraform provider for direct Azure REST API access.

## Architecture

- Each Azure resource lives in `src/azure-<name>/` with:
  - `lib/<resource>.ts` — main construct class extending `AzapiResource`
  - `lib/<resource>-schemas.ts` — API version schemas (`VersionConfig[]`)
  - `test/<resource>.spec.ts` — unit tests (Jest)
  - `test/<resource>.integ.ts` — integration tests (real Azure)

- Core framework in `src/core-azure/`:
  - `lib/azapi/azapi-resource.ts` — abstract base class
  - `lib/version-manager/api-version-manager.ts` — version registry singleton
  - `lib/version-manager/interfaces/version-interfaces.ts` — all interfaces

## Schema File Conventions

Each `*-schemas.ts` file follows this exact pattern:

1. **Imports** from `../../core-azure/lib/version-manager/interfaces/version-interfaces`
2. **Shared properties** object (e.g., `COMMON_PROPERTIES`) with `PropertyDefinition` entries
3. **Per-version `ApiSchema` exports** named `{PREFIX}_SCHEMA_{VERSION_UNDERSCORED}`:
   ```typescript
   export const RESOURCE_GROUP_SCHEMA_2025_03_01: ApiSchema = {
     resourceType: "Microsoft.Resources/resourceGroups",
     version: "2025-03-01",
     properties: { ...COMMON_PROPERTIES },
     required: ["location"],
     optional: ["tags", "managedBy"],
   };
   ```
4. **Per-version `VersionConfig` exports** named `{PREFIX}_VERSION_{VERSION_UNDERSCORED}`:
   ```typescript
   export const RESOURCE_GROUP_VERSION_2025_03_01: VersionConfig = {
     version: "2025-03-01",
     schema: RESOURCE_GROUP_SCHEMA_2025_03_01,
     supportLevel: VersionSupportLevel.ACTIVE,
     releaseDate: "2025-03-01",
   };
   ```
5. **`ALL_*_VERSIONS` array** aggregating all `VersionConfig` objects
6. **`*_TYPE` constant** with the Azure resource type string

## Adding a New API Version

When adding a new API version to an existing construct:

1. Add a new `ApiSchema` const using the naming convention `{PREFIX}_SCHEMA_{YYYY_MM_DD}`
2. Add a new `VersionConfig` const using `{PREFIX}_VERSION_{YYYY_MM_DD}`
3. Set `supportLevel: VersionSupportLevel.ACTIVE` on the new version
4. Add it to the `ALL_*_VERSIONS` array
5. Update `defaultVersion()` in the construct class to return the new version
6. Update unit tests:
   - Latest version assertions (e.g., `resolvedApiVersion` and `latestVersion()`)
   - Version list completeness checks
   - "All versions work" iteration arrays
7. Run `npm test` to verify

## Key Interfaces

- `PropertyDefinition`: `{ dataType, required?, defaultValue?, description?, validation? }`
- `ApiSchema`: `{ resourceType, version, properties, required, optional?, deprecated? }`
- `VersionConfig`: `{ version, schema, supportLevel, releaseDate, changeLog? }`
- Use `PropertyType.STRING`, `PropertyType.OBJECT`, etc. (JSII-compatible class constants, not enums)
- Use `VersionSupportLevel.ACTIVE`, `.MAINTENANCE`, `.DEPRECATED`, `.SUNSET`
- Use `ValidationRuleType.REQUIRED`, `.PATTERN_MATCH`, `.VALUE_RANGE`

## Testing

- Unit tests: `npm test` (runs `jest --testMatch '**/*.spec.ts'`)
- Integration tests: `npm run integration` (deploys to real Azure)
- Test helper: `BaseTestStack` in `src/testing/`

## Build

- `npx projen build` — compiles, lints, tests, and generates JSII artifacts
- `yarn install --check-files --frozen-lockfile` — install dependencies
