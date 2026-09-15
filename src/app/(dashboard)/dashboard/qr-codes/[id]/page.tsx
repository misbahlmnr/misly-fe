import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isProPlan } from "@/config/user";
import { QrAnalyticsPage } from "@/features/qr-codes";
import { getQrByIdOnServer } from "@/features/qr-codes/services/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const qr = await getQrByIdOnServer(id);

  return {
    title: qr
      ? `${qr.title} QR Analytics - Misly`
      : "QR Code Analytics - Misly",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const qr = await getQrByIdOnServer(id);

  if (!qr || !isProPlan()) notFound();

  return <QrAnalyticsPage item={qr} />;
}
