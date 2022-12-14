import useGlobalContext, { ContextProvider } from "../../context/Context";
import { useContext } from "react";
import "./posts.css";
import { StyledPost } from "../post/Post";

export default function Posts({ posts, onNotifAction }) {
  const user = useGlobalContext();

  return posts ? (
    <div className="posts">
      {posts &&
        posts.map((p, index) => (
          <StyledPost
            post={p}
            key={index}
            user={user.user}
            onNotifAction={onNotifAction}
          />
        ))}
    </div>
  ) : (
    <></>
  );
}
