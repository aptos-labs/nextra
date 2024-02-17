import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['index.ts'],
    outDir: 'dist',
    target: 'es2022',
    platform: 'node',
    format: ['esm', 'cjs'],
    splitting: false,
    sourcemap: true,
    minify: false,
    shims: false,
    dts: false,
  },
]);
