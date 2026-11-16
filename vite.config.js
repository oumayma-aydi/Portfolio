import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path: '/' for a user site (oumayma-aydi.github.io) or a custom domain.
// The GitHub Actions workflow sets VITE_BASE to '/<repo-name>/' for project pages.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/'
});