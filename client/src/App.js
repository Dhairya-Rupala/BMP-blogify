import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Profile from './pages/profile/Profile';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import usePostActions from './hooks/usePostsActions';


function App() {
  // fetching user from the context created
  const { user } = useContext(Context);
  const { state, onAction } = usePostActions();
 

  return (
    <Router>
      <TopBar currentTab={state.currentTab} onAction={onAction} />
      <Switch>
        <Route exact path="/">
          {user ? <Home posts={state.posts} onAction={onAction} /> : <Login />}
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write onAction={onAction} /> : <Register />}</Route>
        <Route path="/settings">{user ? <Profile /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single post={state.singlePost} onAction={onAction} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
