import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './../../style/diamondPage/diamond.css';
import DiamondPaymentModal from './DiamondPaymentModal';
import { fetchUserProfileStatistics } from '../../features/Statistics/StatisticsSlice';
import { fetchDiamondPackItems } from '../../features/DiamondPackItem/DiamondPackItemSlice';

const DiamondMidSection = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const dispatch = useDispatch();

    // Elmas paketlerini Redux store'dan al
    const {
        items: diamondPackages,
        status: diamondStatus
    } = useSelector((state) => state.diamondPackItem);

    // Kullanıcı istatistiklerini al
    const {
        data: statistics,
        status: statsStatus
    } = useSelector((state) => state.statistic.profileStats);

    // Satın alma başarı mesajı
    const { successMessage } = useSelector((state) => state.purchase);

    // Sayfa ilk yüklendiğinde verileri çek
    useEffect(() => {
        dispatch(fetchUserProfileStatistics());
        dispatch(fetchDiamondPackItems());
    }, [dispatch]);

    // Satın alma başarılı olursa istatistikleri tekrar al
    useEffect(() => {
        if (successMessage) {
            dispatch(fetchUserProfileStatistics());
        }
    }, [successMessage, dispatch]);

    // Renkleri paketlere eşleştirme fonksiyonu
    const getColorForPackage = (index) => {
        const colors = ['blue', 'green', 'red', 'purple', 'gold'];
        return colors[index % colors.length];
    };

    // Toplam elmas miktarını hesapla (bonus dahil)
    const calculateTotalDiamonds = (packageItem) => {
        const bonus = Math.floor(packageItem.diamondAmount * (packageItem.bonusPercentage / 100));
        return packageItem.diamondAmount + bonus;
    };

    return (
        <div className="diamond-section-container">
            <h2 className="diamond-title">Elmas Paketleri</h2>
            <p className="diamond-subtitle">İhtiyacına uygun elmas paketini seç ve hemen satın al!</p>

            <div className="diamond-user-info">
                {statsStatus === 'loading' && <p>Yükleniyor...</p>}
                {statsStatus === 'succeeded' && statistics?.diamond != null && (
                    <p>💎 Mevcut Elmas: <strong>{statistics.diamond}</strong></p>
                )}
                {statsStatus === 'failed' && <p>Elmas bilgisi alınamadı</p>}
            </div>

            {/* Yükleme durumu */}
            {diamondStatus === 'loading' && (
                <div className="diamond-loading">
                    <p>Paketler yükleniyor...</p>
                </div>
            )}

            {/* Hata durumu */}
            {diamondStatus === 'failed' && (
                <div className="diamond-error">
                    <p>Paketler yüklenirken hata oluştu</p>
                </div>
            )}

            {/* Paketlerin listesi */}
            {diamondStatus === 'succeeded' && (
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
                                            src={pkg.imageUrl}
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

            {/* Ödeme modalı */}
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