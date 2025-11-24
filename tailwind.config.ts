import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1920px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        // Brand Colors
        "lime-green": {
          DEFAULT: "hsl(var(--lime-green))",
          "000": "hsl(var(--lime-green-000))",
          "100": "hsl(var(--lime-green-100))",
          "200": "hsl(var(--lime-green-200))",
          "300": "hsl(var(--lime-green-300))",
          "400": "hsl(var(--lime-green-400))",
          "500": "hsl(var(--lime-green-500))",
          "600": "hsl(var(--lime-green-600))",
          "700": "hsl(var(--lime-green-700))",
          "800": "hsl(var(--lime-green-800))",
          "900": "hsl(var(--lime-green-900))",
          "1000": "hsl(var(--lime-green-1000))",
        },
        "sage-green": {
          DEFAULT: "hsl(var(--sage-green))",
          "000": "hsl(var(--sage-green-000))",
          "100": "hsl(var(--sage-green-100))",
          "200": "hsl(var(--sage-green-200))",
          "300": "hsl(var(--sage-green-300))",
          "400": "hsl(var(--sage-green-400))",
          "500": "hsl(var(--sage-green-500))",
          "600": "hsl(var(--sage-green-600))",
          "700": "hsl(var(--sage-green-700))",
          "800": "hsl(var(--sage-green-800))",
          "900": "hsl(var(--sage-green-900))",
          "1000": "hsl(var(--sage-green-1000))",
        },
        "neon-yellow": {
          DEFAULT: "hsl(var(--neon-yellow))",
          "000": "hsl(var(--neon-yellow-000))",
          "100": "hsl(var(--neon-yellow-100))",
          "200": "hsl(var(--neon-yellow-200))",
          "300": "hsl(var(--neon-yellow-300))",
          "400": "hsl(var(--neon-yellow-400))",
          "500": "hsl(var(--neon-yellow-500))",
          "600": "hsl(var(--neon-yellow-600))",
          "700": "hsl(var(--neon-yellow-700))",
          "800": "hsl(var(--neon-yellow-800))",
          "900": "hsl(var(--neon-yellow-900))",
          "1000": "hsl(var(--neon-yellow-1000))",
        },
        "forest-green": {
          DEFAULT: "hsl(var(--forest-green))",
          "000": "hsl(var(--forest-green-000))",
          "100": "hsl(var(--forest-green-100))",
          "200": "hsl(var(--forest-green-200))",
          "300": "hsl(var(--forest-green-300))",
          "400": "hsl(var(--forest-green-400))",
          "500": "hsl(var(--forest-green-500))",
          "600": "hsl(var(--forest-green-600))",
          "700": "hsl(var(--forest-green-700))",
          "800": "hsl(var(--forest-green-800))",
          "900": "hsl(var(--forest-green-900))",
          "1000": "hsl(var(--forest-green-1000))",
        },
        "sage-gray": "hsl(var(--sage-gray))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        caution: {
          DEFAULT: "hsl(var(--caution))",
          foreground: "hsl(var(--caution-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["Carter One", "sans-serif"], // Logo only
        heading: ["Plus Jakarta Sans", "sans-serif"], // All headings and buttons
        body: ["DM Sans", "sans-serif"], // All body text
        sans: ["DM Sans", "sans-serif"], // Default
      },
      fontSize: {
        display: ["64px", { lineHeight: "72px" }], // Display - Carter One
        "heading-1": ["40px", { lineHeight: "48px" }], // H1 - Plus Jakarta Sans Bold
        "heading-2": ["36px", { lineHeight: "44px" }], // H2 - Plus Jakarta Sans Bold
        "heading-3": ["28px", { lineHeight: "36px" }], // H3 - Plus Jakarta Sans Bold
        "heading-4": ["24px", { lineHeight: "32px" }], // H4 - Plus Jakarta Sans Bold
        "body-large": ["20px", { lineHeight: "32px" }], // Body Large - DM Sans
        base: ["16px", { lineHeight: "24px" }], // Body - DM Sans
        "body-small": ["14px", { lineHeight: "20px" }], // Body Small - DM Sans
      },
      letterSpacing: {
        button: "0.5px", // Button letter spacing
      },
      maxWidth: {
        mobile: "500px",
      },
      spacing: {
        // 4px Grid System
        "0.5": "4px",
        "1": "8px",
        "1.5": "12px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "6": "48px",
        "8": "64px",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px", // Most common - cards, buttons, inputs
        lg: "16px",
      },
      boxShadow: {
        card: "0px 4px 24px 0px rgba(0, 0, 0, 0.1)",
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
