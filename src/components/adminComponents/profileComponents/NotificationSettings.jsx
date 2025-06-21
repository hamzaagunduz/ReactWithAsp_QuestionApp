import { useState } from 'react';
import styles from '../../../style/adminPage/profile/AdminProfile.module.css';

const NotificationSettings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        newUserAlert: true,
        contentApproval: true,
        systemUpdates: true,
        securityAlerts: true,
        weeklyReports: false
    });

    const handleToggle = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    return (
        <div className={styles.notificationCard}>
            <h2>Bildirim Ayarları</h2>
            <p>Hangi tür bildirimleri almak istediğinizi seçin</p>

            <div className={styles.notificationTypes}>
                <h3>Bildirim Kanalları</h3>
                <div className={styles.settingGroup}>
                    <div className={styles.settingItem}>
                        <div>
                            <h4>E-posta Bildirimleri</h4>
                            <p>Önemli güncellemeler ve raporlar</p>
                        </div>
                        <div className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={() => handleToggle('emailNotifications')}
                                id="emailToggle"
                            />
                            <label htmlFor="emailToggle"></label>
                        </div>
                    </div>

                    <div className={styles.settingItem}>
                        <div>
                            <h4>Anlık Bildirimler</h4>
                            <p>Uygulama içi anlık bildirimler</p>
                        </div>
                        <div className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={settings.pushNotifications}
                                onChange={() => handleToggle('pushNotifications')}
                                id="pushToggle"
                            />
                            <label htmlFor="pushToggle"></label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.notificationTypes}>
                <h3>Bildirim Türleri</h3>
                <div className={styles.settingGrid}>
                    <div className={styles.settingItem}>
                        <div>
                            <h4>Yeni Kullanıcı Kaydı</h4>
                            <p>Yeni kullanıcı kayıt olduğunda</p>
                        </div>
                        <div className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={settings.newUserAlert}
                                onChange={() => handleToggle('newUserAlert')}
                                id="userToggle"
                            />
                            <label htmlFor="userToggle"></label>
                        </div>
                    </div>

                    <div className={styles.settingItem}>
                        <div>
                            <h4>İçerik Onayı</h4>
                            <p>Onay bekleyen içerik olduğunda</p>
                        </div>
                        <div className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={settings.contentApproval}
                                onChange={() => handleToggle('contentApproval')}
                                id="contentToggle"
                            />
                            <label htmlFor="contentToggle"></label>
                        </div>
                    </div>

                    <div className={styles.settingItem}>
                        <div>
                            <h4>Sistem Güncellemeleri</h4>
                            <p>Sistemdeki güncellemeler hakkında</p>
                        </div>
                        <div className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={settings.systemUpdates}
                                onChange={() => handleToggle('systemUpdates')}
                                id="systemToggle"
                            />
                            <label htmlFor="systemToggle"></label>
                        </div>
                    </div>

                    <div className={styles.settingItem}>
                        <div>
                            <h4>Güvenlik Uyarıları</h4>
                            <p>Şüpheli hesap etkinlikleri</p>
                        </div>
                        <div className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={settings.securityAlerts}
                                onChange={() => handleToggle('securityAlerts')}
                                id="securityToggle"
                            />
                            <label htmlFor="securityToggle"></label>
                        </div>
                    </div>

                    <div className={styles.settingItem}>
                        <div>
                            <h4>Haftalık Raporlar</h4>
                            <p>Haftalık sistem istatistikleri</p>
                        </div>
                        <div className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={settings.weeklyReports}
                                onChange={() => handleToggle('weeklyReports')}
                                id="reportToggle"
                            />
                            <label htmlFor="reportToggle"></label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.saveSettings}>
                <button className={styles.saveButton}>
                    <i className="fas fa-save"></i> Ayarları Kaydet
                </button>
            </div>
        </div>
    );
};

export default NotificationSettings;