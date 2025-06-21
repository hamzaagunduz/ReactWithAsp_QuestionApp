import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileStatistics } from '../../features/Statistics/StatisticsSlice';
import { logout } from '../../app/authService';
import '../../style/profile.css';
import human from '../../assets/human.png';
import { useNavigate } from 'react-router-dom';
import foreverIcon from '../../assets/forever.png';
import { changePassword } from '../../features/AppUser/AppUserSlice';

const ProfileMidComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const MAX_CONSECUTIVE_DAYS = 60;
    const MAX_TOTAL_SCORE = 20000;

    const { data: statistics } = useSelector((state) => state.statistic.profileStats);

    useEffect(() => {
        dispatch(fetchUserProfileStatistics());
    }, [dispatch]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));

        // Hata mesajını temizle
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validatePasswords = () => {
        const newErrors = {};

        if (!passwords.current) {
            newErrors.current = 'Mevcut şifre gereklidir';
        }

        if (!passwords.new) {
            newErrors.new = 'Yeni şifre gereklidir';
        } else if (passwords.new.length < 6) {
            newErrors.new = 'Şifre en az 6 karakter olmalıdır';
        }

        if (passwords.new !== passwords.confirm) {
            newErrors.confirm = 'Şifreler eşleşmiyor';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmitPassword = async (e) => {
        e.preventDefault();

        if (validatePasswords()) {
            try {
                await dispatch(changePassword({
                    oldPassword: passwords.current,
                    newPassword: passwords.new
                })).unwrap();

                setSuccessMessage('Şifreniz başarıyla değiştirildi!');
                setTimeout(() => {
                    setShowPasswordModal(false);
                    setSuccessMessage('');
                    setPasswords({ current: '', new: '', confirm: '' });
                    setErrors({}); // Tüm hataları temizle
                }, 2000);
            } catch (err) {
                // Backend'den gelen hatayı kullan
                const errorMessage = err?.error || 'Şifre değiştirme başarısız';
                setErrors({ general: errorMessage });
            }
        }
    };


    return (
        <div className="col-12 col-md-6 position-relative">
            {/* Şifre Değiştirme Modalı */}
            {showPasswordModal && (
                <div className="password-modal-backdrop">
                    <div className="password-modal">
                        <div className="modal-header">
                            <h3>Şifre Değiştir</h3>
                            <button
                                className="close-btn"
                                onClick={() => setShowPasswordModal(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            {successMessage ? (
                                <div className="success-message">
                                    {successMessage}
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitPassword}>
                                    <div className="form-group">
                                        <label>Mevcut Şifre</label>
                                        <input
                                            type="password"
                                            name="current"
                                            value={passwords.current}
                                            onChange={handlePasswordChange}
                                            className={errors.current ? 'input-error' : ''}
                                            placeholder="Mevcut şifrenizi girin"
                                        />
                                        {errors.current && <div className="error-text">{errors.current}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Yeni Şifre</label>
                                        <input
                                            type="password"
                                            name="new"
                                            value={passwords.new}
                                            onChange={handlePasswordChange}
                                            className={errors.new ? 'input-error' : ''}
                                            placeholder="En az 6 karakter"
                                        />
                                        {errors.new && <div className="error-text">{errors.new}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Yeni Şifre (Tekrar)</label>
                                        <input
                                            type="password"
                                            name="confirm"
                                            value={passwords.confirm}
                                            onChange={handlePasswordChange}
                                            className={errors.confirm ? 'input-error' : ''}
                                            placeholder="Şifrenizi tekrar girin"
                                        />
                                        {errors.confirm && <div className="error-text">{errors.confirm}</div>}
                                    </div>
                                    {errors.general && (
                                        <div className="error-text general-error">
                                            {errors.general}
                                        </div>
                                    )}

                                    <div className="modal-actions">
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => setShowPasswordModal(false)}
                                        >
                                            İptal
                                        </button>
                                        <button
                                            type="submit"
                                            className="submit-btn"
                                        >
                                            Kaydet
                                        </button>
                                    </div>

                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="profile-container">
                {/* Profil Bilgileri */}
                <section className="profile-block profile-top">
                    <div className="block-header">Profil Bilgileri</div>
                    <div className="profile-content">
                        <div className="user-details">
                            <h5 className="user-name">{statistics?.userName}</h5>
                            <p className="user-info"> E-posta: <span>{statistics?.email} 📧</span></p>
                            <p className="user-info">
                                Can: <span>
                                    {statistics?.lives > 100 ? (
                                        <img
                                            src={foreverIcon}
                                            alt="Sonsuz"
                                            className="forever-icon"
                                        />
                                    ) : (
                                        <>{statistics?.lives}❤️</>
                                    )}
                                </span>
                            </p>
                            <p className="user-info">
                                Elmas: <span>{statistics?.diamond}💎</span>
                            </p>
                        </div>
                        <div className="profile-image">
                            <img
                                src={statistics?.imageURL || human}
                                alt="Profil Resmi"
                                className="profile-pic"
                            />
                        </div>
                    </div>
                </section>

                {/* İstatistikler */}
                <section className="profile-block">
                    <div className="block-header">İstatistikler</div>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-title">Günlük Seri:</span>
                            <span className="stat-value">{statistics?.consecutiveDays || 0}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-title">Toplam Puan:</span>
                            <span className="stat-value">{statistics?.totalScore || 0}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-title">Mevcut Lig:</span>
                            <span className="stat-value">{statistics?.league || 'Bronz'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-title">Kusursuz Testler:</span>
                            <span className="stat-value">{statistics?.perfectTestsCompleted}</span>
                        </div>
                    </div>
                </section>

                {/* Başarılar */}
                <section className="profile-block">
                    <div className="block-header">Başarılar</div>
                    <div className="achievements">
                        <div className="achievement-item">
                            <div className="progress-container">
                                <div className="profile-progress-bar">
                                    <div
                                        className="profile-progress-bar-fill"
                                        style={{
                                            width: `${Math.min(((statistics?.consecutiveDays || 0) / MAX_CONSECUTIVE_DAYS) * 100, 100)}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="achievement-info">
                                    <span className="achievement-title">İstikrarlı</span>
                                    <span className="achievement-progress">{statistics?.consecutiveDays || 0}/{MAX_CONSECUTIVE_DAYS}</span>
                                </div>
                            </div>
                        </div>

                        <div className="achievement-item">
                            <div className="progress-container">
                                <div className="profile-progress-bar">
                                    <div
                                        className="profile-progress-bar-fill"
                                        style={{
                                            width: `${Math.min(((statistics?.totalScore || 0) / MAX_TOTAL_SCORE) * 100, 100)}%`
                                        }}
                                    ></div>
                                </div>
                                <div className="achievement-info">
                                    <span className="achievement-title">Bilgili</span>
                                    <span className="achievement-progress">{statistics?.totalScore || 0}/{MAX_TOTAL_SCORE}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Butonlar */}
                <div className="profile-actions">
                    <button
                        className="action-btn edit-profile"
                        onClick={() => setShowPasswordModal(true)}
                    >
                        Şifre Değiştir
                    </button>
                    <button className="action-btn logout" onClick={handleLogout}>Çıkış Yap</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileMidComponent;