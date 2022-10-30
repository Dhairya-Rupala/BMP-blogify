import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import createDOMPurify from 'dompurify'
import QuillEditor from "../quillEditor/QuillEditor";

export default function SinglePost({ post, onAction }) {
  
  // fetching the location 
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // dompurifier 
  const DOMPurify = createDOMPurify(window)

  // multer path for the images 
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  // states for updating the title or the description 
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // update Mode flag
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    onAction({
      type: "SET_SINGLE_POST",
      payload: path
    });
    setTitle(post?post.title:"");
    setDesc(post ? post.desc : "");

    // cleaning up the states
    return () => {
      setTitle("")
      setDesc("")
    }
  },[path,post])

  const handleDelete = async () => {
    await onAction({
      type: "DELETE_SINGLE_POST",
      payload: user.username
    });
    window.location.replace("/");
  };

  const handleUpdate = async () => {
    await onAction({
      type: "UPDATE_SINGLE_POST",
      payload: {
        username: user.username,
        title,
        desc
      }
    })
    setUpdateMode(false)
  };

  return (
    post && (
      <div className="singlePost">
      <div className="singlePostWrapper">
        {post && post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post && post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <QuillEditor desc={desc} setDesc={setDesc} onSubmit={handleUpdate}
            buttonText="Update"
          />
        ) : (
          <p className="singlePostDesc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}></p>
        )}
      </div>
    </div>
    )
  )
}