// Terminal prompt primitives shared by the sandcastle commands, adapted from
// ~/code/cli/lib/prompts.js. No top-level side effects beyond reading isTTY:
// importing a command module runs it, so anything two commands share lives
// here rather than inside one of them.

import readline from "node:readline"

// --- ANSI styling (gated on TTY + NO_COLOR, same as the cli repo) -----------

export const on = process.stdout.isTTY && !process.env.NO_COLOR
export const wrap = (code: number) => (s: string) =>
  on ? `\x1b[${code}m${s}\x1b[0m` : s
export const dim = wrap(2)
export const bold = wrap(1)
export const cyan = wrap(36)
export const green = wrap(32)

// --- Prompt primitives -------------------------------------------------------

export type Key = { name?: string; ctrl?: boolean }

/** Raw-mode keypress loop shared by every prompt: draw, handle, cleanup. */
export function keyLoop<T>(
  handle: (key: Key, done: (value: T) => void) => void,
  draw: () => string[]
): Promise<T> {
  return new Promise((resolve) => {
    const out = process.stdout
    let rendered = 0

    const render = () => {
      const lines = draw()
      if (rendered) out.write(`\x1b[${rendered}A`)
      out.write("\x1b[0J")
      out.write(lines.join("\n") + "\n")
      rendered = lines.length
    }

    const cleanup = () => {
      process.stdin.removeListener("keypress", onKey)
      process.stdin.setRawMode(false)
      process.stdin.pause()
      out.write("\x1b[?25h")
    }

    const onKey = (_str: string, key: Key) => {
      if (key.ctrl && key.name === "c") {
        cleanup()
        out.write("\n")
        process.exit(130)
      }
      handle(key, (value) => {
        cleanup()
        resolve(value)
      })
      render()
    }

    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)
    process.stdin.resume()
    out.write("\x1b[?25l")
    process.stdin.on("keypress", onKey)
    render()
  })
}

export interface Choice {
  readonly name: string
  readonly title: string
  readonly hint?: string
}

/** Arrow-key checklist: ↑/↓ move, space toggle, `a` all, enter confirm. */
export function multiselect(
  message: string,
  choices: readonly Choice[],
  footer: (sel: ReadonlySet<string>) => string
): Promise<string[]> {
  const sel = new Set<string>()
  let cursor = 0
  const help = dim("(↑/↓ move · space toggle · a all · enter confirm)")

  return keyLoop<string[]>(
    (key, done) => {
      const n = choices.length
      switch (true) {
        case key.name === "up" || key.name === "k":
          cursor = (cursor - 1 + n) % n
          break
        case key.name === "down" || key.name === "j":
          cursor = (cursor + 1) % n
          break
        case key.name === "space": {
          const name = choices[cursor]!.name
          sel.has(name) ? sel.delete(name) : sel.add(name)
          break
        }
        case key.name === "a": {
          const all = choices.every((c) => sel.has(c.name))
          choices.forEach((c) => (all ? sel.delete(c.name) : sel.add(c.name)))
          break
        }
        case key.name === "return" || key.name === "enter":
          done([...sel])
      }
    },
    () => [
      `${cyan("?")} ${bold(message)} ${help}`,
      "",
      ...choices.map((ch, i) => {
        const here = i === cursor
        const pointer = here ? cyan("❯") : " "
        const box = sel.has(ch.name) ? green("◉") : "◯"
        const title = here ? bold(ch.title) : ch.title
        return `${pointer} ${box} ${title}${ch.hint ? dim(` — ${ch.hint}`) : ""}`
      }),
      "",
      `  ${footer(sel)}`,
    ]
  )
}

/**
 * Single-choice list: ↑/↓ move, enter open, `q` quit. Resolves the chosen
 * `name`, or `""` on quit — every caller has to handle "picked nothing"
 * anyway, so an empty string keeps the return type flat.
 */
export function select(
  message: string,
  choices: readonly Choice[]
): Promise<string> {
  let cursor = 0
  const help = dim("(↑/↓ move · enter open · q quit)")

  return keyLoop<string>(
    (key, done) => {
      const n = choices.length
      switch (true) {
        case key.name === "up" || key.name === "k":
          cursor = (cursor - 1 + n) % n
          break
        case key.name === "down" || key.name === "j":
          cursor = (cursor + 1) % n
          break
        case key.name === "q" || key.name === "escape":
          done("")
          break
        case key.name === "return" || key.name === "enter":
          done(choices[cursor]!.name)
      }
    },
    () => [
      `${cyan("?")} ${bold(message)} ${help}`,
      "",
      ...choices.map((ch, i) => {
        const here = i === cursor
        const pointer = here ? cyan("❯") : " "
        const title = here ? bold(ch.title) : ch.title
        return `${pointer} ${title}${ch.hint ? dim(`  ${ch.hint}`) : ""}`
      }),
    ]
  )
}

export interface Field {
  readonly key: string
  readonly label: string
  readonly options: readonly { title: string; value: string | number }[]
  readonly value: string | number
  readonly hint?: string
}

/**
 * Settings board — every field on one screen. ↑/↓ move between fields,
 * ←/→ (or space) cycle the focused field's value, enter saves.
 */
export function board(
  message: string,
  fields: readonly Field[]
): Promise<Record<string, string | number>> {
  const idx = fields.map((f) => {
    const i = f.options.findIndex((o) => o.value === f.value)
    return i < 0 ? 0 : i
  })
  let row = 0
  const help = dim("(↑/↓ field · ←/→ change · enter launch prompt)")
  const width = Math.max(...fields.map((f) => f.label.length))

  return keyLoop<Record<string, string | number>>(
    (key, done) => {
      const nf = fields.length
      const cycle = (delta: number) => {
        const n = fields[row]!.options.length
        idx[row] = (idx[row]! + delta + n) % n
      }
      switch (true) {
        case key.name === "up" || key.name === "k":
          row = (row - 1 + nf) % nf
          break
        case key.name === "down" || key.name === "j":
          row = (row + 1) % nf
          break
        case key.name === "right" || key.name === "l" || key.name === "space":
          cycle(1)
          break
        case key.name === "left" || key.name === "h":
          cycle(-1)
          break
        case key.name === "return" || key.name === "enter": {
          const result: Record<string, string | number> = {}
          fields.forEach((f, i) => (result[f.key] = f.options[idx[i]!]!.value))
          done(result)
        }
      }
    },
    () => [
      `${cyan("?")} ${bold(message)} ${help}`,
      "",
      ...fields.map((f, i) => {
        const here = i === row
        const pointer = here ? cyan("❯") : " "
        const label = f.label.padEnd(width)
        const opt = f.options[idx[i]!]!
        const value = here
          ? `${cyan("‹")} ${green(opt.title)} ${cyan("›")}`
          : dim(`‹ ${opt.title} ›`)
        const hint = f.hint && here ? dim(`  ${f.hint}`) : ""
        return `  ${pointer} ${here ? bold(label) : label}   ${value}${hint}`
      }),
    ]
  )
}

/** Yes/No confirm, default no. */
export function confirm(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve) => {
    rl.question(`${cyan("?")} ${message} ${dim("[y/N]")} `, (a) => {
      rl.close()
      resolve(a.trim().toLowerCase().startsWith("y"))
    })
  })
}
