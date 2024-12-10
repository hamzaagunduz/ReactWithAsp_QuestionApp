import React, { useState } from 'react';
import logo from '../assets/mat.png'; // Resmi import et

function ExamMidComponent() {
    const [selectedOption, setSelectedOption] = useState(null); // Seçilen seçenek için state

    const options = ["YKS", "ALES", "KPSS", "DENEME"]; // Seçenekler

    const handleSelect = (option) => {
        setSelectedOption(option); // Seçilen seçeneği güncelle
    };

    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light">
            <h4 className="text-center exam-title">Hazırlandığınız Sınavı Seçin</h4> {/* Başlığı burada güncelledik */}
            <div className="exam-container">
                <div className="option-list">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-button ${selectedOption === option ? "aktif" : ""}`}
                            onClick={() => handleSelect(option)}
                        >
                            <img src={logo} alt="logo" className="option-logo" /> {/* Logo resmini ekliyoruz */}
                            {option}
                            {selectedOption === option && (
                                <span className="tik">✔</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExamMidComponent;
