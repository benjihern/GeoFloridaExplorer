import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link className={classes.logo} to="/">
          Your Nature Website
        </Link>
        <nav className={classes.menu_bar}>
          <Link className={classes.menu} to="/">
            Home
          </Link>
          <Link className={classes.menu} to="/">
            About
          </Link>
          <Link className={classes.menu} to="/">
            How to Use
          </Link>
          <Link className={classes.menu} to="/">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
