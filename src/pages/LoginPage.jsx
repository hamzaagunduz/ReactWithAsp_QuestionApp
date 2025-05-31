import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isLoggedIn } from '../app/authService.jsx';
import '../style/LoginRegister/LoginPage.css';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Eğer kullanıcı zaten giriş yaptıysa direkt yönlendir
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userName, password);
            setMessage('✅ Giriş başarılı, yönlendiriliyorsunuz...');
            setTimeout(() => {
                navigate('/');
            }, 1000); // 1 saniye bekleyip yönlendir
        } catch (error) {
            setMessage('❌ Giriş başarısız. Bilgileri kontrol edin.');
        }
    };

    return (
        <div className='login-body'>
            <div className="login-container">
                <h2 className="login-title">Giriş Yap</h2>
                <p className="login-subtitle">Hoş geldiniz 👋 <br /> Devam etmek için bilgilerinizi girin.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                    <button type="submit" className="login-button">Giriş</button>
                </form>

                {message && <p className="login-message">{message}</p>}

                <div className="login-links">
                    <a href="#" className="login-link">🔐 Şifreni mi unuttun?</a>
                    <a href="/register" className="login-link">📝 Hesabın yok mu? Kayıt ol</a>
                </div>

                <div className="social-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-google"></i>
                    <i className="fab fa-github"></i>
                </div>

                <footer className="login-footer">
                    <p>© 2025 Dobe. Tüm hakları saklıdır. | <a href="#">Gizlilik</a> • <a href="#">Şartlar</a></p>
                </footer>
            </div>
        </div>
    );
};

export default LoginPage;
