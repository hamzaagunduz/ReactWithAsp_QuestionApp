import styles from './CompanyPage.module.css';
import { Helmet } from 'react-helmet';
const Careers = () => {
    const positions = [
        // {
        //     id: 1,
        //     title: "Yapay Zeka Mühendisi",
        //     type: "Tam Zamanlı",
        //     location: "İstanbul",
        //     department: "Teknoloji",
        //     description: "Eğitim teknolojileri alanında yenilikçi modeller geliştirecek ekibimize katılın."
        // },
        // {
        //     id: 2,
        //     title: "Eğitim İçerik Uzmanı",
        //     type: "Tam Zamanlı",
        //     location: "Ankara",
        //     department: "Eğitim",
        //     description: "Sınav müfredatlarına uygun özgün içerikler oluşturmak için ekibimize katılın."
        // },
        // {
        //     id: 3,
        //     title: "Frontend Geliştirici",
        //     type: "Tam Zamanlı",
        //     location: "İzmir",
        //     department: "Teknoloji",
        //     description: "Kullanıcı deneyimini geliştirecek arayüzler tasarlayacak ekibimize katılın."
        // },
        // {
        //     id: 4,
        //     title: "Kurumsal Satış Temsilcisi",
        //     type: "Tam Zamanlı",
        //     location: "İstanbul",
        //     department: "Satış",
        //     description: "Eğitim kurumlarıyla iş birlikleri geliştirecek ekibimize katılın."
        // }
    ];

    return (
        <div className={styles.companyContainer}>
            <Helmet>
                <title>Kariyer | Dobi</title>
                <meta
                    name="description"
                    content="Dobi'de kariyer fırsatlarını keşfedin. Eğitim teknolojileri alanında anlamlı işler yapın, yenilikçi ekibimize katılın."
                />

                <meta property="og:title" content="Kariyer | Dobi" />
                <meta
                    property="og:description"
                    content="Yenilikçi eğitim teknolojileri geliştiren ekibimize katılın ve kariyerinizde fark yaratın."
                />
                <meta property="og:url" content="https://www.dobilim.com/kariyer" />
            </Helmet>
            <header className={styles.pageHeader}>
                <h1>Kariyer</h1>
                <p>Eğitim teknolojilerinde devrim yapan ekibe katılın</p>
            </header>

            <section className={styles.section}>
                <div className={styles.gridLayout}>
                    <div className={styles.textContent}>
                        <h2>Neden Dobi'de Çalışmalı?</h2>
                        <ul className={styles.benefitsList}>
                            <li><i className="bi bi-check"></i> Anlamlı iş: Her gün binlerce öğrencinin hayatına dokunun</li>
                            <li><i className="bi bi-check"></i> Esnek çalışma saatleri ve uzaktan çalışma imkanı</li>
                            <li><i className="bi bi-check"></i> Sürekli öğrenme ve gelişim fırsatları</li>
                            <li><i className="bi bi-check"></i> Yenilikçi teknolojilerle çalışma imkanı</li>
                            <li><i className="bi bi-check"></i> Rekabetçi maaş ve sosyal haklar</li>
                        </ul>
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
                <h2>Açık Pozisyonlar</h2>
                <div className={styles.positionsGrid}>
                    {positions.map((position) => (
                        <div key={position.id} className={styles.positionCard}>
                            <div className={styles.positionHeader}>
                                <h3>{position.title}</h3>
                                <div className={styles.positionMeta}>
                                    <span className={styles.badge}>{position.type}</span>
                                    <span className={styles.badge}>{position.location}</span>
                                    <span className={styles.badge}>{position.department}</span>
                                </div>
                            </div>
                            <p>{position.description}</p>
                            <button className={styles.applyButton}>Başvur</button>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.sectionAlt}>
                <h2>Başvuru Süreci</h2>
                <div className={styles.processSteps}>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>1</div>
                        <h3>Başvuru</h3>
                        <p>İlgili pozisyon için formu doldurun</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>2</div>
                        <h3>Değerlendirme</h3>
                        <p>Ekibimiz başvurunuzu değerlendirir</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <h3>Mülakat</h3>
                        <p>Teknik ve kültür uyum mülakatları</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>4</div>
                        <h3>Teklif</h3>
                        <p>Başarılı adaylara teklif sunulur</p>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <h2>Ekibe Katılmaya Hazır mısın?</h2>
                <p>Yenilikçi eğitim teknolojileri geliştiren ekibimizde yer alın</p>
                {/* <button className={styles.ctaButton}>Tüm Pozisyonları Gör</button> */}
            </section>
        </div>
    );
};

export default Careers;