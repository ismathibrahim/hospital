import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { Prisma, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import createJwt from "../utils/createJwt";
import { NextFunction, Request, Response } from "express";
import { UserStoredInToken } from "../interfaces/auth.interface";
import {
  RequestWithDoctor,
  RequestWithUser,
} from "../interfaces/requests.interface";

export const authorize = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload: { user: UserStoredInToken } = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET as string
    ) as { user: UserStoredInToken };

    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorized");
  }
};

export const validate = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body;

  const validEmail = (userEmail: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, gender, birthday, phone } = req.body;

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
      },
    });

    const profile = await prisma.patient.create({
      data: {
        userId: newUser.id,
        name,
        gender,
        birthday,
        phone,
      },
    });

    const token = createJwt({
      id: newUser.id,
      role,
    });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const user = await prisma.user.findFirst({
      where: { email: email, role: role },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        patientProfile: true,
        doctorProfile: true,
        adminProfile: true,
      },
    });

    if (!user) {
      return res.status(401).json("User does not exist");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json("Password is incorrect");
    }

    const token = createJwt({
      id: user.id,
      role,
      patientId: user.patientProfile?.id,
      doctorId: user.doctorProfile?.id,
      adminId: user.adminProfile?.id,
    });

    res.json({ token, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

export const verifyLogin = async (req: RequestWithUser, res: Response) => {
  try {
    const { id, role } = req.user;

    console.log(req.user);

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        email: true,
        role: true,
        patientProfile: true,
        doctorProfile: true,
        adminProfile: true,
      },
    });

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};
