import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTest } from '../../../features/Test/TestSlice';
import styles from '../../../style/adminPage/Question/AddTestModal.module.css';

const AddTestModal = ({ isOpen, onClose, tests }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: '',
        description: '',
        testGruopID: null,
    });

    const [selectedTopicID, setSelectedTopicID] = useState('');
    const [selectedGroupID, setSelectedGroupID] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.testGruopID) {
            alert("Lütfen test başlığı girin ve bir test grubu seçin.");
            return;
        }

        try {
            await dispatch(createTest(form)).unwrap();
            setSelectedTopicID('');
            setForm({
                title: '',
                description: '',
                testGruopID: null,
            });
            alert('Test başarıyla oluşturuldu!');
            onClose();
        } catch (error) {
            alert('Test oluşturulamadı: ' + error);
        }
    };

    if (!isOpen) return null;

    const selectedTopic = tests.find(t => t.topicID === parseInt(selectedTopicID));
    const groups = selectedTopic?.testGroups || [];

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Yeni Test Ekle</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                <div className={styles.formSection}>
                    {/* Konu Seçimi */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Seçiniz*</label>
                        <select
                            value={selectedTopicID}
                            onChange={(e) => {
                                setSelectedTopicID(e.target.value);
                                setSelectedGroupID('');
                                setForm(prev => ({ ...prev, testGruopID: null }));
                            }}
                            className={styles.textInput}
                        >
                            <option value="">Bir konu seçin</option>
                            {tests.map(topic => (
                                <option key={topic.topicID} value={topic.topicID}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Test Grubu Seçimi */}
                    {selectedTopicID && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Test Grubu Seçiniz*</label>
                            <select
                                value={selectedGroupID}
                                onChange={(e) => {
                                    const groupID = parseInt(e.target.value);
                                    setSelectedGroupID(groupID);
                                    setForm(prev => ({ ...prev, testGruopID: groupID }));
                                }}
                                className={styles.textInput}
                            >
                                <option value="">Bir test grubu seçin</option>
                                {groups.map(group => (
                                    <option key={group.testGroupID} value={group.testGroupID}>
                                        {group.title} - {group.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Test Bilgileri - SADECE test grubu seçildiğinde göster */}
                    {selectedGroupID && (
                        <>
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Test Başlığı*</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Test başlığını girin"
                                    value={form.title}
                                    onChange={handleInputChange}
                                    className={styles.textInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Açıklama</label>
                                <textarea
                                    name="description"
                                    placeholder="Test açıklaması (opsiyonel)"
                                    value={form.description}
                                    onChange={handleInputChange}
                                    className={styles.textArea}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>İptal</button>
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={!form.title.trim() || !form.testGruopID}
                    >
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTestModal;