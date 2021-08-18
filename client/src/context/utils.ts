import { TodoType } from "../lib/types";

export const editTodo = (todoList : TodoType[], id : number, description:string) => {
  return todoList.map((item) =>
    item.id === id ? { ...item, description: description } : item
  );
};

export const deleteTodo = (todoList : TodoType[], id:number) => {
  return todoList.filter((todo) => todo.id !== id);
};
