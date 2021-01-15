import React from "react";
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import _ from "lodash";

//actions
import {signUp} from "../actions/index";

class Login extends React.Component{

    state={
        email:"",
        password:"",
    }

    handleSubmit = async (e) => {
        
        e.preventDefault();
        let formData = {
            email: this.state.email,
            password: this.state.password
        }
        //await this.props.signUp(formData);
        console.log(this.props.errorMessages);
        if(_.isEmpty(this.props.errorMessages) && !this.props.loading){
            this.props.history.push("/profile");
        }

    }

    onFieldChange = (e) => {      
        this.setState({[e.target.name]: e.target.value});
    }

render(){
    const {errorMessages} = this.props;
    return(
        <div className="login-page-container">
            <div className="login-form-wrapper">
                <form onSubmit={(e) => this.handleSubmit(e)}>

                    <div className="auth-error-wrapper">
                        {errorMessages.name ? (<span>{errorMessages.name}</span>): null}
                    </div>
                    
                    <label>E-mail</label>
                    <input
                        name="email"
                        type="text"
                        id="email"
                        value={this.state.email}
                        onChange={(e)=> this.onFieldChange(e)}
                    />
                     <div className="auth-error-wrapper">
                        {errorMessages.email ? (<span>{errorMessages.email}</span>): null}
                    </div>

                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={(e)=> this.onFieldChange(e)}
                    />
                     <div className="auth-error-wrapper">
                        {errorMessages.password ? (<span>{errorMessages.password}</span>): null}
                    </div>

                        {this.props.loading ? (<span>Loading</span>) 
                        : 
                        (<button
                        type="submit"
                        >Login
                        </button>)}
                    

                </form>
            </div>
            
        </div>
    )
}

}

const mapStateToProps = state => {
    return{
        errorMessages: state.auth.errorMessages,
        loading: state.ui.loading
    }
}

export default connect(mapStateToProps, {signUp})(Login);