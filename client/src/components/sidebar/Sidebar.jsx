import { Link } from "react-router-dom";
import ChevronRight from 'baseui/icon/chevron-right'
import "./sidebar.css";
import { useLocation } from "react-router";
import SearchBar from "../searchBar/SearchBar";
import { useContext } from "react";
import { Context } from "../../context/Context";

const routeCreater = (search, category) => {
  if (!category) return "";
  let route = "";
  let advSearch = search.replace('?', "")
  advSearch = advSearch.split('&')
  advSearch = advSearch.filter((s) => s != '')
  let userQuer, catQuer;
  for (let quer of advSearch) {
    if (quer.includes("user")) userQuer = quer.substring(5)
    else if(quer.includes("cat")) catQuer = quer.substring(4)
  }
  if (userQuer && catQuer) {
    route = `/?user=${userQuer}&cat=${category}`
  }
  else if (userQuer) {
    route = `/?user=${userQuer}&cat=${category}`
  }
  else if (catQuer) {
    route = `/?cat=${category}`
  }
  else {
    route = `/?cat=${category}`
  }
  return route;
}

export default function Sidebar({setTitleSearch,cats}) {
  const { search } = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="sidebarTitle">SEARCH OR FILTER POSTS</div>
        <div className="sidebarList">
          <SearchBar setTitleSearch={setTitleSearch} />
        </div>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">CATEGORIES</div>
        <div className="sidebarList">
          {cats?.map((c,index) => (
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
