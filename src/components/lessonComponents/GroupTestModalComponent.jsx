import React from "react";
import CardComponent from "./CardComponent";

const GroupTestModalComponent = ({ isOpen, onClose, tests, color, onNavigate }) => {
    if (!isOpen || !tests) return null;

    return (
        <div className="custom-modal-backdrop" onClick={onClose}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
                <h5 className="mb-3">Testler</h5>
                <div className="row">
                    {tests.map((test, index) => (
                        <CardComponent
                            key={index}
                            title={test.title}
                            description={test.description}
                            buttonText="Başla"
                            color={color}
                            onClick={() => onNavigate(test.testID)}
                        />
                    ))}
                </div>
                <button className="btn btn-danger mt-4" onClick={onClose}>Kapat</button>
            </div>
        </div>
    );
};

export default GroupTestModalComponent;
