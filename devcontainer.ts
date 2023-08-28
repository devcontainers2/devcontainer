#!/usr/bin/env -S deno run -A
import process from "node:process";
// Deno's 'node:util' doesn't have 'util.parseArgs()' yet.
import { parseArgs } from "npm:@pkgjs/parseargs@0.11.0";
import { dedent } from "npm:ts-dedent@^2.2.0";
import denoConfig from "./deno.json" assert { type: "json" };
const { version } = denoConfig;

const helpText = dedent`
devcontainer v${version}
🌐 https://devcontainers.org/devcontainer/
`;

if (process.argv[2]?.match(/[\w-]+/)) {
  const subcommands = {
    __proto__: null,
    build: () => import("./devcontainer-build.ts"),
    config: () => import("./devcontainer-config.ts"),
  };
  if (process.argv[2] in subcommands) {
    const x = process.argv[2];
    process.argv.splice(2, 1); // Delete 'process.argv[2]' in-place.
    await subcommands[x]();
  } else {
    console.error(`Unknown subcommand ${process.argv[2]}`);
    console.error(helpText);
    process.exitCode = 1;
  }
} else {
  const options = {
    help: { type: "boolean", short: "h" },
    version: { type: "boolean", short: "v" },
  };
  const { values } = parseArgs({ options });
  if (values.help) {
    console.log(helpText);
  } else if (values.version) {
    console.log(version);
  } else {
    console.error(`Must specify a subcommand`);
    console.error(helpText);
    process.exitCode = 1;
  }
}
