// Posts component for displaying the cards of the posts 

import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (posts ? 
    <div className="posts">
      {posts.map((p,index) => (
        <Post post={p} key={index} />
      ))}
    </div> :<></>
  );
}
