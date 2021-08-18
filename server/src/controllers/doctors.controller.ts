import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import createJwt from "../utils/createJwt";
import { NextFunction, Request, Response } from "express";
import { UserStoredInToken } from "../interfaces/auth.interface";
import { RequestWithUser } from "../interfaces/requests.interface";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role,
      gender,
      specialtyId,
      phone,
      qualification,
      experience,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      return res.status(401).json("User already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: bcryptPassword,
        role,
        doctorProfile: {
          create: {
            name,
            gender,
            specialty: {
              connect: { id: specialtyId },
            },
            phone,
            qualification,
            experience,
          },
        },
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        doctorProfile: true,
      },
    });

    const token = createJwt({
      id: newUser.id,
      role,
    });

    res.json({ newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};
