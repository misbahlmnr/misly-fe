"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CreateLinkForm } from "@/features/links/components/create-link-form";
import { cn } from "@/lib/utils";

export function CreateLinkDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-hidden
        className="absolute inset-0 bg-[#0f172a]/45 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-link-title"
        className="relative z-10 flex w-full max-w-md flex-col rounded-lg bg-surface-container-lowest ink-border shadow-hard"
      >
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          aria-label="Close modal"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4"
        >
          <X className="size-4" strokeWidth={2.25} />
        </Button>
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h2
              id="create-link-title"
              className="mb-2 font-headline text-2xl font-bold text-on-surface"
            >
              Create a short link
            </h2>
            <p className="font-body text-sm text-outline">
              Turn a long URL into a short, shareable link.
            </p>
          </div>
          <CreateLinkForm onCancel={() => onOpenChange(false)} />
        </div>
      </div>
    </div>
  );
}

export function CreateLinkButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className={cn("whitespace-nowrap px-6", className)}
        onClick={() => setOpen(true)}
      >
        <Plus className="size-5" strokeWidth={2.5} fill="currentColor" />
        Create Link
      </Button>
      <CreateLinkDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
