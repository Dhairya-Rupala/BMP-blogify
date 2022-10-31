import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChevronRight from 'baseui/icon/chevron-right'
import "./sidebar.css";
import { useLocation } from "react-router";
import SearchBar from "../searchBar/SearchBar";

const routeCreater = (search,category) => {
  let route;
  if (search == "") {
    route = `/?cat=${category.name}`
  }
  else {
    if(search.includes("user"))
      route = search + `&cat=${category.name}`
    else 
      route = `/?cat=${category.name}`  
  }
  return route;
  
}

export default function Sidebar({setSearch}) {
  const [cats, setCats] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  });
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="sidebarTitle">SEARCH OR FILTER POSTS</div>
        <div className="sidebarList">
          <SearchBar setSearch={setSearch} />
        </div>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">CATEGORIES</div>
        <div className="sidebarList">
          {cats.map((c,index) => (
            <Link to={routeCreater(search,c)} className="link" key={index}>
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
