import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

//components
import App from "./App.js";
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Landing from "./pages/landing";
import Header from "./components/Header"

import OnlyAuthRoute from "./util/OnlyAuthRoute";
import OnlyNotAuthRoute from "./util/OnlyNotAuthRoute";

export const history = createBrowserHistory();

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App store={store}>  
        <Header/>
            <Route exact path="/" component={Landing} />
            <OnlyAuthRoute exact path="/profile" component={Profile} />
            <OnlyNotAuthRoute exact path="/login" component={Login} />
            <OnlyNotAuthRoute exact path ="/register" component={Register} />    
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);

