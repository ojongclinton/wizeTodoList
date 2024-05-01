import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuidv4 } from "uuid";
import { initialTodos, initialUsers } from "./mockDataIni";
import { Todo } from "@/types/Todo";
import {
  setLocalStorageWithExpiry,
  getLocalStorageWithExpiry,
} from "@utils/localStorageWithExpiry";

setLocalStorageWithExpiry(
  "initialUsers",
  JSON.stringify(initialUsers),
  5 * 60 * 60 * 1000
);

setLocalStorageWithExpiry(
  "initialTodos",
  JSON.stringify(initialTodos),
  5 * 60 * 60 * 1000
);

let users: Assignee[] = JSON.parse(getLocalStorageWithExpiry("initialUsers"));
let todos: Todo[] = JSON.parse(getLocalStorageWithExpiry("initialTodos"));
export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  const mock = new MockAdapter(axiosInstance);

  mock.onPost("/users/create").reply((config) => {
    const body = config.data;
    if (!body) {
      return [422, { message: "You must provide a user" }];
    }
    if (!body.name) {
      return [422, { message: "Asignee must have a name" }];
    }
    if (!body.email) {
      return [422, { message: "Asignee must have an email" }];
    }
    if (!body.phone) {
      return [422, { message: "Asignee must have a telephone number" }];
    }
    const user: Assignee = JSON.parse(config.data);
    users.push({ ...user, id: uuidv4() });

    return [200, { message: "User added succesfully", data: user }];
  });

  mock.onPut("/users/update").reply((config) => {
    const body = config.data;
    if (!body) {
      return [422, { message: "You must provide a user" }];
    }
    if (!body.id) {
      return [422, { message: "Asignee must have an id" }];
    }
    const user: Assignee = JSON.parse(config.data);
    users = users.map((u) => (u.id === user.id ? user : u));

    return [200, { message: "User updated succesfully", data: user }];
  });

  mock.onDelete("/users/delete").reply((config) => {
    const body = config.data;
    if (!body) {
      return [422, { message: "You must provide a user" }];
    }
    if (!body.id) {
      return [422, { message: "Asignee must have an id" }];
    }
    const user: Assignee = JSON.parse(config.data);
    users = users.filter((u) => u.id !== user.id);

    return [200, { message: "User deleted succesfully", data: user }];
  });

  mock.onGet("/users").reply((config) => {
    return [200, { message: "All users", data: users }];
  });




  mock.onAny().reply(200, {
    status: "Any other call will get this 😀",
    moreData: users,
  });
}
