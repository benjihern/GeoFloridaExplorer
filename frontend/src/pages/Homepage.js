import React, { useState } from "react";
import Sidebar from "../components/Sidebar/sidebar";
import Map from "../components/Map/map";

export default function Homepage() {
  // set natural collection states -------------------------------- //
  const [showNatCollection, setShowNatCollection] = useState(false);

  const toggleNatColVisibility = () => {
    setShowNatCollection(!showNatCollection);
  };

  // set natural collection states -------------------------------- //

  // set power plant states --------------------------------------- //
  const [showPowerLines, setShowPowerLines] = useState(false);

  const togglePower = () => {
    console.log(showPowerLines);
    setShowPowerLines(!showPowerLines);
  };

  // set power plant states --------------------------------------- //

  // set tran lines states --------------------------------------- //

  const [showTranLines, setShowTranLines] = useState(false);

  const toggleTran = () => {
    setShowTranLines(!showTranLines);
  };

  // set power lines states --------------------------------------- //

  // set park district states ------------------------------------- //

  const [showParkDist, setShowParkDist] = useState(false);

  const toggleDist = () => {
    setShowParkDist(!showParkDist);
  };

  // set park district states ------------------------------------- //

  // set park trails states --------------------------------------- //

  const [showParkTrails, setShowParkTrails] = useState(false);

  const toggleTrails = () => {
    setShowParkTrails(!showParkTrails);
  };

  // set park trails states --------------------------------------- //

  // set solid waste states --------------------------------------- //

  const [showSolidWaste, setShowSolidWaste] = useState(false);

  const toggleSolidWaste = () => {
    setShowSolidWaste(!showSolidWaste);
  };

  // set solid waste states --------------------------------------- //

  // set florida lake states -------------------------------------- //

  const [showLakes, setShowLakes] = useState(false);

  const toggleLakes = () => {
    setShowLakes(!showLakes);
  };

  // set florida lake states -------------------------------------- //

  // set surface geology states ----------------------------------- //

  const [showSurface, setShowSurface] = useState(false);

  const toggleSurface = () => {
    setShowSurface(!showSurface);
  };

  // set surface geology states ----------------------------------- //

  return (
    <div>
      <Sidebar
        showNatCollection={showNatCollection}
        toggleNatColVisibility={toggleNatColVisibility}
        showPowerLines={showPowerLines}
        togglePower={togglePower}
        showTranLines={showTranLines}
        toggleTran={toggleTran}
        showParkDist={showParkDist}
        toggleDist={toggleDist}
        showParkTrails={showParkTrails}
        toggleTrails={toggleTrails}
        showSolidWaste={showSolidWaste}
        toggleSolidWaste={toggleSolidWaste}
        showLakes={showLakes}
        toggleLakes={toggleLakes}
        showSurface={showSurface}
        toggleSurface={toggleSurface}
      />
      <Map
        showNatCollection={showNatCollection}
        showPowerLines={showPowerLines}
        showTranLines={showTranLines}
        showParkDist={showParkDist}
        showParkTrails={showParkTrails}
        showSolidWaste={showSolidWaste}
        showLakes={showLakes}
        showSurface={showSurface}
      />
    </div>
  );
}
