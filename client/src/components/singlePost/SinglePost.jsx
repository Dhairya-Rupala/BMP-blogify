import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";
import "./singlePost.css";
import createDOMPurify from "dompurify";
import QuillEditor from "../quillEditor/QuillEditor";
import { toaster } from "baseui/toast";
import Comment from "../comment/Comment";
import UserModal from "../userModal/UserModal";
import { Select } from "baseui/select";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

export default function SinglePost({ cats }) {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const onUserInfoClick = async (targetUserName) => {
    try {
      const targetUserInfo = await axios.get(
        `/users/?username=${targetUserName}`
      );
      setIsUserModalOpen(true);
      setUserInfo(targetUserInfo.data[0]);
    } catch (err) {
      toaster.info("Could not fetch the user details");
    }
  };
  // fetching the location
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const url = window.location.href;
  // dompurifier
  const DOMPurify = createDOMPurify(window);

  // multer path for the images
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  // states for updating the title or the description
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState([]);
  const [comment, setComment] = useState("");

  // update Mode flag
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setCat([
          {
            label: res.data.categories,
            id: res.data.categories,
          },
        ]);
      } catch (error) {
        toaster.info(error.response.data);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    const deletePost = async (username, id) => {
      await axios.delete(`/posts/${id}`, {
        data: { username },
      });
    };
    await deletePost(user.username, post._id);
    window.location.replace("/");
  };

  const handleUpdate = async () => {
    const data = {
      username: user.username,
      title,
      desc,
      categories: cat[0].label,
    };

    const updatePost = async (data, id) => {
      await axios.put(`/posts/${id}`, {
        ...data,
      });
    };
    await updatePost(data, post._id);
    setUpdateMode(false);
    setPost({
      ...post,
      username: user.username,
      title,
      desc,
    });
    window.location.reload();
  };

  const handleComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/comment/${path}`,
        {
          cmt_text: comment,
          user_id: user._id,
        }
      );
      setPost(res.data);
      setComment("");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <UserModal
        modalUser={userInfo}
        isOpen={isUserModalOpen}
        setIsOpen={setIsUserModalOpen}
      />
      {post && (
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
                <div className="singlePostEdit">
                  <i
                    onClick={() => {
                      toaster.info("Link copied to clipboard");
                      navigator.clipboard.writeText(url);
                    }}
                    className="singlePostIcon fa-regular fa-clipboard"
                  ></i>
                  <WhatsappShareButton
                    title={user?.username + " shared content from Blogify \n\n"}
                    url={url}
                  >
                    <i className="singlePostIcon fa-brands fa-whatsapp"></i>
                  </WhatsappShareButton>

                  {/* facebook will only work after website deployed */}
                  <FacebookShareButton
                    url={url}
                    quote={user?.username + " shared content from Blogify \n\n"}
                  >
                    <i className="singlePostIcon fa-brands fa-facebook"></i>
                  </FacebookShareButton>

                  {post.username === user?.username && (
                    <>
                      <i
                        className="singlePostIcon far fa-edit"
                        onClick={() => setUpdateMode(true)}
                      ></i>
                      <i
                        className="singlePostIcon far fa-trash-alt"
                        onClick={handleDelete}
                      ></i>
                    </>
                  )}
                </div>
              </h1>
            )}
            <div className="singlePostInfo">
              {!updateMode && (
                <span className="singlePostAuthor">
                  <b>{post.categories}</b> Posted on{" "}
                  <b>{new Date(post.createdAt).toDateString()}</b> by
                  <span onClick={() => onUserInfoClick(post.username)}>
                    <b> {post.username}</b>
                  </span>
                </span>
              )}
              {updateMode && (
                <div className="updateCatContainer">
                  <Select
                    options={cats}
                    value={cat}
                    placeholder="Select category"
                    onChange={({ value }) => setCat(value)}
                  />
                </div>
              )}
            </div>
            {updateMode ? (
              <QuillEditor
                desc={desc}
                setDesc={setDesc}
                onSubmit={handleUpdate}
                buttonText="Update"
              />
            ) : (
              <p
                className="singlePostDesc"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
            )}
          </div>
          {!updateMode && (
            <div className="commentSection" style={{ marginBottom: "5rem" }}>
              <h2 className="commentTitle">
                Comments ({post?.comments?.length}):
              </h2>

              {post &&
                post?.comments?.map((c) => (
                  <Comment
                    userID={user?._id}
                    comment={c}
                    key={c._id}
                    setPost={setPost}
                    post={post}
                  />
                ))}
              {user && (
                <>
                  <input
                    className="commentInput"
                    value={comment}
                    placeholder="Add Comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    type="text"
                  />
                  <button className="commentSubmit" onClick={handleComment}>
                    <i className="fa-solid fa-plus" aria-hidden="true"></i>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
