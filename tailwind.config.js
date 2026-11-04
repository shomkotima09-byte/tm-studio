/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./admin.html", "./404.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        carbon: {
          900: '#0F172A',
          800: '#1E293B',
          600: '#475569',
          400: '#94A3B8',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        brand: {
          blue: '#2563EB',
          blueDark: '#1D4ED8',
          blueLight: '#3B82F6',
          cyan: '#06B6D4',
          soft: '#EFF6FF',
        }
      }
    }
  },
  plugins: [],
}
