import assert from "node:assert";
import temporaryWriteFolder from "../lib/temporaryWriteFolder.ts";
import { $ } from "npm:zx@^7.2.3";
const { test } = Deno;

test("universal", async () => {
  const folder = await temporaryWriteFolder({
    ".devcontainer/devcontainer.json": JSON.stringify({
      image: "mcr.microsoft.com/devcontainers/universal",
    }),
  });

  await $`deno run -A devcontainer-up.ts ${folder}`;
});
