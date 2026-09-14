import Link from "next/link";

import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-label text-sm font-semibold tracking-wide text-primary uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-on-surface md:text-4xl">
        Link not found
      </h1>
      <p className="mt-3 max-w-md font-body text-on-surface-variant">
        This short link does not exist, has been hidden, or is no longer
        available.
      </p>
      <Link
        href={routes.home}
        className="mt-8 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
