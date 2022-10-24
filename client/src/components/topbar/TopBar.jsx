// TOPBAR component

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {

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
