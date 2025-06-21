import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamOptions } from '../features/Exam/ExamSlice';
import { registerUser } from '../features/Register/RegisterSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../style/LoginRegister/RegisterPage.module.css';

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
            setMessage('✅ Kayıt başarılı!');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }

        if (registerState.status === 'failed') {
            if (Array.isArray(registerState.error)) {
                const onlyMessages = registerState.error.map(err => {
                    const parts = err.split(':');
                    return parts.length > 1 ? parts.slice(1).join(':').trim() : err;
                });
                setMessage(onlyMessages.join('\n'));
            }
            else {
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
        <div className={styles.registerBody}>
            <div className={styles.registerContainer}>
                <div className={styles.registerHeader}>
                    <h2 className={styles.registerTitle}>Kayıt Ol</h2>
                    {/* <p className={styles.registerSubtitle}>
                        Yeni bir hesap oluşturun 🚀<br />Tüm özelliklerden yararlanın.
                    </p> */}
                </div>

                <form onSubmit={handleRegister} className={styles.registerForm}>
                    <div className={styles.inputGroup}>
                        <i className={`bi bi-person ${styles.inputIcon}`}></i>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Kullanıcı Adı"
                            value={formData.userName}
                            onChange={handleChange}
                            className={styles.registerInput}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <i className={`bi bi-envelope ${styles.inputIcon}`}></i>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.registerInput}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <i className={`bi bi-lock ${styles.inputIcon}`}></i>
                        <input
                            type="password"
                            name="password"
                            placeholder="Şifre"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.registerInput}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <i className={`bi bi-shield-lock ${styles.inputIcon}`}></i>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Şifreyi Onayla"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={styles.registerInput}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <i className={`bi bi-journal-bookmark ${styles.inputIcon}`}></i>
                        <select
                            name="examID"
                            value={formData.examID}
                            onChange={handleChange}
                            className={styles.examSelect}
                            required
                        >
                            <option value={0} disabled>Sınav Türü Seçin</option>
                            {examState.options.map((exam) => (
                                <option key={exam.examID} value={exam.examID}>
                                    {exam.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={styles.registerButton}
                        disabled={registerState.status === 'loading'}
                    >
                        <i className="bi bi-person-plus"></i>
                        {registerState.status === 'loading' ? 'Kaydediliyor...' : 'Kayıt Ol'}
                    </button>
                </form>

                {message && (
                    <div className={styles.registerMessage}>
                        {message}
                    </div>
                )}

                <div className={styles.registerLinks}>
                    <a href="/login" className={styles.registerLink}>
                        <i className="bi bi-box-arrow-in-right"></i> Zaten hesabın var mı? Giriş yap
                    </a>
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

                <footer className={styles.registerFooter}>
                    <p>© 2025 Dobe. Tüm hakları saklıdır. | <a href="#">Gizlilik</a> • <a href="#">Şartlar</a></p>
                </footer>
            </div>
        </div>
    );
};

export default RegisterPage;