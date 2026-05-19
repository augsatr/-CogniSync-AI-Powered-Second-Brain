import { HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-midnight-800/60 backdrop-blur-xl border border-midnight-700/50 shadow-xl rounded-2xl p-6",
          glow && "shadow-[0_0_40px_rgba(99,102,241,0.15)]",
          hover && "hover:bg-midnight-700/80 hover:border-cogni-500/30 transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
