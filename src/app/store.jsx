// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import examReducer from '../features/Exam/ExamSlice';  // Exam slice'ı import ediyoruz
import appUserReducer from '../features/AppUser/AppUserSlice';  // AppUser slice'ı import ediyoruz
import coursesReducer from '../features/Courses/CoursesSlice';  // AppUser slice'ı import ediyoruz
import topicReducer from '../features/Topic/TopicSlice';  // AppUser slice'ı import ediyoruz
import questioncReducer from '../features/Question/QuestionSlice';  // AppUser slice'ı import ediyoruz
import flashCardReducer from '../features/FlashCard/FlashCardSlice';  // AppUser slice'ı import ediyoruz
import layoutReducer from '../features/Layout/LayoutSlice';  // AppUser slice'ı import ediyoruz
import statisticsReducer from '../features/Statistics/StatisticsSlice';  // AppUser slice'ı import ediyoruz
import dailyMissionReducer from '../features/DailyMission/DailyMissionSlice';
import signalrReducer from '../features/Signalr/SignalrSlice';
import purchaseReducer from '../features/Purchase/PurchaseSlice';
import shopReducer from '../features/Shop/ShopSlice';
import analiysisReducer from '../features/Analysis/AnalysisSlice';
import performanceReducer from '../features/Performance/PerformanceSlice';
import RegisterReducer from '../features/Register/RegisterSlice';
import TestGroupReducer from '../features/TestGroup/TestGroupSlice';


const store = configureStore({
    reducer: {
        exam: examReducer,  // Exam slice'ını store'a ekliyoruz
        appUser: appUserReducer,  // AppUser slice'ını store'a ekliyoruz
        courses: coursesReducer,  // AppUser slice'ını store'a ekliyoruz
        topic: topicReducer,  // AppUser slice'ını store'a ekliyoruz
        question: questioncReducer,  // AppUser slice'ını store'a ekliyoruz
        flashCard: flashCardReducer,
        layout: layoutReducer,
        statistic: statisticsReducer,
        dailyMission: dailyMissionReducer,
        signalr: signalrReducer, // reducer'ı burada tanıt
        purchase: purchaseReducer,
        shop: shopReducer,
        analysis: analiysisReducer,
        performance: performanceReducer,
        register: RegisterReducer,
        testGroup: TestGroupReducer


    },
});

export default store;  // Store'u default olarak dışa aktarıyoruz
