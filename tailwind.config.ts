import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "clamp(16px, 4vw, 48px)",
      screens: {
        "2xl": "1120px",
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        // Brand colors
        bx: {
          900: "hsl(var(--bx-900))",
          800: "hsl(var(--bx-800))",
          700: "hsl(var(--bx-700))",
          600: "hsl(var(--bx-600))",
          400: "hsl(var(--bx-400))",
          200: "hsl(var(--bx-200))",
          100: "hsl(var(--bx-100))",
        },
        gd: {
          900: "hsl(var(--gd-900))",
          800: "hsl(var(--gd-800))",
          700: "hsl(var(--gd-700))",
          600: "hsl(var(--gd-600))",
          500: "hsl(var(--gd-500))",
          300: "hsl(var(--gd-300))",
          100: "hsl(var(--gd-100))",
        },
        gy: {
          950: "hsl(var(--gy-950))",
          900: "hsl(var(--gy-900))",
          800: "hsl(var(--gy-800))",
          700: "hsl(var(--gy-700))",
          600: "hsl(var(--gy-600))",
          500: "hsl(var(--gy-500))",
          400: "hsl(var(--gy-400))",
          300: "hsl(var(--gy-300))",
          200: "hsl(var(--gy-200))",
          100: "hsl(var(--gy-100))",
          50: "hsl(var(--gy-50))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          warm: "hsl(var(--surface-warm))",
          parchment: "hsl(var(--surface-parchment))",
          deep: "hsl(var(--surface-deep))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
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
