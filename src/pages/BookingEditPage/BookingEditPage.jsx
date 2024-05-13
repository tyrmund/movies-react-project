import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Col, Container, Row, Form, Button } from "react-bootstrap"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'



const API_URL = "http://localhost:5000"

function BookingEditPage() {

  const [bookingData, setBookingData] = useState({
    fullName: '',
    daysBooked: '',
    bookingDate: 0
  })

  const { bookingId } = useParams()

  const navigate = useNavigate()

  const [date, setDate] = useState([new Date(), new Date()])

  const handleDateChange = newDate => {
    setDate(newDate)
  }

  useEffect(() => {
    loadBooking()
  }, [])

  const loadBooking = () => {

    axios
      .get(`${API_URL}/bookings/${bookingId}`)
      .then(({ data }) => setBookingData(data))
      .catch(err => console.log(err))

  }

  const handleBookingEditChange = (event) => {
    const { value, name } = event.target
    setBookingData({ ...bookingData, [name]: value })
  }

  const handleEditBookingSubmit = e => {
    e.preventDefault()

    axios
      .put(`${API_URL}/bookings/${bookingId}`, bookingData)
      .then(navigate('/bookings'))
      .catch(err => console.log(err))

  }

  return (
    <div className="BookingNewPage mt-3">
      <Container>
        <Row>
          <Col md={{ span: 5, offset: 3 }}>
            <h2></h2>
            <Form onSubmit={handleEditBookingSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="fullName"
                  value={bookingData.fullName}
                  onChange={handleBookingEditChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Amount of days: </Form.Label>
                <Form.Control
                  type="number"
                  name="daysBooked"
                  value={bookingData.daysBooked}
                  onChange={handleBookingEditChange}
                />
              </Form.Group>
              <DateRangePicker onChange={handleDateChange} value={date} />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>

        </Row>
      </Container>
    </div>

  )
}

export default BookingEditPage