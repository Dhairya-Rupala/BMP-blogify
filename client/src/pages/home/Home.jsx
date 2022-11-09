// HOME component showing the blog posts and the sidebar

import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useLocation } from "react-router";
import axios from 'axios';

const routeCreater = (search, titleSearch) => {
  let route = "/posts"+search;
  if (titleSearch.trim() == "") {
    route = "/posts" + search;
  }
  else {
    if (search == "") {
      route = "/posts" + search + `?searchTitle=${titleSearch}`;
    }
    else {
      route = "/posts" + search + `&searchTitle=${titleSearch}`;
    }
    
  }
  return route;
}


export default function Home({ cats,setTitleSearch,titleSearch }) {
  const [posts, setPosts] = useState([])
  const { search } = useLocation();
  useEffect(() => {
    console.log("Another Request")
    const fetchPosts = async () => {
      const res = await axios.get(routeCreater(search,titleSearch));
      setPosts(res.data);
    };
    fetchPosts();
    return () => {
      setPosts([])
    }
  }, [search,titleSearch]);

  return (
    <>
      <div className="home">
        <Posts posts={posts} />
        <Sidebar setTitleSearch={setTitleSearch} cats={cats} />
      </div>
    </>
  );
}
