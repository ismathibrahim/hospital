export interface TodoType {
  id: number;
  description: string;
}

export interface UserType {
  id: number;
  email: string;
  role: Role;
  [key: string]: any;
}

export enum Role {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}
