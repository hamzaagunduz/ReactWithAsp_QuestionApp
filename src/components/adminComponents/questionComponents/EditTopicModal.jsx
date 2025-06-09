import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../style/adminPage/Question/EditTopicModal.module.css';
import { updateTopic } from '../../../features//Topic/TopicSlice'; // doğru importu unutma

const EditTopicModal = ({ isOpen, onClose, selectedCourseID, testTopics }) => {
    const dispatch = useDispatch();
    const [selectedTopicID, setSelectedTopicID] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        videoLink: '',
    });

    // Seçilen topic'e göre formu doldur
    useEffect(() => {
        const topic = testTopics.find(t => t.topicID === parseInt(selectedTopicID));
        if (topic) {
            setForm({
                name: topic.name || '',
                description: topic.description || '',
                videoLink: topic.videoLink || '',
            });
        }
    }, [selectedTopicID, testTopics]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !selectedCourseID || !selectedTopicID) {
            alert("Gerekli bilgiler eksik.");
            return;
        }

        const updatedTopic = {
            // topicID backend tarafından URL parametresi olarak kullanılıyor,
            // gövde olarak sadece güncellenen alanları gönderiyoruz:
            name: form.name,
            description: form.description,
            videoLink: form.videoLink,
        };

        try {
            // Güncelleme thunk'ını dispatch ediyoruz
            await dispatch(updateTopic({ topicID: parseInt(selectedTopicID), updatedData: updatedTopic })).unwrap();
            alert('Konu başarıyla güncellendi!');
            onClose();
        } catch (error) {
            alert('Konu güncellenirken hata oluştu: ' + error);
        }
    };


    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Konu Düzenle</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Seçiniz*</label>
                        <select
                            value={selectedTopicID}
                            onChange={(e) => setSelectedTopicID(e.target.value)}
                            className={styles.textInput}
                        >
                            <option value="">Bir konu seçin</option>
                            {testTopics.map((topic) => (
                                <option key={topic.topicID} value={topic.topicID}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Adı*</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Konu adını güncelleyin"
                            value={form.name}
                            onChange={handleChange}
                            className={styles.textInput}
                            disabled={!selectedTopicID}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Açıklama</label>
                        <textarea
                            name="description"
                            placeholder="Konu açıklamasını güncelleyin"
                            value={form.description}
                            onChange={handleChange}
                            className={styles.textArea}
                            disabled={!selectedTopicID}
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
                            disabled={!selectedTopicID}
                        />
                        <div className={styles.helpText}>
                            YouTube, Vimeo veya diğer platformlardan link
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>İptal</button>
                    <button className={styles.submitButton} onClick={handleSubmit} disabled={!selectedTopicID}>
                        Güncelle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTopicModal;
