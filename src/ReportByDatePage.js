import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { config } from './config'; 

import './ReportByDate.css';
import logo from './logo.png';

// Регистрация модулей ChartJS для работы графиков 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportByDatePage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [groupBy, setGroupBy] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = `${config.API_URL}/report_by_date/?start_date=${startDate}&end_date=${endDate}`;
      if (groupBy !== '') {
        url += `&group_by=${groupBy}`;
      }
      console.log("Fetching report with URL:", url);
      const response = await axios.get(url);
      console.log("Response data:", response.data);
      setReportData(response.data);
    } catch (error) {
      console.error('Ошибка получения отчёта по дате:', error);
    } finally {
      setLoading(false);
    }
  };

  let chartData = null;
  if (reportData) {
    const keys = Object.keys(reportData);
    // Определяем, является ли ответ плоским (без группировки)
    const isFlat = keys.every(key => ["1", "2", "3", "4"].includes(key));

    if (isFlat) {
      // Обработка для плоского ответа
      const labels = ["Общий"];
      chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Потреблено, Вт',
            data: [reportData["1"] || 0],
            backgroundColor: 'rgba(180, 196, 199, 0.8)',
          },
          {
            label: 'Произведено, Вт',
            data: [reportData["2"] || 0],
            backgroundColor: 'rgba(43, 238, 124, 0.8)',
          },
          {
            label: 'Из сети, Вт',
            data: [reportData["3"] || 0],
            backgroundColor: 'rgba(151, 159, 160, 0.8)',
          },
          {
            label: 'В сеть, Вт',
            data: [reportData["4"] || 0],
            backgroundColor: 'rgba(39, 156, 88, 0.8)',
          },
        ],
      };
    } else {
      // Обработка для сгруппированного ответа (например, по датам)
      const labels = Object.keys(reportData).sort();
      chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Потреблено, Вт',
            data: labels.map((label) => reportData[label]["1"] || 0),
            backgroundColor: 'rgba(180, 196, 199, 0.8)',
          },
          {
            label: 'Произведено, Вт',
            data: labels.map((label) => reportData[label]["2"] || 0),
            backgroundColor: 'rgba(43, 238, 124, 0.8)',
          },
          {
            label: 'Из сети, Вт',
            data: labels.map((label) => reportData[label]["3"] || 0),
            backgroundColor: 'rgba(151, 159, 160, 0.8)',
          },
          {
            label: 'В сеть, Вт',
            data: labels.map((label) => reportData[label]["4"] || 0),
            backgroundColor: 'rgba(39, 156, 88, 0.8)',
          },
        ]
      };
    }
  }

  return (
    <div className="container">
      {/* Шапка с логотипом и навигацией */}
      <header className="header">
        <nav className="nav-bar">
          <img src={logo} alt="Energy Monitor Logo" className="logo" />
          <Link to="/" className="nav-button">Главная</Link>
          <Link to="/report-by-date" className="nav-button active">Отчёт по дате</Link>
          <Link to="/predict-report" className="nav-button active">Прогноз по дате</Link>

        </nav>
      </header>

      <main>
        <h1 className="title">Отчёт по дате</h1>
        <form onSubmit={fetchReport} className="form">
          <label>
            Начальная дата:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </label>
          <label>
            Конечная дата:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </label>
          <label>
            Группировка:
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="">Нет</option>
              <option value="day">По дням</option>
              <option value="month">По месяцам</option>
              <option value="year">По годам</option>
            </select>
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : 'Получить отчёт'}
          </button>
        </form>

        {reportData && (
          <div className="chart-container">
            <Bar data={chartData} />
          </div>
        )}
      </main>

      {/* Футер */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ВФС. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default ReportByDatePage;
