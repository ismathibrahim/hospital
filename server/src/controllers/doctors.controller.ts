import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import createJwt from "../utils/createJwt";
import { NextFunction, Request, Response } from "express";
import * as doctorService from "../services/doctors.service";

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorService.getAllDoctors();

    res.json(doctors);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        name: true,
        specialty: true,
        gender: true,
        qualification: true,
        experience: true,
      },
    });

    res.json(doctors);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const response = await doctorService.registerDoctor(req.body);

    res.json(response);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

export const getNumberOfDoctors = async (req: Request, res: Response) => {
  try {
    const count = await doctorService.getNumberOfDoctors();

    res.json(count);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
};
