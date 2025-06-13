import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './HeroSection.module.css';

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
                        <button className={styles.ctaButton}>Ücretsiz Başla</button>
                        <button className={styles.secondaryButton} onClick={openModal}>Demo İzle</button>
                    </div>

                    <div className={styles.stats} data-aos="fade-up" data-aos-delay="300">
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>10K+</div>
                            <div className={styles.statLabel}>Mutlu Öğrenci</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>%98</div>
                            <div className={styles.statLabel}>Başarı Oranı</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>24/7</div>
                            <div className={styles.statLabel}>Destek</div>
                        </div>
                    </div>
                </div>

                <div className={styles.heroImage} data-aos="fade-left" data-aos-delay="400">
                    <div className={styles.appMockup}>
                        <div className={styles.mockupScreen}>
                            <div className={styles.screenContent}>
                                <div className={styles.appHeader}>Dobi</div>
                                <div className={styles.appFeature}>
                                    <div className={styles.featureIcon}><i className="fas fa-robot"></i></div>
                                    <div className={styles.featureText}>Yapay Zeka ile Soru Çözümü</div>
                                </div>
                                <div className={styles.appFeature}>
                                    <div className={styles.featureIcon}><i className="fas fa-chart-line"></i></div>
                                    <div className={styles.featureText}>Kişisel Gelişim Takibi</div>
                                </div>
                                <div className={styles.appFeature}>
                                    <div className={styles.featureIcon}><i className="fas fa-book"></i></div>
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
