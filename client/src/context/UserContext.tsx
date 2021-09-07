import React, { useReducer, createContext, useContext } from "react";
import * as userService from "../lib/api/users";
import UserReducer from "./UserReducer";
import { UserType } from "../lib/types";

export interface UserContextInterface {
  isAuthenticated: boolean;
  user: UserType | null;
  error: {} | null;
  loading: boolean;
  [key: string]: any;
}

const INITIAL_STATE: UserContextInterface = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: true,
};

export const UserContext = createContext<UserContextInterface>(INITIAL_STATE);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const verifyLogin = async () => {
    try {
      const response = await userService.verifyLogin();

      response.email
        ? dispatch({ type: "LOGIN", payload: response.user })
        : dispatch({ type: "LOGOUT" });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const login = (user: UserType) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const getCurrentUser = async () => {
    try {
      const response = await userService.getCurrentUser();

      if (response === "Not Authorized") {
        return dispatch({
          type: "USER_ERROR",
          payload: response,
        });
      }

      dispatch({
        type: "SET_CURRENT_USER",
        payload: response,
      });
    } catch (error: any) {
      dispatch({
        type: "USER_ERROR",
        payload: error,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{ ...state, getCurrentUser, verifyLogin, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
