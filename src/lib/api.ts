import axios, { type AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { clearAuthCookie, getAuthToken } from "@/features/auth/common/session";
import { getApiUrl } from "@/lib/env";
import { parseEnvelope, type BackendEnvelope } from "@/lib/schemas/api";
import {
  paginationMetaSchema,
  createFallbackPaginationMeta,
  type PaginationMeta,
} from "@/lib/schemas/pagination";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function createHttp() {
  return axios.create({
    baseURL: getApiUrl(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    validateStatus: () => true,
  });
}

function requestData(body: BodyInit | null | undefined) {
  if (typeof body !== "string") return body;

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return body;
  }
}

function toAxiosConfig(
  init?: RequestInit,
  extraHeaders?: Record<string, string>,
): AxiosRequestConfig {
  return {
    method: (init?.method ?? "GET") as AxiosRequestConfig["method"],
    headers: {
      ...extraHeaders,
      ...(init?.headers as AxiosRequestConfig["headers"]),
    },
    data: requestData(init?.body),
  };
}

async function request<T>(
  path: string,
  init?: RequestInit,
  extraHeaders?: Record<string, string>,
) {
  const response = await createHttp().request<unknown>({
    url: path,
    ...toAxiosConfig(init, extraHeaders),
  });

  return {
    status: response.status,
    body: parseEnvelope<T>(
      response.data,
      response.statusText || "Request failed",
    ),
  };
}

async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<{ status: number; body: BackendEnvelope<T> }> {
  const token = await getAuthToken();
  const response = await request<T>(
    path,
    init,
    token ? { Authorization: `Bearer ${token}` } : undefined,
  );

  if (response.status === 401) {
    await clearAuthCookie();
    redirect(routes.login);
  }

  return response;
}

export async function publicApi<T>(
  path: string,
  init?: RequestInit,
): Promise<{ status: number; body: BackendEnvelope<T> }> {
  return request<T>(path, init);
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const { status, body } = await apiRequest<T>(path, init);

  if (status < 200 || status >= 300 || !body.success) {
    throw new ApiError(body.message || "Request failed", status);
  }

  return body.data as T;
}

export async function apiPaginated<T>(
  path: string,
  init?: RequestInit,
): Promise<{ data: T[]; meta: PaginationMeta }> {
  const { status, body } = await apiRequest<T>(path, init);

  if (status < 200 || status >= 300 || !body.success) {
    throw new ApiError(body.message || "Request failed", status);
  }

  const data = Array.isArray(body.data) ? body.data : [];
  const metaResult = paginationMetaSchema.safeParse(body.meta);

  return {
    data: data as T[],
    meta: metaResult.success
      ? metaResult.data
      : createFallbackPaginationMeta({ page: 1, limit: data.length }, data.length),
  };
}
