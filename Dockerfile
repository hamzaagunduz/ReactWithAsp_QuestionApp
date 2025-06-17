# 1. Aşama: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Eğer dockerignore'dan dolayı .env.production atıldıysa bunu ekle
COPY .env.production .env.production

# Production build (modu kesin belirt)
RUN npm run build -- --mode production

# 2. Aşama: Nginx ile serve
FROM nginx:alpine

# Build edilmiş statik dosyaları nginx'in standart dizinine kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# SPA için uygun nginx.conf dosyasını kopyala
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
