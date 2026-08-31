import type { Metadata } from "next"

import { OverviewPage } from "@/features/dashboard"

export const metadata: Metadata = {
  title: "Dashboard Overview - Misly",
}

export default function Page() {
  return <OverviewPage />
}
