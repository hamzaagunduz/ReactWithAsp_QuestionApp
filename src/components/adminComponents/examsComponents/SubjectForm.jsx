import React, { useState } from 'react';
import styles from '../../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const SubjectForm = ({ exam, subject, onBack, onComplete }) => {
    const [formData, setFormData] = useState({
        id: subject?.id || 0,
        name: subject?.name || '',
        description: subject?.description || '',
        examId: exam.id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Burada API çağrısı yapılacak
        alert(subject ? 'Konu başarıyla güncellendi!' : 'Yeni konu başarıyla eklendi!');
        onComplete();
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <button className={styles.backButton} onClick={onBack}>
                    <i className="fas fa-arrow-left"></i> Geri
                </button>
                <h2>{subject ? 'Konuyu Düzenle' : 'Yeni Konu Ekle'}</h2>
                <div className={styles.examInfo}>
                    <span>{exam.name}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Konu Adı</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Matematik, Fizik, Biyoloji..."
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Açıklama (Opsiyonel)</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Konu hakkında açıklama"
                        rows="3"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>İlişkili Sınav</label>
                    <div className={styles.examCard}>
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
                    </div>
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={onBack}
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        className={styles.saveButton}
                    >
                        {subject ? 'Güncelle' : 'Konu Ekle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubjectForm;