const initState = {
  users: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE':
        const newU = action.user;
        const newState = state.users.concat(newU)
      return {
        ...state,
        users: newState
      }
    default:
      return state;
  }
};

export default reducer;
