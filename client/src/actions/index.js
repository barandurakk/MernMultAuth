import axios from "axios";
import {
  SIGN_UP,
  LOADING_UI,
  STOP_LOADING_UI,
  AUTH_ERROR
} from "./types";


//AUTH ACTIONS
export const signUp = (formData) => dispatch => {

    dispatch({type: LOADING_UI});

    if(dispatch(validate(formData))){
        console.log("true");
    }else{
        console.log("false");
    }
    
    axios.post("http://localhost:5000/api/signup", formData).then(res => {
    
        dispatch({type: SIGN_UP, payload:res.data});
        dispatch({type: STOP_LOADING_UI});
    }).catch(err => {
        console.error(err);
        dispatch({type: AUTH_ERROR});   
        dispatch({type: STOP_LOADING_UI}); 
    })

}

export const validate = (data) => dispatch => {
    if(data.name === "selam"){
        return true;
    }
    return false;
}