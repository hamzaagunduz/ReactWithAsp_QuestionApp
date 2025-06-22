import styles from './CompanyPage.module.css';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
    return (
        <div className={styles.companyContainer}>
            <Helmet>
                <title>Dobi Hakkında | Eğitimde Devrim</title>
                <meta name="description" content="Dobi'nin vizyonu, misyonu ve sunduğu çözümler hakkında bilgi edinin. Eğitimde yapay zeka ile dönüşümü keşfedin." />

                <meta property="og:title" content="Dobi Hakkında | Eğitimde Devrim" />
                <meta property="og:description" content="Dobi'nin eğitim teknolojileri alanındaki misyonu ve çözümleri hakkında bilgi alın." />
                <meta property="og:url" content="https://www.dobilim.com/hakkimizda" />
            </Helmet>

            <header className={styles.pageHeader}>
                <h1>Dobi Hakkında</h1>
                <p>Eğitimde devrim yapmak için yola çıktık</p>
            </header>

            <section className={styles.section}>
                <div className={styles.gridLayout}>
                    <div className={styles.textContent}>
                        <h2>Biz Kimiz?</h2>
                        <p>
                            Dobi, yapay zeka destekli akıllı öğrenme platformu olarak 2025 yılında kuruldu.
                            Kamu sınavlarına hazırlanan öğrencilerin karşılaştığı zorlukları çözmek için
                            yenilikçi teknolojiler geliştiriyoruz.
                        </p>
                        <p>
                            Ekibimiz alanında uzman eğitimciler, yapay zeka mühendisleri ve deneyimli
                            ürün tasarımcılarından oluşuyor. Amacımız, öğrenme deneyimini kişiselleştirerek
                            her öğrencinin potansiyelini maksimuma çıkarmak.
                        </p>
                    </div>
                    <div className={styles.imagePlaceholder}>
                        {/* Burada resmi göster */}
                        <img
                            src="/company/team.jpg"
                            alt="Takım Fotoğrafı"
                            className={styles.teamImage} // opsiyonel, stil vermek için
                        />
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Vizyon & Misyon</h2>
                <div className={styles.missionVision}>
                    <div className={styles.card}>
                        <div className={styles.iconBox}>
                            <i className="bi bi-eye"></i>
                        </div>
                        <h3>Vizyonumuz</h3>
                        <p>
                            Eğitimde fırsat eşitliği sağlayarak, tüm öğrencilerin potansiyellerini en üst düzeye
                            çıkarmak. Dijital eğitimi sadece bilgi aktarımı değil, aynı zamanda bir motivasyon ve
                            rehberlik aracı haline getirmek.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconBox}>
                            <i className="bi bi-bullseye"></i>
                        </div>
                        <h3>Misyonumuz</h3>
                        <p>
                            Yapay zeka destekli, kişiselleştirilmiş ve oyunlaştırılmış bir öğrenme deneyimi sunarak,
                            kamu sınavlarına hazırlanan öğrencilerin süreçlerini daha verimli, etkili ve sürekli hale
                            getirmek.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Çözümlerimiz</h2>
                <div className={styles.problemsSolutions}>
                    <div className={styles.problemCard}>
                        <h3>Problem: Parçalanmış Kaynaklar</h3>
                        <p>Öğrenciler farklı platformlar ve kaynaklar arasında kayboluyor</p>
                        <div className={styles.solution}>
                            <i className="bi bi-check-circle"></i>
                            <span>Çözüm: Tüm kaynakları tek platformda birleştirdik</span>
                        </div>
                    </div>

                    <div className={styles.problemCard}>
                        <h3>Problem: Motivasyon Eksikliği</h3>
                        <p>Tekrarlayan içerikler nedeniyle çalışma sürekliliği azalıyor</p>
                        <div className={styles.solution}>
                            <i className="bi bi-check-circle"></i>
                            <span>Çözüm: Oyunlaştırılmış öğrenme deneyimi</span>
                        </div>
                    </div>

                    <div className={styles.problemCard}>
                        <h3>Problem: Kısıtlı Körsel İletişim</h3>
                        <p>Geleneksel platformlarda canlı rehberlik ve analiz eksik</p>
                        <div className={styles.solution}>
                            <i className="bi bi-check-circle"></i>
                            <span>Çözüm: Yapay zeka destekli anlık geri bildirim</span>
                        </div>
                    </div>

                    <div className={styles.problemCard}>
                        <h3>Problem: Takip Eksikliği</h3>
                        <p>Öğrenciler gelişimlerini sistematik takip edemiyor</p>
                        <div className={styles.solution}>
                            <i className="bi bi-check-circle"></i>
                            <span>Çözüm: Detaylı performans analizi ve raporlama</span>
                        </div>
                    </div>
                </div>

            </section>



        </div>
    );
};

export default AboutUs;