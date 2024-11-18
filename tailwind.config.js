/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-yellow-700',
    'bg-red-900',
    'bg-sky-900',
    'bg-purple-900',
    'bg-amber-900',
    'bg-yellow-900',
    'bg-lime-900',
    'bg-purple-950',
    'bg-slate-800',
    'bg-orange-900',
    'bg-blue-900',
    'bg-green-900',
    'bg-yellow-600',
    'bg-pink-900',
    'bg-cyan-900',
    'bg-indigo-900',
    'bg-zinc-950',
    'bg-pink-900'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
