import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './StatsSection.module.css';

const StatsSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-back'
        });
    }, []);

    return (
        <section className={styles.statsSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 data-aos="fade-up">Başarılarımız</h2>
                    <p data-aos="fade-up" data-aos-delay="100">Binlerce öğrencinin başarısına ortak olduk</p>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard} data-aos="fade-up" data-aos-delay="200">
                        <div className={styles.statIcon}><div className={styles.iconCircle}><i className="fas fa-users"></i></div></div>
                        <div className={styles.statValue}>10K+</div>
                        <div className={styles.statLabel}>Aktif Kullanıcı</div>
                    </div>

                    <div className={styles.statCard} data-aos="fade-up" data-aos-delay="300">
                        <div className={styles.statIcon}><div className={styles.iconCircle}><i className="fas fa-smile"></i></div></div>
                        <div className={styles.statValue}>%95</div>
                        <div className={styles.statLabel}>Memnuniyet Oranı</div>
                    </div>

                    <div className={styles.statCard} data-aos="fade-up" data-aos-delay="400">
                        <div className={styles.statIcon}><div className={styles.iconCircle}><i className="fas fa-book"></i></div></div>
                        <div className={styles.statValue}>4+</div>
                        <div className={styles.statLabel}>Sınav Türü</div>
                    </div>

                    <div className={styles.statCard} data-aos="fade-up" data-aos-delay="500">
                        <div className={styles.statIcon}><div className={styles.iconCircle}><i className="fas fa-lightbulb"></i></div></div>
                        <div className={styles.statValue}>5K+</div>
                        <div className={styles.statLabel}>Moden Soru</div>
                    </div>
                </div>

                <div className={styles.ctaContainer} data-aos="fade-up" data-aos-delay="600">
                    <button className={styles.ctaButton}>Hemen Katıl</button>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;