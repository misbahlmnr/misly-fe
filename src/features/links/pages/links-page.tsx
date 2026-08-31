"use client";

import { CreateLinkButton } from "@/features/links/components/create-link-dialog";
import { LinksTable } from "@/features/links/components/links-table";
import { LinksToolbar } from "@/features/links/components/links-toolbar";
import { useGetLinks } from "../hooks/use-get-links";
import type { PaginationMeta } from "@/lib/schemas/pagination";

const emptyMeta: PaginationMeta = {
  page: 1,
  limit: 10,
  totalPages: 1,
  totalData: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

export function LinksPage() {
  const { data, isLoading } = useGetLinks();
  const links = data?.data ?? [];
  const meta = data?.meta ?? emptyMeta;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            My Links
          </h1>
          <p className="font-body text-lg text-outline">
            Manage, organize, and track all your shortened links.
          </p>
        </div>
        <CreateLinkButton className="rounded-md" />
      </div>

      <LinksToolbar />

      <LinksTable data={links} meta={meta} isLoading={isLoading} />
    </div>
  );
}
