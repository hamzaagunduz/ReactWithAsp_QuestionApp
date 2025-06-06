import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Routes, Route, BrowserRouter } from "react-router-dom";

// Sayfalar
import HomePage from './pages/HomePage';
import TrainPages from './pages/TrainPages';
import ExamPage from './pages/ExamPage';
import ProfilePage from './pages/ProfilePage';
import LessonPage from './pages/LessonPage';
import CardPage from './pages/CardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AchievementsPage from './pages/AchievementsPage';
import DiamondPage from './pages/DiamondPage';
import AiPage from './pages/AiPage';
import ShopPage from './pages/Shop';
import AnalysisPage from './pages/Analysis';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/admin/AdminDasboardPage';
import Question from './pages/admin/QuestionPage';

import ProtectedRoute from './components/ProtectedRoute'; // Yeni eklenen

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Giriş yapılmadan erişilebilecek sayfalar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/question" element={<Question />} />

        {/* Giriş yapılması gereken sayfalar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage key={window.location.pathname} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/train/:testId"
          element={
            <ProtectedRoute>
              <TrainPages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam"
          element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lesson/:courseID"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card"
          element={
            <ProtectedRoute>
              <CardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <AchievementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diamond"
          element={
            <ProtectedRoute>
              <DiamondPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AiPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <AnalysisPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
