export interface UserStoredInToken {
  id: number;
  role: Role;
}

enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
