// leafletFix.js
import L from 'leaflet';

// Удаляем стандартный метод получения URL иконок
delete L.Icon.Default.prototype._getIconUrl;

// Задаем пути к иконкам через require, чтобы Webpack их правильно подгрузил
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
