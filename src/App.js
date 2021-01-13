import { Switch, Route, Link } from "react-router-dom";
import Analytics from "./Components/Analytics";
import Contact from "./Components/Contact";
import { useHistory } from "react-router-dom";
import Landingpage from "./Components/Landingpage";
import React from "react";
import logoImage from "./assests/logo.png";
import logoutImage from "./assests/logout.svg";
import "./App.css";

function App() {
  let history = useHistory();
  function handleLogOut() {
    sessionStorage.setItem("userToken", "");
    sessionStorage.clear();
    history.push("/Landingpage");
  }
  return (
    <div className="main-container">
      <div className="navbar">
        <div className="logo">
          <img src={logoImage} alt={"Algoscale-logo"} />
        </div>
        <div className="user-info">
          <div className="nav-contact-us">
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="nav-analytics">
            <Link to="analytics">Analytics</Link>
          </div>
          <div className="nav-logout">
            <img
              onClick={handleLogOut}
              src={logoutImage}
              width={"40px"}
              height={"40px"}
              alt={"logout"}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <Switch>
          <Route path="/analytics" component={Analytics} />
          <Route path="/contact" component={Contact} />
          <Route exactpath="/" component={Landingpage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
