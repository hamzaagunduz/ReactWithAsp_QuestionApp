import React, { useState } from 'react';
import styles from '../../../style/adminPage/ExamsManagement/ExamsManagement.module.css';

const ExamForm = ({ exam, onBack, onComplete }) => {
    const [formData, setFormData] = useState({
        id: exam?.id || 0,
        name: exam?.name || '',
        description: exam?.description || '',
        imageUrl: exam?.imageUrl || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Burada API çağrısı yapılacak
        alert(exam ? 'Sınav başarıyla güncellendi!' : 'Yeni sınav başarıyla eklendi!');
        onComplete();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({ ...prev, imageUrl: e.target.result }));
            };
            reader.readAsDataURL(file);
        }
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
                    <label>Açıklama</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Sınav hakkında kısa açıklama"
                        rows="3"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Sınav Görseli</label>
                    <div className={styles.imageUpload}>
                        {formData.imageUrl ? (
                            <div className={styles.imagePreview}>
                                <img src={formData.imageUrl} alt="Sınav görseli" />
                                <button
                                    type="button"
                                    className={styles.removeImage}
                                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        ) : (
                            <div className={styles.uploadPlaceholder}>
                                <i className="fas fa-cloud-upload-alt"></i>
                                <span>Görsel Yükle</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.fileInput}
                                    onChange={handleImageChange}
                                />
                            </div>
                        )}
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
                        {exam ? 'Güncelle' : 'Sınav Ekle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExamForm;
