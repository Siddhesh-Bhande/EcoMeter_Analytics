import { useState } from "react";
import SelectVisualisations from "./SelectVisualisations";
import Renewableenergy from "./Renewableenergy";

export default function Visualisations() {
  const [showRETrends, setShowRETrends] = useState(true);
  const [showENVTrends, setShowENVTrends] = useState(false);
  const [showWeatherTrends, setShowWeatherTrends] = useState(false);

  return (
    <div className="visualisations">
      <SelectVisualisations
        setShowENVTrends={setShowENVTrends}
        setShowWeatherTrends={setShowWeatherTrends}
        setShowRETrends={setShowRETrends}
      ></SelectVisualisations>
      {showRETrends && <Renewableenergy></Renewableenergy>}
    </div>
  );
}
