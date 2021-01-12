import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

//components

import Landing from "./pages/landing.js";

export const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path ="/register" component={Register} />
      </Router>
    );
  }
}

export default App;
