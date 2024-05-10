import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
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

  const deleteMovie = (id) => {
    axios
      .delete(`${API_URL}/movies/${id}`)
      .then(loadAllMovies())
      .catch(err => console.log(err))
  }

  return (
    <div className='MoviesList'>
      <Container>
        <Row className="justify-content-center">
          {movies.map((movie) =>
            <Col key={movie.id} md={4} className="shadow-lg p-3 bg-white rounded m-3">
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/movies/${movie.id}`}
              >
                <MovieCard {...movie} />
              </Link>
              <button
                type="button"
                className="mx-auto d-block btn bg-dark btn-outline-danger"
                onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default MoviesList