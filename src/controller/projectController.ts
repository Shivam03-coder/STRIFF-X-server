import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AsyncHandler } from "../middleware/Asynhandler";
import { Apiresponse } from "../utils/Apiresponse";

const prisma = new PrismaClient();

export const ProjectController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log("SHIVAM")
    const projects = await prisma.project.findMany();
    res.json(new Apiresponse(200, { data: projects }));
  }
);
