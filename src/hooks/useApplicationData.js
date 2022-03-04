import { useState, useEffect } from "react";
import axios from "axios";



export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then(all => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        console.log("all.data===", all[2].data);

        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);

  const setDay = day => setState({ ...state, day });

  //add a spot when apt is deleted
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map((day) => {
      const copy = { ...day };
      if (copy.appointments.includes(id)) {
        copy.spots++
        return copy;
      } else {
        return copy;
      }
    })

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days })
      });
  }

  //check if apt is being booked into an empty spot and then decrease the number of remaining open spots
  function bookInterview(id, interview) {
    let days = state.days;
    if (!state.appointments[id].interview) {
      days = state.days.map((day) => {
        const copy = { ...day };
        if (copy.appointments.includes(id)) {
          copy.spots--
          return copy;
        } else {
          return copy;
        }
      })
    }
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days });
      })
  }
  return { state, setDay, bookInterview, cancelInterview }
}