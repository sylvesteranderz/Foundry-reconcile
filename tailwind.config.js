/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');
export default {
  darkMode: ['class'],
  content: [
    // './index.html',
    // './src/**/*.{js,ts,jsx,tsx}',
    // './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        foundry: {
          // primary: 'rgba(97, 155, 125, 1)',
          primary: '#1d372c',
        },
        verification: {
          error: {
            bg: 'hsl(359, 100%, 97%)',
            border: 'hsl(359, 100%, 94%)',
            text: 'hsl(360, 100%, 45%)',
          },
          success: {
            bg: 'hsl(143, 85%, 96%)',
            border: 'hsl(145, 92%, 87%)',
            text: 'hsl(140, 100%, 27%)',
          },
        },
        fg: {
          50: '#f1f8f4',
          100: '#deede3',
          200: '#bfdbca',
          300: '#95c0a8',
          400: '#619b7d',
          500: '#468366',
          600: '#34674f',
          700: '#295341',
          800: '#234234',
          900: '#619B7D',
          900: '#1d372c',
          950: '#0f1f19',
          // 950: '#619B7D',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    nextui(),
    require('tailwindcss-animate'),
  ],
};
