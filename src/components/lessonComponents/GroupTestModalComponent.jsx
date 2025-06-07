import React from "react";
import GroupTestModalCardComponent from "./GroupTestModalCardComponent";
import { FaTimes } from "react-icons/fa";

const GroupTestModalComponent = ({ isOpen, onClose, tests, color, onNavigate }) => {
    if (!isOpen || !tests) return null;

    return (
        <div className="TestModal-backdrop" onClick={onClose}>
            <div className="TestModal-content" onClick={(e) => e.stopPropagation()}>
                <button className="TestModal-closeButton" onClick={onClose}>
                    <FaTimes size={18} />
                </button>
                <h5 className="TestModal-title mb-4">Tüm Testler</h5>
                <div className="row">
                    {tests.map((test, index) => (
                        <GroupTestModalCardComponent
                            key={index}
                            title={test.title}
                            description={test.description}
                            buttonText="Başla"
                            color={color}
                            onClick={() => onNavigate(test.testID)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroupTestModalComponent;
