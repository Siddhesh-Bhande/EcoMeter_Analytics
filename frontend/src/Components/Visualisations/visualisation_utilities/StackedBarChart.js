// StackedBarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const StackedBarChart = ({ chartData, options }) => {
  return <Bar data={chartData} options={options} />;
};

export default StackedBarChart;
