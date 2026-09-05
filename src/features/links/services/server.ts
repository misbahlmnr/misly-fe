import { restApiPaths } from "@/config/api";
import {
  apiLinkSchema,
  mapApiLinkToManagedLink,
} from "@/features/links/schema";
import type {
  CreatedLink,
  CreateLinkPayload,
  UpdateLinkPayload,
} from "@/features/links/types";
import { api, apiPaginated } from "@/lib/api";
import type { LinksQueryParams } from "@/lib/schemas/pagination";
import { buildLinksQuery } from "@/lib/schemas/pagination";

export function createShortLink(payload: CreateLinkPayload) {
  return api<CreatedLink>(restApiPaths.links.create, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export const getLinksOnServer = async (params: LinksQueryParams) => {
  const query = buildLinksQuery(params);

  const result = await apiPaginated(`${restApiPaths.links.get}${query}`, {
    method: "GET",
  });

  return {
    data: result.data.map((item: unknown) =>
      mapApiLinkToManagedLink(apiLinkSchema.parse(item)),
    ),
    meta: result.meta,
  };
};

export const deleteLink = (id: string) => {
  return api<void>(restApiPaths.links.delete(id), {
    method: "DELETE",
  });
};

export const updateLink = (id: string, payload: UpdateLinkPayload) => {
  return api<CreatedLink>(restApiPaths.links.update(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const updateLinkStatus = (id: string, value: string) => {
  return api<void>(restApiPaths.links.updateStatus(id), {
    method: "PATCH",
    body: JSON.stringify({ status: value }),
  });
};
