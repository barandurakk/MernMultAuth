import axios from "axios";
import _ from "lodash";
import { validateFormData } from "../util/validation";
import {
  SIGN_UP,
  LOADING_UI,
  STOP_LOADING_UI,
  AUTH_ERROR,
  SET_UI_ERROR,
} from "./types";


//AUTH ACTIONS
export const signUp = (formData) => dispatch => {

    dispatch({type: LOADING_UI});

    const error = validateFormData(formData);
    console.log("error: ", error);

    //validate form data
    if(_.isEmpty(error)){
        axios.post("http://localhost:5000/api/signup", formData).then(res => {
        dispatch({type: SIGN_UP, payload:res.data});
        dispatch({type: STOP_LOADING_UI});
    }).catch(err => {
        console.error(err);
        dispatch({type: AUTH_ERROR, payload: {email: "This email is already taken"}});   
        dispatch({type: STOP_LOADING_UI}); 
    })
    }else{
        dispatch({type: AUTH_ERROR, payload: error});
        dispatch({type: STOP_LOADING_UI});
    }

}

export const signIn = formData => dispatch => {
    dispatch({type:LOADING_UI});

    const error = validateFormData(formData);
}