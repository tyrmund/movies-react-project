import BookingsList from "../../components/BookingsList/BookingsList"

function BookingsListPage() {
  return (
    <div className="BookingListPage">
      <h1 className="text-center mt-2">Our Bookings</h1>
      <hr className="mx-auto d-block w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
      <BookingsList />
    </div>
  )
}

export default BookingsListPage