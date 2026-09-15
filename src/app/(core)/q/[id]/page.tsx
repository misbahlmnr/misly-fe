import { resolveQrRedirect } from "@/features/qr-codes/services/redirect";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function isPrefetchRequest(headerStore: Headers) {
  const purpose = headerStore.get("purpose") ?? "";
  const secPurpose = headerStore.get("sec-purpose") ?? "";

  return (
    headerStore.get("next-router-prefetch") === "1" ||
    purpose.includes("prefetch") ||
    secPurpose.includes("prefetch")
  );
}

export default async function QrPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const headerStore = await headers();

  const destination = await resolveQrRedirect(id, {
    host: headerStore.get("x-forwarded-host") || headerStore.get("host"),
    ip:
      headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headerStore.get("x-real-ip"),
    userAgent: headerStore.get("user-agent"),
    referer: headerStore.get("referer"),
    prefetch: isPrefetchRequest(headerStore),
  });

  if (!destination) {
    notFound();
  }

  redirect(destination);
}
