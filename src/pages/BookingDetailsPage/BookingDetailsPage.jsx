import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Toast } from "react-bootstrap"
import { MONTH_STRINGS } from "../../consts/data.consts"
import { stringToDate } from "../../utils/booking.utils"

const API_URL = 'http://localhost:5000'

function BookingDetailsPage() {

  useEffect(() => {
    loadBooking()
  }, [])

  const navigate = useNavigate()

  const { bookingId } = useParams()
  const [booking, setBooking] = useState({})
  const [movie, setMovie] = useState({})
  const [showToast, setShowToast] = useState(false)

  const loadBooking = () => {
    axios
      .get(`${API_URL}/bookings/${bookingId}`)
      .then(({ data }) => {
        setBooking(data)
        loadMovie(data.movieId)
      })
      .catch(err => console.log(err))
  }

  const loadMovie = (movieId) => {
    if (movieId) {
      axios
        .get(`${API_URL}/movies/${movieId}`)
        .then(({ data }) => setMovie(data))
        .catch(err => console.log(err))
    }
  }

  const handleDeleteButton = () => {

    setShowToast(true)
    axios
    // .delete(`${API_URL}/bookings/${bookingId}`)
    // .then(navigate('/bookings'))
    // .catch(err => console.log(err))
  }

  const monthNames = MONTH_STRINGS

  let parsedDate
  if (booking.bookingDate) {
    parsedDate = stringToDate(booking?.bookingDate)
  }

  return (

    <div className="BookingDetailsPage">
      <Container className="mt-5 shadow-lg p-3 rounded" style={{ maxWidth: '800px' }}>
        <Row className="pd-5">
          <Col className="m-2" md={{ span: 4, offset: 1 }}>
            <Link to={`/movies/${movie.id}`}>
              <img
                className="ml-5 shadow-lg w-100 h-auto rounded"
                style={{ maxWidth: '200px' }}
                src={movie.image}
                alt={movie.title} />
            </Link>
          </Col>
          <Col className="m-2" md={{ span: 6 }}>
            <h1 className="mb-2">Booking Info</h1>
            <hr className="w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
            <p className="mt-5"><b>Name of borrower:</b> {booking.fullName}</p>
            <p><b>Movie booked:</b> {movie?.title}</p>
            <p><b>Date of booking:</b> {booking.bookingDate} </p>
            <p style={{ fontStyle: 'italic', color: 'red' }}>Movie booked for {booking.daysBooked} days</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Link
            to={`/bookings/edit/${bookingId}`}
            style={{ textDecoration: 'none' }}>
            <Button
              type='button'
              className="mx-auto d-block bg-secondary border-secondary"
              style={{ width: '200px', height: '60px' }}>
              Edit Entry
            </Button>
          </Link>
        </Row>
        <Row className="mt-3 justify-content-end">
          <Col xs='auto'>
            <Button
              type='button'
              className=" m-4 bg-danger border-danger"
              style={{ width: '100px', height: '40px' }}
              onClick={handleDeleteButton}>
              Delete
            </Button>
          </Col>
        </Row>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          style={{
            position: 'absolute',
            top: 200,
            right: 200,
            zIndex: 1
          }}
          delay={3000}
          autohide>
          <Toast.Header>
            <strong className="me-auto">Ironbuster</strong>
          </Toast.Header>
          <Toast.Body>Deleting {booking.fullName}'s entry...</Toast.Body>
        </Toast>
      </Container>
    </div>

  )

}

export default BookingDetailsPage