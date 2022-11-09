import axios from "axios";
import React from "react";
import "./Comment.css";
export default Comment = ({ comment, setPost, post }) => {
  const handleDelete = async () => {
    const deletePost = await axios.delete(
      `http://localhost:5000/api/posts/comment/${post._id}/${comment._id}`
    );
    setPost(deletePost.data);
  };
  return (
    <div className="SingleComment">
      <div className="topSection">
        <img
          src={`http://localhost:5000/images/${comment.user_id.profilePic}`}
          className="profilePic"
        />
        <span className="userName">{comment.user_id.username}</span>
      </div>
      <div className="bottomSection">
        <p>{comment.cmt_text}</p>
        <div>
          <i
            onClick={handleDelete}
            className="fa fa-trash"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
};