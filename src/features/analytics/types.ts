import type { TimeRange, TimeSeriesPoint } from "@/lib/time-series"

export type { TimeRange, TimeSeriesPoint }

export type AnalyticsLink = {
  title: string
  slug: string
  destinationUrl: string
  clicks: number
}

export type LocationStat = {
  country: string
  flag: string
  share: number
  clicks: number
}

export type SourceStat = {
  name: string
  share: number
  color: string
  icon: string
}

export type DeviceStat = {
  name: string
  share: number
  icon: string
  featured?: boolean
}

export type BrowserStat = {
  name: string
  share: number
}

export type LinkAnalytics = {
  range: TimeRange
  comparisonLabel: string
  totalClicks: number
  uniqueVisitors: number
  clicksChange: number
  visitorsChange: number
  topCountry: { name: string; share: number }
  topReferrer: { name: string; share: number }
  locations: LocationStat[]
  sources: SourceStat[]
  devices: DeviceStat[]
  browsers: BrowserStat[]
  series: TimeSeriesPoint[]
}
