import {TodoType} from '../lib/types/'
import { TodosContextInterface } from './TodosContext';
import { editTodo, deleteTodo } from "./utils";

type ActionType = 
  | {type: "GET_TODOS"; payload: TodoType[]}
  | {type: "ADD_TODO"; payload: TodoType}
  | {type: "EDIT_TODO"; payload: TodoType}
  | {type: "DELETE_TODO"; payload: number}
  | {type: "TODO_ERROR"; payload: {}}

const AppReducer = (state : TodosContextInterface, action: ActionType) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: editTodo(
          state.todos,
          action.payload.id,
          action.payload.description
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: deleteTodo(state.todos, action.payload),
      };
    case "TODO_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
