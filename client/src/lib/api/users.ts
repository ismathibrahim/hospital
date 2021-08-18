import axiosClient from "./axiosClient";

export const loginUser = async (
  email: string,
  password: string,
  role: string
) => {
  try {
    const data = { email, password, role };
    const response = await axiosClient.post("/users/login", data);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get("/users/current-user", config);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const verifyLogin = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get("/users/verify-login", config);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
