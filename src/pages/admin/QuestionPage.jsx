import React, { useState } from 'react';
import styles from '../../style/adminPage/Question/Question.module.css';
import AdminLayout from './AdminLayout';

const QuestionPage = () => {
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);

    const exams = ['YKS', 'ALES', 'LGS', 'KPSS'];

    const subjects = {
        YKS: ['Biyoloji', 'Kimya', 'Fizik'],
        ALES: ['Sözel', 'Sayısal'],
        LGS: ['Fen Bilimleri', 'Matematik'],
        KPSS: ['Genel Yetenek', 'Eğitim Bilimleri'],
    };

    const actions = ['Konu Ekle', 'Test Grubu Ekle', 'Soru Ekle'];

    const handleReset = () => {
        setSelectedExam(null);
        setSelectedSubject(null);
        setSelectedAction(null);
    };

    return (
        <AdminLayout>
            <div className={styles.questionPage}>
                <div className={styles.header}>
                    <h1>Soru Yönetimi</h1>
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
                                        onClick={() => {
                                            setSelectedAction(action);
                                            console.log(`Seçim: ${selectedExam} > ${selectedSubject} > ${action}`);
                                        }}
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
            </div>
        </AdminLayout>
    );
};

export default QuestionPage;
