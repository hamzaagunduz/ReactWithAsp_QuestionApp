import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../style/adminPage/Question/EditTopicModal.module.css';
import { updateTopic, deleteTopic } from '../../../features//Topic/TopicSlice'; // doğru importu unutma

const EditTopicModal = ({ isOpen, onClose, selectedCourseID, testTopics }) => {
    const dispatch = useDispatch();
    const [selectedTopicID, setSelectedTopicID] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        videoLink: '',
        order: 0
    });

    // Seçilen topic'e göre formu doldur
    useEffect(() => {
        const topic = testTopics.find(t => t.topicID === parseInt(selectedTopicID));
        if (topic) {
            setForm({
                name: topic.name || '',
                description: topic.description || '',
                videoLink: topic.videoLink || '',
                order: topic.order || 0 // <-- yeni eklenen alan

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
            name: form.name,
            description: form.description,
            videoLink: form.videoLink,
            order: form.order // <-- eklendi

        };

        try {
            // Güncelleme thunk'ını dispatch ediyoruz
            await dispatch(updateTopic(updatedTopic)).unwrap();
            setSelectedTopicID('');
            setForm({
                topicID: null,
                name: '',
                description: '',
                videoLink: '',
                order: '' // <-- yeni eklenen alan

            });
            alert('Konu başarıyla güncellendi!');
            onClose();
        } catch (error) {
            alert('Konu güncellenirken hata oluştu: ' + error);
        }
    };

    const handleDelete = async () => {
        if (!selectedTopicID) {
            alert("Silinecek bir konu seçiniz.");
            return;
        }

        const confirmDelete = window.confirm("Bu konuyu silmek istediğinize emin misiniz?");
        if (!confirmDelete) return;

        try {
            await dispatch(deleteTopic(parseInt(selectedTopicID))).unwrap();
            alert("Konu başarıyla silindi!");
            setSelectedTopicID('');
            onClose(); // Modalı kapat
        } catch (error) {
            alert("Konu silinirken hata oluştu: " + error);
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
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Sıra</label>
                        <input
                            type="number"
                            name="order"
                            placeholder="Örn: 1"
                            value={form.order}
                            onChange={handleChange}
                            className={styles.textInput}
                            disabled={!selectedTopicID}
                        />
                    </div>


                </div>


                <div className={styles.actions}>
                    <button className={styles.deleteButton} onClick={handleDelete} disabled={!selectedTopicID}>
                        Sil
                    </button>
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
