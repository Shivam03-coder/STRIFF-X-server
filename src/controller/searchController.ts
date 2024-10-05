import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AsyncHandler } from "../middleware/Asynhandler";
import { Apiresponse } from "../utils/Apiresponse";
import { ApiError } from "../utils/Apierror";

const prisma = new PrismaClient();

export const searchController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { query } = req.query;
    // VALIDATING PROJECT ID

    try {
      const Tasks = await prisma.task.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query as string,
              },
            },
            {
              description: {
                contains: query as string,
              },
            },
          ],
        },
      });
      const Projects = await prisma.project.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query as string,
              },
            },
            {
              description: {
                contains: query as string,
              },
            },
          ],
        },
      });
      const Users = await prisma.user.findMany({
        where: {
          OR: [
            {
              username: {
                contains: query as string,
              },
            },
          ],
        },
      });
      res.json({ Tasks, Projects, Users });
    } catch (error) {
      console.log("Error:", error);
      throw new ApiError(500, "An error occurred while getting Task");
    }
  }
);
