import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import './MovieDetailsPage.css'
import { getRatingColor } from "../../utils/movie.utils"


const API_URL = import.meta.env.VITE_API_URL


function MovieDetailsPage() {

  const [movie, setMovie] = useState()

  let ratingColor = ''
  if (movie) {
    ratingColor = getRatingColor(movie.rating)
  }

  const { movieId } = useParams()

  const navigate = useNavigate()

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
      .then(navigate('/movies'))
      .catch(err => console.log(err))
  }

  return (
    <div className="MovieDetailsPage">
      <Container className="mt-3 mx-auto d-block p-5" style={{
        maxWidth: '1000px', margin: '20px', border: '1px solid rgba(239, 239, 240, 0.9)',
        borderRadius: '10px', boxShadow: '2px 2px 2px 1px gainsboro'
      }}>
        <Row className="mb-5">
          {
            movie && (
              <>
                <Col md={{ span: 5, offset: 1 }}>
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
                      <p><b>Distributed by:</b> {movie.distributor}</p>
                      <p><b>Director:</b> {movie.director}</p>
                      <p className="d-inline"><b>Main cast:</b> </p>
                      {movie.mainCast.map((eachActor, index, arr) => {
                        if (index < arr.length - 1)
                          return <p className="d-inline" key={index}> {eachActor}, </p>
                        else return <p className="d-inline" key={index}> {eachActor}. </p>
                      })}
                      <p><b>Awards:</b> {movie.awards[0].name} in {movie.awards[0].category}, {movie.awards[0].year}</p>
                      <p className="description-text"><b>Description:</b></p>
                      <p className="description-paragraph">{movie.description}</p>

                      <div className="btns-movie mt-3">
                        <Link to={`/movies/edit/${movieId}`} style={{ textDecoration: 'none' }}>
                          <Button variant="secondary mr-3">Edit</Button>{' '}
                        </Link>

                        <Link to={`/movies`} style={{ textDecoration: 'none' }}>
                          <Button onClick={() => deleteMovie(movieId)} variant="danger mr-3">Delete</Button>{' '}
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