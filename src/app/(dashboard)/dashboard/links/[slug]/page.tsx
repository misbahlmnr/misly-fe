import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isProPlan } from "@/config/user";
import { AnalyticsDetailPage } from "@/features/analytics";
import { getLinkOnServer } from "@/features/links/services/server";
import { ApiError } from "@/lib/api";

async function loadLink(slug: string) {
  try {
    return await getLinkOnServer(slug);
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 404 || error.status === 403)
    ) {
      return null;
    }

    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const link = await loadLink(slug);

  return {
    title: link ? `${link.title} Analytics - Misly` : "Analytics - Misly",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const link = await loadLink(slug);

  if (!link || !isProPlan()) notFound();

  return (
    <AnalyticsDetailPage
      link={{
        id: link.id,
        title: link.title,
        slug: link.slug,
        shortUrl: link.shortUrl,
        destinationUrl: link.destinationUrl,
        clicks: link.clickCount,
      }}
    />
  );
}
