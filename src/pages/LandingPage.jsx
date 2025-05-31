import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../style/LandingPage/LandingPage.css';

const LandingPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="landing">
            {/* Navbar */}
            <header className="navbar">
                <div className="logo">Dobe</div>
                <nav>
                    <a href="#features">Özellikler</a>
                    <a href="#screenshots">Ekranlar</a>
                    <a href="#faq">SSS</a>
                    <a href="/login">Giriş Yap</a>
                    <a href="/register" className="btn-register">Kayıt Ol</a>
                </nav>
            </header>

            {/* Hero */}
            <section className="hero">
                <div className="hero-content" data-aos="fade-right">
                    <h1><span>Dobe</span> ile Geleceğini Şekillendir</h1>
                    <p>Yapay zeka destekli sınav platformu ile başarıya ulaş.</p>
                    <a href="/register" className="cta">Hemen Başla</a>
                </div>
                <div className="hero-image" data-aos="fade-left">
                    <Swiper modules={[Autoplay, Navigation]} autoplay={{ delay: 3000 }} navigation loop>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1588072432836-e10032774350" alt="AI Learning" /></SwiperSlide>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1588072432836-e10032774350" alt="Study Education" /></SwiperSlide>
                        <SwiperSlide><img src="https://images.unsplash.com/photo-1588072432836-e10032774350" alt="Students" /></SwiperSlide>
                    </Swiper>
                </div>
            </section>

            {/* Trust */}
            <section className="trusted" data-aos="zoom-in">
                <p className="trusted-title">25.000+ öğrenci Dobe kullanıyor</p>
                <div className="logo-bar text-only">
                    <span>YKS</span>
                    <span>ALES</span>
                    <span>KPSS</span>
                    <span>AI</span>
                </div>

            </section>

            {/* Features */}
            <section className="features" id="features" data-aos="fade-up">
                <h2>Neden <span>Dobe?</span></h2>
                <div className="feature-list">
                    <div className="feature-card" data-aos="flip-left">
                        <h3>📚 Tüm Sınavlar</h3>
                        <p>YKS, ALES, KPSS ve daha fazlası tek yerde.</p>
                    </div>
                    <div className="feature-card" data-aos="flip-left" data-aos-delay="100">
                        <h3>🤖 Yapay Zeka</h3>
                        <p>Anında soru çözüm desteği ile daha hızlı öğren.</p>
                    </div>
                    <div className="feature-card" data-aos="flip-left" data-aos-delay="200">
                        <h3>🎮 Oyunlaştırma</h3>
                        <p>Rozetler, seviyeler ve rekabetçi lig sistemi.</p>
                    </div>
                    <div className="feature-card" data-aos="flip-left" data-aos-delay="300">
                        <h3>📊 Kişisel Analiz</h3>
                        <p>Gelişimini gör, zayıf yönlerini keşfet.</p>
                    </div>
                </div>
            </section>

            {/* Screenshots */}
            <section className="screenshots" id="screenshots" data-aos="fade-up">
                <h2>Platformdan Görseller</h2>
                <div className="screenshot-grid">
                    <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e" alt="screen3" />

                    <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e" alt="screen3" />

                    <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e" alt="screen2" />
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials" data-aos="fade-up">
                <h2>Öğrenciler Ne Diyor?</h2>
                <div className="testimonial-cards">
                    <div className="testimonial">
                        <p>"Dobe sayesinde KPSS'ye çok daha hazırlıklı girdim. AI çözüm özelliği mükemmel!"</p>
                        <span>- Ayşe T.</span>
                    </div>
                    <div className="testimonial">
                        <p>"Gamification sistemi beni gerçekten motive etti. Lig sistemi harika!"</p>
                        <span>- Mehmet B.</span>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq" id="faq" data-aos="fade-up">
                <h2>Sıkça Sorulan Sorular</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h4>Dobe hangi sınavları destekliyor?</h4>
                        <p>YKS, KPSS, ALES, DGS gibi birçok sınavı kapsıyoruz.</p>
                    </div>
                    <div className="faq-item">
                        <h4>Yapay zeka nasıl çalışıyor?</h4>
                        <p>Kullanıcının gönderdiği soruları anında analiz ederek çözüm sunar.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 Dobe. Tüm hakları saklıdır.</p>
                <div className="footer-links">
                    <a href="#">Gizlilik</a> | <a href="#">Kullanım Şartları</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
