export interface UserStoredInToken {
  id: number;
  role: Role;
  patientId?: number;
  doctorId?: number;
  adminId?: number;
}

enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
