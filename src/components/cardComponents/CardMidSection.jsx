import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../style/midsection.css';
import { fetchCoursesByExamId } from '../../features/Courses/CoursesSlice';
import { fetchAppUser } from '../../features/AppUser/AppUserSlice';
import { clearTopics } from '../../features/Topic/TopicSlice';
import { fetchFavoriteFlashcardsByCourse } from '../../features/FlashCard/FlashCardSlice'; // yeni thunk'ı buraya ekliyoruz

import CardCategoryButton from "./CardCategoryButton";
import FlashcardList from "./FlashcardList";

export const CardMidSection = React.memo(() => {
    const dispatch = useDispatch();

    const { courses } = useSelector(state => state.courses);
    const { user, status: userStatus } = useSelector(state => state.appUser);
    const { favoriteFlashCards, favoriteStatus } = useSelector(state => state.flashCard);

    const [selectedCategory, setSelectedCategory] = useState(null);

    // Kullanıcıyı al
    useEffect(() => {
        if (!user) {
            dispatch(fetchAppUser());
        }
    }, [dispatch, user]);

    // Kullanıcının sınavına göre dersleri al
    useEffect(() => {
        if (userStatus === "succeeded" && user?.examID) {
            dispatch(fetchCoursesByExamId(user.examID));
        }
    }, [userStatus, user?.examID, dispatch]);

    const handleBack = useCallback(() => {
        dispatch(clearTopics());
        setSelectedCategory(null);
    }, [dispatch]);

    // Kategori seçildiğinde çalışacak
    const handleCategorySelection = useCallback((categoryID) => {
        dispatch(clearTopics());
        setSelectedCategory(categoryID);
        dispatch(fetchFavoriteFlashcardsByCourse({ courseId: categoryID }));
    }, [dispatch]);

    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light position-relative">
            {!selectedCategory ? (
                <div className="category-selection">
                    <div className="text-center lesson-title">
                        Hangi Dersin Ezber Kartını Görmek İstersin
                    </div>
                    <div className="category-list">
                        {courses.map((category) => (
                            <CardCategoryButton
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

                    {favoriteStatus === 'succeeded' && (
                        <FlashcardList flashcards={favoriteFlashCards} />
                    )}

                </div>
            )}
        </div>
    );
});
