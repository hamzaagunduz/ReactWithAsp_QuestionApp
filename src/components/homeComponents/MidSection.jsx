import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/midsection.css';
import { fetchCoursesByExamId } from '../../features/Courses/CoursesSlice';
import { fetchTopics, clearTopics } from '../../features/Topic/TopicSlice';
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
    if (fetchStatus === 'loading' || !courses.length) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="col-12 col-md-6 position-relative">
            {!selectedCategory ? (
                <div className="category-selection">
                    <div className="text-center lesson-title">Çalışmak İstediğin Dersi Seç</div>
                    <div className="category-list">
                        {courses.map((category) => (
                            <CategoryButton
                                key={category.courseID}
                                category={category}
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
