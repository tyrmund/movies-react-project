import axios from "axios"
import './BookingDetailsPage.css'
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import { MONTH_STRINGS } from "../../consts/data.consts"
import { stringToDate } from "../../utils/booking.utils"

const API_URL = import.meta.env.VITE_API_URL

function BookingDetailsPage() {

  useEffect(() => {
    loadBooking()
  }, [])

  const navigate = useNavigate()

  const { bookingId } = useParams()
  const [booking, setBooking] = useState({})
  const [movie, setMovie] = useState({})
  const [showModal, setShowModal] = useState(false)

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

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleDeleteButton = () => {

    axios
      .delete(`${API_URL}/bookings/${bookingId}`)
      .then(navigate('/bookings'))
      .catch(err => console.log(err))
  }

  const monthNames = MONTH_STRINGS

  let parsedDate
  if (booking.bookingDate) {
    parsedDate = stringToDate(booking?.bookingDate)
  }

  return (

    <div className="BookingDetailsPage">
      <Container className="mt-5 p-3 rounded " style={{
        maxWidth: '950px', border: '1.8px solid rgba(239, 239, 240, 0.9)',
        borderRadius: '10px', boxShadow: '2px 2px 2px 1px gainsboro', fontSize: '20px'
      }}>
        <Row className="align-items-center">

          <Col className="m-2" md={{ span: 5, offset: 1 }}>
            <Link to={`/movies/${movie.id}`}>
              <img
                className="ml-5 h-auto rounded"
                style={{ maxWidth: '320px' }}
                src={movie.image}
                alt={movie.title} />
            </Link>
          </Col>
          <Col className="m-2 w-5" md={{ span: 6 }}>
            <div className="booking-text">
              <div>
                <h1 className="mb-3">Booking Info</h1>
                <hr className="w-50 mb-5" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
              </div>

              <p><b>Name of borrower:</b> {booking.fullName}</p>
              <p><b>Movie booked:</b> {movie?.title}</p>
              <p><b>Date of booking:</b> {booking.bookingDate} </p>
              <p style={{ fontStyle: 'italic', color: 'red' }} className="mb-5">Movie booked for {booking.daysBooked} days</p>
            </div>

            <div className="btns-booking">

              <Link
                to={`/bookings/edit/${bookingId}`}
                style={{ textDecoration: 'none' }}>
                <Button
                  type='button'
                  className="bg-secondary"
                  style={{ width: '100px', height: '40px', border: 'none' }}>
                  Edit Entry
                </Button>
              </Link>

              <Button
                type='button'
                className="bg-danger border-danger"
                style={{ width: '100px', height: '40px' }}
                onClick={handleShowModal}>
                Delete
              </Button>
            </div>

          </Col>
        </Row>

        <Row className="mt-3 justify-content-end">
          <Col xs='auto'>

          </Col>
        </Row>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{`Delete ${movie?.title} Booking`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`Are you sure you want to delete ${booking.fullName}'s booking? Please confirm your choice.`}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteButton}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div >

  )

}

export default BookingDetailsPage