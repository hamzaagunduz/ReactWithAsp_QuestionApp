import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../style/adminPage/Question/EditTestModal.module.css';
import { updateTest, deleteTest } from '../../../features/Test/TestSlice';

const EditTestModal = ({ isOpen, onClose, tests }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    const [topics, setTopics] = useState([]);
    const [selectedTopicID, setSelectedTopicID] = useState('');
    const [selectedGroupID, setSelectedGroupID] = useState('');
    const [selectedTestID, setSelectedTestID] = useState('');
    const [form, setForm] = useState({ title: '', description: '', order: '' });

    useEffect(() => {
        if (Array.isArray(tests)) {
            setTopics(tests);
        }
    }, [tests]);

    useEffect(() => {
        const selectedTest = getSelectedTest();
        if (selectedTest) {
            setForm({
                title: selectedTest.title || '',
                description: selectedTest.description || '',
                order: selectedTest.order?.toString() || '',

            });
        } else {
            setForm({ title: '', description: '' });
        }
    }, [selectedTestID]);

    // Dışarı tıklama kontrolü
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

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
            order: form.order ? Number(form.order) : null

        };

        try {
            await dispatch(updateTest(updatedTest)).unwrap();
            alert('Test başarıyla güncellendi!');
            setForm({
                testID: '',
                title: '',
                description: '',
                order: ''
            });
            setSelectedTopicID('');
            setSelectedGroupID('');
            setSelectedTestID('');
            onClose();
        } catch (error) {
            alert('Test güncellenirken hata oluştu: ' + (error.message || error));
        }
    };
    const handleDelete = async () => {
        if (!selectedTestID) return;

        const confirmDelete = window.confirm("Bu testi silmek istediğinizden emin misiniz?");
        if (!confirmDelete) return;

        try {
            await dispatch(deleteTest(parseInt(selectedTestID))).unwrap();
            alert('Test başarıyla silindi!');
            setSelectedTestID('');
            setForm({ title: '', description: '', order: '' });
            onClose();
        } catch (error) {
            alert('Test silinirken hata oluştu: ' + (error.message || error));
        }
    };


    if (!isOpen) return null;

    const selectedTopic = topics.find(t => t.topicID === parseInt(selectedTopicID));
    const groups = selectedTopic?.testGroups || [];
    const selectedGroup = groups.find(g => g.testGroupID === parseInt(selectedGroupID));
    const testsInGroup = selectedGroup?.tests || [];

    return (
        <div className={styles.modalOverlay}>
            <div ref={modalRef} className={styles.modalContent}>
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
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Sıra (Order)</label>
                                <input
                                    name="order"
                                    type="number"
                                    value={form.order}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                    placeholder="Testin sırasını girin"
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
                    <button
                        className={styles.deleteButton}
                        onClick={handleDelete}
                    >
                        Sil
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default EditTestModal;