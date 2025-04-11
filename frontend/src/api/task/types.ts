export interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  ONGOING = "ongoing",
  SUCCESS = "success",
  FAILURE = "failure",
}
