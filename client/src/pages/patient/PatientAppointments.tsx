import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { getAppointmentsForPatient } from "../../lib/api/appointments";
import { Appointment } from "../../lib/types";
import {
  cancelAppointment,
  rescheduleAppointment,
} from "../../lib/api/appointments";

import "./PatientAppointments.scss";
import Modal from "../../components/Modal/Modal";
import { getDateString } from "../../lib/utils/time";
import RescheduleForm from "../../components/RescheduleForm/RescheduleForm";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [bookingToUpdate, setBookingToUpdate] = useState<Appointment | null>(
    null
  );
  const [cancelModalHidden, setCancelModalHidden] = useState(true);
  const [rescheduleModalHidden, setRescheduleModalHidden] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);
  const [date, setDate] = useState<Date>();
  const [slot, setSlot] = useState<string>();

  let match = useRouteMatch();

  const showCancelModal = (booking: Appointment) => {
    setBookingToUpdate(booking);
    setCancelModalHidden(false);
  };

  const showRescheduleModal = (booking: Appointment) => {
    setBookingToUpdate(booking);
    setDate(new Date());
    setRescheduleModalHidden(false);
  };

  const hideCancelModal = () => {
    setCancelModalHidden(true);
  };

  const hideRescheduleModal = () => {
    setRescheduleModalHidden(true);
  };

  const confirmCancelAppointment = async () => {
    if (bookingToUpdate === null) return;
    const response = await cancelAppointment(bookingToUpdate.id);

    hideCancelModal();
    setUpdateCount(updateCount + 1);
  };

  const confirmRescheduleAppointment = async () => {
    if (bookingToUpdate === null || date === undefined || slot === undefined)
      return;
    const response = await rescheduleAppointment(
      bookingToUpdate.id,
      getDateString(date),
      slot
    );

    hideRescheduleModal();
    setUpdateCount(updateCount + 1);
  };

  const onDateChange = (date: Date | null) => {
    if (date == null) return;
    setDate(date);
  };

  const onSlotChange = (option: any) => {
    setSlot(option.value);
  };
  useEffect(() => {
    const fetchAPI = async () => {
      setAppointments(await getAppointmentsForPatient());
    };
    fetchAPI();
    // eslint-disable-next-line
  }, [updateCount]);

  if (appointments === null) return <div>Loading...</div>;
  if (!appointments.length) return <div>No Appointments</div>;
  return (
    <>
      <Modal
        key="cancelModal"
        modalHidden={cancelModalHidden}
        handleClose={hideCancelModal}
        handleOk={confirmCancelAppointment}
        title="Cancel Appointment"
        okText="Yes, cancel"
      >
        Are sure you want to cancel this appointment?
      </Modal>
      <Modal
        key="rescheduleModal"
        modalHidden={rescheduleModalHidden}
        handleClose={hideRescheduleModal}
        handleOk={confirmRescheduleAppointment}
        title="Reschedule Appointment"
        okText="Reschedule"
      >
        <RescheduleForm
          date={date}
          doctorId={bookingToUpdate?.doctor?.id}
          onDateChange={onDateChange}
          onSlotChange={onSlotChange}
        />
      </Modal>
      <div>
        <h1>Patient Appointments</h1>
        {appointments.map((item: Appointment) => (
          <div className="row card" key={item.id}>
            <div className="primary-attribute">{item.doctor?.name}</div>
            <div>{dayjs(item.date).format("ddd, MMM DD")}</div>
            <div>{item.time}</div>
            <div>{item.reason}</div>
            <div>{item.status}</div>

            {item.status === "BOOKED" ? (
              <>
                <button onClick={() => showRescheduleModal(item)}>
                  Reschedule
                </button>

                <button onClick={() => showCancelModal(item)}>Cancel</button>
              </>
            ) : null}

            <Link to={`${match.url}/${item.id}`}>Details</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PatientAppointments;
