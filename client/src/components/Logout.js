import React from "react";
import { Fragment } from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";

//actions
import {signOut} from "../actions/index";

class Logout extends React.Component{

    onClick = async () => {
        console.log("clicked!");
        await this.props.signOut();
        window.location.href = "/"; //push user to the main page
    }

render(){
    return(
        <Fragment>
        {this.props.auth ? 
            (
            <div className="logout-button">

                <button onClick={() => this.onClick()}>Logout</button>

            </div>
            ) : null}
        </Fragment>
    )
}
}

const mapStateToProps = state => {
    return {
        auth: state.auth.isAuthenticated
    }
}


export default connect(mapStateToProps, {signOut})(Logout);