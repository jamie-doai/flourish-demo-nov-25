import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-[var(--transition-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary: Filled olive green, white text
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-soft)] rounded-md font-semibold",
        
        // Secondary: White background, olive border and text
        secondary: "bg-card text-primary border-2 border-primary hover:bg-primary/10 rounded-md",
        
        // Tertiary: White background, brown border
        tertiary: "bg-card text-secondary border-2 border-secondary hover:bg-secondary/10 rounded-md",
        
        // Destructive: Red background, white text
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[var(--shadow-soft)] rounded-md font-semibold",
        
        // Outline: minimal border
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md",
        
        // Ghost: no background
        ghost: "hover:bg-accent hover:text-accent-foreground",
        
        // Link: underline only
        link: "text-primary underline-offset-4 hover:underline",
        
        // Hero: gradient or enhanced primary (for landing pages)
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-soft)] font-semibold rounded-md",
      },
      size: {
        // Manager sizes (desktop)
        default: "h-14 px-6 py-3 text-base", /* 56px height */
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-16 px-8 py-4 text-lg", /* 64px height */
        icon: "h-12 w-12",
        
        // Worker sizes (mobile/tablet - larger tap targets)
        worker: "h-20 px-8 py-4 text-xl font-semibold", /* 125-160dp */
        "worker-sm": "h-16 px-6 py-3 text-lg",
        "worker-critical": "h-24 px-10 py-5 text-2xl font-bold", /* 160dp */
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
