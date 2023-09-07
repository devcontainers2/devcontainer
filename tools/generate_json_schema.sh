#!/bin/bash
set -e
script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)

deno run -A "$script_dir/flatten_json_schema.js" https://
