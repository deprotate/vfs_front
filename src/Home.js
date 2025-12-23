import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';

import { config } from './config'; 

import './Home.css';
import logo from './logo.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
  const [numberCounts, setNumberCounts] = useState({});

  useEffect(() => {
    fetchNumberCounts();
  }, []);

  const fetchNumberCounts = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/report/`
      );
      setNumberCounts(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const chartData = {
    labels: ['Электроэнергия'],
    datasets: [
      {
        label: 'Энергии потрачено, Вт',
        data: [numberCounts['1'] || 0],
        backgroundColor: 'rgba(180, 196, 199, 0.8)',
      },
      {
        label: 'Энергии получено, Вт',
        data: [numberCounts['2'] || 0],
        backgroundColor: 'rgba(43, 238, 124, 0.8)',
      },
      {
        label: 'Энергии взято из сети, Вт',
        data: [numberCounts['3'] || 0],
        backgroundColor: 'rgba(151, 159, 160, 0.8)',
      },
      {
        label: 'Энергии отдано в сеть, Вт',
        data: [numberCounts['4'] || 0],
        backgroundColor: 'rgba(39, 156, 88, 0.8)',
      },
    ],
  };

  return (
    <div className="container">
      {/* Шапка */}
      <header className="header">
        <nav className="nav-bar">
          <img src={logo} alt="Energy Monitor Logo" className="logo" />
          <Link to="/" className="nav-button active">
            Главная
          </Link>
          <Link to="/report-by-date" className="nav-button">
            Отчёт по дате
          </Link>
          <Link to="/predict-report" className="nav-button">
            Прогноз по дате
          </Link>
        </nav>
      </header>

      {/* Основной контент */}
      <main>
        <h1 className="title">Добро пожаловать!</h1>
        <div className="chart-container">
          <Bar data={chartData} />
        </div>

        <div className="manage-container">
          <Link to="http://192.168.43.39/" className="manage-button">
            Управление
          </Link>
        </div>
      </main>

      {/* Футер */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ВФС. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default Home;
