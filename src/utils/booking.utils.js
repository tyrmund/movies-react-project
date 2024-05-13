export const getDaysBooking = ([date1, date2]) => {

  const firstDay = date1.getTime()
  const secondDay = date2.getTime()

  const totalMils = secondDay - firstDay

  const totalDays = ((((totalMils / 1000) / 60) / 60) / 24)

  return totalDays
}

export const isValidBookingDate = ([date1, date2], bookedDate, daysBooked) => {
  const date1Mili = date1.getTime()
  const date2Mili = date2.getTime()
  const bookedDateMili = bookedDate.getTime()
  const daysBookedMili = bookedDate.getTime() + (daysBooked * 1000 * 360 * 24)

  if (date2Mili < bookedDateMili || daysBookedMili < date1Mili) { }

}