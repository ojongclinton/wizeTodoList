export interface Todo {
  id: string;
  title: string;
  assignee: Assignee | null;
  startDate: Date;
  endDate: Date;
  description: string;
  priority: Priority;
  labels: Labels[];
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum Labels {
  BACKLOG = "BACKLOG",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}
