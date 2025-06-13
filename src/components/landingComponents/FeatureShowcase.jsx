import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './FeatureShowcase.module.css';

import { FaRobot } from 'react-icons/fa';
import { RiFileList2Line } from 'react-icons/ri';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { GiArchiveResearch } from 'react-icons/gi';
import { BsStars } from 'react-icons/bs';
import { MdQuiz } from 'react-icons/md';


const FeatureShowcase = () => {
    React.useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const features = [
        {
            icon: <FaRobot size={40} />,
            title: "Yapay Zeka ile Soru Çözümü",
            description: "Zorlandığın soruları saniyeler içinde analiz eder, adım adım çözüm yolu sunar."
        },
        {
            icon: <RiFileList2Line size={40} />,
            title: "Kişisel Test Önerileri",
            description: "Çözüm geçmişini analiz ederek zayıf olduğun konulara özel tavsiyeler oluşturur."
        },
        {
            icon: <BiBarChartAlt2 size={40} />,
            title: "Gelişim Takibi",
            description: "Performans grafiklerinle ilerlemeni net bir şekilde gör ve çalışma planını optimize et."
        },
        {
            icon: <GiArchiveResearch size={40} />,
            title: "Kapsamlı Soru Bankası",
            description: "Binlerce özgün ve seviyelere göre kategorize edilmiş sorudan oluşan devasa havuz."
        },
        {
            icon: <BsStars size={40} />,
            title: "Kişisel Flash Kartlar",
            description: "Her soruyu flash karta dönüştür, önemli soruları yıldızla ve tekrar listene ekle."
        },
        {
            icon: <MdQuiz size={40} />,
            title: "Flash Kart Quizleri",
            description: "Yıldızladığın kartlardan otomatik quiz oluştur, bilgini test et ve eğlenerek öğren."
        }
    ];


    return (
        <section className={styles.featureShowcase}>
            <div className={styles.sectionHeader}>
                <h2 data-aos="fade-up">Güçlü Özellikler</h2>
                <p data-aos="fade-up" data-aos-delay="100">Dobi ile öğrenme deneyiminizi dönüştürün</p>
            </div>

            <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                    <div
                        className={styles.featureCard}
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
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

export default FeatureShowcase;
