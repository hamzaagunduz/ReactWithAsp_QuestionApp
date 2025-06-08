import React, { useState, useEffect } from 'react';
import styles from '../../../style/adminPage/ShopManagement/ShopManagement.module.css';

const ProductForm = ({ product, onComplete }) => {
    // Form state
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        description: '',
        price: 0,
        color: 'blue',
        imageUrl: '',
        durationInDays: 0,
        type: 'diamond'
    });

    // Düzenleme modunda ise mevcut ürün bilgilerini yükle
    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                color: product.color,
                imageUrl: product.imageUrl,
                durationInDays: product.durationInDays,
                type: product.type
            });
        }
    }, [product]);

    // Input değişikliklerini işle
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'durationInDays' ? parseInt(value) || 0 : value
        }));
    };

    // Form gönderme
    const handleSubmit = (e) => {
        e.preventDefault();

        // Burada API çağrısı yapılacak
        alert(product ? 'Ürün başarıyla güncellendi!' : 'Yeni ürün başarıyla eklendi!');
        onComplete();
    };

    return (
        <div className={styles.productFormContainer}>
            <h2>{product ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Ürün Tipi</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="diamond">Elmas Paketi</option>
                        <option value="premium">Premium Üyelik</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Ürün Adı</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ürün adı giriniz"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Açıklama</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Ürün açıklaması"
                        rows="3"
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Fiyat (Elmas)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Renk</label>
                        <select
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        >
                            <option value="blue">Mavi</option>
                            <option value="purple">Mor</option>
                            <option value="gold">Altın</option>
                            <option value="orange">Turuncu</option>
                        </select>
                    </div>
                </div>

                {formData.type === 'premium' && (
                    <div className={styles.formGroup}>
                        <label>Süre (Gün)</label>
                        <input
                            type="number"
                            name="durationInDays"
                            value={formData.durationInDays}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label>Görsel URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.png"
                    />
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={onComplete}
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        className={styles.saveButton}
                    >
                        {product ? 'Güncelle' : 'Ürün Ekle'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;