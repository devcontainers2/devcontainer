import process from "node:process";
import { tmpdir } from "node:os";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { writeFile, mkdir } from "node:fs/promises";

async function createTempFolder() {}

export default async function temporaryWriteFolder(
  files: Record<string, string>
) {
  const folder = join(tmpdir(), Math.random());
  await mkdir(folder, { recursive: true });
  process.on("exit", () => {
    rmSync(folder, { recursive: true });
  });

  for (const [path, text] of Object.entries(files)) {
    await mkdir(join(folder, path, ".."), { recursive: true });
    await writeFile(join(folder, path), text);
  }

  return folder;
}
