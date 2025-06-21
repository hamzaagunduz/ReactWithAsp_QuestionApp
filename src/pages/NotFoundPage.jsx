import styles from '../style/NotFoundPage/NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.errorCode}>404</div>
                <h1 className={styles.title}>Sayfa Bulunamadı</h1>
                <p className={styles.message}>
                    Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
                </p>

                <div className={styles.animation}>
                    <div className={styles.planet}></div>
                    <div className={styles.ring}></div>
                    <div className={styles.rocket}>
                        <i className="bi bi-rocket-fill"></i>
                    </div>
                </div>

                <Link to="/" className={styles.homeButton}>
                    <i className="bi bi-house-door"></i> Anasayfaya Dön
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;