import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const packageName = '@petra/elements' as const;
const formattedName = packageName.match(/[^/]+$/)?.[0] ?? packageName

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'styled-system': '/styled-system',
    },
  },
  // @see https://docs.excalidraw.com/docs/@excalidraw/excalidraw/faq#referenceerror-process-is-not-defined
  define: {
    "process.env.IS_PREACT": JSON.stringify("false"),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: formattedName,
      formats: ['es', 'umd'],
      fileName: (format) => `${formattedName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
          'react-dom': 'ReactDOM',
        },
      },
    },
  }
});
