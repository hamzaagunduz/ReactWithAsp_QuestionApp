import styles from './CompanyPage.module.css';
import { Helmet } from 'react-helmet';

const Partnerships = () => {
    const partners = [
        { id: 1, name: "Eğitim Kurumları", icon: "bi-building" },
        { id: 2, name: "İçerik Sağlayıcılar", icon: "bi-journal-bookmark" },
        { id: 3, name: "Teknoloji Ortakları", icon: "bi-cpu" },
        { id: 4, name: "Kurumsal Çözümler", icon: "bi-people" }
    ];

    const currentPartners = [
        { id: 1, name: "ABC Eğitim Kurumları", logo: "ABC Logo" },
        { id: 2, name: "XYZ Yayıncılık", logo: "XYZ Logo" },
        { id: 3, name: "Teknoloji Ltd", logo: "Teknoloji Logo" },
        { id: 4, name: "Eğitim Platformu", logo: "Eğitim Logo" }
    ];

    return (
        <div className={styles.companyContainer}>
            <Helmet>
                <title>Ortaklıklar | Dobi</title>
                <meta
                    name="description"
                    content="Dobi ile eğitim ekosistemini güçlendiren iş birlikleri hakkında bilgi alın. Eğitim kurumları, içerik sağlayıcılar ve teknoloji ortaklarımızla tanışın."
                />

                <meta property="og:title" content="Ortaklıklar | Dobi" />
                <meta
                    property="og:description"
                    content="Eğitim ekosistemini birlikte güçlendiren Dobi iş birliklerini keşfedin."
                />
                <meta property="og:url" content="https://www.dobilim.com/ortakliklar" />
            </Helmet>
            <header className={styles.pageHeader}>
                <h1>Ortaklıklar</h1>
                <p>Eğitim ekosistemini birlikte güçlendiriyoruz</p>
            </header>

            <section className={styles.section}>
                <h2>İş Birlikleri Türleri</h2>
                <div className={styles.partnershipTypes}>
                    {partners.map((partner) => (
                        <div key={partner.id} className={styles.partnerTypeCard}>
                            <i className={`bi ${partner.icon}`}></i>
                            <h3>{partner.name}</h3>
                            <p>
                                {partner.name} ile yaptığımız iş birlikleri sayesinde eğitim ekosistemini
                                daha da güçlendiriyoruz.
                            </p>
                            <button className={styles.learnMoreButton}>Detaylar</button>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.sectionAlt}>
                {/* <h2>Mevcut Ortaklarımız</h2>
                <div className={styles.currentPartners}>
                    {currentPartners.map((partner) => (
                        <div key={partner.id} className={styles.partnerLogoCard}>
                            <div className={styles.partnerLogo}>{partner.logo}</div>
                            <h3>{partner.name}</h3>
                        </div>
                    ))}
                </div> */}
            </section>

            <section className={styles.section}>
                <div className={styles.gridLayout}>
                    <div className={styles.textContent}>
                        <h2>Neden Dobi ile Ortaklık Kurmalısınız?</h2>
                        <ul className={styles.benefitsList}>
                            <li><i className="bi bi-check"></i> Yenilikçi eğitim teknolojileri</li>
                            <li><i className="bi bi-check"></i> Kapsamlı veri analizi ve raporlama</li>
                            <li><i className="bi bi-check"></i> Özel kurumsal çözümler</li>
                            <li><i className="bi bi-check"></i> Sektörde lider teknoloji altyapısı</li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* <section className={styles.ctaSection}>
                <h2>Ortaklık Başvurusu</h2>
                <p>Dobi ile iş birliği yapmak için başvurunuzu gönderin</p>

                <div className={styles.partnershipForm}>
                    <div className={styles.formGroup}>
                        <label>Kurum Adı</label>
                        <input type="text" placeholder="Kurumunuzun adı" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>İletişim Kişisi</label>
                        <input type="text" placeholder="Adınız ve soyadınız" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>E-posta</label>
                        <input type="email" placeholder="email@kurumadiniz.com" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Ortaklık Türü</label>
                        <select>
                            <option value="">Seçiniz</option>
                            <option value="education">Eğitim Kurumları</option>
                            <option value="content">İçerik Sağlayıcı</option>
                            <option value="technology">Teknoloji Ortaklığı</option>
                            <option value="corporate">Kurumsal Çözümler</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Mesajınız</label>
                        <textarea rows="4" placeholder="İş birliği önerinizi kısaca açıklayın"></textarea>
                    </div>

                    <button className={styles.submitButton}>Başvuruyu Gönder</button>
                </div>
            </section> */}
        </div>
    );
};

export default Partnerships;