import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl";
}

export function Section({
  className,
  spacing = "lg",
  children,
  ...props
}: SectionProps) {
  const spacingStyles = {
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-24",
    xl: "py-24 sm:py-32",
  };

  return (
    <section
      className={cn("relative w-full", spacingStyles[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
