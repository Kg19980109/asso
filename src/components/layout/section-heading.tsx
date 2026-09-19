import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: string;
  badgeVariant?: "festive" | "electric" | "purple" | "neutral" | "success" | "saffron" | "gold" | "teal" | "rose";
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
}

export function SectionHeading({
  className,
  badge,
  badgeVariant = "saffron",
  title,
  description,
  align = "center",
  ...props
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-12 sm:mb-16",
        alignStyles[align],
        className
      )}
      {...props}
    >
      {badge && (
        <Badge variant={badgeVariant} className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
