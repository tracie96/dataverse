import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-black text-white hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho",
  outline:
    "border border-stroke bg-transparent text-black hover:bg-alabaster dark:border-strokedark dark:text-white dark:hover:bg-hoverdark",
  secondary: "bg-primary text-white hover:bg-primaryho",
  ghost: "bg-transparent text-black hover:bg-alabaster dark:text-white dark:hover:bg-hoverdark",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-5 text-sm",
  sm: "h-9 rounded-full px-4 text-sm",
  lg: "h-12 rounded-full px-8 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
