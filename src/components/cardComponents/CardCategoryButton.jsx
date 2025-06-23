// components/homeComponents/CategoryButton.jsx
import React from "react";
import PropTypes from "prop-types";

// Güncellenmiş renk paleti (ilk koddaki blockchain tarzı renkler)
const colors = [
    { primary: "#7ed957", secondary: "#6ac34f", imageBg: "rgba(126, 217, 87, 0.15)" },
    { primary: "#3cb7c9", secondary: "#5ce1e6", imageBg: "rgba(92, 225, 230, 0.15)" },
    { primary: "#4a148c", secondary: "#9c27b0", imageBg: "rgba(156, 39, 176, 0.15)" },
    { primary: "#5b0a0c", secondary: "#ff4d6d", imageBg: "rgba(255, 77, 109, 0.15)" },
    { primary: "#292b2f", secondary: "#5d8aa8", imageBg: "rgba(93, 138, 168, 0.15)" },
    { primary: "#fa8010", secondary: "#ffb347", imageBg: "rgba(255, 179, 71, 0.15)" },
    { primary: "#5b6221", secondary: "#a3c14a", imageBg: "rgba(163, 193, 74, 0.15)" },
    { primary: "#930002", secondary: "#ff5e62", imageBg: "rgba(255, 94, 98, 0.15)" },
    { primary: "#377515", secondary: "#7cba00", imageBg: "rgba(124, 186, 0, 0.15)" },
    { primary: "#0d47a1", secondary: "#2196f3", imageBg: "rgba(33, 150, 243, 0.15)" },
];

const CardCategoryButton = React.memo(({ category, index, onClick }) => {
    // index ile renk seçimi yapıyoruz
    const colorSet = colors[index % colors.length];

    return (
        <button
            className="btn-category-card"
            onClick={() => onClick(category.courseID)}
            style={{
                "--card-bg-color-1": colorSet.primary,
                "--card-bg-color-2": colorSet.secondary,
                "--image-bg": colorSet.imageBg,
            }}
        >
            <div className="button-bg-card"></div>

            <div className="button-content-card">
                <div className="image-container-card">
                    <img
                        src={`/assets/${category.iconURL}`}
                        alt={category.name}
                        className="category-image-card"
                    />
                </div>
                <span className="category-name-card">{category.name}</span>
            </div>
        </button>
    );
});

CardCategoryButton.propTypes = {
    category: PropTypes.shape({
        courseID: PropTypes.number.isRequired,
        iconURL: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,  // index propu zorunlu oldu
    onClick: PropTypes.func.isRequired,
};

export default CardCategoryButton;
