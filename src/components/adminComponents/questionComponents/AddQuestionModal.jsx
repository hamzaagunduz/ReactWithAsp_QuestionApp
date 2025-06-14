import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createFullQuestion } from '../../../features/Question/QuestionSlice';
import styles from '../../../style/adminPage/Question/AddQuestionModal.module.css';

const AddQuestionModal = ({ isOpen, onClose, onSubmit, testTopics }) => {
    const dispatch = useDispatch();

    // State for form fields
    const [questionText, setQuestionText] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [optionE, setOptionE] = useState('');
    const [answer, setAnswer] = useState('');
    const [flashCardFront, setFlashCardFront] = useState('');
    const [flashCardBack, setFlashCardBack] = useState('');
    const [questionImage, setQuestionImage] = useState(null);
    const [optionAImage, setOptionAImage] = useState(null);
    const [optionBImage, setOptionBImage] = useState(null);
    const [optionCImage, setOptionCImage] = useState(null);
    const [optionDImage, setOptionDImage] = useState(null);
    const [optionEImage, setOptionEImage] = useState(null);

    // State for hierarchical selection - HEPSİ BAŞLANGIÇTA BOŞ
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedTestGroup, setSelectedTestGroup] = useState('');
    const [selectedTest, setSelectedTest] = useState('');
    const [testGroups, setTestGroups] = useState([]);
    const [tests, setTests] = useState([]);

    // Modal açıldığında tüm formu resetle
    useEffect(() => {
        if (isOpen) {
            // Tüm form alanlarını sıfırla
            setQuestionText('');
            setOptionA('');
            setOptionB('');
            setOptionC('');
            setOptionD('');
            setOptionE('');
            setAnswer('');
            setFlashCardFront('');
            setFlashCardBack('');
            setQuestionImage(null);
            setOptionAImage(null);
            setOptionBImage(null);
            setOptionCImage(null);
            setOptionDImage(null);
            setOptionEImage(null);

            // Hiyerarşik seçimleri sıfırla
            setSelectedTopic('');
            setSelectedTestGroup('');
            setSelectedTest('');
            setTestGroups([]);
            setTests([]);
        }
    }, [isOpen]);

    // Konu değiştiğinde test gruplarını güncelle
    useEffect(() => {
        if (selectedTopic) {
            const topic = testTopics.find(t => t.topicID === parseInt(selectedTopic));
            if (topic) {
                setTestGroups(topic.testGroups || []);
            } else {
                setTestGroups([]);
            }
            // Test grubunu ve testi resetle
            setSelectedTestGroup('');
            setSelectedTest('');
            setTests([]);
        } else {
            setTestGroups([]);
        }
    }, [selectedTopic, testTopics]);

    // Test grubu değiştiğinde testleri güncelle
    useEffect(() => {
        if (selectedTestGroup) {
            const group = testGroups.find(g => g.testGroupID === parseInt(selectedTestGroup));
            if (group) {
                setTests(group.tests || []);
            } else {
                setTests([]);
            }
            // Testi resetle
            setSelectedTest('');
        } else {
            setTests([]);
        }
    }, [selectedTestGroup, testGroups]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!selectedTest) {
            alert('Lütfen bir test seçin');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('QuestionText', questionText);
            formData.append('OptionA', optionA);
            formData.append('OptionB', optionB);
            formData.append('OptionC', optionC);
            formData.append('OptionD', optionD);
            formData.append('OptionE', optionE);
            formData.append('TestId', selectedTest);
            formData.append('Answer', answer);
            formData.append('FlashCardFront', flashCardFront || '');
            formData.append('FlashCardBack', flashCardBack || '');

            if (questionImage) formData.append('QuestionImage', questionImage);
            if (optionAImage) formData.append('OptionAImage', optionAImage);
            if (optionBImage) formData.append('OptionBImage', optionBImage);
            if (optionCImage) formData.append('OptionCImage', optionCImage);
            if (optionDImage) formData.append('OptionDImage', optionDImage);
            if (optionEImage) formData.append('OptionEImage', optionEImage);

            const resultAction = await dispatch(createFullQuestion(formData));

            if (createFullQuestion.fulfilled.match(resultAction)) {
                onSubmit();
                onClose();
            } else {
                alert('Soru oluşturulamadı: ' + (resultAction.payload || 'Bilinmeyen hata'));
            }
        } catch (error) {
            alert('Form gönderilirken hata oluştu: ' + error.message);
        }
    };

    const renderOptionInput = (label, value, setValue, image, setImage) => (
        <div className={styles.optionGroup}>
            <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>{label}</span>
                <div className={styles.optionControls}>
                    <input
                        type="text"
                        placeholder={`${label} metni`}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        className={styles.optionInput}
                    />
                    <div className={styles.fileUpload}>
                        <label className={styles.fileUploadLabel}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setImage(e.target.files[0])}
                                className={styles.fileInput}
                            />
                            <span className={styles.fileUploadText}>
                                {image ? "✔ Değiştir" : "+ Resim Ekle"}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Yeni Soru Ekle</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Test Seçimi</h3>

                    {/* Topic Selection */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu*</label>
                        <select
                            value={selectedTopic}
                            onChange={e => setSelectedTopic(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Konu Seçiniz</option>
                            {testTopics.map(topic => (
                                <option key={topic.topicID} value={topic.topicID}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Test Group Selection - SADECE KONU SEÇİLDİYSE GÖSTER */}
                    {selectedTopic && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Test Grubu*</label>
                            <select
                                value={selectedTestGroup}
                                onChange={e => setSelectedTestGroup(e.target.value)}
                                className={styles.selectInput}
                                disabled={testGroups.length === 0}
                            >
                                <option value="">
                                    {testGroups.length === 0
                                        ? "Bu konuda test grubu yok"
                                        : "Test Grubu Seçiniz"}
                                </option>
                                {testGroups.map(group => (
                                    <option key={group.testGroupID} value={group.testGroupID}>
                                        {group.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Test Selection - SADECE TEST GRUBU SEÇİLDİYSE GÖSTER */}
                    {selectedTestGroup && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Test*</label>
                            <select
                                value={selectedTest}
                                onChange={e => setSelectedTest(e.target.value)}
                                className={styles.selectInput}
                                disabled={tests.length === 0}
                            >
                                <option value="">
                                    {tests.length === 0
                                        ? "Bu grupta test yok"
                                        : "Test Seçiniz"}
                                </option>
                                {tests.map(test => (
                                    <option key={test.testID} value={test.testID}>
                                        {test.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* SADECE TEST SEÇİLDİYSE SORU EKLEME BÖLÜMÜNÜ GÖSTER */}
                {selectedTest && (
                    <>
                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>Soru Bilgileri</h3>

                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Soru Metni*</label>
                                <textarea
                                    placeholder="Soru metnini buraya yazın..."
                                    value={questionText}
                                    onChange={e => setQuestionText(e.target.value)}
                                    rows={3}
                                    className={styles.textArea}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Soru Resmi</label>
                                <div className={styles.fileUpload}>
                                    <label className={styles.fileUploadLabel}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setQuestionImage(e.target.files[0])}
                                            className={styles.fileInput}
                                        />
                                        <span className={styles.fileUploadText}>
                                            {questionImage ? "✔ Dosya Seçildi" : "Dosya Seçin..."}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>Seçenekler</h3>
                            {renderOptionInput("A", optionA, setOptionA, optionAImage, setOptionAImage)}
                            {renderOptionInput("B", optionB, setOptionB, optionBImage, setOptionBImage)}
                            {renderOptionInput("C", optionC, setOptionC, optionCImage, setOptionCImage)}
                            {renderOptionInput("D", optionD, setOptionD, optionDImage, setOptionDImage)}
                            {renderOptionInput("E", optionE, setOptionE, optionEImage, setOptionEImage)}
                        </div>

                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>Doğru Cevap*</h3>
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Seçenek Seçin</label>
                                <select
                                    value={answer}
                                    onChange={e => setAnswer(e.target.value)}
                                    className={styles.selectInput}
                                    required
                                >
                                    <option value="">Doğru cevabı seçin</option>
                                    <option value="1">A</option>
                                    <option value="2">B</option>
                                    <option value="3">C</option>
                                    <option value="4">D</option>
                                    <option value="5">E</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <h3 className={styles.sectionTitle}>Flashcard Bilgileri</h3>
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>FlashCard Front</label>
                                <textarea
                                    placeholder="Flash kartın ön yüzü..."
                                    value={flashCardFront}
                                    onChange={e => setFlashCardFront(e.target.value)}
                                    rows={2}
                                    className={styles.textArea}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>FlashCard Back</label>
                                <textarea
                                    placeholder="Flash kartın arka yüzü..."
                                    value={flashCardBack}
                                    onChange={e => setFlashCardBack(e.target.value)}
                                    rows={2}
                                    className={styles.textArea}
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>İptal</button>
                    {selectedTest && (
                        <button className={styles.submitButton} onClick={handleSubmit}>Soruyu Kaydet</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;