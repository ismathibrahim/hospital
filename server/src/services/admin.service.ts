import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import createJwt from "../utils/createJwt";
import { RegisterAdminDto } from "../lib/dtos";
import { Role } from "@prisma/client";
import { HttpException } from "../lib/exceptions";

export const registerAdmin = async (registerAdminDto: RegisterAdminDto) => {
  const { name, email, password } = registerAdminDto;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user) throw new HttpException(401, "User already exists");

  const salt = await bcrypt.genSalt(10);

  const bcryptPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: bcryptPassword,
      role: Role.ADMIN,
      adminProfile: {
        create: {
          name,
        },
      },
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      adminProfile: true,
    },
  });

  const token = createJwt({
    id: newUser.id,
    role: Role.ADMIN,
    adminId: newUser.adminProfile?.id,
  });

  return token;
};
