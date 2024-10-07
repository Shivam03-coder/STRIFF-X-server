import { Router } from "express";

import { priorityTaskController } from "../controller/priorityTaskController";

export const PriorityTaskRoute = Router();

PriorityTaskRoute.route("/prioritytasks/:userId").get(priorityTaskController);
