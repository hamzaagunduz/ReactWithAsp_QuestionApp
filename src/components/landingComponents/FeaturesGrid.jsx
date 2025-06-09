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
            icon: "fas fa-robot",
            title: "Yapay Zeka Destekli Akıllı Test Paneli",
            description: "Öğrenme düzeyinize göre otomatik olarak uyarlanan testler"
        },
        {
            icon: "fas fa-film",
            title: "Animasyon Destekli Ders Anlatımları",
            description: "Karmaşık konuları kolayca anlamanızı sağlayan animasyonlar"
        },
        {
            icon: "fas fa-video",
            title: "Video Çözümlü Soru Bankası",
            description: "Her sorunun detaylı video çözümü ile eksiklerinizi giderin"
        },
        {
            icon: "fas fa-calendar-alt",
            title: "Kişiselleştirilmiş Ders Programı",
            description: "Hedeflerinize uygun, size özel çalışma programı"
        },
        {
            icon: "fas fa-user-friends",
            title: "Veli App (Gelişim Takip Sistemi)",
            description: "Velilerin öğrenci gelişimini takip edebilmesi"
        },
        {
            icon: "fas fa-lightbulb",
            title: "Şimdi Anladım App (Ekspres Özel Ders)",
            description: "Anında anlamadığınız konular için özel ders desteği"
        },
        {
            icon: "fas fa-hands-helping",
            title: "Koçum Yanımda App (Dijital Rehberlik)",
            description: "Kişisel rehberlik ve motivasyon desteği"
        },
        {
            icon: "fas fa-calculator",
            title: "Çözücü App (Soru Çözme Asistanı)",
            description: "Çözemediğiniz soruları anında çözen yapay zeka"
        },
        {
            icon: "fas fa-chart-bar",
            title: "Video Çözümlü Deneme Sınavları",
            description: "Gerçek sınav deneyimi ve detaylı analiz"
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