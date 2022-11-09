import "./post.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Post({ post, user }) {
  const [currentPost, setCurrentPost] = useState(post);
  const handleLikes = async (e) => {
    e.preventDefault();
    const likePost = await axios.put(
      `http://localhost:5000/api/posts/like/${post._id}/${user._id}`,
      {}
    );
    setCurrentPost(likePost.data);
  };


  const descr = post && post?.desc?.replace(/<[^>]*>/g, '')
  const PF = "http://localhost:5000/images/";
  return ( post?
    <Link to={`/post/${currentPost._id}`} className="link">
      <div className="post">
        <div className="postImgContainer">
          <img
            className="postImg"
            src={
              currentPost.photo
                ? PF + currentPost.photo
                : PF + "DAIICT_LOGO.png"
            }
            alt=""
          />
        </div>
        <div className="postInfo">
          <div className="postCats">
              <span className="postCat">{currentPost.categories}</span>
          </div>
          <span className="postTitle">{
            currentPost.title.length>15?currentPost.title.substring(1,13)+"...":currentPost.title
          }</span>
          <span className="postAuthor">
            By:  {currentPost.username}
          </span>
          </div>
        <div className="footerPost">
          <p className="postDesc">{descr}</p>
          <div className="likes">
            <i
              className={`${
                currentPost.likes.includes(user._id) ? "fa-solid" : "fa-regular"
              } fa-heart`}
              onClick={handleLikes}
            ></i>
            {currentPost.likes.length !== 0 && (
              <p>{currentPost.likes.length}</p>
            )}
          </div>
        </div>
      </div>
    </Link> :<></>
  );
}
