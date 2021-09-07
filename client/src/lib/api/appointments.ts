import { NewAppointment } from "../types";
import axiosClient from "./axiosClient";

export const getAppointment = async (id: number) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get(`/appointments/${id}`, config);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getAppointmentsForPatient = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get("/appointments/patient", config);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getAppointmentsForDoctor = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get("/appointments/doctor", config);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getAppointmentsForDoctorByDate = async (
  doctorId: number,
  date: string
) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get(
      `/appointments/doctor/${doctorId}/${date}`,
      config
    );

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const createAppointment = async (newAppointment: NewAppointment) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.post(
      `/appointments`,
      newAppointment,
      config
    );

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
