import { defineConfig } from 'vite'

import path from 'path'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 4000,
    open: true,
    cors: {
      origin: "*"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // @ts-ignore
            const packageName = id.match(/node_modules\/([^\/]*)\//)[1];

            return `vendor-${packageName}`;
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
