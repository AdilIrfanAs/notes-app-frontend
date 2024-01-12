import { createContext, useReducer } from "react";
import authReducers from "../reducers/auth-reducers";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    message: "",
    user: null,
  };

  const initFunc = () => {
    const data = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (data) {
      return {
        isAuthenticated: true,
        message: "",
        user: data,
        accessToken: token,
      };
    } else {
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(authReducers, initialState, initFunc);

  return (
    <AuthContext.Provider value={{ authState: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
