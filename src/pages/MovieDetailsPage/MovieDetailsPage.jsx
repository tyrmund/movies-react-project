import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import './MovieDetailsPage.css'
import { getRatingColor } from "../../utils/movie.utils"


const API_URL = "http://localhost:5000"


function MovieDetailsPage() {

  const [movie, setMovie] = useState()

  let ratingColor = ''
  if (movie) {
    ratingColor = getRatingColor(movie.rating)
  }

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


  const deleteMovie = (id) => {
    axios
      .delete(`${API_URL}/movies/${id}`)
      .then(getOneMovie())
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
                      <h1 className={`movie-rating ${ratingColor}`}>{movie.rating}</h1>

                    </div>
                    <div className="text-movie-info">

                      <p>{movie.releaseYear} | {movie.genre} | {movie.runningTime} mins</p>
                      <p>Distributed by: {movie.distributor}</p>
                      <p>Director: {movie.director}</p>
                      <p className="d-inline">Main cast: </p>
                      {movie.mainCast.map((eachActor, index) => {
                        return <p className="d-inline" key={index}> {eachActor} </p>
                      })}
                      <p className="description-text">Description:</p>
                      <p className="description-paragraph">{movie.description}</p>
                      <p>Awards: {movie.awards[0].name} in {movie.awards[0].category}, {movie.awards[0].year}</p>

                      <div className="btns-movie mt-3">
                        <Link to={`/movies/edit/${movieId}`} style={{ textDecoration: 'none' }}>
                          <Button variant="secondary mr-3">Edit</Button>{' '}
                        </Link>

                        <Link to={`/movies`} style={{ textDecoration: 'none' }}>
                          <Button variant="danger mr-3">Delete</Button>{' '}
                        </Link>
                        <br />

                        <Link to={`/bookings/new/${movieId}`} style={{ textDecoration: 'none', marginTop: '5px' }} >
                          <Button variant="primary mt-3">Book movie</Button>{' '}
                        </Link>
                      </div>

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