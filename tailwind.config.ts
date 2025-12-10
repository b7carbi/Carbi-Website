import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--color-primary)",
                    dark: "var(--color-primary-dark)",
                },
                text: {
                    primary: "var(--color-text-primary)",
                    secondary: "var(--color-text-secondary)",
                    tertiary: "var(--color-text-tertiary)",
                },
                border: "var(--color-border)",
                "background-alt": "var(--color-background-alt)",
            },
            fontFamily: {
                sans: ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
                rubik: ['Rubik', 'sans-serif'],
            },
            keyframes: {
                wink: {
                    '0%, 90%, 100%': { transform: 'scaleY(1)' },
                    '95%': { transform: 'scaleY(0.1)' },
                },
            },
            animation: {
                wink: 'wink 10s ease-in-out infinite',
            },
        },
    },
    plugins: [],
} satisfies Config;
