import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { ApiError } from "./utils/Apierror";

export const app = express();

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

import { Projectroute } from "./routes/projectRoute";
import { Tasksroute } from "./routes/tasksRoutes";
app.use("/api/v1/stiffx", Projectroute);
app.use("/api/v1/stiffx", Tasksroute);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    return res
      .status(err.statusCode)
      .json({ message: err.message, status: err.statusCode });
  }
});
