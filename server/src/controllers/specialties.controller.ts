import prisma from "../lib/prisma";
import { Request, Response } from "express";

export const getAllSpecialties = async (req: Request, res: Response) => {
  const specialties = await prisma.specialty.findMany();

  res.json(specialties);
};

export const createSpecialty = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newSpecialty = await prisma.specialty.create({
    data: {
      name,
    },
  });

  res.json(newSpecialty);
};

export const updateSpecialty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const specialty = await prisma.specialty.update({
    where: { id: Number(id) },
    data: { name },
  });

  res.json(specialty);
};

export const deleteSpecialty = async (req: Request, res: Response) => {
  const { id } = req.params;

  const specialty = await prisma.specialty.delete({
    where: { id: Number(id) },
  });

  res.json(specialty);
};
