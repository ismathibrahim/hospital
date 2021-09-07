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

export interface Patient {
  id: number;
  userId: number;
  name: string;
  gender: string;
  phone: string;
  birthday: string;
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
  date: string;
  time: string;
  status: string;
  patientId: number;
  patient: Patient;
  doctorId: number;
  doctor: Doctor;
  reason: string;
  notes: string;
}

export interface Specialty {
  id: number;
  name: string;
}

export interface NewAppointment {
  date: string;
  time: string;
  patientId: number;
  doctorId: number;
  reason: string;
  notes: string;
}

export interface NewPatient {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  birthday: string;
}

export interface NewDoctor {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  specialtyId: number;
  experience: number;
  qualification: string;
}
