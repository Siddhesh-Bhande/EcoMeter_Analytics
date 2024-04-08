import React from "react";
import TimeSeriesChart from "../visualisation_utilities/TimeSeriesChart";
import "chartjs-adapter-date-fns"; // Ensure the adapter is imported

const EnergyTimeSeries = ({ energy_data }) => {
  // Use ISO strings for labels to ensure compatibility with the date adapter
  const labels = energy_data.map((data) =>
    new Date(data.recorded_time).toISOString()
  );

  const consumptionData = energy_data.map((data) => data.consumption);
  const generationData = energy_data.map((data) => data.generation);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Consumption",
        data: consumptionData,
        fill: false,
        borderColor: "#e14c36", // Yellow
        tension: 0.1,
      },
      {
        label: "Generation",
        data: generationData,
        fill: false,
        borderColor: "green", // Green
        tension: 0.1,
      },
    ],
  };

  // Updated options to improve handling of dates and tooltips
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            // Format the tooltip title to display dates in a more friendly format
            return new Date(tooltipItems[0].label).toLocaleDateString();
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day", // Adjusted to 'day' for more granular control, change as needed
          // Format can be adjusted if necessary, depending on your locale and preference
          tooltipFormat: "PP", // Uses date-fns formatting tokens (see date-fns documentation)
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return <TimeSeriesChart data={chartData} options={options} />;
};

export default EnergyTimeSeries;
