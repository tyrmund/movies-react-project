import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import MovieCard from "../MovieCard/MovieCard"

const API_URL = import.meta.env.VITE_API_URL

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
      .then(() => loadAllMovies())
      .catch(err => console.log(err))
  }

  return (
    <div className='MoviesList'>
      <Row className="justify-content-center">
        {
          movies.map((movie) =>
            <Col
              key={movie.id}
              sm={{ span: 8, offset: 2 }}
              md={{ span: 4 }}
              lg={{ span: 3 }}
              className="p-3 bg-white rounded m-3">
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/movies/${movie.id}`}
              >
                <MovieCard {...movie} />
              </Link>
            </Col>
          )
        }
      </Row>
    </div>
  )
}

export default MoviesList