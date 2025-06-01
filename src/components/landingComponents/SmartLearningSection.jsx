import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import smart from "../../assets/landingpage/smartlearn.jpg";
import bir from "../../assets/landingpage/1.jpg";
import iki from "../../assets/landingpage/2.jpg";
import uc from "../../assets/landingpage/3.jpg";

const SmartLearningSection = () => {
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className="smart-learning-section">
            <div className="container smart-learning-container">
                <div className="smart-learning-content" data-aos="fade-right">
                    <h2>Daha Akıllı, Daha Hızlı Öğren</h2>
                    <p>
                        Dobi'nin gelişmiş algoritmaları, sana özel öğrenme yolları oluşturur.
                        Eksik konularını tespit eder ve seni en verimli şekilde sınavlara hazırlar.
                    </p>
                    <div className="learning-highlights">
                        <div className="smart-highlight" data-aos="fade-up" data-aos-delay="100">
                            <img src={bir} alt="Konu Gelişimi" />
                            <span>Konu Bazlı Gelişim</span>
                        </div>
                        <div className="smart-highlight" data-aos="fade-up" data-aos-delay="200">
                            <img src={iki} alt="Analiz" />
                            <span>Gerçek Zamanlı Analiz</span>
                        </div>
                        <div className="smart-highlight" data-aos="fade-up" data-aos-delay="300">
                            <img src={uc} alt="Tavsiye" />
                            <span>Yapay Zeka Destekli Tavsiyeler</span>
                        </div>
                    </div>
                </div>
                <div className="smart-learning-image" data-aos="fade-left">
                    <img
                        src={smart}
                        alt="Smart Learning Illustration"
                    />
                </div>
            </div>
        </section>
    );
};

export default SmartLearningSection;
