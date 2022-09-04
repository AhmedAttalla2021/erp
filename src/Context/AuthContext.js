import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const loginHandler = (token) => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setIsLogin(false);
  };

  const contextValue = {
    isLoggedIn: isLogin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
