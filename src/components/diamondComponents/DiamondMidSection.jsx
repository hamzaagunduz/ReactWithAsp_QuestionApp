import "./../../style/diamondPage/diamond.css";

const DiamondMidSection = () => {
    const diamondPackages = [
        {
            name: "Mavi Elmas",
            description: "100 Elmas + %5 Bonus",
            price: "₺50",
            color: "blue",
            image: "../../../src/assets/diamond.png",
        },
        {
            name: "Yeşil Elmas",
            description: "250 Elmas + %10 Bonus",
            price: "₺100",
            color: "green",
            image: "../../../src/assets/diamond.png",
        },
        {
            name: "Kırmızı Elmas",
            description: "500 Elmas + %20 Bonus",
            price: "₺180",
            color: "red",
            image: "../../../src/assets/diamond.png",
        },
    ];

    return (
        <div className="diamond-section-container">
            <h2 className="diamond-title">Elmas Paketleri</h2>
            <p className="diamond-subtitle">İhtiyacına uygun elmas paketini seç ve hemen satın al!</p>
            <div className="diamond-package-wrapper">
                {diamondPackages.map((pkg, index) => (
                    <div key={index} className={`diamond-card ${pkg.color}`}>
                        <div className="diamond-ribbon"></div>
                        <div className="diamond-card-content">
                            <img src={pkg.image} alt={pkg.name} className="diamond-img" />
                            <h4 className="diamond-name">{pkg.name}</h4>
                            <p className="diamond-desc">{pkg.description}</p>
                            <div className="diamond-price">{pkg.price}</div>
                            <button className="diamond-button">Satın Al</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiamondMidSection;
