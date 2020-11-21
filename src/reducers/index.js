const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {},
      };
    case 'CREATE_NOTE':
      return {
        ...state,
        notes: [...state.notes, { ...action.payload, _id: `N${state.notes.length + 1}` }],
      };
    default:
      return state;
  }
};

export default reducer;
