import React, { useState, useEffect } from 'react';
import styles from '../../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const ExamList = ({ onSelectExam, onAddExam }) => {
    const [exams, setExams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Örnek sınav verileri
    useEffect(() => {
        const mockExams = [
            { id: 1, name: "YKS (TYT-AYT)", description: "Yükseköğretim Kurumları Sınavı", imageUrl: "/images/exams/yks.png" },
            { id: 2, name: "ALES", description: "Akademik Personel ve Lisansüstü Eğitimi Giriş Sınavı", imageUrl: "/images/exams/ales.png" },
            { id: 3, name: "KPSS", description: "Kamu Personeli Seçme Sınavı", imageUrl: "/images/exams/kpss.png" },
            { id: 4, name: "DGS", description: "Dikey Geçiş Sınavı", imageUrl: "/images/exams/dgs.png" }
        ];

        setExams(mockExams);
    }, []);

    // Sınav silme
    const handleDelete = (id) => {
        if (window.confirm('Bu sınavı ve tüm konularını silmek istediğinize emin misiniz?')) {
            setExams(exams.filter(exam => exam.id !== id));
            alert('Sınav başarıyla silindi!');
        }
    };

    // Filtrelenmiş sınavlar
    const filteredExams = exams.filter(exam =>
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            <div className={styles.examGrid}>
                {filteredExams.map(exam => (
                    <div key={exam.id} className={styles.examCard}>
                        <div className={styles.examImage}>
                            {exam.imageUrl ? (
                                <img src={exam.imageUrl} alt={exam.name} />
                            ) : (
                                <div className={styles.imagePlaceholder}>
                                    <i className="fas fa-book"></i>
                                </div>
                            )}
                        </div>

                        <div className={styles.examInfo}>
                            <h3>{exam.name}</h3>
                            <p>{exam.description}</p>
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
                                onClick={() => onSelectExam(exam)}
                            >
                                <i className="fas fa-list"></i> Konuları Gör
                            </button>

                            <button
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                onClick={() => handleDelete(exam.id)}
                            >
                                <i className="fas fa-trash"></i> Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredExams.length === 0 && (
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