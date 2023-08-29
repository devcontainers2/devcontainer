import assert from "node:assert";
import temporaryWriteFolder from "./temporaryWriteFolder.ts";
import { $ } from "zx";
const { test } = Deno;

test("folder with .devcontainer folder", async () => {
  const folder = await temporaryWriteFolder({
    ".devcontainer/devcontainer.json": JSON.stringify({
      image: "mcr.microsoft.com/devcontainers/universal",
    }),
  });

  await $`deno run -A devcontainer-config.ts ${folder}`;
});

test("folder with .devcontainer.json", async () => {
  const folder = await temporaryWriteFolder({
    ".devcontainer.json": JSON.stringify({
      image: "mcr.microsoft.com/devcontainers/universal",
    }),
  });

  await $`deno run -A devcontainer-config.ts ${folder}`;
});
