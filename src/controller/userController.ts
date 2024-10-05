import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AsyncHandler } from "../middleware/Asynhandler";

const prisma = new PrismaClient();

export const userController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const Users = await prisma.user.findMany();
    res.json({ Users });
  }
);
