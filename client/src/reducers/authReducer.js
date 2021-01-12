import {SIGN_UP, AUTH_ERROR} from "../actions/types";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  errorMessage: "",
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
        errorMessage: ""
      };

    case AUTH_ERROR:
      console.log("auth error");
      return {
        ...state,
        errorMessage: "This email is already taken!"
      }

    default:
      return state;
  }
};
