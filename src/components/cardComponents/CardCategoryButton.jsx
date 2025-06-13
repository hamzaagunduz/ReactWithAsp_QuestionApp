// components/homeComponents/CategoryButton.jsx
import React from "react";
import PropTypes from "prop-types";

const CardCategoryButton = React.memo(({ category, onClick }) => {
    return (
        <button
            className="btn btn-category mb-3 text-center d-flex flex-column align-items-center"
            onClick={() => onClick(category.courseID)} // Kategori seçildiğinde onClick tetikleniyor
        >
            <img
                src={`/assets/${category.iconURL}`}
                alt={category.name}
                className="category-image mb-2"
                style={{ width: "50px", height: "50px" }}
            />
            <span>{category.name}</span> {/* Kategori ismini burada gösteriyoruz */}
        </button>
    );
});

// PropTypes ile veri tiplerini denetliyoruz
CardCategoryButton.propTypes = {
    category: PropTypes.shape({
        courseID: PropTypes.number.isRequired, // courseID zorunlu
        iconURL: PropTypes.string.isRequired, // iconURL zorunlu
        name: PropTypes.string.isRequired // name zorunlu
    }).isRequired,
    onClick: PropTypes.func.isRequired // onClick fonksiyonu zorunlu
};

export default CardCategoryButton;
