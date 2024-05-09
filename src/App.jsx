import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import About from './pages/About/About'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import NavBar from './components/NavBar/NavBar'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/movies'} element={<MoviesPage />} />
        {/* <Route path={'/movies/:movieId'} element={<MovieDetailsPage />} />
        <Route path={'/movies/edit/:movieId'} element={<MovieEditPage />} />
        <Route path={'/movies/new'} element={<MovieNewPage />} />
        <Route path={'/bookings'} element={<BookingsPage />} />
        <Route path={'/bookings/:bookingId'} element={<BookingDetails />} />
        <Route path={'/bookings/edit/:bookingId'} element={<BookingEditPage />} />
        <Route path={'/bookings/new'} element={<BookingNewPage />} /> */}
      </Routes>
    </div>
  )

}

export default App

/*
  
*/