import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // @ts-ignore
  test: {
    css: false,
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  envPrefix: 'REACT_APP_',
  plugins: [react()],
});
