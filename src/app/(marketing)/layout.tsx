import { getAuthToken } from "@/features/auth/common/session";
import { SiteFooter } from "@/features/marketing/components/site-footer";
import { SiteHeader } from "@/features/marketing/components/site-header";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthToken();

  return (
    <div className="flex flex-1 flex-col bg-background text-on-surface">
      <SiteHeader isLoggedIn={!!token} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
