const fs = require('fs');
const path = require('path');

const baseUrl = 'https://dobilim.com'; // Kendi domainin

// Sadece herkese açık olan sayfaları ekle
const publicPaths = [
    '/landing',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  ${publicPaths
        .map((url) => {
            return `
  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;
        })
        .join('')}
</urlset>`;

// sitemap.xml dosyasını public klasörüne yaz
fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), sitemap);

console.log('Sitemap sadece açık sayfalarla oluşturuldu: public/sitemap.xml');
