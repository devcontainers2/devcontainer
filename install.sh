#!/bin/sh
# MIT License
# Copyright (c) 2023 Microsoft Corporation
set -e

if [ "$OS" = Windows_NT ]; then
	bin='devcontainer-x86_64-pc-windows-msvc.exe'
else
	case $(uname -sm) in
    "Darwin x86_64") bin='devcontainer-x86_64-apple-darwin' ;;
    "Darwin arm64") bin='devcontainer-aarch64-apple-darwin' ;;
    "Linux aarch64") bin='devcontainer-aarch64-unknown-linux-gnu' ;;
    *) bin='devcontainer-x86_64-unknown-linux-gnu' ;;
	esac
fi

repo='devcontainers2/devcontainer'
if [ -n "$1" ]; then
	url="https://github.com/$repo/releases/download/$1/$bin"
else
	url="https://github.com/$repo/releases/latest/download/$bin"
fi

dir=$(realpath "${PREFIX:-$HOME/.local}")
if [ "$OS" = Windows_NT ]; then
  out="$dir/devcontainer.exe"
else
  out="$dir/devcontainer"
fi

mkdir -p "$dir"
curl -fsSL "$url" -o "$dir/devcontainer"

if [ "$(command -v devcontainer)" != "$out" ]; then
  echo "export PATH=\"\$PATH:$dir\"" >>"$HOME/.bashrc"
  echo "Added $dir to \$PATH via ~/.bashrc"
  if [ -f "$HOME/.zshrc" ]; then
    echo "export PATH=\"\$PATH:$dir\"" >>"$HOME/.zshrc"
    echo "Added $dir to \$PATH via ~/.zshrc"
  fi
  echo "Run 'exec \$SHELL' to reload your shell"
fi
