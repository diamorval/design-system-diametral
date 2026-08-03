// sandcastle operator CLI — one door onto the loop and the state around it.
// `pnpm sandcastle`, `:custom` and `:image` are thin aliases for `sc run`,
// `sc custom` and `sc image`; there is no second implementation.
//
// Usage: pnpm sc <command> [options]
//
// Every command is reached by a dynamic import(), and this file must have NO
// static import of config.mts, direct or transitive. config.mts parses
// process.argv.slice(2) at module load; ESM hoists static imports above the
// argv splice below, so a static import would hand it the un-spliced argv and
// silently break --issue and --delivery. Do not "tidy" these into static
// imports.

function topHelp(): void {
  console.log(`sandcastle operator CLI

Usage:
  pnpm sc <command> [options]

Run the loop:
  run      Orchestration loop (--issue, --delivery)
  custom   Interactive picker → run
  image    Rebuild the docker image

Inspect & maintain:
  status   Worktrees, branches, PRs
  logs     Read / follow a lane log
  clean    Prune logs
  doctor   Check the environment
  config   Show resolved config`)
}

async function run(): Promise<void> {
  const argv = process.argv.slice(2)
  const cmd: string | undefined = argv[0]
  // Drop the subcommand, forward the rest untouched: config.mts stays the
  // single flag parser and no command reparses anything.
  process.argv = [process.argv[0]!, process.argv[1]!, ...argv.slice(1)]

  switch (cmd) {
    case "run":
      return void (await import("./main.mts"))
    case "custom":
      return void (await import("./commands/custom.mts"))
    case "image":
      return void (await import("./commands/image.mts"))
    case "status":
      return void (await import("./commands/status.mts"))
    // Cases still carrying a ts-expect-error await their module in a later
    // issue; until then they fail with a module-not-found error, which is
    // expected. Each directive goes away with the file that satisfies it —
    // tsc reports an unused directive the moment the module exists.
    case "logs":
      return void (await import("./commands/logs.mts"))
    case "clean":
      return void (await import("./commands/clean.mts"))
    case "doctor":
      return void (await import("./commands/doctor.mts"))
    case "config":
      // @ts-expect-error commands/config.mts lands in a later issue
      return void (await import("./commands/config.mts"))
    // --help is recognised only in the subcommand position; `pnpm sc run
    // --help` forwards the flag to `run`.
    case undefined:
    case "help":
    case "--help":
    case "-h":
      return topHelp()
    default:
      console.error(`unknown command: ${cmd}\nrun 'pnpm sc --help'`)
      process.exit(1)
  }
}

await run().catch((e: Error) => {
  console.error(`error: ${e.message}`)
  process.exit(1)
})
