import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {
  RequestWithUser,
  RequestWithDoctor,
  RequestWithPatient,
} from "../interfaces/requests.interface";

export const getAllAppointmentsForPatient = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    console.log(req.user.patientId);
    const appointments = await prisma.appointment.findMany({
      where: { patientId: Number(req.user.patientId) },
    });

    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const getAllAppointmentsForDoctor = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { doctorId: Number(req.user.doctorId) },
    });

    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const {
      startTime,
      date,
      endTime,
      status,
      patientId,
      doctorId,
      reason,
      notes,
    } = req.body;

    const newAppointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status,
        patient: { connect: { id: Number(patientId) } },
        doctor: { connect: { id: Number(doctorId) } },
        reason,
        notes,
      },
    });

    res.json(newAppointment);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, status, patientId, doctorId } = req.body;

    const appointments = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { startTime, endTime, status, patientId, doctorId },
    });

    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointments = await prisma.appointment.delete({
      where: { id: Number(id) },
    });

    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};
