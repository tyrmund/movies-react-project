import { useState } from "react"
import { Container, Form, Row, Col, Button } from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getRunningTime } from "../../utils/movie.utils"
import './MovieNewForm.css'

const API_URL = import.meta.env.VITE_API_URL

function MovieNewForm() {

  const navigate = useNavigate()

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
    const newActor = [...mainCast, '']
    setMainCast(newActor)
  }

  const addAwardsInput = () => {
    const newAward = [...awards, { name: '', category: '', year: '' }]
    setAwards(newAward)
  }

  const handleMovieSubmit = (event) => {

    event.preventDefault()

    const createdMovie = {
      ...newMovie,
      mainCast,
      awards
    }

    createdMovie.runningTime = getRunningTime(createdMovie.runningTime)

    // axios
    //   .post(`${API_URL}/movies`, newMovie)
    //   .then(() => {
    //     console.log(`Creando ${newMovie.title}!`)
    //     navigate('/')
    //   })
    //   .catch(err => console.log(err))
  }

  return (
    <div className="MovieNewForm mb-5">
      <Container className="d-block mx-auto shadow-lg rounded p-4 movie-form-bg">

        <Form className="mx-5" onSubmit={handleMovieSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Poster URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="http://www.example.com"
              value={newMovie.image}
              onChange={handleMovieNewFormChange} />
          </Form.Group>

          <Row>
            <Form.Group as={Col} md={{ span: 5 }} className="mb-3">
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newMovie.title}
                onChange={handleMovieNewFormChange} />
            </Form.Group>

            <Form.Group as={Col} md={{ span: 3 }} className="mb-3">
              <Form.Label>Year of Release</Form.Label>
              <Form.Control
                type="text"
                name="releaseYear"
                value={newMovie.releaseYear}
                onChange={handleMovieNewFormChange} />
            </Form.Group>

            <Form.Group as={Col} md={{ span: 4 }} className="mb-3">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                name="director"
                value={newMovie.director}
                onChange={handleMovieNewFormChange} />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md={{ span: 5 }} className="mb-3" >
              <Form.Label>Main Cast</Form.Label>
              {mainCast.map((actor, index) => (

                <Form.Control
                  key={index}
                  type="text"
                  name="actor"
                  placeholder="Actor's full name"
                  value={actor}
                  onChange={(event) => handleMainCastChange(event, index)} />

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
                onClick={addAwardsInput}
                className="btn btn-secondary mb-3 opacity-50"
                type="button">
                Add More
              </Button>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md={{ span: 6 }} className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={newMovie.genre}
                onChange={handleMovieNewFormChange} />
            </Form.Group>

            <Form.Group as={Col} md={{ span: 6 }} className="mb-3">
              <Form.Label>Distributor</Form.Label>
              <Form.Control
                type="text"
                name="distributor"
                value={newMovie.distributor}
                onChange={handleMovieNewFormChange} />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md={{ span: 2, offset: 4 }} className="mb-3">
              <Form.Label>Running Time</Form.Label>
              <Form.Control
                type="time"
                name="runningTime"
                value={newMovie.runningTime}
                onChange={handleMovieNewFormChange} />
            </Form.Group>

            <Form.Group as={Col} md={{ span: 2 }} className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={10}
                step="0.1"
                name="rating"
                value={newMovie.rating}
                onChange={handleMovieNewFormChange} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              as="textarea"
              rows="5"
              value={newMovie.description}
              onChange={handleMovieNewFormChange} />
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