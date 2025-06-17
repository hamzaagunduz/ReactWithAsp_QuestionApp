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
        threshold: 10240, // 10 KB'den büyük dosyalar sıkıştırılır
        algorithm: 'gzip', // brotli de kullanabilirsiniz: 'brotliCompress'
        ext: '.gz'
      })
    ],
    ...(mode != 'development' && {
      server: {
        host: '0.0.0.0',
        port: 3000
      }
    })
  }
})
