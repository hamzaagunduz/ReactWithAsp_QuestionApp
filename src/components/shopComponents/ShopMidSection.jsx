import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserShopItems, purchaseShopItem } from "../../features/Shop/ShopSlice";
import "./../../style/shopPage/shop.css";

const ShopMidSection = () => {
    const dispatch = useDispatch();

    // shop state'ten userDiamondCount ve items alıyoruz
    const { items = [], userDiamondCount = 0, status, error } = useSelector(state => state.shop);

    // İstersen statistics'i kaldırabilirsin, şu an kullandığın örnek

    useEffect(() => {
        dispatch(fetchUserShopItems());
    }, [dispatch]);

    // Satın alma işlemi sonrası listeyi yenile
    const handlePurchase = (shopItemId) => {
        dispatch(purchaseShopItem({ shopItemId })).then(() => {
            dispatch(fetchUserShopItems());
        });
    };

    // Eğer statistics kullanılmayacaksa kaldırabilirsin
    useEffect(() => {
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-section-container">
            <h2 className="shop-title">Özel Paketler</h2>
            <p className="shop-subtitle">Hemen şimdi satın al ve avantajların tadını çıkar!</p>

            <div className="diamond-user-info">
                {status === 'loading' && <p>Yükleniyor...</p>}
                {status === 'succeeded' && (
                    <p>💎 Mevcut Elmas: <strong>{userDiamondCount}</strong></p>
                )}
                {status === 'failed' && <p>Elmas bilgisi alınamadı</p>}
            </div>

            <div className="shop-package-wrapper">
                {items.length === 0 && status === 'succeeded' && <p>Mağazada ürün bulunamadı.</p>}

                {items.map(item => (
                    <div key={item.id} className={`shop-card ${item.color}`}>
                        <div className="shop-ribbon"></div>
                        <div className="shop-card-content">
                            <img src={item.imageUrl} alt={item.name} className="shop-img" />
                            <h4 className="shop-name">{item.name}</h4>
                            <p className="shop-desc">{item.description}</p>
                            <div className="shop-price">{item.price} 💎</div>

                            {item.isPurchased ? (
                                <div className="shop-status purchased">
                                    Satın alındı – {item.remainingDays} gün kaldı
                                </div>
                            ) : (
                                <button
                                    className="shop-button"
                                    onClick={() => handlePurchase(item.id)}
                                >
                                    Satın Al
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopMidSection;
