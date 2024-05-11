import { Card } from "react-bootstrap"

function BookingCard({ fullName, bookingDate, daysBooked, }) {
  return (
    <div className="BookingCard mb-4">
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{fullName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Booked for: {daysBooked} days</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BookingCard