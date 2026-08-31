"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { TimeRange, TimeSeriesPoint } from "@/lib/time-series"

const chartConfig = {
  value: {
    label: "Value",
    color: "#5341cd",
  },
} satisfies ChartConfig

function formatAxisDate(iso: string, range: TimeRange) {
  const date = new Date(`${iso}T00:00:00`)
  if (range === "all") {
    return date.toLocaleDateString("en-US", { month: "short" })
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function formatTick(value: number) {
  if (value >= 1000) {
    const thousands = value / 1000
    return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}k`
  }
  return String(value)
}

export function TimeSeriesChart({
  points,
  range,
  emptyLabel = "No data for this period.",
  valueLabel = "Value",
}: {
  points: TimeSeriesPoint[]
  range: TimeRange
  emptyLabel?: string
  valueLabel?: string
}) {
  const data = points.map((point) => ({
    date: point.date,
    value: point.value,
  }))

  if (points.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center font-label text-sm text-on-surface-variant">
        {emptyLabel}
      </div>
    )
  }

  return (
    <ChartContainer
      key={range}
      config={{ ...chartConfig, value: { ...chartConfig.value, label: valueLabel } }}
      className="mt-4 aspect-auto h-[300px] w-full"
    >
      <AreaChart data={data} margin={{ left: 0, right: 8, top: 12, bottom: 0 }}>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          strokeDasharray="4 4"
          stroke="var(--outline-variant)"
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={28}
          tickFormatter={(value) => formatAxisDate(String(value), range)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={36}
          tickFormatter={(value) => formatTick(Number(value))}
        />
        <ChartTooltip
          cursor={{ stroke: "#5341cd", strokeWidth: 1, strokeDasharray: "4 4" }}
          content={
            <ChartTooltipContent
              indicator="dot"
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date
                return date ? formatAxisDate(String(date), range) : ""
              }}
            />
          }
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={3}
          fill="url(#chartFill)"
          animationDuration={900}
          animationEasing="ease-out"
          activeDot={{
            r: 6,
            fill: "#ffe084",
            stroke: "#161d1f",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ChartContainer>
  )
}
