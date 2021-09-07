import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../interfaces/requests.interface";
import * as authService from "../services/auth.service";
import * as userService from "../services/users.service";

export const authorize = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    const payload = authService.verifyJwtToken(jwtToken);

    req.user = payload.user;
    next();
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Not Authorized");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);

    res.json({ token });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

export const verifyLogin = async (req: RequestWithUser, res: Response) => {
  try {
    const user = await userService.getUser(Number(req.user.id));

    res.json(user);

    return res.json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};
