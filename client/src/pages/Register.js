import React from "react";
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';

//actions
import {signUp} from "../actions/index";

class Register extends React.Component{

    state={
        email:"",
        password:"",
        name: ""
    }

    handleSubmit = async (e) => {
        
        e.preventDefault();
        let formData = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        }
        await this.props.signUp(formData);
        if(!this.props.errorMessage && !this.props.loading){
            this.props.history.push("/profile");
        }

    }

    onFieldChange = (e) => {      
        this.setState({[e.target.name]: e.target.value});
    }

render(){
    return(
        <div className="register-page-container">
            <div className="register-form-wrapper">
                <form onSubmit={(e) => this.handleSubmit(e)}>

                <div className="auth-error-wrapper">
                    {this.props.errorMessage ? (

                        <span>{this.props.errorMessage}</span>

                    ) : null}
                </div>

                <label>Name</label>
                    <input
                        name="name"
                        type="text"
                        id="name"
                        value={this.state.name}
                        onChange={(e)=> this.onFieldChange(e)}
                    />
                    
                    <label>E-mail</label>
                    <input
                        name="email"
                        type="text"
                        id="email"
                        value={this.state.email}
                        onChange={(e)=> this.onFieldChange(e)}
                    />

                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={(e)=> this.onFieldChange(e)}
                    />

                        {this.props.loading ? (<span>Loading</span>) 
                        : 
                        (<button
                        type="submit"
                        >Register
                        </button>)}
                    

                </form>
            </div>
            
        </div>
    )
}

}

const mapStateToProps = state => {
    return{
        errorMessage: state.auth.errorMessage,
        loading: state.ui.loading
    }
}

export default connect(mapStateToProps, {signUp})(Register);