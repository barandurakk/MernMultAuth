import {LOADING_UI,STOP_LOADING_UI ,SET_UI_ERROR} from "../actions/types";

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case LOADING_UI:
      return {
        ...state,
        loading: true
      };

    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      }

      case SET_UI_ERROR:
      return {
        ...state,
        
      }

    default:
      return state;
  }
};
