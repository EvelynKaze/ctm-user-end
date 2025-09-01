import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      boxShadow: {
        "highlight-top": "inset 0 4px 6px 4px rgba(0, 0, 0, 0.1)",
        'glow-gold': 'var(--glow-gold)',
        'gold': 'var(--shadow-gold)',
      },
      colors: {
        appDarkCard: "#242324",
        appDark: "hsla(225, 17%, 5%, 1)",
        appGold10: "hsla(40, 100%, 48%, 0.1)",
        appGold20: "hsla(40, 100%, 48%, 0.2)",
        appGold50: "hsla(40, 100%, 48%, 0.5)",
        appGold100: "hsla(40, 100%, 48%, 1)",
        appGold200: "hsla(40, 100%, 55%, 1)",
        appGold300: "hsla(40, 100%, 62%, 1)",
        appGold400: "hsla(40, 100%, 70%, 1)",
        appGold500: "hsla(40, 100%, 78%, 1)",
        appGold600: "#f7a600",
        appGold700: "hsla(40, 100%, 42%, 1)",
        appGold800: "hsla(40, 100%, 35%, 1)",
        appGold900: "hsla(40, 100%, 28%, 1)",
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        appCardGold: "linear-gradient(90deg, #f7a600 0%, hsla(40, 100%, 42%, 1) 100%)",
        appPremuimGold:
          "linear-gradient(45deg, hsla(40, 100%, 28%, 1) 0%, hsla(40, 100%, 35%, 1) 49%, hsla(40, 100%, 42%, 1) 100%)",
        appDarkGradient:
          "linear-gradient(45deg, hsla(0, 0%, 16%, 1) 0%, hsla(225, 17%, 5%, 1) 100%)",
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-gold-subtle': 'var(--gradient-gold-subtle)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px hsl(45 100% 60% / 0.3)' },
          '100%': { boxShadow: '0 0 40px hsl(45 100% 60% / 0.6)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'marquee': 'marquee 30s linear infinite',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
