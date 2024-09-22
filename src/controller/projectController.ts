import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AsyncHandler } from "../middleware/Asynhandler";
import { Apiresponse } from "../utils/Apiresponse";
import { ApiError } from "../utils/Apierror";

const prisma = new PrismaClient();

export const getProjectController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const projects = await prisma.project.findMany();
    res.json(new Apiresponse(200, { data: projects }));
  }
);

export const createProjectController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, description, startDate, endDate } = req.body;

    // CHECK REQUIRED FEILDS

    if (!name || !description) {
      throw new ApiError(
        400,
        "Fields 'name' and 'description' cannot be blank"
      );
    }

    // VALIDATE DATE FIELDS

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      throw new ApiError(400, "'startDate' cannot be after 'endDate'");
    }

    try {
      const newProject = await prisma.project.create({
        data: {
          name,
          description,
          startDate,
          endDate,
        },
      });
      res.json(
        new Apiresponse(201, { data: newProject }, "New project created")
      );
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw new ApiError(500, "An error occurred while creating the project");
    }
  }
);
