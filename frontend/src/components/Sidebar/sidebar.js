import React, { useState, useEffect } from "react";
import classes from "./sidebar.module.css";

export default function Sidebar({
  showNatCollection,
  toggleNatColVisibility,
  showPowerLines,
  togglePower,
  showTranLines,
  toggleTran,
  showParkDist,
  toggleDist,
  showParkTrails,
  toggleTrails,
  showSolidWaste,
  toggleSolidWaste,
  showLakes,
  toggleLakes,
  showSurface,
  toggleSurface,
  showSinkhole,
  toggleSinkhole,
  showBridge,
  toggleBridge,
  showTree,
  toggleTree,
  showSoil,
  toggleSoil,
  showRock,
  toggleRock,
  showGreenway,
  toggleGreenway,
  showHealth,
  toggleHealth,
}) {
  // Set all the categories to be hidden initially as well as the sidebar

  const [searchText, setSearchText] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [categoryStates, setCategoryStates] = useState({
    expandableCategory3: false,
    expandableCategory4: false,
    expandableCategory5: false,
    expandableCategory6: false,
    expandableCategory7: false,
  });

  useEffect(() => {
    if (!sidebarVisible) {
      // Close all categories when the sidebar is hidden
      setCategoryStates({
        expandableCategory3: false,
        expandableCategory4: false,
        expandableCategory5: false,
        expandableCategory6: false,
        expandableCategory7: false,
      });
    }
  }, [sidebarVisible]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleCategory = (categoryId) => {
    setCategoryStates({
      ...categoryStates,
      [categoryId]: !categoryStates[categoryId],
    });
  };

  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case "expandableCategory7":
        return "Other";
      case "expandableCategory4":
        return "Supporting Services";
      case "expandableCategory5":
        return "Regulating Services";
      case "expandableCategory3":
        return "Provisioning Services";
      case "expandableCategory6":
        return "Cultural Services";
      default:
        return "";
    }
  };

  const filteredCategories = Object.keys(categoryStates).filter((categoryId) =>
    getCategoryName(categoryId).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    // arrow to toggle sidebar
    <div className={`${classes.sidebar} ${sidebarVisible ? classes.open : ""}`}>
      <div
        className={`${classes.arrow} ${!sidebarVisible ? classes.flipped : ""}`}
        onClick={toggleSidebar}
      >
        <span></span>
      </div>
      <h2>Map Filters</h2>
      <ul className={classes.categorylist}>
        {filteredCategories.map((categoryId) => (
          <li key={categoryId} className={classes.category}>
            <div
              id="expand-btn"
              onClick={() => toggleCategory(categoryId)}
              className={categoryStates[categoryId] ? classes.expanded : ""}
            >
              {getCategoryName(categoryId)}
            </div>
            <ul
              className={`${classes.subcategories} ${
                categoryStates[categoryId] ? classes.show : ""
              }`}
            >
              {categoryId === "expandableCategory6" && (
                <>
                  <li>
                    <div
                      onClick={toggleGreenway}
                      className={classes.subcategory}
                    >
                      {showGreenway
                        ? "Hide Greenway and Trails"
                        : "Show Greenway and Trails"}
                    </div>
                  </li>
                  <li>
                    <div onClick={toggleDist} className={classes.subcategory}>
                      {showParkDist
                        ? "Hide State Park Districts"
                        : "Show State Park Districts"}
                    </div>
                  </li>
                  <li>
                    <div>Beach Access</div>
                  </li>
                  <li>
                    <div onClick={toggleTrails} className={classes.subcategory}>
                      {showParkTrails
                        ? "Hide State Park Trails"
                        : "Show State Park Trails"}
                    </div>
                  </li>
                </>
              )}
              {categoryId === "expandableCategory5" && (
                <>
                  <li>
                    <div
                      onClick={toggleSinkhole}
                      className={classes.subcategory}
                    >
                      {showSinkhole ? "Hide Sinkholes" : "Show Sinkholes"}
                    </div>
                  </li>
                </>
              )}
              {categoryId === "expandableCategory3" && (
                <li>
                  <div onClick={toggleLakes} className={classes.subcategory}>
                    {showLakes ? "Hide Florida Lakes" : "Show Florida Lakes"}
                  </div>
                </li>
              )}
              {categoryId === "expandableCategory7" && (
                <>
                  <li>
                    <div onClick={togglePower} className={classes.subcategory}>
                      {showPowerLines
                        ? "Hide Power Plants"
                        : "Show Power Plants"}
                    </div>
                  </li>
                  <li>
                    <div onClick={toggleTran} className={classes.subcategory}>
                      {showTranLines
                        ? "Hide Transmission Lines"
                        : "Show Transmission Lines"}
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={toggleSolidWaste}
                      className={classes.subcategory}
                    >
                      {showSolidWaste
                        ? "Hide Solid Waste Facilities"
                        : "Show Solid Waste Facilities"}
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={toggleNatColVisibility}
                      className={classes.subcategory}
                    >
                      {showNatCollection
                        ? "Hide Natural Collection Areas"
                        : "Show Natural Collection Areas"}
                    </div>
                  </li>
                  <li>
                    <div onClick={toggleHealth} className={classes.subcategory}>
                      {showHealth
                        ? "Hide Health Departments"
                        : "Show Health Departments"}
                    </div>
                  </li>
                  <li>
                    <div onClick={toggleBridge} className={classes.subcategory}>
                      {showBridge ? "Hide Bridges" : "Show Bridges"}
                    </div>
                  </li>
                </>
              )}
              {categoryId === "expandableCategory4" && (
                <>
                  <li>
                    <div onClick={toggleTree} className={classes.subcategory}>
                      {showTree ? "Hide Tree Inventory" : "Show Tree Inventory"}
                    </div>
                  </li>
                  <li>
                    <div onClick={toggleSoil} className={classes.subcategory}>
                      {showSoil ? "Hide Soil Formation" : "Show Soil Formation"}
                    </div>
                  </li>
                  <li>
                    <div onClick={toggleRock} className={classes.subcategory}>
                      {showRock
                        ? "Hide Rock and Sediment Distribution"
                        : "Show Rock and Sediment Distribution"}
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={toggleSurface}
                      className={classes.subcategory}
                    >
                      {showSurface
                        ? "Hide Surface Geology"
                        : "Show Surface Geology"}
                    </div>
                  </li>
                </>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
