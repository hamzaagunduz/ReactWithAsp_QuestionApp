import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../style/LandingPage/LandingPage.module.css';

import HeroSection from '../components/landingComponents/HeroSection';
import FeatureShowcase from '../components/landingComponents/FeatureShowcase';
import SmartLearningSection from '../components/landingComponents/SmartLearningSection';
import StatsSection from '../components/landingComponents/StatsSection';
import TestimonialsSection from '../components/landingComponents/TestimonialsSection';
import FeaturesGrid from '../components/landingComponents/FeaturesGrid';
import FAQSection from '../components/landingComponents/FAQSection';

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic'
        });

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={styles.landing}>
            {/* Modern Navbar */}
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.navbarContainer}>
                    <div className={styles.logo}>
                        <span className={styles.dobiGreen}>Dob</span>
                        <span className={styles.dobiBlue}>ilim</span>
                    </div>


                    <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
                        <div className={styles.navItem} onClick={() => scrollToSection('hero-section')}>Ana Sayfa</div>
                        <div className={styles.navItem} onClick={() => scrollToSection('features')}>Özellikler</div>
                        <div className={styles.navItem} onClick={() => scrollToSection('smart-learning')}>Akıllı Öğrenme</div>
                        <div className={styles.navItem} onClick={() => scrollToSection('advantages')}>Avantajlar</div>
                        <div className={styles.navItem} onClick={() => scrollToSection('testimonials')}>Kullanıcı Yorumları</div>
                    </div>

                    <a href="/login" className={styles.navButton}>Giriş Yap</a>

                    <div className={styles.mobileMenuButton} onClick={toggleMenu}>
                        <div className={`${styles.menuBar} ${menuOpen ? styles.bar1 : ''}`}></div>
                        <div className={`${styles.menuBar} ${menuOpen ? styles.bar2 : ''}`}></div>
                        <div className={`${styles.menuBar} ${menuOpen ? styles.bar3 : ''}`}></div>
                    </div>
                </div>
            </nav>

            {/* Bölümler */}
            <div id="hero-section">
                <HeroSection />
            </div>

            <div id="features">
                <FeatureShowcase />
            </div>

            <div id="smart-learning">
                <SmartLearningSection />
            </div>

            <div id="stats">
                <StatsSection />
            </div>

            <div id="advantages">
                <FeaturesGrid />
            </div>

            <div id="testimonials">
                <TestimonialsSection />
            </div>
            <div id="faq">
                <FAQSection />
            </div>


            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerInfo}>
                        <div className={styles.footerLogo}>Dobi</div>
                        <p className={styles.footerDescription}>
                            Yapay zeka destekli akıllı öğrenme platformu ile başarınızı maksimize edin.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className={styles.footerColumns}>
                        <div className={styles.footerColumn}>
                            <h3>Ürün</h3>
                            <a href="#">Özellikler</a>
                            <a href="#">Fiyatlandırma</a>
                            <a href="#">Kurumsal Çözümler</a>
                            <a href="#">Güncellemeler</a>
                        </div>

                        <div className={styles.footerColumn}>
                            <h3>Kaynaklar</h3>
                            <a href="#">Blog</a>
                            <a href="#">Eğitim Merkezi</a>
                            <a href="#">Destek Merkezi</a>
                            <a href="#">Topluluk</a>
                        </div>

                        <div className={styles.footerColumn}>
                            <h3>Şirket</h3>
                            <a href="#">Hakkımızda</a>
                            <a href="#">Kariyer</a>
                            <a href="#">İletişim</a>
                            <a href="#">Ortaklıklar</a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={styles.footerCopyright}>
                        &copy; {new Date().getFullYear()} Dobi. Tüm hakları saklıdır.
                    </div>
                    <div className={styles.footerLinks}>
                        <a href="#">Gizlilik Politikası</a>
                        <a href="#">Kullanım Şartları</a>
                        <a href="#">Çerez Politikası</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;