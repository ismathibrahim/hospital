import { NewPatient } from "../types";
import axiosClient from "./axiosClient";

export const registerPatient = async (newPatient: NewPatient) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.post(
      `/patients/register`,
      newPatient,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};
