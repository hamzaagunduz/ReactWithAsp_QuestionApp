import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import ExamList from '../../components/adminComponents/examsComponents/ExamList';
import ExamForm from '../../components/adminComponents/examsComponents/ExamForm';
import styles from '../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const ExamsManagementPage = () => {
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [selectedExam, setSelectedExam] = useState(null);

    // Yeni sınav ekleme
    const handleAddExam = () => {
        setSelectedExam(null);
        setView('form');
    };

    // Sınav seçimi (düzenleme için)
    const handleSelectExam = (exam) => {
        setSelectedExam(exam);
        setView('form');
    };

    // Listeye dönüş
    const handleBackToList = () => {
        setView('list');
    };

    return (
        <AdminLayout>
            <div className={styles.examsManagementContainer}>
                <div className={styles.header}>
                    <h1>Sınav Yönetimi</h1>
                    <p>YKS, ALES gibi sınavları yönetin</p>
                </div>

                <div className={styles.content}>
                    {view === 'list' ? (
                        <ExamList
                            onSelectExam={handleSelectExam}
                            onAddExam={handleAddExam}
                        />
                    ) : (
                        <ExamForm
                            exam={selectedExam}
                            onBack={handleBackToList}
                            onComplete={handleBackToList}
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ExamsManagementPage;