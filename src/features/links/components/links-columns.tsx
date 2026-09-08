"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { CopyLinkButton } from "@/features/links/components/copy-link-button";
import { LinkActions } from "@/features/links/components/link-actions";
import { formatShortLabel } from "@/features/links/lib/url";
import type { ManagedLink } from "@/features/links/types";
import { formatDate } from "@/lib/formatter";

export const linksColumns: ColumnDef<ManagedLink>[] = [
  {
    id: "detail",
    header: "Link Detail",
    cell: ({ row }) => {
      const link = row.original;

      return (
        <div className="flex flex-col">
          <span className="mb-1 font-label text-lg font-bold text-on-surface">
            {link.title}
          </span>
          <a
            href={link.shortUrl}
            className="mb-1 w-fit font-body text-sm text-primary hover:underline"
          >
            {formatShortLabel(link.shortUrl)}
          </a>
          <span className="max-w-xs truncate text-xs text-outline">
            {link.destinationUrl}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
    cell: ({ row }) => (
      <span className="font-headline text-lg font-bold">
        {row.original.clickCount?.toLocaleString() ?? "0"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="font-label font-semibold whitespace-nowrap">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <span className="block text-center">Actions</span>,
    cell: ({ row }) => {
      const link = row.original;

      return (
        <div className="flex justify-center gap-2">
          <CopyLinkButton url={link.shortUrl} className="rounded-md" />
          <LinkActions
            slug={link.slug}
            linkId={link.id}
            title={link.title}
            destinationUrl={link.destinationUrl}
            isHidden={link.status === "hidden"}
          />
        </div>
      );
    },
  },
];
