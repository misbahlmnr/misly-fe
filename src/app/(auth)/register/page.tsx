import type { Metadata } from "next";

import { RegisterPage } from "@/features/auth/pages/register-page";

export const metadata: Metadata = {
  title: "Sign up - Misly",
};

export default function Page() {
  return <RegisterPage />;
}
