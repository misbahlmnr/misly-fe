"use client"

import {
  Camera,
  Languages,
  Link2,
  MapPin,
  MessageCircle,
  Monitor,
  Route,
  Search,
  Smartphone,
  Tablet,
  TabletSmartphone,
} from "lucide-react"

import { AnimatedBar } from "@/components/shared/animated-bar"
import { AnimatedNumber } from "@/components/shared/animated-number"
import type { LinkAnalytics } from "@/features/analytics/types"
import { cn } from "@/lib/utils"

const sourceIcons: Record<string, typeof Camera> = {
  instagram: Camera,
  whatsapp: MessageCircle,
  google: Search,
  direct: Link2,
}

const deviceIcons: Record<string, typeof Smartphone> = {
  mobile: Smartphone,
  desktop: Monitor,
  tablet: Tablet,
}

export function AnalyticsBreakdown({ data }: { data: LinkAnalytics }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
        <h3 className="mb-6 flex items-center gap-2 font-headline text-lg font-bold text-on-surface">
          <MapPin className="size-5 text-primary" strokeWidth={2.25} />
          Top Locations
        </h3>
        <div className="flex flex-1 flex-col gap-4">
          {data.locations.length === 0 ? (
            <p className="text-sm text-on-surface-variant">No location data yet.</p>
          ) : null}
          {data.locations.map((item, index) => (
            <div key={item.country} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  {item.country}
                </span>
                <span className="text-on-surface-variant">
                  <AnimatedNumber value={item.share} />% (
                  <AnimatedNumber value={item.clicks} />)
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full border border-outline-variant bg-surface-container">
                <AnimatedBar
                  value={item.share}
                  className={index === 0 ? "bg-primary" : "bg-primary-container"}
                  style={{ opacity: index === 0 ? 1 : 1 - index * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
        <h3 className="mb-6 flex items-center gap-2 font-headline text-lg font-bold text-on-surface">
          <Route className="size-5 text-secondary" strokeWidth={2.25} />
          Traffic Sources
        </h3>
        <div className="flex flex-1 flex-col gap-4">
          {data.sources.length === 0 ? (
            <p className="text-sm text-on-surface-variant">No source data yet.</p>
          ) : null}
          {data.sources.map((item, index) => {
            const Icon = sourceIcons[item.icon] ?? Link2

            return (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-md border border-on-surface shadow-hard-pressed",
                    item.icon === "direct"
                      ? "bg-surface-container-high text-on-surface"
                      : "text-white"
                  )}
                  style={
                    item.color ? { backgroundColor: item.color } : undefined
                  }
                >
                  <Icon className="size-[18px]" strokeWidth={2.25} />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>{item.name}</span>
                    <span className="text-on-surface-variant">
                      <AnimatedNumber value={item.share} />%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full border border-outline-variant bg-surface-container">
                    <AnimatedBar
                      value={item.share}
                      className="bg-secondary"
                      style={{ opacity: 1 - index * 0.2 }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
          <h3 className="mb-4 flex items-center gap-2 font-headline text-lg font-bold text-on-surface">
            <TabletSmartphone className="size-5 text-tertiary" strokeWidth={2.25} />
            Devices
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {data.devices.map((item) => {
              const Icon = deviceIcons[item.icon] ?? Smartphone

              return (
                <div
                  key={item.name}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-lg p-3 ink-border",
                    item.featured
                      ? "bg-surface-container-low"
                      : "bg-surface-container-lowest"
                  )}
                >
                  <Icon className="mb-1 size-5 text-on-surface" strokeWidth={2.25} />
                  <span className="text-xs font-bold text-on-surface-variant">
                    {item.name}
                  </span>
                  <span className="font-headline text-lg font-bold text-on-surface tabular-nums">
                    <AnimatedNumber value={item.share} />%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl bg-surface-container-lowest p-5 ink-border shadow-hard-pressed">
          <h3 className="mb-3 flex items-center gap-2 font-headline text-sm font-bold text-on-surface">
            <Languages className="size-[18px] text-outline" strokeWidth={2.25} />
            Top Browsers
          </h3>
          <ul className="flex flex-wrap gap-2">
            {data.browsers.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-1.5 rounded-full border border-outline-variant bg-surface-container px-3 py-1.5 text-xs font-bold text-on-surface"
              >
                {item.name}{" "}
                <span className="font-medium text-on-surface-variant">
                  <AnimatedNumber value={item.share} />%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
