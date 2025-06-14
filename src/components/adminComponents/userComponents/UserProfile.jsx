import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserBan } from '../../../features/AppUser/AppUserSlice';
import styles from '../../../style/adminPage/UserManagement/UserManagement.module.css';

const UserProfile = ({ user, onClose }) => {
    const dispatch = useDispatch();
    const banState = useSelector(state => state.appUser.banOperation);

    if (!user) {
        return (
            <div className={styles.userProfile}>
                <div className={styles.loadingContainer}>
                    <p>Kullanıcı bilgileri yükleniyor...</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Yok';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const fullName = `${user.firstName || ''} ${user.surName || ''}`.trim();

    const testStats = [
        { label: 'Toplam Puan', value: user.totalScore || 0, icon: '🏆' },
        { label: 'Tamamlanan Test', value: user.totalTestsCompleted || 0, icon: '📝' },
        { label: 'Mükemmel Test', value: user.perfectTestsCompleted || 0, icon: '⭐' },
        { label: 'Ortalama Skor', value: user.averageScore ? `${user.averageScore}%` : '0%', icon: '📊' }
    ];

    const streakStats = [
        { label: 'Günlük Seri', value: user.consecutiveDays || 0, icon: '🔥' },
        { label: 'Geçici Seri', value: user.consecutiveDaysTemp || 0, icon: '⏱️' },
        { label: 'Son Test Tarihi', value: formatDate(user.lastTestDate), icon: '📅' },
        { label: 'Lig', value: user.league || 'Bronze', icon: '🏅' }
    ];

    const handleBanToggle = () => {
        dispatch(toggleUserBan({
            userId: user.userId,
            banStatus: !user.ban
        }));
    };

    return (
        <div className={styles.userProfile}>
            <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                    {fullName ? fullName.charAt(0) : '?'}
                </div>
                <div>
                    <h2>{fullName || 'İsimsiz Kullanıcı'}</h2>
                    <p className={styles.userEmail}>{user.email || 'Email yok'}</p>
                    {user.lastLifeAddedTime && (
                        <p className={styles.joinDate}>
                            Kayıt Tarihi: {formatDate(user.lastLifeAddedTime)}
                        </p>
                    )}
                </div>
            </div>

            <div className={styles.userStatus}>
                <div className={styles.statusCard}>
                    <div className={styles.statusLabel}>Hesap Durumu</div>
                    <div className={`${styles.statusValue} ${user.ban ? styles.banned : styles.active}`}>
                        {user.ban ? 'Banlı Hesap' : 'Aktif Hesap'}
                    </div>
                </div>

                <div className={styles.statusCard}>
                    <div className={styles.statusLabel}>Elmas Miktarı</div>
                    <div className={styles.diamondValue}>
                        💎 {user.diamond || 0}
                    </div>
                </div>

                <div className={styles.statusCard}>
                    <div className={styles.statusLabel}>Lig</div>
                    <div className={`${styles.statusValue} ${styles.league} ${styles[user.league?.toLowerCase() || 'bronze']}`}>
                        {user.league || 'Bronze'}
                    </div>
                </div>
            </div>

            <div className={styles.statsSection}>
                <h3>Test İstatistikleri</h3>
                <div className={styles.statsGrid}>
                    {testStats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.statsSection}>
                <h3>Seri ve Aktivite</h3>
                <div className={styles.statsGrid}>
                    {streakStats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.actionSection}>
                <h3>Hesap İşlemleri</h3>
                <div className={styles.actionButtons}>
                    <button
                        className={styles.banButton}
                        onClick={handleBanToggle}
                        disabled={banState.status === 'loading'}
                    >
                        {banState.status === 'loading'
                            ? 'İşleniyor...'
                            : (user.ban ? 'Banı Kaldır' : 'Hesabı Banla')
                        }
                    </button>
                    <button
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        Kapat
                    </button>
                </div>

                {banState.error && (
                    <div className={styles.errorMessage}>
                        Hata: {banState.error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;