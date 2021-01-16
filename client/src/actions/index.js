import axios from "axios";
import _ from "lodash";
import {
  LOADING_UI,
  STOP_LOADING_UI,
  AUTH_ERROR,
  SET_USER,
  SET_UNAUTHENTICATED,
  USER_LOADING
} from "./types";


//AUTH ACTIONS
export const signUp = (formData) => dispatch => {

        dispatch({type: LOADING_UI});
        axios.post("/api/signup", formData).then(res => {
            setAuthorizationHeader(res.data);
            dispatch(getUserData());
            dispatch({type: STOP_LOADING_UI});
        }).catch(err => {
            console.log(err.response.status);
            if(err.response.status === 403){
                dispatch({type: AUTH_ERROR, payload: "This email is already taken"}); 
                dispatch({type: STOP_LOADING_UI});
            }else{
                dispatch({type: AUTH_ERROR, payload: "There is something wrong :( Please try again."}); 
                dispatch({type: STOP_LOADING_UI});
            }
             
             
         })
   
}

export const signIn = formData => dispatch => {
   
        dispatch({type:LOADING_UI});
        axios.post("/api/signin", formData).then(res => {
            setAuthorizationHeader(res.data);
            dispatch(getUserData());
            dispatch({type: STOP_LOADING_UI});
        }).catch(err => { 
            if(err.response.status === 401){
                dispatch({type: AUTH_ERROR, payload: "Email or password is wrong!"});
                dispatch({type: STOP_LOADING_UI});
            }else{
                dispatch({type: AUTH_ERROR, payload: "There is something wrong :( Please try again."}); 
                dispatch({type: STOP_LOADING_UI}); 
            }
            
        })
   
}

export const signOut = () => dispatch => {

    localStorage.removeItem("JwtToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({type: SET_UNAUTHENTICATED});

}

export const googleAuth = (data) => dispatch => {
    dispatch({type:LOADING_UI});
    axios.post("/api/auth/google", {
        access_token: data
    }).then(res => {
        setAuthorizationHeader(res.data);
        dispatch(getUserData());
        dispatch({type: STOP_LOADING_UI});
    }).catch(err => {
        dispatch({type: STOP_LOADING_UI});
        console.error(err);
    })
}

export const linkWithGoogle = (data) => dispatch => {

    axios.post("/api/auth/link/google", {
        access_token: data
    }).then(res => {
        dispatch(getUserData());
    }).catch(err => {
        console.error(err);
    })
}

export const unlinkGoogle = data => dispatch => {

    axios.post("/api/auth/unlink/google").then(res => {
        dispatch(getUserData());
    }).catch(err => {
        console.error(err);
    })
}

export const getUserData = () => dispatch => {
    dispatch({type: USER_LOADING});
    axios.get("/api/getuser").then(res => {
        dispatch({type: SET_USER, payload: res.data})
    }).catch(err => {
        console.log(err);
    })

}

const setAuthorizationHeader = token => {
    const JwtToken = `Bearer ${token}`;
     //save token to the local store
     localStorage.setItem("JwtToken", JwtToken);
     axios.defaults.headers.common['Authorization'] = JwtToken;
}