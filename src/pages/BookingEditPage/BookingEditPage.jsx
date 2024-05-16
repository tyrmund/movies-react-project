import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Col, Container, Row, Form, Button, Modal } from "react-bootstrap"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { getDaysBooking } from "../../utils/booking.utils"
import { stringToDate } from "../../utils/booking.utils"
import { isValidBookingDate } from "../../utils/booking.utils"


const API_URL = import.meta.env.VITE_API_URL


function BookingEditPage() {

  const [bookingData, setBookingData] = useState({
    fullName: '',
    daysBooked: 0,
    bookingDate: '',
    movieId: 0
  })

  const [chosenMovie, setChosenMovie] = useState({})

  const [showModal, setShowModal] = useState(false)

  const { bookingId } = useParams()

  const navigate = useNavigate()

  const [date, setDate] = useState([new Date(), new Date()])

  const [validated, setValidated] = useState(false)



  useEffect(() => {
    loadBooking()
  }, [])


  const loadBooking = () => {

    axios
      .get(`${API_URL}/bookings/${bookingId}`)
      .then(({ data }) => {
        setBookingData(data)
        loadMovie(data.movieId)
        loadDate(data.bookingDate, data.daysBooked)
      })
      .catch(err => console.log('OMG LA HEMOS LIADO', err))
  }

  const loadDate = (bookingDate, daysBooked) => {

    if (bookingDate, daysBooked) {

      const bookingDateObj = new Date(bookingDate)
      const returnDate = new Date(bookingDateObj.getTime() + ((daysBooked * 3600000 * 24) - 1))

      setDate([
        bookingDate,
        returnDate
      ])
    }
  }

  const loadMovie = (movieId) => {
    if (movieId) {

      axios
        .get(`${API_URL}/movies/${movieId}?_embed=bookings`)
        .then(({ data }) => setChosenMovie(data))
        .catch(err => console.log(err))
    }
  }

  const handleDateChange = newDate => {
    setDate(newDate)
    setBookingData({ ...bookingData, daysBooked: Math.ceil(getDaysBooking(newDate)), bookingDate: newDate[0].toString().substring(0, 15) })
  }

  const handleBookingEditChange = (e) => {
    const { name, value } = e.target
    setBookingData({ ...bookingData, [name]: value })
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleEditBookingSubmit = e => {
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

          if (isValidBookingDate([date1, date2], formattedDate, eachBooking.daysBooked)
            || (bookingData.id === eachBooking.id)) {
            return acc && true
          } else {
            return acc && false
          }
        }, true)
      }

      if (isValid) {

        axios
          .put(`${API_URL}/bookings/${bookingId}`, bookingData)
          .then(navigate('/bookings'))
          .catch(err => console.log(err))

      } else {
        setShowModal(true)
      }


    }

  }

  return (
    <div className="BookingNewPage mt-3">
      <Container>
        <Row>
          <Col md={{ span: 5, offset: 3 }} className="shadow-lg mx-auto d-block rounded p-3 m-3">
            <Form noValidate validated={validated} onSubmit={handleEditBookingSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="d-block text-center"><b>Booked Movie:</b> {chosenMovie.title} </Form.Label>
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  name="fullName"
                  value={bookingData.fullName}
                  onChange={handleBookingEditChange} />
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
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{`Error`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sorry, this booking range is taken. Please choose another.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>

  )
}

export default BookingEditPage