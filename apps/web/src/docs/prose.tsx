import { cn } from "@diametral/ui/lib/utils"

/**
 * Renders `code` spans inside registry prose. Deliberately not a markdown
 * parser — backticks are the only markup the registry descriptions use, and a
 * dependency for one rule would be worse than this split.
 */
export function Prose({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  const parts = children.split(/(`[^`]+`)/g)

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {parts.map((part, index) =>
        part.length > 2 && part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={index}
            className="font-mono text-[0.92em] text-foreground"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </p>
  )
}
