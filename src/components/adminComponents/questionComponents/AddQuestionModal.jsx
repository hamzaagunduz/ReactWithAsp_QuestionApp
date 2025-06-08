import React, { useState } from 'react';
// Redux için gerekli hook'u import ediyoruz
import { useDispatch } from 'react-redux';
// createFullQuestion thunk'ını import ediyoruz
import { createFullQuestion } from '../../../features/Question/QuestionSlice';
// Stil dosyasını import ediyoruz
import styles from '../../../style/adminPage/Question/AddQuestionModal.module.css';

const AddQuestionModal = ({ isOpen, onClose, onSubmit, tests }) => {
    // Redux dispatch fonksiyonunu alıyoruz
    const dispatch = useDispatch();

    // Form için state'lerimizi tanımlıyoruz
    const [questionText, setQuestionText] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [optionE, setOptionE] = useState('');
    // tests dizisi boş değilse ilk testin id'sini al, boşsa boş string
    const [testId, setTestId] = useState(tests.length > 0 ? tests[0].testID : '');
    const [answer, setAnswer] = useState('');
    const [questionImage, setQuestionImage] = useState(null);
    const [optionAImage, setOptionAImage] = useState(null);
    const [optionBImage, setOptionBImage] = useState(null);
    const [optionCImage, setOptionCImage] = useState(null);
    const [optionDImage, setOptionDImage] = useState(null);
    const [optionEImage, setOptionEImage] = useState(null);

    // Eğer modal açık değilse hiçbir şey render etme
    if (!isOpen) return null;

    // FileReader ile dosyayı base64 formatına çevirmek için yardımcı fonksiyon
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            if (!file) {
                resolve(null);  // Dosya yoksa null döndür
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    // Form gönderildiğinde tetiklenecek fonksiyon
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('QuestionText', questionText);
            formData.append('OptionA', optionA);
            formData.append('OptionB', optionB);
            formData.append('OptionC', optionC);
            formData.append('OptionD', optionD);
            formData.append('OptionE', optionE);
            formData.append('TestId', testId);
            formData.append('Answer', answer);

            if (questionImage) formData.append('QuestionImage', questionImage);
            if (optionAImage) formData.append('OptionAImage', optionAImage);
            if (optionBImage) formData.append('OptionBImage', optionBImage);
            if (optionCImage) formData.append('OptionCImage', optionCImage);
            if (optionDImage) formData.append('OptionDImage', optionDImage);
            if (optionEImage) formData.append('OptionEImage', optionEImage);

            const resultAction = await dispatch(createFullQuestion(formData));

            if (createFullQuestion.fulfilled.match(resultAction)) {
                onSubmit(); // formData dönmene gerek yok, zaten server'dan dönüş var
                onClose();
            } else {
                alert('Soru oluşturulamadı: ' + (resultAction.payload || 'Bilinmeyen hata'));
            }
        } catch (error) {
            alert('Form gönderilirken hata oluştu: ' + error.message);
        }
    };


    // Seçenek inputlarını render eden fonksiyon (text + image)
    const renderOptionInput = (label, value, setValue, image, setImage) => (
        <div className={styles.optionGroup}>
            <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>{label}</span>
                <div className={styles.optionControls}>
                    {/* Text input */}
                    <input
                        type="text"
                        placeholder={`${label} metni`}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        className={styles.optionInput}
                    />
                    {/* Resim yükleme */}
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

                {/* Soru Bilgileri */}
                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Soru Bilgileri</h3>

                    {/* Test seçimi */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Test Grubu</label>
                        <select
                            value={testId}
                            onChange={e => setTestId(e.target.value)}
                            className={styles.selectInput}
                        >
                            {tests.map(test => (
                                <option key={test.testID} value={test.testID}>
                                    {test.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Soru metni */}
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

                    {/* Soru resmi */}
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

                {/* Seçenekler */}
                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Seçenekler</h3>
                    {renderOptionInput("A", optionA, setOptionA, optionAImage, setOptionAImage)}
                    {renderOptionInput("B", optionB, setOptionB, optionBImage, setOptionBImage)}
                    {renderOptionInput("C", optionC, setOptionC, optionCImage, setOptionCImage)}
                    {renderOptionInput("D", optionD, setOptionD, optionDImage, setOptionDImage)}
                    {renderOptionInput("E", optionE, setOptionE, optionEImage, setOptionEImage)}
                </div>

                {/* Doğru cevap */}
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

                {/* Butonlar */}
                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>İptal</button>
                    <button className={styles.submitButton} onClick={handleSubmit}>Soruyu Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;
