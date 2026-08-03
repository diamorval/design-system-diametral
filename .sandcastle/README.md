# Sandcastle

Agents work your GitHub issues in parallel Docker containers, then open one pull request per issue onto the branch you launched from (or merge directly, with `--delivery merge`).

---

## Run it

```fish
pnpm sandcastle
```

That's the whole thing. It works every open issue labelled `Sandcastle`, 5 at a time, and opens a PR per issue onto the branch you're standing on. You review and merge the PRs; merging closes the issue (`Closes #N`).

Prefer the old behaviour — everything merged straight into your branch, issues closed for you:

```fish
pnpm sandcastle --delivery merge
```

**Walk away for 1.5–3 hours.**

---

## First time today? Do this instead

```fish
pnpm sandcastle --issue 9
```

One issue, one lane, ~20–40 min. If the result looks good, the other 14 will too.

**Do this before any big run.** It's the cheap way to find out the prompts need work.

---

## Work specific issues

Interactive (pick issues + overrides from menus, confirm, launch):

```fish
pnpm sandcastle:custom
```

Or directly:

```fish
pnpm sandcastle --issue 9          # one lane
pnpm sandcastle --issue 9,12,15    # three lanes, still capped by concurrency
```

`--issue` skips the planner: no dependency graph, no `Sandcastle` label needed, and the issue can even be closed. Loops work like the normal run — up to `maxIterations` rounds, stopping early once a round lands no commits (everything done or stuck). Later rounds only retry lanes that still produce changes.

Concurrency still applies, so `--issue 9,12,15` runs all three (3 < the default 5). To force one at a time:

```fish
SC_CONCURRENCY=1 pnpm sandcastle --issue 9,12,15
```

---

## Inspect & maintain

Runs leave state behind — `sandcastle/*` branches, and logs that nothing rotates.
Five commands read and prune it. Bare `pnpm sc` lists all eight.

**What did the runs leave behind?**

```fish
pnpm sc status
```

Run live or idle · `sandcastle/*` branches · lane worktrees, scoped to
`.sandcastle/worktrees/` · log count, size, and how many are older than 24 h.
Local reads only, always exits 0. `pnpm sc status --prs` adds the PR state of
each branch — the one network call, so it's opt-in.

**Read a lane log**

```fish
pnpm sc logs                     # pick from a list, then follow it
pnpm sc logs 9                   # issue 9's newest phase, no prompt
pnpm sc logs merger --no-follow  # dump the last run instead of following
```

The argument is a filename substring; logs are named `planner`, `merger`, and
`issue-<id>-{implementer,reviewer}`. Following starts at the last
`--- Run started:` delimiter or the last 20 lines, whichever is later, so you
never replay a previous run. Ctrl-C stops it, like `tail -f`.

**Prune the logs**

```fish
pnpm sc clean         # truncate each log to its last run
pnpm sc clean --all   # delete them all (confirms; --yes skips)
```

~2 MB per run, append-only, nothing rotates. The default never loses the run
you're debugging. Logs are all this touches — never branches, worktrees,
containers, or the image. `--all` refuses while a run is live.

**Before a big run**

```fish
pnpm sc doctor
```

Docker running · image current · `gh` logged in · `.sandcastle/.env` filled. It
prints the fix under each failure and exits 1, so `pnpm sc doctor && pnpm sandcastle`
gates. It reports and never repairs — each fix already has an owner.

**Which settings are actually in effect?**

```fish
pnpm sc config
```

Every value with its origin: `default`, or the `SC_*` var or flag that overrode
it. Prints only; nothing is saved.

---

## Watch it

```fish
pnpm sc logs
```

Pick a lane, then follow it from the start of the current run.

Sanity check in another terminal — is a run live, and how many lanes?

```fish
pnpm sc status
```

Should read **5 lanes**, never 15. The raw equivalents still work:
`tail -f .sandcastle/logs/*implementer.log` and `docker ps | grep -c sandcastle-`.

---

## Stop it

```fish
pkill -f sandcastle/cli.mts
docker ps -q --filter name=sandcastle- | xargs docker rm -f
```

Safe. Lanes that already committed keep their branches. Nothing merged is lost.

