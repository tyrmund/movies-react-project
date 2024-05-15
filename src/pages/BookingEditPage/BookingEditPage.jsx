import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Col, Container, Row, Form, Button } from "react-bootstrap"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'



const API_URL = import.meta.env.VITE_API_URL

function BookingEditPage() {

  const [bookingData, setBookingData] = useState({
    fullName: '',
    daysBooked: 0,
    bookingDate: '',
    movieId: 0
  })

  const [chosenMovie, setChosenMovie] = useState({})

  const { bookingId } = useParams()

  const navigate = useNavigate()

  const [date, setDate] = useState([new Date(), new Date()])


  useEffect(() => {
    loadBooking()
  }, [])

  const loadDate = (bookingDate, daysBooked) => {

    //const returnDate = new Date(bookingDate.getTime() + (daysBooked * 3600000 * 24))
    setDate([
      bookingDate,
      bookingDate
    ])
  }

  const loadBooking = () => {

    axios
      .get(`${API_URL}/bookings/${bookingId}`)
      .then(({ data }) => {
        setBookingData(data)
        loadMovie(data.movieId)
        loadDate(data.bookingDate, data.daysBooked)

      })

      .catch(err => console.log(err))
  }


  const loadMovie = (movieId) => {
    if (movieId) {

      axios
        .get(`${API_URL}/movies/${movieId}`)
        .then(({ data }) => setChosenMovie(data))
        .catch(err => console.log(err))
    }
  }



  const handleDateChange = newDate => {
    setDate(newDate)
    setBookingData({ ...bookingData, daysBooked: Math.ceil(getDaysBooking(newDate)), bookingDate: newDate[0].toString().substring(0, 15) })
  }

  const handleBookingEditChange = (event) => {
    const { name, value } = e.target
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
          <Col md={{ span: 5, offset: 3 }} className="shadow-lg mx-auto d-block rounded p-3 m-3">
            <Form onSubmit={handleEditBookingSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="d-block text-center"><b>Booked Movie:</b> {chosenMovie.title} </Form.Label>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="fullName"
                  value={bookingData.fullName}
                  onChange={handleBookingEditChange} />
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

export default BookingEditPage