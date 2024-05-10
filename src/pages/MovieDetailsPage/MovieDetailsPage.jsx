import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import './MovieDetailsPage.css'

const API_URL = "http://localhost:5000"


function MovieDetailsPage() {

  const [movie, setMovie] = useState()

  const { movieId } = useParams()

  useEffect(() => {
    getOneMovie()
  }, [])

  const getOneMovie = () => {
    axios
      .get(`${API_URL}/movies/${movieId}`)
      .then(({ data }) => setMovie(data))
      .catch(err => console.log(err))
  }


  return (
    <div className="MovieDetailsPage">
      <Container className="mt-5">
        <Row className="mb-5">
          {
            movie && (
              <>
                <Col md={{ span: 4, offset: 1 }}>
                  <img src={movie.image} alt={movie.title} className="rounded" />
                </Col>

                <Col md={{ span: 6 }}>
                  <div className="detail-info">
                    <div className="title-movie-info">

                      <h1 className="movie-title">{movie.title}</h1>
                      <h1 className="movie-rating">{movie.rating}</h1>

                    </div>
                    <div className="text-movie-info">

                      <p>{movie.releaseYear} | {movie.genre} | {movie.runningTime} mins</p>
                      <p>Distributed by: {movie.distributor}</p>
                      <p>Director: {movie.director}</p>
                      <p>Main cast: {movie.mainCast}</p>
                      <p className="description-text">Description:</p>
                      <p className="description-paragraph">{movie.description}</p>
                      <p>Awards: {movie.awards[0].name} in {movie.awards[0].category}, {movie.awards[0].year}</p>

                    </div>
                  </div>
                </Col>
              </>
            )}
        </Row>
      </Container>

    </div>
  )

}

export default MovieDetailsPage