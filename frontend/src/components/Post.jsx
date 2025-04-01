import React from "react";
import LikeButton from "./LikeButton";
import "./Post.css";

const Post = () => {
  return (
    <div className="post">
      <h3>memvoid_edits</h3>
      <img src="post-image.jpg" alt="Post" className="post-img" />
      <LikeButton initialLikes={117} />
    </div>
  );
};

export default Post;
