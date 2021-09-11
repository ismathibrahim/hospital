import { NewAppointment } from "../types";
import axiosClient from "./axiosClient";

export const getAppointment = async (id: number) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get(`/appointments/${id}`, config);

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getAppointmentsForPatient = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get("/appointments/patient", config);

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUpcomingAppointmentsForPatient = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get(
      "/appointments/upcoming/patient",
      config
    );

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getAppointmentsForDoctor = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get("/appointments/doctor", config);

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUpcomingAppointmentsForDoctor = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get(
      "/appointments/upcoming/doctor",
      config
    );

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getNumberOfAppointments = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get("/appointments/count", config);

    return response.data;
  } catch (error: any) {
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
  } catch (error: any) {
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
  } catch (error: any) {
    console.error(error.message);
  }
};

export const cancelAppointment = async (id: number) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.put(
      `/appointments/cancel/${id}`,
      null,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const rescheduleAppointment = async (
  id: number,
  date: string,
  time: string
) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.put(
      `/appointments/reschedule/${id}`,
      { date, time },
      config
    );

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const noshowAppointment = async (id: number) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.put(
      `/appointments/noshow/${id}`,
      null,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const completeAppointment = async (id: number) => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.put(
      `/appointments/complete/${id}`,
      null,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};
