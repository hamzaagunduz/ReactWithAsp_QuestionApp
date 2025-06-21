import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../style/adminPage/Question/EditTestGroupModal.module.css';
import { updateTestGroup, deleteTestGroup } from '../../../features/TestGroup/TestGroupSlice';

const EditTestGroupModal = ({ isOpen, onClose, topics }) => {
    const dispatch = useDispatch();

    const [selectedTopicID, setSelectedTopicID] = useState('');
    const [selectedGroupID, setSelectedGroupID] = useState('');
    const [form, setForm] = useState({ title: '', description: '', test: '', order: '' });
    const [groups, setGroups] = useState([]);

    // Konu seçildiğinde grupları güncelle
    useEffect(() => {
        if (!selectedTopicID) {
            setGroups([]);
            setSelectedGroupID('');
            setForm({ title: '', description: '', test: '' });
            return;
        }

        const topic = topics.find(t => t.topicID == selectedTopicID);
        if (topic && topic.testGroups) {
            setGroups(topic.testGroups);
        } else {
            setGroups([]);
        }

        setSelectedGroupID('');
        setForm({ title: '', description: '', test: '' });
    }, [selectedTopicID, topics]);

    // Grup seçildiğinde formu güncelle
    useEffect(() => {
        if (!selectedGroupID || groups.length === 0) {
            setForm({ title: '', description: '', test: '' });
            return;
        }

        const selectedGroup = groups.find(g => g.testGroupID == selectedGroupID);
        if (selectedGroup) {
            setForm({
                title: selectedGroup.title || '',
                description: selectedGroup.description || '',
                test: selectedGroup.test || '',
                order: selectedGroup.order?.toString() || '', // integer ise string'e çeviriyoruz

            });
        }
    }, [selectedGroupID, groups]);

    // Form inputları değişince state güncelle
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Submit işlemi
    const handleSubmit = async () => {
        if (!selectedGroupID) {
            alert('Lütfen bir test grubu seçin.');
            return;
        }
        if (!form.title.trim()) {
            alert('Grup başlığı boş olamaz.');
            return;
        }
        const updatedGroup = {
            testGroupID: Number(selectedGroupID),
            title: form.title.trim(),
            description: form.description.trim(),
            test: form.test.trim(),
            order: form.order ? Number(form.order) : null

        };

        try {
            await dispatch(updateTestGroup(updatedGroup)).unwrap();
            alert('Test grubu başarıyla güncellendi!');
            setSelectedTopicID();

            onClose();
        } catch (error) {
            alert('Test grubu güncellenirken hata oluştu: ' + (error.message || error));
        }
    };

    const handleDelete = async () => {
        if (!selectedGroupID) {
            alert('Lütfen silinecek bir test grubu seçin.');
            return;
        }

        const confirmDelete = window.confirm("Bu test grubunu silmek istediğinizden emin misiniz?");
        if (!confirmDelete) return;

        try {
            await dispatch(deleteTestGroup(Number(selectedGroupID))).unwrap();
            alert("Test grubu başarıyla silindi.");
            onClose();
        } catch (error) {
            alert("Silme işlemi sırasında hata oluştu: " + (error.message || error));
        }
    };


    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>Test Grubunu Düzenle</h2>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Kapat">×</button>
                </header>

                <section className={styles.formSection}>
                    {/* Konu Seçimi */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Seçimi*</label>
                        <select
                            value={selectedTopicID}
                            onChange={(e) => setSelectedTopicID(e.target.value)}
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
                            <label className={styles.inputLabel}>Test Grubu Seçimi*</label>
                            <select
                                value={selectedGroupID}
                                onChange={(e) => setSelectedGroupID(e.target.value)}
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

                    {/* Başlık, Açıklama ve Test */}
                    {selectedGroupID && (
                        <>
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Grup Başlığı*</label>
                                <input
                                    name="title"
                                    type="text"
                                    value={form.title}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                    placeholder="Grup başlığını güncelleyin"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Açıklama</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className={styles.textArea}
                                    placeholder="Grup açıklamasını güncelleyin"
                                    rows={4}
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
                                    placeholder="Grubun sırasını girin"
                                />
                            </div>


                            {/* <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Test*</label>
                                <input
                                    name="test"
                                    type="text"
                                    value={form.test}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                    placeholder="Test değerini girin"
                                />
                            </div> */}
                        </>
                    )}
                </section>

                <footer className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>İptal</button>
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={!selectedGroupID || !form.title.trim()}
                    >
                        Güncelle
                    </button>
                    <button
                        className={styles.deleteButton}
                        onClick={handleDelete}
                        disabled={!selectedGroupID}
                    >
                        Sil
                    </button>

                </footer>
            </div>
        </div>
    );
};

export default EditTestGroupModal;
