import { useState } from "react";

const CardComponent = ({ title, description, buttonText, onClick, colors }) => {
    const { primary, secondary } = colors;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div
                className="test-group-card"
                style={{
                    "--card-bg-color-1": primary,
                    "--card-bg-color-2": secondary,
                    cursor: "pointer",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
            >
                <div className="test-group-bg-card"></div>
                <div className="test-group-content-card">
                    <div
                        className="test-group-title-container"
                        style={{
                            padding: "8px 20px",
                            marginBottom: "10px",
                            transform: isHovered ? "scale(1.05)" : "none"
                        }}
                    >
                        <span className="test-group-name-card" >
                            {title}
                        </span>
                    </div>
                    <button
                        className="summary-button-card"
                        style={{
                            padding: "8px 25px",
                            fontSize: "14px",
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            color: primary
                        }}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
