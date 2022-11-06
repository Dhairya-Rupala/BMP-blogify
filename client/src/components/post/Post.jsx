import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const descr = post && post.desc.replace(/<[^>]*>/g, '')
  const PF = "http://localhost:5000/images/";
  return ( post?
    <Link to={`/post/${post._id}`} className="link">
      <div className="post">
      <div className="postImgContainer">
        <img className="postImg" src={post.photo?PF + post.photo:PF+"DAIICT_LOGO.png"} alt="" />
      </div>
      <div className="postInfo">
          <span className="postTitle">{post.title}</span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{descr}</p>
    </div>
    </Link> :<></>
  );
}
