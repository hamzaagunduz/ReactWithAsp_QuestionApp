// src/components/adminComponents/examsComponents/ExamForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createExam, updateExam } from '../../../features/Exam/ExamSlice';
import styles from '../../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const ExamForm = ({ exam, onBack, onComplete }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        examID: exam?.examID || 0,
        name: exam?.name || '',
        year: exam?.year || new Date().toISOString(),
        order: exam?.order || 0 // <-- Yeni eklenen alan

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (exam) {
            await dispatch(updateExam(formData));
            alert('Sınav başarıyla güncellendi!');
        } else {
            await dispatch(createExam(formData));
            alert('Yeni sınav başarıyla eklendi!');
        }

        onComplete();
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <button className={styles.backButton} onClick={onBack}>
                    <i className="fas fa-arrow-left"></i> Geri
                </button>
                <h2>{exam ? 'Sınavı Düzenle' : 'Yeni Sınav Ekle'}</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Sınav Adı</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="YKS, ALES, KPSS..."
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Sınav Yılı</label>
                    <input
                        type="datetime-local"
                        name="year"
                        value={formData.year.slice(0, 16)} // ISO formatını uygun hale getiriyoruz
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Sıra</label>
                    <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        placeholder="Örn: 1"
                        required
                    />
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
                        {exam ? 'Güncelle' : 'Sınav Ekle'}
                    </button>
                </div>


            </form>
        </div>
    );
};

export default ExamForm;
