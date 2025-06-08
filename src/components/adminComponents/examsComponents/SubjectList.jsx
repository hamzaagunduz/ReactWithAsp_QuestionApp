import React, { useState } from 'react';
import styles from '../../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const SubjectList = ({ exam, onSelectSubject, onAddSubject, onBack }) => {
    const [subjects, setSubjects] = useState([
        { id: 1, name: "Matematik", order: 1, examId: exam.id },
        { id: 2, name: "Fizik", order: 2, examId: exam.id },
        { id: 3, name: "Kimya", order: 3, examId: exam.id },
        { id: 4, name: "Biyoloji", order: 4, examId: exam.id },
        { id: 5, name: "Türkçe", order: 5, examId: exam.id },
        { id: 6, name: "Tarih", order: 6, examId: exam.id },
        { id: 7, name: "Coğrafya", order: 7, examId: exam.id },
        { id: 8, name: "Felsefe", order: 8, examId: exam.id }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    // Konu silme
    const handleDelete = (id) => {
        if (window.confirm('Bu konuyu silmek istediğinize emin misiniz?')) {
            setSubjects(subjects.filter(subject => subject.id !== id));
            alert('Konu başarıyla silindi!');
        }
    };

    // Konu sırasını güncelle
    const handleOrderChange = (id, direction) => {
        const index = subjects.findIndex(s => s.id === id);
        if ((direction === 'up' && index === 0) ||
            (direction === 'down' && index === subjects.length - 1)) {
            return;
        }

        const newSubjects = [...subjects];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap positions
        [newSubjects[index], newSubjects[newIndex]] = [newSubjects[newIndex], newSubjects[index]];

        // Update order values
        newSubjects.forEach((subject, i) => {
            subject.order = i + 1;
        });

        setSubjects(newSubjects);
    };

    // Filtrelenmiş konular
    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.listContainer}>
            <div className={styles.listHeader}>
                <div>
                    <button className={styles.backButton} onClick={onBack}>
                        <i className="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2>{exam.name} Konuları</h2>
                </div>

                <div className={styles.actions}>
                    <div className={styles.searchGroup}>
                        <input
                            type="text"
                            placeholder="Konu ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search"></i>
                    </div>
                    <button className={styles.addButton} onClick={onAddSubject}>
                        <i className="fas fa-plus"></i> Yeni Konu Ekle
                    </button>
                </div>
            </div>

            <div className={styles.subjectTable}>
                <div className={styles.tableHeader}>
                    <div className={styles.colOrder}>Sıra</div>
                    <div className={styles.colName}>Konu Adı</div>
                    <div className={styles.colActions}>İşlemler</div>
                </div>

                <div className={styles.tableBody}>
                    {filteredSubjects.map(subject => (
                        <div key={subject.id} className={styles.tableRow}>
                            <div className={styles.colOrder}>
                                <div className={styles.orderControls}>
                                    <button
                                        onClick={() => handleOrderChange(subject.id, 'up')}
                                        disabled={subject.order === 1}
                                    >
                                        <i className="fas fa-arrow-up"></i>
                                    </button>
                                    <span>{subject.order}</span>
                                    <button
                                        onClick={() => handleOrderChange(subject.id, 'down')}
                                        disabled={subject.order === subjects.length}
                                    >
                                        <i className="fas fa-arrow-down"></i>
                                    </button>
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
                                    onClick={() => handleDelete(subject.id)}
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
                    <p>Bu sınava ait konu bulunamadı</p>
                    <button className={styles.addButton} onClick={onAddSubject}>
                        Yeni Konu Ekle
                    </button>
                </div>
            )}
        </div>
    );
};

export default SubjectList;