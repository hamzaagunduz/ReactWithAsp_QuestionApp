import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTestGroup } from '../../../features/TestGroup/TestGroupSlice';
import styles from '../../../style/adminPage/Question/AddTestGroupModal.module.css';

const AddTestGroupModal = ({ isOpen, onClose, availableTopics = [] }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [test, setTest] = useState('');
    const [topicID, setTopicID] = useState('');

    const handleSubmit = async () => {
        const testGroupData = {
            title,
            description,
            test,
            topicID: topicID ? parseInt(topicID, 10) : null,
        };

        try {
            const resultAction = await dispatch(createTestGroup(testGroupData));

            // Reducer'daki createTestGroup.fulfilled durumunu kontrol ediyoruz
            if (createTestGroup.fulfilled.match(resultAction)) {
                alert('Test grubu başarıyla eklendi!');

                // Formu sıfırla
                setTitle('');
                setDescription('');
                setTest('');
                setTopicID('');

                // Modal'ı kapat
                onClose();
            } else if (createTestGroup.rejected.match(resultAction)) {
                // Redux'tan gelen hatayı göster
                const errorMessage = resultAction.error?.message || 'Test grubu eklenirken bir hata oluştu';
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Test Grubu Ekle</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Konu Bilgileri</h3>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Seçimi</label>
                        <select
                            value={topicID}
                            onChange={(e) => setTopicID(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Konu seçin </option>
                            {availableTopics.map((topic) => (
                                <option key={topic.topicID} value={topic.topicID}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Temel Bilgiler</h3>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Başlık*</label>
                        <input
                            type="text"
                            placeholder="Test grubu başlığı"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.textInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Açıklama</label>
                        <textarea
                            placeholder="Test grubu açıklaması (opsiyonel)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.textArea}
                        />
                    </div>

                    {/* Test alanı şu anda kullanılmıyor */}
                    {/* <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Test Alanı*</label>
                        <input
                            type="text"
                            placeholder="Test alanı bilgisi"
                            value={test}
                            onChange={(e) => setTest(e.target.value)}
                            className={styles.textInput}
                        />
                    </div> */}
                </div>

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>İptal</button>
                    <button className={styles.submitButton} onClick={handleSubmit}>Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default AddTestGroupModal;