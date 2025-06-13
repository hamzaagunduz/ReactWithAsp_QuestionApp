import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './../../style/diamondPage/diamond.css';
import DiamondPaymentModal from './DiamondPaymentModal';
import { fetchDiamondUserPackItems } from '../../features/DiamondPackItem/DiamondPackItemSlice';

const DiamondMidSection = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const dispatch = useDispatch();

    const {
        items: diamondPackages,
        diamondCount,
        diamondUserPackStatus,
        diamondUserPackError
    } = useSelector((state) => state.diamondPackItem);

    useEffect(() => {
        dispatch(fetchDiamondUserPackItems());
    }, [dispatch]);

    const getColorForPackage = (index) => {
        const colors = ['blue', 'green', 'red', 'purple', 'gold'];
        return colors[index % colors.length];
    };

    const calculateTotalDiamonds = (packageItem) => {
        const bonus = Math.floor(packageItem.diamondAmount * (packageItem.bonusPercentage / 100));
        return packageItem.diamondAmount + bonus;
    };

    return (
        <div className="diamond-section-container">
            <h2 className="diamond-title">Elmas Paketleri</h2>
            <p className="diamond-subtitle">İhtiyacına uygun elmas paketini seç ve hemen satın al!</p>

            <div className="diamond-user-info">
                {diamondUserPackStatus === 'loading' && <p>Yükleniyor...</p>}
                {diamondUserPackStatus === 'succeeded' && (
                    <p>💎 Mevcut Elmas: <strong>{diamondCount}</strong></p>
                )}
                {diamondUserPackStatus === 'failed' && (
                    <p>Elmas bilgisi alınamadı: {diamondUserPackError}</p>
                )}
            </div>

            {diamondUserPackStatus === 'loading' && (
                <div className="diamond-loading">
                    <p>Paketler yükleniyor...</p>
                </div>
            )}

            {diamondUserPackStatus === 'failed' && (
                <div className="diamond-error">
                    <p>Paketler yüklenirken hata oluştu</p>
                </div>
            )}

            {diamondUserPackStatus === 'succeeded' && (
                <div className="diamond-package-wrapper">
                    {diamondPackages.map((pkg, index) => {
                        const totalDiamonds = calculateTotalDiamonds(pkg);
                        const color = getColorForPackage(index);

                        return (
                            <div key={pkg.id} className={`diamond-card ${color}`}>
                                <div className="diamond-ribbon"></div>
                                <div className="diamond-card-content">
                                    {pkg.imageUrl ? (
                                        <img
                                            src={`/assets/${pkg.imageUrl}`}
                                            alt={pkg.name}
                                            className="diamond-img"
                                        />
                                    ) : (
                                        <div className="diamond-img-placeholder">💎</div>
                                    )}

                                    <h4 className="diamond-name">{pkg.name}</h4>
                                    <p className="diamond-desc">
                                        {pkg.diamondAmount} Elmas + %{pkg.bonusPercentage} Bonus
                                    </p>
                                    <div className="diamond-price">₺{pkg.priceInTL}</div>
                                    <button
                                        className="diamond-button"
                                        onClick={() => setSelectedPackage({
                                            ...pkg,
                                            totalDiamonds,
                                            color
                                        })}
                                    >
                                        Satın Al
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedPackage && (
                <DiamondPaymentModal
                    packageInfo={{
                        ...selectedPackage,
                        amount: selectedPackage.priceInTL,
                        diamondCount: selectedPackage.totalDiamonds,
                        price: `₺${selectedPackage.priceInTL}`
                    }}
                    onClose={() => setSelectedPackage(null)}
                />
            )}
        </div>
    );
};

export default DiamondMidSection;
