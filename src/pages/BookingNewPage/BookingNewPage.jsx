import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Container, Row, Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import 'react-calendar/dist/Calendar.css'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { getDaysBooking } from "../../utils/booking.utils"
import { isValidBookingDate } from "../../utils/booking.utils"
import { stringToDate } from "../../utils/booking.utils"


const API_URL = import.meta.env.VITE_API_URL


function BookingNewPage() {

  const { movieId } = useParams()

  const navigate = useNavigate()

  const [bookingData, setBookingData] = useState({
    fullName: '',
    daysBooked: 0,
    bookingDate: '',
    movieId: Number(movieId)
  })

  const [chosenMovie, setChosenMovie] = useState({})

  useEffect(() => {
    loadChosenMovie()
  }, [])

  const loadChosenMovie = () => {
    axios
      .get(`${API_URL}/movies/${movieId}?_embed=bookings`)
      .then(({ data }) => setChosenMovie(data))
      .catch(err => console.log(err))
  }


  const [date, setDate] = useState([new Date(), new Date()])

  const [validated, setValidated] = useState(false)


  const handleDateChange = newDate => {
    setDate(newDate)
    setBookingData({ ...bookingData, daysBooked: Math.ceil(getDaysBooking(newDate)), bookingDate: newDate[0].toString().substring(0, 15) })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setBookingData({ ...bookingData, [name]: value })
  }

  const handleBookingFormSubmit = e => {
    e.preventDefault()



    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true)

    if (form.checkValidity() === true) {

      let isValid
      if (chosenMovie.bookings.length === 0) {
        isValid = true
      } else {
        isValid = chosenMovie.bookings.reduce((acc, eachBooking) => {
          const formattedDate = stringToDate(eachBooking.bookingDate)
          const date1 = date[0]
          const date2 = date[1]

          if (isValidBookingDate([date1, date2], formattedDate, eachBooking.daysBooked)) {
            return acc && true
          } else {
            return acc && false
          }
        }, true)
      }

      if (isValid) {

        axios
          .post(`${API_URL}/bookings`, bookingData)
          .then(() => navigate('/bookings'))
          .catch(err => console.log(err))

      } else {
        alert('Dates already booked')
      }
    }
  }

  return (
    <div className="BookingNewPage mt-3">
      <Container>
        <Row>
          <Col md={{ span: 5, offset: 3 }} className="shadow-lg mx-auto d-block rounded p-3 m-3">
            <Form noValidate validated={validated} onSubmit={handleBookingFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="d-block text-center"><b>Booked Movie:</b> {chosenMovie.title} </Form.Label>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  name="fullName"
                  value={bookingData.fullName}
                  onChange={handleInputChange} />
                <Form.Control.Feedback type="invalid">
                  Please enter a name.
                </Form.Control.Feedback>
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