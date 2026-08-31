"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import { FieldError } from "@/components/shared/field-error";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  error?: string;
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    { id, label, error, placeholder = "••••••••", className, ...props },
    ref,
  ) {
    const [visible, setVisible] = useState(false);

    return (
      <div className="space-y-2">
        {label ? (
          <label
            htmlFor={id}
            className="block text-left text-sm font-bold text-on-surface"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <Input
            id={id}
            ref={ref}
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            className={cn("pr-12", className)}
            {...props}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-outline transition-colors hover:text-on-surface"
            onClick={() => setVisible((value) => !value)}
            tabIndex={5}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <Eye className="size-5" strokeWidth={2} />
            ) : (
              <EyeOff className="size-5" strokeWidth={2} />
            )}
          </button>
        </div>
        <FieldError message={error} />
      </div>
    );
  },
);
