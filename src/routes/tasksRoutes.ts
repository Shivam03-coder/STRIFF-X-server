import { Router } from "express";
import {
  createTasksController,
  getTasksController,
  updateTaskStatusController,
} from "../controller/tasksController";

export const Tasksroute = Router();

Tasksroute.route("/tasks").get(getTasksController);
Tasksroute.route("/tasks/create").post(createTasksController);
Tasksroute.route("/tasks/status").patch(updateTaskStatusController);
