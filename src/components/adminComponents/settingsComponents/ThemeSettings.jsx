import React, { useState } from 'react';
import styles from '../../../style/adminPage/SiteSettings/SiteSettings.module.css';

const ThemeSettings = () => {
    const [theme, setTheme] = useState({
        primaryColor: "#0ea5e9",
        secondaryColor: "#8b5cf6",
        darkMode: false,
        fontFamily: "Inter, sans-serif",
        borderRadius: "8px"
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTheme(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Tema ayarları kaydedildi!");
    };

    return (
        <div className={styles.settingsForm}>
            <h2>Tema Ayarları</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Ana Renk</label>
                        <div className={styles.colorPicker}>
                            <input
                                type="color"
                                name="primaryColor"
                                value={theme.primaryColor}
                                onChange={handleChange}
                            />
                            <span>{theme.primaryColor}</span>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>İkincil Renk</label>
                        <div className={styles.colorPicker}>
                            <input
                                type="color"
                                name="secondaryColor"
                                value={theme.secondaryColor}
                                onChange={handleChange}
                            />
                            <span>{theme.secondaryColor}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="darkMode"
                            checked={theme.darkMode}
                            onChange={handleChange}
                        />
                        Koyu Tema Modu
                    </label>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Yazı Tipi</label>
                        <select
                            name="fontFamily"
                            value={theme.fontFamily}
                            onChange={handleChange}
                        >
                            <option value="Inter, sans-serif">Inter</option>
                            <option value="'Open Sans', sans-serif">Open Sans</option>
                            <option value="Roboto, sans-serif">Roboto</option>
                            <option value="Poppins, sans-serif">Poppins</option>
                            <option value="Montserrat, sans-serif">Montserrat</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Köşe Yuvarlaklığı</label>
                        <select
                            name="borderRadius"
                            value={theme.borderRadius}
                            onChange={handleChange}
                        >
                            <option value="0px">Dik Köşe</option>
                            <option value="4px">Hafif Yuvarlak</option>
                            <option value="8px">Orta Yuvarlak</option>
                            <option value="12px">Belirgin Yuvarlak</option>
                            <option value="24px">Tam Yuvarlak</option>
                        </select>
                    </div>
                </div>

                <div className={styles.themePreview}>
                    <h3>Tema Önizleme</h3>
                    <div
                        className={styles.previewBox}
                        style={{
                            backgroundColor: theme.darkMode ? '#1e293b' : '#f8fafc',
                            color: theme.darkMode ? '#e2e8f0' : '#0f172a',
                            fontFamily: theme.fontFamily,
                            borderRadius: theme.borderRadius
                        }}
                    >
                        <div
                            className={styles.previewHeader}
                            style={{ backgroundColor: theme.primaryColor }}
                        >
                            Site Başlığı
                        </div>
                        <div className={styles.previewContent}>
                            <button
                                className={styles.previewButton}
                                style={{
                                    backgroundColor: theme.secondaryColor,
                                    borderRadius: theme.borderRadius
                                }}
                            >
                                Örnek Buton
                            </button>
                            <p>Bu bir tema önizleme metnidir. Tasarım bu şekilde görünecek.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.saveButton}>Temayı Kaydet</button>
                </div>
            </form>
        </div>
    );
};

export default ThemeSettings;