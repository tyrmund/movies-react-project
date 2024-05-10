import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import MoviesListPage from './pages/MoviesListPage/MoviesListPage'
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage'
import MovieEditPage from './pages/MovieEditPage/MovieEditPage'
import MovieNewPage from './pages/MovieNewPage/MovieNewPage'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/about'} element={<AboutPage />} />
        <Route path={'/movies'} element={<MoviesListPage />} />
        <Route path={'/movies/:movieId'} element={<MovieDetailsPage />} />
        <Route path={'/movies/edit/:movieId'} element={<MovieEditPage />} />
        <Route path={'/movies/new'} element={<MovieNewPage />} />
        {/* <Route path={'/bookings'} element={<BookingsListPage />} />
        <Route path={'/bookings/:bookingId'} element={<BookingDetailsPage />} />
        <Route path={'/bookings/edit/:bookingId'} element={<BookingEditPage />} />
        <Route path={'/bookings/new'} element={<BookingNewPage />} /> */}
      </Routes>
    </div>
  )

}

export default App

/*
  
*/