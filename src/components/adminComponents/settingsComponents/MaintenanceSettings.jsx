import React, { useState } from 'react';
import styles from '../../../style/adminPage/SiteSettings/SiteSettings.module.css';

const MaintenanceSettings = () => {
    const [maintenance, setMaintenance] = useState({
        enabled: false,
        title: "Yakında döneceğiz!",
        message: "Sitemiz şu anda bakım çalışmaları nedeniyle kapalıdır. Lütfen daha sonra tekrar ziyaret edin.",
        expectedDate: "2023-12-31",
        allowAdmins: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMaintenance(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Bakım modu ayarları kaydedildi!");
    };

    return (
        <div className={styles.settingsForm}>
            <h2>Bakım Modu</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="enabled"
                            checked={maintenance.enabled}
                            onChange={handleChange}
                        />
                        Bakım Modunu Etkinleştir
                    </label>
                </div>

                {maintenance.enabled && (
                    <>
                        <div className={styles.formGroup}>
                            <label>Başlık</label>
                            <input
                                type="text"
                                name="title"
                                value={maintenance.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Mesaj</label>
                            <textarea
                                name="message"
                                value={maintenance.message}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Beklenen Açılış Tarihi</label>
                                <input
                                    type="date"
                                    name="expectedDate"
                                    value={maintenance.expectedDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="allowAdmins"
                                        checked={maintenance.allowAdmins}
                                        onChange={handleChange}
                                    />
                                    Yöneticilere Erişim İzni Ver
                                </label>
                            </div>
                        </div>

                        <div className={styles.maintenancePreview}>
                            <h3>Bakım Modu Önizleme</h3>
                            <div className={styles.previewBox}>
                                <h2>{maintenance.title}</h2>
                                <p>{maintenance.message}</p>
                                {maintenance.expectedDate && (
                                    <p><strong>Planlanan Açılış:</strong> {new Date(maintenance.expectedDate).toLocaleDateString()}</p>
                                )}
                            </div>
                        </div>
                    </>
                )}

                <div className={styles.formActions}>
                    <button type="submit" className={styles.saveButton}>
                        {maintenance.enabled ? 'Bakım Modunu Etkinleştir' : 'Ayarları Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MaintenanceSettings;