# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues on `diamorval/design-system-diametral`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

The `wayfinder` skill charts a **map** issue with **child tickets**. Here is how that shape is expressed on this tracker.

### Labels

| Skill concept    | Label                |
| ---------------- | -------------------- |
| the map          | `wayfinder:map`      |
| research ticket  | `wayfinder:research` |
| grilling ticket  | `wayfinder:grilling` |
| task ticket      | `wayfinder:task`     |
| prototype ticket | _(create on demand)_ |

Never apply `Sandcastle` to a wayfinder issue. That label is the orchestrator's work queue — `.sandcastle/plan-prompt.md` filters on it, so a wayfinder ticket carrying it gets picked up and "implemented". See `docs/agents/triage-labels.md`.

### Creating the map

```bash
gh issue create --title "<destination in a few words>" \
  --label "wayfinder:map" --body-file map.md
```

Write the body to a file first — heredocs inside `--body` mangle backticks and `#` references.

### Child tickets

Two passes: create every ticket, then wire the edges. Issues need numbers before they can reference each other.

Each ticket body opens with `Part of #<map>`, then the blocking line if any, then the question:

```markdown
Part of #37
Blocked by: #38, #39

## Question

…
```

Link the ticket to its map with GitHub's native sub-issues endpoint. Note `-F`, not `-f` — `gh` sends `-f` values as strings and the endpoint rejects a stringified id:

```bash
id=$(gh api repos/{owner}/{repo}/issues/<child> --jq .id)
gh api repos/{owner}/{repo}/issues/<map>/sub_issues -F sub_issue_id=$id
```

Blocking is the `Blocked by:` body line above, not a native relationship — GitHub's dependency graph does not cover issue-to-issue blocking here.

### Reading the map

```bash
# the map body only — the low-res view a session loads once
gh issue view <map> --json body --jq .body

# every child and its state
gh api repos/{owner}/{repo}/issues/<map>/sub_issues \
  --jq '.[] | "\(.number) [\(.state)] \(.title)"'

# the frontier: open, unassigned children (filter blocked ones by reading bodies)
gh api repos/{owner}/{repo}/issues/<map>/sub_issues \
  --jq '.[] | select(.state == "open" and .assignee == null) | "\(.number) \(.title)"'
```

A ticket is **unblocked** when every issue on its `Blocked by:` line is closed. A ticket is **claimed** when it has an assignee — claim before working, so concurrent sessions skip it:

```bash
gh issue edit <ticket> --add-assignee @me
```

### Resolving a ticket

```bash
gh issue comment <ticket> --body-file answer.md   # the resolution
gh issue close <ticket>
gh issue edit <map> --body-file updated-map.md    # append to Decisions so far
```

The map's Decisions-so-far gets one line per closed ticket — a gist plus a link, never the full answer. The answer lives in the resolution comment.
