import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {
  console.log('Vite build mode:', mode)

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
    server: mode === 'development' ? {
      host: '0.0.0.0',
      port: 3000
    } : undefined
  }
})
