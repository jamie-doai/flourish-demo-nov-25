import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Flourish Design System: Large font for readability, strong border
          "flex h-12 w-full rounded-md border-2 border-input bg-background px-4 py-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50 transition-[var(--transition-smooth)]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
