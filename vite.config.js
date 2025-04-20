import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'resources/index.js'),
      },
      output: {
        entryFileNames: 'index.min.js',
        dir: resolve(__dirname, 'public/js')
      }
    },
    emptyOutDir: false,
    sourcemap: false,
  }
});