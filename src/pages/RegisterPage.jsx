import React, { useEffect, useState } from 'react';
import '../style/LoginRegister/RegisterPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamOptions } from '../features/Exam/ExamSlice';
import { registerUser } from '../features/Register/RegisterSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const examState = useSelector((state) => state.exam);
    const registerState = useSelector((state) => state.register);

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        examID: 0,
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(fetchExamOptions());
    }, [dispatch]);

    useEffect(() => {
        if (registerState.status === 'succeeded') {
            setMessage('✅ Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }

        if (registerState.status === 'failed') {
            if (Array.isArray(registerState.error)) {
                setMessage(registerState.error.join('\n'));
            } else {
                setMessage(registerState.error || '❌ Bir hata oluştu.');
            }
        }
    }, [registerState.status, registerState.error, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage('❌ Şifreler eşleşmiyor.');
            return;
        }

        const payload = {
            firstName: 'Ad',
            surName: 'Soyad',
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
            imageURL: 'string',
            examID: parseInt(formData.examID),
        };

        dispatch(registerUser(payload));
        setMessage('');
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <h2 className="register-title">Kayıt Ol</h2>
                <p className="register-subtitle">
                    Yeni bir hesap oluşturun 🚀<br />Tüm özelliklerden yararlanın.
                </p>

                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        name="userName"
                        placeholder="Kullanıcı Adı"
                        value={formData.userName}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Şifre"
                        value={formData.password}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Şifreyi Onayla"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />

                    <select
                        name="examID"
                        value={formData.examID}
                        onChange={handleChange}
                        className="register-input"
                        required
                    >
                        <option value={0} disabled>📘 Sınav Türü Seçin</option>
                        {examState.options.map((exam) => (
                            <option key={exam.examID} value={exam.examID}>
                                {exam.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="register-button" disabled={registerState.status === 'loading'}>
                        {registerState.status === 'loading' ? 'Kaydediliyor...' : 'Kayıt Ol'}
                    </button>
                </form>

                {message && (
                    <div className="register-message">
                        {message.split('\n').map((msg, idx) => (
                            <p key={idx}>{msg}</p>
                        ))}
                    </div>
                )}

                <div className="register-links">
                    <a href="/login" className="register-link">🔐 Zaten hesabın var mı? Giriş yap</a>
                </div>

                <footer className="register-footer">
                    <p>© 2025 Dobe. Tüm hakları saklıdır. | <a href="#">Gizlilik</a> • <a href="#">Şartlar</a></p>
                </footer>
            </div>
        </div>
    );
};

export default RegisterPage;
