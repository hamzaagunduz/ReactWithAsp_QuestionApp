import styles from './PolicyPage.module.css';
import { Helmet } from 'react-helmet';

const CookiePolicy = () => {
    return (

        <div className={styles.policyContainer}>
            <Helmet>
                <title>Çerez Politikası | Dobi</title>
                <meta name="description" content="Dobi'nin çerez politikası hakkında detaylı bilgi. Hangi çerezleri kullandığımızı, bunları nasıl kontrol edebileceğinizi öğrenin." />

                {/* Sadece sayfaya özel OG etiketleri */}
                <meta property="og:title" content="Çerez Politikası | Dobi" />
                <meta property="og:description" content="Dobi web sitesindeki çerez kullanımı hakkında detaylı bilgi alın." />
                <meta property="og:url" content="https://www.dobilim.com/cookie-policy" />
            </Helmet>
            <h1>Çerez Politikası</h1>
            <p>Son güncelleme: 22 Haziran 2025</p>

            <section>
                <h2>1. Çerez Nedir?</h2>
                <p>
                    Çerezler, web siteleri tarafından cihazınıza kaydedilen küçük metin
                    dosyalarıdır. Deneyiminizi kişiselleştirmek için kullanılır.
                </p>
            </section>

            <section>
                <h2>2. Hangi Çerezleri Kullanıyoruz?</h2>
                <ul>
                    <li>
                        <strong>Zorunlu Çerezler:</strong> Site fonksiyonelliği için gereklidir
                        (giriş yapma, sepet işlemleri).
                    </li>
                    <li>
                        <strong>Performans Çerezleri:</strong> Trafik analizi ve site performansı
                        için kullanılır (Google Analytics).
                    </li>
                    <li>
                        <strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi hatırlar
                        (dil, tema seçimi).
                    </li>
                    <li>
                        <strong>Hedefleme Çerezleri:</strong> Size ilgili reklamları göstermek
                        için kullanılır (Facebook Piksel).
                    </li>
                </ul>
            </section>

            <section>
                <h2>3. Çerez Kontrolü</h2>
                <p>
                    Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak
                    bu, site fonksiyonlarını kısıtlayabilir.
                </p>
            </section>

            <section>
                <h2>4. Üçüncü Taraf Çerezler</h2>
                <p>
                    Reklam ortaklarımızın çerezleri üzerinde kontrolümüz yoktur. Gizlilik
                    politikalarından onlar sorumludur.
                </p>
            </section>
        </div>
    );
};

export default CookiePolicy;