import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamOptions } from '../../features/Exam/ExamSlice';
import { fetchCoursesByExamId } from '../../features/Courses/CoursesSlice';
import { fetchTopics, fetchTopicsWithGroupedTests } from '../../features/Topic/TopicSlice';

import AdminLayout from './AdminLayout';
import AddTopicModal from '../../components/adminComponents/questionComponents/AddTopicModal';
import AddTestGroupModal from '../../components/adminComponents/questionComponents/AddTestGroupModal';
import AddQuestionModal from '../../components/adminComponents/questionComponents/AddQuestionModal';
import EditQuestionModal from '../../components/adminComponents/questionComponents/EditQuestionModal';
import AddTestModal from '../../components/adminComponents/questionComponents/AddTestModal';
import EditTopicModal from '../../components/adminComponents/questionComponents/EditTopicModal';

import styles from '../../style/adminPage/Question/Question.module.css';

const QuestionPage = () => {
    const dispatch = useDispatch();

    const { options: exams, status: examStatus, error: examError } = useSelector((state) => state.exam);
    const { courses, status: courseStatus, error: courseError } = useSelector((state) => state.courses);
    const { topics, status: topicStatus, error: topicError } = useSelector((state) => state.topic);

    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedExamId, setSelectedExamId] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [groupedTests, setGroupedTests] = useState([]);

    const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
    const [isTestGroupModalOpen, setIsTestGroupModalOpen] = useState(false);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
    const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);
    const [isEditTopicModalOpen, setIsEditTopicModalOpen] = useState(false);

    const actions = ['Konu Ekle', 'Konu Düzenle', 'Test Grubu Ekle', 'Test Ekle', 'Soru Ekle', 'Soru Düzenle'];

    useEffect(() => {
        if (examStatus === 'idle') dispatch(fetchExamOptions());
    }, [dispatch, examStatus]);

    useEffect(() => {
        if (selectedExamId) dispatch(fetchCoursesByExamId(selectedExamId));
    }, [dispatch, selectedExamId]);

    useEffect(() => {
        const selectedCourse = courses.find((c) => c.name === selectedSubject);
        if (selectedCourse?.courseID) dispatch(fetchTopics(selectedCourse.courseID));
    }, [dispatch, selectedSubject, courses]);

    useEffect(() => {
        const selectedCourse = courses.find((c) => c.name === selectedSubject);
        if (selectedCourse?.courseID) {
            dispatch(fetchTopicsWithGroupedTests(selectedCourse.courseID))
                .unwrap()
                .then((data) => setGroupedTests(data))
                .catch((error) => console.error("Hata:", error));
        }
    }, [dispatch, selectedSubject, courses]);


    const selectedCourseID = courses.find((c) => c.name === selectedSubject)?.courseID || null;

    const testsForSelectedCourse = topics
        .filter((t) => t.tests && t.tests.length > 0)
        .flatMap((t) => t.tests);

    const handleActionClick = (action) => {
        setSelectedAction(action);
        if (action === 'Konu Ekle') setIsTopicModalOpen(true);
        else if (action === 'Test Grubu Ekle') setIsTestGroupModalOpen(true);
        else if (action === 'Soru Ekle') setIsQuestionModalOpen(true);
        else if (action === 'Soru Düzenle') setIsEditQuestionModalOpen(true);
        else if (action === 'Test Ekle') setIsAddTestModalOpen(true);
        else if (action === 'Konu Düzenle') setIsEditTopicModalOpen(true);

    };

    const handleReset = () => {
        setSelectedExam(null);
        setSelectedExamId(null);
        setSelectedSubject(null);
        setSelectedAction(null);
    };

    const handleAddTopic = (data) => console.log("Eklenecek Konu:", data);
    const handleAddTestGroup = (data) => console.log("Eklenecek Test Grubu:", data);
    const handleAddQuestion = (data) => console.log("Eklenecek Soru:", data);
    const handleUpdateQuestion = (data) => console.log("Güncellenen Soru:", data);
    const handleDeleteQuestion = (id) => {
        console.log("Silinecek Soru ID:", id);
        alert(`Soru (ID: ${id}) silindi!`);
    };

    return (
        <AdminLayout>
            <div className={styles.questionPage}>
                <div className={styles.header}>
                    <p>Sınav, konu ve işlem seçerek soru yönetimini gerçekleştirin</p>
                </div>

                {/* Adım 1 - Sınav Seçimi */}
                <div className={`${styles.selectionStep} ${selectedExam ? styles.completed : ''}`}>
                    <div className={styles.stepHeader}>
                        <div className={styles.stepIndicator}>1</div>
                        <h2>Sınav Seçin</h2>
                    </div>
                    <div className={styles.optionsContainer}>
                        {examStatus === 'loading' && <p>Yükleniyor...</p>}
                        {examStatus === 'failed' && <p>Hata: {examError}</p>}
                        {examStatus === 'succeeded' && exams.map((exam) => (
                            <div
                                key={exam.id}
                                className={`${styles.optionCard} ${selectedExam === exam.name ? styles.selected : ''}`}
                                onClick={() => {
                                    setSelectedExam(exam.name);
                                    setSelectedExamId(exam.examID);
                                    setSelectedSubject(null);
                                    setSelectedAction(null);
                                }}
                            >
                                <div className={styles.optionIcon}>{exam.name[0]}</div>
                                <div className={styles.optionLabel}>{exam.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Adım 2 - Ders Seçimi */}
                {selectedExam && (
                    <div className={`${styles.selectionStep} ${selectedSubject ? styles.completed : ''}`}>
                        <div className={styles.stepHeader}>
                            <div className={styles.stepIndicator}>2</div>
                            <h2>Ders Seçin</h2>
                        </div>
                        <div className={styles.optionsContainer}>
                            {courseStatus === 'loading' && <p>Yükleniyor...</p>}
                            {courseStatus === 'failed' && <p>Hata: {courseError}</p>}
                            {courseStatus === 'succeeded' && courses.map((course) => (
                                <div
                                    key={course.id}
                                    className={`${styles.optionCard} ${selectedSubject === course.name ? styles.selected : ''}`}
                                    onClick={() => {
                                        setSelectedSubject(course.name);
                                        setSelectedAction(null);
                                    }}
                                >
                                    <div className={styles.optionIcon}>{course.name[0]}</div>
                                    <div className={styles.optionLabel}>{course.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Adım 3 - İşlem Seçimi */}
                {selectedSubject && (
                    <div className={`${styles.selectionStep} ${selectedAction ? styles.completed : ''}`}>
                        <div className={styles.stepHeader}>
                            <div className={styles.stepIndicator}>3</div>
                            <h2>İşlem Seçin</h2>
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
                                        {action === 'Test Ekle' && '✏️'}
                                        {action === 'Soru Ekle' && '✏️'}
                                        {action === 'Soru Düzenle' && '🛠️'}
                                    </div>
                                    <div className={styles.optionLabel}>{action}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reset */}
                {(selectedExam || selectedSubject || selectedAction) && (
                    <div className={styles.resetContainer}>
                        <button className={styles.resetButton} onClick={handleReset}>Seçimleri Sıfırla</button>
                    </div>
                )}

                {/* Modallar */}
                <AddTopicModal
                    isOpen={isTopicModalOpen}
                    onClose={() => setIsTopicModalOpen(false)}
                    selectedCourseID={selectedCourseID}
                />

                <AddTestGroupModal
                    isOpen={isTestGroupModalOpen}
                    onClose={() => setIsTestGroupModalOpen(false)}
                    onSubmit={handleAddTestGroup}
                    availableTopics={topics}
                />

                <AddQuestionModal
                    isOpen={isQuestionModalOpen}
                    onClose={() => setIsQuestionModalOpen(false)}
                    onSubmit={handleAddQuestion}
                    tests={testsForSelectedCourse}
                />
                <AddTestModal
                    isOpen={isAddTestModalOpen}
                    onClose={() => setIsAddTestModalOpen(false)}
                    tests={groupedTests}
                    onSubmit={(data) => console.log("Eklenecek Test:", data)}
                />

                <EditQuestionModal
                    isOpen={isEditQuestionModalOpen}
                    onClose={() => setIsEditQuestionModalOpen(false)}
                    onSubmit={handleUpdateQuestion}
                    onDelete={handleDeleteQuestion}
                    testTopics={groupedTests}
                />
                <EditTopicModal
                    isOpen={isEditTopicModalOpen}
                    onClose={() => setIsEditTopicModalOpen(false)}
                    selectedCourseID={selectedCourseID}
                    testTopics={groupedTests}

                />




            </div>
        </AdminLayout>
    );
};

export default QuestionPage;
