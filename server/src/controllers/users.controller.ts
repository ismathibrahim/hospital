import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/requests.interface";
import * as userService from "../services/users.service";

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUser(Number(req.params.id));

  res.json(user);
};

export const getCurrentUser = async (req: RequestWithUser, res: Response) => {
  const user = await userService.getUser(Number(req.user.id));

  res.json(user);
};
