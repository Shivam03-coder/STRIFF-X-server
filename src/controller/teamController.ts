import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AsyncHandler } from "../middleware/Asynhandler";

const prisma = new PrismaClient();

export const teamController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const teams = await prisma.team.findMany();

    const teamsWithUserName = await Promise.all(
      teams.map(async (team) => {
        const productOwner = await prisma.user.findUnique({
          where: {
            userId: team.productOwnerUserId!,
          },
          select: {
            username: true,
          },
        });
        const projectManager = await prisma.user.findUnique({
          where: {
            userId: team.projectManagerUserId!,
          },
          select: {
            username: true,
          },
        });

        return {
          ...team,
          projectManager,
          productOwner,
        };
      })
    );
    res.json(teamsWithUserName);
  }
);
