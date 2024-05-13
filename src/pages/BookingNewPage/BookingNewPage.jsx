import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Container, Row, Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import 'react-calendar/dist/Calendar.css'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { getDaysBooking } from "../../utils/booking.utils"


const API_URL = "http://localhost:5000"


function BookingNewPage() {

  const { movieId } = useParams()

  const navigate = useNavigate()

  const [bookingData, setBookingData] = useState({
    fullName: '',
    daysBooked: '',
    bookingDate: 0
  })

  const [chosenMovie, setChosenMovie] = useState({
    title: '',

  })

  useEffect(() => {
    loadChosenMovie()
  }, [])

  const loadChosenMovie = () => {
    axios
      .get(`${API_URL}/movies/${movieId}`)
      .then(({ data }) => setChosenMovie(data))
      .catch(err => console.log(err))
  }

  const [date, setDate] = useState([new Date(), new Date()])


  const handleDateChange = newDate => {
    setDate(newDate)
    setBookingData({ ...bookingData, daysBooked: Math.ceil(getDaysBooking(newDate)), bookingDate: date[0] })
  }


  const handleInputChange = e => {
    const { name, value } = e.target
    setBookingData({ ...bookingData, [name]: value })
  }

  const handleBookingFormSubmit = e => {
    e.preventDefault()

    console.log(bookingData)
    // axios
    //   .post(`${API_URL}/bookings`, bookingData)
    //   .then(() => navigate('/bookings'))
    //   .catch(err => console.log(err))
  }

  return (
    <div className="BookingNewPage mt-3">
      <Container>
        <Row>
          <Col md={{ span: 5, offset: 3 }} className="shadow-lg mx-auto d-block rounded p-3 m-3">
            <Form onSubmit={handleBookingFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="d-block text-center">Booked Movie: {chosenMovie.title} </Form.Label>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="fullName"
                  value={bookingData.fullName}
                  onChange={handleInputChange} />
              </Form.Group>

              <Container className="text-center">
                <DateRangePicker onChange={handleDateChange} value={date} />
              </Container>

              <Button className='d-block mt-3 mx-auto' variant="primary" type="submit">
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