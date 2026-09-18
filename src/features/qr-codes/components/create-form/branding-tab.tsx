import { FieldError } from "@/components/shared/field-error";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import { CreateQrValues } from "../../types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

interface BrandingTabProps {
  logoPreview: string;
  register: UseFormRegister<CreateQrValues>;
  errors: FieldErrors<CreateQrValues>;
}
const BrandingTab = ({ logoPreview, register, errors }: BrandingTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Branding
        </h2>
        <p className="mt-1 font-body text-sm text-on-surface-variant">
          Drop a logo in the center. Square PNG or SVG works best.
        </p>
      </div>

      <div
        className={cn(
          "flex items-center gap-4 rounded-xl bg-surface-bright p-4 ink-border",
          logoPreview && "shadow-hard-pressed",
        )}
      >
        <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-surface-container-lowest ink-border">
          <ImageIcon
            className={cn(
              "size-6",
              logoPreview ? "text-primary" : "text-on-surface-variant",
            )}
            strokeWidth={2.25}
          />
        </div>
        <div className="min-w-0">
          <p className="font-label text-sm font-bold text-on-surface">
            {logoPreview ? "Logo added" : "Center logo"}
          </p>
          <p className="font-body text-xs text-on-surface-variant">
            {logoPreview
              ? "Shown in the live preview on the right."
              : "Optional. Leave empty for a clean QR."}
          </p>
        </div>
      </div>

      <label className="block space-y-2">
        <span className="block font-label text-sm font-bold text-on-surface">
          Logo URL
        </span>
        <Input
          type="url"
          placeholder="https://example.com/logo.png"
          aria-invalid={errors.logoUrl ? true : undefined}
          {...register("logoUrl")}
        />
        <FieldError message={errors.logoUrl?.message} />
      </label>
    </div>
  );
};

export default BrandingTab;
