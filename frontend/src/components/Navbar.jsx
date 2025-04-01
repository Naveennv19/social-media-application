import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">YourApp</h1>
      <input type="text" placeholder="Search" className="search-bar" />
    </nav>
  );
};

export default Navbar;
