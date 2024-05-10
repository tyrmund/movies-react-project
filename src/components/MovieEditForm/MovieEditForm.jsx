import { useState } from "react"

function MovieEditForm() {

    const [MovieEditForm, setMovieEditForm] = useState({
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
        setMovieEditForm({ ...MovieEditForm, [name]: value })
    }

    const handleMovieSubmit = (event) => {
        event.preventDefault()
        alert(`Creando ${MovieEditForm.title}!`)
    }

    return (
        <div className="MovieEditForm">
            <hr />
            <form onSubmit={handleMovieSubmit}>
                <label>Poster URL</label>
                <input
                    type="text"
                    name="image"
                    value={MovieEditForm.image}
                    onChange={handleMovieEditFormChange} />
                <br />
                <label>Movie Title</label>
                <input
                    type="text"
                    name="title"
                    value={MovieEditForm.title}
                    onChange={handleMovieEditFormChange} />
                <br />
                <label>Year of Release</label>
                <input
                    type="text"
                    name="releaseYear"
                    value={MovieEditForm.releaseYear}
                    onChange={handleMovieEditFormChange} />
                <br />
                <label>Director</label>
                <input
                    type="text"
                    name="director"
                    value={MovieEditForm.director}
                    onChange={handleMovieEditFormChange} />
                <br />
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={MovieEditForm.description}
                    onChange={handleMovieEditFormChange} />
                <br />
                <label>Genre</label>
                <input
                    type="text"
                    name="genre"
                    value={MovieEditForm.genre}
                    onChange={handleMovieEditFormChange} />
                <br />
                <label>Distributor</label>
                <input
                    type="text"
                    name="distributor"
                    value={MovieEditForm.distributor}
                    onChange={handleMovieEditFormChange} />
                <br />
                <label>Running Time in Minutes</label>
                <input
                    type="number"
                    name="runningTime"
                    value={MovieEditForm.runningTime}
                    onChange={handleMovieEditFormChange} />
                <br />
                <label>Rating</label>
                <input
                    type="number"
                    min={0}
                    max={10}
                    name="rating"
                    value={MovieEditForm.rating}
                    onChange={handleMovieEditFormChange} />
                <br />
                <input type="submit" />
            </form>
            <hr />
        </div>
    )

}

export default MovieEditForm