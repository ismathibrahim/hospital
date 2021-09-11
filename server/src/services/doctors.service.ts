import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import createJwt from "../utils/createJwt";
import { RegisterDoctorDto } from "../lib/dtos";
import { HttpException } from "../lib/exceptions";
import { Role } from ".prisma/client";

export const getAllDoctors = async () => {
  return await prisma.doctor.findMany({
    select: {
      id: true,
      name: true,
      specialty: true,
      gender: true,
      qualification: true,
      experience: true,
    },
  });
};

export const registerDoctor = async (registerDoctorDto: RegisterDoctorDto) => {
  const {
    name,
    email,
    password,
    gender,
    phone,
    specialtyId,
    qualification,
    experience,
  } = registerDoctorDto;

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
      role: Role.DOCTOR,
      doctorProfile: {
        create: {
          name,
          gender,
          phone,
          specialty: { connect: { id: specialtyId } },
          qualification,
          experience,
        },
      },
    },
    select: {
      doctorProfile: true,
    },
  });

  return { id: newUser.doctorProfile?.id };
};

export const getNumberOfDoctors = async () => {
  return await prisma.doctor.count();
};
