import { Request } from "express";
import { UserStoredInToken } from "./auth.interface";

export interface RequestWithUser extends Request {
  user: UserStoredInToken;
}

export interface RequestWithPatient extends Request {
  patientId: number;
}

export interface RequestWithDoctor extends Request {
  doctorId: number;
}
