const authReducers = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        message: action.payload.messages,
        accessToken: action.payload.accessToken,
      };
    case "LOGIN_FAILED":
      return { ...state, message: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, message: "", user: null };
    case "RESTORE":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "RESET":
      return { ...state, message: "" };
    default:
      return state;
  }
};

export default authReducers;
