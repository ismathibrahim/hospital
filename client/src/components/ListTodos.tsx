import React, { useEffect, useState } from "react";
import { TodoType } from "../lib/types";
import { useTodoContext } from "../context/TodosContext";

import "./ListTodos.scss";
import Modal from "./Modal";

const ListTodos = () => {
  const { todos, getAllTodos, editTodo, deleteTodo } = useTodoContext();
  const [modalHidden, setModalHidden] = useState(true);
  const [itemToEdit, setItemToEdit] = useState<TodoType>({} as TodoType);
  const [editText, setEditText] = useState("");

  const showModal = (todoItem: TodoType) => {
    setItemToEdit(todoItem);
    setEditText(todoItem.description);
    setModalHidden(false);
  };

  const hideModal = () => {
    setModalHidden(true);
  };

  const handleEdit = async () => {
    await editTodo(itemToEdit.id, editText);

    hideModal();
  };

  useEffect(() => {
    getAllTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal
        modalHidden={modalHidden}
        handleClose={hideModal}
        handleOk={handleEdit}
        title="Edit task"
        okText="Edit"
      >
        <input
          type="text"
          style={{ width: "100%" }}
          value={editText}
          id="editInput"
          onChange={(e) => setEditText(e.target.value)}
        />
      </Modal>

      {todos.map((todo: TodoType) => (
        <div className="row card" key={todo.id}>
          <div>
            <input type="checkbox" />
            {todo.description}
          </div>
          <div className="actions">
            <span className="edit" onClick={() => showModal(todo)}>
              Edit
            </span>
            <span className="delete" onClick={() => deleteTodo(todo.id)}>
              Delete
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListTodos;
