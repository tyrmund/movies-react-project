export const getDaysBooking = ([date1, date2]) => {

  const firstDay = date1.getTime()
  const secondDay = date2.getTime()

  const totalMils = secondDay - firstDay

  const totalDays = ((((totalMils / 1000) / 60) / 60) / 24)

  return totalDays
}

export const isValidBookingDate = ([date1, date2], bookedDate, daysBooked) => {

  const requestedFrom = date1.getTime()
  const requestedTo = date2.getTime()

  const bookedFrom = bookedDate.getTime()
  const bookedTo = bookedDate.setDate(bookedDate.getDate() + daysBooked) - 3600001

  return bookedFrom > requestedTo || bookedTo < requestedFrom
}


export const stringToDate = (timestamp) => {

  const timestampParts = timestamp?.split(" ")
  const day = timestampParts[2]
  const month = timestampParts[1]
  const year = timestampParts[3]

  const newDate = new Date(`${month} ${day}, ${year}`)
  return newDate

}