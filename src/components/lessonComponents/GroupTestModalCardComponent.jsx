import { FaPlay } from "react-icons/fa";

const GroupTestModalCardComponent = ({ title, description, buttonText, onClick, color }) => {
    const { primary, secondary } = color;

    // CSS değişkenlerini inline root'a inject etmek için stil objesi
    const cssVars = {
        "--card-bg-color-1": primary,
        "--card-bg-color-2": secondary,
    };

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div
                className="TestModalCard-container"
                style={cssVars}
                onClick={onClick}
            >
                <div className="TestModalCard-bg"></div>

                <div className="TestModalCard-content">
                    <h6 className="TestModalCard-title" style={{ color: "#fff" }}>{title}</h6>
                    <div className="TestModalCard-buttonArea">
                        <button
                            className="TestModalCard-button"

                        >
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
