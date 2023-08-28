import process from "node:process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { xdgConfig } from "npm:xdg-basedir@^5.1.0";

export default async function findConfig(wd: string = process.cwd()) {
  let x: string;
  if (
    existsSync((x = join(wd, ".devcontainer.json"))) ||
    existsSync((x = join(wd, ".devcontainer", "devcontainer.json"))) ||
    existsSync((x = join(xdgConfig, "default-devcontainer.json")))
  ) {
    return x;
  } else {
    throw new DOMException(
      `Could not find Dev Container configuration in ${wd}`,
      "NotFoundError"
    );
  }
}
