import * as TYPES from '../types';

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
        loading: false,
      };
    case TYPES.REMOVE_ALERT:
      return {
        ...state,
        alert: null,
      };
    case TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TYPES.SIGN_IN:
      return {
        ...state,
        user: action.payload,
      };
    case TYPES.LOG_OUT:
      return {
        ...state,
        user: null,
        notes: [],
      };
    case TYPES.READ_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
        redirect: false,
        deleted: false,
      };
    case TYPES.CREATE_NOTE:
    case TYPES.UPDATE_NOTE:
      return {
        ...state,
        notes: [],
        redirect: true,
        loading: false,
      };
    case TYPES.DELETE_NOTE:
      return {
        ...state,
        notes: [],
        deleted: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
