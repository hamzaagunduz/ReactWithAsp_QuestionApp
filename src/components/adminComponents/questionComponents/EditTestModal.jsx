import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../style/adminPage/Question/EditTestModal.module.css';
import { updateTest } from '../../../features/Test/TestSlice';

const EditTestModal = ({ isOpen, onClose, tests }) => {
    console.log(tests)
    const dispatch = useDispatch();

    const [topics, setTopics] = useState([]);
    const [selectedTopicID, setSelectedTopicID] = useState('');
    const [selectedGroupID, setSelectedGroupID] = useState('');
    const [selectedTestID, setSelectedTestID] = useState('');
    const [form, setForm] = useState({ title: '', description: '' });

    // Başlangıçta tüm test datasını sakla
    useEffect(() => {
        if (Array.isArray(tests)) {
            setTopics(tests);
        }
    }, [tests]);

    // Test seçilince formu güncelle
    useEffect(() => {
        const selectedTest = getSelectedTest();
        if (selectedTest) {
            setForm({
                title: selectedTest.title || '',
                description: selectedTest.description || '',
            });
        } else {
            setForm({ title: '', description: '' });
        }
    }, [selectedTestID]);

    const getSelectedTest = () => {
        const topic = topics.find(t => t.topicID === parseInt(selectedTopicID));
        const group = topic?.testGroups.find(g => g.testGroupID === parseInt(selectedGroupID));
        return group?.tests.find(test => test.testID === parseInt(selectedTestID));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!selectedTestID || !form.title.trim()) {
            alert('Test başlığı boş olamaz.');
            return;
        }

        const updatedTest = {
            testID: parseInt(selectedTestID),
            title: form.title.trim(),
            description: form.description.trim(),
        };

        try {
            await dispatch(updateTest(updatedTest)).unwrap();
            alert('Test başarıyla güncellendi!');
            onClose();
        } catch (error) {
            alert('Test güncellenirken hata oluştu: ' + (error.message || error));
        }
    };

    if (!isOpen) return null;

    // Seçilen topic'e göre grupları bul
    const selectedTopic = topics.find(t => t.topicID === parseInt(selectedTopicID));
    const groups = selectedTopic?.testGroups || [];

    // Seçilen gruba göre testleri bul
    const selectedGroup = groups.find(g => g.testGroupID === parseInt(selectedGroupID));
    const testsInGroup = selectedGroup?.tests || [];

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>Testi Düzenle</h2>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Kapat">
                        ×
                    </button>
                </header>

                <section className={styles.formSection}>
                    {/* Topic Seçimi */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Seçiniz*</label>
                        <select
                            value={selectedTopicID}
                            onChange={(e) => {
                                setSelectedTopicID(e.target.value);
                                setSelectedGroupID('');
                                setSelectedTestID('');
                            }}
                            className={styles.textInput}
                        >
                            <option value="">Bir konu seçin</option>
                            {topics.map(topic => (
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
                                    setSelectedGroupID(e.target.value);
                                    setSelectedTestID('');
                                }}
                                className={styles.textInput}
                            >
                                <option value="">Bir grup seçin</option>
                                {groups.map(group => (
                                    <option key={group.testGroupID} value={group.testGroupID}>
                                        {group.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Test Seçimi */}
                    {selectedGroupID && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Test Seçiniz*</label>
                            <select
                                value={selectedTestID}
                                onChange={(e) => setSelectedTestID(e.target.value)}
                                className={styles.textInput}
                            >
                                <option value="">Bir test seçin</option>
                                {testsInGroup.map(test => (
                                    <option key={test.testID} value={test.testID}>
                                        {test.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Form Alanları */}
                    {selectedTestID && (
                        <>
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Test Başlığı*</label>
                                <input
                                    name="title"
                                    type="text"
                                    value={form.title}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                    placeholder="Test başlığını güncelleyin"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Açıklama</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className={styles.textArea}
                                    placeholder="Test açıklamasını güncelleyin"
                                />
                            </div>
                        </>
                    )}
                </section>

                <footer className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        İptal
                    </button>
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={!selectedTestID || !form.title.trim()}
                    >
                        Güncelle
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default EditTestModal;
