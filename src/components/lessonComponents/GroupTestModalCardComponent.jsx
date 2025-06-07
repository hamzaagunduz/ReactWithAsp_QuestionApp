import React from "react";
import { FaPlay } from "react-icons/fa";

const GroupTestModalCardComponent = ({ title, description, buttonText, onClick, color }) => {
    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div
                className="TestModalCard-container "
                style={{ backgroundColor: `${color}` }}
                onClick={onClick}
            >
                <div className="TestModalCard-content">
                    <h6 className="TestModalCard-title">{title}</h6>
                    <p className="TestModalCard-description">{description}</p>
                    <div className="TestModalCard-buttonArea">
                        <button className="TestModalCard-button">
                            <FaPlay size={14} style={{ marginRight: "6px" }} />
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupTestModalCardComponent;
