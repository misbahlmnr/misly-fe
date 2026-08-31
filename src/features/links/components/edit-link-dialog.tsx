"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { CreateLinkForm } from "@/features/links/components/create-link-form";
import { defaultDomain } from "@/features/links/constants";

type EditLink = {
  id: string;
  title: string;
  slug: string;
  destinationUrl: string;
};

export function EditLinkDialog({
  open,
  onOpenChange,
  link,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: EditLink;
}) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
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
        aria-labelledby="edit-link-title"
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
              id="edit-link-title"
              className="mb-2 font-headline text-2xl font-bold text-on-surface"
            >
              Edit link
            </h2>
            <p className="font-body text-sm text-outline">
              Update the destination URL or title for this short link.
            </p>
          </div>
          <CreateLinkForm
            mode="edit"
            linkId={link.id}
            defaultValues={{
              destinationUrl: link.destinationUrl,
              domain: defaultDomain,
              customSlug: link.slug,
              title: link.title,
            }}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </div>
    </div>
  );
}
