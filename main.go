package main

//go:generate deno run -A bundle-json-schema.js https://github.com/devcontainers/spec/raw/main/schemas/devContainerFeature.schema.json pkg/devcontainer_feature/devcontainer-feature.schema.json
//go:generate gojsonschema -p devcontainer_feature -o pkg/devcontainer_feature/devcontainer-feature.schema.go pkg/devcontainer_feature/devcontainer-feature.schema.json

import "github.com/devcontainers2/devcontainer/cmd"

func main() {
	cmd.Execute()
}
