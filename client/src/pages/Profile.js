import React from "react"
import {connect} from "react-redux";
import _ from "lodash";
import keys from "../config/keys";
import GoogleLogin from 'react-google-login';
import {linkWithGoogle, unlinkGoogle} from "../actions/index"

class Profile extends React.Component{

    state= {
        linkError: ""
    }

    linkGoogle = async (res) => {
        console.log('Link with Google', res.profileObj.email) ;
        if(res.profileObj.email !== this.props.user.local.email){
            this.setState({linkError: "You can only link Google account when emails are same!"});
        }else{
             await this.props.linkWithGoogle(res.accessToken);
            this.setState({linkError: ""})
        }
       
      }

      unlinkGoogle = async () => {  
        await this.props.unlinkGoogle();
      }

    render(){

        const {userLoading} = this.props;
        const {name, local, google , methods} = this.props.user;
        const {linkError} = this.state;

        return(
        <div className="profile-details">

           {!userLoading ? (

            <div>
            <span>Name: {name}</span><br/>
            {google ? (<div><span>Google Email: {google.email}</span><br/></div>) : null}
            {local ? (<span>Local Email: {local.email}</span>) : null}
            
            {methods.length > 0 ? (
                <div>
                    <hr/>
                    <h2>Your login options</h2>
                    {methods.map(method => 
                        {
                        
                            if(method === "google"){
                                return <span key={Math.random()}>
                                        {method} 
                                        <button 
                                            onClick={ () => this.unlinkGoogle() }
                                            >
                                            Unlink ?
                                        </button> 
                                    </span>
                            }
                            return <span key={Math.random()}>{method}  </span>
                        
                        })}
                </div>
            ) : null}
            <br/>
            {!google ? (

                <div>
                    <span>Want to link your google account ? </span> <br/>
                    {linkError ? (<span>{linkError}</span>) : null}
                    <GoogleLogin 
                    clientId={keys.googleClientID}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Link with Google</button>
                    )}
                    prompt="select_account"
                    onSuccess={this.linkGoogle}
                    onFailure={this.linkGoogle}
                    />
                </div>

                ) 
                : null}
            </div>

           ) : (<span>Loading</span>)}
           
        </div>
        )
       
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.isAuthenticated,
        user: state.auth.details,
        userLoading: state.auth.loading
    }
}

export default connect(mapStateToProps, {linkWithGoogle, unlinkGoogle})(Profile)