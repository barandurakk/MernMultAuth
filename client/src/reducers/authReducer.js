import {SIGN_UP, AUTH_ERROR} from "../actions/types";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  errorMessages: {},
  token: ""
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SIGN_UP:
      //save token to the local store
      localStorage.setItem("JwtToken", "Bearer " + action.payload);

      axios.defaults.headers.common['Authorization'] = localStorage.getItem("JwtToken");

      return {
        ...state,
        token : "Bearer " + action.payload,
        isAuthenticated: true,
        errorMessages: {}
      };

    case AUTH_ERROR:
      return {
        ...state,
        errorMessages: action.payload
      }

    default:
      return state;
  }
};
