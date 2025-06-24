import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './FeaturesGrid.module.css';
import {
    FaBrain,
    FaPlayCircle,
    FaChartLine,
    FaClone,
    FaHeart,
    FaQuestionCircle,
    FaBookOpen,
    FaGift
} from "react-icons/fa";

const FeaturesGrid = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const features = [
        {
            icon: <FaBrain />,
            title: "Yapay Zeka Destekli Çalışma",
            description: "Sorularınızı analiz eden ve zayıf yönlerinize göre tavsiyeler sunan yapay zeka sistemi."
        },
        {
            icon: <FaPlayCircle />,
            title: "Konu Anlatım Videoları",
            description: "Her seviyeye uygun, sade ve etkili videolu konu anlatımları."
        },
        {
            icon: <FaChartLine />,
            title: "Haftalık & Aylık Performans Takibi",
            description: "Zaman içindeki gelişiminizi grafiklerle takip edin, eksiklerinizi görün."
        },
        {
            icon: <FaClone />,
            title: "Flash Kart Sistemi",
            description: "Her konuyu küçük, akılda kalıcı kartlara dönüştürerek daha kolay tekrar edin."
        },
        {
            icon: <FaHeart />,
            title: "Kalp Sistemi ile Motivasyon",
            description: "Çalışmalarınıza bağlı olarak kalp kazanın, ilerlemenizi motive edici şekilde izleyin."
        },
        {
            icon: <FaQuestionCircle />,
            title: "Flash Kart Quizleri",
            description: "Hazırladığınız kartlardan otomatik quizler oluşturun ve bilginizi test edin."
        },
        {
            icon: <FaBookOpen />,
            title: "Konu Anlatımı & Özet Bilgi",
            description: "Her konu için sadeleştirilmiş, sınava uygun anlatım ve özet içerikler."
        },
        {
            icon: <FaGift />,
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
                            {feature.icon}
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
