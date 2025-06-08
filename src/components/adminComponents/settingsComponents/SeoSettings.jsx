import React, { useState } from 'react';
import styles from '../../../style/adminPage/SiteSettings/SiteSettings.module.css';

const SeoSettings = () => {
    const [seo, setSeo] = useState({
        metaTitle: "Dobıra - Akıllı Öğrenme Platformu",
        metaDescription: "Dobıra ile derslerinizi kolayca öğrenin, flashcard'lar oluşturun, testler çözün.",
        metaKeywords: "eğitim, öğrenme, flashcard, test, ders",
        googleAnalytics: "UA-XXXXX-Y",
        googleSiteVerification: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("SEO ayarları kaydedildi!");
    };

    return (
        <div className={styles.settingsForm}>
            <h2>SEO Ayarları</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Meta Başlık</label>
                    <input
                        type="text"
                        name="metaTitle"
                        value={seo.metaTitle}
                        onChange={handleChange}
                        maxLength="60"
                    />
                    <div className={styles.charCount}>{seo.metaTitle.length}/60 karakter</div>
                </div>

                <div className={styles.formGroup}>
                    <label>Meta Açıklama</label>
                    <textarea
                        name="metaDescription"
                        value={seo.metaDescription}
                        onChange={handleChange}
                        rows="3"
                        maxLength="160"
                    />
                    <div className={styles.charCount}>{seo.metaDescription.length}/160 karakter</div>
                </div>

                <div className={styles.formGroup}>
                    <label>Anahtar Kelimeler</label>
                    <input
                        type="text"
                        name="metaKeywords"
                        value={seo.metaKeywords}
                        onChange={handleChange}
                        placeholder="kelime1, kelime2, kelime3"
                    />
                    <div className={styles.hint}>Virgülle ayrılmış anahtar kelimeler</div>
                </div>

                <div className={styles.formGroup}>
                    <label>Google Analytics ID</label>
                    <input
                        type="text"
                        name="googleAnalytics"
                        value={seo.googleAnalytics}
                        onChange={handleChange}
                        placeholder="UA-XXXXX-Y"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Google Site Doğrulama Kodu</label>
                    <input
                        type="text"
                        name="googleSiteVerification"
                        value={seo.googleSiteVerification}
                        onChange={handleChange}
                        placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    />
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.saveButton}>SEO Ayarlarını Kaydet</button>
                </div>
            </form>
        </div>
    );
};

export default SeoSettings;