import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { HardLink } from "@/components/shared/hard-button";
import { routes } from "@/config/routes";
import { navLinks } from "@/features/marketing/constants";

interface Props {
  isLoggedIn: boolean;
}

export function SiteHeader({ isLoggedIn }: Props) {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-on-surface bg-background">
      <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-headline text-2xl font-black tracking-tighter text-on-surface"
          >
            Misly
          </Link>
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium text-on-surface-variant transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <HardLink href={routes.dashboard} className="rounded-lg px-6 py-2">
              Dashboard
            </HardLink>
          ) : (
            <>
              <Link
                href={routes.login}
                className="hidden font-semibold text-on-surface transition-colors hover:text-primary sm:block"
              >
                Log In
              </Link>
              <HardLink href={routes.register} className="rounded-lg px-6 py-2">
                Sign Up
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </HardLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
