import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import styles from '../../../style/adminPage/ShopManagement/ShopManagement.module.css';
import { fetchAllShopItems, deleteShopItem } from '../../../features/Shop/ShopSlice';
import { fetchDiamondPackItems, deleteDiamondPackItem } from '../../../features/DiamondPackItem/DiamondPackItemSlice';

const ProductList = ({ onEditProduct }) => {
    const dispatch = useDispatch();

    // Shop item'ları için state
    const { allItems: shopItems, allItemsStatus: shopItemsStatus, allItemsError: shopItemsError } = useSelector(state => state.shop);

    // Diamond pack item'ları için state
    const { items: diamondPackItems, status: diamondPackItemsStatus, error: diamondPackItemsError } = useSelector(state => state.diamondPackItem);

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('all'); // 'diamond', 'premium', 'all'


    // API'den shop item'larını ve diamond pack item'larını çek
    useEffect(() => {
        dispatch(fetchAllShopItems());
        dispatch(fetchDiamondPackItems());
    }, [dispatch]);

    // Veriler değiştiğinde veya geldiğinde products state'ini güncelle
    useEffect(() => {
        // Shop item'larını premium olarak map et
        const shopProducts = shopItems.map(item => ({
            ...item,
            type: 'premium',      // Shop item'ları premium olarak işaretlendi
            durationInDays: 30,    // Varsayılan süre
            itemType: 'shopItem',   // Silme ve düzenleme işlemleri için tür belirteci
            uniqueId: `shop-${item.id}`, // Önek ekleyin

        }));

        // Diamond pack item'larını diamond olarak map et
        const diamondProducts = diamondPackItems.map(item => ({
            ...item,
            id: item.id,           // DiamondPackItem'ın id'si
            name: item.name,
            description: item.description,
            priceInTL: item.priceInTL,
            imageUrl: `${item.imageUrl}`,
            type: 'diamond',      // Diamond pack'ler diamond olarak işaretlendi
            durationInDays: 0,     // Diamond pack'lerin süresi olmaz
            itemType: 'diamondPackItem', // Tür belirteci,
            uniqueId: `diamond-${item.id}`, // Önek ekleyin

        }));

        // İki listeyi birleştir
        const allProducts = [...shopProducts, ...diamondProducts];
        setProducts(allProducts);
    }, [shopItems, diamondPackItems]);

    // Filtrelenmiş ürünler - DÜZELTİLMİŞ VERSİYON
    const filteredProducts = products.filter(product => {
        if (filter === 'all') return true;
        if (filter === 'diamond') return product.type === 'diamond';
        if (filter === 'premium') return product.type === 'premium';
        return true;
    });
    // Ürün silme
    const handleDelete = (id, itemType) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            // Eğer itemType 'diamondPackItem' ise diamondPackItem silme aksiyonunu, değilse shopItem silme aksiyonunu çağır
            const deleteAction = itemType === 'diamondPackItem'
                ? deleteDiamondPackItem(id)
                : deleteShopItem(id);

            dispatch(deleteAction)
                .unwrap()
                .then(() => alert('Ürün başarıyla silindi!'))
                .catch((err) => alert(`Hata: ${err}`));
        }
    };

    return (
        <div className={styles.productListContainer}>
            <div className={styles.filterSection}>
                <div className={styles.filterGroup}>
                    <label>Ürün Tipi:</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">Tüm Ürünler</option>
                        <option value="diamond">Elmas Paketleri</option>
                        <option value="premium">Premium Ürünler</option>
                    </select>
                </div>

                <div className={styles.stats}>
                    Toplam <strong>{filteredProducts.length}</strong> ürün listeleniyor
                </div>
            </div>

            <div className={styles.productGrid}>
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.uniqueId}
                        product={product}
                        onEdit={() => onEditProduct(product)}
                        onDelete={() => handleDelete(product.id, product.itemType)}
                    />
                ))}
            </div>

            {/* Yükleniyor ve hata durumları */}
            {(shopItemsStatus === 'loading' || diamondPackItemsStatus === 'loading') && <p>Yükleniyor...</p>}
            {shopItemsStatus === 'failed' && <p>Hata (Shop): {shopItemsError}</p>}
            {diamondPackItemsStatus === 'failed' && <p>Hata (Diamond): {diamondPackItemsError}</p>}
        </div>
    );
};

export default ProductList;