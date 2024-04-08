import React from "react";
import { PolarArea } from "react-chartjs-2";
import "chart.js/auto";

const PolarAreaChart = ({ data }) => {
  // Maps energy sources to colors
  const sourceColors = {
    solar: "orange",
    wind: "green",
    hydro: "blue",
  };

  // Prepare the datasets for consumption and generation
  const consumptionData = data.map((item) => item.consumption);
  const generationData = data.map((item) => item.generation);

  // Apply the appropriate background color for each source in the datasets
  const backgroundColors = data.map((item) => sourceColors[item.energy_source]);

  const chartData = {
    labels: ["Consumption", "Generation"],
    datasets: [
      {
        label: "Energy Consumption",
        data: consumptionData,
        backgroundColor: "red",
        borderWidth: 1,
      },
      {
        label: "Energy Generation",
        data: generationData,
        backgroundColor: "green",
        borderWidth: 1,
      },
    ],
  };

  // Apply background colors for the datasets
  chartData.datasets[0].backgroundColor = backgroundColors; // Colors for consumption
  chartData.datasets[1].backgroundColor = backgroundColors; // Colors for generation

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right", // Place legend on the right
      },
      tooltip: {
        mode: "index",
        intersect: false,
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
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        ticks: {
          display: true,
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return <PolarArea data={chartData} options={options} />;
};

export default PolarAreaChart;
