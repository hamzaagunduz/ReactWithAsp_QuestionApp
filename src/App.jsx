import React, { Suspense, lazy } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load edilen sayfalar
const HomePage = lazy(() => import('./pages/HomePage'));
const TrainPages = lazy(() => import('./pages/TrainPages'));
const ExamPage = lazy(() => import('./pages/ExamPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const CardPage = lazy(() => import('./pages/CardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const DiamondPage = lazy(() => import('./pages/DiamondPage'));
const AiPage = lazy(() => import('./pages/AiPage'));
const ShopPage = lazy(() => import('./pages/Shop'));
const AnalysisPage = lazy(() => import('./pages/Analysis'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Payment = lazy(() => import('./pages/Payment'));

// Admin sayfaları
const AdminDashboard = lazy(() => import('./pages/admin/AdminDasboardPage'));
const AdminQuestion = lazy(() => import('./pages/admin/QuestionPage'));
const AdminUser = lazy(() => import('./pages/admin/UserManagementPage'));
const AdminShop = lazy(() => import('./pages/admin/ShopManagementPage'));
const AdminSettings = lazy(() => import('./pages/admin/SiteSettingsPage'));
const AdminExam = lazy(() => import('./pages/admin/ExamsManagementPage'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <BrowserRouter basename="">
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center col-md-6" style={{ minHeight: "100vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>}>
        <Routes>
          {/* Giriş yapılmadan erişilebilecek sayfalar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/pay" element={<Payment />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/question" element={<AdminQuestion />} />
          <Route path="admin/user" element={<AdminUser />} />
          <Route path="admin/shop" element={<AdminShop />} />
          <Route path="admin/settings" element={<AdminSettings />} />
          <Route path="admin/exam" element={<AdminExam />} />
          <Route path="admin/profile" element={<AdminProfile />} />

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

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
