import { useState } from 'react';
import styles from '../../../style/adminPage/profile/AdminProfile.module.css';

const AdminInfoCard = ({ admin }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: admin.name,
        title: admin.title,
        email: admin.email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profil bilgileri güncellendi!");
        setIsEditing(false);
    };

    return (
        <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
                <h2>Profil Bilgileri</h2>
                {!isEditing ? (
                    <button
                        className={styles.editButton}
                        onClick={() => setIsEditing(true)}
                    >
                        <i className="fas fa-edit"></i> Düzenle
                    </button>
                ) : (
                    <button
                        className={styles.cancelButton}
                        onClick={() => setIsEditing(false)}
                    >
                        <i className="fas fa-times"></i> İptal
                    </button>
                )}
            </div>

            {!isEditing ? (
                <div className={styles.infoContent}>
                    <div className={styles.infoItem}>
                        <label>Tam Ad</label>
                        <p>{admin.name}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label>Ünvan</label>
                        <p>{admin.title}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label>E-posta</label>
                        <p>{admin.email}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label>Son Giriş</label>
                        <p>{admin.lastLogin}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label>Üyelik Tarihi</label>
                        <p>{admin.joinDate}</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.editForm}>
                    <div className={styles.formGroup}>
                        <label>Tam Ad</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Ünvan</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>E-posta</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="submit"
                            className={styles.saveButton}
                        >
                            <i className="fas fa-save"></i> Kaydet
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AdminInfoCard;