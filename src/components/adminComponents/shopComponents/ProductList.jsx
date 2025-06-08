import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from '../../../style/adminPage/ShopManagement/ShopManagement.module.css';

const ProductList = ({ onEditProduct }) => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('all'); // 'diamond', 'premium', 'all'

    // Örnek ürün verileri
    useEffect(() => {
        const mockProducts = [
            {
                id: 1,
                name: "100 Elmas Paketi",
                description: "Hızlı alışveriş için ideal başlangıç paketi",
                price: 99,
                color: "blue",
                imageUrl: "/images/diamonds/100.png",
                durationInDays: 0,
                type: "diamond"
            },
            {
                id: 2,
                name: "500 Elmas Paketi",
                description: "En çok tercih edilen popüler paket",
                price: 449,
                color: "purple",
                imageUrl: "/images/diamonds/500.png",
                durationInDays: 0,
                type: "diamond"
            },
            {
                id: 3,
                name: "Aylık Premium Üyelik",
                description: "30 gün boyunca tüm premium özelliklere erişim",
                price: 299,
                color: "gold",
                imageUrl: "/images/premium/monthly.png",
                durationInDays: 30,
                type: "premium"
            },
            {
                id: 4,
                name: "Yıllık Premium Üyelik",
                description: "1 yıl boyunca premium özellikler + 500 elmas hediye",
                price: 2599,
                color: "orange",
                imageUrl: "/images/premium/yearly.png",
                durationInDays: 365,
                type: "premium"
            }
        ];

        setProducts(mockProducts);
    }, []);

    // Filtrelenmiş ürünler
    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.type === filter);

    // Ürün silme
    const handleDelete = (id) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            setProducts(products.filter(p => p.id !== id));
            alert('Ürün başarıyla silindi!');
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
                        <option value="premium">Premium Üyelikler</option>
                    </select>
                </div>

                <div className={styles.stats}>
                    Toplam <strong>{filteredProducts.length}</strong> ürün listeleniyor
                </div>
            </div>

            <div className={styles.productGrid}>
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={() => onEditProduct(product)}
                        onDelete={() => handleDelete(product.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;