No worktree cleanup to do: the library removes each lane's worktree itself, so
`.sandcastle/worktrees/` stays empty. If a crash ever leaves one behind,
`pnpm sc status` reports it — scoped to that directory, so it can never
implicate the `.claude/worktrees/` lanes or your own checkout.

---

## Change settings

Open **`.sandcastle/config.mts`**. Everything is there, commented. Nothing else to touch.

`pnpm sc config` shows the resolved values and where each one came from.

| Knob              | Default     | What it does                                                                     |
| ----------------- | ----------- | -------------------------------------------------------------------------------- |
| `maxIterations`   | 10          | plan→work→merge rounds per run                                                   |
| `concurrency`     | 5           | lanes at once                                                                    |
| `cpus`            | 2           | CPU per container                                                                |
| `baseBranch`      | `undefined` | `undefined` = fork from the branch you're on                                     |
| `delivery`        | `"pr"`      | `"pr"` = PR per branch · `"merge"` = merge into your branch (flag: `--delivery`) |
| `phases.*.model`  | see below   | which model each phase uses                                                      |
| `phases.*.effort` | `high`      | how hard it thinks                                                               |

### Models per phase

| Phase       | Model             | Why                                                                                                   |
| ----------- | ----------------- | ----------------------------------------------------------------------------------------------------- |
| planner     | `claude-fable-5`  | reads issues, decides what can run in parallel                                                        |
| implementer | `claude-opus-5`   | writes the code                                                                                       |
| reviewer    | `claude-sonnet-5` | reads one diff — cheap task, cheap model                                                              |
| merger      | `claude-opus-5`   | **keep this strong.** A bad merge silently deletes another lane's work and closes its issue as "done" |

---

## One-off tweaks (no file edit)

```fish
SC_LOOPS=1 pnpm sandcastle                      # one round only
SC_CONCURRENCY=2 pnpm sandcastle                # gentler on your Mac
SC_MODEL=claude-haiku-4-5-20251001 pnpm sandcastle   # cheap test, all phases
```

These last for that one command. Nothing is saved.

⚠️ **Neither limits how many issues get worked.** The planner takes every open `Sandcastle` issue. To pick the issues yourself, use `--issue` (above).

---

## Rebuild the image

```fish
pnpm sc image        # `pnpm sandcastle:image` still works — same command
```

**Only when `pnpm-lock.yaml` changes** (you added/removed/bumped a dependency). ~1 min.

Forget to? `pnpm sc doctor` tells you — `sc image` bakes a hash of the Dockerfile
plus `pnpm-lock.yaml` into the image as a label, and `doctor` recomputes it.
Don't skip the rebuild: the image bakes the pnpm store from `pnpm-lock.yaml`, so
a stale image means lanes resolve the **wrong dependency set**, not merely
slower installs.

---

## When it breaks

1. `pnpm sc doctor` — rule out the machine first
2. Stop it (above)
3. `pnpm sc logs` — pick the lane, read the tail of its last run

| Symptom                               | Cause                                                       |
| ------------------------------------- | ----------------------------------------------------------- |
| Dies instantly on `pnpm install`      | Image is stale → `pnpm sc doctor`, then `pnpm sc image`     |
| Mac crawls, fans max                  | Lower `concurrency` in config.mts                           |
| Nothing merged, no errors             | Agents ran but made no commits — `pnpm sc logs implementer` |
| `SC_LOOPS must be a positive integer` | Typo in your env var. Working as designed.                  |

---

## Adding work

Issues must have the **`Sandcastle`** label. Nothing else is picked up.

```fish
gh issue create --label Sandcastle --title "..." --body "..."
```

Write the issue so one agent can finish it alone. Split anything bigger.

---

## How it works

```
PLAN     1 agent reads your issues, picks what can run in parallel
   ↓
WORK     5 containers at once — each: implementer writes → reviewer checks
   ↓
DELIVER  1 agent — pr: push each branch + open a PR onto your branch, unlabel the issue
                    merge: merge each branch into your branch, close the issue
   ↓
repeat up to 10 rounds, or stop when nothing is left
```

Each lane is an isolated git worktree in its own container. They can't see each other. That's why the merger exists — and why it gets a strong model.

**Config lives in `config.mts`. Orchestration lives in `main.mts`. Prompts live in `*-prompt.md`. The CLI lives in `cli.mts` + `commands/`, with the shared helpers in `prompts.mts` + `state.mts`.**
