import { UserType } from "../lib/types/";
import { UserContextInterface } from "./UserContext";

type ActionType =
  | { type: "SET_CURRENT_USER"; payload: UserType }
  | { type: "LOGIN"; payload: UserType }
  | { type: "LOGOUT" }
  | { type: "USER_ERROR"; payload: {} };

const UserReducer = (state: UserContextInterface, action: ActionType) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "USER_ERROR":
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
