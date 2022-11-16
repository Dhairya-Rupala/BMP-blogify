// components 
import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Profile from './pages/profile/Profile';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// libs 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";

// context and hooks
import { Context } from "./context/Context";
import usePostActions from './hooks/usePostsActions';


function App() {
  
  // fetching user and calling postActions hooks
  const { user } = useContext(Context);
  const { state,setTitleSearch } = usePostActions();

  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          {user ? <Home cats={state.cats} setTitleSearch={setTitleSearch} titleSearch={state.titleSearch} /> : <Login />}
        </Route>
        <Route path="/register">{user ? <Home titleSearch={state.titleSearch} setTitleSearch={setTitleSearch} cats={state.cats}  /> : <Register />}</Route>
        <Route path="/login">{user ? <Home titleSearch={state.titleSearch} setTitleSearch={setTitleSearch} cats={state.cats} /> : <Login />}</Route>
        <Route path="/write">{user ? <Write cats={state.cats} allTags={state.allTags} /> : <Register />}</Route>
        <Route path="/settings">{user ? <Profile allTags={state.allTags} /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single cats={state.cats} allTags={state.allTags} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
