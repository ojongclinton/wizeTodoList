import { v4 as uuidv4 } from "uuid";
import { Labels, Priority, Todo } from "@/types/Todo";

export let initialUsers: Assignee[] = [
  {
    id: uuidv4(),
    name: "John Doe",
    email: "jhonDoe@gmail.com",
    phone: "655435890",
  },
  {
    id: uuidv4(),
    name: "Micheal Jackson",
    email: "diamondJackson@gmail.com",
    phone: "688434570",
  },
  {
    id: uuidv4(),
    name: "Ronaldo Decaprio",
    email: "ronaldoDecaprio@gmail.com",
    phone: "655435890",
  },
  {
    id: uuidv4(),
    name: "Messi muhamad",
    email: "messimuhammed@gmail.com",
    phone: "655435890",
  },
];

export let initialTodos: Todo[] = [
  {
    id: uuidv4(),
    title: "Buy milk",
    assignee: initialUsers[0],
    startDate: new Date(),
    endDate: new Date(),
    description: "Buy milk from the store",
    priority: Priority.HIGH,
    labels: [Labels.BACKLOG],
  },
  {
    id: uuidv4(),
    title: "Buy eggs",
    assignee: initialUsers[1],
    startDate: new Date(),
    endDate: new Date(),
    description: "Buy eggs from the store",
    priority: Priority.HIGH,
    labels: [Labels.BACKLOG],
  },
  {
    id: uuidv4(),
    title: "Buy bread",
    assignee: initialUsers[2],
    startDate: new Date(),
    endDate: new Date(),
    description: "Buy bread from the store",
    priority: Priority.MEDIUM,
    labels: [Labels.BACKLOG],
  },
  {
    id: uuidv4(),
    title: "Buy butter",
    assignee: null,
    startDate: new Date(),
    endDate: new Date(),
    description: "Buy butter from the store",
    priority: Priority.LOW,
    labels: [Labels.BACKLOG],
  },
];
