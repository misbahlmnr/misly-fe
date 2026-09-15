import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { resolveShortLinkRedirect } from "@/features/links/services/redirect";

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

export default async function ShortLinkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const headerStore = await headers();

  const destination = await resolveShortLinkRedirect(slug, {
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
