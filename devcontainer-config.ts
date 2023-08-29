#!/usr/bin/env -S deno run -A
import process from "node:process";
import { writeFile } from "node:fs/promises";
import { parseArgs } from "@pkgjs/parseargs";
import { dedent } from "ts-dedent";
import loadDevContainerConfig from "./lib/loadDevContainerConfig.ts";

const helpText = dedent`
devcontainer config
`;

const options = {
  help: { type: "boolean", short: "h" },
  output: { type: "string", short: "o" },
  quiet: { type: "boolean", short: "q" },
};
const { values, positionals } = parseArgs({ options, allowPositionals: true });

if (values.help) {
  console.log(helpText);
} else {
  const c = await loadDevContainerConfig(positionals[0]);

  if (!values.quiet) {
    if (values.output) {
      await writeFile(values.output, JSON.stringify(c, null, 2));
    } else {
      console.log(JSON.stringify(c, null, 2));
    }
  }
}
