import { App } from "cdktf";
import { CoreInfrastructure } from "./core-infrastructure";

const app = new App();

new CoreInfrastructure(
  app,
  "coreInfrastructure",
  "EastUS2",
  "635ff6b0-25c0-4b95-ae39-e04703583504",
);

app.synth();
