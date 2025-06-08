import React, { useState } from 'react';
import styles from '../../../style/adminPage/profile/AdminProfile.module.css';

const SecuritySettings = () => {
    const [twoFactor, setTwoFactor] = useState(true);
    const [sessions, setSessions] = useState([
        { id: 1, device: "Windows 10, Chrome", location: "İstanbul, Türkiye", lastActive: "Şu anda aktif" },
        { id: 2, device: "MacOS, Safari", location: "Ankara, Türkiye", lastActive: "2 saat önce" },
        { id: 3, device: "Android, Chrome", location: "İzmir, Türkiye", lastActive: "1 gün önce" }
    ]);

    return (
        <div className={styles.securityCard}>
            <h2>Güvenlik Ayarları</h2>

            <div className={styles.settingsGroup}>
                <div className={styles.settingItem}>
                    <div>
                        <h3>İki Faktörlü Kimlik Doğrulama</h3>
                        <p>Hesap güvenliğiniz için ek bir koruma katmanı</p>
                    </div>
                    <div className={styles.toggleSwitch}>
                        <input
                            type="checkbox"
                            id="twoFactorToggle"
                            checked={twoFactor}
                            onChange={() => setTwoFactor(!twoFactor)}
                        />
                        <label htmlFor="twoFactorToggle"></label>
                    </div>
                </div>

                <div className={styles.settingItem}>
                    <div>
                        <h3>Şifre Değiştirme</h3>
                        <p>Son değişiklik: 3 ay önce</p>
                    </div>
                    <button className={styles.actionButton}>
                        <i className="fas fa-lock"></i> Şifreyi Değiştir
                    </button>
                </div>
            </div>

            <div className={styles.sessionsSection}>
                <h3>Aktif Oturumlar</h3>
                <div className={styles.sessionsList}>
                    {sessions.map(session => (
                        <div key={session.id} className={styles.sessionItem}>
                            <div className={styles.sessionInfo}>
                                <div className={styles.sessionDevice}>
                                    <i className="fas fa-laptop"></i>
                                    <div>
                                        <strong>{session.device}</strong>
                                        <span>{session.location}</span>
                                    </div>
                                </div>
                                <div className={styles.sessionStatus}>
                                    {session.lastActive}
                                </div>
                            </div>
                            <button
                                className={styles.logoutButton}
                                disabled={session.lastActive === "Şu anda aktif"}
                            >
                                <i className="fas fa-sign-out-alt"></i> Oturumu Sonlandır
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;