import process from "node:process";
import { access } from "node:fs/promises";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { jsonc as JSONC } from "jsonc";
import DevContainerConfig from "./DevContainerConfig.ts";

const exists = (p: string) =>
  access(p)
    .then(() => true)
    .catch(() => false);

async function loadDevContainerConfig(
  wd: string = process.cwd()
): Promise<DevContainerConfig> {
  let found: string | undefined;
  for (const x of [
    join(wd, ".devcontainer.json"),
    join(wd, ".devcontainer", "devcontainer.json"),
  ]) {
    if (await exists(x)) {
      found = x;
      break;
    }
  }
  if (!found) {
    throw new DOMException(
      `Could not find Dev Container configuration in ${wd}`,
      "NotFoundError"
    );
  }

  const rawConfig = JSONC.parse(await readFile(found, "utf8"));
  if (rawConfig.image) {
    return {
      type: "image",
      ...rawConfig,
    };
  } else if (rawConfig.dockerFile) {
    return {
      type: "dockerfile",
      ...rawConfig,
    };
  } else if (rawConfig.dockerComposeFile) {
    return {
      type: "docker-compose",
      ...rawConfig,
    };
  } else {
    throw new DOMException(
      `${found} is not a valid Dev Container configuration. It must have an ` +
        `"image", "dockerFile", or "dockerComposeFile" property.`,
      "SyntaxError"
    );
  }
}

export default loadDevContainerConfig;
