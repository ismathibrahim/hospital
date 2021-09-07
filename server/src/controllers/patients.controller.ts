import * as patientService from "../services/patients.service";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const token = await patientService.registerPatient(req.body);

    res.json({ token });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};
