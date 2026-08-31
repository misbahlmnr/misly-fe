"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Scissors } from "lucide-react";
import { useForm } from "react-hook-form";

import { FieldError } from "@/components/shared/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/features/links/components/field";
import { defaultDomain, domains } from "@/features/links/constants";
import {
  createLinkSchema,
  type CreateLinkValues,
} from "@/features/links/schema";
import { useCreateLink } from "../hooks/use-create-link";
import { useUpdateLink } from "../hooks/use-update-link";

const domainItems = domains.map((domain) => ({
  label: domain,
  value: domain,
}));

type CreateLinkFormProps = {
  onCancel: () => void;
  /* CONCEPT: Discriminated Union 
      Is a concept in programming that allows us to create a union type that has different properties.
  */
} & (
  | { mode?: "create"; linkId?: undefined; defaultValues?: undefined }
  | { mode: "edit"; linkId: string; defaultValues: CreateLinkValues }
);

export function CreateLinkForm(props: CreateLinkFormProps) {
  const { onCancel } = props;
  const isEdit = props.mode === "edit";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateLinkValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: isEdit
      ? props.defaultValues
      : {
          destinationUrl: "",
          domain: defaultDomain,
          customSlug: "",
          title: "",
        },
  });

  const createLink = useCreateLink();
  const updateLink = useUpdateLink();
  const isPending = isEdit ? updateLink.isPending : createLink.isPending;

  function onSubmit(values: CreateLinkValues) {
    if (props.mode === "edit") {
      updateLink.mutate(
        { id: props.linkId, values },
        {
          onSuccess: (result) => {
            if (result.success) onCancel();
          },
        },
      );
      return;
    }

    createLink.mutate(values, {
      onSuccess: (result) => {
        if (result.success) onCancel();
      },
    });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Destination URL">
        <Input
          id="destUrl"
          type="url"
          placeholder="https://example.com/your-long-url"
          aria-invalid={errors.destinationUrl ? true : undefined}
          {...register("destinationUrl")}
        />
        <FieldError message={errors.destinationUrl?.message} />
      </Field>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Field label="Domain">
          <Select
            items={domainItems}
            value={watch("domain")}
            disabled={isEdit}
            onValueChange={(value) => {
              if (value) setValue("domain", value);
            }}
          >
            <SelectTrigger aria-label="Domain" disabled={isEdit}>
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
        <Field label="Custom slug" className="md:col-span-2">
          <Input
            type="text"
            placeholder="summer-sale"
            disabled={isEdit}
            {...register("customSlug")}
          />
          <p className="mt-2 font-body text-xs text-outline">
            {isEdit
              ? "Short link slug cannot be changed."
              : "Optional — leave empty to generate automatically."}
          </p>
        </Field>
      </div>

      <Field label="Title">
        <Input
          type="text"
          placeholder="Summer Sale Campaign"
          {...register("title")}
        />
        <p className="mt-2 font-body text-xs text-outline">
          Give your link a name so you can easily find it later.
        </p>
      </Field>

      <FieldError message={errors.root?.message} />

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="flex-1">
          {isPending ? (
            <Loader2 className="size-5 animate-spin" strokeWidth={2.5} />
          ) : isEdit ? (
            <>
              Save changes
              <Save className="size-5" strokeWidth={2.5} />
            </>
          ) : (
            <>
              Shorten Link
              <Scissors className="size-5" strokeWidth={2.5} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
