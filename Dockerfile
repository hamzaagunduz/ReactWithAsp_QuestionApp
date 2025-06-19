# 1. Build aşaması
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ortam dosyasını Vite'nin anlayacağı şekilde kopyala
COPY .env.production .env

# Vite build komutu
RUN npm run build -- --mode production

# 2. Serve aşaması: Nginx
FROM nginx:alpine

# Build edilen dosyaları kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# SPA için uygun nginx.conf dosyasını kopyala
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
