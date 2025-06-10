import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamOptions, deleteExam } from '../../../features/Exam/ExamSlice';
import styles from '../../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const ExamList = ({ onSelectExam, onViewSubjects, onAddExam }) => {
    const dispatch = useDispatch();
    const { options: exams, status, error } = useSelector(state => state.exam);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchExamOptions());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Bu sınavı ve tüm konularını silmek istediğinize emin misiniz?')) {
            dispatch(deleteExam(id));
        }
    };


    const filteredExams = exams?.filter(exam =>
        exam?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


    return (
        <div className={styles.listContainer}>
            <div className={styles.listHeader}>
                <h2>Tüm Sınavlar</h2>
                <div className={styles.actions}>
                    <div className={styles.searchGroup}>
                        <input
                            type="text"
                            placeholder="Sınav ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search"></i>
                    </div>
                    <button className={styles.addButton} onClick={onAddExam}>
                        <i className="fas fa-plus"></i> Yeni Sınav Ekle
                    </button>
                </div>
            </div>

            {status === 'loading' ? (
                <p>Yükleniyor...</p>
            ) : error ? (
                <p>Hata: {error}</p>
            ) : (
                <div className={styles.examGrid}>
                    {filteredExams.map(exam => (
                        <div key={exam.examID} className={styles.examCard}>
                            <div className={styles.examImage}>
                                <div className={styles.imagePlaceholder}>
                                    <i className="fas fa-book"></i>
                                </div>
                            </div>
                            <div className={styles.examInfo}>
                                <h3>{exam.name}</h3>
                                <p>{new Date(exam.year).toLocaleDateString()}</p>
                            </div>
                            <div className={styles.examActions}>
                                <button
                                    className={styles.actionButton}
                                    onClick={() => onSelectExam(exam)}
                                >
                                    <i className="fas fa-edit"></i> Düzenle
                                </button>
                                <button
                                    className={styles.actionButton}
                                    onClick={() => onViewSubjects(exam)}  // Fixed this line
                                >
                                    <i className="fas fa-list"></i> Konuları Gör
                                </button>
                                <button
                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                    onClick={() => handleDelete(exam.examID)}
                                >
                                    <i className="fas fa-trash"></i> Sil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!status && filteredExams.length === 0 && (
                <div className={styles.emptyState}>
                    <i className="fas fa-book-open"></i>
                    <p>Gösterilecek sınav bulunamadı</p>
                    <button className={styles.addButton} onClick={onAddExam}>
                        Yeni Sınav Ekle
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExamList;
