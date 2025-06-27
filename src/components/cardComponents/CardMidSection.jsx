import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../style/cardPage/CardPage.css';
import { fetchCoursesByExamId } from '../../features/Courses/CoursesSlice';
import { clearTopics } from '../../features/Topic/TopicSlice';
import CardCategoryButton from "./CardCategoryButton";
import FlashcardList from "./FlashcardList";

export const CardMidSection = React.memo(() => {
    const dispatch = useDispatch();
    const { courses, fetchStatus } = useSelector(state => state.courses);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchCoursesByExamId());
    }, [dispatch]);

    const handleBack = useCallback(() => {
        dispatch(clearTopics());
        setSelectedCategory(null);
    }, [dispatch]);

    const handleCategorySelection = useCallback((categoryID) => {
        dispatch(clearTopics());
        setSelectedCategory(categoryID);
    }, [dispatch]);

    if (fetchStatus === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (fetchStatus === 'failed') {
        return (
            <div className="text-center mt-5 text-danger">
                Dersler yüklenemedi. Lütfen daha sonra tekrar deneyin.
            </div>
        );
    }

    return (
        <div className="col-12 col-md-6 position-relative">
            {!selectedCategory ? (
                <div className="category-selection">
                    <div className="text-center lesson-title-card">
                        Kartını Sec
                    </div>
                    <div className="category-list-card">
                        {courses.map((category, index) => (
                            <CardCategoryButton
                                key={category.courseID}
                                category={category}
                                index={index}
                                onClick={handleCategorySelection}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <button className="back-button" onClick={handleBack}>
                    </button>
                    <FlashcardList courseId={selectedCategory} />
                </div>
            )}
        </div>
    );
});