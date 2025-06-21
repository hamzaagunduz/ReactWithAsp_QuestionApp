import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamWithSelected } from '../features/Exam/ExamSlice';
import { updateAppUserExam } from '../features/AppUser/AppUserSlice';

function ExamMidComponent() {
    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch();

    const { options, fetchWithSelectedStatus } = useSelector(state => state.exam);

    useEffect(() => {
        dispatch(fetchExamWithSelected());
    }, [dispatch]);

    useEffect(() => {
        // Seçili exam varsa set et
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
        <div className="exam-wrapper">
            <h3 className="exam-title">Hazırlandığınız Sınavı Seçin</h3>

            {fetchWithSelectedStatus === 'loading' ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>) : (
                <div className="exam-options">
                    {options.map(option => (
                        <button
                            key={option.examID}
                            className={`exam-option ${selectedOption === option.name ? 'selecteds' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.name}
                            {selectedOption === option.name && (
                                <span className="checkmark"></span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExamMidComponent;
