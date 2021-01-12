import React from "react";
import {Link} from "react-router-dom";

class Landing extends React.Component {
  render() {
    return <div>
      <a href="http://localhost:5000/auth/google">Login with Google</a>
      <p>OR</p>
      <Link to={"/register"}>Sign in with Email</Link>
      <hr/>
      <p>Do you have already an account ? - <Link to="/login">Login</Link></p>
      </div>;
  }
}

export default Landing;
