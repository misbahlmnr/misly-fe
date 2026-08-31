import { Mail, Share2 } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/features/marketing/components/reveal"
import { footerColumns } from "@/features/marketing/constants"

export function SiteFooter() {
  return (
    <Reveal
      as="footer"
      className="mt-12 w-full border-t-2 border-on-surface bg-surface-container-highest"
    >
      <div className="mx-auto max-w-container-max px-4 py-16 md:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-black tracking-tighter text-on-surface">
              Misly
            </span>
            <p className="font-body text-sm text-on-surface-variant">
              The fastest, most reliable URL shortener and link management
              platform for freelancers and businesses.
            </p>
            <div className="mt-4 flex gap-4">
              <SocialIcon label="Share">
                <Share2 className="size-3.5" strokeWidth={2} />
              </SocialIcon>
              <SocialIcon label="Email">
                <Mail className="size-3.5" strokeWidth={2} />
              </SocialIcon>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h6 className="mb-6 text-sm font-bold tracking-wider text-on-surface uppercase">
                {column.title}
              </h6>
              <div className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-body text-sm text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-on-surface/20 pt-8 text-center md:flex-row md:text-left">
          <span className="font-body text-sm text-on-surface-variant">
            © 2026 Misly. All rights reserved.
          </span>
        </div>
      </div>
    </Reveal>
  )
}

function SocialIcon({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Link
      href="#"
      aria-label={label}
      className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-surface-container-lowest ink-border transition-colors hover:bg-primary-fixed"
    >
      {children}
    </Link>
  )
}
