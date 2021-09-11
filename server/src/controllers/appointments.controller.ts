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

export const getUpcomingAppointmentsForPatient = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const appointments =
      await appointmentService.getUpcomingAppointmentsForPatient(
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

export const getUpcomingAppointmentsForDoctor = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const appointments =
      await appointmentService.getUpcomingAppointmentsForDoctor(
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

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.cancelAppointment(Number(id));

    res.json(appointment);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const rescheduleAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    const appointment = await appointmentService.rescheduleAppointment({
      id: Number(id),
      date: new Date(date),
      time,
    });

    res.json(appointment);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const noShowAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.noShowAppointment(Number(id));

    res.json(appointment);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};

export const completeAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.completeAppointment(
      Number(id)
    );

    res.json(appointment);
  } catch (error: any) {
    console.error(error.message);
    return res.status(403).json("Server error");
  }
};
