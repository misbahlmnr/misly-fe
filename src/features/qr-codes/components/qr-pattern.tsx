import { Briefcase } from "lucide-react"

import type { QrStyle } from "@/features/qr-codes/types"
import { cn } from "@/lib/utils"

const SIZE = 13

function isFinder(x: number, y: number, size: number) {
  const inFinder = (ox: number, oy: number) => {
    const dx = x - ox
    const dy = y - oy
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null
    return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4)
  }

  return inFinder(0, 0) ?? inFinder(size - 7, 0) ?? inFinder(0, size - 7)
}

function cellsFromSeed(seed: string) {
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0

  return Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => {
      const finder = isFinder(x, y, SIZE)
      if (finder !== null) return finder
      return (hash + x * 17 + y * 31) % 5 < 2
    })
  )
}

export function QrPattern({
  seed,
  style = "default",
  logo,
  className,
}: {
  seed: string
  style?: QrStyle
  logo?: "work" | "m"
  className?: string
}) {
  const cells = cellsFromSeed(seed)
  const fill = style === "brand" ? "#5341cd" : "#161d1f"
  const circular = style === "circular"

  return (
    <div
      className={cn(
        "relative flex size-32 items-center justify-center bg-surface-container-lowest p-2 ink-border shadow-hard-pressed",
        circular ? "rounded-full" : "rounded-lg",
        className
      )}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={cn("size-full", circular && "size-24 rounded-full")}
        aria-hidden
      >
        {cells.map((row, y) =>
          row.map((on, x) =>
            on ? (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="1"
                height="1"
                rx={circular ? 0.35 : 0.08}
                fill={fill}
              />
            ) : null
          )
        )}
      </svg>
      {logo === "work" && (
        <div className="absolute inset-0 m-auto flex size-8 items-center justify-center rounded-full bg-surface-container-lowest ink-border shadow-hard-pressed">
          <Briefcase
            className="size-4 text-primary"
            strokeWidth={2.25}
            fill="currentColor"
          />
        </div>
      )}
      {logo === "m" && (
        <div className="absolute inset-0 m-auto flex size-10 items-center justify-center rounded-md bg-surface-container-lowest ink-border">
          <span className="font-headline text-xl font-black text-primary">M</span>
        </div>
      )}
    </div>
  )
}
