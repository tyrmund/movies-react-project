import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import './MovieDetailsPage.css'
import { getRatingColor } from "../../utils/movie.utils"


const API_URL = import.meta.env.VITE_API_URL


function MovieDetailsPage() {

  const [movie, setMovie] = useState()
  const [showModal, setShowModal] = useState(false)

  let ratingColor = ''
  if (movie) {
    ratingColor = getRatingColor(movie.rating)
  }

  const { movieId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    getOneMovie()
  }, [movieId])

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

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="MovieDetailsPage">
      <Container className="mt-3 mx-auto d-block p-5" style={{
        maxWidth: '1250px', margin: '20px', border: '1px solid rgba(239, 239, 240, 0.9)',
        borderRadius: '10px', boxShadow: '2px 2px 2px 1px gainsboro'
      }}>
        <Row className="align-items-center">
          {
            movie && (
              <>
                <Col md={{ span: 5 }}>
                  <img src={movie.image} alt={movie.title} className="rounded" />
                </Col>

                <Col md={{ span: 7 }} >
                  <div className="detail-info">
                    <div className="title-movie-info">

                      <h1 className="movie-title" style={{ maxWidth: '300px' }}>{movie.title}</h1>
                      <h1 className={`movie-rating ${ratingColor} ml-5`} style={{ maxWidth: '300px' }}>{movie.rating}</h1>

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
                      <p className="mt-3"><b>Awards:</b> {movie.awards[0].name} in {movie.awards[0].category}, {movie.awards[0].year}</p>
                      <p className="description-text"><b>Description:</b></p>
                      <p className="description-paragraph">{movie.description}</p>

                      <div className="btns-movie">
                        <div className="btns-movie-safe">
                          <Link to={`/movies/edit/${movieId}`} style={{ textDecoration: 'none' }}>
                            <Button variant="secondary mr-3 mt-3">Edit</Button>{' '}
                          </Link>

                          <Link to={`/bookings/new/${movieId}`} style={{ textDecoration: 'none', marginTop: '5px' }} >
                            <Button variant="primary mt-3">Book movie</Button>{' '}
                          </Link>
                        </div>

                        <div className="btn-movie-delete">
                          <Button onClick={handleShowModal} variant="danger mr-3 mt-3">Delete</Button>{' '}
                        </div>

                      </div>

                    </div>
                  </div>
                </Col>
              </>
            )}
        </Row>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{`Delete ${movie?.title}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`Are you sure you want to delete ${movie?.title}'s entry? Please confirm your choice.`}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => deleteMovie(movieId)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </Container>

    </div>
  )

}

export default MovieDetailsPage