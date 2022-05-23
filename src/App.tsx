import React from "react";
import StartPage from "./startpage/StartPage";
import QuizPage from "./quizpage/QuizPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FinishPage from "../src/quizpage/FinishPage";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/genre-quiz" element={<QuizPage/>}/>
          <Route path="/finish-quiz" element={<FinishPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
