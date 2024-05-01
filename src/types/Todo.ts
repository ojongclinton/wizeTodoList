interface Todo {
  id: string;
  title: string;
  assignee: Assignee;
  startDate: Date;
  endDate: Date;
  description: string;
  priority: Priority;
  labels: Labels[];
}

enum Priority {
  LOW,
  MEDIUM,
  HIGH,
  URGENT,
}

enum Labels {
  BACKLOG,
  IN_PROGRESS,
  IN_REVIEW,
  DONE,
}
