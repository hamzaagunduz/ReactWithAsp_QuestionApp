import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {

  return {
    plugins: [
      react(),
      compression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],

    build: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  }
})
