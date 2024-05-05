import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuidv4 } from "uuid";
import { initialTodos, initialUsers } from "./mockDataIni";
import { Todo } from "@/types/Todo";
import {
  setLocalStorageWithExpiry,
  getLocalStorageWithExpiry,
} from "@utils/localStorageWithExpiry";

// Constants for localStorage keys and expiry time
const USERS_KEY = "initialUsers";
const TODOS_KEY = "initialTodos";
const EXPIRY_TIME = 5 * 60 * 60 * 1000; // 5 hours

// Function to update localStorage with expiry time
const updateLocalStorage = (key: string, data: any) => {
  setLocalStorageWithExpiry(key, JSON.stringify(data), EXPIRY_TIME);
};

// Function to handle localStorage retrieval with fallback to initial data
const getLocalStorageOrInitial = (key: string, initialData: any) => {
  const localData = getLocalStorageWithExpiry(key);
  return localData ? JSON.parse(localData) : initialData;
};

// Update users and todos in localStorage if not present or expired
const localUsers = getLocalStorageOrInitial(USERS_KEY, initialUsers);
const localTodos = getLocalStorageOrInitial(TODOS_KEY, initialTodos);

updateLocalStorage(USERS_KEY, localUsers);
updateLocalStorage(TODOS_KEY, localTodos);

// Now you can safely use users and todos
let users: Assignee[] = localUsers;
let todos: Todo[] = localTodos;

export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  const mock = new MockAdapter(axiosInstance);

  //USER-ROUTES
  mock.onPost("/users/create").reply((config) => {
    console.log("incoming create user request");
    const user: Assignee = JSON.parse(config.data);
    users.push({ ...user, id: uuidv4() });
    updateLocalStorage(USERS_KEY, users);

    return [200, { message: "User added succesfully", data: user }];
  });

  mock.onPut("/users/update").reply((config) => {
    const body = JSON.parse(config.data);
    const user: Assignee = JSON.parse(config.data);
    users = users.map((u) => (u.id === user.id ? user : u));
    updateLocalStorage(USERS_KEY, users);

    return [200, { message: "User updated succesfully", data: user }];
  });

  mock.onDelete(/\/users\/delete\/([^/]+)/).reply((config) => {
    console.log("incoming delete user request");
    console.log(config);
    const userId = config.url?.split("/")[3];
    users = users.filter((u) => u.id !== userId);
    updateLocalStorage(USERS_KEY, users);

    return [200, { message: "User deleted succesfully" }];
  });

  mock.onGet("/users").reply((config) => {
    return [200, { staus: "success", data: users }];
  });

  // mock.onAny().reply(200, {
  //   status: "Any other call will get this 😀",
  //   moreData: users,
  // });

  //TODO-ROUTES
  mock.onPost("/todos/create").reply((config) => {
    console.log("incoming create todo request");
    const todo: Todo = JSON.parse(config.data);
    todos.push({ ...todo, id: uuidv4() });
    updateLocalStorage(TODOS_KEY, todos);

    return [200, { message: "Todo added succesfully", data: todo }];
  });

  mock.onGet("/todos").reply((config) => {
    return [200, { staus: "success", data: todos }];
  });

  mock.onPut("/todos/update").reply((config) => {
    const todo: Todo = JSON.parse(config.data);
    todos = todos.map((t) => (t.id === todo.id ? todo : t));
    updateLocalStorage(TODOS_KEY, todos);

    return [200, { message: "Todo updated succesfully", data: todo }];
  });

  mock.onDelete(/\/todos\/delete\/([^/]+)/).reply((config) => {
    const todoId = config.url?.split("/")[3];
    todos = todos.filter((t) => t.id !== todoId);
    updateLocalStorage(TODOS_KEY, todos);

    return [200, { message: "Todo deleted succesfully" }];
  });

  mock.onPost("/todo/assignToAssignee").reply((config) => {
    const todo: Todo = JSON.parse(config.data);
    todos = todos.map((t) => (t.id === todo.id ? todo : t));
    updateLocalStorage(TODOS_KEY, todos);

    return [200, { message: "Todo updated succesfully", data: todo }];
  });
}
