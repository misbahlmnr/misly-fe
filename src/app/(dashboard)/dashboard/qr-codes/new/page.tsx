import type { Metadata } from "next"

import { CreateQrPage } from "@/features/qr-codes"

export const metadata: Metadata = {
  title: "Create QR Code - Misly",
}

export default function Page() {
  return <CreateQrPage mode="create" />
}
