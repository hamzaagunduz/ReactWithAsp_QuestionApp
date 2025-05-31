import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../style/LandingPage/LandingPage.css';
import Carousel3D from '../components/landingComponents/Carousel3D';

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = [
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
            title: ""
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
            title: ""
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140063.png",
            title: ""
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140072.png",
            title: ""
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
            title: ""
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
            title: "ehe"
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140063.png",
            title: ""
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140072.png",
            title: ""
        }, {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
            title: ""
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140063.png",
            title: ""
        },
        {
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140072.png",
            title: ""
        },



    ];



    useEffect(() => {
        AOS.init({ duration: 1000 });

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className="landing">
            {/* Navbar */}
            <nav className={`navbar`}>
                <div className="navbar-container">
                    <div className="logo">Dobe</div>
                    <div className="nav-links">
                        <div className="nav-button">Özellikler</div>
                        <div className="nav-button">Kullanıcılar</div>
                        <div className="nav-button">Yenilikler</div>
                    </div>
                    <div className="nav-button">Giriş Yap</div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1 data-aos="fade-up">
                        Dobe İle Tanışın <br /> Eğitimin Yeni Yüzü
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="200">
                        Yapay zeka destekli sınav platformu ile başarıya ulaş.
                    </p>

                    {/* SLIDER */}
                    <Carousel3D items={items} />

                </div>
            </section>

            {/* İkinci Hero */}
            <section className="hero">
                <div className="container">
                    <h1 data-aos="fade-up">
                        AI Reimagined, <br /> Possibilities Amplified
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="200">
                        Crafting intelligent solutions that turn your wildest tech dreams into reality.
                    </p>
                    <a href="/register" className="cta-btn" data-aos="fade-up" data-aos-delay="400">
                        Get started ⚡
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="features">
                <div className="container">
                    <div className="feature" data-aos="fade-up">
                        <h3>Akıllı Test Sistemi</h3>
                        <p>Sana özel test önerileriyle sınava etkili hazırlan.</p>
                    </div>
                    <div className="feature" data-aos="fade-up" data-aos-delay="100">
                        <h3>Yapay Zeka ile Soru Çözümü</h3>
                        <p>Çözemediklerini anında analiz et ve öğren.</p>
                    </div>
                    <div className="feature" data-aos="fade-up" data-aos-delay="200">
                        <h3>İstatistik ve Gelişim Takibi</h3>
                        <p>Başarını ölç, zayıf noktalarını keşfet.</p>
                    </div>
                </div>
            </section>
            <section className="hero">
                <div className="container">
                    <h1 data-aos="fade-up">
                        Dobe İle Tanışın <br /> Eğitimin Yeni Yüzü
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="200">
                        Yapay zeka destekli sınav platformu ile başarıya ulaş.
                    </p>

                    {/* SLIDER */}

                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container" data-aos="zoom-in">
                    <h2>Dobe ile hemen çalışmaya başla</h2>
                    <a href="/register" className="cta large">Kayıt Ol</a>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
