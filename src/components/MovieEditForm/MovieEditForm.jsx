import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const API_URL = "http://localhost:5000"

function MovieEditForm() {

    const { movieId } = useParams()

    useEffect(() => {
        loadMovie()
    }, [])

    const loadMovie = () => {
        axios
            .get(`${API_URL}/movies/${movieId}`)
            .then(({ data }) => {
                const fullMovie = JSON.parse(JSON.stringify(data))
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

        const fullMovie = JSON.parse(JSON.stringify(movieData))
        fullMovie.mainCast = JSON.parse(JSON.stringify(mainCast))
        fullMovie.awards = JSON.parse(JSON.stringify(awards))

        axios
            .put(`${API_URL}/movies/${movieId}`, fullMovie)
            .then(() => {
                alert(`Creando ${fullMovie.title}!`)
                navigate('/movies')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="MovieEditForm mb-5">
            <Container className="d-block mx-auto">
                <form className="mx-5" onSubmit={handleEditedMovieSubmit}>
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

                    <div>
                        <label className="form-label">Main Cast</label>
                        {mainCast.map((actor, index) => (
                            <div className="mb-3" key={index}>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="actor"
                                    placeholder="Actor's full name"
                                    value={actor}
                                    onChange={(event) => handleMainCastChange(event, index)} />
                            </div>
                        ))}
                        <button
                            onClick={addMainCastInput}
                            className="btn btn-secondary mb-3 opacity-50"
                            type="button">
                            Add More
                        </button>
                    </div>

                    <div>
                        <label className="form-label">Awards</label>
                        {awards.map((award, index) => (
                            <div className="mb-3" key={index}>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="Award name"
                                    value={award.name}
                                    onChange={(event) => handleAwardChange(event, index)} />
                                <input
                                    className="form-control"
                                    type="text"
                                    name="category"
                                    placeholder="Category"
                                    value={award.category}
                                    onChange={(event) => handleAwardChange(event, index)} />
                                <input
                                    className="form-control"
                                    type="number"
                                    name="year"
                                    placeholder="Year"
                                    value={award.year}
                                    onChange={(event) => handleAwardChange(event, index)} />
                            </div>
                        ))}
                        <button
                            onClick={addAwardsInput}
                            className="btn btn-secondary mb-3 opacity-50"
                            type="button">
                            Add More
                        </button>
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
                            step="0.1"
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

                    <input
                        className="mx-auto d-block btn btn-primary"
                        type="submit"
                        value="Edit" />
                </form>
            </Container>
        </div>
    )

}

export default MovieEditForm