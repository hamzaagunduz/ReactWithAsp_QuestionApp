import { useState, useEffect } from 'react';
import './../../style/diamondPage/diamond.css';
import DiamondPaymentModal from './DiamondPaymentModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfileStatistics } from '../../features/Statistics/StatisticsSlice';

const DiamondMidSection = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const dispatch = useDispatch();

    const { data: statistics, status } = useSelector((state) => state.statistic.profileStats);
    const { successMessage } = useSelector((state) => state.purchase);

    // Sayfa ilk yüklendiğinde istatistikleri al
    useEffect(() => {
        dispatch(fetchUserProfileStatistics());
    }, [dispatch]);

    // Satın alma başarılı olursa istatistikleri tekrar al
    useEffect(() => {
        if (successMessage) {
            dispatch(fetchUserProfileStatistics());
        }
    }, [successMessage, dispatch]);

    const diamondPackages = [
        {
            name: "Mavi Elmas",
            description: "100 Elmas + %5 Bonus",
            price: "₺50",
            amount: 50,
            diamondCount: 105,
            color: "blue",
            image: "src/assets/rightbar/rightTopIcons/diamond.png",
        },
        {
            name: "Yeşil Elmas",
            description: "250 Elmas + %10 Bonus",
            price: "₺100",
            amount: 100,
            diamondCount: 275,
            color: "green",
            image: "src/assets/rightbar/rightTopIcons/diamond.png",
        },
        {
            name: "Kırmızı Elmas",
            description: "500 Elmas + %20 Bonus",
            price: "₺180",
            amount: 180,
            diamondCount: 600,
            color: "red",
            image: "src/assets/rightbar/rightTopIcons/diamond.png",
        },
    ];

    return (
        <div className="diamond-section-container">
            <h2 className="diamond-title">Elmas Paketleri</h2>
            <p className="diamond-subtitle">İhtiyacına uygun elmas paketini seç ve hemen satın al!</p>

            <div className="diamond-user-info">
                {status === 'loading' && <p>Yükleniyor...</p>}
                {status === 'succeeded' && statistics?.diamond != null && (
                    <p>💎 Mevcut Elmas: <strong>{statistics.diamond}</strong></p>
                )}
                {status === 'failed' && <p>Elmas bilgisi alınamadı</p>}
            </div>

            <div className="diamond-package-wrapper">
                {diamondPackages.map((pkg, index) => (
                    <div key={index} className={`diamond-card ${pkg.color}`}>
                        <div className="diamond-ribbon"></div>
                        <div className="diamond-card-content">
                            <img src={pkg.image} alt={pkg.name} className="diamond-img" />
                            <h4 className="diamond-name">{pkg.name}</h4>
                            <p className="diamond-desc">{pkg.description}</p>
                            <div className="diamond-price">{pkg.price}</div>
                            <button className="diamond-button" onClick={() => setSelectedPackage(pkg)}>
                                Satın Al
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPackage && (
                <DiamondPaymentModal
                    packageInfo={selectedPackage}
                    onClose={() => setSelectedPackage(null)}
                />
            )}
        </div>
    );
};

export default DiamondMidSection;
