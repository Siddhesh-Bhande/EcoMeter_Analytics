// CombinedEnergyDoughnut.js
import React from "react";
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

  return <PolarAreaChart data={energy_data} />;
};

export default CombinedEnergyDoughnut;
