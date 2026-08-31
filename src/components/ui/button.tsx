import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 hover:cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-ink bg-clip-padding font-bold whitespace-nowrap outline-none select-none focus-visible:ring-3 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none aria-invalid:border-error aria-invalid:ring-3 aria-invalid:ring-error/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-tertiary-fixed text-on-tertiary-fixed btn-hard-shadow hover:bg-tertiary-fixed-dim",
        brand: "bg-primary text-on-primary btn-hard-shadow hover:bg-primary/90",
        outline:
          "bg-surface-container-lowest text-on-surface btn-hard-shadow hover:bg-surface",
        secondary:
          "bg-secondary text-on-secondary btn-hard-shadow hover:bg-secondary/90",
        muted:
          "bg-surface-container-high text-on-surface btn-hard-shadow hover:bg-surface-container",
        ghost:
          "border-transparent bg-transparent text-on-surface transition-colors hover:bg-surface-container-low",
        destructive: "bg-error text-on-error btn-hard-shadow",
        link: "border-transparent bg-transparent text-primary underline-offset-4 shadow-none hover:underline",
      },
      size: {
        default: "h-12 gap-2 px-6",
        xs: "h-8 gap-1 rounded-md px-3 text-label-sm",
        sm: "h-10 gap-1.5 px-4",
        lg: "h-14 gap-2 px-8",
        icon: "size-12",
        "icon-xs": "size-8 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-10 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
