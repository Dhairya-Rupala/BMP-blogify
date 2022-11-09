// Posts component for displaying the cards of the posts 
import useGlobalContext, { ContextProvider } from "../../context/Context";
import { useContext } from "react";
import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  const user = useGlobalContext();
  
  return (posts ? 
    <div className="posts">
      {posts &&
        posts.map((p, index) => <Post post={p} key={index} user={user.user} />)}
    </div> :<></>
  );
}
