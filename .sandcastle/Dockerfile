FROM node:22-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  jq \
  && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
  | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && apt-get update && apt-get install -y gh \
  && rm -rf /var/lib/apt/lists/*

# Enable pnpm via corepack (version pinned by package.json "packageManager")
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

# Build-args for UID/GID alignment: sandcastle docker build-image
# defaults these to the host user's UID/GID so image-built files
# and bind-mounted files share an owner without runtime chown.
ARG AGENT_UID=1000
ARG AGENT_GID=1000

# Rename the base image's "node" user to "agent" and align UID/GID.
RUN groupmod -o -g $AGENT_GID node && usermod -o -u $AGENT_UID -g $AGENT_GID -d /home/agent -m -l agent node
USER ${AGENT_UID}:${AGENT_GID}

# Install Claude Code CLI
RUN curl -fsSL https://claude.ai/install.sh | bash

# Bake the pnpm store from the lockfile so lanes install offline instead of
# each downloading the full dependency set. One ENV covers both `pnpm fetch`
# (build) and `pnpm install` (runtime) so their store paths can never diverge —
# a mismatch fails with ERR_PNPM_NO_OFFLINE_TARBALL.
# Requires building from the REPO ROOT (see package.json "sandcastle:image"),
# not `sandcastle docker build-image`, whose context is .sandcastle/.
ENV npm_config_store_dir=/home/agent/pnpm-store
COPY --chown=${AGENT_UID}:${AGENT_GID} package.json pnpm-lock.yaml pnpm-workspace.yaml /home/agent/fetch/
# pnpm fetch leaves a stray node_modules behind (pnpm/pnpm#8623).
RUN cd /home/agent/fetch && pnpm fetch && rm -rf /home/agent/fetch/node_modules

# Tool roster (wayfinder map #30, decided by #35/#46). The CLI ships a definition
# for every built-in tool and the lane was loading 29 to use four; tool definitions
# are 86-88% of the prefix floor, which rides every request. Sandcastle 0.12.0
# exposes no way to pass CLI flags, so a PATH shim prepends --tools before exec'ing
# the real binary. Both escape hatches fail OPEN — an unset SC_TOOLS or a CLI
# without the flag runs unmodified rather than failing the lane, because the worst
# case of failing open is paying full price.
#
# The roster is the union of what all four phase prompts ask for, plus Skill (to
# invoke .claude/skills/components-page). Do NOT narrow it from an observed
# transcript: the reviewer only used Bash+Read on issue-9 but its prompt tells it
# to edit and commit, and a merger without Read resolves conflicts blind, deletes
# another lane's work and opens the PR anyway. An unknown tool name is silently
# dropped (exit 0), so assert the effective roster from the init event in
# .sandcastle/logs/ after changing it — see .sandcastle/README.md.
#
# Deliberately placed AFTER `pnpm fetch` so editing the roster does not invalidate
# that ~90s layer.
ENV SC_TOOLS="Bash,Read,Edit,Write,Glob,Grep,TodoWrite,Skill"
RUN mkdir -p /home/agent/bin && printf '%s\n' \
  '#!/bin/sh' \
  'REAL=/home/agent/.local/bin/claude' \
  '[ -z "$SC_TOOLS" ] && exec "$REAL" "$@"' \
  '"$REAL" --help 2>/dev/null | grep -q -- --tools || exec "$REAL" "$@"' \
  'exec "$REAL" --tools "$SC_TOOLS" "$@"' \
  > /home/agent/bin/claude && chmod +x /home/agent/bin/claude

# Anthropic's bundled skills ride every request; this repo's lanes only use the
# project skill at .claude/skills/, which is bind-mounted and unaffected.
ENV CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1

# The shim dir must precede the real binary's dir.
ENV PATH="/home/agent/bin:/home/agent/.local/bin:$PATH"

WORKDIR /home/agent

# In worktree sandbox mode, Sandcastle bind-mounts the git worktree at /home/agent/workspace
# and overrides the working directory to /home/agent/workspace at container start.
# Structure your Dockerfile so that /home/agent/workspace can serve as the project root.
ENTRYPOINT ["sleep", "infinity"]
