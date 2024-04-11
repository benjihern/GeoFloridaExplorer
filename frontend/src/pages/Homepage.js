import React, { useState } from "react";
import Sidebar from "../components/Sidebar/sidebar";
import Map from "../components/Map/map";

export default function Homepage() {
  const [showTrees, setShowTrees] = useState(false);

  const toggleTreesVisibility = () => {
    setShowTrees(!showTrees);
  };

  const [showPowerLines, setShowPowerLines] = useState(false);

  const togglePower = () => {
    console.log(showPowerLines);
    setShowPowerLines(!showPowerLines);
  };

  const [showTranLines, setShowTranLines] = useState(false);

  const toggleTran = () => {
    setShowTranLines(!showTranLines);
  };

  const [showParkDist, setShowParkDist] = useState(false);

  const toggleDist = () => {
    setShowParkDist(!showParkDist);
  };

  return (
    <div>
      <Sidebar
        showTrees={showTrees}
        toggleTreesVisibility={toggleTreesVisibility}
        showPowerLines={showPowerLines}
        togglePower={togglePower}
        showTranLines={showTranLines}
        toggleTran={toggleTran}
        showParkDist={showParkDist}
        toggleDist={toggleDist}
      />
      <Map
        showTrees={showTrees}
        showPowerLines={showPowerLines}
        showTranLines={showTranLines}
        showParkDist={showParkDist}
      />
    </div>
  );
}
