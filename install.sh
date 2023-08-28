#!/bin/sh
{
  set -e
  curl -fsSLo "$HOME/.local/bin/devcontainer" "https://github.com/devcontainers/devcontainer/..."
  chmod +x "$HOME/.local/bin/devcontainer"
}
