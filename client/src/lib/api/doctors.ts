import axiosClient from "./axiosClient";

export const getAllDoctors = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get("/doctors", config);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getDoctor = async (id: number) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get(`/doctors/${id}`, config);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
