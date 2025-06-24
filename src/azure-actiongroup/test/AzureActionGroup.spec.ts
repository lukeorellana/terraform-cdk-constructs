import { Testing, TerraformStack } from "cdktf";
import "cdktf/lib/testing/adapters/jest";
import { ActionGroup } from "..";
import { AzapiProvider } from "../../../.gen/providers/azapi/provider";
import { TerraformPlan } from "../../testing";

describe("Action Group With Defaults", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test");

    new AzapiProvider(stack, "azapi", {});

    new ActionGroup(stack, "testAzureActionGroupDefaults", {
      name: "testactiongroup",
      shortName: "testshortn",
    });

    fullSynthResult = Testing.fullSynth(stack);
  });

  it("renders an Action Group with defaults and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot();
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult);
  });
});

describe("Action Group With Custom Properties", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test2");

    new AzapiProvider(stack, "azapi", {});

    new ActionGroup(stack, "testAzureActionGroupCustom", {
      name: "testactiongroup",
      shortName: "testshortn",
      enabled: false,
      location: "global",
      tags: {
        test: "test",
      },
    });

    fullSynthResult = Testing.fullSynth(stack);
  });

  it("renders an Action Group with custom properties and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot();
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult);
  });
});

describe("Action Group With Flattened Interface", () => {
  let stack: TerraformStack;
  let fullSynthResult: any;

  beforeEach(() => {
    const app = Testing.app();
    stack = new TerraformStack(app, "test3");

    new AzapiProvider(stack, "azapi", {});

    new ActionGroup(stack, "testAzureActionGroupFlattened", {
      name: "testactiongroup",
      shortName: "testshortn",
      enabled: true,
      location: "global",
      emailReceivers: [
        {
          name: "admin",
          emailAddress: "admin@example.com",
          useCommonAlertSchema: true,
        },
      ],
      smsReceivers: [
        {
          name: "adminSms",
          countryCode: "1",
          phoneNumber: "5551234567",
        },
      ],
      webhookReceivers: [
        {
          name: "webhook1",
          serviceUri: "https://example.com/webhook",
          useCommonAlertSchema: false,
        },
      ],
      tags: {
        environment: "production",
      },
    });

    fullSynthResult = Testing.fullSynth(stack);
  });

  it("renders an Action Group with flattened interface and checks snapshot", () => {
    expect(Testing.synth(stack)).toMatchSnapshot();
  });

  it("check if this can be planned", () => {
    TerraformPlan(fullSynthResult);
  });
});
