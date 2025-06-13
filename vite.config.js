import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10 KB'den büyük dosyalar sıkıştırılır
      algorithm: 'gzip', // brotli de kullanabilirsiniz: 'brotliCompress'
      ext: '.gz'         // .gz uzantısı ile çıkış alır
    })
  ]
})