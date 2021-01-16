import React from "react";
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import _ from "lodash";
import keys from "../config/keys";

//actions
import {signUp, googleAuth} from "../actions/index";
import { validateSignUp } from "../util/validation";

class Register extends React.Component{
        state={
            email:"",
            password:"",
            name: "",
            formError: {},
            loading: false
        }
    
    // componentWillReceiveProps(nextProps){

    //     if(!nextProps.loading){
    //         this.setState({loading: false});
    //     }

    //     if(this.props.errorMessage !== nextProps.errorMessage){     
    //         this.setState({serverError: nextProps.errorMessage});
    //     }else if(!nextProps.errorMessage){
    //         this.setState({serverError: ""})
    //     }

    //     if(!nextProps.loading && !nextProps.errorMessage && _.isEmpty(this.state.formError)){
    //         this.props.history.push("/profile"); //push user to the profile
    //     }
    // }

    componentDidUpdate(prevProps){

        if(this.props !== prevProps){
            if(!this.props.loading && !this.props.errorMessage &&  _.isEmpty(this.state.formError)){
                this.props.history.push("/profile"); //push user to the profile
            }
        }

     }

     static getDerivedStateFromProps(nextProps, prevState){
        if(!nextProps.loading){
            return {loading: false}
        }else{
            return {loading: true}
        } 

     }


    handleSubmit = async (e) => {
        this.setState({formError: {}}); //clean errors and set loading
        e.preventDefault();
        let formData = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        }
       
        const formError = validateSignUp(formData); //validate local form data

        if(_.isEmpty(formError)){ //if local validation has no error 

            await this.props.signUp(formData);

        }else{
            this.setState({serverError: "", formError: formError}); //clean errors
        }
    }

    onGoogle = async(res) => { 
        await this.props.googleAuth(res.accessToken);
      }

    onFieldChange = (e) => {      
        this.setState({[e.target.name]: e.target.value});
    }

render(){
   
    const serverError = this.props.errorMessage;
    const {formError, loading} = this.state;

    return(
        <div className="register-page-container">
            <div className="register-form-wrapper">
                <form onSubmit={(e) => this.handleSubmit(e)}>

                {serverError ? (
                <div className="auth-error-container">
                    <span>{serverError}</span>
                </div>
                ) :
                 null}
                

                <label>Name</label>
                    <input
                        name="name"
                        type="text"
                        id="name"
                        value={this.state.name}
                        onChange={(e)=> this.onFieldChange(e)}
                    />
                    <div className="auth-error-wrapper">
                        {formError.name ? (<span>{formError.name}</span>) : null}
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
                     {formError.email ? (<span>{formError.email}</span>) : null}
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
                     {formError.password ? (<span>{formError.password}</span>) : null}
                    </div>

                        {loading ? (<span>Loading</span>) 
                        : 
                        (<button
                        type="submit"
                        >Register
                        </button>)}
                    

                </form>
                <GoogleLogin 
                clientId={keys.googleClientID}
                prompt="select_account"
                render={renderProps => (
                    <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google ile giriş yapın</button>
                )}
                onSuccess={this.onGoogle}
                onFailure={this.onGoogle}
                className="btn btn-outline-danger"
            />
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

export default connect(mapStateToProps, {signUp, googleAuth})(Register);