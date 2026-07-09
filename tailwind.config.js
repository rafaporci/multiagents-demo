/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      md: '768px',
      lg: '1280px',
    },
    extend: {
      colors: {
        'brand-primary': '#2F5D9F',
        'brand-primary-hover': '#24487D',
        'brand-primary-active': '#1D3A66',
        'brand-primary-dark': '#14213D',
        'brand-secondary': '#0F766E',
        'brand-accent': '#F59E0B',
        'brand-accent-dark': '#B45309',
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        success: {
          500: '#16A34A',
          700: '#15803D',
        },
        error: {
          500: '#DC2626',
          50: '#FEF2F2',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      spacing: {
        1: '4px',
        2: '8px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
        24: '96px',
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        card: '12px',
        tile: '16px',
      },
      keyframes: {
        spin600: {
          to: { transform: 'rotate(360deg)' },
        },
        'rotate-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: -24 },
        },
        'slide-down': {
          from: { transform: 'translateY(-16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        spin600: 'spin600 600ms linear infinite',
        'rotate-slow': 'rotate-slow 60s linear infinite',
        'dash-flow': 'dash-flow 3s linear infinite',
        'slide-down': 'slide-down 200ms ease',
      },
    },
  },
  plugins: [],
};
