#!/usr/bin/env -S deno run -A
import process from "node:process";
import { writeFile } from "node:fs/promises";
// Deno's 'node:util' doesn't have 'util.parseArgs()' yet.
import { parseArgs } from "npm:@pkgjs/parseargs@0.11.0";
import { dedent } from "npm:ts-dedent@^2.2.0";
import readConfig from "./lib/readConfig.ts";

const helpText = dedent`
devcontainer config
`;

const options = {
  help: { type: "boolean", short: "h" },
  file: { type: "string", short: "f" },
  output: { type: "string", short: "o" },
  quiet: { type: "boolean", short: "q" },
};
const { values, positionals } = parseArgs({ options });
if (values.help) {
  console.log(helpText);
} else {
  const devcontainerConfig = await readConfig(positionals[0]);

  if (values.output) {
    await writeFile(values.output, JSON.stringify(devcontainerConfig, null, 2));
  } else {
    console.log(JSON.stringify(devcontainerConfig, null, 2));
  }
}
