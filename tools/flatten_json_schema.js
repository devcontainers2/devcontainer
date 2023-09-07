#!/usr/bin/env -S deno run -A
import process from "node:process";
import { writeFile } from "node:fs/promises";
import $RefParser from "npm:json-schema-ref-parser";

const bundle = await $RefParser.dereference(process.argv[2]);
await writeFile(process.argv[3], JSON.stringify(bundle, null, 2));
