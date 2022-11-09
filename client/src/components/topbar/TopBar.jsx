// libs
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";
// styles 
import "./topbar.css";



// helper function for creating the dynamic route 
const routeCreater = (search, username) => {
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
    route = `/?user=${username}&cat=${catQuer}`
  }
  else if (userQuer) {
    route = `/?user=${username}`
  }
  else if (catQuer) {
    route = `/?cat=${catQuer}&user=${username}`
  }
  else {
    route = `/?user=${username}`
  }
  return route;
}

export default function TopBar({ onAction }) {
  
  // fetching the search query from the current URL 
  const { search } = useLocation();
  // fetching the user and dispatch from the context 
  const { user, dispatch } = useContext(Context);

  // path for the multer storage 
  const PF = "http://localhost:5000/images/"

  // function handling logout 
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user")
  };

  return (
    <div className="top">
      <div className="topLeft">
        <h1>Blogify</h1>
      </div>
      <div className="topCenter">
        <ul className="topList">
          {
            user && <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          }
          {
            user && <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          }
          {/* If the user is logged in then display teh LOGOUT option */}
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
          {/* If the user exists then and only then show the my posts option */}
          {user && <li className="topListItem">
            <Link to={routeCreater(search,user.username)} className="link">
              MY POSTS
            </Link>
          </li>
          }
        </ul>
      </div>
      {/* If the user is there then and only then show the settings
          else show the LOGIN or REGISTER buttons
       */}
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={user.profilePic?PF+user.profilePic:PF+"DAIICT_LOGO.png"} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
