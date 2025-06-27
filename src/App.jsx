import { Suspense, lazy } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Navigate } from 'react-router-dom';

import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute'; // ekleyin
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

//Policy
const PrivacyPolicy = lazy(() => import('./pages/policy/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/policy/TermsOfUse'));
const CookiePolicy = lazy(() => import('./pages/policy/CookiePolicy'));

// /Company
const AboutUs = lazy(() => import('./pages/company/AboutUs'));
const Careers = lazy(() => import('./pages/company/Careers'));
const ContactUs = lazy(() => import('./pages/company/ContactUs'));
const Partnerships = lazy(() => import('./pages/company/Partnerships'));

function App() {
  return (
    <BrowserRouter basename="">
      <Suspense>
        <Routes>
          {/* Giriş yapılmadan erişilebilecek sayfalar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/pay" element={<Payment />} />






          {/* Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* Company */}

          <Route path="/hakkimizda" element={<AboutUs />} />
          <Route path="/kariyer" element={<Careers />} />
          <Route path="/iletisim" element={<ContactUs />} />
          <Route path="/ortakliklar" element={<Partnerships />} />

          {/* Giriş yapılması gereken sayfalar Admin */}

          <Route
            path="admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />


          <Route
            path="admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/question"
            element={
              <AdminProtectedRoute>
                <AdminQuestion />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/user"
            element={
              <AdminProtectedRoute>
                <AdminUser />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/shop"
            element={
              <AdminProtectedRoute>
                <AdminShop />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettings />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/exam"
            element={
              <AdminProtectedRoute>
                <AdminExam />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/profile"
            element={
              <AdminProtectedRoute>
                <AdminProfile />
              </AdminProtectedRoute>
            }
          />

          {/* Giriş yapılması gereken sayfalar Kullanııc */}
          <Route
            path="/home"
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

          {/* Bulunamayan sayfa */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
