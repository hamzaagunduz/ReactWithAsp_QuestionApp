import styles from './FooterSection.module.css';
import { Link } from 'react-router-dom'; // React Router kullanılıyorsa
const FooterSection = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerInfo}>
                    <div className={styles.footerLogo}>Dobi</div>
                    <p className={styles.footerDescription}>
                        Yapay zeka destekli akıllı öğrenme platformu ile başarınızı maksimize
                        edin.
                    </p>
                    <div className={styles.socialLinks}>
                        <a
                            href="https://www.instagram.com/dobilim"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>

                        <a
                            href="https://www.twitter.com/dobilim"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>

                        <a
                            href="https://www.linkedin.com/company/dobilim"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <i className="fab fa-linkedin"></i>
                        </a>

                        <a
                            href="https://www.youtube.com/@dobilim"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                        >
                            <i className="fab fa-youtube"></i>
                        </a>

                    </div>
                </div>

                <div className={styles.footerColumns}>
                    {/* <div className={styles.footerColumn}>
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
                    </div> */}

                    <div className={styles.footerColumn}>
                        <h3>Şirket</h3>
                        <a href="/hakkimizda">Hakkımızda</a>
                        <a href="/kariyer">Kariyer</a>
                        <a href="/iletisim">İletişim</a>
                        <a href="/ortakliklar">Ortaklıklar</a>
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div className={styles.footerCopyright}>
                    &copy; {new Date().getFullYear()} Dobi. Tüm hakları saklıdır.
                </div>
                <div className={styles.footerLinks}>
                    <Link to="/privacy-policy">Gizlilik Politikası</Link>
                    <Link to="/terms-of-use">Kullanım Şartları</Link>
                    <Link to="/cookie-policy">Çerez Politikası</Link>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;