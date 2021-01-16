import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const OnlyNotAuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(OnlyNotAuthRoute);
