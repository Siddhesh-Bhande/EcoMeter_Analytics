// CombinedEnergyDoughnut.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import PolarAreaChart from "../visualisation_utilities/PolarAreaChart";

const CombinedEnergyDoughnut = ({ energy_data }) => {
  // Initializing data structures
  let consumptionData = {};
  let generationData = {};
  let energySources = [];

  energy_data.forEach((item) => {
    const { energy_source, consumption, generation } = item;
    if (!energySources.includes(energy_source)) {
      energySources.push(energy_source);
    }
    consumptionData[energy_source] =
      (consumptionData[energy_source] || 0) + consumption;
    generationData[energy_source] =
      (generationData[energy_source] || 0) + generation;
  });

  // Generating color arrays
  const consumptionColors = energySources.map(
    (_, index) => `hsla(${(index * 360) / energySources.length}, 70%, 70%, 0.5)`
  );
  const generationColors = energySources.map(
    (_, index) =>
      `hsla(${(index * 360) / energySources.length}, 100%, 50%, 0.5)`
  );

  // Preparing chart data
  const chartData = {
    labels: energySources,
    maintainAspectRatio: false,
    datasets: [
      {
        label: "Consumption",
        data: Object.values(consumptionData),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        borderColor: consumptionColors.map((color) =>
          color.replace("0.5", "1")
        ),
        borderWidth: 4,
        hoverOffset: 4,
      },
      {
        label: "Generation",
        data: Object.values(generationData),
        backgroundColor: [
          "rgb(255, 77, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        borderColor: generationColors.map((color) => color.replace("0.5", "1")),
        borderWidth: 4,
        hoverOffset: 4,
      },
    ],
  };

  // Options for interactivity and animation
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        padding: 4,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== undefined) {
              label += `${context.parsed} kWh`;
            }
            return label;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return <PolarAreaChart data={energy_data} />;
};

export default CombinedEnergyDoughnut;
