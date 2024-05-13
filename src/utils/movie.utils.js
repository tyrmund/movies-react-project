export const getRatingColor = rating => {
  let ratingColor = ''
  if (rating > 8.5) ratingColor = 'bg-success'
  else if (rating > 7) ratingColor = 'bg-info'
  else if (rating > 4) ratingColor = 'bg-warning'
  else ratingColor = 'bg-danger'

  return ratingColor
}