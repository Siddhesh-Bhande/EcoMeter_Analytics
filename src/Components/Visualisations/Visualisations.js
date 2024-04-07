import { useState } from "react";
import SelectVisualisations from "./SelectVisualisations";
import Renewableenergy from "./Renewableenergy";
import DatePickerModal from "./DatePickerModal";

export default function Visualisations() {
  return (
    <div className="visualisations">
      <div className="text-4xl text-emerald-500 font-bold mt-4 text-center">
        Renewable Energy Trends
      </div>
      <div className="">
        <Renewableenergy></Renewableenergy>
      </div>
    </div>
  );
}
