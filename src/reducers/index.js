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
      };
    case TYPES.CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, { ...action.payload, _id: `N${state.notes.length + 1}` }],
      };
    case TYPES.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? { ...note, ...action.payload } : note,
        ),
      };
    default:
      return state;
  }
};

export default reducer;
