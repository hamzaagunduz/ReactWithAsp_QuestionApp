import React, { useState } from 'react';
import '../style/LoginRegister/RegisterPage.css';

const RegisterPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('❌ Şifreler eşleşmiyor.');
            return;
        }

        // Simüle edilen kayıt işlemi
        setMessage('✅ Kayıt başarılı! Giriş yapabilirsiniz.');
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <h2 className="register-title">Kayıt Ol</h2>
                <p className="register-subtitle">Yeni bir hesap oluşturun 🚀<br />Tüm özelliklerden yararlanın.</p>

                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        placeholder="Kullanıcı Adı"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="register-input"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Şifreyi Onayla"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="register-input"
                        required
                    />
                    <button type="submit" className="register-button">Kayıt Ol</button>
                </form>

                {message && <p className="register-message">{message}</p>}

                <div className="register-links">
                    <a href="#" className="register-link">🔐 Zaten hesabın var mı? Giriş yap</a>
                </div>

                <footer className="register-footer">
                    <p>© 2025 Dobe. Tüm hakları saklıdır. | <a href="#">Gizlilik</a> • <a href="#">Şartlar</a></p>
                </footer>
            </div>
        </div>
    );
};

export default RegisterPage;
