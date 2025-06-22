import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import styles from './CompanyPage.module.css';
import { createContact } from '../../features/Contact/ContactSlice';

const ContactUs = () => {
    const dispatch = useDispatch();
    const { createStatus, createError, successMessage } = useSelector(state => state.contact);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createContact(formData));
    };

    return (
        <div className={styles.companyContainer}>
            <Helmet>
                <title>İletişim | Dobi</title>
                <meta name="description" content="Dobi ile iletişime geçin. Sorularınız, önerileriniz veya iş birliği talepleriniz için bize ulaşabilirsiniz." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.dobilim.com/iletisim" />
                <meta property="og:title" content="İletişim | Dobi" />
                <meta property="og:description" content="Her türlü sorunuz ve geri bildiriminiz için bizimle iletişime geçin." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.dobilim.com/iletisim" />
            </Helmet>

            <header className={styles.pageHeader}>
                <h1>İletişim</h1>
                <p>Sorularınız ve geri bildirimleriniz için bize ulaşın</p>
            </header>

            <section className={styles.section}>
                <div className={styles.gridLayoutContact}>
                    <div className={styles.contactInfo}>
                        <h2>İletişim Bilgileri</h2>

                        <div className={styles.contactCard}>
                            <i className="bi bi-geo-alt"></i>
                            <div>
                                <h3>Adres</h3>
                                <p>Teknokent Trabzon,<br />Üniversite, Farabi Cd.<br />No:69, 61080 Merkez/Trabzon</p>
                            </div>
                        </div>

                        <div className={styles.contactCard}>
                            <i className="bi bi-telephone"></i>
                            <div>
                                <h3>Telefon</h3>
                                <p>+90 (531) 901 50 61</p>
                            </div>
                        </div>

                        <div className={styles.contactCard}>
                            <i className="bi bi-envelope"></i>
                            <div>
                                <h3>E-posta</h3>
                                <p>beldyazilim@gmail.com</p>
                            </div>
                        </div>

                        <div className={styles.contactCard}>
                            <i className="bi bi-clock"></i>
                            <div>
                                <h3>Çalışma Saatleri</h3>
                                <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                                <p>Cumartesi - Pazar: Kapalı</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contactForm}>
                        <h2>Mesaj Gönderin</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Adınız Soyadınız</label>
                                <input type="text" id="name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">E-posta Adresiniz</label>
                                <input type="email" id="email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="subject">Konu</label>
                                <select id="subject" value={formData.subject} onChange={handleChange} required>
                                    <option value="">Konu seçiniz</option>
                                    <option value="support">Teknik Destek</option>
                                    <option value="partnership">İş Birlikleri</option>
                                    <option value="feedback">Geri Bildirim</option>
                                    <option value="other">Diğer</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Mesajınız</label>
                                <textarea id="message" rows="5" value={formData.message} onChange={handleChange} required />
                            </div>

                            {createStatus === 'loading' && <p>Gönderiliyor...</p>}
                            {successMessage && <p className={styles.success}>{successMessage}</p>}
                            {createError && <p className={styles.error}>Hata: {createError}</p>}

                            <button type="submit" className={styles.submitButton} disabled={createStatus === 'loading'}>
                                Gönder
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
