import { HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "glass rounded-2xl p-6",
          hover && "cursor-pointer hover:scale-[1.02] hover:border-cogni-500/30 transition-all duration-300",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
