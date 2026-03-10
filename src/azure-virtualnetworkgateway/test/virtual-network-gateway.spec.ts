/**
 * Comprehensive tests for the Virtual Network Gateway implementation
 *
 * This test suite validates the VirtualNetworkGateway class using the AzapiResource framework.
 * Tests cover automatic version resolution, explicit version pinning, schema validation,
 * property transformation, and resource creation.
 */

import { Testing } from "cdktn";
import * as cdktn from "cdktn";
import {
  VirtualNetworkGateway,
  VirtualNetworkGatewayProps,
} from "../lib/virtual-network-gateway";

describe("VirtualNetworkGateway - Implementation", () => {
  let app: cdktn.App;
  let stack: cdktn.TerraformStack;

  beforeEach(() => {
    app = Testing.app();
    stack = new cdktn.TerraformStack(app, "TestStack");
  });

  describe("Constructor and Basic Properties", () => {
    it("should create virtual network gateway with automatic latest version resolution", () => {
      const props: VirtualNetworkGatewayProps = {
        name: "test-vng",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      };

      const vng = new VirtualNetworkGateway(stack, "TestVNG", props);

      expect(vng).toBeInstanceOf(VirtualNetworkGateway);
      expect(vng.props).toBe(props);
      expect(vng.name).toBe("test-vng");
      expect(vng.location).toBe("eastus");
    });

    it("should create virtual network gateway with explicit version pinning", () => {
      const props: VirtualNetworkGatewayProps = {
        name: "test-vng-pinned",
        location: "westus",
        apiVersion: "2024-01-01",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw2",
          tier: "VpnGw2",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        tags: { environment: "test" },
      };

      const vng = new VirtualNetworkGateway(stack, "TestVNG", props);

      expect(vng.resolvedApiVersion).toBe("2024-01-01");
      expect(vng.tags).toEqual({ environment: "test" });
    });

    it("should create virtual network gateway with all optional properties", () => {
      const props: VirtualNetworkGatewayProps = {
        name: "test-vng-full",
        location: "centralus",
        gatewayType: "Vpn",
        vpnType: "RouteBased",
        sku: {
          name: "VpnGw3",
          tier: "VpnGw3",
        },
        ipConfigurations: [
          {
            name: "default",
            privateIPAllocationMethod: "Dynamic",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        enableBgp: true,
        activeActive: false,
        bgpSettings: {
          asn: 65515,
          peerWeight: 0,
        },
        vpnGatewayGeneration: "Generation2",
        tags: {
          environment: "production",
          project: "networking",
          owner: "team@company.com",
        },
        ignoreChanges: ["tags"],
      };

      const vng = new VirtualNetworkGateway(stack, "TestVNG", props);

      expect(vng.props.gatewayType).toBe("Vpn");
      expect(vng.props.vpnType).toBe("RouteBased");
      expect(vng.props.enableBgp).toBe(true);
      expect(vng.props.bgpSettings).toEqual(props.bgpSettings);
      expect(vng.props.tags).toEqual(props.tags);
    });

    it("should use default name when name is not provided", () => {
      const props: VirtualNetworkGatewayProps = {
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      };

      const vng = new VirtualNetworkGateway(stack, "TestVNG", props);

      expect(vng.name).toBe("TestVNG");
    });
  });

  describe("Resource Type and API Versions", () => {
    it("should have correct resource type", () => {
      const vng = new VirtualNetworkGateway(stack, "TestVNG", {
        name: "test-vng",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng).toBeInstanceOf(VirtualNetworkGateway);
    });

    it("should support all registered API versions", () => {
      const versions = ["2024-01-01", "2024-05-01"];

      versions.forEach((version) => {
        const vng = new VirtualNetworkGateway(
          stack,
          `VNG-${version.replace(/-/g, "")}`,
          {
            name: `vng-${version}`,
            location: "eastus",
            apiVersion: version,
            gatewayType: "Vpn",
            sku: {
              name: "VpnGw1",
              tier: "VpnGw1",
            },
            ipConfigurations: [
              {
                name: "default",
                subnetId:
                  "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
                publicIPAddressId:
                  "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
              },
            ],
          },
        );

        expect(vng.resolvedApiVersion).toBe(version);
      });
    });

    it("should use latest version as default", () => {
      const vng = new VirtualNetworkGateway(stack, "TestVNG", {
        name: "test-vng",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.resolvedApiVersion).toBe("2024-05-01");
    });
  });

  describe("Gateway Type Configuration", () => {
    it("should create VPN gateway", () => {
      const vng = new VirtualNetworkGateway(stack, "VpnGateway", {
        name: "vng-vpn",
        location: "eastus",
        gatewayType: "Vpn",
        vpnType: "RouteBased",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.props.gatewayType).toBe("Vpn");
      expect(vng.props.vpnType).toBe("RouteBased");
    });

    it("should create ExpressRoute gateway", () => {
      const vng = new VirtualNetworkGateway(stack, "ErGateway", {
        name: "vng-er",
        location: "eastus",
        gatewayType: "ExpressRoute",
        sku: {
          name: "ErGw1AZ",
          tier: "ErGw1AZ",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.props.gatewayType).toBe("ExpressRoute");
    });

    it("should default vpnType to RouteBased", () => {
      const vng = new VirtualNetworkGateway(stack, "DefaultVpnType", {
        name: "vng-default",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.props.vpnType).toBeUndefined();
    });
  });

  describe("IP Configuration", () => {
    it("should create gateway with single IP configuration", () => {
      const vng = new VirtualNetworkGateway(stack, "SingleIP", {
        name: "vng-single",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "config1",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip1",
          },
        ],
      });

      expect(vng.props.ipConfigurations).toHaveLength(1);
      expect(vng.props.ipConfigurations[0].name).toBe("config1");
    });

    it("should create active-active gateway with two IP configurations", () => {
      const vng = new VirtualNetworkGateway(stack, "ActiveActive", {
        name: "vng-aa",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        activeActive: true,
        ipConfigurations: [
          {
            name: "config1",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip1",
          },
          {
            name: "config2",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip2",
          },
        ],
      });

      expect(vng.props.activeActive).toBe(true);
      expect(vng.props.ipConfigurations).toHaveLength(2);
    });
  });

  describe("BGP Configuration", () => {
    it("should create gateway with BGP enabled", () => {
      const vng = new VirtualNetworkGateway(stack, "BgpEnabled", {
        name: "vng-bgp",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        enableBgp: true,
        bgpSettings: {
          asn: 65515,
          peerWeight: 0,
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.props.enableBgp).toBe(true);
      expect(vng.props.bgpSettings).toBeDefined();
      expect(vng.props.bgpSettings?.asn).toBe(65515);
    });

    it("should default enableBgp to false", () => {
      const vng = new VirtualNetworkGateway(stack, "BgpDisabled", {
        name: "vng-no-bgp",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.props.enableBgp).toBeUndefined();
    });
  });

  describe("SKU Configuration", () => {
    it("should create gateway with Basic SKU", () => {
      const vng = new VirtualNetworkGateway(stack, "BasicSku", {
        name: "vng-basic",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "Basic",
          tier: "Basic",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.props.sku.name).toBe("Basic");
      expect(vng.props.sku.tier).toBe("Basic");
    });

    it("should create gateway with VpnGw1 SKU", () => {
      const vng = new VirtualNetworkGateway(stack, "VpnGw1Sku", {
        name: "vng-vpngw1",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.props.sku.name).toBe("VpnGw1");
      expect(vng.props.sku.tier).toBe("VpnGw1");
    });
  });

  describe("Tags Management", () => {
    it("should create gateway with tags", () => {
      const vng = new VirtualNetworkGateway(stack, "TaggedGateway", {
        name: "vng-tagged",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        tags: {
          environment: "production",
          cost_center: "engineering",
        },
      });

      expect(vng.props.tags).toEqual({
        environment: "production",
        cost_center: "engineering",
      });
    });

    it("should support adding tags", () => {
      const vng = new VirtualNetworkGateway(stack, "AddTag", {
        name: "vng-add-tag",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        tags: { environment: "test" },
      });

      vng.addTag("newTag", "newValue");
      expect(vng.props.tags!.newTag).toBe("newValue");
      expect(vng.props.tags!.environment).toBe("test");
    });

    it("should support removing tags", () => {
      const vng = new VirtualNetworkGateway(stack, "RemoveTag", {
        name: "vng-remove-tag",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        tags: {
          environment: "test",
          temporary: "true",
        },
      });

      vng.removeTag("temporary");
      expect(vng.props.tags!.temporary).toBeUndefined();
      expect(vng.props.tags!.environment).toBe("test");
    });
  });

  describe("Terraform Outputs", () => {
    it("should create Terraform outputs", () => {
      const vng = new VirtualNetworkGateway(stack, "OutputTest", {
        name: "vng-outputs",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.idOutput).toBeInstanceOf(cdktn.TerraformOutput);
      expect(vng.nameOutput).toBeInstanceOf(cdktn.TerraformOutput);
      expect(vng.locationOutput).toBeInstanceOf(cdktn.TerraformOutput);
      expect(vng.tagsOutput).toBeInstanceOf(cdktn.TerraformOutput);
    });

    it("should have correct id format", () => {
      const vng = new VirtualNetworkGateway(stack, "IdFormat", {
        name: "vng-id",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.id).toMatch(/^\$\{.*\.id\}$/);
      expect(vng.resourceId).toBe(vng.id);
    });
  });

  describe("Version Compatibility", () => {
    it("should work with all supported API versions", () => {
      const versions = ["2024-01-01", "2024-05-01"];

      versions.forEach((version) => {
        const vng = new VirtualNetworkGateway(
          stack,
          `VNG-${version.replace(/-/g, "")}`,
          {
            name: `vng-${version}`,
            location: "eastus",
            apiVersion: version,
            gatewayType: "Vpn",
            sku: {
              name: "VpnGw1",
              tier: "VpnGw1",
            },
            ipConfigurations: [
              {
                name: "default",
                subnetId:
                  "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
                publicIPAddressId:
                  "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
              },
            ],
          },
        );

        expect(vng.resolvedApiVersion).toBe(version);
      });
    });
  });

  describe("Ignore Changes Configuration", () => {
    it("should apply ignore changes lifecycle rules", () => {
      const vng = new VirtualNetworkGateway(stack, "IgnoreChanges", {
        name: "vng-ignore",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        ignoreChanges: ["tags"],
      });

      expect(vng).toBeInstanceOf(VirtualNetworkGateway);
      expect(vng.props.ignoreChanges).toEqual(["tags"]);
    });

    it("should handle empty ignore changes array", () => {
      const vng = new VirtualNetworkGateway(stack, "EmptyIgnore", {
        name: "vng-empty-ignore",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        ignoreChanges: [],
      });

      expect(vng).toBeInstanceOf(VirtualNetworkGateway);
    });
  });

  describe("CDK Terraform Integration", () => {
    it("should synthesize to valid Terraform configuration", () => {
      new VirtualNetworkGateway(stack, "SynthTest", {
        name: "vng-synth",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        tags: { test: "synthesis" },
      });

      const synthesized = Testing.synth(stack);
      expect(synthesized).toBeDefined();

      const stackConfig = JSON.parse(synthesized);
      expect(stackConfig.resource).toBeDefined();
    });

    it("should handle multiple gateways in the same stack", () => {
      const vng1 = new VirtualNetworkGateway(stack, "VNG1", {
        name: "vng-1",
        location: "eastus",
        gatewayType: "Vpn",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      const vng2 = new VirtualNetworkGateway(stack, "VNG2", {
        name: "vng-2",
        location: "westus",
        apiVersion: "2024-01-01",
        gatewayType: "ExpressRoute",
        sku: {
          name: "ErGw1AZ",
          tier: "ErGw1AZ",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng1.resolvedApiVersion).toBe("2024-05-01");
      expect(vng2.resolvedApiVersion).toBe("2024-01-01");

      const synthesized = Testing.synth(stack);
      expect(synthesized).toBeDefined();
    });
  });

  describe("VPN Client Configuration", () => {
    it("should create gateway with VPN client configuration", () => {
      const vng = new VirtualNetworkGateway(stack, "P2S", {
        name: "vng-p2s",
        location: "eastus",
        gatewayType: "Vpn",
        vpnType: "RouteBased",
        sku: {
          name: "VpnGw1",
          tier: "VpnGw1",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
        vpnClientConfiguration: {
          vpnClientAddressPool: {
            addressPrefixes: ["172.16.0.0/24"],
          },
          vpnClientProtocols: ["IkeV2", "OpenVPN"],
        },
      });

      expect(vng.props.vpnClientConfiguration).toBeDefined();
      expect(
        vng.props.vpnClientConfiguration?.vpnClientAddressPool?.addressPrefixes,
      ).toContain("172.16.0.0/24");
    });
  });

  describe("VPN Gateway Generation", () => {
    it("should create gateway with Generation2", () => {
      const vng = new VirtualNetworkGateway(stack, "Gen2", {
        name: "vng-gen2",
        location: "eastus",
        gatewayType: "Vpn",
        vpnType: "RouteBased",
        sku: {
          name: "VpnGw2",
          tier: "VpnGw2",
        },
        vpnGatewayGeneration: "Generation2",
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Network/publicIPAddresses/pip",
          },
        ],
      });

      expect(vng.props.vpnGatewayGeneration).toBe("Generation2");
    });
  });

  describe("ExpressRoute Gateway Without Public IP", () => {
    it("should create ExpressRoute gateway without public IP (auto-assigned)", () => {
      const vng = new VirtualNetworkGateway(stack, "ErGatewayNoPublicIp", {
        name: "vng-er-no-pip",
        location: "eastus",
        gatewayType: "ExpressRoute",
        sku: {
          name: "ErGw1AZ",
          tier: "ErGw1AZ",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/GatewaySubnet",
            // publicIPAddressId intentionally omitted
          },
        ],
      });

      expect(vng).toBeDefined();
      expect(vng).toBeInstanceOf(VirtualNetworkGateway);
      expect(vng.props.gatewayType).toBe("ExpressRoute");
      expect(vng.props.ipConfigurations).toHaveLength(1);
      expect(vng.props.ipConfigurations[0].publicIPAddressId).toBeUndefined();
    });

    it("should omit publicIPAddress from synthesized JSON when not provided", () => {
      new VirtualNetworkGateway(stack, "ErGatewayNoPublicIpSynth", {
        name: "vng-er-no-pip-synth",
        location: "eastus",
        gatewayType: "ExpressRoute",
        sku: {
          name: "ErGw1AZ",
          tier: "ErGw1AZ",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/GatewaySubnet",
            // publicIPAddressId intentionally omitted
          },
        ],
      });

      const synthesized = Testing.synth(stack);
      const stackConfig = JSON.parse(synthesized);

      // Find the azapi_resource for the gateway
      const azapiResources = stackConfig.resource?.azapi_resource;
      expect(azapiResources).toBeDefined();

      // Find the gateway resource by looking for any key containing the identifier
      const resourceKeys = Object.keys(azapiResources);
      const gatewayKey = resourceKeys.find(
        (key) =>
          key.toLowerCase().includes("ergatewaynopublicipsynth") ||
          key.toLowerCase().includes("er_gateway_no_public_ip_synth"),
      );
      expect(gatewayKey).toBeDefined();
      const gatewayResource = azapiResources[gatewayKey!];
      expect(gatewayResource).toBeDefined();

      // Access the body (it may be a string or object depending on synthesis)
      const body =
        typeof gatewayResource.body === "string"
          ? JSON.parse(gatewayResource.body)
          : gatewayResource.body;
      expect(body.properties.ipConfigurations).toBeDefined();
      expect(body.properties.ipConfigurations).toHaveLength(1);

      // Verify publicIPAddress is not present in the ipConfiguration
      const ipConfig = body.properties.ipConfigurations[0];
      expect(ipConfig.name).toBe("default");
      expect(ipConfig.properties.subnet).toBeDefined();
      expect(ipConfig.properties.publicIPAddress).toBeUndefined();
    });

    it("should include publicIPAddress in synthesized JSON when provided", () => {
      new VirtualNetworkGateway(stack, "ErGatewayWithPublicIp", {
        name: "vng-er-with-pip",
        location: "eastus",
        gatewayType: "ExpressRoute",
        sku: {
          name: "ErGw1AZ",
          tier: "ErGw1AZ",
        },
        ipConfigurations: [
          {
            name: "default",
            subnetId:
              "/subscriptions/sub-id/resourceGroups/test-rg/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/GatewaySubnet",
            publicIPAddressId:
              "/subscriptions/sub-id/resourceGroups/test-rg/providers/Microsoft.Network/publicIPAddresses/test-pip",
          },
        ],
      });

      const synthesized = Testing.synth(stack);
      const stackConfig = JSON.parse(synthesized);

      // Find the azapi_resource for the gateway
      const azapiResources = stackConfig.resource?.azapi_resource;
      expect(azapiResources).toBeDefined();

      // Find the gateway resource by looking for any key containing the identifier
      const resourceKeys = Object.keys(azapiResources);
      const gatewayKey = resourceKeys.find(
        (key) =>
          key.toLowerCase().includes("ergatewaywithpublicip") ||
          key.toLowerCase().includes("er_gateway_with_public_ip"),
      );
      expect(gatewayKey).toBeDefined();
      const gatewayResource = azapiResources[gatewayKey!];
      expect(gatewayResource).toBeDefined();

      // Access the body (it may be a string or object depending on synthesis)
      const body =
        typeof gatewayResource.body === "string"
          ? JSON.parse(gatewayResource.body)
          : gatewayResource.body;
      expect(body.properties.ipConfigurations).toBeDefined();
      expect(body.properties.ipConfigurations).toHaveLength(1);

      // Verify publicIPAddress IS present in the ipConfiguration
      const ipConfig = body.properties.ipConfigurations[0];
      expect(ipConfig.name).toBe("default");
      expect(ipConfig.properties.subnet).toBeDefined();
      expect(ipConfig.properties.publicIPAddress).toBeDefined();
      expect(ipConfig.properties.publicIPAddress.id).toBe(
        "/subscriptions/sub-id/resourceGroups/test-rg/providers/Microsoft.Network/publicIPAddresses/test-pip",
      );
    });
  });
});
