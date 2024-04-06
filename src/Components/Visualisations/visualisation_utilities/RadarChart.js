// RadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";

const RadarChart = ({ data, options }) => {
  return <Radar data={data} options={options} />;
};

export default RadarChart;
