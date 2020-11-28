const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alert: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'REMOVE_ALERT':
      return {
        ...state,
        alert: null,
      };
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: null,
        notes: [],
      };
    case 'READ_NOTES':
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case 'CREATE_NOTE':
      return {
        ...state,
        notes: [...state.notes, { ...action.payload, _id: `N${state.notes.length + 1}` }],
      };
    case 'UPDATE_NOTE':
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
