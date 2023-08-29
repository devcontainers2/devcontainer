#!/usr/bin/env -S deno run -A
import process from "node:process";
import { parseArgs } from "@pkgjs/parseargs";
import { dedent } from "ts-dedent";
import loadDevContainerConfig from "./lib/loadDevContainerConfig.ts";
import { $ } from "zx";

const helpText = dedent`
devcontainer up
`;

const options = {
  help: { type: "boolean", short: "h" },
  rm: { type: "boolean" },
};
const { values, positionals } = parseArgs({ options, allowPositionals: true });

if (values.help) {
  console.log(helpText);
} else {
  const c = await loadDevContainerConfig(positionals[0]);

  if (c.type === "image") {
    await $`docker run -it \
      ${values.rm ? "--rm" : ""} \
      ${c.image}`;
  } else if (c.type === "dockerfile") {
  } else if (c.type === "docker-compose") {
  }
}
