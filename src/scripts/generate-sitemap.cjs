const fs = require('fs');
const path = require('path');

// Site adresin
const baseUrl = 'https://www.dobilim.com';

// Sitemap'te yer alacak sayfalar
const publicPaths = ['/', '/landing', '/cookie-policy', '/terms-of-use', '/cookie-policy', '/hakkimizda', '/ortakliklar', '/kariyer', '/iletisim'];

// XML içeriğini oluştur
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  ${publicPaths
    .map((url) => {
      const priority = url === '/' ? '1.0' : '0.8';
      return `
  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

// sitemap.xml dosyasını yazmak için yol
const sitemapPath = path.resolve(__dirname, '../../public/sitemap.xml');

// public klasörü yoksa oluştur
const publicDir = path.dirname(sitemapPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// sitemap.xml dosyasını yaz
fs.writeFileSync(sitemapPath, sitemap);

console.log('✅ Sitemap başarıyla oluşturuldu: public/sitemap.xml');
