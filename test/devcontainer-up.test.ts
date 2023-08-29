import assert from "node:assert";
import temporaryWriteFolder from "./temporaryWriteFolder.ts";
import { $ } from "zx";
const { test } = Deno;

test("universal", async () => {
  const folder = await temporaryWriteFolder({
    ".devcontainer/devcontainer.json": JSON.stringify({
      image: "mcr.microsoft.com/devcontainers/base:debian",
    }),
  });

  await $`deno run -A devcontainer-up.ts ${folder}`;
});
