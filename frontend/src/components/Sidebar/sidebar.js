import React, { useState } from "react";
import classes from "./sidebar.module.css";

export default function Sidebar({
  showTrees,
  toggleTreesVisibility,
  showPowerLines,
  togglePower,
  showTranLines,
  toggleTran,
  showParkDist,
  toggleDist,
}) {
  const [searchText, setSearchText] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [categoryStates, setCategoryStates] = useState({
    expandableCategory1: false,
    expandableCategory2: false,
    expandableCategory3: false,
    expandableCategory4: false,
    expandableCategory5: false,
    expandableCategory6: false,
    expandableCategory7: false,
  });

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleCategory = (categoryId) => {
    setCategoryStates({
      ...categoryStates,
      [categoryId]: !categoryStates[categoryId],
    });
  };

  /*const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };*/

  const getCategoryName = (categoryId) => {
    switch (categoryId) {
      case "expandableCategory1":
        return "Land Use and Land Cover";
      case "expandableCategory2":
        return "Vegetation";
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
    <div className={`${classes.sidebar} ${sidebarVisible ? classes.open : ""}`}>
      <div
        className={`${classes.arrow} ${!sidebarVisible ? classes.flipped : ""}`}
        onClick={toggleSidebar}
      >
        <span></span>
      </div>
      <h2>Map Filters</h2>
      {/*<input
        type="text"
        id="searchInput"
        placeholder="Enter Filter"
        value={searchText}
        onChange={handleSearchInputChange}
  />*/}
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
              {categoryId === "expandableCategory1" && (
                <>
                  <li>
                    <div>Lakes</div>
                  </li>
                  <li>
                    <div>Surface Geology</div>
                  </li>
                  <li>
                    <div>Sinkholes</div>
                  </li>
                </>
              )}
              {categoryId === "expandableCategory2" && (
                <>
                  <li>
                    <div
                      onClick={toggleTreesVisibility}
                      className={classes.subcategory}
                    >
                      {showTrees
                        ? "Hide Tree Inventory"
                        : "Show Tree Inventory"}
                    </div>
                  </li>
                </>
              )}
              {categoryId === "expandableCategory4" && (
                <>
                  <li>
                    <div>Nutrient Cycling</div>
                  </li>
                  <li>
                    <div>Soil Formation</div>
                  </li>
                </>
              )}
              {categoryId === "expandableCategory5" && (
                <>
                  <li>
                    <div>Carbon Storage</div>
                  </li>
                  <li>
                    <div>Pollination</div>
                  </li>
                </>
              )}
              {categoryId === "expandableCategory3" && (
                <li>
                  <div>Livestock Production</div>
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
                    <div className={classes.subcategory}>
                      Solid Waste Facilities
                    </div>
                  </li>
                </>
              )}
              {categoryId === "expandableCategory6" && (
                <>
                  <li>
                    <div onClick={togglePower} className={classes.subcategory}>
                      Trail/Greenways
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
                    <div className={classes.subcategory}>Beach Access</div>
                  </li>
                  <li>
                    <div className={classes.subcategory}>Park Trails</div>
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
