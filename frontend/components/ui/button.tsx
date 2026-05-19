import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cogni-500/50 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gradient-to-r from-cogni-600 to-cogni-500 text-white hover:from-cogni-500 hover:to-cogni-400":
              variant === "primary",
            "glass glass-hover text-midnight-200": variant === "secondary",
            "text-midnight-300 hover:text-white hover:bg-midnight-800/60": variant === "ghost",
          },
          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-8 py-3.5 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
