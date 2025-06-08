import React from 'react';
import styles from '../../../style/adminPage/ShopManagement/ShopManagement.module.css';

const ProductCard = ({ product, onEdit, onDelete }) => {
    // Renk sınıflarını belirleme
    const colorClasses = {
        blue: styles.colorBlue,
        purple: styles.colorPurple,
        gold: styles.colorGold,
        orange: styles.colorOrange
    };

    return (
        <div className={`${styles.productCard} ${colorClasses[product.color] || ''}`}>
            <div className={styles.productHeader}>
                <div className={styles.productType}>
                    {product.type === 'diamond' ? '💎 Elmas' : '⭐ Premium'}
                </div>
                <div className={styles.productActions}>
                    <button onClick={onEdit} className={styles.editButton}>Düzenle</button>
                    <button onClick={onDelete} className={styles.deleteButton}>Sil</button>
                </div>
            </div>

            <div className={styles.productImage}>
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                ) : (
                    <div className={styles.imagePlaceholder}>Ürün Görseli</div>
                )}
            </div>

            <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>

                <div className={styles.productDetails}>
                    <div className={styles.price}>
                        <strong>{product.price} 💎</strong>
                    </div>

                    {product.durationInDays > 0 && (
                        <div className={styles.duration}>
                            {product.durationInDays} gün
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;