import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import ProductList from '../../components/adminComponents/shopComponents/ProductList';
import ProductForm from '../../components/adminComponents/shopComponents/ProductForm';
import styles from '../../style/adminPage/ShopManagement/ShopManagement.module.css';

const ShopManagementPage = () => {
    const [activeTab, setActiveTab] = useState('list');
    const [editingProduct, setEditingProduct] = useState(null);

    // Ürün düzenleme fonksiyonu
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setActiveTab('form');
    };

    // Formdan sonra listeye dönme
    const handleFormComplete = () => {
        setEditingProduct(null);
        setActiveTab('list');
    };

    return (
        <AdminLayout>
            <div className={styles.shopManagementContainer}>
                <div className={styles.header}>
                    <h1>Mağaza Yönetimi</h1>
                    <p>Elmas ve Premium ürünlerinizi yönetin</p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'list' ? styles.active : ''}`}
                        onClick={() => setActiveTab('list')}
                    >
                        Ürün Listesi
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'form' ? styles.active : ''}`}
                        onClick={() => {
                            setEditingProduct(null);
                            setActiveTab('form');
                        }}
                    >
                        {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === 'list' ? (
                        <ProductList onEditProduct={handleEditProduct} />
                    ) : (
                        <ProductForm
                            product={editingProduct}
                            onComplete={handleFormComplete}
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ShopManagementPage;