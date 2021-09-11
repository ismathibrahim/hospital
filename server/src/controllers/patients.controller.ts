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

export const getNumberOfPatients = async (req: Request, res: Response) => {
  try {
    const count = await patientService.getNumberOfPatients();

    res.json(count);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
};
