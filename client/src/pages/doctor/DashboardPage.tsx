import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

import {
  noshowAppointment,
  completeAppointment,
  getUpcomingAppointmentsForDoctor,
} from "../../lib/api/appointments";
import { Appointment } from "../../lib/types";
import { getAge } from "../../lib/utils/time";

import "./DoctorAppointments.scss";
const DashboardPage = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [bookingToUpdate, setBookingToUpdate] = useState<number | null>(null);
  const [noShowModalHidden, setNoShowModalHidden] = useState(true);
  const [completeModalHidden, setCompleteModalHidden] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  let match = useRouteMatch();

  const showNoShowModal = (id: number) => {
    setBookingToUpdate(id);
    setNoShowModalHidden(false);
  };

  const hideNoShowModal = () => {
    setNoShowModalHidden(true);
  };

  const showCompleteModal = (id: number) => {
    setBookingToUpdate(id);
    setCompleteModalHidden(false);
  };

  const hideCompleteModal = () => {
    setCompleteModalHidden(true);
  };

  const confirmNoShowAppointment = async () => {
    if (bookingToUpdate === null) return;
    const response = await noshowAppointment(bookingToUpdate);

    hideNoShowModal();
    setUpdateCount(updateCount + 1);
  };

  const confirmCompleteAppointment = async () => {
    if (bookingToUpdate === null) return;
    const response = await completeAppointment(bookingToUpdate);

    hideCompleteModal();
    setUpdateCount(updateCount + 1);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setAppointments(await getUpcomingAppointmentsForDoctor());
    };
    fetchAPI();
    // eslint-disable-next-line
  }, [updateCount]);

  if (appointments === null) return <div>Loading...</div>;
  if (!appointments.length) return <div>You have no upcoming appointments</div>;
  return (
    <>
      <Modal
        key="noshowModal"
        modalHidden={noShowModalHidden}
        handleClose={hideNoShowModal}
        handleOk={confirmNoShowAppointment}
        title="Mark as appointment no-show"
        okText="Yes"
      >
        Are sure you want to mark this appointment as a no-show?
      </Modal>
      <Modal
        key="completeModal"
        modalHidden={completeModalHidden}
        handleClose={hideCompleteModal}
        handleOk={confirmCompleteAppointment}
        title="Complete Appointment"
        okText="Yes"
      >
        Are sure you want to mark this appointment as completed?
      </Modal>
      <div>
        <h1>Upcoming Appointments</h1>
        {appointments.map((item: Appointment) => (
          <div className="row card" key={item.id}>
            <div className="primary-attribute">{item.patient?.name}</div>
            <div>{dayjs(item.date).format("ddd, MMM DD")}</div>
            <div>{item.time}</div>
            <div>{getAge(new Date(item.patient?.birthday))}</div>
            <div>{item.patient?.gender}</div>
            <div>{item.status}</div>

            {item.status === "BOOKED" ? (
              <>
                <button onClick={() => showCompleteModal(item.id)}>
                  Complete
                </button>

                <button onClick={() => showNoShowModal(item.id)}>
                  No-show
                </button>
              </>
            ) : null}

            <Link to={`/portal/appointments/${item.id}`}>Details</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardPage;
