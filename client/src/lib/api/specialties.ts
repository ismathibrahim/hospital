import axiosClient from "./axiosClient";

export const getAllSpecialties = async () => {
  try {
    const config = { headers: { token: localStorage.token } };

    const response = await axiosClient.get(`/specialties`, config);

    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};
