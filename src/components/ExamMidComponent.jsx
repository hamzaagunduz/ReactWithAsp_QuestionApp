import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamWithSelected } from '../features/Exam/ExamSlice';
import { updateAppUserExam } from '../features/AppUser/AppUserSlice';

const lessonColors = [
    { primary: "#7ed957", secondary: "#6ac34f" },
    { primary: "#3cb7c9", secondary: "#5ce1e6" },
    { primary: "#4a148c", secondary: "#9c27b0" },
    { primary: "#5b0a0c", secondary: "#ff4d6d" },
    { primary: "#292b2f", secondary: "#5d8aa8" },
    { primary: "#fa8010", secondary: "#ffb347" },
    { primary: "#5b6221", secondary: "#a3c14a" },
    { primary: "#930002", secondary: "#ff5e62" },
    { primary: "#377515", secondary: "#7cba00" },
    { primary: "#0d47a1", secondary: "#2196f3" },
];

const ExamMidComponent = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch();
    const { options, fetchWithSelectedStatus } = useSelector(state => state.exam);

    useEffect(() => {
        dispatch(fetchExamWithSelected());
    }, [dispatch]);

    useEffect(() => {
        const selectedExam = options.find(option => option.isSelected);
        if (selectedExam) {
            setSelectedOption(selectedExam.name);
        }
    }, [options]);

    const handleSelect = (exam) => {
        setSelectedOption(exam.name);
        dispatch(updateAppUserExam({ examID: exam.examID }));
    };

    return (
        <div className="container">
            <h3 className="exam-title text-center mb-4">Sınavı Seçin</h3>

            {fetchWithSelectedStatus === 'loading' ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {options.map((option, index) => {
                        const { primary, secondary } = lessonColors[index % lessonColors.length];

                        return (
                            <div className="col-12 col-md-6 mb-4 d-flex justify-content-center" key={option.examID}>
                                <div
                                    className="exam-card-container"
                                    onClick={() => handleSelect(option)}
                                    style={{
                                        "--card-bg-color-1": primary,
                                        "--card-bg-color-2": secondary,
                                        border: selectedOption === option.name ? "3px solid #ffa61c" : "none",
                                    }}
                                >
                                    <div className="exam-card-background"></div>
                                    <div className="exam-card-content">
                                        <div className="exam-card-title">
                                            {option.name}
                                        </div>
                                        <button
                                            className="exam-card-button"
                                            style={{
                                                color: primary
                                            }}
                                        >
                                            {selectedOption === option.name ? "Seçildi" : "Seç"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ExamMidComponent;
