import React, { useState } from 'react';
import styles from '../../style/adminPage/Question/Question.module.css';
import AdminLayout from './AdminLayout';
import AddTopicModal from '../../components/adminComponents/questionComponents/AddTopicModal';
import AddTestGroupModal from '../../components/adminComponents/questionComponents/AddTestGroupModal';
import AddQuestionModal from '../../components/adminComponents/questionComponents/AddQuestionModal';
import EditQuestionModal from '../../components/adminComponents/questionComponents/EditQuestionModal';

const QuestionPage = () => {
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
    const [isTestGroupModalOpen, setIsTestGroupModalOpen] = useState(false);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
    const handleUpdateQuestion = (updatedQuestion) => {
        console.log("Güncellenen Soru:", updatedQuestion);
        // API güncelleme işlemi burada yapılacak
    };

    const handleDeleteQuestion = (questionId) => {
        console.log("Silinecek Soru ID:", questionId);
        // API silme işlemi burada yapılacak
        alert(`Soru (ID: ${questionId}) başarıyla silindi!`);
    };



    const exams = ['YKS', 'ALES', 'LGS', 'KPSS'];

    const subjects = {
        YKS: ['Biyoloji', 'Kimya', 'Fizik'],
        ALES: ['Sözel', 'Sayısal'],
        LGS: ['Fen Bilimleri', 'Matematik'],
        KPSS: ['Genel Yetenek', 'Eğitim Bilimleri'],
    };

    // Örnek test grupları, backend'den çekilebilir.
    const testGroups = [
        { id: 1, name: 'Test Grubu 1' },
        { id: 2, name: 'Test Grubu 2' },
        { id: 3, name: 'Test Grubu 3' },
    ];

    const actions = ['Konu Ekle', 'Test Grubu Ekle', 'Soru Ekle', 'Soru Düzenle'];

    const handleReset = () => {
        setSelectedExam(null);
        setSelectedSubject(null);
        setSelectedAction(null);
    };

    const handleActionClick = (action) => {
        setSelectedAction(action);
        if (action === 'Konu Ekle') {
            setIsTopicModalOpen(true);
        } else if (action === 'Test Grubu Ekle') {
            setIsTestGroupModalOpen(true);
        } else if (action === 'Soru Ekle') {
            setIsQuestionModalOpen(true);
        }
        else if (action === 'Soru Düzenle') {
            setIsEditQuestionModalOpen(true);
        }
    };

    const handleAddTopic = (topicData) => {
        console.log("Eklenecek Konu Verisi:", topicData);
        // API çağrısı buraya gelecek
    };

    const handleAddTestGroup = (testGroupData) => {
        console.log("Eklenecek Test Grubu Verisi:", testGroupData);
        // API çağrısı buraya gelecek
    };

    const handleAddQuestion = (questionData) => {
        console.log("Eklenecek Soru Verisi:", questionData);
        // API çağrısı buraya gelecek
    };

    return (
        <AdminLayout>
            <div className={styles.questionPage}>
                <div className={styles.header}>
                    <p>Sınav, konu ve işlem seçerek soru ekleme/düzenleme işlemlerinizi gerçekleştirin</p>
                </div>

                <div className={styles.selectionFlow}>
                    {/* Adım 1: Sınav Seçimi */}
                    <div className={`${styles.selectionStep} ${selectedExam ? styles.completed : ''}`}>
                        <div className={styles.stepHeader}>
                            <div className={styles.stepIndicator}>1</div>
                            <h2>Sınav Türünü Seçin</h2>
                        </div>
                        <div className={styles.optionsContainer}>
                            {exams.map((exam) => (
                                <div
                                    key={exam}
                                    className={`${styles.optionCard} ${selectedExam === exam ? styles.selected : ''}`}
                                    onClick={() => {
                                        setSelectedExam(exam);
                                        setSelectedSubject(null);
                                        setSelectedAction(null);
                                    }}
                                >
                                    <div className={styles.optionIcon}>{exam.charAt(0)}</div>
                                    <div className={styles.optionLabel}>{exam}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Adım 2: Konu Seçimi */}
                    {selectedExam && (
                        <div className={`${styles.selectionStep} ${selectedSubject ? styles.completed : ''}`}>
                            <div className={styles.stepHeader}>
                                <div className={styles.stepIndicator}>2</div>
                                <h2>{selectedExam} İçin Konu Seçin</h2>
                            </div>
                            <div className={styles.optionsContainer}>
                                {subjects[selectedExam].map((subject) => (
                                    <div
                                        key={subject}
                                        className={`${styles.optionCard} ${selectedSubject === subject ? styles.selected : ''}`}
                                        onClick={() => {
                                            setSelectedSubject(subject);
                                            setSelectedAction(null);
                                        }}
                                    >
                                        <div className={styles.optionIcon}>{subject.charAt(0)}</div>
                                        <div className={styles.optionLabel}>{subject}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Adım 3: İşlem Seçimi */}
                    {selectedSubject && (
                        <div className={`${styles.selectionStep} ${selectedAction ? styles.completed : ''}`}>
                            <div className={styles.stepHeader}>
                                <div className={styles.stepIndicator}>3</div>
                                <h2>{selectedSubject} İçin İşlem Seçin</h2>
                            </div>
                            <div className={styles.optionsContainer}>
                                {actions.map((action) => (
                                    <div
                                        key={action}
                                        className={`${styles.optionCard} ${selectedAction === action ? styles.selected : ''}`}
                                        onClick={() => handleActionClick(action)}
                                    >
                                        <div className={styles.optionIcon}>
                                            {action === 'Konu Ekle' && '📚'}
                                            {action === 'Test Grubu Ekle' && '📝'}
                                            {action === 'Soru Ekle' && '✏️'}
                                        </div>
                                        <div className={styles.optionLabel}>{action}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reset Butonu */}
                    {(selectedExam || selectedSubject || selectedAction) && (
                        <div className={styles.resetContainer}>
                            <button className={styles.resetButton} onClick={handleReset}>
                                Seçimleri Sıfırla
                            </button>
                        </div>
                    )}
                </div>

                {/* Modallar */}
                <AddTopicModal
                    isOpen={isTopicModalOpen}
                    onClose={() => setIsTopicModalOpen(false)}
                    onSubmit={handleAddTopic}
                />

                <AddTestGroupModal
                    isOpen={isTestGroupModalOpen}
                    onClose={() => setIsTestGroupModalOpen(false)}
                    onSubmit={handleAddTestGroup}
                />

                <AddQuestionModal
                    isOpen={isQuestionModalOpen}
                    onClose={() => setIsQuestionModalOpen(false)}
                    onSubmit={handleAddQuestion}
                    tests={testGroups}
                />

                <EditQuestionModal
                    isOpen={isEditQuestionModalOpen}
                    onClose={() => setIsEditQuestionModalOpen(false)}
                    onSubmit={handleUpdateQuestion}
                    onDelete={handleDeleteQuestion}
                    testGroups={testGroups}
                />
            </div>
        </AdminLayout>
    );
};

export default QuestionPage;
