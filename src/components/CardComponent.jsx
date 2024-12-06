// CardComponent.js
import React from "react";

const CardComponent = ({ title, description, buttonText, onClick, color }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="card mid-card-style" style={{ backgroundColor: color }}> {/* Kart rengi burada atanıyor */}
                <div className="card-body text-center">
                    <h5>{title}</h5>
                    <p>{description}</p>
                    <button className="btn btn-secondary card-button" onClick={onClick}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
