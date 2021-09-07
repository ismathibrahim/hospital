import { Role } from "@prisma/client";

export interface UserStoredInToken {
  id: number;
  role: Role;
  patientId?: number;
  doctorId?: number;
  adminId?: number;
}
