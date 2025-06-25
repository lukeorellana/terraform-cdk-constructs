import { Testing, TerraformStack } from "cdktf";
import { setupJest } from "cdktf/lib/testing/adapters/jest";
import * as apgw from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan, cleanupCdkTfOutDirs } from "../../testing";

setupJest();

describe("Application Gateway With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  afterAll(() => {
    // Clean up after all tests in this suite have run
    cleanupCdkTfOutDirs();
  });

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new apgw.Gateway(stack, "testAzureApplicationGatewayDefaults2", {
      name: "application-gateway",
      location: "eastus",
      skuTier: "WAF_v2",
      skuSize: "WAF_v2",
      capacity: 2,
      gatewayIpConfigurations: [
        {
          name: "gateway-ip-config",
          subnet: {
            id: "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/subnet",
          },
        },
      ],
      frontendIpConfigurations: [
        {
          name: "Public",
          publicIPAddress: {
            id: "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        },
      ],
      frontendPorts: [{ name: "frontend-port", port: 80 }],
      backendAddressPools: [
        { name: "backend-address-pool-1" },
        {
          name: "backend-address-pool-2",
          backendAddresses: [
            { ipAddress: "10.0.0.4" },
            { ipAddress: "10.0.0.5" },
            { ipAddress: "10.0.0.6" },
          ],
        },
      ],
      httpListeners: [
        {
          name: "http-listener",
          frontendPort: { id: "frontend-port" },
          frontendIPConfiguration: { id: "Public" },
          protocol: "Http",
        },
      ],
      backendHttpSettings: [
        {
          name: "backend-http-setting",
          port: 80,
          protocol: "Http",
          requestTimeout: 20,
          cookieBasedAffinity: "Disabled",
        },
      ],
      requestRoutingRules: [
        {
          name: "request-routing-rule-1",
          httpListener: { id: "http-listener" },
          backendAddressPool: { id: "backend-address-pool-1" },
          backendHttpSettings: { id: "backend-http-setting" },
          ruleType: "Basic",
        },
        {
          name: "request-routing-rule-2",
          httpListener: { id: "http-listener" },
          backendAddressPool: { id: "backend-address-pool-2" },
          backendHttpSettings: { id: "backend-http-setting" },
          ruleType: "Basic",
        },
      ],
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  it("renders an Application Gateway with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});

describe("Application Gateway with Legacy Properties", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  afterAll(() => {
    // Clean up after all tests in this suite have run
    cleanupCdkTfOutDirs();
  });

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test-legacy");

    new AzapiProvider(stack, "azapi", {});

    new apgw.Gateway(stack, "testLegacyApplicationGateway", {
      name: "legacy-application-gateway",
      location: "eastus",
      skuTier: "Standard_v2",
      skuSize: "Standard_v2",
      capacity: 1,
      // Using legacy properties for backward compatibility test
      properties: {
        sku: {
          name: "Standard_v2",
          tier: "Standard_v2",
          capacity: 1,
        },
        gatewayIPConfigurations: [
          {
            name: "legacy-gateway-ip-config",
            subnet: {
              id: "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/subnet",
            },
          },
        ],
        frontendIPConfigurations: [
          {
            name: "legacy-frontend-ip",
            publicIPAddress: {
              id: "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
            },
          },
        ],
        frontendPorts: [{ name: "legacy-port-80", port: 80 }],
        backendAddressPools: [{ name: "legacy-backend-pool" }],
        backendHttpSettingsCollection: [
          {
            name: "legacy-http-settings",
            port: 80,
            protocol: "Http",
            cookieBasedAffinity: "Disabled",
          },
        ],
        httpListeners: [
          {
            name: "legacy-listener",
            frontendIPConfiguration: { id: "legacy-frontend-ip" },
            frontendPort: { id: "legacy-port-80" },
            protocol: "Http",
          },
        ],
        requestRoutingRules: [
          {
            name: "legacy-routing-rule",
            ruleType: "Basic",
            httpListener: { id: "legacy-listener" },
            backendAddressPool: { id: "legacy-backend-pool" },
            backendHttpSettings: { id: "legacy-http-settings" },
          },
        ],
      },
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  it("renders an Application Gateway with legacy properties and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});

describe("Application Gateway with Mixed Properties", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  afterAll(() => {
    // Clean up after all tests in this suite have run
    cleanupCdkTfOutDirs();
  });

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test-mixed");

    new AzapiProvider(stack, "azapi", {});

    new apgw.Gateway(stack, "testMixedApplicationGateway", {
      name: "mixed-application-gateway",
      location: "eastus",
      // New flattened properties should override legacy properties
      skuTier: "WAF_v2", // This should override properties.sku.tier
      skuSize: "WAF_v2", // This should override properties.sku.name
      capacity: 3, // This should override properties.sku.capacity
      gatewayIpConfigurations: [
        {
          name: "new-gateway-ip-config",
          subnet: {
            id: "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/subnet",
          },
        },
      ],
      // Legacy properties (should be overridden by flattened properties above)
      properties: {
        sku: {
          name: "Standard_v2", // Should be overridden by skuSize: "WAF_v2"
          tier: "Standard_v2", // Should be overridden by skuTier: "WAF_v2"
          capacity: 1, // Should be overridden by capacity: 3
        },
        gatewayIPConfigurations: [
          {
            name: "legacy-gateway-ip-config", // Should be overridden
            subnet: { id: "/subscriptions/legacy/subnet" },
          },
        ],
        frontendIPConfigurations: [
          {
            name: "legacy-frontend-ip",
            publicIPAddress: {
              id: "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
            },
          },
        ],
        frontendPorts: [{ name: "legacy-port-80", port: 80 }],
        backendAddressPools: [{ name: "legacy-backend-pool" }],
        backendHttpSettingsCollection: [
          {
            name: "legacy-http-settings",
            port: 80,
            protocol: "Http",
            cookieBasedAffinity: "Disabled",
          },
        ],
        httpListeners: [
          {
            name: "legacy-listener",
            frontendIPConfiguration: { id: "legacy-frontend-ip" },
            frontendPort: { id: "legacy-port-80" },
            protocol: "Http",
          },
        ],
        requestRoutingRules: [
          {
            name: "legacy-routing-rule",
            ruleType: "Basic",
            httpListener: { id: "legacy-listener" },
            backendAddressPool: { id: "legacy-backend-pool" },
            backendHttpSettings: { id: "legacy-http-settings" },
          },
        ],
      },
    });

    fullSynthResult = Testing.fullSynth(stack); // Save the result for reuse
  });

  it("renders an Application Gateway with mixed properties (flattened override legacy) and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot(); // Compare the already prepared stack
  });

  it("check if the produced terraform configuration is valid", () => {
    expect(fullSynthResult).toBeValidTerraform(); // Use the saved result
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult); // Use the saved result
  });
});
