// FeaturesGrid.jsx
import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './FeaturesGrid.module.css';

const FeaturesGrid = () => {
    React.useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const features = [
        {
            icon: "fas fa-brain",
            title: "Yapay Zeka Destekli Çalışma",
            description: "Sorularınızı analiz eden ve zayıf yönlerinize göre tavsiyeler sunan yapay zeka sistemi."
        },
        {
            icon: "fas fa-play-circle",
            title: "Konu Anlatım Videoları",
            description: "Her seviyeye uygun, sade ve etkili videolu konu anlatımları."
        },
        {
            icon: "fas fa-chart-line",
            title: "Haftalık & Aylık Performans Takibi",
            description: "Zaman içindeki gelişiminizi grafiklerle takip edin, eksiklerinizi görün."
        },
        {
            icon: "fas fa-clone",
            title: "Flash Kart Sistemi",
            description: "Her konuyu küçük, akılda kalıcı kartlara dönüştürerek daha kolay tekrar edin."
        },
        {
            icon: "fas fa-heart",
            title: "Kalp Sistemi ile Motivasyon",
            description: "Çalışmalarınıza bağlı olarak kalp kazanın, ilerlemenizi motive edici şekilde izleyin."
        },
        {
            icon: "fas fa-question-circle",
            title: "Flash Kart Quizleri",
            description: "Hazırladığınız kartlardan otomatik quizler oluşturun ve bilginizi test edin."
        },
        {
            icon: "fas fa-book-open",
            title: "Konu Anlatımı & Özet Bilgi",
            description: "Her konu için sadeleştirilmiş, sınava uygun anlatım ve özet içerikler."
        },
        {
            icon: "fas fa-gift",
            title: "Tamamen Ücretsiz Kullanım",
            description: "Tüm özelliklere ücretsiz erişim, sürpriz kısıtlama yok."
        }
    ];


    return (
        <section className={styles.featuresGridSection}>
            <div className={styles.sectionHeader}>
                <h2 data-aos="fade-up">Dobi'nin Farkı Ne?</h2>
                <p data-aos="fade-up" data-aos-delay="100">Rakipsiz özelliklerle donatılmış platformumuz</p>
            </div>

            <div className={styles.featuresContainer}>
                {features.map((feature, index) => (
                    <div
                        className={styles.featureCard}
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                    >
                        <div className={styles.featureIcon}>
                            <i className={feature.icon}></i>
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesGrid;