#!/usr/bin/env pwsh
# MIT License
# Copyright (c) 2023 Microsoft Corporation
$ErrorActionPreference = 'Stop'

$bin = 'devcontainer-x86_64-pc-windows-msvc.exe'
$repo = 'devcontainers2/devcontainer'
if (!$v) {
	$url = "https://github.com/$repo/releases/download/$1/$bin"
} else {
	$url = "https://github.com/$repo/releases/latest/download/$bin"
}

$dir = (Resolve-Path "$env:PREFIX").Path
if (!$dir) {
  $dir = "$env:LOCALAPPDATA\devcontainer"
}
$out = "$dir\devcontainer.exe"

if (!(Test-Path $dir)) {
  New-Item $dir -ItemType Directory | Out-Null
}
curl -L $url -o "$dir/devcontainer.exe"

if ((Get-Command devcontainer).Path != "$out") {
  $User = [System.EnvironmentVariableTarget]::User
  $Path = [System.Environment]::GetEnvironmentVariable('Path', $User)
  [System.Environment]::SetEnvironmentVariable('Path', "$Path;$dir", $User)
  echo "Added $dir to $$env:PATH for current user"
  echo "Run 'refreshenv' to reload env vars in your shell"
}
