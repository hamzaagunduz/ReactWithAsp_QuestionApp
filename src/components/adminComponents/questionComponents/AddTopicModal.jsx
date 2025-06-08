import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTopic } from '../../../features/Topic/TopicSlice'; // <-- Güncel dosya yolu
import styles from '../../../style/adminPage/Question/AddTopicModal.module.css';

const AddTopicModal = ({ isOpen, onClose, selectedCourseID }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        description: '',
        videoLink: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!form.name.trim() || !selectedCourseID) {
            alert("Lütfen konu adı girin ve geçerli bir ders seçildiğinden emin olun.");
            return;
        }

        dispatch(createTopic({
            ...form,
            courseID: selectedCourseID,
        }));

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Yeni Konu Ekle</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Adı*</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Konu adını girin"
                            value={form.name}
                            onChange={handleChange}
                            className={styles.textInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Açıklama</label>
                        <textarea
                            name="description"
                            placeholder="Konu açıklaması (opsiyonel)"
                            value={form.description}
                            onChange={handleChange}
                            className={styles.textArea}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Video Linki</label>
                        <input
                            type="text"
                            name="videoLink"
                            placeholder="https://ornek.com/video"
                            value={form.videoLink}
                            onChange={handleChange}
                            className={styles.textInput}
                        />
                        <div className={styles.helpText}>
                            YouTube, Vimeo veya diğer platformlardan link
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>İptal</button>
                    <button className={styles.submitButton} onClick={handleSubmit}>Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default AddTopicModal;
