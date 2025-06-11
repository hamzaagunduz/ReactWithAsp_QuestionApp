import React, { useState } from 'react';
import styles from '../../../style/adminPage/ExamsManagement/ExamsManagement.module.css';
import { useDispatch } from 'react-redux';
import { createCourse, updateCourse } from '../../../features/Courses/CoursesSlice';

const SubjectForm = ({ exam, subject, onBack, onComplete }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: subject?.name || '',
        description: subject?.description || '',
        iconURL: subject?.iconURL || 'assets/courses/default.png', // Varsayılan ikon
        examID: exam.examID // API'de "examID" olarak geçiyor
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            ...(subject && { courseID: subject.courseID }) // Güncelleme varsa courseID ekle
        };

        try {
            if (subject) {
                await dispatch(updateCourse(payload)).unwrap();
                alert('Ders başarıyla güncellendi!');
            } else {
                await dispatch(createCourse(payload)).unwrap(); // Başarılı ise unwrap ile sonucu al
                alert('Yeni Ders başarıyla eklendi!');
            }

            onComplete(); // Üst komponenti bilgilendir
        } catch (error) {
            console.error('Kurs oluşturulamadı:', error);
            alert('Bir hata oluştu: ' + error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <button className={styles.backButton} onClick={onBack}>
                    <i className="fas fa-arrow-left"></i> Geri
                </button>
                <h2>{subject ? 'Dersyu Düzenle' : 'Yeni Ders Ekle'}</h2>
                <div className={styles.examInfo}>
                    <span>{exam.name}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Ders Adı*</label>
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
                    <label>Açıklama</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Ders hakkında açıklama"
                        rows="3"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>İkon URL</label>
                    <div className={styles.iconPreviewGroup}>
                        <input
                            type="text"
                            name="iconURL"
                            value={formData.iconURL}
                            onChange={handleChange}
                            placeholder="assets/courses/icon.png"
                        />
                        {/* <div className={styles.iconPreview}>
                            {formData.iconURL ? (
                                <img
                                    src={formData.iconURL}
                                    alt="Önizleme"
                                    onError={(e) => e.target.src = 'assets/courses/default.png'}
                                />
                            ) : (
                                <div className={styles.previewPlaceholder}>
                                    <i className="fas fa-image"></i>
                                    <span>Önizleme</span>
                                </div>
                            )}
                        </div> */}
                    </div>
                    <p className={styles.hint}>
                        Önerilen ikon boyutu: 100x100px. Varsayılan ikonlar:
                        assets/courses/mat.png, bio.png, chem.png, history.png
                    </p>
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
                        {subject ? 'Güncelle' : 'Ders Ekle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubjectForm;