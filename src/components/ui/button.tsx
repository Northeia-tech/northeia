import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const styles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-emerald text-emerald-ink hover:bg-paper",
        secondary: "border border-line bg-transparent text-paper hover:border-emerald",
        quiet: "px-0 text-mist hover:text-paper",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof styles> & { asChild?: boolean };

export function Button({ className, variant, asChild, type = "button", ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(styles({ variant }), className)} type={asChild ? undefined : type} {...props} />;
}
