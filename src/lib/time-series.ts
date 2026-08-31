export type TimeRange = "7d" | "30d" | "all"

export type TimeSeriesPoint = {
  date: string
  value: number
}

const rangeDays = {
  "7d": 7,
  "30d": 30,
  all: 12,
} as const

export const timeRangeOptions: { id: TimeRange; label: string }[] = [
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "all", label: "All Time" },
]

export function comparisonLabel(range: TimeRange) {
  if (range === "7d") return "vs previous 7 days"
  if (range === "30d") return "vs previous 30 days"
  return "vs prior period"
}

function hashSeed(value: string) {
  let hash = 0
  for (const char of value) {
    hash = (Math.imul(31, hash) + char.charCodeAt(0)) >>> 0
  }
  return hash || 1
}

function random(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function createMockSeries({
  total,
  range,
  seed,
  endDate = new Date(),
}: {
  total: number
  range: TimeRange
  seed: string
  endDate?: Date
}): TimeSeriesPoint[] {
  const count = rangeDays[range]
  const next = random(hashSeed(`${seed}:${range}:${total}`))
  const weights = Array.from({ length: count }, (_, index) => {
    const progress = index / (count - 1)
    const wave = 0.5 + 0.5 * Math.sin(progress * Math.PI * 2.2)
    return Math.max(0.08, wave * (0.35 + next() * 0.8))
  })
  const sum = weights.reduce((current, weight) => current + weight, 0)

  return weights.map((weight, index) => {
    const date = new Date(endDate)

    if (range === "all") {
      date.setDate(1)
      date.setMonth(date.getMonth() - (count - 1 - index))
    } else {
      date.setDate(date.getDate() - (count - 1 - index))
    }

    return {
      date: toIsoDate(date),
      value: Math.max(0, Math.round((weight / sum) * total)),
    }
  })
}

export function rangeTotal(allTimeTotal: number, range: TimeRange) {
  if (range === "7d") return Math.max(1, Math.round(allTimeTotal * 0.18))
  if (range === "30d") return Math.max(1, Math.round(allTimeTotal * 0.46))
  return allTimeTotal
}
