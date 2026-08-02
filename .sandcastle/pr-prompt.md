# TASK

Publish each of the following branches as a pull request targeting `{{BASE_BRANCH}}`:

{{BRANCHES}}

Here are the issues (one per branch):

{{ISSUES}}

For each branch:

1. Run `git push -u origin <branch>`
2. Check for an existing open PR: `gh pr list --head <branch> --state open`. If one exists, the push already updated it — skip to step 4.
3. Create the PR: `gh pr create --head <branch> --base {{BASE_BRANCH}} --title "<issue title>" --body "..."`. The body must contain `Closes #<ID>` (so the issue closes when the PR merges) and a short summary of the change.
4. Remove the `Sandcastle` label so the planner doesn't pick the issue up again while its PR is open: `gh issue edit <ID> --remove-label Sandcastle`
5. Comment the PR link on the issue: `gh issue comment <ID> --body "PR: <pr-url>"`

Do NOT merge any branch and do NOT close any issue directly — merging the PR closes it (the sandcastle-close-issues workflow reads `Closes #<ID>` from the PR body).

Once every branch has a PR, output <promise>COMPLETE</promise>.
