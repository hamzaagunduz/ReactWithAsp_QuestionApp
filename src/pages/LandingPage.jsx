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
import Footer from '../components/landingComponents/FooterSection';

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

            <div>
                <Footer />
            </div>

        </div>
    );
};

export default LandingPage;