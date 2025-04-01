import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>🏠 Home</li>
        <li>🔍 Search</li>
        <li>📷 Reels</li>
        <li>💬 Messages</li>
        <li>❤️ Notifications</li>
        <li>➕ Create</li>
        <li>👤 Profile</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
