export const getDaysBooking = ([date1, date2]) => {

  const firstDay = date1.getTime()
  const secondDay = date2.getTime()

  const totalMils = secondDay - firstDay

  const totalDays = ((((totalMils / 1000) / 60) / 60) / 24)

  return totalDays
}

export const isValidBookingDate = ([date1, date2], bookedDate, daysBooked) => {

  const requestedFrom = date1.getTime() + 1
  const requestedTo = date2.getTime()

  const bookedFrom = bookedDate.getTime()
  const bookedTo = bookedDate.setDate(bookedDate.getDate() + daysBooked)

  return bookedFrom > requestedTo || bookedTo < requestedFrom
}

export const isItBookedToday = (bookings) => {

  if (bookings.length === 0) return true

  const isItBooked = bookings.reduce((acc, eachBooking) => {

    const today = new Date().getTime()
    const bookedFrom = stringToDate(eachBooking.bookingDate).getTime()
    const bookedTo = bookedFrom + eachBooking.daysBooked * 3600 * 1000 * 24

    if (bookedFrom >= today && today <= bookedTo) return (acc && true)
    else return (acc && false)

  }, true)

  return isItBooked
}

export const stringToDate = (timestamp) => {

  const timestampParts = timestamp?.split(" ")
  const day = timestampParts[2]
  const month = timestampParts[1]
  const year = timestampParts[3]

  const newDate = new Date(`${month} ${day}, ${year}`)
  return newDate

}