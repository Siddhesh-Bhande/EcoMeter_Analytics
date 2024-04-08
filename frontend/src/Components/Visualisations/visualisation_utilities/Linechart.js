import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
// Import Chart.js parts if not already done
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Linechart = ({ data, data2, easing }) => {
  const config = {
    type: "line",
    data: {
      datasets: [
        {
          borderColor: "red",
          borderWidth: 1,
          pointRadius: 0,
          data: data,
        },
        {
          borderColor: "blue",
          borderWidth: 1,
          pointRadius: 0,
          data: data2,
        },
      ],
    },
    options: {
      animation: easing.animation,
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: false,
        title: {
          display: true,
          text: easing.name,
        },
      },
      scales: {
        x: {
          type: "linear",
        },
        y: {
          type: "linear",
        },
      },
    },
  };

  return <Line data={config.data} options={config.options} />;
};

export default Linechart;
