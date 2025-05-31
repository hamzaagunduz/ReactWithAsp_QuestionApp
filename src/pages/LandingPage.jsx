import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../style/LandingPage/LandingPage.css';

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const colors = [
        '#ec4899', // Pembe
        '#3b82f6', // Mavi
        '#ef4444', // Kırmızı
        '#f472b6',
        '#60a5fa',
        '#f87171',
        '#f9a8d4',
        '#93c5fd',
        '#fca5a5',
        '#e879f9'
    ];

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % colors.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [colors.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + colors.length) % colors.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % colors.length);
    };

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
                    <div className="slider-container" style={{ position: 'relative', overflow: 'hidden', maxWidth: '100%', marginTop: '3rem' }}>
                        <div
                            className="slider-track"
                            style={{
                                display: 'flex',
                                transition: 'transform 0.7s ease-in-out',
                                transform: `translateX(-${currentIndex * (100 / colors.length)}%)`,
                                width: `${colors.length * 100}%`,
                            }}
                        >
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    style={{
                                        flex: '0 0 auto',
                                        width: `${100 / colors.length}%`,
                                        height: '300px',
                                        borderRadius: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        backgroundColor: color, // ✅ RENK BURAYA EKLENDİ
                                    }}
                                >
                                    Kart {index + 1}
                                </div>
                            ))}
                        </div>

                        {/* Slider Buttons */}
                        <button
                            onClick={prevSlide}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '10px',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '999px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                            }}
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextSlide}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '999px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                            }}
                        >
                            ›
                        </button>
                    </div>
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
                    <div className="slider-container" style={{ position: 'relative', overflow: 'hidden', maxWidth: '100%', marginTop: '3rem' }}>
                        <div
                            className="slider-track"
                            style={{
                                display: 'flex',
                                transition: 'transform 0.7s ease-in-out',
                                transform: `translateX(-${currentIndex * (100 / colors.length)}%)`,
                                width: `${colors.length * 100}%`,
                            }}
                        >
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    style={{
                                        flex: '0 0 auto',
                                        width: `${100 / colors.length}%`,
                                        height: '300px',
                                        borderRadius: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        backgroundColor: color, // ✅ RENK BURAYA EKLENDİ
                                    }}
                                >
                                    Kart {index + 1}
                                </div>
                            ))}
                        </div>

                        {/* Slider Buttons */}
                        <button
                            onClick={prevSlide}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '10px',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '999px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                            }}
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextSlide}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '999px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                            }}
                        >
                            ›
                        </button>
                    </div>
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
