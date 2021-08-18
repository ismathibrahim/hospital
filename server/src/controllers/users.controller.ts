import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/requests.interface";

export const getUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  res.json(user);
};

export const getCurrentUser = async (req: RequestWithUser, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.user.id) },
    select: {
      id: true,
      email: true,
      role: true,
      patientProfile: true,
      doctorProfile: true,
      adminProfile: true,
    },
  });

  res.json(user);
};
