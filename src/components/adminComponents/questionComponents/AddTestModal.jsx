import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTest } from '../../../features/Test/TestSlice';
import styles from '../../../style/adminPage/Question/AddTestModal.module.css';

const AddTestModal = ({ isOpen, onClose, tests }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        title: '',
        description: '',
        testGruopID: null,
    });
    const topics = tests; // props olarak geldiği varsayımıyla

    // Bütün test gruplarını tek liste haline getir:
    const allTestGroups = topics.flatMap(topic => topic.testGroups || []);
    const [selectedTestID, setSelectedTestID] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e) => {
        const selectedID = parseInt(e.target.value, 10);
        setSelectedTestID(selectedID);
        setForm((prev) => ({
            ...prev,
            testGruopID: selectedID,  // burada sadece ID atamalısın, string değil
        }));
    };


    const handleSubmit = async () => {
        if (!form.title.trim() || !form.testGruopID) {
            alert("Lütfen test başlığı girin ve bir test grubu seçin.");
            return;
        }

        try {
            await dispatch(createTest(form)).unwrap(); // API çağrısı
            alert('Test başarıyla oluşturuldu!');
            onClose();
        } catch (error) {
            alert('Test oluşturulamadı: ' + error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Yeni Test Ekle</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                <div className={styles.formSection}>
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

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Test Grubu Seçimi*</label>
                        <select
                            value={form.testGroupID}
                            onChange={handleSelectChange}
                            className={styles.textInput}
                        >
                            <option value="">Bir test grubu seçin</option>
                            {allTestGroups.map((test) => (
                                <option key={test.testGroupID} value={test.testGroupID}>
                                    {test.title} - {test.description}
                                </option>
                            ))}
                        </select>
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

export default AddTestModal;
