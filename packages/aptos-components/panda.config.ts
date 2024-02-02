import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './stories/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          body: { value: 'Open Sans, sans-serif' }
        }
      }
    },
  },

  patterns: {
    extend: {
    }
  },
  
  conditions: {
    dark: '.dark &, [data-theme="dark"] &',
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
