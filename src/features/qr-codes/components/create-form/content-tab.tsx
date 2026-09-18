import { FieldError } from "@/components/shared/field-error";
import { Input } from "@/components/ui/input";
import { SourceToggle } from "../qr-editor-controls";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CreateQrValues } from "../../schema";

const ContentTab = ({
  register,
  errors,
  source,
  setValue,
  linkItems,
  linkId,
  selectedLink,
}: {
  register: UseFormRegister<CreateQrValues>;
  errors: FieldErrors<CreateQrValues>;
  source: "existing" | "new";
  setValue: UseFormSetValue<CreateQrValues>;
  linkItems: { label: string; value: string }[];
  linkId: string | null;
  // TODO: fix this type after defining the type in the links schema
  selectedLink: any;
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-xl font-bold text-on-surface">
          Destination
        </h2>
        <p className="mt-1 font-body text-sm text-on-surface-variant">
          Name this QR and choose where scans should go.
        </p>
      </div>

      <label className="block space-y-2">
        <span className="block font-label text-sm font-bold text-on-surface">
          Title <span className="text-error">*</span>
        </span>
        <Input
          type="text"
          placeholder="e.g., Summer Campaign"
          aria-invalid={errors.title ? true : undefined}
          {...register("title")}
        />
        <FieldError message={errors.title?.message} />
      </label>

      <div className="space-y-3">
        <p className="font-label text-sm font-bold text-on-surface">
          Link source
        </p>
        <SourceToggle
          value={source}
          onChange={(next) => setValue("source", next)}
        />
      </div>

      {source === "existing" ? (
        <label className="block space-y-2">
          <span className="block font-label text-sm font-bold text-on-surface">
            Short link <span className="text-error">*</span>
          </span>
          <Select
            items={linkItems}
            value={linkId || null}
            onValueChange={(value) => {
              setValue("linkId", value ?? "", {
                shouldValidate: true,
              });
            }}
          >
            <SelectTrigger
              aria-label="Select short link"
              aria-invalid={errors.linkId ? true : undefined}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {linkItems.map((item) =>
                  item.value ? (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ) : null,
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedLink ? (
            <p className="truncate font-body text-xs text-on-surface-variant">
              {selectedLink.destinationUrl}
            </p>
          ) : (
            <p className="font-body text-xs text-on-surface-variant">
              {linkItems.length === 0
                ? "No short links yet — switch to New URL instead."
                : "Choose a link this QR should encode."}
            </p>
          )}
          <FieldError message={errors.linkId?.message} />
        </label>
      ) : (
        <label className="block space-y-2">
          <span className="block font-label text-sm font-bold text-on-surface">
            Destination URL <span className="text-error">*</span>
          </span>
          <Input
            type="url"
            placeholder="https://example.com/your-long-url"
            aria-invalid={errors.destinationUrl ? true : undefined}
            {...register("destinationUrl")}
          />
          <FieldError message={errors.destinationUrl?.message} />
        </label>
      )}
    </div>
  );
};

export default ContentTab;
