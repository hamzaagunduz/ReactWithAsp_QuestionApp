# Temel imaj (node içeren)
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Paketleri kopyala ve yükle
COPY package*.json ./
RUN npm install

# Projeyi kopyala
COPY . .

# Vite dev server 3000 portunda çalışacak şekilde ayarlanmalı
ENV HOST=0.0.0.0
ENV PORT=3000

# Geliştirme sunucusunu başlat
CMD ["npm", "run", "dev"]
