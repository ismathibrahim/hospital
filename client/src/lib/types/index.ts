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

export interface Doctor {
  id: number;
  name: string;
  userId: number;
  specialty: Specialty;
  phone: string;
  gender: string;
  qualification: string;
  experience: number;
}

export interface Appointment {
  id: number;
  createdAt: string;
  startTime: string;
  endTime: string;
  status: string;
  patientId: number;
  doctorId: number;
}

export interface Specialty {
  id: number;
  name: string;
}
