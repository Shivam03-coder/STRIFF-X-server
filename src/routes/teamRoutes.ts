import { Router } from "express";
import { teamController } from "../controller/teamController";

export const TeamRoutes = Router();

TeamRoutes.route("/teams").get(teamController);
