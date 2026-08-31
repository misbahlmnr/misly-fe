"use client"

import { Link2, QrCode, Scissors } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field } from "@/features/links/components/field"
import { domains } from "@/features/links/constants"
import { cn } from "@/lib/utils"

const domainItems = domains.map((domain) => ({
  label: domain,
  value: domain,
}))

type Mode = "link" | "qr"

export function ShortenerForm() {
  const [mode, setMode] = useState<Mode>("link")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className="group/shortener mx-auto mt-12 max-w-3xl transition-transform duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1">
      <div className="ml-4 flex gap-2">
        <TabButton
          active={mode === "link"}
          onClick={() => setMode("link")}
          icon={<Link2 className="size-5" strokeWidth={2} />}
        >
          Short link
        </TabButton>
        <TabButton
          active={mode === "qr"}
          onClick={() => setMode("qr")}
          icon={<QrCode className="size-5" strokeWidth={2} />}
        >
          QR code
        </TabButton>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative -mt-[2px] rounded-2xl bg-surface-container-lowest p-6 ink-border shadow-card-hard transition-shadow duration-200 ease-out group-hover/shortener:shadow-card-hard-hover md:p-8"
      >
        {mode === "link" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <Field label="Paste a long URL" className="md:col-span-12">
              <Input
                type="url"
                name="url"
                required
                placeholder="https://example.com/very-long-link-to-shorten"
                className="h-auto py-4"
              />
            </Field>
            <Field label="Domain" className="md:col-span-5">
              <Select
                items={domainItems}
                defaultValue={domains[0]}
                name="domain"
              >
                <SelectTrigger className="h-auto min-h-12 py-4" aria-label="Domain">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {domainItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Custom slug" className="md:col-span-4">
              <Input
                type="text"
                name="slug"
                placeholder="summer-sale"
                className="h-auto py-4"
              />
            </Field>
            <div className="flex items-end md:col-span-3">
              <Button type="submit" className="h-auto w-full px-6 py-4">
                Shorten
                <Scissors className="size-5" strokeWidth={2.5} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            <Field label="Destination URL">
              <Input
                type="url"
                name="qr-url"
                required
                placeholder="https://example.com/your-page"
                className="h-auto py-4"
              />
            </Field>
            <Button type="submit" className="h-auto w-full px-6 py-4 md:w-auto">
              Generate QR
              <QrCode className="size-5" strokeWidth={2.5} />
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative z-10 flex items-center gap-2 rounded-t-xl border-2 border-b-0 px-6 py-3 font-bold transition-colors",
        active
          ? "border-ink bg-surface-container-lowest text-primary after:absolute after:inset-x-0 after:-bottom-[2px] after:h-[2px] after:bg-surface-container-lowest"
          : "border-ink/20 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
      )}
    >
      {icon}
      {children}
    </button>
  )
}
