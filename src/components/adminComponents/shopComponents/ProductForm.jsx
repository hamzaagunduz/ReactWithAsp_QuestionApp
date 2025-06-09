import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createShopItem,
    updateShopItem,
} from '../../../features/Shop/ShopSlice';
import {
    createDiamondPackItem,
    updateDiamondPackItem
} from '../../../features/DiamondPackItem/DiamondPackItemSlice';
import styles from '../../../style/adminPage/ShopManagement/ShopManagement.module.css';

const ProductForm = ({ product, onComplete }) => {
    const dispatch = useDispatch();
    const shopState = useSelector(state => state.shop);
    const diamondState = useSelector(state => state.diamondPackItem);

    // Durum değişkenleri
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        description: '',
        price: 0,
        color: 'blue',
        imageUrl: '',
        durationInDays: 30,
        type: 'premium',
        // Elmas paketleri için ek alanlar
        diamondAmount: 0,
        bonusPercentage: 0,
        priceInTL: 0
    });

    // Yükleme durumları
    const createStatus = formData.type === 'diamond'
        ? diamondState.createStatus
        : shopState.createStatus;

    const updateStatus = formData.type === 'diamond'
        ? diamondState.updateStatus
        : shopState.updateStatus;

    const error = formData.type === 'diamond'
        ? diamondState.createError || diamondState.updateError
        : shopState.createError || shopState.updateError;

    // Ürün prop'u değiştiğinde formu güncelle
    useEffect(() => {
        if (product) {
            setFormData({
                ...formData,
                ...product,
                // Elmas paketleri için ek alanları doldur
                diamondAmount: product.diamondAmount || 0,
                bonusPercentage: product.bonusPercentage || 0,
                priceInTL: product.priceInTL || 0
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['price', 'durationInDays', 'diamondAmount', 'bonusPercentage', 'priceInTL'].includes(name)
                ? parseInt(value) || 0
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Hangi aksiyonu göndereceğimizi belirle
            let action;

            if (formData.type === 'diamond') {
                // Elmas paketi için veri hazırla
                const diamondData = {
                    id: formData.id,
                    name: formData.name,
                    description: formData.description,
                    imageUrl: formData.imageUrl,
                    diamondAmount: formData.diamondAmount,
                    bonusPercentage: formData.bonusPercentage,
                    priceInTL: formData.priceInTL
                };

                action = product
                    ? updateDiamondPackItem(diamondData)
                    : createDiamondPackItem(diamondData);
            } else {
                // Premium ürün için veri hazırla
                const shopData = {
                    id: formData.id,
                    name: formData.name,
                    description: formData.description,
                    price: formData.price,
                    color: formData.color,
                    imageUrl: formData.imageUrl,
                    durationInDays: formData.durationInDays
                };

                action = product
                    ? updateShopItem(shopData)
                    : createShopItem(shopData);
            }

            await dispatch(action).unwrap();
            alert(`Ürün başarıyla ${product ? 'güncellendi' : 'eklendi'}!`);
            onComplete();
        } catch (err) {
            alert(`Hata: ${err.message || err}`);
        }
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
                        <option value="premium">Premium Ürün</option>
                        <option value="diamond">Elmas Paketi</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Ürün Adı</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Açıklama</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Görsel URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                {/* ELMAS PAKETİ ALANLARI */}
                {formData.type === 'diamond' && (
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Elmas Miktarı</label>
                            <input
                                type="number"
                                name="diamondAmount"
                                value={formData.diamondAmount}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Bonus Yüzdesi (%)</label>
                            <input
                                type="number"
                                name="bonusPercentage"
                                value={formData.bonusPercentage}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Fiyat (TL)</label>
                            <input
                                type="number"
                                name="priceInTL"
                                value={formData.priceInTL}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>
                    </div>
                )}

                {/* PREMIUM ÜRÜN ALANLARI */}
                {formData.type === 'premium' && (
                    <>
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
                    </>
                )}

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
                        disabled={createStatus === 'loading' || updateStatus === 'loading'}
                    >
                        {createStatus === 'loading' || updateStatus === 'loading'
                            ? 'İşleniyor...'
                            : (product ? 'Güncelle' : 'Ürün Ekle')}
                    </button>
                </div>

                {error && (
                    <p className={styles.errorText}>
                        Hata: {error}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ProductForm;