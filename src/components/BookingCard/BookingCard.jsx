import { Card, Row, Col } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import './BookingCard.css'

const API_URL = import.meta.env.VITE_API_URL

function BookingCard({ fullName, bookingDate, daysBooked, movieId }) {

  const [movie, setMovie] = useState({})

  useEffect(() => {
    getMovie()
  }, [])

  const getMovie = () => {
    axios
      .get(`${API_URL}/movies/${movieId}`)
      .then(({ data }) => setMovie(data))
      .catch(err => console.log(err))
  }


  return (
    <div className="BookingCard mb-4">
      <Card>
        <Row>
          <Col className='md-8 d-flex align-items-center'>
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">By: {fullName}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Booked for: {daysBooked} days</Card.Subtitle>
            </Card.Body>
          </Col>
          <Col className='md-4'>
            <Card.Img variant="top" src={movie.image} alt={movie.title} />
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default BookingCard