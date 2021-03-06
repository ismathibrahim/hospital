import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";

import { getDoctor } from "../../lib/api/doctors";
import { createAppointment } from "../../lib/api/appointments";
import { Doctor, NewAppointment } from "../../lib/types";
import Modal from "../../components/Modal/Modal";
import dayjs from "dayjs";
import { useUserContext } from "../../context/UserContext";
import { getDateString } from "../../lib/utils/time";

const DoctorPage = () => {
  const { user } = useUserContext();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  let history = useHistory();
  const [inputs, setInputs] = useState({
    reason: "",
    notes: "",
  });
  const { reason, notes } = inputs;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onDateChange = (date: Date | null) => {
    if (date == null) return;
    setDate(date);
  };

  const [modalHidden, setModalHidden] = useState(true);
  const [slotToBook, setSlotToBook] = useState<string>();

  const showModal = (slot: string) => {
    setSlotToBook(slot);
    setModalHidden(false);
  };

  const hideModal = () => {
    setModalHidden(true);
  };

  const handleSubmit = async () => {
    if (
      doctor?.id === undefined ||
      user?.id === undefined ||
      date === undefined ||
      slotToBook === undefined
    )
      return;
    const newAppointment: NewAppointment = {
      doctorId: doctor?.id,
      patientId: user.id,
      date: getDateString(date),
      time: slotToBook,
      reason: reason,
      notes: notes,
    };

    const response = await createAppointment(newAppointment);

    hideModal();
    history.push(`/portal/appointments/${response.id}`);
  };

  let match = useRouteMatch<{ id: string }>();
  useEffect(() => {
    const fetchAPI = async () => {
      setDoctor(await getDoctor(Number(match.params.id)));
    };
    fetchAPI();
    // eslint-disable-next-line
  }, []);

  if (doctor === null) return <div>Loading...</div>;
  // if (!doctors === undefined) return <div>No Doctors</div>;
  return (
    <>
      <Modal
        modalHidden={modalHidden}
        handleClose={hideModal}
        handleOk={handleSubmit}
        title="New Appointment"
        okText="Book"
      >
        <strong>
          {doctor.name}, {doctor.qualification}
        </strong>
        <p>
          {dayjs(date).format("ddd, MMM DD")} - {slotToBook}
        </p>
        <br />
        <hr />
        <br />
        <p>What's the reason for your visit?</p>
        <input
          type="text"
          placeholder="Reason"
          name="reason"
          className="width-100"
          value={reason}
          onChange={(e) => onChange(e)}
        />
        <p>Notes for the doctor (optional)</p>
        <textarea
          placeholder="Notes"
          name="notes"
          rows={5}
          className="width-100"
          value={notes}
          onChange={(e) => onChange(e)}
        ></textarea>
      </Modal>
      <div className="doctor-page">
        <h1>{doctor.name}</h1>
        <div className="doctor-card">
          <div>Specialty: {doctor.specialty?.name}</div>
          <div>Gender: {doctor.gender}</div>
          <div>Qualification: {doctor.qualification}</div>
          <div>Experience: {doctor.experience} years</div>
        </div>
        <br />
        <hr />
        <br />
        Date:
        <DatePicker
          date={date || new Date()}
          onDateChange={onDateChange}
          locale={enGB}
          minimumDate={new Date()}
        >
          {({ inputProps, focused }) => (
            <input
              className={"input" + (focused ? " -focused" : "")}
              {...inputProps}
            />
          )}
        </DatePicker>
        <Calendar
          doctorId={doctor?.id}
          date={date || new Date()}
          showModal={showModal}
        />
      </div>
    </>
  );
};

export default DoctorPage;
