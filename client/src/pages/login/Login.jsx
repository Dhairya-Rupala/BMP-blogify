//libs
import axios from "axios";
import { useContext, useRef } from "react";
import {toaster} from 'baseui/toast';
//context and hooks
import { Context } from "../../context/Context";
//styles
import "./login.css";

export default function Login() {

  // storing the username and the password in the ref 
  const userRef = useRef();
  const passwordRef = useRef();

  // from the context getting the dispatch and the isFetching
  const { dispatch, isFetching } = useContext(Context);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res.data)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toaster.info("Successfully Logged In")
      // window.location.replace("");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      toaster.info("Please check the login details")
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="labels">Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label className='labels'>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
    </div>
  );
}
