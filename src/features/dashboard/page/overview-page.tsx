"use client";

import { StatCards } from "@/features/dashboard/components/stat-cards";
import { overviewUser } from "@/features/dashboard/constants";
import { CreateLinkButton, RecentLinks } from "@/features/links";
import { useGetOverview } from "../hooks/use-get-overview";

export function OverviewPage() {
  const { data: overview, isLoading, isError, error } = useGetOverview();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            Good morning, {overviewUser.name} 👋
          </h1>
          <p className="font-body text-lg text-outline">
            Here&apos;s what&apos;s happening with your links today.
          </p>
        </div>
        <CreateLinkButton />
      </div>

      {isError ? (
        <p className="rounded-lg bg-surface-container-lowest p-6 font-body text-outline ink-border shadow-hard">
          {error instanceof Error
            ? error.message
            : "Failed to load overview. Please try again."}
        </p>
      ) : (
        <>
          <StatCards stats={overview?.stats} isLoading={isLoading} />
          <RecentLinks links={overview?.recentLinks} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}
