import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading font-bold uppercase tracking-button transition-[var(--transition-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary Solid - Dark Green background, white text
        default: "bg-forest-green text-white border-2 border-forest-green hover:bg-[#3d4f3f] hover:border-[#3d4f3f] rounded-lg shadow-card",
        
        // Primary Outline - Transparent, Dark Green border and text
        "primary-outline": "bg-transparent text-forest-green border-2 border-forest-green hover:bg-forest-green hover:text-white rounded-lg",
        
        // Primary Ghost - Transparent, Dark Green text
        "primary-ghost": "bg-transparent text-forest-green border-0 hover:bg-forest-green hover:text-white rounded-lg",
        
        // Secondary Solid - Neon Yellow background, Dark Green text
        secondary: "bg-neon-yellow text-forest-green border-2 border-forest-green hover:bg-[#f9fe9a] rounded-lg shadow-card",
        
        // Secondary Outline - Transparent, Dark Green border and text
        "secondary-outline": "bg-transparent text-forest-green border-2 border-forest-green hover:bg-neon-yellow rounded-lg",
        
        // Secondary Ghost - Transparent, Dark Green text
        "secondary-ghost": "bg-transparent text-forest-green border-0 hover:bg-neon-yellow rounded-lg",
        
        // Tertiary Solid - Sage Green background, Dark Green text
        tertiary: "bg-sage-green text-forest-green border-2 border-forest-green hover:bg-[#a8c67a] rounded-lg shadow-card",
        
        // Tertiary Outline - Transparent, Dark Green border and text
        "tertiary-outline": "bg-transparent text-forest-green border-2 border-forest-green hover:bg-sage-green rounded-lg",
        
        // Tertiary Ghost - Transparent, Dark Green text
        "tertiary-ghost": "bg-transparent text-forest-green border-0 hover:bg-sage-green rounded-lg",
        
        // Destructive: Red background, white text
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-2 border-destructive rounded-lg shadow-card",
        
        // Legacy variants for backwards compatibility
        outline: "bg-transparent text-forest-green border border-sage-gray hover:bg-sage-gray/20 rounded-lg",
        ghost: "bg-transparent text-forest-green border-0 hover:bg-sage-gray/20 rounded-lg",
        link: "text-forest-green underline-offset-4 hover:underline border-0 bg-transparent p-0 h-auto",
      },
      size: {
        // Desktop sizes - 48px height
        default: "h-12 px-6 py-3 text-base", /* 48px height, 12px vertical padding, 24px horizontal */
        sm: "h-10 px-4 py-2 text-sm", /* 40px height */
        lg: "h-14 px-8 py-3.5 text-lg", /* 56px height */
        icon: "h-12 w-12 p-0", /* 48px square */
        
        // Mobile sizes - 44px height
        mobile: "h-11 px-6 py-2.5 text-base", /* 44px height for mobile */
        "mobile-sm": "h-10 px-4 py-2 text-sm",
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
