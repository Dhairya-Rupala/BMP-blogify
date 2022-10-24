// HOME component showing the blog posts and the sidebar

import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {

  // state for storing all the posts 
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search,posts]);

  return (
    <>
      <div className="home">
        <Posts posts={posts} />
        <Sidebar setPosts={setPosts} />
      </div>
    </>
  );
}
