import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserShopItems, purchaseShopItem } from "../../features/Shop/ShopSlice";
import "./../../style/shopPage/shop.css";
import { fetchUserProfileStatistics } from '../../features/Statistics/StatisticsSlice';

const ShopMidSection = () => {
    const dispatch = useDispatch();
    const { items: shopItems, status, error } = useSelector((state) => state.shop);
    const { data: statistics } = useSelector((state) => state.statistic.profileStats);

    useEffect(() => {
        dispatch(fetchUserShopItems());
    }, [dispatch]);

    const handlePurchase = (shopItemId) => {
        dispatch(purchaseShopItem({ shopItemId }))
            .then(() => {
                dispatch(fetchUserShopItems()); // Satın alma sonrası güncelle
            });
    };
    useEffect(() => {
        dispatch(fetchUserProfileStatistics());
    }, [dispatch]);

    return (
        <div className="shop-section-container">
            <h2 className="shop-title">Özel Paketler</h2>
            <p className="shop-subtitle">Hemen şimdi satın al ve avantajların tadını çıkar!</p>
            <div className="diamond-user-info">
                {status === 'loading' && <p>Yükleniyor...</p>}
                {status === 'succeeded' && statistics?.diamond != null && (
                    <p>💎 Mevcut Elmas: <strong>{statistics.diamond}</strong></p>
                )}
                {status === 'failed' && <p>Elmas bilgisi alınamadı</p>}
            </div>
            <div className="shop-package-wrapper">
                {shopItems.map((item) => (
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
