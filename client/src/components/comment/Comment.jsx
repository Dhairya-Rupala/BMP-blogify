import axios from "axios";
import React from "react";
import "./Comment.css";
import { useState } from "react";
import UserModal from "../userModal/UserModal";
export default Comment = ({ comment, setPost, post }) => {

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userInfo,setUserInfo] = useState(null)
  const onUserInfoClick = async (targetUserName) => {
    try {
      const targetUserInfo = await axios.get(`/users/?username=${targetUserName}`)
      setIsUserModalOpen(true)
      setUserInfo(targetUserInfo.data[0])
    }
    catch (err) {
      toaster.info("Could not fetch the user details")
    }
  }




  const handleDelete = async () => {
    const deletePost = await axios.delete(
      `http://localhost:5000/api/posts/comment/${post._id}/${comment._id}`
    );
    setPost(deletePost.data);
  };
  return (
    <>
      <UserModal modalUser={userInfo} isOpen={isUserModalOpen} setIsOpen={setIsUserModalOpen}/>
      <div className="SingleComment">
      <div className="topSection">
        <img
          src={comment.user_id.profilePic ? `http://localhost:5000/images/${comment.user_id.profilePic}` : "http://localhost:5000/images/DAIICT_LOGO.png"}
          className="profilePic"
          onClick={() => onUserInfoClick(comment.user_id.username)}
        />
        <span className="userName"
          onClick={() => onUserInfoClick(comment.user_id.username)}
        >{comment.user_id.username}</span>
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
    </>
  );
};