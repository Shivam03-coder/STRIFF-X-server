import { Router } from "express";
import {
  createTasksController,
  getTasksController,
} from "../controller/tasksController";

export const Tasksroute = Router();

Tasksroute.route("/tasks").get(getTasksController);
Tasksroute.route("/tasks/create").post(createTasksController);
