import React, { Component } from 'react';
import jwtDecode from "jwt-decode";
import { SET_AUTHENTICATED } from "./actions/types";
import {getUserData} from "./actions/index"
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

class App extends Component {

  UNSAFE_componentWillMount() {

    const token = localStorage.getItem("JwtToken");
    const {store} = this.props;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
       // store.dispatch(logoutUser());
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("JwtToken");
        store.dispatch(getUserData());
      }
}
  }

  render() {
    return (
      <div>
        <div className="container">
        { this.props.children }
        </div>
      </div>
    );
  }
}

export default (App);