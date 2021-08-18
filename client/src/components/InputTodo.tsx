import React, { useState } from "react";
import { useTodoContext } from "../context/TodosContext";

import "./InputTodo.scss";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const { addTodo } = useTodoContext();

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.length) {
      await addTodo(description);

      setDescription("");
    }
  };

  return (
    <div className="input-todo">
      <h2>Tasks</h2>
      <form className="card" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Enter new task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default InputTodo;
