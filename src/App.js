
import logo from './logo.svg';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
