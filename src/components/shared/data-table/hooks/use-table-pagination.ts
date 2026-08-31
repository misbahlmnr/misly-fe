"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type TablePaginationReturn = {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

function parsePositiveInt(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function useTablePagination(defaultLimit = 10): TablePaginationReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = parsePositiveInt(searchParams.get("page"), 1);
  const limit = parsePositiveInt(searchParams.get("limit"), defaultLimit);

  const replaceParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const setPage = useCallback(
    (nextPage: number) => {
      replaceParams({ page: String(Math.max(1, nextPage)) });
    },
    [replaceParams],
  );

  const setLimit = useCallback(
    (nextLimit: number) => {
      replaceParams({
        limit: String(Math.max(1, nextLimit)),
        page: "1",
      });
    },
    [replaceParams],
  );

  return { page, limit, setPage, setLimit };
}
