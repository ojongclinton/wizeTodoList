import { AxiosResponse } from "axios";
import axiosInstance from "./axios";
import { Todo } from "@/types/Todo";

export const getAllTodos = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/todos`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createTodo = async (
  newTodo: Todo
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.post(`/todos/create`, newTodo);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateTodo = async (
  newTodo: Todo
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.put(`/todos/update`, newTodo);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteTodo = async (todoId: any): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.delete(`/todos/delete/${todoId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};
