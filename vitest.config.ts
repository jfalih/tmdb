import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // optional jika kamu pakai jest-dom
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // alias ke folder src
    },
  },
});
