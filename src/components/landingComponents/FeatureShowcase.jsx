import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import bir from "../../assets/landingpage/1.jpg";
import iki from "../../assets/landingpage/2.jpg";
import uc from "../../assets/landingpage/3.jpg";

const FeatureShowcase = () => {
    React.useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const features = [
        {
            title: "Yapay Zeka ile Soru Çözümü",
            description: "Zorlandığın ya da çözemediğin soruları saniyeler içinde analiz eder. Yanlış yaptığın noktayı tespit eder, adım adım çözüm yolu sunar ve eksik kavramlarını tamamlamana yardımcı olur. Tıpkı birebir özel ders gibi, ama 7/24 ulaşılabilir bir asistanla!",
            image: bir,
            reverse: false
        },
        {
            title: "Kişisel Test Önerileri",
            description: "Sistem, çözüm geçmişini analiz ederek hangi konularda zayıf olduğunu tespit eder ve sana özel testler oluşturur. Böylece rastgele değil, hedefe yönelik çalışırsın. Tam olarak ihtiyacın olan konulara odaklanır, zaman kaybetmeden gelişirsin.",
            image: iki,
            reverse: true
        },
        {
            title: "Gelişim ve İstatistik Takibi",
            description: "Çalışmalarını sadece hislerine göre değil, veriye dayalı olarak takip et. Günlük, haftalık ve aylık performans grafiklerinle ilerlemeni net bir şekilde gör. Hangi konularda ilerlediğini, nerede takıldığını fark et ve çalışma planını buna göre optimize et.",
            image: uc,
            reverse: false
        },
        {
            title: "Kapsamlı Soru Bankası",
            description: "Binlerce özgün ve seviyelere göre kategorize edilmiş sorudan oluşan devasa bir havuz seni bekliyor. Konu bazlı filtreleme ile tam olarak ihtiyacın olan soruları çöz, farklı soru tarzlarını görerek sınava her açıdan hazırlan.",
            image: bir,
            reverse: true
        }
    ];


    return (
        <section className="feature-showcase-section">
            {features.map((feature, index) => (
                <div
                    className={`feature-showcase ${feature.reverse ? 'reverse' : ''}`}
                    key={index}
                    data-aos="fade-up"
                >
                    <div className="feature-text">
                        <h2>{feature.title}</h2>
                        <p>{feature.description}</p>
                    </div>
                    <div className="feature-image">
                        <img src={feature.image} alt={feature.title} />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default FeatureShowcase;
