import { Role } from "@prisma/client";

export interface CreateAppointmentDto {
  date: Date;
  time: string;
  patientId: number;
  doctorId: number;
  reason: string;
  notes: string;
}

export interface RescheduleAppointmentDto {
  id: number;
  date: Date;
  time: string;
}

export interface LoginDto {
  email: string;
  password: string;
  role: Role;
}

export interface RegisterPatientDto {
  name: string;
  email: string;
  password: string;
  gender: string;
  birthday: string;
  phone: string;
}
export interface RegisterDoctorDto {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  specialtyId: number;
  experience: number;
  qualification: string;
}

export interface RegisterAdminDto {
  name: string;
  email: string;
  password: string;
}
