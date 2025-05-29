import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamOptions } from '../features/Exam/ExamSlice';
import { updateAppUserExam, fetchAppUser } from '../features/AppUser/AppUserSlice';


function ExamMidComponent() {
    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch();

    const { options } = useSelector(state => state.exam);
    const { user } = useSelector(state => state.appUser);

    useEffect(() => {
        dispatch(fetchAppUser(1));
        dispatch(fetchExamOptions());
    }, [dispatch]);

    useEffect(() => {
        if (user && options.length > 0) {
            const selectedExam = options.find(option => option.examID === user.examID);
            if (selectedExam) {
                setSelectedOption(selectedExam.name);
            }
        }
    }, [user, options]);

    const handleSelect = (exam) => {
        setSelectedOption(exam.name);
        if (user) {
            dispatch(updateAppUserExam({ userId: user.userId, examID: exam.examID }));
        }
    };

    return (
        <div className="exam-wrapper">
            <h3 className="exam-title">Hazırlandığınız Sınavı Seçin</h3>
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
        </div>
    );
}

export default ExamMidComponent;
