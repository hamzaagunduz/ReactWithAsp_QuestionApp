import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../style/LandingPage/LandingPage.css';
import FeatureShowcase from '../components/landingComponents/FeatureShowcase';
import SmartLearningSection from '../components/landingComponents/SmartLearningSection';
import HeroSection from '../components/landingComponents/HeroSection';

import atom from "../assets/landingpage/education/atom.png";
import deskLamp from "../assets/landingpage/education/desk-lamp.png";
import dictionary from "../assets/landingpage/education/dictionary.png";
import diploma from "../assets/landingpage/education/diploma.png";
import dna from "../assets/landingpage/education/dna.png";
import flask from "../assets/landingpage/education/flask.png";
import fountainPen from "../assets/landingpage/education/fountain-pen.png";
import laptop from "../assets/landingpage/education/laptop.png";
import microscope from "../assets/landingpage/education/microscope.png";
import ruler from "../assets/landingpage/education/ruler.png";


const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);

    const items = [
        { image: atom, title: "Bilimsel Temeller" },
        { image: dna, title: "Kişiselleştirilmiş Öğrenme" },
        { image: deskLamp, title: "Odaklanmış Çalışma Ortamı" },
        { image: dictionary, title: "Kelime ve Kavram Bilgisi" },
        { image: diploma, title: "Sınav Başarısı" },
        { image: dna, title: "Konu Takibi & Gelişim" },
        { image: flask, title: "Deneyimsel Öğrenme" },
        { image: fountainPen, title: "Not Alma & Hafıza Güçlendirme" },
        { image: laptop, title: "Dijital İçeriklerle Öğrenme" },
        { image: microscope, title: "Detaylı Konu Analizi" },
        { image: dna, title: "Öğrenciye Özel Tavsiyeler" },
        { image: fountainPen, title: "Verimli Çalışma Alışkanlıkları" },
        { image: ruler, title: "Ölçme ve Değerlendirme" },
    ];

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll işlemi
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing">
            {/* Navbar */}
            <nav className={`navbar`}>
                <div className="navbar-container">
                    <div className="logo">Dobe</div>
                    <div className="nav-links">
                        <div className="nav-button" onClick={() => scrollToSection('hero-section')}>Özellikler</div>
                        <div className="nav-button" onClick={() => scrollToSection('feature-showcase')}>Dobe </div>
                        <div className="nav-button" onClick={() => scrollToSection('smart-learning')}>Yenilikler</div>
                    </div>
                    <a href="/login" className="nav-button">Giriş Yap</a>
                </div>
            </nav>

            {/* Bölümler */}
            <div id="hero-section">
                <HeroSection items={items} />
            </div>
            <div id="feature-showcase">
                <FeatureShowcase />
            </div>
            <div id="smart-learning">
                <SmartLearningSection />
            </div>
        </div>
    );
};

export default LandingPage;
