/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: {
                    950: '#020617', // Deepest background
                    900: '#0B1120', // Main background (Gunmetal)
                    800: '#1e293b', // Panel background
                    700: '#334155', // Borders
                },
                emerald: {
                    500: '#10B981', // Stable
                    400: '#34d399',
                    900: '#064e3b',
                },
                crimson: {
                    500: '#F43F5E', // Unstable
                    400: '#fb7185',
                    900: '#881337',
                },
                amber: {
                    500: '#F59E0B', // Quantum
                    400: '#fbbf24',
                    900: '#78350f',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
        },
    },
    plugins: [],
}
