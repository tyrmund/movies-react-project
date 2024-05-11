import axios from "axios"
import { useState } from "react"
import { Col, Container, Row, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'

const API_URL = "http://localhost:5000"


function BookingNewPage() {

  const navigate = useNavigate()

  const [bookingData, setBookingData] = useState({
    fullName: '',
    daysBooked: '',
    bookingDate: 0
  })

  const [chosenMovie, setChosenMovie] = useState()

  const [date, setDate] = useState(new Date())

  const handleDateChange = newDate => {
    setDate(newDate)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setBookingData({ ...bookingData, [name]: value })
  }

  const handleBookingFormSubmit = e => {
    e.preventDefault()
    axios
      .post(`${API_URL}/bookings`, bookingData)
      .then(() => navigate('/bookings'))
      .catch(err => console.log(err))
  }

  return (
    <div className="BookingNewPage mt-3">
      <Container>
        <Row>

          <Col md={{ span: 5, offset: 3 }}>
            <h2></h2>
            <Form onSubmit={handleBookingFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="fullName"
                  value={bookingData.fullName}
                  onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Amount of days: </Form.Label>
                <Form.Control
                  type="number"
                  name="daysBooked"
                  value={bookingData.daysBooked}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Calendar
                onChange={handleDateChange}
                value={date} />
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

export default BookingNewPage