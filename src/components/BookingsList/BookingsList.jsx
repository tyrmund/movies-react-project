import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import BookingCard from "../BookingCard/BookingCard.jsx"
import { Link } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

function BookingsList() {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getAllBookings()
  }, [])

  const getAllBookings = () => {
    axios
      .get(`${API_URL}/bookings`)
      .then(({ data }) => setBookings(data))
      .catch(err => console.log(err))
  }

  return (
    <div className="BookingsList">
      <Container>
        <Row className="mt-5">
          {bookings.map((booking) =>
            <Col
              key={booking.id}
              md={{ span: 6 }}>
              <Link
                to={`/bookings/${booking.id}`}
                style={{ textDecoration: 'none' }}
              >
                <BookingCard {...booking} />
              </Link>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default BookingsList