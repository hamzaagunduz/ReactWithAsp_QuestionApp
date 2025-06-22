import styles from './PolicyPage.module.css';
import { Helmet } from 'react-helmet';
const TermsOfUse = () => {
    return (
        <div className={styles.policyContainer}>
            <Helmet>
                <title>Kullanım Şartları | Dobi</title>
                <meta name="description" content="Dobi'nin kullanım şartları hakkında bilgi alın. Hesap sorumlulukları, kullanım kısıtlamaları ve içerik haklarını öğrenin." />

                {/* Sayfaya özel Open Graph etiketleri */}
                <meta property="og:title" content="Kullanım Şartları | Dobi" />
                <meta property="og:description" content="Hesap güvenliği, içerik hakları ve kullanım kısıtlamaları hakkında tüm detaylar burada." />
                <meta property="og:url" content="https://www.dobilim.com/terms-of-use" />
            </Helmet>
            <h1>Kullanım Şartları</h1>
            <p>Yürürlük tarihi: 22 Haziran 2025</p>

            <section>
                <h2>1. Hesap Sorumlulukları</h2>
                <p>
                    Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi paylaşmayın ve
                    şüpheli etkinlikleri derhal bize bildirin.
                </p>
            </section>

            <section>
                <h2>2. Kullanım Kısıtlamaları</h2>
                <p>Aşağıdaki eylemler yasaktır:</p>
                <ul>
                    <li>Sistemleri tersine mühendislikle çözmek</li>
                    <li>Otomatik botlar/scraper'lar kullanmak</li>
                    <li>Spam içerik paylaşmak</li>
                    <li>Telif hakkıyla korunan materyalleri izinsiz dağıtmak</li>
                </ul>
            </section>

            <section>
                <h2>3. İçerik Hakları</h2>
                <p>
                    Platformdaki tüm eğitim içeriklerinin telif hakkı Dobi'ye aittir.
                    İçerikleri ticari amaçlarla kopyalamak, dağıtmak veya satmak yasaktır.
                </p>
            </section>

            <section>
                <h2>4. Hesap Sonlandırma</h2>
                <p>
                    Şartları ihlal eden hesaplar, ön bildirim olmaksızın askıya alınabilir
                    veya kalıcı olarak kapatılabilir.
                </p>
            </section>
        </div>
    );
};

export default TermsOfUse;