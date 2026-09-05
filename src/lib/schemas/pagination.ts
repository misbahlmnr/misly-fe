import { z } from "zod";

export const paginationMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  totalData: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

export type LinksQueryParams = {
  page: number;
  limit: number;
  q?: string;
  status?: string;
  sort?: string;
};

export function buildQueryString(
  params: Record<string, string | number | undefined>,
) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "") return;
    search.set(key, String(value));
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

export function createFallbackPaginationMeta(
  params: { page: number; limit: number },
  dataLength = 0,
): PaginationMeta {
  return {
    page: params.page,
    limit: params.limit,
    totalPages: 1,
    totalData: dataLength,
    hasNextPage: false,
    hasPrevPage: false,
  };
}

export function buildLinksQuery(params: LinksQueryParams) {
  return buildQueryString({
    page: params.page,
    limit: params.limit,
    q: params.q,
    status: params.status,
    sort: params.sort === "newest" ? undefined : params.sort,
  });
}
