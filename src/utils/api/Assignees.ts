import { AxiosResponse } from "axios";
import axiosInstance from "./axios";

export const getAllUsers = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/users`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
