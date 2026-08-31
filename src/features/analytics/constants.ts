import type {
  AnalyticsLink,
  LinkAnalytics,
  TimeRange,
} from "@/features/analytics/types"
import {
  comparisonLabel,
  createMockSeries,
  rangeTotal,
} from "@/lib/time-series"

const locationShares = [
  { country: "Indonesia", flag: "🇮🇩", share: 42 },
  { country: "United States", flag: "🇺🇸", share: 28 },
  { country: "Singapore", flag: "🇸🇬", share: 15 },
  { country: "United Kingdom", flag: "🇬🇧", share: 9 },
] as const

const sourceShares = [
  { name: "Instagram", share: 31, color: "#E1306C", icon: "instagram" },
  { name: "WhatsApp", share: 25, color: "#25D366", icon: "whatsapp" },
  { name: "Google Search", share: 20, color: "#DB4437", icon: "google" },
  { name: "Direct", share: 15, color: "", icon: "direct" },
] as const

const deviceShares = [
  { name: "Mobile", share: 68, icon: "mobile" },
  { name: "Desktop", share: 27, icon: "desktop" },
  { name: "Tablet", share: 5, icon: "tablet" },
] as const

const browserShares = [
  { name: "Chrome", share: 54 },
  { name: "Safari", share: 32 },
  { name: "Edge", share: 8 },
  { name: "Firefox", share: 4 },
] as const

const changeByRange: Record<TimeRange, { clicks: number; visitors: number }> = {
  "7d": { clicks: 6.2, visitors: 4.1 },
  "30d": { clicks: 12, visitors: 8.4 },
  all: { clicks: 18.6, visitors: 14.2 },
}

/** Mock analytics until the API is wired. Replace with a fetch by slug + range. */
export function getLinkAnalytics(
  link: AnalyticsLink,
  range: TimeRange = "30d",
): LinkAnalytics {
  const totalClicks = rangeTotal(link.clicks, range)
  const series = createMockSeries({
    total: totalClicks,
    range,
    seed: link.slug,
  })
  const seriesTotal = series.reduce((sum, point) => sum + point.value, 0)
  const uniqueVisitors = Math.round(seriesTotal * 0.79)
  const topLocation = locationShares[0]
  const topSource = sourceShares[0]
  const topDeviceShare = Math.max(...deviceShares.map((item) => item.share))

  return {
    range,
    comparisonLabel: comparisonLabel(range),
    totalClicks: seriesTotal,
    uniqueVisitors,
    clicksChange: changeByRange[range].clicks,
    visitorsChange: changeByRange[range].visitors,
    topCountry: { name: topLocation.country, share: topLocation.share },
    topReferrer: { name: topSource.name, share: topSource.share },
    locations: locationShares.map((item) => ({
      ...item,
      clicks: Math.round((item.share / 100) * seriesTotal),
    })),
    sources: sourceShares.map((item) => ({ ...item })),
    devices: deviceShares.map((item) => ({
      ...item,
      featured: item.share === topDeviceShare,
    })),
    browsers: browserShares.map((item) => ({ ...item })),
    series,
  }
}
