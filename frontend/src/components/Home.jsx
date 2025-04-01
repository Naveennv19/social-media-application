import React from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import MainFeed from "./MainFeed";
import Navbar from "./NavBar";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <MainFeed />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};