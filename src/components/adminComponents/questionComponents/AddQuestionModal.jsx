import React, { useState } from 'react';
import styles from '../../../style/adminPage/Question/AddQuestionModal.module.css';

const AddQuestionModal = ({ isOpen, onClose, onSubmit, tests }) => {
    const [questionText, setQuestionText] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [optionE, setOptionE] = useState('');
    const [testId, setTestId] = useState(tests.length > 0 ? tests[0].id : '');
    const [answer, setAnswer] = useState('');
    const [questionImage, setQuestionImage] = useState(null);
    const [optionAImage, setOptionAImage] = useState(null);
    const [optionBImage, setOptionBImage] = useState(null);
    const [optionCImage, setOptionCImage] = useState(null);
    const [optionDImage, setOptionDImage] = useState(null);
    const [optionEImage, setOptionEImage] = useState(null);

    if (!isOpen) return null;

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            if (!file) resolve(null);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    const handleSubmit = async () => {
        const questionImageBase64 = await toBase64(questionImage);
        const optionAImageBase64 = await toBase64(optionAImage);
        const optionBImageBase64 = await toBase64(optionBImage);
        const optionCImageBase64 = await toBase64(optionCImage);
        const optionDImageBase64 = await toBase64(optionDImage);
        const optionEImageBase64 = await toBase64(optionEImage);

        const questionData = {
            QuestionText: questionText,
            OptionA: optionA,
            OptionB: optionB,
            OptionC: optionC,
            OptionD: optionD,
            OptionE: optionE,
            TestId: parseInt(testId, 10),
            Answer: parseInt(answer, 10),
            QuestionImage: questionImageBase64,
            OptionAImage: optionAImageBase64,
            OptionBImage: optionBImageBase64,
            OptionCImage: optionCImageBase64,
            OptionDImage: optionDImageBase64,
            OptionEImage: optionEImageBase64,
        };

        onSubmit(questionData);
        onClose();
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
                    <h3 className={styles.sectionTitle}>Soru Bilgileri</h3>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Test</label>
                        <select
                            value={testId}
                            onChange={e => setTestId(e.target.value)}
                            className={styles.selectInput}
                        >
                            {tests.map(test => (
                                <option key={test.id} value={test.id}>
                                    {test.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Soru Metni</label>
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
                    <h3 className={styles.sectionTitle}>Doğru Cevap</h3>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Seçenek Seçin</label>
                        <select
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            className={styles.selectInput}
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

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>İptal</button>
                    <button className={styles.submitButton} onClick={handleSubmit}>Soruyu Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;