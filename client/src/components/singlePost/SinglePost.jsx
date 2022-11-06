import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import createDOMPurify from 'dompurify'
import QuillEditor from "../quillEditor/QuillEditor";
import {Select} from 'baseui/select'

export default function SinglePost({ cats, onAction }) {
  
  // fetching the location 
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // dompurifier 
  const DOMPurify = createDOMPurify(window)

  // multer path for the images 
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  // states for updating the title or the description 
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState([])

  // update Mode flag
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("/posts/" + path);
        console.log(res.data);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setCat([
          {
            label: res.data.categories,
            id: res.data.categories
          }
        ])
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    await onAction({
      type: "DELETE_SINGLE_POST",
      payload: {
        username: user.username,
        id: post._id
      }
    });
    window.location.replace("/");
  };

  const handleUpdate = async () => {
    await onAction({
      type: "UPDATE_SINGLE_POST",
      payload: {
        id: post._id,
        data: {
          username: user.username,
          title,
          desc,
          categories: cat[0].label
        }
      }
    })
    setUpdateMode(false)
    window.location.reload()
  };

  return (
    (post &&
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
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
              {post.username === user?.username && (
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
              <span>
              Author:
              <Link to={`/?user=${post.username}`} className="link">
                <b> {post.username}</b>
                </Link>
              </span>
            </span>
            <span>
              Categorie:{post.categories}
            </span>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? (
            <>
              <div className="updateCatSelectContainer">
                <Select
                  options={cats}
                  value={cat}
                  placeholder="Select Post Category"
                  onChange={params => setCat(params.value)}
                />
              </div>
              <QuillEditor desc={desc} setDesc={setDesc} onSubmit={handleUpdate}
                buttonText="Update"
              />
            </>
          ) : (
            <p className="singlePostDesc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}></p>
          )}
        </div>
      </div>
    )
  )
}