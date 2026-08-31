import type { Metadata } from "next";
import { Suspense } from "react";

import { LinksPage } from "@/features/links";

export const metadata: Metadata = {
  title: "My Links - Misly",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LinksPage />
    </Suspense>
  );
}
