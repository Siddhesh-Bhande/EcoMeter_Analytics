// EnergyStackedBarChart.js
import React, { useMemo } from "react";
import StackedBarChart from "../visualisation_utilities/StackedBarChart";

// A simple string hashing function to generate a number based on the energy source name
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 50%, 50%)`;
  return color;
};

const EnergyStackedBarChart = ({ energy_data }) => {
  const processedData = useMemo(() => {
    // Group data by recorded_time, then further by energy_source
    const groupedData = energy_data.reduce(
      (acc, { recorded_time, energy_source, generation }) => {
        // Convert recorded_time to a more friendly format
        const timeKey = new Date(recorded_time).toLocaleString("default", {
          month: "short",
          day: "numeric",
        });

        if (!acc[timeKey]) acc[timeKey] = {};
        if (!acc[timeKey][energy_source]) acc[timeKey][energy_source] = 0;
        acc[timeKey][energy_source] += generation;
        return acc;
      },
      {}
    );

    // Extract the labels and datasets
    const labels = Object.keys(groupedData).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const energySources = [
      ...new Set(energy_data.map((item) => item.energy_source)),
    ];

    const datasets = energySources.map((source) => ({
      label: source,
      data: labels.map((time) =>
        groupedData[time] && groupedData[time][source]
          ? groupedData[time][source]
          : 0
      ),
      backgroundColor: stringToColor(source), // Function call to determine color
    }));
    return {
      labels,
      datasets,
    };
  }, [energy_data]);

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    animation: {
      duration: 1000,
      onProgress: (animation) => {
        const chart = animation.chart;
        chart.rotation += (2 * Math.PI) / 100; // Rotate the chart
      },
      onComplete: () => {
        console.log("Animation complete");
      },
    },
  };

  return <StackedBarChart chartData={processedData} options={options} />;
};

export default EnergyStackedBarChart;
