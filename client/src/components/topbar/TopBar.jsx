// TOPBAR component

import { useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar({ currentTab,onAction }) {
  
   useEffect(() => {
    const path = window.location.href;
    let targetTab = "HOME";
    if (path.includes("write")) targetTab = "WRITE"
    else if (path.includes("user")) targetTab = "MY POSTS"
    onAction({
      type: "UPDATE_TAB",
      payload: targetTab
    })
  });

  // getting the user and the dispatch from the context
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
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
            <Link className={currentTab=="HOME"?"link active":"link"} to="/">
              HOME
            </Link>
          </li>
          }
          {
            user && <li className="topListItem">
            <Link className={currentTab=="WRITE"?"link active":"link"} to="/write">
              WRITE
            </Link>
          </li>
          }
          {/* If the user is logged in then display teh LOGOUT option */}
          <li className={currentTab=="LOGOUT"?"topListItem active":"topListItem"} onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
          {/* If the user exists then and only then show the my posts option */}
          {user && <li className="topListItem">
            <Link to={`/?user=${user.username}`} className={currentTab=="MY POSTS"?"link active":"link"}>
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
              <Link className={currentTab=="LOGIN"?"link active":"link"} to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className={currentTab=="REGISTER"?"link active":"link"} to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
