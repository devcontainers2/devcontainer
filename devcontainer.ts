#!/usr/bin/env -S deno run -A
import process from "node:process";
import { parseArgs } from "@pkgjs/parseargs";
import { dedent } from "ts-dedent";
import denoConfig from "./deno.json" assert { type: "json" };

import("zx").then(({ $ }) => {
  $.verbose = !!process.env.DEBUG;
});
const { version } = denoConfig;

const helpText = dedent`
devcontainer v${version}
🌐 https://devcontainers.org/devcontainer/
`;

if (process.argv[2]?.match(/[\w][\w\-]*/)) {
  const subcommands = {
    __proto__: null!,
    build: () => import("./devcontainer-build.ts"),
    config: () => import("./devcontainer-config.ts"),
    down: () => import("./devcontainer-down.ts"),
    exec: () => import("./devcontainer-exec.ts"),
    info: () => import("./devcontainer-info.ts"),
    init: () => import("./devcontainer-init.ts"),
    inspect: () => import("./devcontainer-inspect.ts"),
    push: () => import("./devcontainer-push.ts"),
    search: () => import("./devcontainer-search.ts"),
    up: () => import("./devcontainer-up.ts"),
  } as const;
  if (process.argv[2] in subcommands) {
    const x = process.argv[2] as keyof typeof subcommands;
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
