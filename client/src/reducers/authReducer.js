import {AUTH_ERROR, SET_AUTHENTICATED,SET_UNAUTHENTICATED, SET_USER, USER_LOADING} from "../actions/types";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  errorMessage: "",
  details: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: ""
      }

    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        details: {}
      }

    case USER_LOADING:
      return {
        ...state,
        loading:true
      }

    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        details:{
          ...action.payload  
        },
        errorMessage: "",
        loading: false
      }

    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      }

    default:
      return state;
  }
};
