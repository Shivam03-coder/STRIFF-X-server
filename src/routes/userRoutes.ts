import { userController } from './../controller/userController';
import { Router } from "express";


export const UsersRoutes = Router();

UsersRoutes.route("/users").get(userController);
