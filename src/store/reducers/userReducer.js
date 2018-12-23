const initialState = {
  user: {},
  errors: {},
  loading: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return { ...state, loading: true };
    case "USER_UNLOADING":
      return { ...state, loading: false };
    case "SET_CURRENT_USER":
      return { ...state, user: action.user };
    case "GET_ERRORS":
      return { ...state, errors: action.errors };
    case "LOG_OUT":
      return { user: {}, errors: {} };
    case "CLEAR_ERROR":
      return { ...state, errors: {} };
    default:
      return state;
  }
};
export default user;
