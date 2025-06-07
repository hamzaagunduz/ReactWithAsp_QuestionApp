import React, { useState } from 'react';
import styles from '../../../style/adminPage/Question/AddTopicModal.module.css';

const AddTopicModal = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [courseID, setCourseID] = useState('');

    const handleSubmit = () => {
        const topicData = { name, description, videoLink, courseID: parseInt(courseID, 10) };
        onSubmit(topicData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Yeni Konu Ekle</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Adı*</label>
                        <input
                            type="text"
                            placeholder="Konu adını girin"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.textInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Açıklama</label>
                        <textarea
                            placeholder="Konu açıklaması (opsiyonel)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.textArea}
                        />
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Video Linki</label>
                        <input
                            type="text"
                            placeholder="https://ornek.com/video"
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                            className={styles.textInput}
                        />
                        <div className={styles.helpText}>
                            YouTube, Vimeo veya diğer video platformlarından link
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Course ID*</label>
                        <input
                            type="number"
                            placeholder="Course ID numarası"
                            value={courseID}
                            onChange={(e) => setCourseID(e.target.value)}
                            className={styles.textInput}
                        />
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