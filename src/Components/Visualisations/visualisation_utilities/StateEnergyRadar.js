import React, { useMemo } from "react";
import RadarChart from "./RadarChart";

const StateEnergyRadar = ({ energy_data }) => {
  const stateMetrics = useMemo(() => {
    // Initialize an object to hold state metrics
    const metrics = {};

    // Aggregate data by state
    energy_data.forEach(({ state, consumption, generation, energy_source }) => {
      if (!metrics[state]) {
        metrics[state] = {
          totalConsumption: 0,
          totalGeneration: 0,
          energySources: new Set(),
        };
      }
      metrics[state].totalConsumption += consumption;
      metrics[state].totalGeneration += generation;
      metrics[state].energySources.add(energy_source);
    });

    // Convert the Set of energy sources into a diversity count
    Object.keys(metrics).forEach((state) => {
      metrics[state].diversity = metrics[state].energySources.size;
      delete metrics[state].energySources; // Clean up - no longer needed
    });

    return metrics;
  }, [energy_data]);

  // Building the datasets for the radar chart
  const chartData = useMemo(() => {
    const labels = [
      "Total Consumption",
      "Total Generation",
      "Diversity of Energy Sources",
    ];
    const datasets = Object.keys(stateMetrics).map((state, index) => {
      // Pick colors or generate dynamically
      const backgroundColor = `rgba(${255 - index * 30}, ${
        99 + index * 30
      }, 132, 0.2)`;
      const borderColor = `rgba(${255 - index * 30}, ${
        99 + index * 30
      }, 132, 1)`;

      // Compile the metrics for each state into a dataset
      return {
        label: state,
        data: [
          stateMetrics[state].totalConsumption,
          stateMetrics[state].totalGeneration,
          stateMetrics[state].diversity,
        ],
        backgroundColor,
        borderColor,
        borderWidth: 2,
      };
    });

    return { labels, datasets };
  }, [stateMetrics]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Added to allow adjusting the chart size via container
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        // suggestedMax should be determined dynamically or set high enough to accommodate all data
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          padding: 5,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;
            const metric = context.label;
            return `${label}: ${metric} - ${value}`;
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };

  return (
    <div className="w-full h-full">
      {" "}
      {/* Full size of the container */}
      <RadarChart data={chartData} options={options} />
    </div>
  );
};

export default StateEnergyRadar;
