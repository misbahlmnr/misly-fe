import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isProPlan } from "@/config/user";
import { AnalyticsDetailPage } from "@/features/analytics";
import { getManagedLink } from "@/features/links/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const link = getManagedLink(slug);

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
  const link = getManagedLink(slug);

  if (!link || !isProPlan()) notFound();

  return (
    <AnalyticsDetailPage
      link={{
        title: link.title,
        slug: link.slug,
        destinationUrl: link.destinationUrl,
        clicks: link.clickCount,
      }}
    />
  );
}
