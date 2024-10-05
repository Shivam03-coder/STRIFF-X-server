import { Router } from "express";
import { searchController } from "../controller/searchController";


export const SearchRoutes = Router();

SearchRoutes.route("/search").get(searchController);
