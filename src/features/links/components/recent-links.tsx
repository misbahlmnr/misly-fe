"use client";

import { ArrowRight, Link2 } from "lucide-react";
import Link from "next/link";

import { routes } from "@/config/routes";
import { CopyLinkButton } from "@/features/links/components/copy-link-button";
import { LinkActions } from "@/features/links/components/link-actions";
import { defaultDomain } from "@/features/links/constants";
import type { ManagedLink } from "@/features/links/types";
import { formatNumber } from "@/lib/formatter";

type RecentLinksProps = {
  links?: ManagedLink[];
  isLoading?: boolean;
};

export function RecentLinks({
  links = [],
  isLoading = false,
}: RecentLinksProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-headline text-2xl font-bold tracking-tight">
          Recent Links
        </h2>
        <Link
          href={routes.dashboardLinks}
          className="flex items-center gap-1 font-label font-bold text-primary transition-colors hover:underline"
        >
          View all
          <ArrowRight className="size-5" strokeWidth={2.25} />
        </Link>
      </div>

      <div className="rounded-lg bg-surface-container-lowest ink-border shadow-hard overflow-hidden">
        {isLoading ? (
          <ul className="divide-y-2 divide-on-surface">
            {Array.from({ length: 3 }, (_, index) => (
              <li key={`recent-link-skeleton-${index}`} className="p-4 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-10 animate-pulse rounded-md bg-surface-container" />
                    <div className="space-y-2">
                      <div className="h-5 w-32 animate-pulse rounded-md bg-surface-container" />
                      <div className="h-4 w-48 animate-pulse rounded-md bg-surface-container" />
                    </div>
                  </div>
                  <div className="h-8 w-16 animate-pulse rounded-md bg-surface-container" />
                </div>
              </li>
            ))}
          </ul>
        ) : links.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <Link2 className="size-8 text-outline" strokeWidth={2.25} />
            <p className="font-label font-bold">No recent links yet</p>
            <p className="font-body text-sm text-outline">
              Create a short link to see it here.
            </p>
          </div>
        ) : (
          <ul className="divide-y-2 divide-on-surface">
            {links.map((link) => {
              const shortUrl = `${defaultDomain}/${link.slug}`;

              return (
                <li
                  key={link.id}
                  className="p-4 transition-colors hover:bg-surface-bright md:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-fixed ink-border">
                        <Link2
                          className="size-5 text-primary"
                          strokeWidth={2.25}
                        />
                      </div>
                      <div>
                        <h3 className="font-label text-lg font-bold">
                          {link.title || link.slug}
                        </h3>
                        <a
                          href={shortUrl}
                          className="break-all font-body text-sm text-primary hover:underline"
                        >
                          {shortUrl}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm md:gap-8">
                      <div className="flex flex-col items-end">
                        <span className="font-headline text-lg font-bold">
                          {formatNumber(link.clickCount)}
                        </span>
                        <span className="font-label text-xs tracking-wider text-outline uppercase">
                          Clicks
                        </span>
                      </div>
                      <div className="hidden flex-col items-end md:flex">
                        <span className="font-label font-semibold">
                          {link.createdShort}
                        </span>
                        <span className="font-label text-xs tracking-wider text-outline uppercase">
                          Created
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <CopyLinkButton url={shortUrl} />
                        <LinkActions
                          slug={link.slug}
                          linkId={link.id}
                          title={link.title}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
