You are an Azure Infrastructure Developer and expert on the Terraform CDK as well as AzAPI Terraform provider.

## Task: Convert Azure Resource Module to AzAPI
[MODULE_NAME] = azure-actiongroup in this guide

### Reference Patterns
Look at these existing AzAPI constructs for patterns:
- `src/azure-resourcegroup` - Simple AzAPI resource pattern
- `src/azure-kubernetes` - Complex AzAPI resource with flattened properties
- `src/azure-loganalytics` - AzAPI with property flattening and backward compatibility

### Target Module
Convert `src/[MODULE_NAME]` from AzureRM provider to AzAPI provider.

### Requirements

#### 1. AzAPI Migration
- Replace AzureRM provider imports with AzAPI `resource.Resource`
- Use appropriate Azure REST API version (e.g., `Microsoft.Insights/components@2020-02-02`)
- Update resource creation to use `parentId` instead of `resourceGroupName`
- Handle resource outputs using `${resource.fqn}.properties.PropertyName` pattern

#### 2. Flattened Properties Interface (Critical)
- **Flatten all nested `properties` fields** to top-level interface properties
- Convert AzAPI schema property names to user-friendly camelCase (e.g., `Application_Type` → `applicationType`)
- Maintain backward compatibility with deprecated `properties` field
- Priority: flattened properties override legacy `properties` field
- Add comprehensive JSDoc for all flattened properties

#### 3. Resource Group Integration
- Use AzAPI ResourceGroup construct: `import { ResourceGroup } from "../../azure-resourcegroup"`
- Pattern: `this.resourceGroup = props.resourceGroup || new ResourceGroup(...)`
- Access via: `this.resourceGroup.resourceGroup.id` for `parentId`

#### 4. Test Updates
- Update `.spec.ts` to use `AzapiProvider` instead of `AzurermProvider`
- Add test cases for flattened properties interface
- Add test cases for legacy properties backward compatibility
- Update `.integ.ts` to use AzAPI constructs where possible (but don't run integration tests)
- Update snapshots with `--updateSnapshot` flag

#### 5. Documentation
- Update README.md with:
  - New flattened interface examples
  - Migration guide from AzureRM to AzAPI
  - Backward compatibility notes
  - Property descriptions with valid values

### Implementation Pattern

```typescript
// 1. Define AzAPI schema interface
interface [Resource]Properties {
  Property_Name: string; // AzAPI schema format
}

// 2. Define flattened user interface
interface [Resource]Props {
  // Flattened properties (user-friendly)
  readonly propertyName: string;
  
  // Legacy support (deprecated)
  /** @deprecated Use flattened properties instead */
  readonly properties?: [Resource]Properties;
}

// 3. Constructor pattern
constructor(scope: Construct, id: string, props: [Resource]Props) {
  // Resource group setup
  this.resourceGroup = props.resourceGroup || new ResourceGroup(...);
  
  // Build properties with precedence
  const resourceProperties: [Resource]Properties = {
    ...props.properties, // Legacy base
    // Override with flattened properties
    Property_Name: props.propertyName || props.properties?.Property_Name,
  };
  
  // Create AzAPI resource
  this.resource = new resource.Resource(this, "resource", {
    type: "Microsoft.Service/resourceType@api-version",
    parentId: this.resourceGroup.resourceGroup.id,
    body: { properties: resourceProperties },
  });
}
```

### Testing Commands
```bash
# Test specific spec file
npx jest src/[MODULE_NAME]/test/[TestFile].spec.ts --updateSnapshot

# Verify no compilation errors
npx tsc --noEmit src/[MODULE_NAME]/lib/*.ts
```

### Success Criteria
- [ ] No compilation errors
- [ ] All spec tests pass
- [ ] Flattened properties interface implemented
- [ ] Backward compatibility maintained
- [ ] README updated with examples
- [ ] Integration test updated (but not executed)

### Common Gotchas
1. Resource outputs: Use `${resource.fqn}.properties.PropertyName` not `resource.output.properties`
2. Resource group reference: Use `resourceGroup.resourceGroup.id` not `resourceGroup.id`
3. Property precedence: Flattened properties should override legacy properties
4. Test provider: Use `AzapiProvider` not `AzurermProvider` in spec tests
5. Property naming: Convert `Snake_Case` to `camelCase` for user interface

### Schema Reference
If available, use the provided schema files (e.g., `acr.md`) to understand all possible properties for the AzAPI resource type.