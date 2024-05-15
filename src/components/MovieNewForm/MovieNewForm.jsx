import { useState } from "react"
import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getRunningTime } from "../../utils/movie.utils"
import './MovieNewForm.css'

const API_URL = import.meta.env.VITE_API_URL

function MovieNewForm() {

  const navigate = useNavigate()

  const [validated, setValidated] = useState(false)

  const [newMovie, setNewMovie] = useState({
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

  const handleMovieNewFormChange = (event) => {
    const { value, name } = event.target
    setNewMovie({ ...newMovie, [name]: value })
  }

  const handleMainCastAdd = (event, index) => {
    const { value } = event.target
    const updatedCast = [...mainCast]
    updatedCast[index] = value
    setMainCast(updatedCast)
  }

  const handleMainCastDelete = (_, index) => {
    const updatedCast = [...mainCast]

    if (updatedCast.length > 1) {
      updatedCast.splice(index, 1)
      setMainCast(updatedCast)
    }
  }

  const handleAwardChange = (event, index) => {
    const { value, name } = event.target
    const updatedAwards = [...awards]
    updatedAwards[index][name] = value
    setAwards(updatedAwards)
  }

  const handleAwardDelete = (_, index) => {
    const updatedAwards = [...awards]

    if (updatedAwards.length > 1) {
      updatedAwards.splice(index, 1)
      setAwards(updatedAwards)
    }
  }

  const addMainCastInput = () => {
    const newActor = [...mainCast, '']
    setMainCast(newActor)
  }

  const addAwardsInput = () => {
    const newAward = [...awards, { name: '', category: '', year: '' }]
    setAwards(newAward)
  }

  const handleMovieSubmit = (event) => {

    const createdMovie = {
      ...newMovie,
      mainCast,
      awards
    }

    createdMovie.runningTime = getRunningTime(createdMovie.runningTime)

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)

    if (form.checkValidity() === true) {
      event.preventDefault()

      axios
        .post(`${API_URL}/movies`, createdMovie)
        .then(() => {
          navigate('/')
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="MovieNewForm mb-5">
      <Container className="d-block mx-auto shadow-lg rounded mt-4 p-4 movie-form-bg">

        <Form noValidate validated={validated} className="mx-5" onSubmit={handleMovieSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Poster URL</Form.Label>
            <Form.Control
              required
              type="url"
              name="image"
              placeholder="http://www.example.com"
              value={newMovie.image}
              onChange={handleMovieNewFormChange} />
            <Form.Control.Feedback type="invalid">
              Please choose a valid URL.
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mt-5">
            <Form.Group as={Col} md={{ span: 5 }} className="mb-3">
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={newMovie.title}
                onChange={handleMovieNewFormChange} />
              <Form.Control.Feedback type="invalid">
                Please type in a title.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 3 }} className="mb-3">
              <Form.Label>Year of Release</Form.Label>
              <Form.Control
                required
                type="text"
                name="releaseYear"
                value={newMovie.releaseYear}
                onChange={handleMovieNewFormChange} />
              <Form.Control.Feedback type="invalid">
                Please type in the year of release.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 4 }} className="mb-3">
              <Form.Label>Director</Form.Label>
              <Form.Control
                required
                type="text"
                name="director"
                value={newMovie.director}
                onChange={handleMovieNewFormChange} />
              <Form.Control.Feedback type="invalid">
                Please include the film director.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mt-5">
            <Form.Group as={Col} md={{ span: 5 }} className="mb-3" >
              <Form.Label>Main Cast</Form.Label>
              {mainCast.map((actor, index) => (
                <InputGroup key={index}>
                  <Form.Control
                    type="text"
                    name="actor"
                    placeholder="Actor's full name"
                    aria-describedby="inputGroupAppend"
                    value={actor}
                    onChange={(event) => handleMainCastAdd(event, index)} />
                  <InputGroup.Text
                    onClick={(event) => handleMainCastDelete(event, index)}
                    className="InputGroupTextCursorPointer"
                    id="inputGroupAppend">
                    x
                  </InputGroup.Text>
                </InputGroup>
              ))}
              <Button
                onClick={addMainCastInput}
                className="btn btn-secondary mt-3 mb-3 opacity-50"
                type="button">
                Add More
              </Button>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 7 }}>
              <Form.Label>Awards</Form.Label>
              {awards.map((award, index) => (
                <Form.Group className="mb-3" key={index}>
                  <InputGroup>
                    <Form.Control
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Name of the Award"
                      aria-describedby="inputGroupAppend"
                      value={award.name}
                      onChange={(event) => handleAwardChange(event, index)} />
                    <InputGroup.Text
                      onClick={(event) => handleAwardDelete(event, index)}
                      className="InputGroupTextCursorPointer"
                      id="inputGroupAppend">
                      x
                    </InputGroup.Text>
                  </InputGroup>
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
                onClick={addAwardsInput}
                className="btn btn-secondary mb-3 opacity-50"
                type="button">
                Add More
              </Button>
            </Form.Group>
          </Row>

          <Row className="mt-5">
            <Form.Group as={Col} md={{ span: 6 }} className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                required
                type="text"
                name="genre"
                value={newMovie.genre}
                onChange={handleMovieNewFormChange} />
              <Form.Control.Feedback type="invalid">
                Please add one genre here.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 6 }} className="mb-3">
              <Form.Label>Distributor</Form.Label>
              <Form.Control
                required
                type="text"
                name="distributor"
                value={newMovie.distributor}
                onChange={handleMovieNewFormChange} />
              <Form.Control.Feedback type="invalid">
                Please type in the film distributor here.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mt-5">
            <Form.Group as={Col} md={{ span: 3, offset: 3 }} className="mb-3">
              <Form.Label>Running Time</Form.Label>
              <Form.Control
                required
                type="time"
                name="runningTime"
                value={newMovie.runningTime}
                onChange={handleMovieNewFormChange} />
              <Form.Control.Feedback type="invalid">
                Please include the running time.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 3 }} className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                max={10}
                step="0.1"
                name="rating"
                value={newMovie.rating}
                onChange={handleMovieNewFormChange} />
              <Form.Control.Feedback type="invalid">
                Please add a rating score.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3 mt-5">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              as="textarea"
              rows="5"
              value={newMovie.description}
              onChange={handleMovieNewFormChange} />
            <Form.Control.Feedback type="invalid">
              Please include a short description.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mx-auto d-block btn btn-primary">
            Create!
          </Button>
        </Form>
      </Container>
    </div>
  )

}

export default MovieNewForm