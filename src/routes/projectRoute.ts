import { Router } from "express";
import {
  createProjectController,
  getProjectController,
} from "../controller/projectController";

export const Projectroute = Router();

Projectroute.route("/projects").get(getProjectController);
Projectroute.route("/projects/create").post(createProjectController);
