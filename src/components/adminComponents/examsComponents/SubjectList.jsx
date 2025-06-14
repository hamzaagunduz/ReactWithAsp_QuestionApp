import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByExamId, deleteCourse } from '../../../features/Courses/CoursesSlice';

import styles from '../../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const SubjectList = ({ exam, onSelectSubject, onAddSubject, onBack }) => {
    const dispatch = useDispatch();
    const { courses, status, error } = useSelector(state => state.courses);
    const [searchTerm, setSearchTerm] = useState('');

    // Exam değiştiğinde kursları çek
    useEffect(() => {
        if (exam?.examID) {
            dispatch(fetchCoursesByExamId(exam.examID));
        }
    }, [dispatch, exam?.examID]);

    const handleDelete = (id) => {
        if (window.confirm('Bu Dersyu silmek istediğinize emin misiniz?')) {
            dispatch(deleteCourse(id))
                .unwrap()
                .then(() => {
                    alert('Ders başarıyla silindi!');
                })
                .catch((err) => {
                    alert('Silme işlemi başarısız: ' + err);
                });
        }
    };
    // Ders sırasını güncelle
    const handleOrderChange = (id, direction) => {
        const index = courses.findIndex(s => s.courseID === id);
        if ((direction === 'up' && index === 0) ||
            (direction === 'down' && index === courses.length - 1)) {
            return;
        }

        const newCourses = [...courses];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap positions
        [newCourses[index], newCourses[newIndex]] = [newCourses[newIndex], newCourses[index]];

        // Burada API'ye sıra güncelleme isteği göndermeniz gerekir
        alert('Sıra güncellendi! (API entegrasyonu yapılmalı)');
    };

    // Filtrelenmiş Derslar
    const filteredSubjects = courses.filter(subject =>
        subject.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (status === 'loading') {
        return <div className={styles.listContainer}>Yükleniyor...</div>;
    }

    if (error) {
        return <div className={styles.listContainer}>Hata: {error}</div>;
    }

    return (
        <div className={styles.listContainer}>
            <div className={styles.listHeader}>
                <div>
                    <button className={styles.backButton} onClick={onBack}>
                        <i className="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2>{exam?.name} Dersler</h2>
                </div>

                <div className={styles.actions}>
                    <div className={styles.searchGroup}>
                        <input
                            type="text"
                            placeholder="Ders ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search"></i>
                    </div>
                    <button className={styles.addButton} onClick={onAddSubject}>
                        <i className="fas fa-plus"></i> Yeni Ders Ekle
                    </button>
                </div>
            </div>

            <div className={styles.subjectTable}>
                <div className={styles.tableHeader}>
                    <div className={styles.colOrder}>Sıra</div>
                    <div className={styles.colName}>Ders Adı</div>
                    <div className={styles.colActions}>İşlemler</div>
                </div>

                <div className={styles.tableBody}>
                    {filteredSubjects.map((subject, index) => (
                        <div key={subject.courseID} className={styles.tableRow}>
                            <div className={styles.colOrder}>
                                <div className={styles.orderControls}>
                                    {/* <button
                                        onClick={() => handleOrderChange(subject.courseID, 'up')}
                                        disabled={index === 0}
                                    >
                                        <i className="fas fa-arrow-up"></i>
                                    </button> */}
                                    <span>{index + 1}</span>
                                    {/* <button
                                        onClick={() => handleOrderChange(subject.courseID, 'down')}
                                        disabled={index === courses.length - 1}
                                    >
                                        <i className="fas fa-arrow-down"></i>
                                    </button> */}
                                </div>
                            </div>

                            <div className={styles.colName}>
                                {subject.name}
                            </div>

                            <div className={styles.colActions}>
                                <button
                                    className={styles.actionButton}
                                    onClick={() => onSelectSubject(subject)}
                                >
                                    <i className="fas fa-edit"></i> Düzenle
                                </button>

                                <button
                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                    onClick={() => handleDelete(subject.courseID)}
                                >
                                    <i className="fas fa-trash"></i> Sil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {filteredSubjects.length === 0 && (
                <div className={styles.emptyState}>
                    <i className="fas fa-book"></i>
                    <p>Bu sınava ait Ders bulunamadı</p>
                    <button className={styles.addButton} onClick={onAddSubject}>
                        Yeni Konu Ekle
                    </button>
                </div>
            )}
        </div>
    );
};

export default SubjectList;