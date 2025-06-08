import React from 'react';
import DiamondManagement from './DiamondManagement';
import styles from '../../../style/adminPage/UserManagement/UserManagement.module.css';

const UserProfile = ({ user }) => {
    // Kullanıcı istatistikleri
    const userStats = [
        { label: 'Çözülen Soru', value: 245, icon: '✅' },
        { label: 'Oluşturulan Flashcard', value: 78, icon: '📝' },
        { label: 'Tamamlanan Test', value: 32, icon: '📊' },
        { label: 'Başarı Rozeti', value: 8, icon: '🏆' }
    ];

    return (
        <div className={styles.userProfile}>
            <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>{user.name.charAt(0)}</div>
                <div>
                    <h2>{user.name}</h2>
                    <p className={styles.userEmail}>{user.email}</p>
                    <p className={styles.joinDate}>Üyelik Tarihi: {user.joinedDate}</p>
                </div>
            </div>

            <div className={styles.userStatus}>
                <div className={styles.statusCard}>
                    <div className={styles.statusLabel}>Hesap Durumu</div>
                    <div className={`${styles.statusValue} ${styles[user.status]}`}>
                        {user.status === 'active' ? 'Aktif Hesap' :
                            user.status === 'banned' ? 'Banlı Hesap' : 'Pasif Hesap'}
                    </div>
                </div>

                <div className={styles.statusCard}>
                    <div className={styles.statusLabel}>Üyelik Tipi</div>
                    <div className={`${styles.statusValue} ${styles[user.type]}`}>
                        {user.type === 'premium' ? 'Premium Üyelik' : 'Ücretsiz Üyelik'}
                    </div>
                </div>
            </div>

            <div className={styles.statsSection}>
                <h3>Kullanıcı İstatistikleri</h3>
                <div className={styles.statsGrid}>
                    {userStats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.diamondSection}>
                <h3>Elmas Yönetimi</h3>
                <DiamondManagement user={user} />
            </div>

            <div className={styles.actionSection}>
                <h3>Hesap İşlemleri</h3>
                <div className={styles.actionButtons}>
                    <button className={styles.banButton}>
                        {user.status === 'banned' ? 'Banı Kaldır' : 'Hesabı Banla'}
                    </button>
                    <button className={styles.premiumButton}>
                        {user.type === 'premium' ? 'Premiumu Kaldır' : 'Premium Yap'}
                    </button>
                    <button className={styles.deleteButton}>Hesabı Sil</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;