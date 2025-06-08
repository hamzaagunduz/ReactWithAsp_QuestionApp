import React, { useState } from 'react';
import styles from '../../../style/adminPage/SiteSettings/SiteSettings.module.css';

const SocialSettings = () => {
    const [socials, setSocials] = useState({
        facebook: "https://facebook.com/dobira",
        twitter: "https://twitter.com/dobira",
        instagram: "https://instagram.com/dobira",
        youtube: "",
        linkedin: "",
        tiktok: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSocials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Sosyal medya ayarları kaydedildi!");
    };

    return (
        <div className={styles.settingsForm}>
            <h2>Sosyal Medya Bağlantıları</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>
                        <i className="fab fa-facebook"></i> Facebook
                    </label>
                    <input
                        type="url"
                        name="facebook"
                        value={socials.facebook}
                        onChange={handleChange}
                        placeholder="https://facebook.com/kullanici"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>
                        <i className="fab fa-twitter"></i> Twitter
                    </label>
                    <input
                        type="url"
                        name="twitter"
                        value={socials.twitter}
                        onChange={handleChange}
                        placeholder="https://twitter.com/kullanici"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>
                        <i className="fab fa-instagram"></i> Instagram
                    </label>
                    <input
                        type="url"
                        name="instagram"
                        value={socials.instagram}
                        onChange={handleChange}
                        placeholder="https://instagram.com/kullanici"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>
                        <i className="fab fa-youtube"></i> YouTube
                    </label>
                    <input
                        type="url"
                        name="youtube"
                        value={socials.youtube}
                        onChange={handleChange}
                        placeholder="https://youtube.com/kullanici"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>
                        <i className="fab fa-linkedin"></i> LinkedIn
                    </label>
                    <input
                        type="url"
                        name="linkedin"
                        value={socials.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/company/kullanici"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>
                        <i className="fab fa-tiktok"></i> TikTok
                    </label>
                    <input
                        type="url"
                        name="tiktok"
                        value={socials.tiktok}
                        onChange={handleChange}
                        placeholder="https://tiktok.com/@kullanici"
                    />
                </div>

                <div className={styles.formActions}>
                    <button type="submit" className={styles.saveButton}>Kaydet</button>
                </div>
            </form>
        </div>
    );
};

export default SocialSettings;