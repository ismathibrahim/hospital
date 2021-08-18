import React, { useReducer, createContext, useContext } from "react";
import * as todoService from "../lib/api/todos";
import TodosReducer from "./TodosReducer";
import { TodoType } from "../lib/types";

export interface TodosContextInterface {
  todos: TodoType[];
  error: {} | null;
  loading: boolean;
  [key: string]: any;
}
const INITIAL_STATE = {
  todos: [],
  error: null,
  loading: true,
};

export const TodosContext = createContext<TodosContextInterface>(INITIAL_STATE);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(TodosReducer, INITIAL_STATE);

  const getAllTodos = async () => {
    try {
      const todos = await todoService.getAllTodos();

      dispatch({
        type: "GET_TODOS",
        payload: todos,
      });
    } catch (error) {
      dispatch({
        type: "TODO_ERROR",
        payload: error,
      });
    }
  };

  const addTodo = async (description: string) => {
    try {
      const todo = await todoService.addTodo(description);

      dispatch({
        type: "ADD_TODO",
        payload: todo,
      });
    } catch (error) {
      dispatch({
        type: "TODO_ERROR",
        payload: error,
      });
    }
  };

  const editTodo = async (id: number, description: string) => {
    try {
      await todoService.editTodo(id, description);

      dispatch({
        type: "EDIT_TODO",
        payload: {
          id,
          description,
        },
      });
    } catch (error) {
      dispatch({
        type: "TODO_ERROR",
        payload: error,
      });
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);

      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TODO_ERROR",
        payload: error,
      });
    }
  };

  return (
    <TodosContext.Provider
      value={{ ...state, getAllTodos, addTodo, editTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodosContext);
