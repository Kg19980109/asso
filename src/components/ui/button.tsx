import * as React from "react";
import { cn } from "@/lib/utils";

function Slot({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  if (React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<Record<string, unknown>>,
      {
        ...props,
        ...(children.props as Record<string, unknown>),
        className: cn(
          (props as { className?: string }).className,
          ((children.props as Record<string, unknown>).className as string) ?? ""
        ),
      }
    );
  }
  return <>{children}</>;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "saffron" | "gold" | "teal" | "white" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "saffron", size = "md", disabled, asChild = false, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold tracking-wide rounded-xl transition-all duration-300 cursor-pointer select-none disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400";

    const variants: Record<string, string> = {
      primary:
        "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-400/30 hover:shadow-orange-400/50 hover:scale-[1.02] btn-shimmer",
      secondary:
        "bg-stone-100 text-stone-800 border border-stone-200 hover:bg-stone-200 hover:scale-[1.01]",
      saffron:
        "bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white shadow-xl shadow-orange-400/35 hover:shadow-orange-400/55 hover:scale-[1.02] btn-shimmer border border-orange-400/30",
      gold: "bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-bold shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] btn-shimmer",
      teal: "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-400/30 hover:shadow-teal-400/50 hover:scale-[1.02] btn-shimmer",
      white: "bg-white text-orange-600 font-bold shadow-lg shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] border border-white/80",
      outline:
        "bg-transparent text-orange-600 border-2 border-orange-300 hover:bg-orange-50 hover:border-orange-400 hover:scale-[1.01]",
      ghost: "bg-transparent text-slate-600 hover:bg-black/[0.05] hover:text-slate-900",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs gap-1.5",
      md: "h-11 min-h-[44px] px-5 text-sm gap-2",
      lg: "h-12 min-h-[48px] px-7 text-base gap-2.5",
      xl: "h-14 min-h-[56px] px-9 text-lg gap-3",
    };

    const all = cn(base, variants[variant] || variants.saffron, sizes[size], className);

    if (asChild) {
      return (
        <Slot className={all} {...(props as React.HTMLAttributes<HTMLElement>)}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} disabled={disabled} className={all} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
