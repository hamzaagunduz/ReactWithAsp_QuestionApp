import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './SmartLearningSection.module.css';

import learningImage from '../../assets/landingpage/1.jpg';

const SmartLearningSection = () => {
    React.useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const learningPoints = [
        "Kişiye özel öğrenme yolları",
        "Eksik konu tespiti ve tamamlama",
        "Verimli çalışma planları",
        "Gerçek zamanlı performans analizi",
        "Yapay zeka destekli tavsiyeler"
    ];

    return (
        <section className={styles.smartLearning}>
            <div className={styles.container}>
                <div
                    className={styles.smartContent}
                    data-aos="fade-right"
                >
                    <h2>Akıllı Öğrenme Sistemi</h2>
                    <p>
                        Dobi'nin gelişmiş algoritmaları, öğrenme stilinize uygun kişiselleştirilmiş
                        yol haritaları oluşturur. Eksiklerinizi tespit eder ve en verimli şekilde
                        sınavlara hazırlanmanızı sağlar.
                    </p>

                    <div className={styles.learningPoints}>
                        {learningPoints.map((point, index) => (
                            <div
                                key={index}
                                className={styles.learningPoint}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className={styles.pointIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className={styles.smartImage}
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    <img src={learningImage} alt="Smart Learning" />
                </div>
            </div>
        </section>
    );
};

export default SmartLearningSection;