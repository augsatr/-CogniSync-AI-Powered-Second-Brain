import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full px-4 py-3 bg-midnight-800/80 border border-midnight-600/50 rounded-xl text-midnight-100 placeholder-midnight-400 focus:outline-none focus:border-cogni-500/50 focus:ring-2 focus:ring-cogni-500/20 transition-all duration-300",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
