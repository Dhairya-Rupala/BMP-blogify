import "./post.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toaster } from 'baseui/toast';
import { useEffect } from "react";

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

export const StyledPost = ({post,user,allTags,onNotifAction}) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [author, setAuthor] = useState(null);
  const handleLikes = async (e) => {
    e.preventDefault();
    const likePost = await axios.put(
      `http://localhost:5000/api/posts/like/${post._id}/${user._id}`,
      {}
    );

    setCurrentPost(likePost.data);
    let targetUser = await axios.get(`http://localhost:5000/api/users/?username=${post?.username}`)
      targetUser = targetUser?.data[0]?._id
      const msg = {
        id: post?._id,
        text: "Liked your post",
        recipients: [targetUser],
        url:`/post/${post?._id}`
      }

      try {
        if (targetUser != user._id && !currentPost.likes.includes(user._id)) {
          onNotifAction({
        type: "CREATE_NOTIFY",
        payload: {
          user,
          msg
        }
      })
        }
      }
      catch (err) {
        toaster.info("Something went wrong")
      }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await axios.get(`/users/?username=${currentPost.username}`);
      setAuthor(userInfo.data[0])
    }
    fetchUserInfo();
  },[post])


  const descr = post && post?.desc?.replace(/<[^>]*>/g, '')
  const PF = "http://localhost:5000/images/";

  return (
    <>
      <Link to={`/post/${currentPost._id}`} className="styledLink">
        <div class="card">
        <div class="card__header">
          <div className="card__image_container">
            {
              currentPost.photo ?
                <img
            src={PF + currentPost.photo
            }
             class="card__image" width="600" />:null
            }
            
          </div>
          
    </div>
    <div class="card__body">
          <span class="tag tag-blue">{currentPost.categories}</span>
          <h4>{currentPost.title}</h4>
          <div className="card_descr">
            {descr}
          </div>
    </div>
    <div class="card__footer">
          <div class="user">
            <div class="user__info">
              {
              author?.profilePic?<img src={PF+author?.profilePic} class="user__image"/>:null
              }
              <div>
                   <h3>{currentPost?.username}</h3>
          <small>{new Date(currentPost.createdAt).toDateString()}</small>
              </div>
            </div>
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
  </div>
      </Link>
    </>
  );


}