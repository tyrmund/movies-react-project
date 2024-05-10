import { useState } from "react"

function MovieForm() {

    const [movieForm, setMovieForm] = useState({
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

    const handleMovieFormChange = (event) => {
        const { value, name } = event.target
        setMovieForm({ ...movieForm, [name]: value })
    }

    const handleMovieSubmit = (event) => {
        event.preventDefault()
        alert(`Creando ${movieForm.title}!`)
    }

    return (
        <div className="MovieForm">
            <hr />
            <form onSubmit={handleMovieSubmit}>
                <label>Poster URL</label>
                <input
                    type="text"
                    name="image"
                    value={movieForm.image}
                    onChange={handleMovieFormChange} />
                <br />
                <label>Movie Title</label>
                <input
                    type="text"
                    name="title"
                    value={movieForm.title}
                    onChange={handleMovieFormChange} />
                <br />
                <label>Year of Release</label>
                <input
                    type="text"
                    name="releaseYear"
                    value={movieForm.releaseYear}
                    onChange={handleMovieFormChange} />
                <br />
                <label>Director</label>
                <input
                    type="text"
                    name="director"
                    value={movieForm.director}
                    onChange={handleMovieFormChange} />
                <br />
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={movieForm.description}
                    onChange={handleMovieFormChange} />
                <br />
                <label>Genre</label>
                <input
                    type="text"
                    name="genre"
                    value={movieForm.genre}
                    onChange={handleMovieFormChange} />
                <br />
                <label>Distributor</label>
                <input
                    type="text"
                    name="distributor"
                    value={movieForm.distributor}
                    onChange={handleMovieFormChange} />
                <br />
                <label>Running Time in Minutes</label>
                <input
                    type="number"
                    name="runningTime"
                    value={movieForm.runningTime}
                    onChange={handleMovieFormChange} />
                <br />
                <label>Rating</label>
                <input
                    type="number"
                    min={0}
                    max={10}
                    name="rating"
                    value={movieForm.rating}
                    onChange={handleMovieFormChange} />
                <br />
                <input type="submit" />
            </form>
            <hr />
        </div>
    )

}

export default MovieForm