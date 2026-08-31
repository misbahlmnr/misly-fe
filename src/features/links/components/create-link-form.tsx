"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Scissors } from "lucide-react";
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

const domainItems = domains.map((domain) => ({
  label: domain,
  value: domain,
}));

export function CreateLinkForm({ onCancel }: { onCancel: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateLinkValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      destinationUrl: "",
      domain: defaultDomain,
      customSlug: "",
      title: "",
    },
  });

  const createLink = useCreateLink();

  function onSubmit(values: CreateLinkValues) {
    createLink.mutate(values, {
      onSuccess: () => {
        onCancel();
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
            onValueChange={(value) => {
              if (value) setValue("domain", value);
            }}
          >
            <SelectTrigger aria-label="Domain">
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
            {...register("customSlug")}
          />
          <p className="mt-2 font-body text-xs text-outline">
            Optional — leave empty to generate automatically.
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
        <Button
          type="submit"
          disabled={createLink.isPending}
          className="flex-1"
        >
          {createLink.isPending ? (
            <Loader2 className="size-5 animate-spin" strokeWidth={2.5} />
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
