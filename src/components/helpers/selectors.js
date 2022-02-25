




export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);
  let appointments = [];

  if (filteredDay.length) {
    appointments = filteredDay[0].appointments.map(spot => state.appointments[spot]);
  }
  return appointments;
}