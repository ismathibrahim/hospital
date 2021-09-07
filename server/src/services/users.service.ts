import prisma from "../lib/prisma";

export const getUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      patientProfile: true,
      doctorProfile: true,
      adminProfile: true,
    },
  });
};
