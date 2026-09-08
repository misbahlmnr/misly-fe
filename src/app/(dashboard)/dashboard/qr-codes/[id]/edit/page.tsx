import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CreateQrPage } from "@/features/qr-codes"
import { getQrCodeOnServer } from "@/features/qr-codes/services/server"
import type { QrEditorTab } from "@/features/qr-codes/types"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const qr = await getQrCodeOnServer(id)

  return {
    title: qr ? `Customize ${qr.title} - Misly` : "Customize QR Code - Misly",
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { id } = await params
  const { tab } = await searchParams
  const qr = await getQrCodeOnServer(id)

  if (!qr) notFound()

  const initialTab: QrEditorTab =
    tab === "appearance" || tab === "branding" || tab === "content"
      ? tab
      : "appearance"

  return <CreateQrPage mode="edit" initial={qr} initialTab={initialTab} />
}
