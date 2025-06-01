import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'resources/js/index.js'),
      },
      output: {
        entryFileNames: 'js/index.min.js',
        dir: resolve(__dirname, 'public/')
      }
    },
    emptyOutDir: false,
    sourcemap: false,
  }
});