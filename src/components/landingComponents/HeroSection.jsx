import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './HeroSection.module.css';
import { FaRobot, FaChartLine, FaBook } from 'react-icons/fa';

const HeroSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.heroContent}>
                    <h1 data-aos="fade-up">
                        <span className={styles.highlight}>Akıllı</span> Öğrenme,
                        <br />
                        <span className={styles.highlight}>Kişiselleştirilmiş</span> Başarı
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100">
                        Dobi ile öğrenme sürecinizi dönüştürün. Yapay zeka destekli öğrenme
                        platformumuz sizi hedeflerinize ulaştırır.
                    </p>
                    <div className={styles.buttonGroup} data-aos="fade-up" data-aos-delay="200">
                        <a href="/login" style={{ textDecoration: "none" }} className={styles.ctaButton}>
                            Ücretsiz Başla
                        </a>
                        <button className={styles.secondaryButton} onClick={openModal}>Demo İzle</button>
                    </div>

                    <div className={styles.stats} data-aos="fade-up" data-aos-delay="300">
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>+100</div>
                            <div className={styles.statLabel}>Mutlu Öğrenci</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>%100</div>
                            <div className={styles.statLabel}>Motivasyon ve Kararlılık</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>7/24</div>
                            <div className={styles.statLabel}>Geliştirme & Destek Süreci</div>
                        </div>
                    </div>
                </div>

                <div className={styles.heroImage} data-aos="fade-left" data-aos-delay="400">
                    <div className={styles.appMockup}>
                        <div className={styles.mockupScreen}>
                            <div className={styles.screenContent}>
                                <div className={styles.appHeader}>Dobi</div>
                                <div className={styles.appFeature}>
                                    <div className={styles.featureIcon}><FaRobot /></div>
                                    <div className={styles.featureText}>Yapay Zeka ile Soru Çözümü</div>
                                </div>
                                <div className={styles.appFeature}>
                                    <div className={styles.featureIcon}><FaChartLine /></div>
                                    <div className={styles.featureText}>Kişisel Gelişim Takibi</div>
                                </div>
                                <div className={styles.appFeature}>
                                    <div className={styles.featureIcon}><FaBook /></div>
                                    <div className={styles.featureText}>Kapsamlı Soru Bankası</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={closeModal}>×</button>
                        <div className={styles.videoContainer}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/2_ZNSUGTlLo?autoplay=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroSection;
