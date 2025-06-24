import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/midsection.css';
import { fetchCoursesByExamId } from '../../features/Courses/CoursesSlice';
import { clearTopics } from '../../features/Topic/TopicSlice';
import { useDispatch, useSelector } from 'react-redux';
import CategoryButton from "./CategoryButton";

export const MidSection = React.memo(() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courses, fetchStatus } = useSelector(state => state.courses);

    // Initial data fetch
    useEffect(() => {
        dispatch(fetchCoursesByExamId());
    }, [dispatch]);

    const [selectedCategory, setSelectedCategory] = useState(null);

    // Handle category selection
    const handleCategorySelection = useCallback((categoryID) => {
        setSelectedCategory(categoryID);
        dispatch(clearTopics());
        navigate(`/lesson/${categoryID}`);
    }, [dispatch, navigate]);

    // Back button handler
    const handleBack = useCallback(() => {
        dispatch(clearTopics());
        setSelectedCategory(null);
    }, [dispatch]);

    // Loading state
    if (fetchStatus === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center col-md-6" style={{ minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        );
    }
    if (fetchStatus === 'failed') {
        return (
            <div className="col-12 col-md-6 position-relative error-container">
                <span className="error-message">Bir hata oluştu. Lütfen tekrar deneyin.</span>
            </div>
        );
    }


    return (
        <div className="col-12 col-md-6 position-relative">
            {!selectedCategory ? (
                <div className="category-selection">
                    <div className="lesson-title">Dersi Seç</div>
                    <div className="category-list">
                        {courses.map((category, index) => (
                            <CategoryButton
                                key={category.courseID}
                                category={category}
                                index={index}          // <-- index burada gönderiliyor
                                onClick={handleCategorySelection}
                            />
                        ))}

                    </div>
                </div>
            ) : (
                <div>
                    <button className="back-button" onClick={handleBack}></button>
                    {/* Gereksiz boşluk kaldırıldı */}
                </div>
            )}
        </div>
    );
});
