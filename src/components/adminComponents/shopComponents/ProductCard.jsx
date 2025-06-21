import styles from '../../../style/adminPage/ShopManagement/ShopManagement.module.css';

// Renk sınıflarını harici bir nesne olarak tanımla
const COLOR_CLASSES = {
    blue: styles.colorBlue,
    purple: styles.colorPurple,
    gold: styles.colorGold,
    orange: styles.colorOrange
};

const ProductCard = ({ product, onEdit, onDelete }) => {
    // Renk sınıfını belirle
    const colorClass = COLOR_CLASSES[product.color] || '';
    // Ürün tipine göre başlık ve fiyat bilgilerini belirle
    const productType = product.type === 'diamond' ? '💎 Elmas' : '⭐ Premium';

    return (
        <div className={`${styles.productCard} ${colorClass}`}>
            <CardHeader
                productType={productType}
                onEdit={onEdit}
                onDelete={onDelete}
            />

            <ProductImage imageUrl={product.imageUrl} name={product.name} />

            <ProductInfo
                name={product.name}
                description={product.description}
                price={product.price}
                durationInDays={product.durationInDays}
                isDiamond={product.type === 'diamond'}
                diamondAmount={product.diamondAmount}
                bonusPercentage={product.bonusPercentage}
                priceInTL={product.priceInTL}
            />
        </div>
    );
};

// Alt bileşen: Kart başlığı (tip ve aksiyon butonları)
const CardHeader = ({ productType, onEdit, onDelete }) => (
    <div className={styles.productHeader}>
        <div className={styles.productType}>{productType}</div>
        <div className={styles.productActions}>
            <button onClick={onEdit} className={styles.editButton}>Düzenle</button>
            <button onClick={onDelete} className={styles.deleteButton}>Sil</button>
        </div>
    </div>
);

// Alt bileşen: Ürün görseli
const ProductImage = ({ imageUrl, name }) => (
    <div className={styles.productImage}>
        {imageUrl ? (
            <img src={`/assets//${imageUrl}`} alt={name} />
        ) : (
            <div className={styles.imagePlaceholder}>Ürün Görseli</div>
        )}
    </div>
);

// Alt bileşen: Ürün bilgileri
const ProductInfo = ({
    name,
    description,
    price,
    durationInDays,
    isDiamond,
    diamondAmount,
    bonusPercentage,
    priceInTL
}) => (
    <div className={styles.productInfo}>
        <h3>{name}</h3>
        <p className={styles.productDescription}>{description}</p>

        <div className={styles.productDetails}>
            {isDiamond ? (
                <>
                    <DiamondInfo
                        diamondAmount={diamondAmount}
                        bonusPercentage={bonusPercentage}
                        priceInTL={priceInTL}
                    />
                </>
            ) : (
                <>
                    <div className={styles.price}>
                        <strong>{price} 💎</strong>
                    </div>
                    {durationInDays > 0 && (
                        <div className={styles.duration}>
                            {durationInDays} gün
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
);

// Alt bileşen: Elmas paketi bilgileri
const DiamondInfo = ({ diamondAmount, bonusPercentage, priceInTL }) => (
    <>
        <div className={styles.diamondAmount}>
            <strong>{diamondAmount} 💎</strong>
        </div>

        {bonusPercentage > 0 && (
            <div className={styles.bonus}>
                +%{bonusPercentage} bonus
            </div>
        )}

        <div className={styles.price}>
            ₺{priceInTL}
        </div>
    </>
);

export default ProductCard;