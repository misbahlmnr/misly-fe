"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useTableSearch(key = "q", debounceMs = 300) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlValue = searchParams.get(key) ?? "";
  const [value, setValue] = useState(urlValue);

  useEffect(() => {
    setValue(urlValue);
  }, [urlValue]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (value === urlValue) return;

      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete("page");

      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
    }, debounceMs);

    return () => window.clearTimeout(timeout);
  }, [debounceMs, key, pathname, router, searchParams, urlValue, value]);

  const onSearch = useCallback((query: string) => {
    setValue(query);
  }, []);

  return { value, onSearch };
}

export function useTableFilter(key: string, defaultValue = "all") {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const value = searchParams.get(key) ?? defaultValue;

  const setValue = useCallback(
    (nextValue: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!nextValue || nextValue === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, nextValue);
      }

      params.delete("page");

      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
    },
    [defaultValue, key, pathname, router, searchParams],
  );

  return { value, setValue };
}

export function useTableSorting(key = "sort", defaultValue = "newest") {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const value = searchParams.get(key) ?? defaultValue;

  const setValue = useCallback(
    (nextValue: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!nextValue || nextValue === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, nextValue);
      }

      params.delete("page");

      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
    },
    [defaultValue, key, pathname, router, searchParams],
  );

  return { value, setValue };
}

export function useLinksTableParams(defaultLimit = 10) {
  const searchParams = useSearchParams();
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Number.parseInt(
    searchParams.get("limit") ?? String(defaultLimit),
    10,
  );

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: Number.isFinite(limit) && limit > 0 ? limit : defaultLimit,
    q: searchParams.get("q") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
  };
}
