// src/config.js

// Определяем префикс в зависимости от сборщика
// Для CRA переменные должны начинаться с REACT_APP_
// Для Vite переменные должны начинаться с VITE_

const getEnv = (key, defaultValue) => {
    // Пытаемся достать из CRA или Vite (process.env или import.meta.env)
    const value = process.env[`REACT_APP_${key}`] || process.env[`VITE_${key}`];
    return value || defaultValue;
};

export const config = {
    // Твоя "схема" с дефолтным значением
    API_URL: getEnv('API_URL', 'https://testa1000-7-vfs-vokzal.hf.space'),
    // Можно добавить другие настройки
    TIMEOUT: 5000,
};