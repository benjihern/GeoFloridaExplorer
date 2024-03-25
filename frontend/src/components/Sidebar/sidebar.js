import React, { useState } from "react";
import classes from "./sidebar.module.css";

export default function Sidebar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [categoryStates, setCategoryStates] = useState({});

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleCategory = (categoryId) => {
    setCategoryStates({
      ...categoryStates,
      [categoryId]: !categoryStates[categoryId],
    });
  };

  return (
    <div className={`${classes.sidebar} ${sidebarVisible ? classes.open : ""}`}>
      <div
        className={`${classes.arrow} ${!sidebarVisible ? classes.flipped : ""}`}
        onClick={toggleSidebar}
      >
        <span></span>
      </div>
      <h2>Categories</h2>
      <input type="text" id="searchInput" placeholder="Enter Category" />
      <ul className={classes.categorylist}>
        <li className={classes.category}>
          <div
            id="expand-btn"
            onClick={() => toggleCategory("expandableCategory1")}
            className={
              categoryStates["expandableCategory1"] ? classes.expanded : ""
            }
          >
            Expandable Category 1
          </div>
          <ul
            className={`${classes.subcategories} ${
              categoryStates["expandableCategory1"] ? classes.show : ""
            }`}
          >
            <li>
              <div>Subcategory 1</div>
            </li>
            <li>
              <div>Subcategory 2</div>
            </li>
            <li>
              <div>Subcategory 3</div>
            </li>
          </ul>
        </li>
        <li className={classes.category}>
          <div
            id="expand-btn"
            onClick={() => toggleCategory("expandableCategory2")}
            className={
              categoryStates["expandableCategory2"] ? classes.expanded : ""
            }
          >
            Expandable Category 2
          </div>
          <ul
            className={`${classes.subcategories} ${
              categoryStates["expandableCategory2"] ? classes.show : ""
            }`}
          >
            <li>
              <div>Subcategory 1</div>
            </li>
            <li>
              <div>Subcategory 2</div>
            </li>
            <li>
              <div>Subcategory 3</div>
            </li>
          </ul>
        </li>
        <li className={classes.category}>
          <div
            id="expand-btn"
            onClick={() => toggleCategory("expandableCategory3")}
            className={
              categoryStates["expandableCategory3"] ? classes.expanded : ""
            }
          >
            Expandable Category 3
          </div>
          <ul
            className={`${classes.subcategories} ${
              categoryStates["expandableCategory3"] ? classes.show : ""
            }`}
          >
            <li>
              <div>Subcategory 1</div>
            </li>
            <li>
              <div>Subcategory 2</div>
            </li>
            <li>
              <div>Subcategory 3</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
