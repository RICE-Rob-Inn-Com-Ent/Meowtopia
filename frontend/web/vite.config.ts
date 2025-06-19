import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    fs: {
      allow: [
        path.resolve(__dirname, '../../docs'),
        path.resolve(__dirname, './docs'),
        path.resolve(__dirname, './'),
      ],
    },
  },
  build: {
    outDir: 'dist'
  }
});
