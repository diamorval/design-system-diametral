import * as React from "react"
import { useSearchParams } from "react-router"
import { ArrowCounterClockwiseIcon, CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { palette } from "virtual:demo-source"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import { Switch } from "@workspace/ui/components/switch"

import { tokenizeJsx, type TokenKind } from "@/docs/tokenize-jsx"
import { useCopy } from "@/docs/use-copy"
import { getPlayground, type Axis } from "@/registry/playground-registry"
import type { Control } from "@/registry/playgrounds"

const UNSET = "—"

const TOKEN_ROLE: Record<TokenKind, keyof typeof palette.light> = {
  tag: "tag",
  attr: "attr",
  string: "string",
  punct: "faint",
  text: "fg",
}

/** `rows={3}` reads better than `rows="3"`, and matches what you'd write. */
function serialize(prop: string, value: string | boolean) {
  if (value === true) return prop
  if (typeof value !== "string") return ""
  return /^\d+$/.test(value) ? `${prop}={${value}}` : `${prop}="${value}"`
}

function extraDefault(control: Control) {
  if (control.type === "boolean") return false
  if (control.type === "select") return control.options[0]
  return ""
}

export function Playground({ slug }: { slug: string }) {
  const playground = getPlayground(slug)
  const [params, setParams] = useSearchParams()

  if (!playground) return null
  const { Subject, template, axes, extras, note } = playground

  const axisValue = (axis: Axis) =>
    params.get(axis.prop) ?? axis.default ?? UNSET

  const extraValue = (control: Control): string | boolean =>
    control.type === "boolean"
      ? params.get(control.prop) === "true"
      : (params.get(control.prop) ?? extraDefault(control))

  function set(prop: string, value: string | boolean) {
    const next = new URLSearchParams(params)
    // Defaults are omitted from the URL, so an untouched playground has no
    // query string and a shared link carries only real choices.
    if (value === false || value === "" || value === UNSET) next.delete(prop)
    else next.set(prop, String(value))
    setParams(next, { replace: true, preventScrollReset: true })
  }

  // What renders: every resolved value. What we print: only what differs from
  // the component's own defaults.
  const renderProps: Record<string, unknown> = {}
  const printed: string[] = []

  for (const axis of axes) {
    const value = axisValue(axis)
    if (value === UNSET) continue
    renderProps[axis.prop] = value
    if (value !== axis.default) printed.push(serialize(axis.prop, value))
  }

  for (const control of extras) {
    const value = extraValue(control)
    if (value === false || value === "") continue
    renderProps[control.prop] = value
    if (value !== extraDefault(control)) printed.push(serialize(control.prop, value))
  }

  const code = template.includes("{...props}")
    ? template.replace(
        printed.length ? "{...props}" : " {...props}",
        printed.join(" ")
      )
    : template

  const touched = axes.some((axis) => params.has(axis.prop)) ||
    extras.some((control) => params.has(control.prop))

  return (
    <section id="playground" className="scroll-mt-20">
      <header className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="font-heading text-base font-semibold tracking-wider uppercase">
          Playground
        </h2>
        {touched ? (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setParams({}, { replace: true, preventScrollReset: true })}
          >
            <ArrowCounterClockwiseIcon /> Reset
          </Button>
        ) : null}
      </header>

      {note ? (
        <p className="mb-3 max-w-2xl text-sm text-muted-foreground">{note}</p>
      ) : null}

      <div className="grid border border-border lg:grid-cols-[1fr_260px]">
        <div className="flex min-h-56 items-center justify-center p-8">
          <Subject {...renderProps} />
        </div>

        <aside className="flex flex-col gap-4 border-t border-border p-4 lg:border-s lg:border-t-0">
          {axes.map((axis) => (
            <ControlRow key={axis.prop} label={axis.prop}>
              <NativeSelect
                value={axisValue(axis)}
                onChange={(event) => set(axis.prop, event.target.value)}
                aria-label={axis.prop}
              >
                {/* Only offered when cva declares no default for this axis. */}
                {axis.default ? null : (
                  <NativeSelectOption value={UNSET}>{UNSET}</NativeSelectOption>
                )}
                {axis.options.map((option) => (
                  <NativeSelectOption key={option} value={option}>
                    {option}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </ControlRow>
          ))}

          {extras.map((control) => {
            const label = control.label ?? control.prop
            const value = extraValue(control)

            if (control.type === "boolean") {
              return (
                <div
                  key={control.prop}
                  className="flex items-center justify-between gap-3"
                >
                  {/* Label uppercases by default and only reverts via a
                      peer-* rule that needs the switch to come first; the panel
                      puts the label first, so the type is set explicitly. */}
                  <Label
                    htmlFor={`pg-${control.prop}`}
                    className="font-mono text-xs font-normal tracking-normal text-muted-foreground normal-case"
                  >
                    {label}
                  </Label>
                  <Switch
                    id={`pg-${control.prop}`}
                    checked={value === true}
                    onCheckedChange={(checked) => set(control.prop, checked)}
                  />
                </div>
              )
            }

            if (control.type === "select") {
              return (
                <ControlRow key={control.prop} label={label}>
                  <NativeSelect
                    value={String(value)}
                    onChange={(event) => set(control.prop, event.target.value)}
                    aria-label={label}
                  >
                    {control.options.map((option) => (
                      <NativeSelectOption key={option} value={option}>
                        {option}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </ControlRow>
              )
            }

            return (
              <ControlRow key={control.prop} label={label}>
                <Input
                  value={String(value)}
                  placeholder={control.placeholder}
                  onChange={(event) => set(control.prop, event.target.value)}
                  aria-label={label}
                />
              </ControlRow>
            )
          })}

          {axes.length === 0 && extras.length === 0 ? (
            <p className="text-xs text-muted-foreground">No controls declared.</p>
          ) : null}
        </aside>
      </div>

      <GeneratedCode code={code} />
    </section>
  )
}

function ControlRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

function GeneratedCode({ code }: { code: string }) {
  const { copied, copy } = useCopy(code)
  const tokens = React.useMemo(() => tokenizeJsx(code), [code])

  return (
    <div className="group/code relative border border-t-0 border-border">
      {/* Reuses the .shiki rules from code.css, so these tokens pick up the
          same light/dark switching as the build-time highlighted blocks. */}
      <pre className="shiki overflow-x-auto bg-muted/40 p-4 font-mono text-[13px] leading-relaxed">
        <code>
          {tokens.map((token, index) => (
            <span
              key={index}
              style={
                {
                  "--shiki-light": palette.light[TOKEN_ROLE[token.kind]],
                  "--shiki-dark": palette.dark[TOKEN_ROLE[token.kind]],
                } as React.CSSProperties
              }
            >
              {token.text}
            </span>
          ))}
        </code>
      </pre>
      <Button
        size="icon-sm"
        variant="ghost"
        aria-label={copied ? "Copied" : "Copy code"}
        onClick={copy}
        className="absolute end-2 top-2 opacity-0 transition-opacity focus-visible:opacity-100 group-hover/code:opacity-100"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}
