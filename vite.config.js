import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8888, // Development server port
    strictPort: true, // Force this port, fail if taken
  },
  preview: {
    port: 8888, // Preview server port
  },
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.png', '**/*.PNG', '**/*.JPG'],
})
