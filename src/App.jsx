import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomePage from './pages/HomePage'; // Eğer doğru yol ise
import TrainPages from './pages/TrainPages'; // Eğer doğru yol ise
import ExamPage from './pages/ExamPage'; // Eğer doğru yol ise
import ProfilePage from './pages/ProfilePage'; // Eğer doğru yol ise
import LessonPage from './pages/LessonPage'; // Eğer doğru yol ise
import CardPage from './pages/CardPage'; // Eğer doğru yol ise
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage key={window.location.pathname} />} />
        <Route path="/train/:testId" element={<TrainPages />} />
        <Route path='/exam' element={<ExamPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/card' element={<CardPage />} />
        <Route path="/lesson/:courseID" element={<LessonPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
