import Link from "next/link";

import { routes } from "@/config/routes";
import { LoginForm } from "@/features/auth/components/login-form";

export function LoginPage() {
  return (
    <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center">
      <div className="hero-fade mb-8 w-full text-center">
        <Link
          href={routes.home}
          className="mb-6 inline-flex items-center gap-2"
        >
          <div className="flex size-10 items-center justify-center rounded-md bg-primary ink-border btn-hard-shadow-sm">
            <span className="font-headline text-xl font-bold text-on-primary">
              M
            </span>
          </div>
        </Link>
        <h1 className="font-headline mb-3 text-3xl font-extrabold text-on-surface md:text-4xl">
          Welcome <span className="text-primary">back.</span>
        </h1>
        <p className="font-body text-lg text-on-surface-variant">
          Log in to manage your links and grow your brand.
        </p>
      </div>

      <div className="hero-fade delay-100 w-full">
        <LoginForm />
      </div>

      <div className="hero-fade delay-200 mt-8 text-center">
        <p className="text-lg font-medium text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link
            href={routes.register}
            className="font-bold text-primary underline-offset-4 decoration-2 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
