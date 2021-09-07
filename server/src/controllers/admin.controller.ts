import * as adminService from "../services/admin.service";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const token = await adminService.registerAdmin(req.body);

    res.json({ token });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};
