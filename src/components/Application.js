import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
// import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "./helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      appointments: [
        {
          id: 1,
          time: "12pm",
        },
        {
          id: 2,
          time: "1pm",
          interview: {
            student: "Lydia Miller-Jones",
            interviewer: {
              id: 3,
              name: "Sylvia Palmer",
              avatar: "https://i.imgur.com/LpaY82x.png",
            }
          }
        },
        {
          id: 3,
          time: "2pm",
        },
        {
          id: 4,
          time: "3pm",
          interview: {
            student: "Archie Andrews",
            interviewer: {
              id: 4,
              name: "Cohana Roy",
              avatar: "https://i.imgur.com/FK8V841.jpg",
            }
          }
        },
        {
          id: 5,
          time: "4pm",
        }
      ]
    },
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // const setDays = (days) => setState(prev => ({ ...prev, days }));


  // useEffect(() => {
  //   axios.get('/api/days')
  //     .then((response) => {
  //       // setDays(response.data)
  //     })
  // }, []);


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);
  const setDay = day => setState({ ...state, day });

  const allAppointments = dailyAppointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{allAppointments}</section>
    </main>
  );
}
