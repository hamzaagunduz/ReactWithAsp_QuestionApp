// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import examReducer from '../features/Exam/ExamSlice';  // Exam slice'ı import ediyoruz
import appUserReducer from '../features/AppUser/AppUserSlice';  // AppUser slice'ı import ediyoruz
import coursesReducer from '../features/Courses/CoursesSlice';  // AppUser slice'ı import ediyoruz
import topicReducer from '../features/Topic/TopicSlice';  // AppUser slice'ı import ediyoruz

const store = configureStore({
    reducer: {
        exam: examReducer,  // Exam slice'ını store'a ekliyoruz
        appUser: appUserReducer,  // AppUser slice'ını store'a ekliyoruz
        courses: coursesReducer,  // AppUser slice'ını store'a ekliyoruz
        topic: topicReducer,  // AppUser slice'ını store'a ekliyoruz
    },
});

export default store;  // Store'u default olarak dışa aktarıyoruz
