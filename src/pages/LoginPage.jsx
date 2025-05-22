import React, { useState } from 'react';
import { login } from '../app/authService.jsx';
import '../style/LoginRegister/LoginPage.css'; // 👈 CSS dosyasını ekledik

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userName, password);
            setMessage('✅ Giriş başarılı, token alındı.');
        } catch (error) {
            setMessage('❌ Giriş başarısız. Bilgileri kontrol edin.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Giriş Yap</h2>
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
        </div>
    );
};

export default LoginPage;
