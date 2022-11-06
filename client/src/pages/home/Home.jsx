// HOME component showing the blog posts and the sidebar

import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useLocation } from "react-router";

export default function Home({posts,onAction,setSearch,cats}) {
  const { search } = useLocation();
  
  useEffect(() => {
    console.log("Inside home...")
    console.log(search)
    onAction({
      type: "SET_POSTS",
      payload:search
    })
    onAction({
      type: "UPDATE_TAB",
      payload:"HOME"
    })
  }, [search]);

  return (
    <>
      <div className="home">
        <Posts posts={posts} />
        <Sidebar setSearch={setSearch} cats={cats} />
      </div>
    </>
  );
}
