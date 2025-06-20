import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isLoggedIn } from '../app/authService.jsx';
import styles from '../style/LoginRegister/LoginPage.module.css';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/home');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userName, password);
            setMessage('✅ Giriş başarılı, yönlendiriliyorsunuz...');
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            setMessage('❌ Giriş başarısız. Bilgileri kontrol edin.');
        }
    };

    return (
        <div className={styles.loginBody}>
            <div className={styles.loginContainer}>
                <div className={styles.loginHeader}>
                    <h2 className={styles.loginTitle}>Giriş Yap</h2>
                    <p className={styles.loginSubtitle}>
                        Hoş geldiniz 👋 <br /> Devam etmek için bilgilerinizi girin.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <i className={`bi bi-person ${styles.inputIcon}`}></i>
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className={styles.loginInput}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <i className={`bi bi-lock ${styles.inputIcon}`}></i>
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.loginInput}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        <i className="bi bi-box-arrow-in-right"></i> Giriş Yap
                    </button>
                </form>

                {message && <p className={styles.loginMessage}>{message}</p>}

                <div className={styles.loginLinks}>
                    {/* <a href="#" className={styles.loginLink}>🔐 Şifreni mi unuttun?</a> */}
                    <a href="/register" className={styles.loginLink}>📝 Hesabın yok mu? Kayıt ol</a>
                </div>

                <div className={styles.divider}>
                    <span>veya</span>
                </div>

                <div className={styles.socialIcons}>
                    {/* <div className={styles.socialIcon}>
                        <i className="fab fa-facebook-f"></i>
                    </div> */}
                    <div className={styles.socialIcon}>
                        <i className="fab fa-google"></i>
                    </div>
                    {/* <div className={styles.socialIcon}>
                        <i className="fab fa-github"></i>
                    </div> */}
                </div>

                <footer className={styles.loginFooter}>
                    <p>© 2025 Dobe. Tüm hakları saklıdır. | <a href="#">Gizlilik</a> • <a href="#">Şartlar</a></p>
                </footer>
            </div>
        </div>
    );
};

export default LoginPage;