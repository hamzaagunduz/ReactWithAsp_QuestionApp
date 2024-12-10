import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomePage from './pages/HomePage'; // Eğer doğru yol ise
import TrainPages from './pages/TrainPages'; // Eğer doğru yol ise
import ExamPage from './pages/ExamPage'; // Eğer doğru yol ise
// import SpaceTrainPages from './pages/SpaceTrainPages'; // Eğer doğru yol ise
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/train' element={<TrainPages />} />
        <Route path='/exam' element={<ExamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
