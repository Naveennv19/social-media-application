import React from "react";
import Post from "./Post";
import Stories from "./Stories";
import "./MainFeed.css";

const MainFeed = () => {
  return (
    <div className="main-feed">
      <Stories />
      <Post />
    </div>
  );
};

export default MainFeed;
