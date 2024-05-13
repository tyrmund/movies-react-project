export const getRatingColor = rating => {
  let ratingColor = ''
  if (rating > 8.5) ratingColor = 'bg-success'
  else if (rating > 7) ratingColor = 'bg-info'
  else if (rating > 4) ratingColor = 'bg-warning'
  else ratingColor = 'bg-danger'

  return ratingColor
}

export const getRunningTime = time => {
  const hoursAndMinutes = time.split(':')
  const hours = Number(hoursAndMinutes[0]) * 60
  const minutes = Number(hoursAndMinutes[1])
  return (hours + minutes)
}

export const getTimeAsString = runningTime => {
  const minutes = (runningTime % 60).toString()
  const hours = Math.floor(runningTime / 60).toString()
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
}