import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Col, Container, Row, Form, Button, InputGroup } from "react-bootstrap"
import { getRunningTime, getTimeAsString } from "../../utils/movie.utils"


const API_URL = import.meta.env.VITE_API_URL

function MovieEditForm() {

  const [validated, setValidated] = useState(false)

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
          runningTime: getTimeAsString(fullMovie.runningTime),
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
    runningTime: '00:00',
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

    fullMovie.runningTime = getRunningTime(fullMovie.runningTime)

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)

    if (form.checkValidity() === true) {


      axios
        .put(`${API_URL}/movies/${movieId}`, fullMovie)
        .then(() => {
          navigate(`/movies/${movieId}`)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="MovieEditForm mb-5">
      <Container className="d-block mx-auto shadow-lg rounded mt-5 p-4 movie-form-bg">

        <Form noValidate validated={validated} className="mx-5" onSubmit={handleEditedMovieSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-label">Poster URL</Form.Label>
            <Form.Control
              required
              className="form-control"
              type="text"
              name="image"
              value={movieData.image}
              onChange={handleMovieEditFormChange} />
            <Form.Control.Feedback type="invalid">
              Please choose a valid URL.
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mt-5">
            <Form.Group as={Col} md={{ span: 5 }} className="mb-3">
              <Form.Label className="form-label">Movie Title</Form.Label>
              <Form.Control
                required
                className="form-control"
                type="text"
                name="title"
                value={movieData.title}
                onChange={handleMovieEditFormChange} />
              <Form.Control.Feedback type="invalid">
                Please type in a title.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 3 }} className="mb-3">
              <Form.Label className="form-label">Year of Release</Form.Label>
              <Form.Control
                required
                className="form-control"
                type="text"
                name="releaseYear"
                value={movieData.releaseYear}
                onChange={handleMovieEditFormChange} />
              <Form.Control.Feedback type="invalid">
                Please type in the year of release.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 4 }} className="mb-3">
              <Form.Label className="form-label">Director</Form.Label>
              <Form.Control
                required
                className="form-control"
                type="text"
                name="director"
                value={movieData.director}
                onChange={handleMovieEditFormChange} />
              <Form.Control.Feedback type="invalid">
                Please include the film director.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mt-5">
            <Form.Group as={Col} md={{ span: 5 }} className="mb-3">
              <Form.Label className="form-label">Main Cast</Form.Label>
              {mainCast.map((actor, index) => (
                <InputGroup key={index}>
                  <Form.Control
                    required
                    type="text"
                    name="actor"
                    placeholder="Actor's full name"
                    aria-describedby="inputGroupAppend"
                    value={actor}
                    onChange={(event) => handleMainCastChange(event, index)} />
                  <InputGroup.Text
                    onClick={(event) => handleMainCastDelete(event, index)}
                    className="InputDeleteCursorPointer"
                    id="inputGroupAppend">
                    x
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    Please include at least one cast member.
                  </Form.Control.Feedback>
                </InputGroup>
              ))}
              <Button
                onClick={addMainCastInput}
                className="btn btn-secondary mb-3 opacity-50 mt-3"
                type="button">
                Add More
              </Button>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 7 }} className="mb-3">
              <Form.Label className="form-label">Awards</Form.Label>
              {awards.map((award, index) => (
                <Form.Group className="mb-3" key={index}>
                  <InputGroup>
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      placeholder="Award name"
                      aria-describedby="inputGroupAppend"
                      value={award.name}
                      onChange={(event) => handleAwardChange(event, index)} />
                    <InputGroup.Text
                      onClick={(event) => handleAwardDelete(event, index)}
                      className="InputDeleteCursorPointer"
                      id="inputGroupAppend">
                      x
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Control
                    required
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={award.category}
                    onChange={(event) => handleAwardChange(event, index)} />
                  <Form.Control
                    required
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={award.year}
                    onChange={(event) => handleAwardChange(event, index)} />
                  <Form.Control.Feedback type="invalid">
                    Please include at least one award.
                  </Form.Control.Feedback>
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
          </Row>

          <Row className="mt-4">
            <Form.Group as={Col} md={{ span: 6 }} className="mb-3">
              <Form.Label className="form-label">Genre</Form.Label>
              <Form.Control
                required
                type="text"
                name="genre"
                value={movieData.genre}
                onChange={handleMovieEditFormChange} />
              <Form.Control.Feedback type="invalid">
                Please add one genre here.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 6 }} className="mb-3">
              <Form.Label className="form-label">Distributor</Form.Label>
              <Form.Control
                required
                type="text"
                name="distributor"
                value={movieData.distributor}
                onChange={handleMovieEditFormChange} />
              <Form.Control.Feedback type="invalid">
                Please type in the film distributor here.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mt-5">
            <Form.Group as={Col} md={{ span: 2, offset: 4 }} className="mb-3">
              <Form.Label className="form-label">Running Time</Form.Label>
              <Form.Control
                required
                type="time"
                name="runningTime"
                value={movieData.runningTime}
                onChange={handleMovieEditFormChange} />
              <Form.Control.Feedback type="invalid">
                Please include the running time.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 2 }} className="mb-3">
              <Form.Label className="form-label">Rating</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                max={10}
                step="0.1"
                name="rating"
                value={movieData.rating}
                onChange={handleMovieEditFormChange} />
              <Form.Control.Feedback type="invalid">
                Please add a rating score.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3 mt-4" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              as="textarea"
              rows='5'
              value={movieData.description}
              onChange={handleMovieEditFormChange} />
            <Form.Control.Feedback type="invalid">
              Please include a short description.
            </Form.Control.Feedback>
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