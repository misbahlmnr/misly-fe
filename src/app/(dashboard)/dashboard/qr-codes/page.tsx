import type { Metadata } from "next"

import { QrCodesPage } from "@/features/qr-codes"

export const metadata: Metadata = {
  title: "QR Codes - Misly",
}

export default function Page() {
  return <QrCodesPage />
}
