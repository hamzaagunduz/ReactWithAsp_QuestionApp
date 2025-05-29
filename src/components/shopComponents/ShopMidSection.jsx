import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserShopItems, purchaseShopItem } from "../../features/Shop/ShopSlice";
import "./../../style/shopPage/shop.css";

const ShopMidSection = () => {
    const dispatch = useDispatch();
    const { items: shopItems, status, error } = useSelector((state) => state.shop);
    const userId = parseInt(localStorage.getItem("userId")); // localStorage’dan userId al

    useEffect(() => {
        dispatch(fetchUserShopItems(userId));
    }, [dispatch, userId]);

    const handlePurchase = (shopItemId) => {
        dispatch(purchaseShopItem({ userId, shopItemId }))
            .then(() => {
                dispatch(fetchUserShopItems(userId)); // Satın alma sonrası güncelle
            });
    };

    return (
        <div className="shop-section-container">
            <h2 className="shop-title">Özel Paketler</h2>
            <p className="shop-subtitle">Hemen şimdi satın al ve avantajların tadını çıkar!</p>
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
