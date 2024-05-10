import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import MovieCard from "../MovieCard/MovieCard"

const API_URL = "http://localhost:5000"

function MoviesList() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    loadAllMovies()
  }, [])

  const loadAllMovies = () => {
    axios
      .get(`${API_URL}/movies`)
      .then(({ data }) => setMovies(data))
      .catch(err => console.log(err))
  }

  return (
    <div className='MoviesList' key={movies}>

      {
        movies.map((movie) =>
          <Link to={`/movies/${movie.id}`}>
            <MovieCard key={movie.id} {...movie} />
          </Link>
        )}
    </div>
  )
}

export default MoviesList