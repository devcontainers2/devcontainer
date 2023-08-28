import DevContainerConfig from "./DevContainerConfig.ts";
import { readFile } from "node:fs/promises";
import { jsonc as JSONC } from "npm:jsonc@^2.0.0";
import findConfig from "./findConfig.ts";

export default async function readConfig(config: string = await findConfig()) {
  return JSONC.parse(await readFile(config, "utf8")) as DevContainerConfig;
}
