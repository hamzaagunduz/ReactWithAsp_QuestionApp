import styles from './PolicyPage.module.css';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
    return (
        <div className={styles.policyContainer}>
            <Helmet>
                <title>Gizlilik Politikası | Dobi</title>
                <meta name="description" content="Dobi'nin gizlilik politikası hakkında detaylı bilgi edinin. Hangi kişisel verileri topladığımızı ve nasıl koruduğumuzu öğrenin." />

                <meta property="og:title" content="Gizlilik Politikası | Dobi" />
                <meta property="og:description" content="Dobi'nin gizlilik politikası hakkında detaylı bilgi edinin. Verilerinizi nasıl kullandığımızı öğrenin." />
                <meta property="og:url" content="https://www.dobilim.com/privacy-policy" />
            </Helmet>
            <h1>Gizlilik Politikası</h1>
            <p>Son güncelleme: 22 Haziran 2025</p>

            <section>
                <h2>1. Bilgi Toplama</h2>
                <p>
                    Dobi olarak, hizmetlerimizi geliştirmek ve size kişiselleştirilmiş bir deneyim sunmak
                    için şu tür bilgileri topluyoruz:
                </p>
                <ul>
                    <li>Kimlik bilgileriniz (ad, e-posta, profil resmi)</li>
                    <li>Kullanım verileri (ders ilerlemeniz, test sonuçları)</li>
                    <li>Teknik bilgiler (IP adresi, cihaz bilgileri, tarayıcı türü)</li>
                </ul>
            </section>

            <section>
                <h2>2. Veri Kullanımı</h2>
                <p>Topladığımız verileri şu amaçlarla kullanıyoruz:</p>
                <ul>
                    <li>Hesap oluşturma ve yönetme</li>
                    <li>Kişiselleştirilmiş öğrenme yolları sunma</li>
                    <li>Müşteri desteği sağlama</li>
                    <li>Güvenlik ve dolandırıcılık önleme</li>
                    <li>Yasal yükümlülükleri yerine getirme</li>
                </ul>
            </section>

            <section>
                <h2>3. Veri Paylaşımı</h2>
                <p>
                    Verilerinizi yalnızca şu durumlarda paylaşıyoruz:
                </p>
                <ul>
                    <li>Yasal gerekliliklerle (mahkeme kararı)</li>
                    <li>İş ortaklarımızla (sınırlı ve şifrelenmiş olarak)</li>
                    <li>Kurumsal müşterilerle (anonimleştirilmiş veriler)</li>
                </ul>
            </section>

            <section>
                <h2>4. Veri Güvenliği</h2>
                <p>
                    Verilerinizi korumak için AES-256 şifreleme, iki faktörlü kimlik doğrulama
                    ve düzenli güvenlik denetimleri uyguluyoruz.
                </p>
            </section>

            <section>
                <h2>5. Haklarınız</h2>
                <p>
                    Verilerinizi görüntüleme, düzeltme veya silme talebinde bulunabilirsiniz.
                    Taleplerinizi <a href="mailto:beldyazilim@gmail.com">beldyazilim@gmail.com</a> adresine iletebilirsiniz.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;