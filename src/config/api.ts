export const restApiPaths = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
  },
  overview: {
    "backend-get": "/api/dashboard/overview",
    "frontend-get": "/api/overview",
  },
  links: {
    get: "/api/links",
    create: "/api/links",
    delete: (id: string) => `/api/links/${id}`,
    update: (id: string) => `/api/links/${id}`,
    updateStatus: (id: string) => `/api/links/${id}/status`,
  },
} as const;
