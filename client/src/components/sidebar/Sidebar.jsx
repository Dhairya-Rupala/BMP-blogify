import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from '../searchBar/SearchBar';
import ChevronRight from 'baseui/icon/chevron-right'
import "./sidebar.css";

export default function Sidebar({setPosts}) {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="sidebarTitle">SEARCH OR FILTER POSTS</div>
        <div className="sidebarList">
          <SearchBar setPosts={setPosts} />
        </div>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">CATEGORIES</div>
        <div className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <ChevronRight/>
            <span className="sidebarListItem">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">FOLLOW US</div>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
