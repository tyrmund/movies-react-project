import axios from "axios"
import { useEffect, useState } from "react"

const API_URL = "http://localhost:5000"

function MoviesList() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        loadAllMovies()
    }, [])

    const loadAllMovies = () => {
        axios
            .get(`${API_URL}/movies`)
            .then(({ data }) => setMovies(data))
            .catch(err => console.log(err))
    }

    return (
        <div className='MoviesList'>
            {
                movies.map((movie) =>
                    <div key={movie.id}>
                        <h1>{movie.title}</h1>
                    </div>
                )
            }
        </div>
    )
}

export default MoviesList