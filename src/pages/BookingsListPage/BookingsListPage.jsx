import BookingsList from "../../components/BookingsList/BookingsList"
import ScrollToTop from "react-scroll-to-top"

function BookingsListPage() {
  return (
    <div className="BookingListPage">
      <h1 className="text-center mt-5">Our Bookings</h1>
      <hr className="mx-auto d-block w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
      <BookingsList />
      <ScrollToTop />
    </div>
  )
}

export default BookingsListPage