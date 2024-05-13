import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Col, Container, Row, Form, Button } from "react-bootstrap"


const API_URL = "http://localhost:5000"

function MovieEditForm() {

  const { movieId } = useParams()

  useEffect(() => {
    loadMovie()
  }, [])

  const loadMovie = () => {
    axios
      .get(`${API_URL}/movies/${movieId}`)
      .then(({ data: fullMovie }) => {
        setAwards(fullMovie.awards)
        setMainCast(fullMovie.mainCast)
        setMovieData({
          image: fullMovie.image,
          title: fullMovie.title,
          releaseYear: fullMovie.releaseYear,
          director: fullMovie.director,
          description: fullMovie.description,
          genre: fullMovie.genre,
          distributor: fullMovie.distributor,
          runningTime: fullMovie.runningTime,
          rating: fullMovie.rating
        })
      })
      .catch(err => console.log(err))
  }

  const navigate = useNavigate()

  const [movieData, setMovieData] = useState({
    image: '',
    title: '',
    releaseYear: '',
    director: '',
    description: '',
    genre: '',
    distributor: '',
    runningTime: 0,
    rating: 0
  })

  const [mainCast, setMainCast] = useState([''])

  const [awards, setAwards] = useState([{
    name: '',
    category: '',
    year: ''
  }])

  const handleMovieEditFormChange = (event) => {
    const { value, name } = event.target
    setMovieData({ ...movieData, [name]: value })
  }

  const handleMainCastChange = (event, index) => {
    const { value } = event.target
    const updatedCast = [...mainCast]
    updatedCast[index] = value
    setMainCast(updatedCast)
  }

  const handleAwardChange = (event, index) => {
    const { value, name } = event.target
    const updatedAwards = [...awards]
    updatedAwards[index][name] = value
    setAwards(updatedAwards)
  }

  const addMainCastInput = () => {
    const editedActor = [...mainCast, '']
    setMainCast(editedActor)
  }

  const addAwardsInput = () => {
    const editedAward = [...awards, { name: '', category: '', year: '' }]
    setAwards(editedAward)
  }

  const handleEditedMovieSubmit = (event) => {

    event.preventDefault()

    const fullMovie = {
      ...movieData,
      mainCast,
      awards
    }

    axios
      .put(`${API_URL}/movies/${movieId}`, fullMovie)
      .then(() => {
        alert(`Movie ${fullMovie.title} edited!`)
        navigate(`/movies/${movieId}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="MovieEditForm mb-5">
      <Container className="d-block mx-auto">

        <Form className="mx-5" onSubmit={handleEditedMovieSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Poster URL</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="image"
              value={movieData.image}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Movie Title</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Year of Release</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="releaseYear"
              value={movieData.releaseYear}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Director</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="director"
              value={movieData.director}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Main Cast</Form.Label>
            {mainCast.map((actor, index) => (
              <Form.Control
                key={index}
                className="form-control"
                type="text"
                name="actor"
                placeholder="Actor's full name"
                value={actor}
                onChange={(event) => handleMainCastChange(event, index)} />
            ))}
            <Button
              variant="primary"
              onClick={addMainCastInput}
              className="btn btn-secondary mb-3 opacity-50"
              type="button">
              Add More
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Awards</Form.Label>
            {awards.map((award, index) => (
              <Form.Group className="mb-3" key={index}>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Award name"
                  value={award.name}
                  onChange={(event) => handleAwardChange(event, index)} />
                <Form.Control
                  className="form-control"
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={award.category}
                  onChange={(event) => handleAwardChange(event, index)} />
                <Form.Control
                  className="form-control"
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={award.year}
                  onChange={(event) => handleAwardChange(event, index)} />
              </Form.Group>
            ))}
            <Button
              variant="primary"
              onClick={addAwardsInput}
              className="btn btn-secondary mb-3 opacity-50"
              type="button">
              Add More
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Genre</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="genre"
              value={movieData.genre}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Distributor</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="distributor"
              value={movieData.distributor}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Running Time in Minutes</Form.Label>
            <Form.Control
              className="form-control"
              type="number"
              name="runningTime"
              value={movieData.runningTime}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Rating</Form.Label>
            <Form.Control
              className="form-control"
              type="number"
              min={0}
              max={10}
              step="0.1"
              name="rating"
              value={movieData.rating}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              as="textarea"
              rows='5'
              value={movieData.description}
              onChange={handleMovieEditFormChange} />
          </Form.Group>

          <Button
            variant="primary"
            className="mx-auto d-block btn btn-primary"
            type="submit">
            Edit
          </Button>

        </Form>
      </Container>
    </div >
  )

}

export default MovieEditForm