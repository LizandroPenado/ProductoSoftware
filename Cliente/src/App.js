import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Repuesto from "./components/repuesto/Repuesto";

function App() {
  return (
    <main /* className={classes.content} */>
      <Router>
        <Navbar  />
        <div className="pb-5"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/repuesto" component={Repuesto} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
