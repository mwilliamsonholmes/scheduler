
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);
  let appointments = [];

  if (filteredDay.length) {
    appointments = filteredDay[0].appointments.map(spot => state.appointments[spot]);
  }
  return appointments;
}


export function getInterviewersForDay(state, day) {
  // match the day to the state
  const appointmentsOfThatDay = state.days.filter(
    (filteredDay) => filteredDay.name === day
  )[0];
  // using the array of appointments render the interviewers objects
  const matchedInterviewers = [];
  // console.log("app of that day==", appointmentsOfThatDay);
  if (appointmentsOfThatDay) {
    appointmentsOfThatDay.interviewers.map((interviewer) =>
      matchedInterviewers.push(state.interviewers[interviewer])
    );
  }
  // console.log("matchedInterviewers::", matchedInterviewers);
  return matchedInterviewers;
};



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

