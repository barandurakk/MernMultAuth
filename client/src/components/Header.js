import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Logout from "./Logout";

class Header extends Component {
  

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        ------------------NAVBAR------------ <br/>
        {this.props.auth ? 
        (
            <div>
            <Link to="/">Main Page</Link> <br/>
            {this.props.userLoading ? (<span>Loading</span>):(<span>{this.props.user.name}</span>)} <br/>
            <Link to="/profile">Profile</Link> <br/>  
            <Logout/>
            </div>
        ) : (
            <div>
            <Link to="/">Main Page</Link> <br/>
            <Link to="/login">Login</Link> <br/>
            <Link to="/register">Register</Link> <br/>
            </div> 
        )}

       
       ------------------NAVBAR------------ <br/>
      </nav>
    );
  }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.isAuthenticated,
        user: state.auth.details,
        userLoading: state.auth.loading
    }
}

export default connect(mapStateToProps)(Header);


