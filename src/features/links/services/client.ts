import axios from "axios";

import { restApiPaths } from "@/config/api";
import {
  toCreateLinkPayload,
  toUpdateLinkPayload,
  type CreateLinkValues,
  type ManagedLink,
} from "@/features/links/schema";
import {
  buildLinksQuery,
  createFallbackPaginationMeta,
  PaginationMeta,
  type LinksQueryParams,
} from "@/lib/schemas/pagination";

export const linksQueryKey = ["links"] as const;

type LinksApiResponse = {
  success: boolean;
  message?: string;
  data?: ManagedLink[];
  meta?: PaginationMeta;
};

export async function createLinkOnClient(values: CreateLinkValues) {
  const payload = toCreateLinkPayload(values);

  const response = await axios.post(restApiPaths.links.create, payload, {
    validateStatus: () => true,
  });

  return response.data;
}

export async function getLinksOnClient(
  params: LinksQueryParams,
): Promise<{ data: ManagedLink[]; meta: PaginationMeta }> {
  const query = buildLinksQuery(params);

  const response = await axios.get<LinksApiResponse>(
    `${restApiPaths.links.get}${query}`,
    {
      validateStatus: () => true,
    },
  );

  const body = response.data;

  if (response.status < 200 || response.status >= 300 || !body?.success) {
    throw new Error(body?.message ?? "Failed to get links");
  }

  return {
    data: body.data ?? [],
    meta:
      body.meta ?? createFallbackPaginationMeta(params, body.data?.length ?? 0),
  };
}

export async function deleteLink(id: string): Promise<void> {
  const response = await axios.delete(restApiPaths.links.delete(id), {
    validateStatus: () => true,
  });

  return response.data;
}

export async function updateLinkOnClient(id: string, values: CreateLinkValues) {
  const payload = toUpdateLinkPayload(values);

  const response = await axios.put(restApiPaths.links.update(id), payload, {
    validateStatus: () => true,
  });

  return response.data;
}

export async function updateLinkStatus(
  id: string,
  value: string,
): Promise<void> {
  const response = await axios.patch(
    restApiPaths.links.updateStatus(id),
    { status: value },
    {
      validateStatus: () => true,
    },
  );

  return response.data;
}
