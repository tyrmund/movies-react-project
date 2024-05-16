import { getRatingColor } from "../../utils/movie.utils"
import { Card, Button } from "react-bootstrap"
import './MovieCard.css'
import { isItBookedToday } from "../../utils/booking.utils"
import { stringToDate } from "../../utils/booking.utils"

function MovieCard({ title, image, genre, director, rating, bookings }) {

  const ratingColor = getRatingColor(rating)
  let bookedEffect = ''
  if (!isItBookedToday(bookings)) bookedEffect = 'opacity-50'

  return (
    <div className={`MovieCard mt-5 ${bookedEffect}`}>
      <Card className="shadow-sm">
        <Card.Img variant="top" src={image} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <b>Director:</b> {director}
          </Card.Text>
          <Card.Subtitle
            style={{ color: 'white' }}
            className="mb-2 bg-secondary rounded p-1 opacity-75 d-inline">
            {genre}
          </Card.Subtitle>
          <Card.Text
            style={{ color: 'white' }}
            className={`rating ${ratingColor} p-1 m-2 rounded d-inline`}>
            Rating: {rating}
          </Card.Text>
          {isItBookedToday(bookings) ?
            <Card.Text className="mt-3" style={{ color: 'green' }}>Available Today!</Card.Text> :
            <Card.Text className="mt-3" style={{ color: 'red' }}>Currently Booked...</Card.Text>}
        </Card.Body>
      </Card >
    </div>
  )

}

export default MovieCard