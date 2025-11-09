import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { fileURLToPath, URL } from 'node:url'
// fixes gray-matter issue: https://github.com/jonschlinkert/gray-matter/issues/143


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
      public: fileURLToPath(new URL('./public', import.meta.url)),
    },
  },
  optimizeDeps: {
      esbuildOptions: {
          // Node.js global to browser globalThis
          define: {
              global: 'globalThis'
          },
          // Enable esbuild polyfill plugins
          plugins: [
              NodeGlobalsPolyfillPlugin({
                  buffer: true
              })
          ]
      }
  }
})