import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamOptions } from '../features/Exam/ExamSlice';  // sınav seçeneklerini almak için
import { updateAppUserExam, fetchAppUser } from '../features/AppUser/AppUserSlice'; // AppUser'ı güncellemek ve almak için

function ExamMidComponent() {
    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch();

    // Redux'tan verileri alıyoruz
    const { options, status, error } = useSelector(state => state.exam);
    const { user, status: userStatus, error: userError } = useSelector(state => state.appUser);

    // AppUser bilgilerini alıyoruz (userId = 1)
    useEffect(() => {
        dispatch(fetchAppUser(1));  // userId: 1 için veriyi al
        dispatch(fetchExamOptions());  // Sınav seçeneklerini al
    }, [dispatch]);

    // Kullanıcı bilgisi ve sınav seçenekleri yüklendikten sonra `selectedOption`'ı ayarla
    useEffect(() => {
        if (user && options.length > 0) {
            const selectedExam = options.find(option => option.examID === user.examID);
            if (selectedExam) {
                setSelectedOption(selectedExam.name);
            }
        }
    }, [user, options]);

    const handleSelect = (exam) => {
        setSelectedOption(exam.name);  // Seçilen sınavı state'e kaydet
        console.log(user);
        if (user) {
            // Kullanıcı bilgisi varsa sınav ID'sini güncelle
            dispatch(updateAppUserExam({ userId: user.userId, examID: exam.examID }));
        }
    };

    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light">
            <h4 className="text-center exam-title">Hazırlandığınız Sınavı Seçin</h4>
            <div className="exam-container">
                <div className="option-list">
                    {options.map((option) => (
                        <button
                            key={option.examID}
                            className={`option-button ${selectedOption === option.name ? 'aktif' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.name}
                            {selectedOption === option.name && (
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
