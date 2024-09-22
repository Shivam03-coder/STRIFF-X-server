import { Router } from "express";
import { ProjectController } from "../controller/projectController";

export const Projectroute = Router();

Projectroute.route("/projects").get(ProjectController)