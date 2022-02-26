

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);
  let appointments = [];

  if (filteredDay.length) {
    appointments = filteredDay[0].appointments.map(spot => state.appointments[spot]);
  }
  return appointments;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);
  let appointments = [];

  if (filteredDay.length) {
    appointments = filteredDay[0].appointments.map(spot => state.appointments[spot]);
  }
  return appointments;
}


// function returns an object that contains the interview data if it is passed an object that contains an interviewer
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewDetails = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return interviewDetails;
}

