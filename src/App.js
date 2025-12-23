// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './Home';
import ReportByDatePage from './ReportByDatePage';
import PredictReport from './PredictReport'
function App() {
  return (
    <Router>
      <div>
        {/* <nav style={{ margin: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Главная</Link>
          <Link to="/report-by-date">Отчёт по дате</Link>
          <Link to="/predict-report">Прогноз по дате</Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-by-date" element={<ReportByDatePage />} />
          <Route path="/predict-report" element={<PredictReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
