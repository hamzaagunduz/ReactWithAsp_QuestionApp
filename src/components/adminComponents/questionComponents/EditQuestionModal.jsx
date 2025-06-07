import React, { useState, useEffect } from 'react';
import styles from '../../../style/adminPage/Question/EditQuestionModal.module.css';

const EditQuestionModal = ({
    isOpen,
    onClose,
    onSubmit,
    onDelete,
    testGroups
}) => {
    const [selectedTestGroup, setSelectedTestGroup] = useState('');
    const [selectedTest, setSelectedTest] = useState('');
    const [testsList, setTestsList] = useState([]); // testsList state eklendi
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    // Form state
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [difficulty, setDifficulty] = useState('medium');
    const [explanation, setExplanation] = useState('');

    // Mock tests data - Gerçek uygulamada API'den çekilecek
    const tests = [
        { id: 1, name: 'Test 1', testGroupId: 1 },
        { id: 2, name: 'Test 2', testGroupId: 1 },
        { id: 3, name: 'Test 3', testGroupId: 2 },
    ];

    // Mock questions data - Gerçek uygulamada API'den çekilecek
    const mockQuestions = [
        { id: 1, text: 'Hücrenin temel yapı birimleri nelerdir?', testId: 1 },
        { id: 2, text: 'Mitokondrinin görevi nedir?', testId: 1 },
        { id: 3, text: 'Fotosentez denklemi nasıldır?', testId: 2 },
    ];

    // Seçilen test grubuna göre testleri filtrele
    useEffect(() => {
        if (selectedTestGroup) {
            const filteredTests = tests.filter(test =>
                test.testGroupId === parseInt(selectedTestGroup)
            );
            setTestsList(filteredTests); // Düzeltme: testsList state'i güncellendi
            setSelectedTest('');
            setQuestions([]);
            setSelectedQuestion(null);
        }
    }, [selectedTestGroup]);

    // Seçilen teste göre soruları getir
    useEffect(() => {
        if (selectedTest) {
            const filteredQuestions = mockQuestions.filter(question =>
                question.testId === parseInt(selectedTest)
            );
            setQuestions(filteredQuestions);
            setSelectedQuestion(null);
        }
    }, [selectedTest]);

    // Seçilen soruyu forma yükle
    useEffect(() => {
        if (selectedQuestion) {
            // Gerçek uygulamada API'den detaylı soru bilgisi çekilecek
            // Burada mock veri kullanıyoruz
            setQuestionText(selectedQuestion.text);
            setOptions(['Hücre zarı', 'Mitokondri', 'Ribozom', 'Lizozom', 'Çekirdek']);
            setCorrectAnswer(1);
            setDifficulty('hard');
            setExplanation('Hücrede enerji üretiminden sorumlu organeldir.');
        }
    }, [selectedQuestion]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = () => {
        const updatedQuestion = {
            id: selectedQuestion.id,
            text: questionText,
            options,
            correctAnswer,
            difficulty,
            explanation
        };
        onSubmit(updatedQuestion);
        onClose();
    };

    const handleDelete = (questionId) => {
        onDelete(questionId);
        setSelectedQuestion(null);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Soru Düzenle</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={styles.selectionSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Test Grubu Seçin*</label>
                        <select
                            value={selectedTestGroup}
                            onChange={(e) => setSelectedTestGroup(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Test Grubu Seçin</option>
                            {testGroups.map(group => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedTestGroup && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Test Seçin*</label>
                            <select
                                value={selectedTest}
                                onChange={(e) => setSelectedTest(e.target.value)}
                                className={styles.selectInput}
                                disabled={!selectedTestGroup}
                            >
                                <option value="">Test Seçin</option>
                                {testsList.map(test => (
                                    <option key={test.id} value={test.id}>
                                        {test.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {questions.length > 0 && (
                    <div className={styles.questionsSection}>
                        <h3 className={styles.sectionTitle}>Sorular</h3>
                        <div className={styles.questionsList}>
                            {questions.map(question => (
                                <div
                                    key={question.id}
                                    className={`${styles.questionItem} ${selectedQuestion?.id === question.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedQuestion(question)}
                                >
                                    <div className={styles.questionText}>
                                        {question.text.length > 60
                                            ? `${question.text.substring(0, 60)}...`
                                            : question.text}
                                    </div>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(question.id);
                                        }}
                                    >
                                        Sil
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedQuestion && (
                    <div className={styles.editSection}>
                        <h3 className={styles.sectionTitle}>Soru Düzenle</h3>

                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Soru Metni*</label>
                            <textarea
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                className={styles.textArea}
                                rows={3}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Seçenekler*</label>
                            {options.map((option, index) => (
                                <div key={index} className={styles.optionRow}>
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        checked={correctAnswer === index}
                                        onChange={() => setCorrectAnswer(index)}
                                        className={styles.optionRadio}
                                    />
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className={styles.optionInput}
                                        placeholder={`Seçenek ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Zorluk*</label>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className={styles.selectInput}
                                >
                                    <option value="easy">Kolay</option>
                                    <option value="medium">Orta</option>
                                    <option value="hard">Zor</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>Doğru Cevap</label>
                                <div className={styles.correctAnswer}>
                                    {options[correctAnswer] || 'Seçenek belirtilmedi'}
                                </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Çözüm Açıklaması</label>
                            <textarea
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                className={styles.textArea}
                                rows={3}
                                placeholder="Soru çözümünü buraya yazın"
                            />
                        </div>
                    </div>
                )}

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        İptal
                    </button>
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={!selectedQuestion}
                    >
                        Güncelle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditQuestionModal;