import { useState } from "react"
import { Container } from "react-bootstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:5000"

function MovieNewForm() {

    const navigate = useNavigate()

    const [newMovie, setNewMovie] = useState({
        image: '',
        title: '',
        releaseYear: '',
        director: '',
        mainCast: [],
        description: '',
        awards: [{}],
        genre: '',
        distributor: '',
        runningTime: 0,
        rating: 0
    })

    const handleMovieNewFormChange = (event) => {
        const { value, name } = event.target
        setNewMovie({ ...newMovie, [name]: value })
    }

    const handleMovieSubmit = (event) => {
        event.preventDefault()
        axios
            .post(`${API_URL}/movies`, newMovie)
            .then(() => {
                alert(`Creando ${newMovie.title}!`)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="MovieNewForm mb-5">
            <Container className="w-70 h-70 d-block mx-auto">
                <form className="mx-5" onSubmit={handleMovieSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Poster URL</label>
                        <input
                            className="form-control"
                            type="text"
                            name="image"
                            value={newMovie.image}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Movie Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={newMovie.title}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Year of Release</label>
                        <input
                            className="form-control"
                            type="text"
                            name="releaseYear"
                            value={newMovie.releaseYear}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Director</label>
                        <input
                            className="form-control"
                            type="text"
                            name="director"
                            value={newMovie.director}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Genre</label>
                        <input
                            className="form-control"
                            type="text"
                            name="genre"
                            value={newMovie.genre}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Distributor</label>
                        <input
                            className="form-control"
                            type="text"
                            name="distributor"
                            value={newMovie.distributor}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Running Time in Minutes</label>
                        <input
                            className="form-control"
                            type="number"
                            name="runningTime"
                            value={newMovie.runningTime}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <input
                            className="form-control"
                            type="number"
                            min={0}
                            max={10}
                            name="rating"
                            value={newMovie.rating}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="description"
                            rows='5'
                            value={newMovie.description}
                            onChange={handleMovieNewFormChange} />
                    </div>

                    <input className="mx-auto d-block btn btn-primary" type="submit" />
                </form>
            </Container>
        </div>
    )

}

export default MovieNewForm