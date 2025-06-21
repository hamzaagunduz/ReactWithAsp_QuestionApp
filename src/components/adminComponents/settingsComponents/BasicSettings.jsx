import { useState } from 'react';
import styles from '../../../style/adminPage/SiteSettings/SiteSettings.module.css';

const BasicSettings = () => {
    const [settings, setSettings] = useState({
        siteTitle: "Dobıra",
        siteDescription: "Akıllı öğrenme platformu",
        siteLogo: "/images/logo.png",
        favicon: "/images/favicon.ico",
        defaultLanguage: "tr",
        contactEmail: "info@dobira.com",
        timezone: "Europe/Istanbul"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Ayarlar başarıyla güncellendi!");
    };

    return (
        <div className={styles.settingsForm}>
            <h2>Temel Ayarlar</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Site Başlığı</label>
                    <input
                        type="text"
                        name="siteTitle"
                        value={settings.siteTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Site Açıklaması</label>
                    <textarea
                        name="siteDescription"
                        value={settings.siteDescription}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Site Logosu</label>
                        <div className={styles.imageUpload}>
                            {settings.siteLogo ? (
                                <img src={settings.siteLogo} alt="Site Logo" className={styles.logoPreview} />
                            ) : (
                                <div className={styles.uploadPlaceholder}>
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <span>Logo Yükle</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={(e) => {
                                    // Burada gerçek dosya yükleme işlemi yapılacak
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setSettings(prev => ({ ...prev, siteLogo: e.target.result }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Favicon</label>
                        <div className={styles.imageUpload}>
                            {settings.favicon ? (
                                <img src={settings.favicon} alt="Favicon" className={styles.faviconPreview} />
                            ) : (
                                <div className={styles.uploadPlaceholder}>
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <span>Favicon Yükle</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setSettings(prev => ({ ...prev, favicon: e.target.result }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Varsayılan Dil</label>
                        <select
                            name="defaultLanguage"
                            value={settings.defaultLanguage}
                            onChange={handleChange}
                        >
                            <option value="tr">Türkçe</option>
                            <option value="en">İngilizce</option>
                            <option value="de">Almanca</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Zaman Dilimi</label>
                        <select
                            name="timezone"
                            value={settings.timezone}
                            onChange={handleChange}
                        >
                            <option value="Europe/Istanbul">(GMT+3) İstanbul</option>
                            <option value="Europe/London">(GMT+1) Londra</option>
                            <option value="Europe/Berlin">(GMT+2) Berlin</option>
                            <option value="America/New_York">(GMT-4) New York</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>İletişim E-postası</label>
                    <input
                        type="email"
                        name="contactEmail"
                        value={settings.contactEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.saveButton}>Ayarları Kaydet</button>
                </div>
            </form>
        </div>
    );
};

export default BasicSettings;