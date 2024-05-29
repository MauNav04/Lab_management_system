import React from 'react';
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

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map((entry, index) => ``),
    datasets: [
      {
        label: 'Horas Transcurridas',
        data: data.map((entry) => entry.HorasTranscurridas),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trabajo completado por el operador',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ChartComponent;
