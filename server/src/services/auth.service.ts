import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import createJwt from "../utils/createJwt";
import { LoginDto } from "../lib/dtos";
import { HttpException } from "../lib/exceptions";
import { UserStoredInToken } from "../interfaces/auth.interface";

export const login = async (loginData: LoginDto) => {
  const { email, password, role } = loginData;

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

  if (!user) throw new HttpException(401, "User does not exist");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new HttpException(401, "Password is incorrect");

  const token = createJwt({
    id: user.id,
    role,
    patientId: user.patientProfile?.id,
    doctorId: user.doctorProfile?.id,
    adminId: user.adminProfile?.id,
  });

  return token;
};

export const verifyJwtToken = (jwtToken: string) => {
  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET as string) as {
      user: UserStoredInToken;
    };

    return payload;
  } catch (error) {
    console.error(error.message);
    throw new HttpException(403, "Invalid token");
  }
};
