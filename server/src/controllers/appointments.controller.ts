import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/requests.interface";
import * as appointmentService from "../services/appointments.service";

export const getAppointment = async (req: RequestWithUser, res: Response) => {
  try {
    const appointment = await appointmentService.getAppointment(
      Number(req.params.id)
    );

    res.json(appointment);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const getAllAppointmentsForPatient = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const appointments = await appointmentService.getAllAppointmentsForPatient(
      Number(req.user.patientId)
    );

    res.json(appointments);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const getAllAppointmentsForDoctor = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const appointments = await appointmentService.getAllAppointmentsForDoctor(
      Number(req.user.doctorId)
    );

    res.json(appointments);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const getAppointmentsForDoctorByDate = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const { doctorId, date } = req.params;
    const appointments =
      await appointmentService.getAppointmentsForDoctorByDate(
        Number(doctorId),
        new Date(date)
      );

    res.json(appointments);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { time, date, patientId, doctorId, reason, notes } = req.body;

    const newAppointment = await appointmentService.createAppointment({
      date: new Date(date),
      time: time,
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      reason,
      notes,
    });

    res.json(newAppointment);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { time, status, patientId, doctorId } = req.body;

    const appointments = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { time, status, patientId, doctorId },
    });

    res.json(appointments);
  } catch (error: any) {
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
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};
