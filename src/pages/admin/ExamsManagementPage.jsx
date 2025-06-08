import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import ExamList from '../../components/adminComponents/examsComponents/ExamList';
import ExamForm from '../../components/adminComponents/examsComponents/ExamForm';
import SubjectList from '../../components/adminComponents/examsComponents/SubjectList';
import SubjectForm from '../../components/adminComponents/examsComponents/SubjectForm';
import styles from '../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const ExamsManagementPage = () => {
    const [activeTab, setActiveTab] = useState('exams');
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [view, setView] = useState('list'); // 'list', 'examForm', 'subjectForm'

    // Sınav seçimi
    const handleSelectExam = (exam) => {
        setSelectedExam(exam);
        setActiveTab('subjects');
        setView('list');
    };

    // Konu seçimi
    const handleSelectSubject = (subject) => {
        setSelectedSubject(subject);
        setView('subjectForm');
    };

    // Yeni sınav ekleme
    const handleAddExam = () => {
        setSelectedExam(null);
        setView('examForm');
    };

    // Yeni konu ekleme
    const handleAddSubject = () => {
        setSelectedSubject(null);
        setView('subjectForm');
    };

    // Listeye dönüş
    const handleBackToList = () => {
        if (view === 'examForm') {
            setActiveTab('exams');
        }
        setView('list');
    };

    return (
        <AdminLayout>
            <div className={styles.examsManagementContainer}>
                <div className={styles.header}>
                    <h1>Sınav ve Konu Yönetimi</h1>
                    <p>YKS, ALES gibi sınavları ve konularını yönetin</p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'exams' ? styles.active : ''}`}
                        onClick={() => {
                            setActiveTab('exams');
                            setView('list');
                            setSelectedExam(null);
                        }}
                    >
                        Sınavlar
                    </button>

                    {selectedExam && (
                        <button
                            className={`${styles.tabButton} ${activeTab === 'subjects' ? styles.active : ''}`}
                            onClick={() => {
                                setActiveTab('subjects');
                                setView('list');
                            }}
                        >
                            {selectedExam.name} Konuları
                        </button>
                    )}
                </div>

                <div className={styles.content}>
                    {activeTab === 'exams' && (
                        view === 'list' ? (
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
                        )
                    )}

                    {activeTab === 'subjects' && selectedExam && (
                        view === 'list' ? (
                            <SubjectList
                                exam={selectedExam}
                                onSelectSubject={handleSelectSubject}
                                onAddSubject={handleAddSubject}
                                onBack={() => setActiveTab('exams')}
                            />
                        ) : (
                            <SubjectForm
                                exam={selectedExam}
                                subject={selectedSubject}
                                onBack={handleBackToList}
                                onComplete={handleBackToList}
                            />
                        )
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ExamsManagementPage;