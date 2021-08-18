import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {
  RequestWithUser,
  RequestWithDoctor,
  RequestWithPatient,
} from "../interfaces/requests.interface";

export const getAllAppointmentsForPatient = async (
  req: RequestWithPatient,
  res: Response
) => {
  try {
    console.log(req.patientId);
    const tasks = await prisma.appointment.findMany({
      where: { patientId: Number(req.patientId) },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const getAllAppointmentsForDoctor = async (
  req: RequestWithDoctor,
  res: Response
) => {
  try {
    const tasks = await prisma.appointment.findMany({
      where: { doctorId: Number(req.doctorId) },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { startTime, endTime, status, patientId, doctorId } = req.body;

    const newTodo = await prisma.appointment.create({
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status,
        patient: { connect: { id: Number(patientId) } },
        doctor: { connect: { id: Number(doctorId) } },
      },
    });

    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, status, patientId, doctorId } = req.body;

    const task = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { startTime, endTime, status, patientId, doctorId },
    });

    res.json(task);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.appointment.delete({
      where: { id: Number(id) },
    });

    res.json(task);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};
