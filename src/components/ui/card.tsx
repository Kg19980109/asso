import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glow" | "saffron" | "teal" | "purple" | "emerald";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default:
      "bg-white border border-stone-200/80 rounded-3xl shadow-lg shadow-stone-200/50 text-stone-900",
    glass:
      "bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-stone-300/30 text-stone-900",
    glow:
      "bg-white border border-amber-200 rounded-3xl shadow-xl shadow-amber-500/10 text-stone-900 relative overflow-hidden",
    saffron:
      "bg-gradient-to-br from-amber-50/90 to-orange-50/80 border border-amber-200/80 rounded-3xl shadow-lg shadow-orange-500/5 text-stone-900",
    teal:
      "bg-gradient-to-br from-teal-50/90 to-cyan-50/80 border border-teal-200/80 rounded-3xl shadow-lg shadow-teal-500/5 text-stone-900",
    purple:
      "bg-gradient-to-br from-purple-50/90 to-indigo-50/80 border border-purple-200/80 rounded-3xl shadow-lg shadow-purple-500/5 text-stone-900",
    emerald:
      "bg-gradient-to-br from-emerald-50/90 to-teal-50/80 border border-emerald-200/80 rounded-3xl shadow-lg shadow-emerald-500/5 text-stone-900",
  };

  return (
    <div className={cn(variantStyles[variant], "p-6 sm:p-8", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-xl font-bold leading-tight tracking-tight text-stone-900",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-stone-500 leading-relaxed", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-0", className)} {...props} />;
}
