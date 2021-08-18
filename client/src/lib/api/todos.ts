export const getAllTodos = async () => {
  try {
    const response = await fetch("http://localhost:5000/todos", {
      method: "GET",
      headers: { token: localStorage.token },
    });

    const parseRes = await response.json();

    return parseRes;
  } catch (error) {
    console.error(error.message);
  }
};

export const addTodo = async (description : string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.token);

    const body = { description };
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const editTodo = async (id: number, description: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.token);

    const body = { description };
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteTodo = async (id : number) => {
  try {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
      headers: { token: localStorage.token },
    });
  } catch (err) {
    console.error(err.message);
  }
};
