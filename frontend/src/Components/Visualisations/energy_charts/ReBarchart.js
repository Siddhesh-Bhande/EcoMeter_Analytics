// RE_BarChart.js
import React from "react";
import BarChart from "../visualisation_utilities/BarChart";

const RE_barChart = ({ energy_data }) => {
  // Initialize state data
  const states = [...new Set(energy_data.map((data) => data.state))];
  const generationData = [];
  const consumptionData = [];

  states.forEach((state) => {
    const stateData = energy_data.filter((data) => data.state === state);
    const totalGeneration = stateData.reduce(
      (total, current) => total + current.generation,
      0
    );
    const totalConsumption = stateData.reduce(
      (total, current) => total + current.consumption,
      0
    );
    generationData.push(totalGeneration);
    consumptionData.push(totalConsumption);
  });

  // Chart data setup
  const chartData = {
    labels: states,
    datasets: [
      {
        label: "Generation",
        data: generationData,
        backgroundColor: "#60cd41",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Consumption",
        data: consumptionData,
        backgroundColor: "#e34c36",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for chart (includes interactivity and animations settings)
  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Energy Consumption vs Generation by State",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    animation: {
      duration: 1000, // Customize or remove for no animation
    },
    maintainAspectRatio: false,
  };

  return <BarChart chartData={chartData} chartOptions={chartOptions} />;
};

export default RE_barChart;
