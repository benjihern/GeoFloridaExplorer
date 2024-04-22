import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link className={classes.logo} to="/">
          GeoFloridaExplorer
        </Link>
        <nav className={classes.menu_bar}>
          <Link className={classes.menu} to="/">
            Home
          </Link>
          <Link className={classes.menu} to="/about">
            About
          </Link>
          <Link className={classes.menu} to="/how">
            How to Use
          </Link>
          <Link className={classes.menu} to="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
