import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import createJwt from "../utils/createJwt";
import { RegisterPatientDto } from "../lib/dtos";
import { Role } from "@prisma/client";
import { HttpException } from "../lib/exceptions";

export const registerPatient = async (
  registerPatientDto: RegisterPatientDto
) => {
  const { name, email, password, gender, birthday, phone } = registerPatientDto;

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
      role: Role.PATIENT,
      patientProfile: {
        create: {
          name,
          gender,
          birthday: new Date(birthday),
          phone,
        },
      },
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      patientProfile: true,
    },
  });

  const token = createJwt({
    id: newUser.id,
    role: Role.PATIENT,
    patientId: newUser.patientProfile?.id,
  });

  return token;
};
