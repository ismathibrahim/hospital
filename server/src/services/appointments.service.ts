import { CreateAppointmentDto, RescheduleAppointmentDto } from "../lib/dtos";
import prisma from "../lib/prisma";

export const getAppointment = async (id: number) => {
  return await prisma.appointment.findUnique({
    where: { id: id },
    select: {
      id: true,
      date: true,
      time: true,
      createdAt: true,
      status: true,
      patient: true,
      doctor: true,
      reason: true,
      notes: true,
    },
  });
};

export const getAllAppointmentsForPatient = async (patientId: number) => {
  return await prisma.appointment.findMany({
    where: { patientId: patientId },
    select: {
      id: true,
      date: true,
      time: true,
      createdAt: true,
      status: true,
      patient: true,
      doctor: true,
      reason: true,
      notes: true,
    },
  });
};

export const getUpcomingAppointmentsForPatient = async (patientId: number) => {
  return await prisma.appointment.findMany({
    where: { patientId: patientId, status: "BOOKED" },
    select: {
      id: true,
      date: true,
      time: true,
      createdAt: true,
      status: true,
      patient: true,
      doctor: true,
      reason: true,
      notes: true,
    },
  });
};

export const getAllAppointmentsForDoctor = async (doctorId: number) => {
  return await prisma.appointment.findMany({
    where: { doctorId: doctorId },
    select: {
      id: true,
      date: true,
      time: true,
      createdAt: true,
      status: true,
      patient: true,
      doctor: true,
      reason: true,
      notes: true,
    },
  });
};

export const getUpcomingAppointmentsForDoctor = async (doctorId: number) => {
  return await prisma.appointment.findMany({
    where: { doctorId: doctorId, status: "BOOKED" },
    select: {
      id: true,
      date: true,
      time: true,
      createdAt: true,
      status: true,
      patient: true,
      doctor: true,
      reason: true,
      notes: true,
    },
  });
};

export const getAppointmentsForDoctorByDate = async (
  doctorId: number,
  date: Date
) => {
  return await prisma.appointment.findMany({
    where: { doctorId: doctorId, date: date, status: "BOOKED" },
    select: {
      id: true,
      date: true,
      time: true,
    },
  });
};

export const createAppointment = async (
  appointmentData: CreateAppointmentDto
) => {
  const { date, time, patientId, doctorId, reason, notes } = appointmentData;
  return await prisma.appointment.create({
    data: {
      date,
      time,
      status: "BOOKED",
      patient: { connect: { id: patientId } },
      doctor: { connect: { id: doctorId } },
      reason,
      notes,
    },
  });
};

export const cancelAppointment = async (id: number) => {
  return await prisma.appointment.update({
    where: { id: id },
    data: {
      status: "CANCELLED",
    },
  });
};

export const rescheduleAppointment = async (
  rescheduleAppointmentDto: RescheduleAppointmentDto
) => {
  const { id, date, time } = rescheduleAppointmentDto;
  return await prisma.appointment.update({
    where: { id: id },
    data: {
      date,
      time,
    },
  });
};

export const noShowAppointment = async (id: number) => {
  return await prisma.appointment.update({
    where: { id: id },
    data: {
      status: "NOSHOW",
    },
  });
};

export const completeAppointment = async (id: number) => {
  return await prisma.appointment.update({
    where: { id: id },
    data: {
      status: "COMPLETED",
    },
  });
};

export const getNumberOfAppointments = async () => {
  return await prisma.appointment.count();
};
