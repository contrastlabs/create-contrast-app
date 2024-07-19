import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        test: '#ee9325',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('tailwindcss-multi'),
    require('tailwindcss-mixins'),
    require('tailwind-scrollbar')({
      nocompatible: false,
      preferredStrategy: 'pseudoelements',
    }),
  ],
}

export default config
