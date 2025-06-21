import { useState } from 'react';
import AdminLayout from './AdminLayout';
import ExamList from '../../components/adminComponents/examsComponents/ExamList';
import ExamForm from '../../components/adminComponents/examsComponents/ExamForm';
import SubjectList from '../../components/adminComponents/examsComponents/SubjectList';
import SubjectForm from '../../components/adminComponents/examsComponents/SubjectForm';
import styles from '../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const ExamsManagementPage = () => {
    // View states: 'list', 'examForm', 'subjectList', 'subjectForm'
    const [view, setView] = useState('list');
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    // Sınav ekleme/düzenleme
    const handleAddExam = () => {
        setSelectedExam(null);
        setView('examForm');
    };

    // Sınav seçimi (düzenleme için)
    const handleSelectExam = (exam) => {
        setSelectedExam(exam);
        setView('examForm');
    };

    // Konuları görüntüleme
    const handleViewSubjects = (exam) => {
        setSelectedExam(exam);
        setView('subjectList');
    };

    // Konu ekleme
    const handleAddSubject = () => {
        setSelectedSubject(null);
        setView('subjectForm');
    };

    // Konu seçimi (düzenleme için)
    const handleSelectSubject = (subject) => {
        setSelectedSubject(subject);
        setView('subjectForm');
    };

    // Listeye dönüş
    const handleBackToList = () => {
        setView('list');
    };

    // Konu listesine dönüş
    const handleBackToSubjects = () => {
        setView('subjectList');
    };

    return (
        <AdminLayout>
            <div className={styles.examsManagementContainer}>
                <div className={styles.header}>
                    <h1>Sınav Yönetimi</h1>
                    <p>YKS, ALES gibi sınavları ve konularını yönetin</p>
                </div>

                <div className={styles.content}>
                    {view === 'list' ? (
                        <ExamList
                            onSelectExam={handleSelectExam}
                            onViewSubjects={handleViewSubjects}  // This is properly passed
                            onAddExam={handleAddExam}
                        />
                    ) : view === 'examForm' ? (
                        <ExamForm
                            exam={selectedExam}
                            onBack={handleBackToList}
                            onComplete={handleBackToList}
                        />
                    ) : view === 'subjectList' ? (
                        <SubjectList
                            exam={selectedExam}
                            onSelectSubject={handleSelectSubject}
                            onAddSubject={handleAddSubject}
                            onBack={handleBackToList}
                        />
                    ) : (
                        <SubjectForm
                            exam={selectedExam}
                            subject={selectedSubject}
                            onBack={handleBackToSubjects}
                            onComplete={handleBackToSubjects}
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ExamsManagementPage;