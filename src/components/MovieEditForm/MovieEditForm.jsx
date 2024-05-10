import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const API_URL = "http://localhost:5000"

function MovieEditForm() {

    const navigate = useNavigate()

    const { movieId } = useParams()

    useEffect(() => {
        loadMovieToEdit()
    }, [])

    const loadMovieToEdit = () => {
        axios
            .get(`${API_URL}/movies/edit/${movieId}`)
            .then(({ data }) => setMovieData(data))
            .catch(err => console.log(err))
    }

    const [movieData, setMovieData] = useState({
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

    const handleMovieEditFormChange = (event) => {
        const { value, name } = event.target
        setMovieData({ ...movieData, [name]: value })
    }

    const handleMovieSubmit = (event) => {
        event.preventDefault()
        axios
            .post(`${API_URL}/movies`, movieData)
            .then(() => {
                alert(`Creando ${movieData.title}!`)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="MovieEditForm mb-5">
            <Container className="w-70 h-70 d-block mx-auto">
                <form className="mx-5" onSubmit={handleMovieSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Poster URL</label>
                        <input
                            className="form-control"
                            type="text"
                            name="image"
                            value={movieData.image}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Movie Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={movieData.title}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Year of Release</label>
                        <input
                            className="form-control"
                            type="text"
                            name="releaseYear"
                            value={movieData.releaseYear}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Director</label>
                        <input
                            className="form-control"
                            type="text"
                            name="director"
                            value={movieData.director}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Genre</label>
                        <input
                            className="form-control"
                            type="text"
                            name="genre"
                            value={movieData.genre}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Distributor</label>
                        <input
                            className="form-control"
                            type="text"
                            name="distributor"
                            value={movieData.distributor}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Running Time in Minutes</label>
                        <input
                            className="form-control"
                            type="number"
                            name="runningTime"
                            value={movieData.runningTime}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <input
                            className="form-control"
                            type="number"
                            min={0}
                            max={10}
                            name="rating"
                            value={movieData.rating}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="description"
                            rows='5'
                            value={movieData.description}
                            onChange={handleMovieEditFormChange} />
                    </div>

                    <input className="mx-auto d-block btn btn-primary" type="submit" />
                </form>
            </Container>
        </div>
    )

}

export default MovieEditForm