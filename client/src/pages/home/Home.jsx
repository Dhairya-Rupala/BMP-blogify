import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useLocation } from "react-router";
import axios from "axios";
import Pagi from "../../components/pagination/Pagi";

const routeCreater = (search, titleSearch) => {
  let route = "/posts" + search;
  if (titleSearch.trim() == "") {
    route = "/posts" + search;
  } else {
    if (search == "") {
      route = "/posts" + search + `?searchTitle=${titleSearch}`;
    } else {
      route = "/posts" + search + `&searchTitle=${titleSearch}`;
    }
  }
  return route;
};

export default function Home({ cats, setTitleSearch, titleSearch }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(routeCreater(search, titleSearch));
      setPosts(res.data);
    };
    fetchPosts();
    return () => {
      setPosts([]);
    };
  }, [search, titleSearch, page]);

  const indexOfLastPost = page * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (nextPage) => {
    setPage(nextPage);
  };

  return (
    <>
      <div className="home">
        <div className="content">
          <Posts posts={currentPosts} />
          <Sidebar setTitleSearch={setTitleSearch} cats={cats} />
        </div>
        <div className="pagination">
          <Pagi
            limit={limit}
            totalPosts={posts.length}
            paginate={paginate}
            page={page}
          />
        </div>
      </div>
    </>
  );
}
