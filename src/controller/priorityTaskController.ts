import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AsyncHandler } from "../middleware/Asynhandler";
import { Apiresponse } from "../utils/Apiresponse";
import { ApiError } from "../utils/Apierror";

const prisma = new PrismaClient();

export const priorityTaskController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    // VALIDATING PROJECT ID
    if (!userId) {
      throw new ApiError(400, "UserId id not found");
    }
    try {
      const Tasks = await prisma.task.findMany({
        where: {
          OR: [
            {
              authorUserId: Number(userId),
            },
            {
              assignedUserId: Number(userId),
            },
          ],
        },
        include: {
          author: true,
          assignee: true,
        },
      });
      res.json(new Apiresponse(200, { data: Tasks }));
    } catch (error) {
      console.log("Error:", error);
      throw new ApiError(500, "An error occurred while getting Task");
    }
  }
);
