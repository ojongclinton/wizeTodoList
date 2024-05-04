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

export const createUser = async (
  newUser: Assignee
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.post(`/users/create`, newUser);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateUser = async (
  newUser: Assignee
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.put(`/users/update`, newUser);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteUser = async (userId: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.delete(`/users/delete/${userId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};
