# Sandcastle

Agents work your GitHub issues in parallel Docker containers, then merge the results into your current branch.

---

## Run it

```fish
pnpm sandcastle
```

That's the whole thing. It works every open issue labelled `Sandcastle`, 5 at a time, and merges them into the branch you're standing on.

**Walk away for 1.5–3 hours.**

---

## First time today? Do this instead

```fish
gh issue reopen 9
SC_LOOPS=1 SC_CONCURRENCY=1 pnpm sandcastle
```

One issue, one lane, ~20–40 min. If the result looks good, the other 14 will too.

**Do this before any big run.** It's the cheap way to find out the prompts need work.

---

## Watch it

```fish
tail -f .sandcastle/logs/*implementer.log
```

Sanity check in another terminal — should be **5**, never 15:

```fish
docker ps | grep -c sandcastle-
```

---

## Stop it

```fish
pkill -f sandcastle/main.mts
docker ps -q --filter name=sandcastle- | xargs docker rm -f
```

Safe. Lanes that already committed keep their branches. Nothing merged is lost.

Clean up leftover worktrees (slow, they hold `node_modules`):

```fish
git worktree list | grep sandcastle | awk '{print $1}' | xargs -n1 git worktree remove --force
```

---

## Change settings

Open **`.sandcastle/config.mts`**. Everything is there, commented. Nothing else to touch.

| Knob | Default | What it does |
|---|---|---|
| `maxIterations` | 10 | plan→work→merge rounds per run |
| `concurrency` | 5 | lanes at once |
| `cpus` | 2 | CPU per container |
| `baseBranch` | `undefined` | `undefined` = fork from the branch you're on |
| `phases.*.model` | see below | which model each phase uses |
| `phases.*.effort` | `high` | how hard it thinks |

### Models per phase

| Phase | Model | Why |
|---|---|---|
| planner | `claude-fable-5` | reads issues, decides what can run in parallel |
| implementer | `claude-opus-5` | writes the code |
| reviewer | `claude-sonnet-5` | reads one diff — cheap task, cheap model |
| merger | `claude-opus-5` | **keep this strong.** A bad merge silently deletes another lane's work and closes its issue as "done" |

---

## One-off tweaks (no file edit)

```fish
SC_LOOPS=1 pnpm sandcastle                      # one round only
SC_CONCURRENCY=2 pnpm sandcastle                # gentler on your Mac
SC_MODEL=claude-haiku-4-5-20251001 pnpm sandcastle   # cheap test, all phases
```

These last for that one command. Nothing is saved.

⚠️ **Neither limits how many issues get worked.** The planner takes every open `Sandcastle` issue. To work fewer issues, close the ones you don't want.

---

## Rebuild the image

```fish
pnpm sandcastle:image
```

**Only when `pnpm-lock.yaml` changes** (you added/removed/bumped a dependency). ~1 min.

Forget to? Nothing breaks — installs just get slower.

---

## When it breaks

1. Stop it (above)
2. Read the newest log: `ls -t .sandcastle/logs/ | head -1`
3. Look at the last 50 lines

| Symptom | Cause |
|---|---|
| Dies instantly on `pnpm install` | Image is stale → `pnpm sandcastle:image` |
| Mac crawls, fans max | Lower `concurrency` in config.mts |
| Nothing merged, no errors | Agents ran but made no commits — read an implementer log |
| `SC_LOOPS must be a positive integer` | Typo in your env var. Working as designed. |

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
MERGE    1 agent merges every branch into your current branch, closes the issues
   ↓
repeat up to 10 rounds, or stop when nothing is left
```

Each lane is an isolated git worktree in its own container. They can't see each other. That's why the merger exists — and why it gets a strong model.

**Config lives in `config.mts`. Orchestration lives in `main.mts`. Prompts live in `*-prompt.md`.**
