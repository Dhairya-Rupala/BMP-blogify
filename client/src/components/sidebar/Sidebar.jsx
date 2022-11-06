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
    route = `/?cat=${category}`
  }
  else {
    if(search.includes("user"))
      route = search + `&cat=${category}`
    else 
      route = `/?cat=${category}`  
  }
  return route;
  
}

export default function Sidebar({setSearch,cats}) {
  const { search } = useLocation();
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
            <Link to={routeCreater(search,c.label)} className="link" key={index}>
              <ChevronRight/>
            <span className="sidebarListItem">{c.label}</span>
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
