// App.js
import React from 'react';
// Импортируем ОБА роутера
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import ReportByDatePage from './ReportByDatePage';
import PredictReport from './PredictReport';

function App() {
  // Проверяем спец. переменную, которую мы зададим при билде
  // Если это GH Pages, используем HashRouter, иначе (Netlify/Local) - BrowserRouter
  const Router = process.env.REACT_APP_ROUTER_TYPE === 'hash' ? HashRouter : BrowserRouter;
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



// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';