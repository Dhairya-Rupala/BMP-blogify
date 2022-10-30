import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Single({ post, onAction }) {
  console.log(post);
  return (
    <div className="single">
      <SinglePost post={post} onAction={onAction}/>
    </div>
  );
}
